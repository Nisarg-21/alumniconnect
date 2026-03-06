import Modal from './Modal';
import { notifs } from '../data';

export default function Modals({ openModal, onClose, onNavigate }) {
  const close = () => onClose();

  return (
    <>
      {/* Mentorship Modal */}
      <Modal open={openModal === 'mentor'} onClose={close} title="Request Mentorship">
        <div className="fg"><label className="fl">Select Mentor</label>
          <select className="fi"><option>Priya Sharma — Google, SWE-3</option><option>Rahul Kumar — Microsoft, PM</option><option>Ananya Mishra — Zomato, DS</option></select>
        </div>
        <div className="fg"><label className="fl">Mentorship Area</label>
          <select className="fi"><option>Career Guidance</option><option>Technical Skills</option><option>Interview Prep</option><option>Startup Advice</option></select>
        </div>
        <div className="fg"><label className="fl">Your Goals</label>
          <textarea className="fi" placeholder="Tell the mentor about your goals…" />
        </div>
        <div className="fg"><label className="fl">Preferred Schedule</label>
          <input className="fi" placeholder="e.g. Weekends after 7pm" />
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 5 }}>
          <button className="btn bt" style={{ flex: 1 }} onClick={() => { close(); alert("Request sent! You'll hear back within 48 hours."); }}>Send Request</button>
          <button className="btn bo" onClick={close}>Cancel</button>
        </div>
      </Modal>

      {/* Event Modal */}
      <Modal open={openModal === 'event'} onClose={close} title="Create an Event">
        <div className="fg"><label className="fl">Event Title</label><input className="fi" placeholder="e.g. AI Career Workshop 2025" /></div>
        <div className="fg"><label className="fl">Type</label><select className="fi"><option>Workshop</option><option>Reunion</option><option>Webinar</option><option>Mentoring Session</option></select></div>
        <div className="fg"><label className="fl">Date & Time</label><input className="fi" type="datetime-local" /></div>
        <div className="fg"><label className="fl">Mode</label><select className="fi"><option>Online</option><option>In-Person</option><option>Hybrid</option></select></div>
        <div className="fg"><label className="fl">Max Attendees</label><input className="fi" type="number" placeholder="e.g. 100" /></div>
        <div className="fg"><label className="fl">Description</label><textarea className="fi" placeholder="What will attendees experience?" /></div>
        <div style={{ display: 'flex', gap: 8, marginTop: 5 }}>
          <button className="btn bt" style={{ flex: 1 }} onClick={() => { close(); alert('Event created! Pending admin approval.'); }}>Create Event</button>
          <button className="btn bo" onClick={close}>Cancel</button>
        </div>
      </Modal>

      {/* Job Modal */}
      <Modal open={openModal === 'job'} onClose={close} title="Post an Opportunity">
        <div className="fg"><label className="fl">Job Title</label><input className="fi" placeholder="e.g. Software Engineering Intern" /></div>
        <div className="fg"><label className="fl">Company</label><input className="fi" placeholder="Company name" /></div>
        <div className="fg"><label className="fl">Type</label><select className="fi"><option>Full-time</option><option>Internship</option><option>Contract</option></select></div>
        <div className="fg"><label className="fl">Location</label><input className="fi" placeholder="e.g. Bangalore or Remote" /></div>
        <div className="fg"><label className="fl">Description</label><textarea className="fi" placeholder="Job description, skills required…" /></div>
        <div style={{ display: 'flex', gap: 8, marginTop: 5 }}>
          <button className="btn bt" style={{ flex: 1 }} onClick={() => { close(); alert('Job posted! Pending admin approval.'); }}>Post Job</button>
          <button className="btn bo" onClick={close}>Cancel</button>
        </div>
      </Modal>

      {/* Blog Modal */}
      <Modal open={openModal === 'blog'} onClose={close} title="Write a Blog Post">
        <div className="fg"><label className="fl">Title</label><input className="fi" placeholder="Your blog title…" /></div>
        <div className="fg"><label className="fl">Category</label><select className="fi"><option>Career</option><option>Tech</option><option>Entrepreneurship</option><option>Life</option></select></div>
        <div className="fg"><label className="fl">Content</label><textarea className="fi" style={{ minHeight: 120 }} placeholder="Share your insights…" /></div>
        <div style={{ display: 'flex', gap: 8, marginTop: 5 }}>
          <button className="btn bt" style={{ flex: 1 }} onClick={() => { close(); alert('Blog submitted for review!'); }}>Publish</button>
          <button className="btn bo" onClick={close}>Cancel</button>
        </div>
      </Modal>

      {/* Story Modal */}
      <Modal open={openModal === 'story'} onClose={close} title="Share Your Story">
        <div className="fg"><label className="fl">Headline</label><input className="fi" placeholder="e.g. From campus to Google in 6 months" /></div>
        <div className="fg"><label className="fl">Your Story</label><textarea className="fi" style={{ minHeight: 120 }} placeholder="Tell us your journey…" /></div>
        <div style={{ display: 'flex', gap: 8, marginTop: 5 }}>
          <button className="btn bt" style={{ flex: 1 }} onClick={() => { close(); alert('Thank you! Your story will inspire many students.'); }}>Submit</button>
          <button className="btn bo" onClick={close}>Cancel</button>
        </div>
      </Modal>

      {/* Notifications Modal */}
      <Modal open={openModal === 'notif'} onClose={close} title="Notifications">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {notifs.map((x, i) => (
            <div key={i} style={{ padding: '10px 13px', background: x.bg, borderRadius: 8, borderLeft: `3px solid ${x.col}` }}>
              <div style={{ fontWeight: 600, fontSize: '.83rem' }}>{x.ic} {x.t}</div>
              <div style={{ color: 'var(--muted)', fontSize: '.73rem', marginTop: 2 }}>{x.s}</div>
            </div>
          ))}
        </div>
      </Modal>

      {/* Quick Actions Modal */}
      <Modal open={openModal === 'quick'} onClose={close} title="Quick Actions" maxWidth={370}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
          {[
            { label: '🤝 Request Mentorship', cls: 'btn bt', action: () => { close(); onNavigate('modal:mentor'); } },
            { label: '📅 Create an Event',    cls: 'btn bf', action: () => { close(); onNavigate('modal:event'); } },
            { label: '💼 Post a Job',         cls: 'btn bo', action: () => { close(); onNavigate('modal:job');   } },
            { label: '✍️ Write a Blog',       cls: 'btn bo', action: () => { close(); onNavigate('modal:blog');  } },
            { label: '⭐ Share Success Story',cls: 'btn bo', action: () => { close(); onNavigate('modal:story'); } },
          ].map(({ label, cls, action }) => (
            <button key={label} className={cls} style={{ width: '100%', justifyContent: 'flex-start', padding: '12px 15px' }} onClick={action}>{label}</button>
          ))}
        </div>
      </Modal>

      {/* Profile Modal */}
      <Modal open={openModal === 'profile'} onClose={close} title="My Profile" maxWidth={390}>
        <div className="fg"><label className="fl">Name</label><input className="fi" defaultValue="John Student" /></div>
        <div className="fg"><label className="fl">Email</label><input className="fi" defaultValue="john@university.edu" /></div>
        <div className="fg"><label className="fl">Batch</label><input className="fi" defaultValue="CS 2025" /></div>
        <div className="fg"><label className="fl">Bio</label><textarea className="fi">Final year CS student interested in AI/ML and product development.</textarea></div>
        <div style={{ display: 'flex', gap: 8, marginTop: 5 }}>
          <button className="btn bt" style={{ flex: 1 }} onClick={close}>Save Changes</button>
          <button className="btn bo" onClick={close}>Cancel</button>
        </div>
      </Modal>
    </>
  );
}
