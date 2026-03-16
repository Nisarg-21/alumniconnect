import { useState, useEffect, useCallback, useRef } from 'react';
import { alumniApi } from '../api';

const DEBOUNCE_MS = 350;

export function useAlumniSearch() {
  const [filters, setFilters] = useState({
    q:          '',
    branch:     '',
    batch:      '',
    location:   '',
    job_type:   '',
    company:    '',
    experience: '',
  });
  const [page,        setPage]        = useState(1);
  const [results,     setResults]     = useState([]);
  const [total,       setTotal]       = useState(0);
  const [totalPages,  setTotalPages]  = useState(1);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState(null);
  const [filterOpts,  setFilterOpts]  = useState({ branches:[], batches:[], locations:[], companies:[], job_types:[] });

  const debounceRef = useRef(null);

  useEffect(() => {
    alumniApi.getFilters()
      .then(setFilterOpts)
      .catch(err => console.error('Failed to load filters:', err));
  }, []);

  const doSearch = useCallback(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await alumniApi.search({ ...filters, page, limit: 12 });
        setResults(res.data);
        setTotal(res.total);
        setTotalPages(res.totalPages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);
  }, [filters, page]);

  useEffect(() => { doSearch(); }, [doSearch]);

  function updateFilter(key, value) {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // 
  }

  function clearFilters() {
    setFilters({ q:'', branch:'', batch:'', location:'', job_type:'', company:'', experience:'' });
    setPage(1);
  }

  return {
    filters, updateFilter, clearFilters,
    page, setPage,
    results, total, totalPages,
    loading, error,
    filterOpts,
  };
}
