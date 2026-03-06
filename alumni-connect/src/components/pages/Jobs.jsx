import { jobs } from '../../data';

export default function Jobs({ onOpenModal }) {
  return (
    <div className="page page-enter">
      <div className="sh">
        <div><div className="sht">Jobs & Internships</div><div className="shs">Opportunities posted by alumni</div></div>
        <button className="btn bt" onClick={() => onOpenModal('job')}>+ Post Opportunity</button>
      </div>
      <div className="filters">
        <input className="sb" placeholder="🔍  Role, company, skill…" style={{ width: 200 }} />
        <select className="fs"><option>All Types</option><option>Full-time</option><option>Internship</option><option>Contract</option></select>
        <select className="fs"><option>Domain</option><option>Engineering</option><option>Design</option><option>Marketing</option><option>Finance</option></select>
        <select className="fs"><option>Location</option><option>Remote</option><option>Bangalore</option><option>Mumbai</option><option>USA</option></select>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {jobs.map(j => (
          <div key={j.t} className="card" style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16 }}>
            <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(124,58,237,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', flexShrink: 0 }}>💼</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: '.9rem' }}>{j.t}</div>
              <div style={{ color: 'var(--muted)', fontSize: '.73rem', marginTop: 2 }}>{j.co} · {j.loc} · {j.pay}</div>
              <div style={{ marginTop: 6 }}>{j.sk.map(s => <span key={s} className="chip cf">{s}</span>)}</div>
              <div style={{ color: 'var(--muted)', fontSize: '.69rem', marginTop: 5 }}>Posted by {j.by} · Deadline: {j.dl}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end', flexShrink: 0 }}>
              <span className={`chip ${j.type === 'Internship' ? 'cs' : 'ct'}`}>{j.type}</span>
              <button className="btn bt bsm" onClick={() => onOpenModal('mentor')}>Apply</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
