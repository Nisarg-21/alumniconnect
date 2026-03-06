import { useState } from 'react';
import './styles.css';

import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Modals from './components/Modals';

import Dashboard from './components/pages/Dashboard';
import SearchAlumni from './components/pages/SearchAlumni';
import Directory from './components/pages/Directory';
import WorldMap from './components/pages/WorldMap';
import Mentorship from './components/pages/Mentorship';
import Events from './components/pages/Events';
import Jobs from './components/pages/Jobs';
import Blogs from './components/pages/Blogs';
import { Stories, Gallery, Fundraising, AIRecommender, Admin } from './components/pages/OtherPages';
import Login from './components/pages/Login';
import Landing from './components/pages/Landing';

export default function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [role, setRole] = useState('Student');
  const [openModal, setOpenModal] = useState(null);
  const [authView, setAuthView] = useState('landing'); // 'landing' | 'login'
  const [notifSeen, setNotifSeen] = useState(false);
  const [mentorSeen, setMentorSeen] = useState(false);

  const handleLogin = (userData) => {
    setUser(userData);
    setRole(userData.role || 'Student');
    setCurrentPage('dashboard');
  };

  if (!user) {
    if (authView === 'landing') {
      return <Landing onNavigateToLogin={() => setAuthView('login')} />;
    }
    return <Login onLogin={handleLogin} onBack={() => setAuthView('landing')} />;
  }

  function navigate(target) {
    if (target.startsWith('modal:')) {
      setOpenModal(target.replace('modal:', ''));
    } else {
      setCurrentPage(target);
      setOpenModal(null);
    }
  }

  function openMod(id) { setOpenModal(id); }
  function closeMod() { setOpenModal(null); }

  function handleRoleChange(newRole) {
    setRole(newRole);
  }

  const pageProps = {
    onOpenModal: openMod,
    onNavigate: (p) => setCurrentPage(p),
  };

  const pages = {
    dashboard: <Dashboard role={role} user={user} {...pageProps} />,
    search: <SearchAlumni {...pageProps} />,
    directory: <Directory   {...pageProps} />,
    map: <WorldMap />,
    mentorship: <Mentorship  {...pageProps} />,
    events: <Events      {...pageProps} />,
    jobs: <Jobs        {...pageProps} />,
    blogs: <Blogs       {...pageProps} />,
    stories: <Stories     {...pageProps} />,
    gallery: <Gallery />,
    fundraising: <Fundraising />,
    ai: <AIRecommender />,
    admin: <Admin />,
  };

  return (
    <>
      {/* Animated background blobs */}
      <div className="bg-blobs">
        <div className="blob blob1" />
        <div className="blob blob2" />
        <div className="blob blob3" />
        <div className="blob blob4" />
      </div>

      {/* Sidebar */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(id) => {
          if (id === 'mentorship') setMentorSeen(true);
          setCurrentPage(id);
        }}
        user={user}
        role={role}
        mentorSeen={mentorSeen}
        onEditProfile={() => openMod('profile')}
      />

      {/* Main content */}
      <div className="main">
        <Topbar
          currentPage={currentPage}
          notifSeen={notifSeen}
          onNotif={() => { setNotifSeen(true); openMod('notif'); }}
          onQuickAction={() => openMod('quick')}
        />
        <div key={currentPage}>
          {pages[currentPage] || pages.dashboard}
        </div>
      </div>

      {/* All Modals */}
      <Modals
        openModal={openModal}
        onClose={closeMod}
        onNavigate={navigate}
      />
    </>
  );
}
