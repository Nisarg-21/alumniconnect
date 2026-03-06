import { useAlumniSearch } from '../../hooks/useAlumniSearch';

function SkeletonCard() {
  return (
    <div className="ac" style={{ opacity: .5 }}>
      <div className="at">
        <div style={{ width: 45, height: 45, borderRadius: 11, background: 'var(--bg2)' }} />
        <div style={{ flex: 1 }}>
          <div style={{ height: 13, borderRadius: 6, background: 'var(--bg2)', marginBottom: 6, width: '70%' }} />
          <div style={{ height: 11, borderRadius: 6, background: 'var(--bg2)', width: '50%' }} />
        </div>
      </div>
      <div style={{ height: 11, borderRadius: 6, background: 'var(--bg2)', marginBottom: 9 }} />
      <div style={{ height: 32, borderRadius: 9, background: 'var(--bg2)' }} />
    </div>
  );
}

function AlumniCard({ x, onMentorRequest }) {
  const initials = x.av || x.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <div className="ac">
      <div className="at">
        <div className="av" style={{ background: x.avatar_color || 'var(--forest)' }}>{initials}</div>
        <div>
          <div className="an">{x.name}</div>
          <div className="ar">{x.job_role} · {x.company}</div>
        </div>
      </div>
      <div className="ai">
        📍 {x.location} &nbsp;|&nbsp; 🎓 {x.branch} {x.batch} &nbsp;|&nbsp; 💼 {x.exp}
      </div>
      <div style={{ marginBottom: 10 }}>
        {(x.chips || []).map(c => <span key={c} className="chip ct">{c}</span>)}
        {x.num_connections > 0 && <span className="chip cf">🔗 {x.num_connections} connections</span>}
      </div>
      <button className="btn bt bsm" style={{ width: '100%' }} onClick={onMentorRequest}>🤝 Request Mentorship</button>
    </div>
  );
}

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
      <button className="btn bo bsm" disabled={page === 1} onClick={() => onPageChange(page - 1)}>← Prev</button>
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(p => Math.abs(p - page) <= 2)
        .map(p => (
          <button key={p} className={`btn bsm ${p === page ? 'bt' : 'bo'}`} onClick={() => onPageChange(p)}>{p}</button>
        ))}
      <button className="btn bo bsm" disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>Next →</button>
    </div>
  );
}

export default function SearchAlumni({ onOpenModal }) {
  const { filters, updateFilter, clearFilters, page, setPage, results, total, totalPages, loading, error, filterOpts } = useAlumniSearch();
  const hasActiveFilters = Object.values(filters).some(v => v !== '');

  return (
    <div className="page page-enter">
      <div className="sh">
        <div>
          <div className="sht">Search Alumni</div>
          <div className="shs">{loading ? 'Searching…' : `${total.toLocaleString()} alumni found`}</div>
        </div>
        {hasActiveFilters && <button className="btn bo bsm" onClick={clearFilters}>✕ Clear Filters</button>}
      </div>

      <div className="filters">
        <input className="sb" placeholder="🔍  Name, company, skill…" style={{ width: 215 }} value={filters.q} onChange={e => updateFilter('q', e.target.value)} />
        <select className="fs" value={filters.branch} onChange={e => updateFilter('branch', e.target.value)}>
          <option value="">All Branches</option>
          {filterOpts.branches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select className="fs" value={filters.batch} onChange={e => updateFilter('batch', e.target.value)}>
          <option value="">All Batches</option>
          {filterOpts.batches.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select className="fs" value={filters.location} onChange={e => updateFilter('location', e.target.value)}>
          <option value="">All Locations</option>
          {filterOpts.locations.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
        <select className="fs" value={filters.job_type} onChange={e => updateFilter('job_type', e.target.value)}>
          <option value="">Job Type</option>
          {filterOpts.job_types.map(j => <option key={j} value={j}>{j}</option>)}
        </select>
        <select className="fs" value={filters.company} onChange={e => updateFilter('company', e.target.value)}>
          <option value="">Company</option>
          {filterOpts.companies.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="fs" value={filters.experience} onChange={e => updateFilter('experience', e.target.value)}>
          <option value="">Experience</option>
          <option value="0-2">0–2 yrs</option>
          <option value="3-5">3–5 yrs</option>
          <option value="5-10">5–10 yrs</option>
          <option value="10+">10+ yrs</option>
        </select>
      </div>

      {error && (
        <div style={{ padding: '16px 20px', background: 'rgba(220,50,50,.08)', border: '1.5px solid rgba(220,50,50,.2)', borderRadius: 11, marginBottom: 20, color: '#c44', fontSize: '.84rem' }}>
          ⚠️ {error} — make sure the backend is running on <code>localhost:5000</code>
        </div>
      )}

      <div className="g3">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          : results.length > 0
            ? results.map(x => <AlumniCard key={x.rollno} x={x} onMentorRequest={() => onOpenModal('mentor')} />)
            : (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔍</div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: '1.2rem', marginBottom: 6 }}>No alumni found</div>
                <div style={{ fontSize: '.84rem' }}>Try adjusting your filters</div>
                {hasActiveFilters && <button className="btn bo bsm" style={{ marginTop: 14 }} onClick={clearFilters}>Clear Filters</button>}
              </div>
            )
        }
      </div>
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
