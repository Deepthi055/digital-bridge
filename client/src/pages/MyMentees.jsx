import React from 'react';

const MyMentees = () => {
  // Enhanced mock data for mentees with more details
  const mentees = [
    {
      id: 1,
      name: 'Alice Johnson',
      course: 'Mathematics Basics',
      progress: 75,
      lastActivity: '2 days ago',
      email: 'alice.j@example.com',
      phone: '123-456-7890',
      enrollmentDate: '2024-03-10',
      bio: 'Alice is a dedicated student focusing on strengthening her mathematical foundations for a career in engineering. She is highly motivated and actively participates in discussions.',
      recentAssignments: [
        { id: 101, title: 'Algebra Worksheet 3', status: 'Pending Review' },
        { id: 102, title: 'Geometry Project', status: 'Submitted' },
      ],
      joiningDate: '2024-03-01',
      takenCourses: ['Mathematics Basics', 'Introduction to Physics'],
      interestingSubjects: ['Calculus', 'Linear Algebra', 'Problem Solving'],
      hobbies: ['Reading', 'Chess', 'Hiking'],
      attendanceStatus: { total: 20, attended: 18, percentage: 90 }
    },
    {
      id: 2,
      name: 'Bob Smith',
      course: 'Digital Marketing 101',
      progress: 40,
      lastActivity: '1 hour ago',
      email: 'bob.s@example.com',
      phone: '098-765-4321',
      enrollmentDate: '2024-06-01',
      bio: 'Bob is keen on exploring digital marketing trends and building an online presence. He is currently working on his first SEO project and is eager for feedback.',
      recentAssignments: [
        { id: 201, title: 'SEO Keyword Research', status: 'Pending' },
      ],
      joiningDate: '2024-05-28',
      takenCourses: ['Digital Marketing 101', 'Content Creation Basics'],
      interestingSubjects: ['SEO', 'Social Media Marketing', 'Analytics'],
      hobbies: ['Photography', 'Blogging', 'Gaming'],
      attendanceStatus: { total: 10, attended: 7, percentage: 70 }
    },
    {
      id: 3,
      name: 'Charlie Brown',
      course: 'English Communication',
      progress: 100,
      lastActivity: '5 days ago',
      email: 'charlie.b@example.com',
      phone: '555-123-4567',
      enrollmentDate: '2023-11-15',
      bio: 'Charlie has successfully completed the English Communication course, demonstrating excellent public speaking and writing skills. He is now considering advanced courses.',
      recentAssignments: [
        { id: 301, title: 'Final Essay Submission', status: 'Completed' },
      ],
      joiningDate: '2023-11-10',
      takenCourses: ['English Communication', 'Creative Writing'],
      interestingSubjects: ['Literature', 'Public Speaking', 'Journalism'],
      hobbies: ['Writing', 'Debate', 'Playing Guitar'],
      attendanceStatus: { total: 25, attended: 25, percentage: 100 }
    },
    {
      id: 4,
      name: 'Diana Prince',
      course: 'Mathematics Basics',
      progress: 60,
      lastActivity: '4 days ago',
      email: 'diana.p@example.com',
      phone: '111-222-3333',
      enrollmentDate: '2024-04-20',
      bio: 'Diana is progressing steadily in mathematics, particularly enjoying the problem-solving aspects. She occasionally requires clarification on complex topics.',
      recentAssignments: [
        { id: 103, title: 'Calculus Intro Quiz', status: 'Graded' },
      ],
      joiningDate: '2024-04-18',
      takenCourses: ['Mathematics Basics', 'Data Science Fundamentals'],
      interestingSubjects: ['Statistics', 'Data Analysis', 'Algorithms'],
      hobbies: ['Running', 'Cooking', 'Gardening'],
      attendanceStatus: { total: 15, attended: 12, percentage: 80 }
    },
    {
      id: 5,
      name: 'Eve Adams',
      course: 'Digital Marketing 101',
      progress: 30,
      lastActivity: '2 days ago',
      email: 'eve.a@example.com',
      phone: '999-888-7777',
      enrollmentDate: '2024-07-05',
      bio: 'Eve is just starting her journey in digital marketing. She is eager to learn and has a strong interest in social media analytics.',
      recentAssignments: [
        { id: 202, title: 'Digital Marketing Intro Quiz', status: 'Pending' },
      ],
      joiningDate: '2024-07-01',
      takenCourses: ['Digital Marketing 101'],
      interestingSubjects: ['Social Media Analytics', 'Copywriting', 'Branding'],
      hobbies: ['Drawing', 'Volunteering', 'Listening to Podcasts'],
      attendanceStatus: { total: 5, attended: 4, percentage: 80 }
    },
  ];

  const [selectedMentee, setSelectedMentee] = React.useState(null);

  const handleViewProfile = (mentee) => {
    setSelectedMentee(mentee);
  };

  const handleCloseProfile = () => {
    setSelectedMentee(null);
  };

  const menteeCardBaseStyle = {
    background: '#f8f8f8',
    borderRadius: 12,
    padding: '15px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    border: '1px solid #eee',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  };

  const menteeCardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    cursor: 'pointer',
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,184,148,0.1)' }}>
      <h2 style={{ color: '#00b894', fontWeight: 800, fontSize: isMobile ? '1.2rem' : '1.5rem', marginBottom: 20, textAlign: 'center' }}>My Mentees</h2>

      {selectedMentee ? (
        // Mentee Profile Details View
        <div style={{
          background: '#f0fbf8',
          borderRadius: 16,
          padding: '30px',
          boxShadow: '0 4px 20px rgba(0,184,148,0.15)',
          maxWidth: '800px',
          margin: '0 auto',
          position: 'relative',
        }}>
          <button
            onClick={handleCloseProfile}
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'none',
              border: 'none',
              fontSize: '1.8rem',
              cursor: 'pointer',
              color: '#555',
            }}
          >
            &times;
          </button>
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <img
              src={`https://api.dicebear.com/7.x/personas/svg?seed=${selectedMentee.name}`}
              alt={selectedMentee.name}
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #00b894', marginBottom: '15px' }}
            />
            <h3 style={{ color: '#00b894', fontSize: '2rem', marginBottom: '8px' }}>{selectedMentee.name}</h3>
            <p style={{ color: '#666', fontSize: '1.1rem' }}>Enrolled in: <span style={{ fontWeight: 'bold' }}>{selectedMentee.course}</span></p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
            <div style={{ background: '#e6ffe6', padding: '15px', borderRadius: '10px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#008c72', marginBottom: '10px' }}>Contact Information</h4>
              <p style={{ margin: '5px 0' }}><strong>Email:</strong> {selectedMentee.email}</p>
              <p style={{ margin: '5px 0' }}><strong>Phone:</strong> {selectedMentee.phone}</p>
              <p style={{ margin: '5px 0' }}><strong>Joining Date:</strong> {selectedMentee.joiningDate}</p>
            </div>
            <div style={{ background: '#e6ffe6', padding: '15px', borderRadius: '10px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}>
              <h4 style={{ color: '#008c72', marginBottom: '10px' }}>Course Progress</h4>
              <p style={{ margin: '5px 0' }}><strong>Current Progress:</strong> {selectedMentee.progress}%</p>
              <div style={{ width: '100%', height: 10, background: '#ddd', borderRadius: 5, overflow: 'hidden', marginTop: '5px' }}>
                <div style={{ width: `${selectedMentee.progress}%`, height: '100%', background: 'linear-gradient(90deg, #00b894, #646cff)', borderRadius: 5 }}></div>
              </div>
              <p style={{ margin: '5px 0', fontSize: '0.9em', color: '#777' }}>Last Activity: {selectedMentee.lastActivity}</p>
              <p style={{ margin: '5px 0' }}><strong>Attendance:</strong> {selectedMentee.attendanceStatus.attended} / {selectedMentee.attendanceStatus.total} ({selectedMentee.attendanceStatus.percentage}%)</p>
            </div>
          </div>

          <div style={{ background: '#e6ffe6', padding: '15px', borderRadius: '10px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
            <h4 style={{ color: '#008c72', marginBottom: '10px' }}>Bio</h4>
            <p style={{ lineHeight: '1.6', color: '#444' }}>{selectedMentee.bio}</p>
          </div>

          <div style={{ background: '#e6ffe6', padding: '15px', borderRadius: '10px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
            <h4 style={{ color: '#008c72', marginBottom: '10px' }}>Courses Taken</h4>
            {selectedMentee.takenCourses && selectedMentee.takenCourses.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {selectedMentee.takenCourses.map((course, index) => (
                  <li key={index} style={{ padding: '4px 0', color: '#444' }}>&bull; {course}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#777', fontStyle: 'italic' }}>No courses listed.</p>
            )}
          </div>

          <div style={{ background: '#e6ffe6', padding: '15px', borderRadius: '10px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)', marginBottom: '20px' }}>
            <h4 style={{ color: '#008c72', marginBottom: '10px' }}>Interesting Subjects</h4>
            {selectedMentee.interestingSubjects && selectedMentee.interestingSubjects.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedMentee.interestingSubjects.map((subject, index) => (
                  <li key={index} style={{ background: '#d4edda', color: '#155724', padding: '5px 10px', borderRadius: '5px', fontSize: '0.9em' }}>{subject}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#777', fontStyle: 'italic' }}>No subjects listed.</p>
            )}
          </div>

          <div style={{ background: '#e6ffe6', padding: '15px', borderRadius: '10px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)' }}>
            <h4 style={{ color: '#008c72', marginBottom: '10px' }}>Hobbies</h4>
            {selectedMentee.hobbies && selectedMentee.hobbies.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedMentee.hobbies.map((hobby, index) => (
                  <li key={index} style={{ background: '#d1ecf1', color: '#0c5460', padding: '5px 10px', borderRadius: '5px', fontSize: '0.9em' }}>{hobby}</li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#777', fontStyle: 'italic' }}>No hobbies listed.</p>
            )}
          </div>

          <div style={{ background: '#e6ffe6', padding: '15px', borderRadius: '10px', boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)', marginTop: '20px' }}>
            <h4 style={{ color: '#008c72', marginBottom: '10px' }}>Recent Assignments</h4>
            {selectedMentee.recentAssignments && selectedMentee.recentAssignments.length > 0 ? (
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {selectedMentee.recentAssignments.map(assignment => (
                  <li key={assignment.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 0',
                    borderBottom: '1px solid #eee',
                    color: '#444',
                    fontSize: '0.95rem',
                  }}>
                    <span>{assignment.title}</span>
                    <span style={{
                      fontWeight: 'bold',
                      color: assignment.status === 'Completed' ? '#00b894' :
                             assignment.status === 'Submitted' ? '#646cff' : '#ff9800'
                    }}>{assignment.status}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p style={{ color: '#777', fontStyle: 'italic' }}>No recent assignments.</p>
            )}
          </div>
        </div>
      ) : (
        // List of Mentee Cards
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {mentees.map(mentee => (
            <div
              key={mentee.id}
              style={menteeCardBaseStyle}
              onMouseEnter={(e) => { e.currentTarget.style.transform = menteeCardHoverStyle.transform; e.currentTarget.style.boxShadow = menteeCardHoverStyle.boxShadow; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = menteeCardBaseStyle.boxShadow; }}
            >
              <img
                src={`https://api.dicebear.com/7.x/personas/svg?seed=${mentee.name}`}
                alt={mentee.name}
                style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginBottom: '10px', border: '3px solid #00b894' }}
              />
              <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '5px' }}>{mentee.name}</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>{mentee.course}</p>
              <div style={{ width: '100%', padding: '0 15px' }}>
                <div style={{ height: 8, background: '#eee', borderRadius: 4, overflow: 'hidden', marginBottom: '5px' }}>
                  <div style={{ width: `${mentee.progress}%`, height: '100%', background: 'linear-gradient(90deg, #00b894, #646cff)', borderRadius: 4 }}></div>
                </div>
                <p style={{ color: '#00b894', fontSize: '0.85rem', marginBottom: '10px' }}>Progress: {mentee.progress}%</p>
              </div>
              <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '15px' }}>Last Activity: {mentee.lastActivity}</p>
              <button
                onClick={() => handleViewProfile(mentee)}
                style={{
                  background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 6,
                  padding: '8px 18px',
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(0,184,148,0.2)',
                  transition: 'background 0.3s ease',
                }}
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyMentees;