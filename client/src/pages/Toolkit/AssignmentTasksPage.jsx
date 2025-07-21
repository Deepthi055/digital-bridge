import React from 'react';


import { useState } from 'react';

const initialAssignments = [
  { id: 1, title: 'Math Quiz 1', due: '2025-07-25', status: 'completed', description: 'Complete the first quiz on basic algebra.' },
  { id: 2, title: 'Digital Marketing Project', due: '2025-07-28', status: 'in-progress', description: 'Submit your marketing plan for a new product.' },
  { id: 3, title: 'English Essay', due: '2025-07-30', status: 'not-started', description: 'Write an essay on effective communication.' },
  { id: 4, title: 'Data Science Assignment', due: '2025-08-02', status: 'not-started', description: 'Analyze a dataset and present your findings.' }
];



function AssignmentProgressChart({ assignments }) {
  const total = assignments.length;
  const completed = assignments.filter(a => a.status === 'completed').length;
  const inProgress = assignments.filter(a => a.status === 'in-progress').length;
  const notStarted = assignments.filter(a => a.status === 'not-started').length;
  const percent = Math.round((completed / (total || 1)) * 100);
  return (
    <div style={{ width: '100%', maxWidth: 420, margin: '0 auto', marginBottom: 18, display: 'flex', alignItems: 'center', gap: 32 }}>
      {/* Circular Progress Chart */}
      <div style={{ position: 'relative', width: 110, height: 110 }}>
        <svg width="110" height="110">
          <circle cx="55" cy="55" r="48" fill="#f8fafc" stroke="#e0e0e0" strokeWidth="7" />
          <circle
            cx="55" cy="55" r="48"
            fill="none"
            stroke="#00b894"
            strokeWidth="7"
            strokeDasharray={2 * Math.PI * 48}
            strokeDashoffset={2 * Math.PI * 48 * (1 - percent / 100)}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.7s' }}
          />
        </svg>
        <div style={{ position: 'absolute', top: 0, left: 0, width: 110, height: 110, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: 28, color: '#00b894' }}>{percent}%</div>
      </div>
      {/* Legend */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15 }}>
        <span><span style={{ display: 'inline-block', width: 14, height: 14, background: '#00b894', borderRadius: 3, marginRight: 8 }}></span>Completed: <b>{completed}</b></span>
        <span><span style={{ display: 'inline-block', width: 14, height: 14, background: '#646cff', borderRadius: 3, marginRight: 8 }}></span>In Progress: <b>{inProgress}</b></span>
        <span><span style={{ display: 'inline-block', width: 14, height: 14, background: '#e0e0e0', borderRadius: 3, marginRight: 8 }}></span>Not Started: <b>{notStarted}</b></span>
        <span style={{ color: '#888', fontSize: 13, marginTop: 6 }}>Total Assignments: {total}</span>
      </div>
    </div>
  );
}



function AssignmentList({ assignments, onMarkComplete }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {assignments.map(a => (
        <div key={a.id} style={{
          background: a.status === 'completed' ? 'linear-gradient(90deg, #eafcff 60%, #d4ffe7 100%)' : a.status === 'in-progress' ? 'linear-gradient(90deg, #f8fafc 60%, #eafcff 100%)' : '#f8fafc',
          border: a.status === 'completed' ? '2px solid #00b894' : a.status === 'in-progress' ? '2px solid #646cff' : '2px solid #e0e0e0',
          borderRadius: 12,
          boxShadow: '0 2px 8px #646cff11',
          padding: '1.1rem 1.2rem',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          position: 'relative',
          opacity: a.status === 'completed' ? 0.7 : 1,
        }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: a.status === 'completed' ? '#00b894' : a.status === 'in-progress' ? '#646cff' : '#e0e0e0', marginRight: 8, flexShrink: 0 }}></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 800, fontSize: 16, color: '#222', marginBottom: 2 }}>{a.title}</div>
            <div style={{ color: '#555', fontSize: 14, marginBottom: 2 }}>{a.description}</div>
            <div style={{ color: '#888', fontSize: 13 }}>Due: {a.due}</div>
          </div>
          <div style={{ fontWeight: 700, fontSize: 14, color: a.status === 'completed' ? '#00b894' : a.status === 'in-progress' ? '#646cff' : '#aaa', marginLeft: 12, minWidth: 90, textAlign: 'right' }}>
            {a.status === 'completed' ? 'Completed' : a.status === 'in-progress' ? 'In Progress' : 'Not Started'}
          </div>
          {a.status !== 'completed' && (
            <button onClick={() => onMarkComplete(a.id)} style={{ marginLeft: 16, background: '#00b894', color: '#fff', border: 'none', borderRadius: 6, padding: '4px 12px', fontSize: 13, fontWeight: 600, cursor: 'pointer', boxShadow: '0 1px 4px #00b89422', transition: 'background 0.2s' }}>Mark Complete</button>
          )}
        </div>
      ))}
    </div>
  );
}

export default function AssignmentTasksPage() {
  const [assignments, setAssignments] = useState(initialAssignments);

  // Handler to mark assignment as complete
  const handleMarkComplete = (id) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: 'completed' } : a));
  };

  return (
    <div style={{
      background: 'linear-gradient(120deg, #eafcff 0%, #f8fafc 100%)',
      borderRadius: 20,
      boxShadow: '0 6px 32px #646cff22',
      padding: '2.7rem 2.2rem 2.2rem 2.2rem',
      marginBottom: 32,
      minHeight: 480,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: 'radial-gradient(circle at 80% 20%, #646cff22 60%, transparent 100%)', zIndex: 0 }} />
      <h2 style={{ color: '#646cff', fontWeight: 900, fontSize: '2.1rem', marginBottom: 8, letterSpacing: 1, zIndex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span role="img" aria-label="tasks">📝</span> Assignments & Tasks
      </h2>
      <p style={{ color: '#333', fontSize: 17, marginBottom: 28, zIndex: 1 }}>Track your assignments and tasks here.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 36, width: '100%', zIndex: 1 }}>
        <div style={{ flex: 1, minWidth: 320, maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #00b89411', padding: '1.3rem 1.2rem', marginBottom: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 22, color: '#00b894' }}>📊</span>
              <span style={{ color: '#646cff', fontWeight: 800, fontSize: 18 }}>Progress Overview</span>
            </div>
            <AssignmentProgressChart assignments={assignments} />
          </div>
        </div>
      </div>
      {/* Assignment List */}
      <div style={{ width: '100%', marginTop: 38, zIndex: 1 }}>
        <h3 style={{ color: '#00b894', fontWeight: 900, fontSize: '1.25rem', marginBottom: 18, letterSpacing: 1, display: 'flex', alignItems: 'center', gap: 8 }}>
          <span role="img" aria-label="list">📋</span> Your Assignments & Tasks
        </h3>
        {assignments.length === 0 ? (
          <div style={{ color: '#aaa', fontSize: 18, textAlign: 'center', padding: '2rem 0' }}>
            No assignments or tasks yet. Enjoy your free time or check back later!
          </div>
        ) : (
          <AssignmentList assignments={assignments} onMarkComplete={handleMarkComplete} />
        )}
      </div>
    </div>
  );
}
