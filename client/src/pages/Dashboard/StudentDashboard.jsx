

import React from 'react';
import AssignmentTasksPage from '../Toolkit/AssignmentTasksPage';
import { useNavigate } from 'react-router-dom';
import DropoutToolkit from '../Toolkit/DropoutToolkit';
import { FaChalkboardTeacher, FaLaptopCode, FaLanguage, FaCertificate, FaUser, FaBook, FaEnvelope, FaCog, FaSignOutAlt, FaAward } from 'react-icons/fa';
import AssistantChatbot from '../../components/AssistantChatbot';

const mockCourses = [
  { title: 'Mathematics Basics', progress: 80, certificate: true, icon: <FaChalkboardTeacher size={38} color="#646cff" /> },
  { title: 'Digital Marketing 101', progress: 45, certificate: false, icon: <FaLaptopCode size={38} color="#646cff" /> },
  { title: 'English Communication', progress: 100, certificate: true, icon: <FaLanguage size={38} color="#646cff" /> },
];

const recommendedCourses = [
  { title: 'Data Science Basics', icon: <FaLaptopCode size={32} color="#00b894" /> },
  { title: 'Public Speaking', icon: <FaLanguage size={32} color="#00b894" /> },
];

const cardBase = {
  width: 250,
  minWidth: 250,
  maxWidth: 250,
  minHeight: 230,
  background: 'rgba(100,108,255,0.13)',
  borderRadius: 18,
  padding: '1.5rem 1.2rem',
  boxShadow: '0 4px 18px #646cff33',
  marginBottom: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'transform 0.22s, box-shadow 0.22s',
  cursor: 'pointer',
  border: '2px solid transparent',
  position: 'relative',
  overflow: 'hidden',
};


const StudentDashboard = () => {
  const [hovered, setHovered] = React.useState(null);
  // Calculate dynamic progress
  const studentName = 'Alex';
  const total = mockCourses.length;
  const completed = mockCourses.filter(c => c.progress === 100).length;
  const inProgress = mockCourses.filter(c => c.progress > 0 && c.progress < 100).length;
  const notStarted = mockCourses.filter(c => c.progress === 0).length;
  const certificates = mockCourses.filter(c => c.certificate).length;
  const percentComplete = Math.round(mockCourses.reduce((acc, c) => acc + c.progress, 0) / (total || 1));
  const currentCourses = mockCourses.filter(c => c.progress > 0 && c.progress < 100);
  const completedCourses = mockCourses.filter(c => c.progress === 100);

  // Sidebar links data
const sidebarLinks = [
  { icon: <FaAward />, label: 'Dashboard' },
  { icon: <FaBook />, label: 'Enrolled Courses' },
  { icon: <FaChalkboardTeacher />, label: 'Mentor Connect' },
  { icon: <FaLaptopCode />, label: 'Assignments / Tasks' },
  { icon: <FaCertificate />, label: 'Certificates' },
  { icon: <FaLaptopCode />, label: 'Suggested Courses' },
  { icon: <FaAward />, label: 'Achievements' },
  { icon: <FaUser />, label: 'My Profile' },
  { icon: <FaEnvelope />, label: 'Help & Support' },
];
  const [activeSidebar, setActiveSidebar] = React.useState('Dashboard');

  const navigate = useNavigate();
  // Example comeback plan (could be more dynamic)
  const comebackPlan = [
    'Review your last completed course: ' + (completedCourses[0]?.title || 'N/A'),
    'Set a small daily learning goal (e.g., 15 minutes)',
    'Reach out to a mentor for a quick check-in',
    'Pick a new recommended course to restart momentum',
  ];
  // Example motivation resources
  const motivationResources = [
    { type: 'quote', text: 'Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill' },
    { type: 'link', text: 'TED Talk: The Power of Believing You Can Improve', url: 'https://www.ted.com/talks/carol_dweck_the_power_of_believing_that_you_can_improve' },
    { type: 'link', text: 'Motivational Playlist', url: 'https://open.spotify.com/playlist/37i9dQZF1DXdxcBWuJkbcy' },
  ];
  // Modal close handler
  const closeToolkitModal = () => setToolkitFeature(null);

  // Only render the main dashboard content here. Sidebar is handled by DashboardLayout.
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(120deg, #f8fafc 60%, #eafcff 100%)', padding: '2rem 0' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1rem' }}>
        {/* Welcome Section */}
        <div style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 18, boxShadow: '0 2px 12px #646cff22', padding: '2rem 2rem 1.2rem 2rem', marginBottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <h1 style={{ color: '#646cff', fontWeight: 900, fontSize: '2.3rem', marginBottom: 6, letterSpacing: 1, textShadow: '0 2px 12px #a8c0ff88' }}>Welcome, {studentName}! <span style={{ color: '#00b894' }}>🎉</span></h1>
          <p style={{ color: '#333', marginBottom: 0, fontSize: '1.13rem' }}>Track your learning progress, view certificates, and continue your courses below.</p>
        </div>

        {/* Dropout Recovery Toolkit - Button */}
        <div style={{ background: '#eafcff', borderRadius: 18, boxShadow: '0 2px 12px #00b89433', padding: '1.5rem 1.2rem', marginBottom: 36, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 16 }}>
          <h2 style={{ color: '#00b894', fontWeight: 900, fontSize: '1.2rem', marginBottom: 12, letterSpacing: 1 }}>Dropout Recovery Toolkit</h2>
          <p style={{ color: '#333', fontSize: 15, marginBottom: 12 }}>Access all recovery features in one place: comeback plan, motivation, resume builder, and more.</p>
          <button style={{ background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #00b89433', marginTop: 6 }} onClick={() => navigate('/dropout-toolkit')}>Open Dropout Recovery Toolkit</button>
        </div>

        {/* Enrolled Courses Section */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #646cff11', padding: '1.5rem 1.2rem', marginBottom: 28 }}>
          <h2 style={{ color: '#646cff', fontWeight: 800, fontSize: '1.3rem', marginBottom: 18, letterSpacing: 1 }}>Current Courses</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'center', marginBottom: 0 }}>
            {currentCourses.length === 0 && <div style={{ color: '#aaa', fontSize: 16 }}>No current courses. Start a new one!</div>}
            {currentCourses.map((course, idx) => (
              <div
                key={idx}
                style={{
                  ...cardBase,
                  border: hovered === idx ? '2px solid #00b894' : '2px solid #e0e0e0',
                  boxShadow: hovered === idx ? '0 8px 32px #00b89444' : cardBase.boxShadow,
                  transform: hovered === idx ? 'translateY(-8px) scale(1.04)' : 'none',
                  background: hovered === idx ? 'rgba(0,184,148,0.13)' : '#f8fafc',
                }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
              >
                <span style={{ fontSize: 38, marginBottom: 10, filter: hovered === idx ? 'drop-shadow(0 2px 8px #00b89488)' : 'none', transition: 'filter 0.2s' }}>{course.icon}</span>
                <h3 style={{ color: '#222', fontWeight: 800, fontSize: '1.13rem', marginBottom: 10, textAlign: 'center', letterSpacing: 0.5 }}>{course.title}</h3>
                <div style={{ marginBottom: 10, width: '100%' }}>
                  <div style={{ height: 8, background: '#e0e0e0', borderRadius: 6, overflow: 'hidden', marginBottom: 4 }}>
                    <div style={{ width: `${course.progress}%`, height: 8, background: hovered === idx ? 'linear-gradient(90deg, #00b894 60%, #646cff 100%)' : 'linear-gradient(90deg, #646cff 60%, #00b894 100%)', borderRadius: 6, transition: 'width 0.4s, background 0.2s' }}></div>
                  </div>
                  <span style={{ color: '#646cff', fontSize: 13 }}>{course.progress}% complete</span>
                </div>
                <button style={{ marginTop: 6, background: '#646cff', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 14px', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 4px #646cff22', transition: 'background 0.2s' }} onClick={() => alert(`Continue learning: ${course.title}`)}>Continue Learning</button>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Courses Section */}
        <div style={{ background: '#eafcff', borderRadius: 16, boxShadow: '0 2px 12px #00b89411', padding: '1.5rem 1.2rem', marginBottom: 28 }}>
          <h2 style={{ color: '#00b894', fontWeight: 800, fontSize: '1.13rem', marginBottom: 12, letterSpacing: 1 }}>Completed Courses</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'center', marginBottom: 0 }}>
            {completedCourses.length === 0 && <div style={{ color: '#aaa', fontSize: 16 }}>No completed courses yet.</div>}
            {completedCourses.map((course, idx) => (
              <div
                key={idx}
                style={{
                  ...cardBase,
                  border: '2px solid #00b894',
                  boxShadow: '0 8px 32px #00b89444',
                  background: '#eafcff',
                }}
              >
                <span style={{ fontSize: 38, marginBottom: 10 }}>{course.icon}</span>
                <h3 style={{ color: '#222', fontWeight: 800, fontSize: '1.13rem', marginBottom: 10, textAlign: 'center', letterSpacing: 0.5 }}>{course.title}</h3>
                <div style={{ marginBottom: 10, width: '100%' }}>
                  <div style={{ height: 8, background: '#00b894', borderRadius: 6, marginBottom: 4 }}>
                    <div style={{ width: `100%`, height: 8, background: '#00b894', borderRadius: 6 }}></div>
                  </div>
                  <span style={{ color: '#00b894', fontSize: 13 }}>100% complete</span>
                </div>
                <span style={{ color: '#00b894', fontWeight: 700, fontSize: 15, letterSpacing: 0.5 }}>🎓 Certificate Earned</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recommended Courses Section */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #646cff11', padding: '1.5rem 1.2rem', marginBottom: 12 }}>
          <h2 style={{ color: '#646cff', fontWeight: 800, fontSize: '1.13rem', marginBottom: 12, letterSpacing: 1 }}>Recommended Courses</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center', marginBottom: 0 }}>
            {recommendedCourses.map((course, idx) => (
              <div key={idx} style={{
                width: 250,
                minWidth: 250,
                maxWidth: 250,
                minHeight: 230,
                background: '#f8fafc',
                borderRadius: 18,
                boxShadow: '0 4px 18px #646cff33',
                padding: '1.5rem 1.2rem',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
                transition: 'transform 0.22s, box-shadow 0.22s',
                cursor: 'pointer',
                border: '2px solid #e0e0e0',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <span style={{ marginBottom: 8 }}>{course.icon}</span>
                <div style={{ color: '#222', fontWeight: 700, fontSize: 15, textAlign: 'center' }}>{course.title}</div>
                <button style={{ marginTop: 8, background: '#00b894', color: '#fff', border: 'none', borderRadius: 6, padding: '3px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 4px #00b89422', transition: 'background 0.2s' }} onClick={() => alert(`Enroll in: ${course.title}`)}>Enroll</button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Assistant Chatbot Floating Button */}
      <AssistantChatbot />
    </div>
  );
};

// Sidebar link component
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

export default StudentDashboard;
