import { useEffect, useRef } from 'react';
import { mapStatData, alumniCities, cityColors } from '../../data';

export default function WorldMap() {
  const mapInitialized = useRef(false);

  useEffect(() => {
    if (mapInitialized.current) return;

    function initMap() {
      if (mapInitialized.current) return;
      const svgEl = document.getElementById('worldMapSvg');
      if (!svgEl || !window.d3 || !window.topojson) return;
      mapInitialized.current = true;

      const W = svgEl.clientWidth || 900, H = 480;
      const svg = window.d3.select('#worldMapSvg')
        .attr('viewBox', `0 0 ${W} ${H}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');

      svg.append('rect').attr('width', W).attr('height', H).attr('fill', 'url(#oceanGrad)');
      const defs = svg.append('defs');
      const og = defs.append('linearGradient').attr('id', 'oceanGrad').attr('x1', '0%').attr('y1', '0%').attr('x2', '100%').attr('y2', '100%');
      og.append('stop').attr('offset', '0%').attr('stop-color', '#dde8ff');
      og.append('stop').attr('offset', '100%').attr('stop-color', '#c8d8ff');

      const graticule = window.d3.geoGraticule()();
      const projection = window.d3.geoNaturalEarth1().scale(W / 6.2).translate([W / 2, H / 2]);
      const path = window.d3.geoPath().projection(projection);

      const mapG = svg.append('g');

      const zoom = window.d3.zoom().scaleExtent([1, 8]).on('zoom', e => mapG.attr('transform', e.transform));
      svg.call(zoom);

      const zoomIn = document.getElementById('mapZoomIn');
      const zoomOut = document.getElementById('mapZoomOut');
      const zoomReset = document.getElementById('mapReset');
      if (zoomIn) zoomIn.onclick = () => svg.transition().call(zoom.scaleBy, 1.5);
      if (zoomOut) zoomOut.onclick = () => svg.transition().call(zoom.scaleBy, 0.67);
      if (zoomReset) zoomReset.onclick = () => svg.transition().duration(600).call(zoom.transform, window.d3.zoomIdentity);

      mapG.append('path').datum(graticule).attr('d', path).attr('fill', 'none').attr('stroke', 'rgba(100,120,200,.12)').attr('stroke-width', .5);

      const tooltip = document.getElementById('mapTooltip');

      fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        .then(r => r.json())
        .then(world => {
          const countries = window.topojson.feature(world, world.objects.countries);
          mapG.selectAll('.country').data(countries.features).enter().append('path')
            .attr('class', 'country').attr('d', path).attr('fill', '#c8d4f8').attr('stroke', '#8fa0df').attr('stroke-width', .5)
            .on('mouseover', function () { window.d3.select(this).attr('fill', '#b0c0f0'); })
            .on('mouseout', function () { window.d3.select(this).attr('fill', '#c8d4f8'); });

          const borders = window.topojson.mesh(world, world.objects.countries, (a, b) => a !== b);
          mapG.append('path').datum(borders).attr('d', path).attr('fill', 'none').attr('stroke', 'rgba(100,120,200,.3)').attr('stroke-width', .4);

          alumniCities.forEach(city => {
            const [cx, cy] = projection([city.lng, city.lat]);
            if (!cx || !cy) return;
            const r = Math.max(4, Math.min(10, 3 + city.count / 80));
            const color = cityColors[city.type];
            const g = mapG.append('g').style('cursor', 'pointer');
            g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', r + 3).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 1.5).attr('opacity', .35)
              .append('animate').attr('attributeName', 'r').attr('from', r + 2).attr('to', r + 10).attr('dur', '2.2s').attr('repeatCount', 'indefinite');
            g.append('circle').attr('cx', cx).attr('cy', cy).attr('r', r).attr('fill', color).attr('stroke', '#fff').attr('stroke-width', 1.5).attr('filter', 'drop-shadow(0 2px 4px rgba(0,0,0,.3))');
            if (r >= 10) {
              g.append('text').attr('x', cx).attr('y', cy + 1).attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
                .attr('fill', '#fff').attr('font-size', '7px').attr('font-weight', '700').attr('font-family', 'Outfit,sans-serif')
                .text(city.count > 999 ? Math.round(city.count / 100) / 10 + 'k' : city.count);
            }
            g.on('mouseover', function (e) {
              const rect = svgEl.getBoundingClientRect();
              tooltip.style.opacity = '1';
              tooltip.innerHTML = `<span style="color:#f59e0b">📍</span> ${city.name} &nbsp;·&nbsp; <strong>${city.count}</strong> alumni`;
              tooltip.style.left = (e.clientX - rect.left + 14) + 'px';
              tooltip.style.top = (e.clientY - rect.top - 36) + 'px';
            }).on('mousemove', function (e) {
              const rect = svgEl.getBoundingClientRect();
              tooltip.style.left = (e.clientX - rect.left + 14) + 'px';
              tooltip.style.top = (e.clientY - rect.top - 36) + 'px';
            }).on('mouseout', () => { tooltip.style.opacity = '0'; });
          });
        }).catch(() => {
          svg.append('text').attr('x', W / 2).attr('y', H / 2).attr('text-anchor', 'middle').attr('fill', '#666').attr('font-size', '14px').text('Map data could not be loaded.');
        });
    }

    // Load D3 + Topojson if needed
    function tryInit() {
      if (window.d3 && window.topojson) { initMap(); return; }
      const interval = setInterval(() => { if (window.d3 && window.topojson) { clearInterval(interval); initMap(); } }, 200);
    }

    if (!window.d3) {
      const d3s = document.createElement('script');
      d3s.src = 'https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js';
      d3s.onload = () => {
        const ts = document.createElement('script');
        ts.src = 'https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js';
        ts.onload = tryInit;
        document.head.appendChild(ts);
      };
      document.head.appendChild(d3s);
    } else {
      tryInit();
    }
  }, []);

  return (
    <div className="page page-enter">
      <div className="sh"><div><div className="sht">Alumni World Map</div><div className="shs">Where 4,821 alumni are working globally</div></div></div>
      <div className="g4" style={{ marginBottom: 16 }}>
        {[['2,140','India'],['890','USA'],['420','Europe'],['310','SE Asia']].map(([n,l]) => (
          <div key={l} className="card sc"><div className="sn">{n}</div><div className="sl">{l}</div></div>
        ))}
      </div>
      <div className="card" style={{ padding: 0, overflow: 'hidden', position: 'relative' }}>
        {/* Controls */}
        <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 10, display: 'flex', gap: 6 }}>
          {[['mapZoomIn','+'],['mapZoomOut','−']].map(([id, lbl]) => (
            <button key={id} id={id} style={{ width: 30, height: 30, borderRadius: 7, border: '1.5px solid var(--border)', background: 'rgba(255,255,255,.9)', backdropFilter: 'blur(6px)', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--forest)' }}>{lbl}</button>
          ))}
          <button id="mapReset" style={{ padding: '0 10px', height: 30, borderRadius: 7, border: '1.5px solid var(--border)', background: 'rgba(255,255,255,.9)', backdropFilter: 'blur(6px)', cursor: 'pointer', fontSize: '.7rem', fontWeight: 700, color: 'var(--forest)', fontFamily: "'Outfit',sans-serif" }}>Reset</button>
        </div>
        {/* Legend */}
        <div style={{ position: 'absolute', bottom: 14, left: 14, zIndex: 10, display: 'flex', gap: 12, fontSize: '.68rem', fontWeight: 600, background: 'rgba(255,255,255,.88)', backdropFilter: 'blur(6px)', padding: '6px 12px', borderRadius: 8, border: '1px solid var(--border)' }}>
          {[['#7c3aed','India'],['#f59e0b','Americas'],['#0ea5e9','Europe'],['#10b981','Asia-Pacific']].map(([c, l]) => (
            <span key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block' }} /> {l}
            </span>
          ))}
        </div>
        {/* Tooltip */}
        <div id="mapTooltip" style={{ position: 'absolute', zIndex: 20, background: 'var(--forest)', color: '#fff', padding: '8px 13px', borderRadius: 9, fontSize: '.75rem', fontWeight: 600, pointerEvents: 'none', opacity: 0, transition: 'opacity .15s', whiteSpace: 'nowrap', boxShadow: '0 4px 16px rgba(0,0,0,.25)' }} />
        <svg id="worldMapSvg" style={{ width: '100%', height: 480, display: 'block', background: 'linear-gradient(160deg,#e8eeff 0%,#eef0ff 50%,#e4e8ff 100%)', cursor: 'grab' }} />
      </div>
      {/* Stats */}
      <div className="g3" style={{ marginTop: 16 }}>
        {mapStatData.map(d => (
          <div key={d.t} className="card">
            <div style={{ fontWeight: 700, color: 'var(--forest)', marginBottom: 11 }}>{d.t}</div>
            {d.rows.map(r => (
              <div key={r[0]} style={{ marginBottom: 9 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.76rem', marginBottom: 3 }}>
                  <span>{r[0]}</span><span style={{ color: 'var(--terra)', fontWeight: 600 }}>{r[1]}</span>
                </div>
                <div className="pbar"><div className="pfill" style={{ width: r[2] }} /></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
