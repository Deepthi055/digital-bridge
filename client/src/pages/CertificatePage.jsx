import React, { useState } from 'react';

// Dummy data for completed courses with certificates
const completedCourses = [
  {
    title: 'Mathematics Basics',
    date: '2025-06-10',
    certificateUrl: '/certificates/math-basics.pdf',
  },
  {
    title: 'English Communication',
    date: '2025-05-22',
    certificateUrl: '/certificates/english-comm.pdf',
  },
  {
    title: 'Digital Marketing 101',
    date: '2025-04-15',
    certificateUrl: '/certificates/digital-marketing.pdf',
  },
];

function CertificatePage() {
  const [viewing, setViewing] = useState(null);

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #a8c0ff 0%, #f8fafc 100%)', padding: '2.5rem 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #646cff22', padding: '2.5rem 2rem', minHeight: 500 }}>
        <h1 style={{ color: '#646cff', fontWeight: 900, fontSize: '2.1rem', marginBottom: 18, letterSpacing: 1 }}>My Certificates <span style={{ fontSize: 28 }}>🎓</span></h1>
        <p style={{ color: '#333', fontSize: 17, marginBottom: 28 }}>View and download your earned certificates for completed courses.</p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {completedCourses.map((course, idx) => (
            <div key={idx} style={{ background: '#f8fafc', borderRadius: 14, boxShadow: '0 2px 8px #646cff11', padding: '1.2rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '2px solid #e0e0e0' }}>
              <div>
                <div style={{ color: '#646cff', fontWeight: 700, fontSize: 18 }}>{course.title}</div>
                <div style={{ color: '#00b894', fontSize: 14, marginTop: 2 }}>Completed: {course.date}</div>
              </div>
              <div style={{ display: 'flex', gap: 14 }}>
                <button style={{ background: 'linear-gradient(90deg, #646cff 60%, #00b894 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 8px #646cff22' }} onClick={() => setViewing(course)}>
                  View
                </button>
                <a href={course.certificateUrl} download style={{ background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 8px #00b89422', textDecoration: 'none', display: 'inline-block' }}>
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Modal for viewing certificate */}
        {viewing && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setViewing(null)}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #646cff44', padding: '2rem', minWidth: 340, minHeight: 320, position: 'relative' }} onClick={e => e.stopPropagation()}>
              <button onClick={() => setViewing(null)} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', color: '#646cff', fontSize: 26, fontWeight: 700, cursor: 'pointer' }}>&times;</button>
              <h2 style={{ color: '#646cff', fontWeight: 800, fontSize: 20, marginBottom: 18 }}>{viewing.title} Certificate</h2>
              <iframe src={viewing.certificateUrl} title="Certificate" style={{ width: 400, height: 350, border: '1.5px solid #e0e0e0', borderRadius: 8, background: '#f8fafc' }}></iframe>
              <div style={{ marginTop: 18, textAlign: 'center' }}>
                <a href={viewing.certificateUrl} download style={{ background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '7px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 8px #00b89422', textDecoration: 'none', display: 'inline-block' }}>
                  Download Certificate
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CertificatePage;
