import { events } from '../../data';

export default function Events({ onOpenModal }) {
  return (
    <div className="page page-enter">
      <div className="sh">
        <div><div className="sht">Events</div><div className="shs">Reunions, workshops, webinars & more</div></div>
        <button className="btn bt" onClick={() => onOpenModal('event')}>+ Create Event</button>
      </div>
      <div className="filters">
        <select className="fs"><option>All Types</option><option>Reunion</option><option>Workshop</option><option>Webinar</option><option>Mentoring</option></select>
        <select className="fs"><option>All Modes</option><option>Online</option><option>In-Person</option><option>Hybrid</option></select>
        <select className="fs"><option>Month</option><option>March 2025</option><option>April 2025</option></select>
      </div>
      <div className="g3">
        {events.map(e => (
          <div key={e.t} className="evc">
            <div className={`evb ${e.cl}`}>
              <span className="evd">{e.d}</span>
              <div className="evt">{e.t}</div>
            </div>
            <div className="evbd">
              <div className="evm"><span>{e.mode}</span><span>📍 {e.loc}</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="chip ct">{e.type}</span>
                <span style={{ fontSize: '.7rem', color: 'var(--muted)' }}>👥 {e.att}</span>
              </div>
              <button className="btn bt bsm" style={{ width: '100%', marginTop: 10 }} onClick={() => alert('Registered!')}>Register</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
