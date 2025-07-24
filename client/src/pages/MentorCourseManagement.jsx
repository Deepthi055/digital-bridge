import React, { useState } from 'react';
import { FaChalkboardTeacher, FaLaptopCode, FaBookOpen, FaPalette } from "react-icons/fa";

const MentorCourseManagement = () => {
  const initialCourses = [
    {
      id: 1,
      title: 'Mathematics Basics',
      mentees: 12,
      completedMentees: 8,
      icon: <FaChalkboardTeacher size={32} color="#00b894" />,
      status: 'active',
      description: 'Comprehensive course covering fundamental mathematical concepts from algebra to geometry, designed to build a strong foundation for advanced studies. Includes interactive lessons, practice problems, and quizzes.',
      startDate: '2024-03-01',
      endDate: '2024-12-31',
      level: 'Beginner',
    },
    {
      id: 2,
      title: 'Digital Marketing 101',
      mentees: 10,
      completedMentees: 2,
      icon: <FaLaptopCode size={32} color="#00b894" />,
      status: 'active',
      description: 'An introductory guide to digital marketing strategies, SEO, social media campaigns, and email marketing. Learn to create effective online presence and drive engagement.',
      startDate: '2024-06-01',
      endDate: '2025-05-31',
      level: 'Intermediate',
    },
    {
      id: 3,
      title: 'English Communication',
      mentees: 15,
      completedMentees: 15,
      icon: <FaBookOpen size={30} color="#00b894" />,
      status: 'completed',
      description: 'Improve your spoken and written English skills for professional and personal growth. Focuses on grammar, vocabulary, public speaking, and effective writing techniques.',
      startDate: '2023-11-15',
      endDate: '2024-02-28',
      level: 'Intermediate',
    },
    {
      id: 4,
      title: 'Introduction to Programming',
      mentees: 8,
      completedMentees: 3,
      icon: <FaLaptopCode size={32} color="#00b894" />,
      status: 'active',
      description: 'A beginner-friendly course covering fundamental programming concepts using Python. Includes basic syntax, data structures, and algorithmic thinking.',
      startDate: '2025-01-10',
      endDate: '2025-08-30',
      level: 'Beginner',
    },
    {
      id: 5,
      title: 'Graphic Design Fundamentals',
      mentees: 7,
      completedMentees: 7,
      icon: <FaPalette size={30} color="#00b894" />,
      status: 'completed',
      description: 'Explore the principles of graphic design, including color theory, typography, and layout. Hands-on projects using popular design software.',
      startDate: '2024-05-01',
      endDate: '2024-07-31',
      level: 'Beginner',
    },
  ];

  const [courses, setCourses] = useState(initialCourses);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editedCourseData, setEditedCourseData] = useState(null);

  const isMobile = window.innerWidth < 768;

  const handleEditClick = (course) => {
    setEditingCourseId(course.id);
    setEditedCourseData({ ...course });
  };

  const handleSaveClick = () => {
    setCourses(prevCourses =>
      prevCourses.map(course =>
        course.id === editedCourseData.id ? editedCourseData : course
      )
    );
    setEditingCourseId(null);
    setEditedCourseData(null);
  };

  const handleCancelClick = () => {
    setEditingCourseId(null);
    setEditedCourseData(null);
  };

  const handleDeleteClick = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course? This action cannot be undone.')) {
      setCourses(prevCourses => prevCourses.filter(course => course.id !== courseId));
      if (editingCourseId === courseId) {
        setEditingCourseId(null);
        setEditedCourseData(null);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCourseData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Base style for course cards
  const courseCardBaseStyle = {
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
    // Added a min-height to ensure consistent card size when not editing
    minHeight: '300px', // Adjust this value as needed based on your content
  };

  const courseCardHoverStyle = {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    cursor: 'pointer',
  };

  return (
    <div style={{ padding: '20px', background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,184,148,0.1)' }}>
      <h2 style={{ color: '#00b894', fontWeight: 800, fontSize: isMobile ? '1.2rem' : '1.5rem', marginBottom: 20, textAlign: 'center' }}>Course Management</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
        {courses.map(course => (
          <div
            key={course.id}
            style={courseCardBaseStyle}
            onMouseEnter={(e) => {
              // Only apply hover effect if no course is currently in edit mode
              if (editingCourseId === null) {
                e.currentTarget.style.transform = courseCardHoverStyle.transform;
                e.currentTarget.style.boxShadow = courseCardHoverStyle.boxShadow;
              }
            }}
            onMouseLeave={(e) => {
              // Only apply hover effect if no course is currently in edit mode
              if (editingCourseId === null) {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = courseCardBaseStyle.boxShadow;
              }
            }}
          >
            {editingCourseId === course.id ? (
              // Edit Mode Form for the selected course
              <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <label style={{ textAlign: 'left', color: '#555', fontSize: '0.9em' }}>Title:</label>
                <input
                  type="text"
                  name="title"
                  value={editedCourseData.title}
                  onChange={handleInputChange}
                  style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: 'calc(100% - 18px)' }}
                />
                <label style={{ textAlign: 'left', color: '#555', fontSize: '0.9em' }}>Description:</label>
                <textarea
                  name="description"
                  value={editedCourseData.description}
                  onChange={handleInputChange}
                  rows="3"
                  style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: 'calc(100% - 18px)' }}
                />
                <label style={{ textAlign: 'left', color: '#555', fontSize: '0.9em' }}>Mentees:</label>
                <input
                  type="number"
                  name="mentees"
                  value={editedCourseData.mentees}
                  onChange={handleInputChange}
                  style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: 'calc(100% - 18px)' }}
                />
                <label style={{ textAlign: 'left', color: '#555', fontSize: '0.9em' }}>Completed:</label>
                <input
                  type="number"
                  name="completedMentees"
                  value={editedCourseData.completedMentees}
                  onChange={handleInputChange}
                  style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: 'calc(100% - 18px)' }}
                />
                <label style={{ textAlign: 'left', color: '#555', fontSize: '0.9em' }}>Status:</label>
                <select
                  name="status"
                  value={editedCourseData.status}
                  onChange={handleInputChange}
                  style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '100%' }}
                >
                  <option value="active">Active</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
                <label style={{ textAlign: 'left', color: '#555', fontSize: '0.9em' }}>Start Date:</label>
                <input
                  type="date"
                  name="startDate"
                  value={editedCourseData.startDate}
                  onChange={handleInputChange}
                  style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: 'calc(100% - 18px)' }}
                />
                <label style={{ textAlign: 'left', color: '#555', fontSize: '0.9em' }}>End Date:</label>
                <input
                  type="date"
                  name="endDate"
                  value={editedCourseData.endDate}
                  onChange={handleInputChange}
                  style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: 'calc(100% - 18px)' }}
                />
                <label style={{ textAlign: 'left', color: '#555', fontSize: '0.9em' }}>Level:</label>
                <input
                  type="text"
                  name="level"
                  value={editedCourseData.level}
                  onChange={handleInputChange}
                  style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: 'calc(100% - 18px)' }}
                />

                <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '15px', flexWrap: 'wrap', gap: '10px' }}>
                  <button
                    onClick={handleSaveClick}
                    style={{
                      background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '8px 15px',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,184,148,0.2)',
                      transition: 'background 0.3s ease',
                    }}
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelClick}
                    style={{
                      background: '#e0e0e0',
                      color: '#555',
                      border: 'none',
                      borderRadius: 6,
                      padding: '8px 15px',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'background 0.3s ease',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDeleteClick(course.id)}
                    style={{
                      background: '#ff6b6b',
                      color: '#fff',
                      border: 'none',
                      borderRadius: 6,
                      padding: '8px 15px',
                      fontSize: 14,
                      fontWeight: 600,
                      cursor: 'pointer',
                      boxShadow: '0 2px 8px rgba(255,107,107,0.2)',
                      transition: 'background 0.3s ease',
                    }}
                  >
                    Delete Course
                  </button>
                </div>
              </div>
            ) : (
              // Display Mode - Only show if *this* course is not being edited
              <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
                <div> {/* Container for top content to ensure consistent spacing */}
                  <span style={{ fontSize: 38, marginBottom: 10 }}>{course.icon}</span>
                  <h3 style={{ color: '#333', fontSize: '1.2rem', marginBottom: '5px' }}>{course.title}</h3>
                  <p style={{ color: '#666', fontSize: '0.9rem', marginBottom: '5px' }}>{course.description.substring(0, 70)}...</p>
                  <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '5px' }}>Mentees: {course.mentees} ({course.completedMentees} completed)</p>
                  <p style={{ color: '#888', fontSize: '0.8rem', marginBottom: '10px' }}>Status: {course.status}</p>
                </div>

                {/* Conditionally render buttons only if no course is currently being edited */}
                {editingCourseId === null && (
                  <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: 'auto', gap: '8px' }}>
                      <button
                          onClick={() => handleEditClick(course)}
                          style={{
                              flex: 1,
                              background: '#646cff',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 6,
                              padding: '8px 10px',
                              fontSize: 14,
                              fontWeight: 600,
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(100,108,255,0.2)',
                              transition: 'background 0.3s ease',
                          }}
                      >
                          Edit
                      </button>
                      <button
                          onClick={() => handleDeleteClick(course.id)}
                          style={{
                              flex: 1,
                              background: '#ff6b6b',
                              color: '#fff',
                              border: 'none',
                              borderRadius: 6,
                              padding: '8px 10px',
                              fontSize: 14,
                              fontWeight: 600,
                              cursor: 'pointer',
                              boxShadow: '0 2px 8px rgba(255,107,107,0.2)',
                              transition: 'background 0.3s ease',
                          }}
                      >
                          Delete
                      </button>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorCourseManagement;