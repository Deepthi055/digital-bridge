import React from 'react';
import { FaChalkboardTeacher, FaLaptopCode, FaUserGraduate, FaBookOpen, FaEnvelope, FaCog, FaSignOutAlt, FaTasks, FaUsers, FaChartLine, FaRegLightbulb } from 'react-icons/fa';

// Mock data for a mentor's view
const mockMentoredCourses = [
  { id: 1, title: 'Mathematics Basics', mentees: 12, completedMentees: 8, icon: <FaChalkboardTeacher size={38} color="#646cff" />, status: 'active' },
  { id: 2, title: 'Digital Marketing 101', mentees: 8, completedMentees: 2, icon: <FaLaptopCode size={38} color="#646cff" />, status: 'active' },
  { id: 3, title: 'English Communication', mentees: 15, completedMentees: 15, icon: <FaBookOpen size={38} color="#646cff" />, status: 'completed' },
];

const recommendedResources = [
  { title: 'Advanced Mentoring Techniques', icon: <FaRegLightbulb size={32} color="#00b894" /> },
  { title: 'Curriculum Development Guide', icon: <FaBookOpen size={32} color="#00b894" /> },
];

const cardBase = {
  width: 250,
  minWidth: 250,
  maxWidth: 250,
  minHeight: 230,
  background: 'rgba(255,255,255,0.9)', // Adjusted for a lighter background
  borderRadius: 18,
  padding: '1.5rem 1.2rem',
  boxShadow: '0 4px 18px rgba(0,184,148,0.15)', // Green-themed shadow
  marginBottom: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  transition: 'transform 0.22s, box-shadow 0.22s, background 0.22s, border 0.22s',
  cursor: 'pointer',
  border: '2px solid transparent',
  position: 'relative',
  overflow: 'hidden',
};

const useResponsive = () => {
    const [isMobile, setIsMobile] = React.useState(false);
    React.useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768); // Adjusted breakpoint for consistency
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isMobile;
};

const MentorDashboard = () => {
  const [hovered, setHovered] = React.useState(null);
  const mentorName = 'Dr. Anya Sharma'; // Example mentor name
  const isMobile = useResponsive(); // Still useful for main content layout or other mobile-specific adjustments

  // Calculate dynamic data for mentor overview
  const totalCourses = mockMentoredCourses.length;
  const activeCourses = mockMentoredCourses.filter(c => c.status === 'active').length;
  const totalMentees = mockMentoredCourses.reduce((acc, c) => acc + c.mentees, 0);
  const totalCompletedMentees = mockMentoredCourses.reduce((acc, c) => acc + c.completedMentees, 0);

  // Sidebar links data for mentor
  const sidebarLinks = [
    { icon: <FaChartLine />, label: 'Dashboard' },
    { icon: <FaUsers />, label: 'My Mentees' },
    { icon: <FaChalkboardTeacher />, label: 'Course Management' },
    { icon: <FaTasks />, label: 'Assignments Review' },
    { icon: <FaBookOpen />, label: 'Resource Library' },
    { icon: <FaCog />, label: 'Settings' },
    { icon: <FaEnvelope />, label: 'Help & Support' },
  ];
  const [activeSidebar, setActiveSidebar] = React.useState('Dashboard');

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e0ffe0 0%, #f8fafc 100%)', display: 'flex', flexDirection: 'row' }}> {/* Always row for main container */}
      {/* Sidebar */}
      <aside style={{
        width: 240, // Fixed width for sidebar on all screen sizes
        background: 'linear-gradient(180deg, #00b894 0%, #00997e 100%)', // Darker green gradient
        color: '#fff',
        minHeight: '100vh', // Always full viewport height
        padding: '2.5rem 1.5rem 2rem 1.5rem', // Consistent padding
        display: 'flex',
        flexDirection: 'column', // Always column
        alignItems: 'flex-start', // Always align to start
        justifyContent: 'flex-start', // Always justify to start
        boxShadow: '4px 0 16px rgba(0,184,148,0.3)', // Consistent shadow
        position: 'sticky',
        top: 0,
        zIndex: 2,
        // Removed flexWrap: isMobile ? 'wrap' : 'nowrap'
      }}>
        <div style={{
          fontWeight: 900,
          fontSize: 24, // Consistent font size for title
          marginBottom: 32, // Consistent margin bottom
          letterSpacing: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexBasis: 'auto', // Consistent flex basis
          justifyContent: 'flex-start', // Consistent justification
          paddingBottom: 0, // Consistent padding
          borderBottom: 'none', // Consistent border
        }}>
          <FaChalkboardTeacher size={28} style={{ marginRight: 6 }} /> Mentor
        </div>
        <nav style={{ width: '100%', display: 'block', justifyContent: 'flex-start', flexWrap: 'nowrap', marginTop: 0 }}> {/* Always block display, no wrap */}
          {sidebarLinks.map(link => (
            <SidebarLink
              key={link.label}
              icon={link.icon}
              label={link.label}
              active={activeSidebar === link.label}
              onClick={() => setActiveSidebar(link.label)}
              // isMobile prop no longer needed if labels are always shown
            />
          ))}
        </nav>
        <div style={{ flexGrow: 1 }} />
        <button style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontWeight: 700,
          fontSize: 16, // Consistent font size
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          marginTop: 18, // Consistent margin top
          opacity: 1, // Consistent opacity
          flexBasis: 'auto', // Consistent flex basis
          justifyContent: 'flex-start', // Consistent justification
        }}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div style={{ flex: 1, padding: isMobile ? '1.5rem 1rem' : '2rem 0', minWidth: 0, background: 'linear-gradient(120deg, #f8fafc 60%, #eafcff 100%)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1rem' }}>
          {/* Welcome Section */}
          <div style={{ background: 'rgba(255,255,255,0.97)', borderRadius: 18, boxShadow: '0 2px 12px rgba(0,184,148,0.15)', padding: '2rem 2rem 1.2rem 2rem', marginBottom: 28, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <h1 style={{ color: '#00b894', fontWeight: 900, fontSize: isMobile ? '1.8rem' : '2.3rem', marginBottom: 6, letterSpacing: 1, textShadow: '0 2px 12px rgba(0,184,148,0.2)' }}>Welcome, {mentorName}! <span style={{ color: '#646cff' }}>✨</span></h1>
            <p style={{ color: '#333', marginBottom: 0, fontSize: isMobile ? '0.95rem' : '1.13rem' }}>Oversee your courses, track mentee progress, and manage resources below.</p>
          </div>

          {/* Mentor Overview Section */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginBottom: 36, justifyContent: 'center' }}>
            <div style={{ flex: 2, minWidth: 260, background: '#f8fafc', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,184,148,0.15)', padding: '1.5rem 1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ color: '#00b894', fontWeight: 800, fontSize: '1.1rem', marginBottom: 12 }}>Mentoring Overview</h3>
              <div style={{ position: 'relative', width: 110, height: 110, marginBottom: 10 }}>
                <svg width={110} height={110}>
                  <circle cx={55} cy={55} r={48} stroke="#e0e0e0" strokeWidth={10} fill="none" />
                  <circle
                    cx={55}
                    cy={55}
                    r={48}
                    stroke="#00b894"
                    strokeWidth={10}
                    fill="none"
                    strokeDasharray={2 * Math.PI * 48}
                    strokeDashoffset={2 * Math.PI * 48 * (1 - (totalCompletedMentees / (totalMentees || 1)))}
                    strokeLinecap="round"
                    style={{ transition: 'stroke-dashoffset 0.7s' }}
                  />
                  <text x="50%" y="54%" textAnchor="middle" fontSize="1.5rem" fontWeight="bold" fill="#00b894">{Math.round(totalCompletedMentees / (totalMentees || 1) * 100)}%</text>
                </svg>
              </div>
              <div style={{ color: '#333', fontSize: 15, marginBottom: 4 }}>{totalMentees} total mentees</div>
              <div style={{ color: '#aaa', fontSize: 13 }}>Across {totalCourses} courses</div>
            </div>
            <div style={{ flex: 1, minWidth: 200, background: '#eafcff', borderRadius: 16, boxShadow: '0 2px 12px rgba(100,108,255,0.15)', padding: '1.5rem 1.2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <h3 style={{ color: '#646cff', fontWeight: 800, fontSize: '1.1rem', marginBottom: 12 }}>Active Courses</h3>
              <span style={{ fontSize: 38, marginBottom: 8 }}><FaLaptopCode size={38} color="#646cff" /></span>
              <div style={{ color: '#646cff', fontWeight: 700, fontSize: 22 }}>{activeCourses}</div>
              <div style={{ color: '#333', fontSize: 14 }}>Currently Mentoring</div>
            </div>
          </div>

          {/* Mentored Courses Section */}
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,184,148,0.1)', padding: '1.5rem 1.2rem', marginBottom: 28 }}>
            <h2 style={{ color: '#00b894', fontWeight: 800, fontSize: isMobile ? '1.1rem' : '1.3rem', marginBottom: 18, letterSpacing: 1 }}>My Mentored Courses</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'center', marginBottom: 0 }}>
              {mockMentoredCourses.length === 0 && <div style={{ color: '#aaa', fontSize: 16 }}>No courses assigned for mentoring.</div>}
              {mockMentoredCourses.map((course, idx) => {
                const completionPercentage = (course.completedMentees / course.mentees) * 100 || 0;
                return (
                  <div
                    key={idx}
                    style={{
                      ...cardBase,
                      border: hovered === idx ? '2px solid #00b894' : '2px solid transparent', // Green border on hover
                      boxShadow: hovered === idx ? '0 8px 32px rgba(0,184,148,0.3)' : cardBase.boxShadow,
                      transform: hovered === idx ? 'translateY(-8px) scale(1.04)' : 'none',
                      background: hovered === idx ? 'rgba(0,184,148,0.1)' : 'rgba(255,255,255,0.9)', // Lighter green tint on hover
                    }}
                    onMouseEnter={() => setHovered(idx)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <span style={{ fontSize: 38, marginBottom: 10, filter: hovered === idx ? 'drop-shadow(0 2px 8px rgba(0,184,148,0.5))' : 'none', transition: 'filter 0.2s' }}>{course.icon}</span>
                    <h3 style={{ color: '#222', fontWeight: 800, fontSize: '1.13rem', marginBottom: 10, textAlign: 'center', letterSpacing: 0.5 }}>{course.title}</h3>
                    <div style={{ marginBottom: 10, width: '100%' }}>
                      <div style={{ height: 8, background: '#e0e0e0', borderRadius: 6, overflow: 'hidden', marginBottom: 4 }}>
                        <div style={{ width: `${completionPercentage}%`, height: 8, background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)', borderRadius: 6, transition: 'width 0.4s, background 0.2s' }}></div>
                      </div>
                      <span style={{ color: '#00b894', fontSize: 13 }}>{course.completedMentees} / {course.mentees} mentees completed</span>
                    </div>
                    <button style={{ marginTop: 6, background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 14px', fontSize: 14, fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,184,148,0.2)', transition: 'background 0.2s' }} onClick={() => alert(`View details for: ${course.title}`)}>View Details</button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recently Completed Mentoring Section */}
          <div style={{ background: '#eafcff', borderRadius: 16, boxShadow: '0 2px 12px rgba(100,108,255,0.1)', padding: '1.5rem 1.2rem', marginBottom: 28 }}>
            <h2 style={{ color: '#646cff', fontWeight: 800, fontSize: isMobile ? '1.1rem' : '1.13rem', marginBottom: 12, letterSpacing: 1 }}>Recently Completed Mentoring</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, justifyContent: 'center', marginBottom: 0 }}>
              {mockMentoredCourses.filter(c => c.status === 'completed').length === 0 && <div style={{ color: '#aaa', fontSize: 16 }}>No recently completed mentoring sessions.</div>}
              {mockMentoredCourses.filter(c => c.status === 'completed').map((course, idx) => (
                <div
                  key={idx}
                  style={{
                    ...cardBase,
                    border: '2px solid #646cff', // Blue border for completed courses
                    boxShadow: '0 8px 32px rgba(100,108,255,0.3)',
                    background: '#eafcff',
                  }}
                >
                  <span style={{ fontSize: 38, marginBottom: 10 }}>{course.icon}</span>
                  <h3 style={{ color: '#222', fontWeight: 800, fontSize: '1.13rem', marginBottom: 10, textAlign: 'center', letterSpacing: 0.5 }}>{course.title}</h3>
                  <div style={{ marginBottom: 10, width: '100%' }}>
                    <div style={{ height: 8, background: '#646cff', borderRadius: 6, marginBottom: 4 }}>
                      <div style={{ width: '100%', height: 8, background: '#646cff', borderRadius: 6 }}></div>
                    </div>
                    <span style={{ color: '#646cff', fontSize: 13 }}>All mentees completed</span>
                  </div>
                  <span style={{ color: '#646cff', fontWeight: 700, fontSize: 15, letterSpacing: 0.5 }}>⭐ Course Closed</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Resources Section */}
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,184,148,0.1)', padding: '1.5rem 1.2rem', marginBottom: 12 }}>
            <h2 style={{ color: '#00b894', fontWeight: 800, fontSize: isMobile ? '1.1rem' : '1.13rem', marginBottom: 12, letterSpacing: 1 }}>Recommended Resources</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, justifyContent: 'center', marginBottom: 0 }}>
              {recommendedResources.map((resource, idx) => (
                <div key={idx} style={{
                  width: 250,
                  minWidth: 250,
                  maxWidth: 250,
                  minHeight: 230,
                  background: 'rgba(255,255,255,0.9)',
                  borderRadius: 18,
                  boxShadow: '0 4px 18px rgba(0,184,148,0.15)',
                  padding: '1.5rem 1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 8,
                  transition: 'transform 0.22s, box-shadow 0.22s',
                  cursor: 'pointer',
                  border: '2px solid transparent',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => e.currentTarget.style.border = '2px solid #00b894'}
                onMouseLeave={(e) => e.currentTarget.style.border = '2px solid transparent'}
                >
                  <span style={{ marginBottom: 8 }}>{resource.icon}</span>
                  <div style={{ color: '#222', fontWeight: 700, fontSize: 15, textAlign: 'center' }}>{resource.title}</div>
                  <button style={{ marginTop: 8, background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)', color: '#fff', border: 'none', borderRadius: 6, padding: '3px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 4px rgba(0,184,148,0.2)', transition: 'background 0.2s' }} onClick={() => alert(`Access resource: ${resource.title}`)}>Access Resource</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar link component
function SidebarLink({ icon, label, active, onClick }) { // Removed isMobile prop
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: '0.7rem 1rem', borderRadius: 8, // Consistent padding
        background: active ? '#fff' : 'none', color: active ? '#00b894' : '#fff', fontWeight: 700,
        fontSize: 16, // Consistent font size
        marginBottom: 8, cursor: 'pointer', // Consistent margin
        boxShadow: active ? '0 2px 8px rgba(255,255,255,0.1)' : 'none',
        transition: 'background 0.2s, color 0.2s, transform 0.1s',
        flexGrow: 0, // Consistent flex grow
        justifyContent: 'flex-start', // Always align to start
        whiteSpace: 'nowrap',
      }}
      onClick={onClick}
    >
      {icon} {label} {/* Always show label */}
    </div>
  );
}

export default MentorDashboard;