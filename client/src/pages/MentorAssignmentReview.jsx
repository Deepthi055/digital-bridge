import React, { useState } from 'react';

const MentorAssignmentReview = () => {
  const initialAssignments = [
    {
      id: 1,
      title: 'Algebra Fundamentals Quiz',
      course: 'Mathematics Basics',
      deadline: '2024-07-25',
      description: 'Quiz covering basic algebra concepts: variables, equations, and inequalities. This assessment determines foundational understanding.',
      submissions: [
        { menteeId: 'alice', menteeName: 'Alice Johnson', submittedDate: '2024-07-20', status: 'Pending Review', submissionContent: 'Alice submitted her answers in a PDF document. Answers for Q1: 5, Q2: x=7, Q3: y<10...', grade: '', feedback: '', submissionPdfUrl: '/sample-pdfs/alice_algebra.pdf' },
        { menteeId: 'bob', menteeName: 'Bob Smith', submittedDate: '2024-07-21', status: 'Submitted', submissionContent: 'Bob submitted a picture of his work.', grade: '', feedback: '', submissionPdfUrl: '/sample-pdfs/bob_algebra.pdf' },
        { menteeId: 'charlie', menteeName: 'Charlie Brown', submittedDate: '2024-07-22', status: 'Reviewed', submissionContent: 'Charlie submitted a Word document.', grade: 'C+', feedback: 'Needs more practice with inequalities.', submissionPdfUrl: '/sample-pdfs/charlie_algebra.pdf' },
      ],
    },
    {
      id: 2,
      title: 'SEO Keyword Research Report',
      course: 'Digital Marketing 101',
      deadline: '2024-07-30',
      description: 'Report on keyword research for a niche market. Identify primary, secondary, and long-tail keywords with search volume and competition analysis.',
      submissions: [
        { menteeId: 'alice', menteeName: 'Alice Johnson', submittedDate: '2024-07-23', status: 'Submitted', submissionContent: 'Alice submitted a Google Docs link.', grade: '', feedback: '', submissionPdfUrl: '/sample-pdfs/alice_seo.pdf' },
        { menteeId: 'diana', menteeName: 'Diana Prince', submittedDate: '2024-07-24', status: 'Reviewed', submissionContent: 'Diana submitted a comprehensive report.', grade: 'A-', feedback: 'Excellent depth in competitor analysis!', submissionPdfUrl: '/sample-pdfs/diana_seo.pdf' },
      ],
    },
    {
      id: 3,
      title: 'Essay on Personal Branding',
      course: 'English Communication',
      deadline: '2024-08-05',
      description: 'Write a 1000-word essay on the importance of personal branding in the digital age. Include strategies for building a strong online presence.',
      submissions: [
        { menteeId: 'eve', menteeName: 'Eve Adams', submittedDate: '2024-07-22', status: 'Pending Review', submissionContent: 'Eve uploaded her essay as a PDF.', grade: '', feedback: '', submissionPdfUrl: '/sample-pdfs/eve_essay.pdf' },
      ],
    },
    {
      id: 4,
      title: 'Geometry Problem Set 1',
      course: 'Mathematics Basics',
      deadline: '2024-07-28',
      description: 'Problem set covering basic geometric shapes, angles, and area calculations. Show all steps for full credit.',
      submissions: [
        { menteeId: 'diana', menteeName: 'Diana Prince', submittedDate: '2024-07-21', status: 'Pending Review', submissionContent: 'Diana uploaded scanned handwritten solutions. Problems 1-5 seem correctly calculated, but problem 6 has an error in area formula.', grade: '', feedback: '', submissionPdfUrl: '/sample-pdfs/diana_geometry.pdf' },
      ],
    },
  ];

  const [assignments, setAssignments] = useState(initialAssignments);
  const [selectedAssignmentForDetails, setSelectedAssignmentForDetails] = useState(null);
  const [editingSubmissionFeedback, setEditingSubmissionFeedback] = useState(null);
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [currentGrade, setCurrentGrade] = useState('');

  const isMobile = window.innerWidth < 768;

  const handleViewDetailsClick = (assignment) => {
    setSelectedAssignmentForDetails(assignment);
    setEditingSubmissionFeedback(null);
  };

  const handleCloseAssignmentDetails = () => {
    setSelectedAssignmentForDetails(null);
    setEditingSubmissionFeedback(null);
  };

  const handleProvideFeedback = (assignmentId, menteeId, existingGrade, existingFeedback) => {
    setEditingSubmissionFeedback({ assignmentId, menteeId });
    setCurrentGrade(existingGrade || '');
    setCurrentFeedback(existingFeedback || '');
  };

  const handleSaveSubmissionFeedback = () => {
    setAssignments(prevAssignments => {
      return prevAssignments.map(assignment => {
        if (assignment.id === editingSubmissionFeedback.assignmentId) {
          return {
            ...assignment,
            submissions: assignment.submissions.map(submission => {
              if (submission.menteeId === editingSubmissionFeedback.menteeId) {
                return {
                  ...submission,
                  grade: currentGrade,
                  feedback: currentFeedback,
                  status: 'Reviewed',
                };
              }
              return submission;
            }),
          };
        }
        return assignment;
      });
    });
    // After saving, update the selectedAssignmentForDetails to reflect changes immediately
    if (selectedAssignmentForDetails && selectedAssignmentForDetails.id === editingSubmissionFeedback.assignmentId) {
        // Find the updated assignment from the new assignments state
        const updatedAssignment = initialAssignments.find(a => a.id === editingSubmissionFeedback.assignmentId);
        // Deep copy the updated assignment and its submissions to ensure React detects state change
        const updatedAssignmentDeepCopy = {
            ...updatedAssignment,
            submissions: updatedAssignment.submissions.map(sub => {
                if (sub.menteeId === editingSubmissionFeedback.menteeId) {
                    return { ...sub, grade: currentGrade, feedback: currentFeedback, status: 'Reviewed' };
                }
                return { ...sub };
            })
        };
        setSelectedAssignmentForDetails(updatedAssignmentDeepCopy);
    }
    setEditingSubmissionFeedback(null);
    setCurrentGrade('');
    setCurrentFeedback('');
  };

  const handleCancelSubmissionFeedback = () => {
    setEditingSubmissionFeedback(null);
    setCurrentGrade('');
    setCurrentFeedback('');
  };

  // Handler for viewing PDF submission
  const handleViewPdfSubmission = (pdfUrl) => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank'); // Opens the PDF in a new tab
    } else {
      alert('No PDF submission available for this assignment.');
    }
  };

  // Base style for assignment cards (for the main list)
  const assignmentCardBaseStyle = {
    background: '#f8f8f8',
    borderRadius: 12,
    padding: '15px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    textAlign: 'left',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
    minHeight: '200px', // Consistent height for list cards
  };

  const assignmentCardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    cursor: 'pointer',
  };

  if (selectedAssignmentForDetails) {
    // --- Dedicated Assignment Details "Page" ---
    return (
      <div style={{ padding: '20px', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,184,148,0.1)' }}>
        <h2 style={{ color: '#00b894', fontWeight: 800, fontSize: isMobile ? '1.2rem' : '1.5rem', marginBottom: 20, textAlign: 'center' }}>
          {selectedAssignmentForDetails.title} Details
        </h2>
        <div style={{ background: '#f8f8f8', borderRadius: 12, padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
          <p style={{ color: '#555', fontSize: '1.1em', marginBottom: '8px' }}>Course: {selectedAssignmentForDetails.course}</p>
          <p style={{ color: '#555', fontSize: '1.1em', marginBottom: '8px' }}>Description: {selectedAssignmentForDetails.description}</p>
          <p style={{ color: '#d63031', fontWeight: 'bold', fontSize: '1.1em', marginBottom: '15px' }}>Deadline: {selectedAssignmentForDetails.deadline}</p>
          <button
            onClick={handleCloseAssignmentDetails}
            style={{
              background: '#646cff',
              color: '#fff',
              border: 'none',
              borderRadius: 6,
              padding: '8px 15px',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              marginBottom: '20px',
            }}
          >
            Back to Assignments
          </button>
        </div>

        <h3 style={{ color: '#00b894', marginBottom: '15px' }}>Submissions ({selectedAssignmentForDetails.submissions.length})</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {selectedAssignmentForDetails.submissions.map(submission => (
            <div
              key={submission.menteeId}
              style={{
                background: '#fff',
                borderRadius: 12,
                padding: '15px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                border: '1px solid #eee',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                textAlign: 'left',
                minHeight: '220px', // Min height for submission cards
              }}
            >
              {editingSubmissionFeedback &&
              editingSubmissionFeedback.assignmentId === selectedAssignmentForDetails.id &&
              editingSubmissionFeedback.menteeId === submission.menteeId ? (
                // Feedback Edit Form for this specific submission
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <h4 style={{ color: '#333', marginBottom: '5px' }}>Feedback for {submission.menteeName}</h4>
                  <label style={{ textAlign: 'left', color: '#555', fontSize: '0.9em' }}>Grade:</label>
                  <input
                    type="text"
                    value={currentGrade}
                    onChange={(e) => setCurrentGrade(e.target.value)}
                    style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: 'calc(100% - 18px)' }}
                  />
                  <label style={{ textAlign: 'left', color: '#555', fontSize: '0.9em' }}>Feedback:</label>
                  <textarea
                    value={currentFeedback}
                    onChange={(e) => setCurrentFeedback(e.target.value)}
                    rows="4"
                    style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: 'calc(100% - 18px)' }}
                  ></textarea>
                  <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '10px', gap: '10px' }}>
                    <button
                      onClick={handleSaveSubmissionFeedback}
                      style={{
                        background: '#00b894',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '8px 15px',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Send {/* Changed "Save" to "Send" here */}
                    </button>
                    <button
                      onClick={handleCancelSubmissionFeedback}
                      style={{
                        background: '#e0e0e0',
                        color: '#555',
                        border: 'none',
                        borderRadius: 6,
                        padding: '8px 15px',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                // Submission Details Display
                <>
                  <h4 style={{ color: '#333', marginBottom: '5px' }}>{submission.menteeName}</h4>
                  <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '3px' }}>Status: <span style={{ fontWeight: 'bold', color: submission.status === 'Pending Review' ? '#d63031' : '#00b894' }}>{submission.status}</span></p>
                  <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '3px' }}>Submitted: {submission.submittedDate}</p>
                  <p style={{ color: '#666', fontSize: '0.9em', marginBottom: '8px' }}>Content: {submission.submissionContent.substring(0, 100)}...</p>
                  {submission.grade && <p style={{ color: '#555', fontSize: '0.9em', marginBottom: '3px' }}>Grade: {submission.grade}</p>}
                  {submission.feedback && <p style={{ color: '#555', fontSize: '0.9em', marginBottom: '8px' }}>Feedback: {submission.feedback}</p>}

                  <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: 'auto', gap: '10px' }}>
                    <button
                      onClick={() => handleViewPdfSubmission(submission.submissionPdfUrl)} // Call the new handler
                      style={{
                        flex: 1,
                        background: '#646cff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '8px 12px',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      View Submission
                    </button>
                    <button
                      onClick={() => handleProvideFeedback(selectedAssignmentForDetails.id, submission.menteeId, submission.grade, submission.feedback)}
                      style={{
                        flex: 1,
                        background: '#00b894',
                        color: '#fff',
                        border: 'none',
                        borderRadius: 6,
                        padding: '8px 12px',
                        fontSize: 14,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      {submission.status === 'Reviewed' ? 'Edit Feedback' : 'Give Feedback'}
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // --- Main Assignment List View ---
  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,184,148,0.1)' }}>
      <h2 style={{ color: '#00b894', fontWeight: 800, fontSize: isMobile ? '1.2rem' : '1.5rem', marginBottom: 20, textAlign: 'center' }}>Assignment Review</h2>

      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="Search by mentee, course, or assignment..."
          style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ddd', flex: isMobile ? '100%' : '1' }}
        />
        <select style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <option>All</option>
          <option>Pending Review</option>
          <option>Reviewed</option>
          <option>Graded</option>
        </select>
        <select style={{ padding: '8px', borderRadius: '8px', border: '1px solid #ddd' }}>
          <option>All</option>
          <option>Mathematics Basics</option>
          <option>Digital Marketing 101</option>
          <option>English Communication</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
        {assignments.map(assignment => (
          <div
            key={assignment.id}
            style={assignmentCardBaseStyle}
            onMouseEnter={(e) => {
              // Only apply hover if not viewing/editing any assignment
              if (selectedAssignmentForDetails === null && editingSubmissionFeedback === null) {
                e.currentTarget.style.transform = assignmentCardHoverStyle.transform;
                e.currentTarget.style.boxShadow = assignmentCardHoverStyle.boxShadow;
              }
            }}
            onMouseLeave={(e) => {
              if (selectedAssignmentForDetails === null && editingSubmissionFeedback === null) {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = assignmentCardBaseStyle.boxShadow;
              }
            }}
          >
            <h3 style={{ color: '#333', fontSize: '1.1rem', marginBottom: '5px', alignSelf: 'stretch' }}>{assignment.title}</h3>
            <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '3px', alignSelf: 'stretch' }}>Course: {assignment.course}</p>
            <p style={{ color: '#d63031', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '10px', alignSelf: 'stretch' }}>Deadline: {assignment.deadline}</p>
            <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '15px', alignSelf: 'stretch' }}>Submissions: {assignment.submissions.length}</p>

            <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: 'auto', gap: '10px' }}>
              <button
                onClick={() => handleViewDetailsClick(assignment)}
                style={{
                  flex: 1,
                  background: '#646cff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 12px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(100,108,255,0.2)',
                  transition: 'background 0.3s ease',
                }}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorAssignmentReview;