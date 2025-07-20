import React from 'react';
import { Link } from 'react-router-dom';
import { FaGraduationCap, FaChalkboardTeacher, FaShieldAlt } from 'react-icons/fa';

const cardStyle = {
  flex: 1,
  minWidth: 220,
  maxWidth: 320,
  margin: '0 1rem',
  background: 'rgba(255,255,255,0.13)',
  borderRadius: 20,
  padding: '2.2rem 1.5rem',
  boxShadow: '0 8px 32px rgba(100,108,255,0.13)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  transition: 'transform 0.25s, box-shadow 0.25s',
  cursor: 'pointer',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  opacity: 0,
  transform: 'translateY(40px)',
  animation: 'fadeInUp 0.7s forwards',
};

const cardHoverStyle = {
  transform: 'translateY(-8px) scale(1.04)',
  boxShadow: '0 16px 48px rgba(100,108,255,0.18)',
  background: 'rgba(255,255,255,0.22)',
};

const mainStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: 32,
  marginBottom: 40,
  flexWrap: 'wrap',
  width: '100%',
  maxWidth: 1100,
  marginLeft: 'auto',
  marginRight: 'auto',
};

const useResponsive = () => {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

const gradientText = {
  background: 'linear-gradient(90deg, #646cff 30%, #00b894 70%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 800,
  fontSize: '1.3rem',
  letterSpacing: 1,
  marginBottom: 18,
};

const waveStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  zIndex: 0,
};

const Landing = () => {
  const isMobile = useResponsive();
  const [hovered, setHovered] = React.useState(null);
  return (
    <div style={{ minHeight: '100vh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: isMobile ? '1rem 0.5rem' : '2rem 0', background: 'linear-gradient(120deg, #646cff 0%, #242424 100%)', overflow: 'hidden' }}>
      {/* SVG Hero Wave */}
      <svg style={waveStyle} height="180" viewBox="0 0 1440 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="#646cff" fillOpacity="0.18" d="M0,64L48,80C96,96,192,128,288,133.3C384,139,480,117,576,117.3C672,117,768,139,864,138.7C960,139,1056,117,1152,117.3C1248,117,1344,139,1392,149.3L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
      </svg>
      <header style={{ textAlign: 'center', marginBottom: isMobile ? 18 : 32, zIndex: 1, position: 'relative' }}>
        <h1 style={{ fontSize: isMobile ? '2.2rem' : '3rem', fontWeight: 900, color: '#fff', letterSpacing: 1, marginBottom: 8, textShadow: '0 2px 12px #646cff55' }}>
          Bridge the Gap for Dropouts
        </h1>
        <div style={gradientText}>Empowering second chances for every learner</div>
        <p style={{ color: '#e0e0e0', fontSize: isMobile ? '1.1rem' : '1.25rem', maxWidth: 600, margin: '0 auto' }}>
          Flexible learning, mentorship, and recognized certification for all.
        </p>
        <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <Link to="/register" style={{ background: 'linear-gradient(90deg, #646cff 60%, #00b894 100%)', color: '#fff', padding: '0.9em 2.2em', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: isMobile ? '1rem' : '1.15rem', boxShadow: '0 2px 12px #646cff33', letterSpacing: 1, transition: 'background 0.2s' }}>
            Join Now
          </Link>
          <Link to="/course/1" style={{ background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)', color: '#fff', padding: '0.9em 2.2em', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: isMobile ? '1rem' : '1.15rem', boxShadow: '0 2px 12px #00b89433', letterSpacing: 1, transition: 'background 0.2s' }}>
            View Sample Course
          </Link>
          <Link to="/login" style={{ background: 'transparent', color: '#646cff', border: '2px solid #646cff', padding: '0.9em 2.2em', borderRadius: 12, fontWeight: 700, textDecoration: 'none', fontSize: isMobile ? '1rem' : '1.15rem', letterSpacing: 1, transition: 'background 0.2s' }}>
            Login
          </Link>
        </div>
      </header>
      <main style={{ ...mainStyle, flexDirection: isMobile ? 'column' : 'row', gap: isMobile ? 18 : 32, zIndex: 1, position: 'relative' }}>
        <Link
          to="/dashboard/student"
          style={{
            ...cardStyle,
            border: '2px solid #646cff',
            color: '#fff',
            textDecoration: 'none',
            ...(hovered === 'student' ? cardHoverStyle : {}),
            animationDelay: '0.1s',
            opacity: 1,
            transform: 'none',
          }}
          onMouseEnter={() => setHovered('student')}
          onMouseLeave={() => setHovered(null)}
        >
          <span style={{ fontSize: 44, marginBottom: 12, filter: 'drop-shadow(0 2px 8px #646cff88)' }}><FaGraduationCap size={44} color="#646cff" /></span>
          <h2 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: 8 }}>Student Dashboard</h2>
          <p style={{ color: '#e0e0e0', fontSize: '1rem', textAlign: 'center' }}>View your courses, certificates, and connect with mentors.</p>
        </Link>
        <Link
          to="/dashboard/mentor"
          style={{
            ...cardStyle,
            border: '2px solid #00b894',
            color: '#fff',
            textDecoration: 'none',
            ...(hovered === 'mentor' ? cardHoverStyle : {}),
            animationDelay: '0.25s',
            opacity: 1,
            transform: 'none',
          }}
          onMouseEnter={() => setHovered('mentor')}
          onMouseLeave={() => setHovered(null)}
        >
          <span style={{ fontSize: 44, marginBottom: 12, filter: 'drop-shadow(0 2px 8px #00b89488)' }}><FaChalkboardTeacher size={44} color="#00b894" /></span>
          <h2 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: 8 }}>Mentor Dashboard</h2>
          <p style={{ color: '#e0e0e0', fontSize: '1rem', textAlign: 'center' }}>Guide learners, answer questions, and track mentee progress.</p>
        </Link>
        <Link
          to="/dashboard/admin"
          style={{
            ...cardStyle,
            border: '2px solid #fd5e53',
            color: '#fff',
            textDecoration: 'none',
            ...(hovered === 'admin' ? cardHoverStyle : {}),
            animationDelay: '0.4s',
            opacity: 1,
            transform: 'none',
          }}
          onMouseEnter={() => setHovered('admin')}
          onMouseLeave={() => setHovered(null)}
        >
          <span style={{ fontSize: 44, marginBottom: 12, filter: 'drop-shadow(0 2px 8px #fd5e5388)' }}><FaShieldAlt size={44} color="#fd5e53" /></span>
          <h2 style={{ fontWeight: 800, fontSize: '1.3rem', marginBottom: 8 }}>Admin Dashboard</h2>
          <p style={{ color: '#e0e0e0', fontSize: '1rem', textAlign: 'center' }}>Manage users, courses, and platform analytics.</p>
        </Link>
      </main>
      <footer style={{ marginTop: isMobile ? 12 : 24, textAlign: 'center', color: '#aaa', fontSize: isMobile ? '0.85rem' : '0.95rem', zIndex: 1, position: 'relative' }}>
        &copy; {new Date().getFullYear()} BridgeEd. Empowering second chances.
      </footer>
      {/* Keyframes for fadeInUp animation */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: none; }
        }
      `}</style>
    </div>
  );
};

export default Landing;

