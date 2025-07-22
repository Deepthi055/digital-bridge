// client/src/pages/MentorAssignmentReview.jsx

import React, { useState } from 'react';
import { FaGraduationCap, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaEye, FaEdit, FaSearch } from 'react-icons/fa';

// Mock data for assignments
const mockAssignments = [
  {
    id: 1,
    menteeName: 'Alice Johnson',
    course: 'Mathematics Basics',
    assignmentTitle: 'Algebra Fundamentals Quiz',
    submissionDate: '2024-07-20',
    status: 'Pending Review',
    grade: null,
    feedback: null,
  },
  {
    id: 2,
    menteeName: 'Bob Smith',
    course: 'Digital Marketing 101',
    assignmentTitle: 'SEO Keyword Research Report',
    submissionDate: '2024-07-19',
    status: 'Reviewed',
    grade: 'A-',
    feedback: 'Good research, consider more long-tail keywords.',
  },
  {
    id: 3,
    menteeName: 'Charlie Brown',
    course: 'English Communication',
    assignmentTitle: 'Essay on Personal Branding',
    submissionDate: '2024-07-18',
    status: 'Graded',
    grade: 'B+',
    feedback: 'Well-structured, needs more persuasive language.',
  },
  {
    id: 4,
    menteeName: 'Diana Prince',
    course: 'Mathematics Basics',
    assignmentTitle: 'Geometry Problem Set 1',
    submissionDate: '2024-07-21',
    status: 'Pending Review',
    grade: null,
    feedback: null,
  },
  {
    id: 5,
    menteeName: 'Eve Adams',
    course: 'Digital Marketing 101',
    assignmentTitle: 'Social Media Campaign Plan',
    submissionDate: '2024-07-15',
    status: 'Pending Review',
    grade: null,
    feedback: null,
  },
  {
    id: 6,
    menteeName: 'Frank White',
    course: 'Introduction to Python Programming',
    assignmentTitle: 'Python Functions Exercise',
    submissionDate: '2024-07-10',
    status: 'Graded',
    grade: 'A',
    feedback: 'Excellent work, clear and concise code.',
  },
];

const MentorAssignmentReview = () => {
  const [assignments, setAssignments] = useState(mockAssignments);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCourse, setFilterCourse] = useState('All');

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending Review':
        return <FaHourglassHalf color="#ffaa00" />; // Orange
      case 'Reviewed':
        return <FaCheckCircle color="#646cff" />; // Blue
      case 'Graded':
        return <FaGraduationCap color="#00b894" />; // Green
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending Review':
        return '#ffaa00';
      case 'Reviewed':
        return '#646cff';
      case 'Graded':
        return '#00b894';
      default:
        return '#888';
    }
  };

  const filteredAssignments = assignments
    .filter(assignment =>
      assignment.menteeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      assignment.assignmentTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(assignment => filterStatus === 'All' || assignment.status === filterStatus)
    .filter(assignment => filterCourse === 'All' || assignment.course === filterCourse);

  const allStatuses = ['All', ...new Set(mockAssignments.map(a => a.status))];
  const allCourses = ['All', ...new Set(mockAssignments.map(a => a.course))];

  const handleViewSubmission = (id) => {
    alert(`Viewing submission for assignment ID: ${id}`);
    // In a real app, this would open a modal or new page with the submission
  };

  const handleProvideFeedback = (id) => {
    alert(`Providing feedback for assignment ID: ${id}`);
    // In a real app, this would open a form to input grade and feedback
  };

  return (
    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '18px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h1 style={{ color: '#00b894', marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '800' }}>
        <FaGraduationCap style={{ marginRight: '10px' }} />Assignment Review
      </h1>

      {/* Filter and Search Controls */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by mentee, course, or assignment..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1 1 280px',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1rem',
          }}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{
            flex: '0 0 auto',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            minWidth: '150px',
          }}
        >
          {allStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          style={{
            flex: '0 0 auto',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            minWidth: '180px',
          }}
        >
          {allCourses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </div>

      {/* Assignments List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '25px' }}>
        {filteredAssignments.length === 0 ? (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#666', fontSize: '1.1rem', padding: '20px' }}>
            No assignments found matching your criteria.
          </div>
        ) : (
          filteredAssignments.map(assignment => (
            <div
              key={assignment.id}
              style={{
                background: '#ffffff',
                borderRadius: '15px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: `5px solid ${getStatusColor(assignment.status)}`,
                transition: 'transform 0.2s ease-in-out',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <h3 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '1.3rem' }}>{assignment.assignmentTitle}</h3>
                <p style={{ margin: '0 0 5px 0', color: '#555', fontSize: '0.95rem' }}>
                  <span style={{ fontWeight: 'bold' }}>Mentee:</span> {assignment.menteeName}
                </p>
                <p style={{ margin: '0 0 10px 0', color: '#555', fontSize: '0.95rem' }}>
                  <span style={{ fontWeight: 'bold' }}>Course:</span> {assignment.course}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', color: '#666', marginBottom: '10px' }}>
                  <span style={{ fontWeight: 'bold' }}>Status:</span>
                  <span style={{ color: getStatusColor(assignment.status), fontWeight: '600' }}>
                    {getStatusIcon(assignment.status)} {assignment.status}
                  </span>
                </div>
                {assignment.grade && (
                  <p style={{ margin: '0 0 5px 0', color: '#555', fontSize: '0.9rem' }}>
                    <span style={{ fontWeight: 'bold' }}>Grade:</span> {assignment.grade}
                  </p>
                )}
                {assignment.feedback && (
                  <p style={{ margin: '0 0 5px 0', color: '#555', fontSize: '0.9rem', fontStyle: 'italic' }}>
                    "{assignment.feedback}"
                  </p>
                )}
                <p style={{ margin: '0', color: '#888', fontSize: '0.85rem' }}>
                  Submitted: {assignment.submissionDate}
                </p>
              </div>

              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <button
                  onClick={() => handleViewSubmission(assignment.id)}
                  style={{
                    padding: '8px 15px',
                    background: '#646cff', // Blue for view
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(100,108,255,0.2)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(100,108,255,0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(100,108,255,0.2)'}
                >
                  <FaEye /> View
                </button>
                {assignment.status !== 'Graded' && (
                  <button
                    onClick={() => handleProvideFeedback(assignment.id)}
                    style={{
                      padding: '8px 15px',
                      background: 'linear-gradient(45deg, #00b894, #00997e)', // Green gradient for feedback
                      color: '#fff',
                      border: 'none',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,184,148,0.2)',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,184,148,0.4)'}
                    onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,184,148,0.2)'}
                  >
                    <FaEdit /> Feedback
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MentorAssignmentReview;