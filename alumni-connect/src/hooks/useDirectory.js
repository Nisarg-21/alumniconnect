import { useState, useEffect } from 'react';
import { directoryApi } from '../api';

export function useDirectory() {
  const [sortBy,      setSortBy]      = useState('batch');
  const [page,        setPage]        = useState(1);
  const [rows,        setRows]        = useState([]);
  const [branchCounts,setBranchCounts]= useState([]);
  const [total,       setTotal]       = useState(0);
  const [totalPages,  setTotalPages]  = useState(1);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    directoryApi.list({ sort_by: sortBy, page, limit: 20 })
      .then(res => {
        setRows(res.data);
        setTotal(res.total);
        setTotalPages(res.totalPages);
        setBranchCounts(res.branchCounts || []);
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [sortBy, page]);

  function changeSortBy(s) { setSortBy(s); setPage(1); }

  return { rows, branchCounts, total, totalPages, page, setPage, sortBy, changeSortBy, loading, error };
}
