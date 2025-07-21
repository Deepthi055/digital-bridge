import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { FaChalkboardTeacher, FaLaptopCode, FaLanguage, FaCertificate, FaUser, FaBook, FaEnvelope, FaSignOutAlt, FaAward } from 'react-icons/fa';

const sidebarLinks = [
  { icon: <FaAward />, label: 'Dashboard', path: '/dashboard/student' },
  { icon: <FaBook />, label: 'Enrolled Courses', path: '/dashboard/student?tab=Enrolled%20Courses' },
  { icon: <FaChalkboardTeacher />, label: 'Mentor Connect', path: '/mentor-connect' },
  { icon: <FaLaptopCode />, label: 'Assignments / Tasks', path: '/dashboard/student?tab=Assignments%20%2F%20Tasks' },
  { icon: <FaCertificate />, label: 'Certificates', path: '/certificates' },
  { icon: <FaLaptopCode />, label: 'Suggested Courses', path: '/dashboard/student?tab=Suggested%20Courses' },
  { icon: <FaAward />, label: 'Achievements', path: '/achievements' },
  { icon: <FaUser />, label: 'My Profile', path: '/dashboard/student?tab=My%20Profile' },
  { icon: <FaEnvelope />, label: 'Help & Support', path: '/dashboard/student?tab=Help%20%26%20Support' },
];

function SidebarLink({ icon, label, active, onClick }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '0.7rem 1rem', borderRadius: 8,
        background: active ? '#fff' : 'none', color: active ? '#646cff' : '#fff', fontWeight: 700, fontSize: 16,
        marginBottom: 8, cursor: 'pointer', boxShadow: active ? '0 2px 8px #fff2' : 'none', transition: 'background 0.2s, color 0.2s'
      }}
      onClick={onClick}
    >
      {icon} {label}
    </div>
  );
}

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  // Determine active link by path
  const activePath = location.pathname;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #a8c0ff 0%, #f8fafc 100%)', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: 210, background: '#646cff', color: '#fff', minHeight: '100vh', padding: '2.5rem 1.2rem 2rem 1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', boxShadow: '2px 0 16px #646cff22', position: 'sticky', top: 0, zIndex: 2 }}>
        <div style={{ fontWeight: 900, fontSize: 22, marginBottom: 32, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
          <FaUser size={26} style={{ marginRight: 6 }} /> Student
        </div>
        <nav style={{ width: '100%' }}>
          {sidebarLinks.map(link => (
            <SidebarLink
              key={link.label}
              icon={link.icon}
              label={link.label}
              active={activePath === link.path}
              onClick={() => navigate(link.path)}
            />
          ))}
        </nav>
        <div style={{ flexGrow: 1 }} />
        <button style={{ background: 'none', border: 'none', color: '#fff', fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginTop: 18 }}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>
      {/* Main Content */}
      <div style={{ flex: 1, padding: '2rem 0', minWidth: 0, background: 'linear-gradient(120deg, #f8fafc 60%, #eafcff 100%)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1rem' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
