import React from "react";
import { FaChalkboardTeacher, FaLaptopCode, FaUserGraduate, FaBookOpen, FaEnvelope, FaCog, FaSignOutAlt, FaTasks, FaUsers, FaChartLine, FaRegLightbulb, FaGraduationCap, FaLifeRing, FaPalette } from "react-icons/fa";

// Import your actual components from the sibling directory (pages)
// Adjusted paths because MentorDashboard is now in 'pages/dashboard'
import MyMentees from "../MyMentees"; // Corrected from `../pages/MyMentees` if that was the mistake
import MentorCourseManagement from "../MentorCourseManagement"; // Corrected
import MentorAssignmentReview from "../MentorAssignmentReview"; // Corrected
import MentorResourceLibrary from "../MentorResourceLibrary"; // Corrected
import MentorSettings from "../MentorSettings"; // Corrected
import MentorHelpAndSupport from "../MentorHelpAndSupport"; // Corrected

// Mock data for a mentor's view (These are used in the Dashboard overview)
const mockMentoredCourses = [
  {
    id: 1,
    title: 'Mathematics Basics',
    mentees: 12,
    completedMentees: 8,
    icon: <FaChalkboardTeacher size={32} color="#00b894" />,
    status: 'active'
  },
  {
    id: 2,
    title: 'Digital Marketing 101',
    mentees: 10,
    completedMentees: 2,
    icon: <FaLaptopCode size={32} color="#00b894" />,
    status: 'active'
  },
  {
    id: 3,
    title: 'English Communication',
    mentees: 15,
    completedMentees: 15,
    icon: <FaBookOpen size={30} color="#00b894" />,
    status: 'completed'
  },
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
  background: 'rgba(255,255,255,0.9)',
  borderRadius: 18,
  padding: '1.5rem 1.2rem',
  boxShadow: '0 4px 18px rgba(0,184,148,0.15)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 8,
  transition: 'transform 0.22s, box-shadow 0.22s, background 0.22s, border 0.22s',
  cursor: 'pointer',
  border: '2px solid transparent',
  position: 'relative',
  overflow: 'hidden',
};

// Simple hook for responsiveness
const useResponsive = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};


const MentorDashboard = () => {
  const [hovered, setHovered] = React.useState(null);
  const mentorName = 'Dr. Anya Sharma';
  const isMobile = useResponsive();

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
    { icon: <FaLifeRing />, label: 'Help & Support' },
  ];

  // State to manage the active content view
  const [activeContent, setActiveContent] = React.useState('Dashboard'); // Default to Dashboard

  // Function to render the correct content based on activeContent state
  const renderContent = () => {
    switch (activeContent) {
      case 'Dashboard':
        return (
          <>
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
                      // Conditional strokeDashoffset to avoid NaN on initial empty data
                      strokeDashoffset={totalMentees > 0 ? 2 * Math.PI * 48 * (1 - (totalCompletedMentees / totalMentees)) : 2 * Math.PI * 48}
                      strokeLinecap="round"
                      style={{ transition: 'stroke-dashoffset 0.7s' }}
                    />
                    <text x="50%" y="54%" textAnchor="middle" fontSize="1.5rem" fontWeight="bold" fill="#00b894">
                      {/* Conditional display for percentage to show 0% instead of NaN% */}
                      {totalMentees > 0 ? `${Math.round(totalCompletedMentees / totalMentees * 100)}%` : '0%'}
                    </text>
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
                  const widthStyle = `${completionPercentage}%`;

                  return (
                    <div
                      key={idx}
                      style={{
                        ...cardBase,
                        border: hovered === idx ? '2px solid #00b894' : '2px solid transparent',
                        boxShadow: hovered === idx ? '0 8px 32px rgba(0,184,148,0.3)' : cardBase.boxShadow,
                        transform: hovered === idx ? 'translateY(-8px) scale(1.04)' : 'none',
                        background: hovered === idx ? 'rgba(0,184,148,0.1)' : 'rgba(255,255,255,0.9)',
                      }}
                      onMouseEnter={() => setHovered(idx)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <span style={{ fontSize: 38, marginBottom: 10, filter: hovered === idx ? 'drop-shadow(0 2px 8px rgba(0,184,148,0.5))' : 'none', transition: 'filter 0.2s' }}>{course.icon}</span>
                      <h3 style={{ color: '#222', fontWeight: 800, fontSize: '1.13rem', marginBottom: 10, textAlign: 'center', letterSpacing: 0.5 }}>{course.title}</h3>
                      <div style={{ marginBottom: 10, width: '100%' }}>
                        <div style={{ height: 8, background: '#e0e0e0', borderRadius: 6, overflow: 'hidden', marginBottom: 4 }}>
                          <div style={{ width: widthStyle, height: 8, background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)', borderRadius: 6, transition: 'width 0.4s, background 0.2s' }}></div>
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
                      border: '2px solid #646cff',
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

            {/* Recommended Resources Section (Kept for Dashboard Overview) */}
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,184,148,0.1)', padding: '1.5rem 1.2rem', marginBottom: 12 }}>
              <h2 style={{ color: '#00b894', fontWeight: 800, fontSize: isMobile ? '1.1rem' : '1.13rem', marginBottom: 12, letterSpacing: 1 }}>Recommended Resources (Dashboard Quick Links)</h2>
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
          </>
        );
      case 'My Mentees':
        return <MyMentees />;
      case 'Course Management':
        return <MentorCourseManagement />;
      case 'Assignments Review':
        return <MentorAssignmentReview />;
      case 'Resource Library':
        return <MentorResourceLibrary />;
      case 'Settings':
        return <MentorSettings />;
      case 'Help & Support':
        return <MentorHelpAndSupport />;
      default:
        return (
          <div style={{ textAlign: 'center', padding: '50px', color: '#666', fontSize: '1.2rem' }}>
            Select an option from the sidebar.
          </div>
        );
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #e0ffe0 0%, #f8fafc 100%)', display: 'flex', flexDirection: isMobile ? 'column' : 'row' }}>
      {/* Sidebar */}
      <aside style={{
        width: isMobile ? '100%' : 240,
        background: 'linear-gradient(180deg, #00b894 0%, #00997e 100%)',
        color: '#fff',
        minHeight: isMobile ? 'auto' : '100vh',
        padding: isMobile ? '1.5rem 1rem' : '2.5rem 1.5rem 2rem 1.5rem',
        display: 'flex',
        flexDirection: isMobile ? 'row' : 'column',
        alignItems: isMobile ? 'center' : 'flex-start',
        justifyContent: isMobile ? 'space-around' : 'flex-start',
        boxShadow: isMobile ? '0 2px 16px rgba(0,184,148,0.3)' : '4px 0 16px rgba(0,184,148,0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 2,
        flexWrap: isMobile ? 'wrap' : 'nowrap',
      }}>
        <div style={{
          fontWeight: 900,
          fontSize: isMobile ? 18 : 24,
          marginBottom: isMobile ? 0 : 32,
          letterSpacing: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexBasis: isMobile ? '100%' : 'auto',
          justifyContent: isMobile ? 'center' : 'flex-start',
          paddingBottom: isMobile ? 15 : 0,
          borderBottom: isMobile ? '1px solid rgba(255,255,255,0.2)' : 'none',
        }}>
          <FaChalkboardTeacher size={isMobile ? 22 : 28} style={{ marginRight: 6 }} /> Mentor
        </div>
        <nav style={{ width: '100%', display: isMobile ? 'flex' : 'block', justifyContent: 'center', flexWrap: 'wrap', marginTop: isMobile ? 15 : 0 }}>
          {sidebarLinks.map(link => (
            <SidebarLink
              key={link.label}
              icon={link.icon}
              label={link.label}
              active={activeContent === link.label}
              onClick={() => setActiveContent(link.label)}
              isMobile={isMobile}
            />
          ))}
        </nav>
        <div style={{ flexGrow: 1 }} />
        <button style={{
          background: 'none',
          border: 'none',
          color: '#fff',
          fontWeight: 700,
          fontSize: isMobile ? 14 : 16,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          cursor: 'pointer',
          marginTop: isMobile ? 10 : 18,
          opacity: isMobile ? 0.8 : 1,
          flexBasis: isMobile ? '100%' : 'auto',
          justifyContent: isMobile ? 'center' : 'flex-start',
        }}>
          <FaSignOutAlt /> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: isMobile ? '1.5rem 1rem' : '2rem 0', minWidth: 0, background: 'linear-gradient(120deg, #f8fafc 60%, #eafcff 100%)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 1rem' }}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

// Sidebar link component
function SidebarLink({ icon, label, active, onClick, isMobile }) {
  return (
    <div
      style={{
        display: 'flex', alignItems: 'center', gap: 12, padding: isMobile ? '0.5rem 0.8rem' : '0.7rem 1rem', borderRadius: 8,
        background: active ? '#fff' : 'none', color: active ? '#00b894' : '#fff', fontWeight: 700,
        fontSize: isMobile ? 14 : 16,
        marginBottom: isMobile ? 4 : 8, cursor: 'pointer',
        boxShadow: active ? '0 2px 8px rgba(255,255,255,0.1)' : 'none',
        transition: 'background 0.2s, color 0.2s, transform 0.1s',
        flexGrow: isMobile ? 1 : 0,
        justifyContent: isMobile ? 'center' : 'flex-start',
        whiteSpace: 'nowrap',
      }}
      onClick={onClick}
    >
      {icon} {!isMobile && label}
    </div>
  );
}

export default MentorDashboard;