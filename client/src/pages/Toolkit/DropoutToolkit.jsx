import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRocket, FaSmile, FaUserGraduate, FaUsers } from 'react-icons/fa';

const DropoutToolkit = () => {
  // Toolkit features data
  const navigate = useNavigate();
  const comebackPlan = [
    'Review your last completed course',
    'Set a small daily learning goal (e.g., 15 minutes)',
    'Reach out to a mentor for a quick check-in',
    'Pick a new recommended course to restart momentum',
  ];
  const motivationResources = [
    { type: 'quote', text: 'Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill' },
    { type: 'link', text: 'TED Talk: The Power of Believing You Can Improve', url: 'https://www.ted.com/talks/carol_dweck_the_power_of_believing_that_you_can_improve' },
    { type: 'link', text: 'Motivational Playlist', url: 'https://open.spotify.com/playlist/37i9dQZF1DXdxcBWuJkbcy' },
  ];
  // Placeholder for resume builder
  const resumeTips = [
    'List your most recent education and skills.',
    'Highlight any certifications or online courses.',
    'Keep your resume to one page and use action verbs.',
    'Proofread for errors and keep formatting clean.',
  ];
  // Placeholder for community
  const communityLinks = [
    { name: 'Student Forum', url: 'https://www.reddit.com/r/learnprogramming/' },
    { name: 'Mentor Connect', url: 'mailto:mentor@digitalbridge.com' },
    { name: 'Discord Study Group', url: 'https://discord.com/invite/learn' },
  ];


  return (
    <>
      {/* Print-only style to show only the preview modal when printing */}
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #resume-print-modal, #resume-print-modal * { visibility: visible !important; }
          #resume-print-modal { position: absolute !important; left: 0; top: 0; width: 100vw !important; min-width: 0 !important; max-width: 100vw !important; box-shadow: none !important; background: #fff !important; z-index: 9999 !important; }
        }
        @media (max-width: 900px) {
          .toolkit-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    <div style={{
      background: 'linear-gradient(120deg, #eafcff 0%, #f8fafc 100%)',
      borderRadius: 24,
      boxShadow: '0 6px 32px #00b89422',
      padding: '2.5rem 2rem',
      marginBottom: 28,
      maxWidth: 1200,
      margin: '0 auto',
      minHeight: 600,
    }}>
      <a href="/dashboard/student" style={{
        background: 'linear-gradient(90deg, #646cff 60%, #00b894 100%)',
        color: '#fff',
        border: 'none',
        borderRadius: 8,
        padding: '10px 28px',
        fontWeight: 700,
        fontSize: 17,
        marginBottom: 28,
        cursor: 'pointer',
        textDecoration: 'none',
        display: 'inline-block',
        boxShadow: '0 2px 8px #646cff33',
        letterSpacing: 1,
        transition: 'background 0.2s',
      }}>← Back to Dashboard</a>
      <h2 style={{
        color: '#00b894',
        fontWeight: 900,
        fontSize: '2.3rem',
        marginBottom: 44,
        letterSpacing: 1,
        textAlign: 'center',
        textShadow: '0 2px 12px #a8c0ff44',
      }}>Dropout Recovery Toolkit</h2>
      <div className="toolkit-grid" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: 28,
        marginTop: 0,
        alignItems: 'stretch',
      }}>
        {/* Time Management Tools Card */}
        <div style={{
          background: 'linear-gradient(120deg, #f0f7fa 60%, #d1f2eb 100%)',
          borderRadius: 18,
          boxShadow: '0 4px 18px #00b89433',
          padding: '2.2rem 1.7rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minHeight: 280,
          height: '100%',
          boxSizing: 'border-box',
          transition: 'transform 0.18s, box-shadow 0.18s',
          wordBreak: 'break-word',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 28, color: '#00b894', background: '#fff', borderRadius: '50%', padding: 8, boxShadow: '0 2px 8px #00b89422' }}><FaRocket /></span>
            <h3 style={{ color: '#00b894', fontWeight: 900, fontSize: '1.25rem', margin: 0 }}>Time Management Tools</h3>
          </div>
          <ul style={{ color: '#333', fontSize: 16, marginLeft: 18, marginBottom: 8, lineHeight: 1.7 }}>
            <li>To-Do List, Planner, and Pomodoro Timer built-in!</li>
          </ul>
          <button
            style={{ marginTop: 18, background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px #00b89422', letterSpacing: 1, transition: 'background 0.2s' }}
            onClick={() => navigate('/dropout-toolkit/time-management')}
          >
            Open Time Management
          </button>
        </div>
        {/* Comeback Plan Card */}
        <div style={{
          background: 'linear-gradient(120deg, #eafcff 60%, #b2f7ef 100%)',
          borderRadius: 18,
          boxShadow: '0 4px 18px #00b89433',
          padding: '2.2rem 1.7rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minHeight: 280,
          height: '100%',
          boxSizing: 'border-box',
          transition: 'transform 0.18s, box-shadow 0.18s',
          wordBreak: 'break-word',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 28, color: '#00b894', background: '#fff', borderRadius: '50%', padding: 8, boxShadow: '0 2px 8px #00b89422' }}><FaRocket /></span>
            <h3 style={{ color: '#00b894', fontWeight: 900, fontSize: '1.25rem', margin: 0 }}>Comeback Plan</h3>
          </div>
          <ol style={{ color: '#333', fontSize: 16, marginLeft: 18, marginBottom: 0, lineHeight: 1.7 }}>
            {comebackPlan.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
        {/* Motivation Card */}
        <div style={{
          background: 'linear-gradient(120deg, #f8fafc 60%, #e0e7ff 100%)',
          borderRadius: 18,
          boxShadow: '0 4px 18px #646cff33',
          padding: '2.2rem 1.7rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minHeight: 280,
          height: '100%',
          boxSizing: 'border-box',
          transition: 'transform 0.18s, box-shadow 0.18s',
          wordBreak: 'break-word',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 28, color: '#646cff', background: '#fff', borderRadius: '50%', padding: 8, boxShadow: '0 2px 8px #646cff22' }}><FaSmile /></span>
            <h3 style={{ color: '#646cff', fontWeight: 900, fontSize: '1.25rem', margin: 0 }}>Motivation</h3>
          </div>
          <ul style={{ color: '#333', fontSize: 16, marginLeft: 18, marginBottom: 0, lineHeight: 1.7 }}>
            {motivationResources.map((res, idx) => (
              <li key={idx}>
                {res.type === 'quote' ? (
                  <em>"{res.text}"</em>
                ) : (
                  <a href={res.url} target="_blank" rel="noopener noreferrer" style={{ color: '#646cff', textDecoration: 'underline' }}>{res.text}</a>
                )}
              </li>
            ))}
          </ul>
        </div>
        {/* Resume Builder Card */}
        <div style={{
          background: 'linear-gradient(120deg, #eafcff 60%, #b2f7ef 100%)',
          borderRadius: 18,
          boxShadow: '0 4px 18px #00b89433',
          padding: '2.2rem 1.7rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minHeight: 280,
          height: '100%',
          boxSizing: 'border-box',
          transition: 'transform 0.18s, box-shadow 0.18s',
          wordBreak: 'break-word',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 28, color: '#00b894', background: '#fff', borderRadius: '50%', padding: 8, boxShadow: '0 2px 8px #00b89422' }}><FaUserGraduate /></span>
            <h3 style={{ color: '#00b894', fontWeight: 900, fontSize: '1.25rem', margin: 0 }}>Resume & Skills</h3>
          </div>
          <ul style={{ color: '#333', fontSize: 16, marginLeft: 18, marginBottom: 0, lineHeight: 1.7 }}>
            {resumeTips.map((tip, idx) => (
              <li key={idx}>{tip}</li>
            ))}
          </ul>
          <button
            style={{ marginTop: 18, background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px #00b89422', letterSpacing: 1, transition: 'background 0.2s' }}
            onClick={() => navigate('/dropout-toolkit/resume')}
          >
            Build Resume
          </button>
        </div>
        {/* Community Card */}
        <div style={{
          background: 'linear-gradient(120deg, #f4f4f4 60%, #e0e0e0 100%)',
          borderRadius: 18,
          boxShadow: '0 4px 18px #2222',
          padding: '2.2rem 1.7rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          minHeight: 280,
          height: '100%',
          boxSizing: 'border-box',
          transition: 'transform 0.18s, box-shadow 0.18s',
          wordBreak: 'break-word',
          overflow: 'hidden',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
            <span style={{ fontSize: 28, color: '#222', background: '#fff', borderRadius: '50%', padding: 8, boxShadow: '0 2px 8px #2222' }}><FaUsers /></span>
            <h3 style={{ color: '#222', fontWeight: 900, fontSize: '1.25rem', margin: 0 }}>Community</h3>
          </div>
          <ul style={{ color: '#333', fontSize: 16, marginLeft: 18, marginBottom: 0, lineHeight: 1.7 }}>
            {communityLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: '#222', textDecoration: 'underline' }}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
    </>
  );
};

export default DropoutToolkit;
