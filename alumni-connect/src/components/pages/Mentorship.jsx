import { sessions, mentors } from '../../data';

export default function Mentorship({ onOpenModal }) {
  return (
    <div className="page page-enter">
      <div className="sh">
        <div><div className="sht">Mentorship Hub</div><div className="shs">Connect with experienced alumni mentors</div></div>
        <button className="btn bt" onClick={() => onOpenModal('mentor')}>+ Request Mentorship</button>
      </div>
      <div className="g3" style={{ marginBottom: 20 }}>
        {[['312','Active Mentors'],['1,280','Sessions Done'],['4.8★','Avg Rating']].map(([n,l]) => (
          <div key={l} className="card sc"><div className="sn">{n}</div><div className="sl">{l}</div></div>
        ))}
      </div>
      <div className="sh" style={{ marginTop: 2 }}>
        <div><div className="sht" style={{ fontSize: '1.05rem' }}>Open Mentorship Sessions</div><div className="shs">Created by alumni — register now</div></div>
      </div>
      <div className="g3" style={{ marginBottom: 22 }}>
        {sessions.map(x => (
          <div key={x.t} className="ac">
            <div style={{ fontSize: '1.7rem', marginBottom: 7 }}>{x.ic}</div>
            <div style={{ fontWeight: 700, fontSize: '.89rem', marginBottom: 4 }}>{x.t}</div>
            <div style={{ color: 'var(--muted)', fontSize: '.74rem', marginBottom: 10 }}>by {x.m} · {x.co}</div>
            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', fontSize: '.71rem', color: 'var(--muted)', marginBottom: 11 }}>
              <span>📅 {x.d}</span><span>🕒 {x.tm}</span><span>💺 {x.s} left</span>
            </div>
            <button className="btn bt bsm" style={{ width: '100%' }} onClick={() => alert('Registered! Check your email.')}>Register Now</button>
          </div>
        ))}
      </div>
      <div className="sh"><div><div className="sht" style={{ fontSize: '1.05rem' }}>Featured Mentors</div></div></div>
      <div className="g3">
        {mentors.map(x => (
          <div key={x.n} className="ac">
            <div className="at">
              <div className="av" style={{ background: x.bg }}>{x.av}</div>
              <div><div className="an">{x.n}</div><div className="ar">{x.tag}</div></div>
            </div>
            <div style={{ color: 'var(--muted)', fontSize: '.74rem', marginBottom: 8 }}>✨ {x.sk}</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '.72rem', color: 'var(--muted)', marginBottom: 11 }}>
              <span>⭐ {x.r}</span><span>📋 {x.s} sessions</span>
            </div>
            <button className="btn bt bsm" style={{ width: '100%' }} onClick={() => onOpenModal('mentor')}>Request Session</button>
          </div>
        ))}
      </div>
    </div>
  );
}
