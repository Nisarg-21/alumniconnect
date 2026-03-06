import sqlite3
import hashlib
import random
import os

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

def main():
    db_path = 'database.db'
    if os.path.exists(db_path):
        os.remove(db_path)
        
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Login (
        id VARCHAR PRIMARY KEY,
        email VARCHAR UNIQUE NOT NULL,
        password_hash VARCHAR NOT NULL,
        role VARCHAR NOT NULL
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Alumni_Student (
        rollno VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        batch VARCHAR NOT NULL,
        branch VARCHAR NOT NULL,
        num_connections INTEGER DEFAULT 0,
        company VARCHAR,
        location VARCHAR,
        job_role VARCHAR,
        experience_years INTEGER DEFAULT 0,
        is_mentor BOOLEAN DEFAULT 0,
        is_hiring BOOLEAN DEFAULT 0,
        avatar_color VARCHAR DEFAULT '#6366f1',
        FOREIGN KEY(rollno) REFERENCES Login(id) ON DELETE CASCADE
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Faculty (
        id VARCHAR PRIMARY KEY,
        name VARCHAR NOT NULL,
        email VARCHAR UNIQUE NOT NULL,
        num_connections INTEGER DEFAULT 0,
        FOREIGN KEY(id) REFERENCES Login(id) ON DELETE CASCADE
    )
    ''')

    cursor.execute('''
    CREATE TABLE IF NOT EXISTS Connections (
        id1 VARCHAR,
        id2 VARCHAR,
        currently_connected BOOLEAN DEFAULT 1,
        PRIMARY KEY(id1, id2)
    )
    ''')

    admins = [
        ('admin1', 'admin1@admin.com', 'adminpass1'),
        ('admin2', 'admin2@admin.com', 'adminpass2'),
        ('admin3', 'admin3@admin.com', 'adminpass3')
    ]
    for uid, email, pwd in admins:
        cursor.execute('INSERT INTO Login (id, email, password_hash, role) VALUES (?, ?, ?, ?)',
                       (uid, email, hash_password(pwd), 'Admin'))

    branches = ['Computer Science and Engineering', 
    'Mechanical Engineering', 'Aerospace Engineering', 'Engineering Physics',
    'Civil Engineering', 'Electrical Engineering', 'Energy Engineering',
    'Environmental Engineering', 'Metallurgical and Materials Engineering',
    'Chemical Engineering', 'Mathematics', 'Economics']
    weights = [10,10,6,3,9,12,4,3,10,9,1,2]

    companies = ['Google', 'Microsoft', 'Amazon', 'Infosys', 'TCS', 'Wipro', 'IBM',
                 'Accenture', 'Deloitte', 'ISRO', 'DRDO', 'Tesla', 'Apple', 'Meta',
                 'Flipkart', 'Zomato', 'Swiggy', 'Paytm', 'Ola', 'TATA Motors',
                 'L&T', 'Siemens', 'Bosch', 'Shell', 'ONGC', 'BHEL']

    locations = ['Bangalore', 'Mumbai', 'Hyderabad', 'Chennai', 'Pune', 'Delhi',
                 'Trivandrum', 'Kolkata', 'Ahmedabad', 'Noida', 'Gurgaon', 'Remote']

    job_roles = ['Software Engineer', 'Data Scientist', 'Product Manager', 'DevOps Engineer',
                 'ML Engineer', 'Research Scientist', 'Systems Engineer', 'Civil Engineer',
                 'Mechanical Engineer', 'Electrical Engineer', 'Consultant', 'Analyst',
                 'Full Stack Developer', 'Backend Engineer', 'Frontend Engineer']

    avatar_colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#14b8a6']

    student_ids = []
    for i in range(1, 301):
        uid = f'S10{i:02d}'
        name = f'Student_Alumni_{i}'
        email = f'student{i}@student.com'
        pwd = f'studentpass{i}'
        batch = str(random.randint(2020, 2030))
        branch = random.choices(branches, weights=weights)[0]
        company = random.choice(companies)
        location = random.choice(locations)
        job_role = random.choice(job_roles)
        experience_years = max(0, 2026 - int(batch) + random.randint(-1, 2))
        is_mentor = 1 if random.random() < 0.3 else 0
        is_hiring = 1 if random.random() < 0.2 else 0
        avatar_color = random.choice(avatar_colors)

        cursor.execute('INSERT INTO Login (id, email, password_hash, role) VALUES (?, ?, ?, ?)',
                       (uid, email, hash_password(pwd), 'Student'))
        cursor.execute('''INSERT INTO Alumni_Student 
            (rollno, name, email, batch, branch, num_connections, company, location, job_role, experience_years, is_mentor, is_hiring, avatar_color) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)''',
                       (uid, name, email, batch, branch, 0, company, location, job_role, experience_years, is_mentor, is_hiring, avatar_color))
        student_ids.append(uid)

    faculty_ids = []
    for i in range(1, 51):
        uid = f'F20{i:02d}'
        name = f'Faculty_{i}'
        email = f'faculty{i}@faculty.com'
        pwd = f'facultypass{i}'
        cursor.execute('INSERT INTO Login (id, email, password_hash, role) VALUES (?, ?, ?, ?)',
                       (uid, email, hash_password(pwd), 'Faculty'))
        cursor.execute('INSERT INTO Faculty (id, name, email, num_connections) VALUES (?, ?, ?, ?)',
                       (uid, name, email, 0))
        faculty_ids.append(uid)

    all_users = student_ids + faculty_ids
    connections_set = set()
    connection_counts = {u: 0 for u in all_users}
    
    while len(connections_set) < 1000:
        u1, u2 = random.sample(all_users, 2)
        if u1 > u2:
            u1, u2 = u2, u1
        if (u1, u2) not in connections_set:
            connections_set.add((u1, u2))
            connection_counts[u1] += 1
            connection_counts[u2] += 1

    for u1, u2 in connections_set:
        cursor.execute('INSERT INTO Connections (id1, id2, currently_connected) VALUES (?, ?, ?)', (u1, u2, True))

    for u, count in connection_counts.items():
        if u in student_ids:
            cursor.execute('UPDATE Alumni_Student SET num_connections = ? WHERE rollno = ?', (count, u))
        elif u in faculty_ids:
            cursor.execute('UPDATE Faculty SET num_connections = ? WHERE id = ?', (count, u))

    conn.commit()
    conn.close()
    print("Database `database.db` created and seeded successfully with dummy data!")

if __name__ == '__main__':
    main()
