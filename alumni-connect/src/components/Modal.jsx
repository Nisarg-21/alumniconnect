import { useEffect } from 'react';

export default function Modal({ id, open, onClose, title, children, maxWidth = 490 }) {
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="mo open" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={{ maxWidth }}>
        <button className="mc" onClick={onClose}>✕</button>
        <div className="mtl">{title}</div>
        {children}
      </div>
    </div>
  );
}
