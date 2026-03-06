# AlumniConnect — Setup Guide

## Project Structure
```
alumni-backend/      ← Express API (Node.js)
alumni-connect/      ← React frontend (Vite)
```

---

## 1. Backend Setup

```bash
cd alumni-backend
npm install
npm run dev          # starts on http://localhost:5000
```

### Verify it's working
Open http://localhost:5000/api/health — you should see `{"status":"ok"}`

### API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/alumni/search` | Search with filters |
| GET | `/api/alumni/filters` | Get dropdown options |
| GET | `/api/alumni/:rollno` | Single profile |
| GET | `/api/directory` | Paginated directory |
| POST | `/api/auth/login` | Login |

### Search Query Params
```
/api/alumni/search?q=google&branch=CS&batch=2020&location=Bangalore&experience=3-5&page=1&limit=12
```

---

## 2. Frontend Setup

```bash
cd alumni-connect
npm install
npm run dev          # starts on http://localhost:5173
```

Make sure `.env` has:
```
VITE_API_URL=http://localhost:5000/api
```

---

## 3. Database

The `database.db` file sits in `alumni-backend/`.

**Migrated schema** (columns added to `Alumni_Student`):
- `branch` — CS, ECE, MECH, CIVIL, MBA, EEE
- `batch` — graduation year (2015–2024)
- `company` — employer name
- `location` — city/country
- `job_role` — job title
- `experience_years` — integer
- `is_mentor` — 0/1
- `is_hiring` — 0/1
- `avatar_color` — CSS gradient string

**Sample logins:**
- Student: `student1@student.com` / `studentpass1`
- Faculty: `faculty1@faculty.com` / `facultypass1`
- Admin: `admin1@admin.com` / `adminpass1`
