import { useEffect, useRef, useState } from 'react';

function useTypewriter(text, delay = 300) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    setDisplayed('');
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(prev => prev + text[i++]);
        if (i >= text.length) clearInterval(interval);
      }, 45);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, delay]);
  return displayed;
}

export default function Dashboard({ role, user, onOpenModal, onNavigate }) {
  const particlesRef = useRef(null);

  // Get name directly - no typewriter on dynamic values
  let displayName = 'there';
  if (user && user.name && typeof user.name === 'string') {
    displayName = user.name;
  } else if (role === 'Admin') {
    displayName = 'Admin';
  } else if (role === 'Faculty') {
    displayName = 'Faculty';
  }

  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    container.innerHTML = '';
    for (let i = 0; i < 18; i++) {
      const p = document.createElement('div');
      p.className = 'hp';
      p.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;
        animation-duration:${3 + Math.random() * 5}s;animation-delay:${-Math.random() * 6}s;
        width:${2 + Math.random() * 3}px;height:${2 + Math.random() * 3}px;
        background:${Math.random() > .6 ? 'rgba(245,158,11,.7)' : 'rgba(255,255,255,.5)'};`;
      container.appendChild(p);
    }
  }, []);

  const recentAlumni = [
    { av: 'PS', bg: 'linear-gradient(135deg,#0f1535,#090e30)', n: 'Priya Sharma', sub: 'Google · SWE-3 · Batch 2020', chip: 'Mentor', chipCls: 'cs' },
    { av: 'RK', bg: 'linear-gradient(135deg,#3b0f8c,#1e0754)', n: 'Rahul Kumar', sub: 'Microsoft · PM · Batch 2019', chip: 'Active', chipCls: 'ct' },
    { av: 'AM', bg: 'linear-gradient(135deg,#f59e0b,#c47800)', n: 'Ananya Mishra', sub: 'Zomato · Data Sci · Batch 2021', chip: 'New', chipCls: 'cf' },
  ];

  const upcomingEvents = [
    { day: '15', mon: 'MAR', bg: 'var(--forest)', title: 'Annual Alumni Meet 2025', sub: 'Main Auditorium · 487 attending' },
    { day: '22', mon: 'MAR', bg: 'var(--terra)', title: 'Tech Career Workshop', sub: 'Virtual · 120 registered' },
    { day: '01', mon: 'APR', bg: 'var(--sage)', title: 'Startup Pitch Night', sub: 'Innovation Lab · 45 seats left', dark: true },
  ];

  return (
    <div id="page-dashboard" style={{ padding: 0 }}>
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="hero-overlay" />
        <div className="hero-particles" ref={particlesRef} />
        <div className="hero-content">
          <div className="greet-text">
            Good morning, {displayName} 👋
          </div>
          <p style={{ color: 'rgba(255,255,255,.75)', fontSize: '.95rem', marginBottom: 20, maxWidth: 480 }}>
            Here's what's happening in your alumni network today.
          </p>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn" onClick={() => onOpenModal('mentor')} style={{ background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,.3)', color: '#fff' }}>🤝 Find a Mentor</button>
            <button className="btn" onClick={() => onNavigate('jobs')} style={{ background: 'rgba(245,158,11,.85)', color: '#0f1535', fontWeight: 700, border: 'none' }}>💼 Browse Jobs</button>
            <button className="btn bo" onClick={() => onNavigate('ai')} style={{ background: 'rgba(255,255,255,.1)', backdropFilter: 'blur(8px)', border: '1.5px solid rgba(255,255,255,.25)', color: '#fff' }}>🤖 AI Advisor</button>
          </div>
        </div>

      </div>

      {/* Dashboard Content */}
      <div style={{ padding: '28px 30px' }}>


        {/* Recent Alumni + Upcoming Events */}
        <div className="g2" style={{ marginBottom: 18 }}>
          <div className="card">
            <div className="sh">
              <div><div className="sht">Recent Alumni</div><div className="shs">Newly registered members</div></div>
              <button className="btn bo bsm" onClick={() => onNavigate('directory')}>View All</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {recentAlumni.map(a => (
                <div key={a.n} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 9, background: 'var(--bg2)', borderRadius: 9 }}>
                  <div className="av" style={{ width: 34, height: 34, fontSize: '.75rem', background: a.bg }}>{a.av}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '.84rem' }}>{a.n}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '.71rem' }}>{a.sub}</div>
                  </div>
                  <span className={`chip ${a.chipCls}`}>{a.chip}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="sh">
              <div><div className="sht">Upcoming Events</div><div className="shs">Don't miss out</div></div>
              <button className="btn bo bsm" onClick={() => onNavigate('events')}>View All</button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
              {upcomingEvents.map(ev => (
                <div key={ev.title} style={{ display: 'flex', gap: 11, alignItems: 'center', padding: 9, background: 'var(--bg2)', borderRadius: 9 }}>
                  <div style={{ background: ev.bg, color: ev.dark ? '#0f1535' : '#fff', width: 40, height: 40, borderRadius: 8, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '.67rem', flexShrink: 0 }}>
                    <span style={{ fontSize: '.9rem', lineHeight: 1 }}>{ev.day}</span>{ev.mon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '.84rem' }}>{ev.title}</div>
                    <div style={{ color: 'var(--muted)', fontSize: '.71rem' }}>{ev.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="sht" style={{ marginBottom: 13 }}>Quick Actions</div>
          <div style={{ display: 'flex', gap: 9, flexWrap: 'wrap' }}>
            <button className="btn bt" onClick={() => onOpenModal('mentor')}>🤝 Request Mentorship</button>
            <button className="btn bf" onClick={() => onNavigate('jobs')}>💼 Browse Jobs</button>
            <button className="btn bo" onClick={() => onOpenModal('event')}>📅 Create Event</button>
            <button className="btn bo" onClick={() => onNavigate('ai')}>🤖 AI Recommendations</button>
            <button className="btn bo" onClick={() => onNavigate('fundraising')}>❤️ Donate</button>
          </div>
        </div>
      </div>
    </div>
  );
}