// ── Alumni Data ──
export const alumni = [
  { av:'PS', bg:'linear-gradient(135deg,#0f1535,#090e30)', n:'Priya Sharma', role:'Software Engineer III', co:'Google', loc:'Bangalore', batch:'2020', branch:'CS', exp:'4 yrs', chips:['Mentor','Open to connect'] },
  { av:'RK', bg:'linear-gradient(135deg,#3b0f8c,#1e0754)', n:'Rahul Kumar', role:'Product Manager', co:'Microsoft', loc:'Hyderabad', batch:'2019', branch:'MBA', exp:'5 yrs', chips:['Speaker'] },
  { av:'AM', bg:'linear-gradient(135deg,#f59e0b,#c47800)', n:'Ananya Mishra', role:'Data Scientist', co:'Zomato', loc:'Mumbai', batch:'2021', branch:'ECE', exp:'3 yrs', chips:['Mentor','Hiring'] },
  { av:'VT', bg:'linear-gradient(135deg,#4a1da8,#251062)', n:'Vikram Tiwari', role:'Mechanical Engineer', co:'Tesla', loc:'USA', batch:'2018', branch:'MECH', exp:'7 yrs', chips:['Open to connect'] },
  { av:'SJ', bg:'linear-gradient(135deg,#7c3aed,#3b0f8c)', n:'Sneha Joshi', role:'CEO & Founder', co:'TechStart', loc:'Pune', batch:'2022', branch:'CS', exp:'2 yrs', chips:['Entrepreneur','Mentor'] },
  { av:'DA', bg:'linear-gradient(135deg,#6b2fca,#3b1580)', n:'Deepak Anand', role:'Senior PM', co:'Flipkart', loc:'Bangalore', batch:'2017', branch:'MBA', exp:'8 yrs', chips:['Mentor','Open to connect'] },
];

// ── Roles ──
export const roles = {
  Student: { n:'John Student', av:'JS', r:'Student · CS 2025' },
  Alumni:  { n:'Priya Sharma', av:'PS', r:'Alumni · CS 2020' },
  Faculty: { n:'Dr. Meena Rao', av:'MR', r:'Faculty · CS Dept' },
  Admin:   { n:'Admin User',   av:'AU', r:'Administrator' },
};

// ── Page Titles ──
export const titles = {
  dashboard:'Dashboard', search:'Search Alumni', directory:'Alumni Directory',
  map:'World Map', mentorship:'Mentorship Hub', events:'Events',
  jobs:'Jobs & Internships', blogs:'Alumni Blogs', stories:'Success Stories',
  gallery:'Event Gallery', fundraising:'Fundraising', ai:'AI Recommender', admin:'Admin Panel',
};

// ── Sessions ──
export const sessions = [
  { ic:'💻', t:'Breaking into Big Tech',   m:'Priya Sharma', co:'Google',    d:'Mar 20', tm:'7:00 PM', s:8  },
  { ic:'🎯', t:'Product Management 101',   m:'Rahul Kumar',  co:'Microsoft', d:'Mar 25', tm:'6:30 PM', s:12 },
  { ic:'📊', t:'Data Science Career Path', m:'Ananya Mishra',co:'Zomato',    d:'Mar 28', tm:'8:00 PM', s:5  },
];

// ── Mentors ──
export const mentors = [
  { av:'PS', bg:'linear-gradient(135deg,#0f1535,#090e30)', n:'Priya Sharma', tag:'Google · SWE-3',   sk:'System Design, DSA, FAANG Prep', r:'4.9', s:'42' },
  { av:'RK', bg:'linear-gradient(135deg,#3b0f8c,#1e0754)', n:'Rahul Kumar',  tag:'Microsoft · PM',   sk:'Product Strategy, Agile, GTM',   r:'4.8', s:'38' },
  { av:'SJ', bg:'linear-gradient(135deg,#7c3aed,#3b0f8c)', n:'Sneha Joshi',  tag:'TechStart · CEO',  sk:'Entrepreneurship, Fundraising',  r:'5.0', s:'19' },
];

// ── Events ──
export const events = [
  { t:'Annual Alumni Meet 2025',      d:'Mar 15', type:'Reunion',     mode:'In-Person', loc:'Main Auditorium', att:'487', cl:'ev1' },
  { t:'Tech Career Workshop',         d:'Mar 22', type:'Workshop',    mode:'Online',    loc:'Zoom',            att:'120', cl:'ev2' },
  { t:'Startup Pitch Night',          d:'Apr 1',  type:'Networking',  mode:'Hybrid',    loc:'Innovation Lab',  att:'89',  cl:'ev3' },
  { t:'Data Science Bootcamp',        d:'Apr 10', type:'Workshop',    mode:'Online',    loc:'Google Meet',     att:'65',  cl:'ev4' },
  { t:'Alumni vs Students Cricket',   d:'Apr 20', type:'Sports',      mode:'In-Person', loc:'University Ground',att:'200', cl:'ev5' },
  { t:'International Alumni Webinar', d:'May 5',  type:'Webinar',     mode:'Online',    loc:'Zoom',            att:'340', cl:'ev6' },
];

// ── Jobs ──
export const jobs = [
  { t:'Software Engineering Intern',  co:'Google',    type:'Internship', loc:'Bangalore / Remote',   pay:'₹50K/mo',        sk:['Python','ML','APIs'],      by:'Priya Sharma (2020)', dl:'Mar 30' },
  { t:'Product Manager',              co:'Microsoft', type:'Full-time',  loc:'Hyderabad',            pay:'₹28 LPA',        sk:['Product','Agile','Analytics'],by:'Rahul Kumar (2019)', dl:'Apr 10' },
  { t:'Data Analyst Intern',          co:'Zomato',    type:'Internship', loc:'Mumbai',               pay:'₹30K/mo',        sk:['SQL','Python','Tableau'],  by:'Ananya Mishra (2021)',dl:'Mar 25' },
  { t:'Mechanical Design Engineer',   co:'Tesla',     type:'Full-time',  loc:'USA (Visa Sponsored)', pay:'$95K/yr',        sk:['CAD','FEA'],               by:'Vikram Tiwari (2018)',dl:'Apr 20' },
  { t:'Full Stack Developer',         co:'TechStart', type:'Full-time',  loc:'Pune / Remote',        pay:'₹12–18 LPA + ESOPs', sk:['React','Node.js','AWS'],by:'Sneha Joshi (2022)',  dl:'Ongoing' },
];

// ── Blogs ──
export const blogs = [
  { e:'💡', bg:'bi1', t:'How I cracked Google in my first attempt',      a:'Priya Sharma',  b:'CS 2020',   cat:'Career',          d:'Feb 14', ex:"After 6 months of prep and 4 mock cycles, I got the offer. Here's everything I did differently…" },
  { e:'🚀', bg:'bi2', t:'Building a startup from a college dorm room',   a:'Sneha Joshi',   b:'CS 2022',   cat:'Entrepreneurship', d:'Jan 28', ex:'No money, no connections — just an idea and relentless execution. Our story of raising seed funding…' },
  { e:'🌍', bg:'bi3', t:'Moving abroad: What nobody tells you',           a:'Vikram Tiwari', b:'MECH 2018', cat:'Life',             d:'Dec 10', ex:'Culture shock, loneliness, and eventual growth. My honest account of moving to the US for work…' },
  { e:'📊', bg:'bi1', t:"Data Science in 2025: What's in demand",        a:'Ananya Mishra', b:'ECE 2021',  cat:'Tech',             d:'Feb 20', ex:'With GenAI changing everything, here are the skills that actually matter for data science…' },
  { e:'🎯', bg:'bi2', t:'From Engineering to Product Management',        a:'Rahul Kumar',   b:'MBA 2019',  cat:'Career',           d:'Jan 15', ex:'The switch from code to product is more common than you think. The roadmap that worked for me…' },
  { e:'🧠', bg:'bi3', t:'Lessons from my first FAANG internship',        a:'Deepak Anand',  b:'MBA 2017',  cat:'Career',           d:'Nov 30', ex:"The most valuable lesson wasn't technical — it was about communication and visibility…" },
];

// ── Stories ──
export const stories = [
  { n:'Priya Sharma',  r:'SWE-3 at Google',  b:'CS 2020',   ach:'₹45 LPA package',        q:"AlumniConnect's mentorship program was a game-changer. My mentor helped me prepare for FAANG interviews with mock sessions and guidance I couldn't find anywhere else." },
  { n:'Sneha Joshi',   r:'CEO, TechStart',   b:'CS 2022',   ach:'₹2Cr seed funding raised',q:"I was a confused final-year student with a vague idea. Through the platform, I connected with three alumni entrepreneurs who guided me from building a product to pitching investors." },
  { n:'Vikram Tiwari', r:'Engineer at Tesla', b:'MECH 2018', ach:'International relocation to USA', q:"Moving abroad seemed impossible until I found alumni who had done it. They guided me through visa processes, job portals, and cultural prep. Now I'm working on EVs in California." },
  { n:'Rahul Kumar',   r:'PM at Microsoft',  b:'MBA 2019',  ach:'Eng → PM in 8 months',   q:"Transitioning from engineering to product management seemed like a leap of faith. Alumni connected me with PMs who shared their playbook. Within 8 months I had my first PM offer." },
];

// ── Fundraising ──
export const funds = [
  { t:'Student Scholarship Fund',  d:'Support meritorious students from underprivileged backgrounds.', raised:820000,  goal:1000000, donors:312, days:45 },
  { t:'Modern Lab Equipment',      d:'Upgrade computing labs with state-of-the-art equipment.',        raised:540000,  goal:800000,  donors:198, days:60 },
  { t:'Sports Infrastructure',     d:'Build a multi-purpose sports arena for student wellbeing.',      raised:290000,  goal:1500000, donors:87,  days:120 },
  { t:'Digital Library Fund',      d:'Provide access to premium research journals and e-books.',       raised:175000,  goal:300000,  donors:142, days:30 },
];

// ── Notifications ──
export const notifs = [
  { ic:'🤝', t:'Mentorship Request Accepted', s:'Priya Sharma accepted your request · 2 hours ago', bg:'rgba(15,21,53,.07)',      col:'var(--forest)' },
  { ic:'📅', t:'Event Reminder',              s:'Annual Alumni Meet is in 3 days · Register now',   bg:'rgba(245,158,11,.09)',    col:'var(--sage)'   },
  { ic:'💼', t:'New Job Posted',              s:'ML Engineer at Google — matches your profile',     bg:'rgba(124,58,237,.07)',   col:'var(--terra)'  },
  { ic:'🎓', t:'Alumni Viewed Your Profile',  s:'Vikram Tiwari (Tesla) viewed your profile',        bg:'rgba(0,0,0,.03)',         col:'var(--muted)'  },
  { ic:'❤️', t:'Donation Milestone',          s:'Lab Expansion campaign reached 80% of goal!',     bg:'rgba(124,58,237,.07)',   col:'var(--terra)'  },
];

// ── Admin Approvals ──
export const approvals = [
  { av:'NK', n:'Nikhil Kapoor',         s:'Alumni Registration · CS 2018' },
  { av:'PG', n:'Event: Tech Summit 2025',s:'Created by Priya Gupta'       },
  { av:'JP', n:'Job Post: ML Engineer', s:'Posted by DeepMind alumni'     },
];

// ── Map Stats ──
export const mapStatData = [
  { t:'Top Cities',    rows:[['Bangalore','420','85%'],['Mumbai','380','76%'],['San Francisco','340','68%'],['Delhi NCR','290','58%']] },
  { t:'Top Companies', rows:[['Google','187','90%'],['Microsoft','154','74%'],['Amazon','132','64%'],['Startups','410','100%']] },
  { t:'By Sector',     rows:[['Technology','42%','42%'],['Entrepreneurship','22%','22%'],['Finance','18%','18%'],['Research','18%','18%']] },
];

// ── AI Replies ──
export const aiReplies = [
  { q:/ml|ai|machine learning|data science/i, r:'Based on your AI/ML interest, I recommend:\n\n🌿 Ananya Mishra — Zomato Data Scientist (Batch 2021)\n🌿 Vikram Tiwari — ex-Nvidia ML Engineer\n🌿 Dr. Rohan Menon — PhD, IISc (Research path)\n\nShall I show their open mentorship slots?' },
  { q:/product|pm|product manager/i,          r:'For product management, I suggest:\n\n🍂 Rahul Kumar — Microsoft PM (Batch 2019)\n🍂 Sneha Joshi — Startup CEO with PM background\n🍂 Deepak Anand — Flipkart Senior PM\n\nAll three offer mentorship slots!' },
  { q:/startup|entrepreneur|founder/i,        r:'For entrepreneurship:\n\n🌱 Sneha Joshi — Founder, TechStart (raised ₹2Cr seed)\n🌱 Aryan Mehta — Co-founder, Singapore FinTech\n🌱 Prashant Verma — Serial entrepreneur, 2 exits' },
  { q:/abroad|usa|uk|germany|international/i, r:'For international career guidance:\n\n🌍 Vikram Tiwari — Tesla USA (visa & immigration expertise)\n🌍 Dr. Sarah Mathew — Oxford, UK\n🌍 Kiran Reddy — SAP, Germany' },
];

// ── World Map Cities ──
export const alumniCities = [
  { name:'Mumbai',        lat:19.08, lng:72.88,   count:380, type:'india'    },
  { name:'Delhi',         lat:28.61, lng:77.23,   count:290, type:'india'    },
  { name:'Bangalore',     lat:12.97, lng:77.59,   count:420, type:'india'    },
  { name:'Hyderabad',     lat:17.39, lng:78.49,   count:180, type:'india'    },
  { name:'Pune',          lat:18.52, lng:73.86,   count:120, type:'india'    },
  { name:'Chennai',       lat:13.08, lng:80.27,   count:95,  type:'india'    },
  { name:'San Francisco', lat:37.77, lng:-122.42, count:340, type:'americas' },
  { name:'New York',      lat:40.71, lng:-74.01,  count:280, type:'americas' },
  { name:'Seattle',       lat:47.61, lng:-122.33, count:210, type:'americas' },
  { name:'Austin',        lat:30.27, lng:-97.74,  count:60,  type:'americas' },
  { name:'London',        lat:51.51, lng:-0.13,   count:210, type:'europe'   },
  { name:'Berlin',        lat:52.52, lng:13.40,   count:85,  type:'europe'   },
  { name:'Amsterdam',     lat:52.37, lng:4.90,    count:45,  type:'europe'   },
  { name:'Paris',         lat:48.85, lng:2.35,    count:40,  type:'europe'   },
  { name:'Singapore',     lat:1.35,  lng:103.82,  count:140, type:'apac'     },
  { name:'Tokyo',         lat:35.68, lng:139.69,  count:60,  type:'apac'     },
  { name:'Sydney',        lat:-33.87,lng:151.21,  count:75,  type:'apac'     },
  { name:'Dubai',         lat:25.20, lng:55.27,   count:95,  type:'apac'     },
  { name:'Toronto',       lat:43.65, lng:-79.38,  count:55,  type:'americas' },
  { name:'Kuala Lumpur',  lat:3.14,  lng:101.69,  count:38,  type:'apac'     },
];

export const cityColors = { india:'#7c3aed', americas:'#f59e0b', europe:'#0ea5e9', apac:'#10b981' };