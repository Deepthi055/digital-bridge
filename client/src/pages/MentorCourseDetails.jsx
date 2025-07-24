// src/pages/MentorCourseDetails.jsx

import React from 'react';
import { FaBookOpen, FaUsers, FaUserGraduate, FaTasks, FaInfoCircle, FaCalendarAlt, FaArrowLeft, FaClipboardList, FaClock } from 'react-icons/fa'; // Added FaClipboardList, FaClock

const MentorCourseDetails = ({ course, onBack }) => {
  if (!course) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#666', fontSize: '1.2rem' }}>
        No course selected for details.
        <button
          onClick={onBack}
          style={{
            marginTop: '20px',
            background: '#00b894',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,184,148,0.3)',
            transition: 'all 0.3s ease',
          }}
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '18px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h1 style={{ color: '#00b894', marginBottom: '1.5rem', fontSize: '2.2rem', fontWeight: '800', display: 'flex', alignItems: 'center' }}>
        <FaBookOpen style={{ marginRight: '15px' }} /> {course.title} Details
      </h1>

      <div style={{ background: '#ffffff', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', padding: '25px', marginBottom: '25px' }}>
        <p style={{ margin: '0 0 20px 0', color: '#555', fontSize: '1.1rem', lineHeight: '1.6' }}>
          <FaInfoCircle style={{ marginRight: '10px', color: '#00b894' }} /> {course.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px', fontSize: '1rem', color: '#444' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#e0ffe0', padding: '10px 15px', borderRadius: '8px' }}>
            <FaUsers style={{ marginRight: '10px', color: '#00b894' }} />
            <strong>Total Mentees:</strong> {course.mentees}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#e0ffe0', padding: '10px 15px', borderRadius: '8px' }}>
            <FaUserGraduate style={{ marginRight: '10px', color: '#00b894' }} />
            <strong>Completed Mentees:</strong> {course.completedMentees}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#e0ffe0', padding: '10px 15px', borderRadius: '8px' }}>
            <FaTasks style={{ marginRight: '10px', color: '#00b894' }} />
            <strong>Completion:</strong> {Math.round((course.completedMentees / course.mentees) * 100) || 0}%
          </div>
          <div style={{ display: 'flex', alignItems: 'center', background: '#e0ffe0', padding: '10px 15px', borderRadius: '8px' }}>
            <FaCalendarAlt style={{ marginRight: '10px', color: '#00b894' }} />
            <strong>Status:</strong> <span style={{ fontWeight: 'bold', color: course.status === 'active' ? '#00b894' : '#646cff' }}>{course.status.toUpperCase()}</span>
          </div>
        </div>

        {/* NEW SECTION: Assignments and Deadlines */}
        <h3 style={{ color: '#00b894', marginTop: '30px', marginBottom: '15px', display: 'flex', alignItems: 'center' }}>
            <FaClipboardList style={{ marginRight: '10px' }} /> Assignments & Deadlines
        </h3>
        {course.assignments && course.assignments.length > 0 ? (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {course.assignments.map((assignment) => (
              <li key={assignment.id} style={{
                marginBottom: '10px',
                padding: '12px 15px',
                background: '#f0fff0', // Light green background
                borderRadius: '8px',
                borderLeft: assignment.status === 'completed' ? '4px solid #00b894' : '4px solid #646cff', // Green for completed, blue for pending
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 5px rgba(0,0,0,0.05)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FaTasks style={{ marginRight: '10px', color: '#00b894' }} />
                  <span style={{ fontWeight: '600', color: '#333' }}>{assignment.title}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem', color: '#555' }}>
                  <FaClock style={{ marginRight: '8px', color: '#646cff' }} />
                  <span>Due: {assignment.dueDate}</span>
                  <span style={{
                      marginLeft: '15px',
                      padding: '4px 8px',
                      borderRadius: '5px',
                      backgroundColor: assignment.status === 'completed' ? '#00b894' : '#646cff',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 'bold',
                      textTransform: 'uppercase'
                  }}>
                    {assignment.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: '#888', fontStyle: 'italic' }}>No assignments listed for this course yet.</p>
        )}

        {/* Previous "Additional Course Information" section, now with more dynamic feel */}
        <h3 style={{ color: '#00b894', marginTop: '30px', marginBottom: '15px' }}>Additional Course Information</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '8px', color: '#666' }}><FaInfoCircle style={{ marginRight: '8px', color: '#646cff' }} /> Monitor mentee progress through individual assignment submissions.</li>
            <li style={{ marginBottom: '8px', color: '#666' }}><FaInfoCircle style={{ marginRight: '8px', color: '#646cff' }} /> Access detailed lesson plans and module breakdowns in the Course Management section.</li>
            <li style={{ marginBottom: '8px', color: '#666' }}><FaInfoCircle style={{ marginRight: '8px', color: '#646cff' }} /> For resource materials, refer to the Resource Library.</li>
        </ul>
      </div>

      <button
        onClick={onBack}
        style={{
          background: 'linear-gradient(45deg, #646cff, #00b894)',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          padding: '12px 25px',
          fontSize: '1rem',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 4px 10px rgba(100,108,255,0.3)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '20px'
        }}
        onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 6px 15px rgba(100,108,255,0.5)'}
        onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 10px rgba(100,108,255,0.3)'}
      >
        <FaArrowLeft /> Back to Dashboard
      </button>
    </div>
  );
};

export default MentorCourseDetails;