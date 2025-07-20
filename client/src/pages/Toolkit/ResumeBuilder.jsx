import React, { useState } from 'react';

const ResumeBuilder = () => {
  const [showPreview, setShowPreview] = useState(false);
  const [resumeData, setResumeData] = useState({
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    summary: '',
    education: '',
    skills: '',
    experience: '',
    projects: '',
    certifications: '',
  });

  return (
    <>
      <style>{`
        @media print {
          body * { visibility: hidden !important; }
          #resume-print-modal, #resume-print-modal * { visibility: visible !important; }
          #resume-print-modal { position: absolute !important; left: 0; top: 0; width: 100vw !important; min-width: 0 !important; max-width: 100vw !important; box-shadow: none !important; background: #fff !important; z-index: 9999 !important; }
        }
      `}</style>
      <div style={{
        background: 'linear-gradient(120deg, #eafcff 0%, #f8fafc 100%)',
        borderRadius: 28,
        boxShadow: '0 8px 36px #00b89433',
        padding: '2.8rem 2.2rem',
        margin: '40px auto',
        maxWidth: 600,
        minHeight: 520,
        border: '2.5px solid #00b89422',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <a href="/dropout-toolkit" style={{
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
        }}>← Back to Toolkit</a>
        <h2 style={{
          color: '#00b894',
          fontWeight: 900,
          fontSize: '2.1rem',
          marginBottom: 24,
          letterSpacing: 1,
          textAlign: 'center',
          textShadow: '0 2px 12px #a8c0ff44',
        }}>Resume Builder</h2>
        <form onSubmit={e => { e.preventDefault(); setShowPreview(true); }}>
          <label style={{ fontWeight: 700, color: '#333', marginBottom: 4, display: 'block' }}>Full Name</label>
          <input type="text" value={resumeData.name} onChange={e => setResumeData({ ...resumeData, name: e.target.value })} required style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <label style={{ fontWeight: 700, color: '#333', marginBottom: 4, display: 'block' }}>Email</label>
          <input type="email" value={resumeData.email} onChange={e => setResumeData({ ...resumeData, email: e.target.value })} required style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <label style={{ fontWeight: 700, color: '#333', marginBottom: 4, display: 'block' }}>Phone</label>
          <input type="text" value={resumeData.phone} onChange={e => setResumeData({ ...resumeData, phone: e.target.value })} required style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
          <label style={{ fontWeight: 700, color: '#333', marginBottom: 4, display: 'block' }}>LinkedIn</label>
          <input type="text" value={resumeData.linkedin} onChange={e => setResumeData({ ...resumeData, linkedin: e.target.value })} style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} placeholder="https://linkedin.com/in/yourprofile" />
          <label style={{ fontWeight: 700, color: '#333', marginBottom: 4, display: 'block' }}>GitHub</label>
          <input type="text" value={resumeData.github} onChange={e => setResumeData({ ...resumeData, github: e.target.value })} style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} placeholder="https://github.com/yourprofile" />
          <label style={{ fontWeight: 700, color: '#333', marginBottom: 4, display: 'block' }}>Professional Summary</label>
          <textarea value={resumeData.summary} onChange={e => setResumeData({ ...resumeData, summary: e.target.value })} required style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 40 }} placeholder="Brief summary about yourself, skills, and goals." />
          <label style={{ fontWeight: 700, color: '#333', marginBottom: 4, display: 'block' }}>Education</label>
          <textarea value={resumeData.education} onChange={e => setResumeData({ ...resumeData, education: e.target.value })} required style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 40 }} placeholder="Degree, Institution, Year, Achievements" />
          <label style={{ fontWeight: 700, color: '#333', marginBottom: 4, display: 'block' }}>Skills</label>
          <textarea value={resumeData.skills} onChange={e => setResumeData({ ...resumeData, skills: e.target.value })} required style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 40 }} placeholder="Comma separated e.g. JavaScript, React, Node.js" />
          <label style={{ fontWeight: 700, color: '#333', marginBottom: 4, display: 'block' }}>Experience</label>
          <textarea value={resumeData.experience} onChange={e => setResumeData({ ...resumeData, experience: e.target.value })} required style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 40 }} placeholder="Role, Company, Duration, Achievements" />
          <label style={{ fontWeight: 700, color: '#333', marginBottom: 4, display: 'block' }}>Projects</label>
          <textarea value={resumeData.projects} onChange={e => setResumeData({ ...resumeData, projects: e.target.value })} style={{ width: '100%', marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 40 }} placeholder="Project Name, Description, Tech Used, Link" />
          <label style={{ fontWeight: 700, color: '#333', marginBottom: 4, display: 'block' }}>Certifications</label>
          <textarea value={resumeData.certifications} onChange={e => setResumeData({ ...resumeData, certifications: e.target.value })} style={{ width: '100%', marginBottom: 18, padding: 8, borderRadius: 6, border: '1px solid #ccc', minHeight: 40 }} placeholder="Certification Name, Issuer, Year" />
          <button type="submit" style={{
            background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 10,
            padding: '12px 0',
            fontWeight: 800,
            fontSize: 17,
            cursor: 'pointer',
            boxShadow: '0 2px 8px #00b89422',
            letterSpacing: 1,
            width: '100%',
            marginTop: 12,
            transition: 'background 0.2s',
          }}>Preview Resume</button>
        </form>
      </div>
      {/* Resume Preview Modal */}
      {showPreview && (
        <div id="resume-print-modal" style={{
          position: 'fixed',
          top: 0, left: 0, width: '100vw', height: '100vh',
          background: 'rgba(0,0,0,0.18)',
          zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            background: 'linear-gradient(120deg, #eafcff 0%, #f8fafc 100%)',
            borderRadius: 20,
            boxShadow: '0 6px 32px #00b89422',
            padding: '2.5rem 2.2rem',
            minWidth: 340,
            maxWidth: 600,
            width: '100%',
            position: 'relative',
            fontFamily: 'Arial, Helvetica, sans-serif',
            border: '2px solid #00b89422',
          }}>
            <button onClick={() => setShowPreview(false)} style={{ position: 'absolute', top: 18, right: 18, background: '#eee', border: 'none', borderRadius: 6, padding: '4px 12px', fontWeight: 700, fontSize: 16, cursor: 'pointer', color: '#646cff' }}>×</button>
            <div style={{ borderBottom: '2.5px solid #00b894', paddingBottom: 8, marginBottom: 18, textAlign: 'center' }}>
              <h1 style={{ margin: 0, fontSize: 28, color: '#00b894', fontWeight: 900, letterSpacing: 1 }}>{resumeData.name || 'Your Name'}</h1>
              <div style={{ fontSize: 15, color: '#444', marginTop: 4 }}>
                {resumeData.email}
                {resumeData.phone && <> | {resumeData.phone}</>}
                {resumeData.linkedin && <>
                  | <a href={resumeData.linkedin} style={{ color: '#646cff', textDecoration: 'underline' }}>{resumeData.linkedin}</a>
                </>}
                {resumeData.github && <>
                  | <a href={resumeData.github} style={{ color: '#646cff', textDecoration: 'underline' }}>{resumeData.github}</a>
                </>}
              </div>
            </div>
            {resumeData.summary && <section style={{ marginBottom: 18 }}>
              <h2 style={{ color: '#00b894', fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 4, letterSpacing: 1 }}>Professional Summary</h2>
              <div style={{ color: '#222', fontSize: 15, whiteSpace: 'pre-line' }}>{resumeData.summary}</div>
            </section>}
            {resumeData.skills && <section style={{ marginBottom: 18 }}>
              <h2 style={{ color: '#646cff', fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 4, letterSpacing: 1 }}>Skills</h2>
              <div style={{ color: '#222', fontSize: 15 }}>{resumeData.skills.split(',').map(skill => <span key={skill.trim()} style={{ display: 'inline-block', background: '#eafcff', color: '#00b894', borderRadius: 6, padding: '3px 12px', margin: '2px 8px 2px 0', fontSize: 14, fontWeight: 700, boxShadow: '0 1px 4px #00b89411' }}>{skill.trim()}</span>)}</div>
            </section>}
            {resumeData.experience && <section style={{ marginBottom: 18 }}>
              <h2 style={{ color: '#646cff', fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 4, letterSpacing: 1 }}>Experience</h2>
              <div style={{ color: '#222', fontSize: 15, whiteSpace: 'pre-line' }}>{resumeData.experience}</div>
            </section>}
            {resumeData.projects && <section style={{ marginBottom: 18 }}>
              <h2 style={{ color: '#00b894', fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 4, letterSpacing: 1 }}>Projects</h2>
              <div style={{ color: '#222', fontSize: 15, whiteSpace: 'pre-line' }}>{resumeData.projects}</div>
            </section>}
            {resumeData.education && <section style={{ marginBottom: 18 }}>
              <h2 style={{ color: '#646cff', fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 4, letterSpacing: 1 }}>Education</h2>
              <div style={{ color: '#222', fontSize: 15, whiteSpace: 'pre-line' }}>{resumeData.education}</div>
            </section>}
            {resumeData.certifications && <section style={{ marginBottom: 18 }}>
              <h2 style={{ color: '#00b894', fontSize: 18, fontWeight: 700, margin: 0, marginBottom: 4, letterSpacing: 1 }}>Certifications</h2>
              <div style={{ color: '#222', fontSize: 15, whiteSpace: 'pre-line' }}>{resumeData.certifications}</div>
            </section>}
            <button style={{ marginTop: 18, background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 1px 4px #00b89422', letterSpacing: 1, width: '100%' }} onClick={() => window.print()}>Print / Save as PDF</button>
          </div>
        </div>
      )}
    </>
  );
};

export default ResumeBuilder;
