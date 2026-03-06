import { useDirectory } from '../../hooks/useDirectory';

function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20, paddingBottom: 8 }}>
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

export default function Directory({ onOpenModal }) {
  const { rows, branchCounts, total, totalPages, page, setPage, sortBy, changeSortBy, loading, error } = useDirectory();

  return (
    <div className="page page-enter">
      <div className="sh">
        <div>
          <div className="sht">Alumni Directory</div>
          <div className="shs">{loading ? 'Loading…' : `${total} alumni total`}</div>
        </div>
        <div style={{ display: 'flex', gap: 7 }}>
          {[['batch','By Year'], ['branch','By Branch'], ['job_type','By Job Type']].map(([key, label]) => (
            <button key={key} className={`btn bsm ${sortBy === key ? 'bt' : 'bo'}`} onClick={() => changeSortBy(key)}>{label}</button>
          ))}
        </div>
      </div>

      {/* Branch count summary */}
      <div className="g4" style={{ marginBottom: 20 }}>
        {branchCounts.slice(0, 4).map(b => (
          <div key={b.branch} className="card" style={{ textAlign: 'center', padding: 13 }}>
            <div style={{ fontSize: '1.45rem', fontWeight: 700, fontFamily: "'Fraunces',serif", color: 'var(--terra)' }}>{b.count}</div>
            <div style={{ color: 'var(--muted)', fontSize: '.73rem' }}>{b.branch}</div>
          </div>
        ))}
      </div>

      {error && (
        <div style={{ padding: '16px 20px', background: 'rgba(220,50,50,.08)', border: '1.5px solid rgba(220,50,50,.2)', borderRadius: 11, marginBottom: 20, color: '#c44', fontSize: '.84rem' }}>
          ⚠️ {error} — make sure the backend is running on <code>localhost:5000</code>
        </div>
      )}

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table>
          <thead>
            <tr>
              <th>Alumni</th><th>Branch</th><th>Batch</th><th>Company</th><th>Location</th><th>Role</th><th>Connections</th><th></th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 8 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 8 }).map((_, j) => (
                      <td key={j}><div style={{ height: 12, borderRadius: 4, background: 'var(--bg2)', width: j === 0 ? 140 : 80 }} /></td>
                    ))}
                  </tr>
                ))
              : rows.map(x => (
                  <tr key={x.rollno}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                        <div className="av" style={{ width: 28, height: 28, fontSize: '.68rem', background: x.avatar_color || 'var(--forest)' }}>{x.av}</div>
                        <div>
                          <div style={{ fontWeight: 600 }}>{x.name}</div>
                          <div style={{ color: 'var(--muted)', fontSize: '.69rem' }}>{x.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="chip cf">{x.branch}</span></td>
                    <td>{x.batch}</td>
                    <td>{x.company}</td>
                    <td>📍 {x.location}</td>
                    <td>{x.job_role}</td>
                    <td><span className="chip ct">🔗 {x.num_connections}</span></td>
                    <td><button className="btn bt bsm" onClick={() => onOpenModal('mentor')}>Connect</button></td>
                  </tr>
                ))
            }
          </tbody>
        </table>
      </div>

      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
}
