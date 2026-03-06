const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// Alumni
export const alumniApi = {
  search(params = {}) {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null))
    ).toString();
    return request(`/alumni/search${qs ? '?' + qs : ''}`);
  },
  getFilters() { return request('/alumni/filters'); },
  getProfile(rollno) { return request(`/alumni/${rollno}`); },
};

// Directory
export const directoryApi = {
  list(params = {}) {
    const qs = new URLSearchParams(
      Object.fromEntries(Object.entries(params).filter(([, v]) => v !== '' && v != null))
    ).toString();
    return request(`/directory${qs ? '?' + qs : ''}`);
  },
};

// Auth
export const authApi = {
  login(email, password) {
    return request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  },
};

// Chat
export const chatApi = {
  send(messages) {
    return request('/chat', { method: 'POST', body: JSON.stringify({ messages }) });
  },
};
