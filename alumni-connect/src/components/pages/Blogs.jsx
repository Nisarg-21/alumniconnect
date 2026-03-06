import { blogs } from '../../data';

export default function Blogs({ onOpenModal }) {
  return (
    <div className="page page-enter">
      <div className="sh">
        <div><div className="sht">Alumni Blogs</div><div className="shs">Insights and stories from our community</div></div>
        <button className="btn bt" onClick={() => onOpenModal('blog')}>+ Write Blog</button>
      </div>
      <div className="filters">
        <select className="fs"><option>All Categories</option><option>Career</option><option>Tech</option><option>Entrepreneurship</option><option>Life</option></select>
      </div>
      <div className="g3">
        {blogs.map(x => (
          <div key={x.t} className="blc">
            <div className={`bli ${x.bg}`}>{x.e}</div>
            <div className="blb">
              <span className="chip ct" style={{ marginBottom: 6 }}>{x.cat}</span>
              <div className="blt">{x.t}</div>
              <div className="ble">{x.ex}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <div className="av" style={{ width: 24, height: 24, fontSize: '.62rem', background: 'var(--forest)' }}>{x.a.split(' ').map(n => n[0]).join('')}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: '.76rem' }}>{x.a}</div>
                  <div style={{ color: 'var(--muted)', fontSize: '.67rem' }}>{x.b} · {x.d}</div>
                </div>
                <button className="btn bo bsm">Read →</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
