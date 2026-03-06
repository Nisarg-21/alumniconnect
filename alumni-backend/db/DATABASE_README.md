# Database Overview (`database.db`)

This database was built using SQLite and is structured to manage an Alumni, Student, and Faculty networking system. It contains 4 main tables:

## Tables and Structure

### 1. Login
Manages authentication for all types of users (Admins, Students/Alumni, Faculty). Special constraints added for better integrity.
- `id` (VARCHAR, Primary Key): A unique identifier linking the user's role table (roll number, faculty ID, or admin ID).
- `email` (VARCHAR, Unique): The user's email address. Must be unique to avoid duplicate accounts.
- `password_hash` (VARCHAR): The securely hashed password.
- `role` (VARCHAR): Differentiates between 'Admin', 'Student', and 'Faculty'.

### 2. Alumni_Student
Stores profile information specifically for Alumni and Students.
- `rollno` (VARCHAR, Primary Key): The student/alumni roll number. Linked to `Login.id` as a Foreign Key with `ON DELETE CASCADE`.
- `name` (VARCHAR): Full name of the student/alumnus.
- `email` (VARCHAR, Unique): Student/alumni email.
- `batch` (VARCHAR): The graduation batch year (e.g., '2029').
- `branch` (VARCHAR): The field of study or engineering branch (e.g., 'Mechanical Engineering', 'CSE').
- `num_connections` (INTEGER): A dynamic count of how many active connections this individual has on the platform. Default is 0.

### 3. Faculty
Stores profile information for Faculty members.
- `id` (VARCHAR, Primary Key): The faculty unique identifier. Linked to `Login.id` as a Foreign Key with `ON DELETE CASCADE`.
- `name` (VARCHAR): Full name of the faculty member.
- `email` (VARCHAR, Unique): Faculty email.
- `num_connections` (INTEGER): A dynamic count of active connections involving this faculty member. Default is 0.

### 4. Connections
Captures the networking connections between any two individuals on the platform based on their IDs.
- `id1` (VARCHAR): ID of the first person.
- `id2` (VARCHAR): ID of the second person.
- `currently_connected` (BOOLEAN): Defaults to `True` (1). This allows you to 'disconnect' (set and toggle to 0/False) rather than fully deleting the record to preserve history.
- **Primary Key:** `(id1, id2)` - Prevents duplicate or redundant connection records between the exact same two users.

## Hashing Method
* **Hashing Algorithm:** The password column in the `Login` table is secured using **SHA-256** (built into most programming languages like Node.js `crypto` or Python `hashlib.sha256`).
* When checking a password during a login attempt, simply hash the user's plaintext input using SHA-256 and compare it to the `password_hash` stored in the database.

## Dummy Data & Sample Logins

The database has been pre-seeded with up to 30 entries per table:
- 3 Admin accounts
- 300 Student/Alumni accounts
- 50 Faculty accounts
- 1000 random Networking Connections (The `num_connections` counts in the respective tables have also automatically synced).

### Example Logins To Use

**Admins:**
1. **Email:** admin1@admin.com / **Password:** adminpass1 / **Role:** Admin
2. **Email:** admin2@admin.com / **Password:** adminpass2 / **Role:** Admin
3. **Email:** admin3@admin.com / **Password:** adminpass3 / **Role:** Admin

**Alumni / Students:**
1. **Email:** student1@student.com / **Password:** studentpass1 / **Role:** Student
2. **Email:** student2@student.com / **Password:** studentpass2 / **Role:** Student
3. **Email:** student3@student.com / **Password:** studentpass3 / **Role:** Student

**Faculty:**
1. **Email:** faculty1@faculty.com / **Password:** facultypass1 / **Role:** Faculty
2. **Email:** faculty2@faculty.com / **Password:** facultypass2 / **Role:** Faculty
3. **Email:** faculty3@faculty.com / **Password:** facultypass3 / **Role:** Faculty

You can view the raw structure and rows by installing an extension like "SQLite Viewer" in your code editor or by querying it within your codebase!
