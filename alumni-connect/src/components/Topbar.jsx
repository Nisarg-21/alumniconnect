import { titles } from '../data';

export default function Topbar({ currentPage, onNotif, onQuickAction, notifSeen }) {
  return (
    <div className="topbar">
      <div className="pgt">{titles[currentPage] || currentPage}</div>
      <div className="tbr">
        <input className="sb" placeholder="🔍  Search alumni, events…" />
        <button className="btn bo bsm" onClick={onNotif}>
          🔔 {!notifSeen && <span style={{ background: 'var(--terra)', color: '#fff', borderRadius: '99px', padding: '1px 6px', fontSize: '.58rem' }}>5</span>}
        </button>
        <button className="btn bt bsm" onClick={onQuickAction}>+ Quick Action</button>
      </div>
    </div>
  );
}
