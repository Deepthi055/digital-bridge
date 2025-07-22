import React, { useState } from 'react';
import { FaPlusCircle, FaEdit, FaTrash, FaChalkboardTeacher, FaBookOpen, FaUsers, FaArrowRight } from 'react-icons/fa';

// Mock data for courses a mentor manages
const mockManagedCourses = [
  {
    id: 1,
    title: 'Mathematics Basics',
    description: 'Comprehensive course covering fundamental mathematical concepts from algebra to geometry.',
    students: 12,
    modules: 10,
    status: 'Active',
    lastUpdated: '2024-07-15',
  },
  {
    id: 2,
    title: 'Digital Marketing 101',
    description: 'An introductory guide to digital marketing strategies, SEO, and social media campaigns.',
    students: 8,
    modules: 8,
    status: 'Active',
    lastUpdated: '2024-07-20',
  },
  {
    id: 3,
    title: 'English Communication',
    description: 'Improve your spoken and written English skills for professional and personal growth.',
    students: 15,
    modules: 12,
    status: 'Archived',
    lastUpdated: '2024-06-01',
  },
  {
    id: 4,
    title: 'Introduction to Python Programming',
    description: 'Learn the basics of Python, from syntax to data structures, for beginners.',
    students: 5,
    modules: 7,
    status: 'Draft',
    lastUpdated: '2024-07-22',
  },
];

const MentorCourseManagement = () => {
  const [courses, setCourses] = useState(mockManagedCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredCourses = courses
    .filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(course => filterStatus === 'All' || course.status === filterStatus);

  const allStatuses = ['All', ...new Set(mockManagedCourses.map(c => c.status))];

  const handleEditCourse = (id) => {
    alert(`Editing course with ID: ${id}`);
    // In a real application, this would navigate to an edit form
  };

  const handleDeleteCourse = (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== id));
      alert('Course deleted successfully!');
    }
  };

  const handleAddCourse = () => {
    alert('Adding a new course!');
    // In a real application, this would navigate to an add form
  };

  return (
    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '18px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h1 style={{ color: '#00b894', marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '800' }}>
        <FaBookOpen style={{ marginRight: '10px' }} />Course Management
      </h1>

      {/* Filter and Search Controls */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search courses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1 1 250px',
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
            minWidth: '120px',
          }}
        >
          {allStatuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>

        <button
          onClick={handleAddCourse}
          style={{
            background: 'linear-gradient(45deg, #00b894, #646cff)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 20px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 10px rgba(0,184,148,0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,184,148,0.5)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,184,148,0.3)'}
        >
          <FaPlusCircle /> Add New Course
        </button>
      </div>

      {/* Courses List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
        {filteredCourses.length === 0 ? (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#666', fontSize: '1.1rem', padding: '20px' }}>
            No courses found matching your criteria.
          </div>
        ) : (
          filteredCourses.map(course => (
            <div
              key={course.id}
              style={{
                background: '#ffffff',
                borderRadius: '15px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: `2px solid ${course.status === 'Active' ? '#00b894' : course.status === 'Draft' ? '#646cff' : '#aaa'}`,
                transition: 'transform 0.2s ease-in-out',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '1.4rem' }}>{course.title}</h3>
                <p style={{ margin: '0 0 15px 0', color: '#555', fontSize: '0.95rem' }}>{course.description}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem', color: '#666' }}>
                  <span><FaUsers style={{ marginRight: '5px' }} /> {course.students} Students</span>
                  <span><FaBookOpen style={{ marginRight: '5px' }} /> {course.modules} Modules</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: '15px' }}>
                  Last Updated: {course.lastUpdated}
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                <span style={{
                  padding: '5px 10px',
                  borderRadius: '15px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  color: '#fff',
                  background: course.status === 'Active' ? '#00b894' : course.status === 'Draft' ? '#646cff' : '#aaa',
                }}>
                  {course.status}
                </span>
                <div>
                  <button
                    onClick={() => handleEditCourse(course.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#646cff',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      marginRight: '10px',
                      padding: '5px',
                      borderRadius: '5px',
                      transition: 'background 0.2s',
                    }}
                    title="Edit Course"
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(100,108,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteCourse(course.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff6b6b',
                      fontSize: '1.1rem',
                      cursor: 'pointer',
                      padding: '5px',
                      borderRadius: '5px',
                      transition: 'background 0.2s',
                    }}
                    title="Delete Course"
                    onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,107,107,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MentorCourseManagement;