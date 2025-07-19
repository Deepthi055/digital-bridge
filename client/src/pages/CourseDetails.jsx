import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaPlay, 
  FaClock, 
  FaUsers, 
  FaStar, 
  FaBookmark, 
  FaDownload,
  FaChevronDown,
  FaChevronUp,
  FaCheck
} from 'react-icons/fa';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [expandedModule, setExpandedModule] = useState(null);
  const [enrolledStatus, setEnrolledStatus] = useState(false);

  // Sample course data - in real app, this would come from API
  const courseData = {
    id: courseId,
    title: "Full Stack Web Development",
    instructor: "Dr. Sarah Johnson",
    rating: 4.8,
    students: 12847,
    duration: "12 weeks",
    level: "Intermediate",
    price: "Free",
    description: "Master modern web development with React, Node.js, and MongoDB. Build real-world projects and gain industry-ready skills.",
    thumbnail: "/api/placeholder/800/400",
    skills: ["React", "Node.js", "MongoDB", "JavaScript", "HTML/CSS", "REST APIs"],
    modules: [
      {
        id: 1,
        title: "Frontend Fundamentals",
        duration: "2 weeks",
        lessons: [
          { id: 1, title: "HTML5 & Semantic Markup", duration: "45 min", completed: true },
          { id: 2, title: "CSS3 & Flexbox/Grid", duration: "60 min", completed: true },
          { id: 3, title: "JavaScript ES6+", duration: "90 min", completed: false },
          { id: 4, title: "DOM Manipulation", duration: "75 min", completed: false }
        ]
      },
      {
        id: 2,
        title: "React Development",
        duration: "4 weeks",
        lessons: [
          { id: 5, title: "React Components & JSX", duration: "80 min", completed: false },
          { id: 6, title: "State Management & Hooks", duration: "100 min", completed: false },
          { id: 7, title: "React Router", duration: "60 min", completed: false },
          { id: 8, title: "API Integration", duration: "90 min", completed: false }
        ]
      },
      {
        id: 3,
        title: "Backend Development",
        duration: "4 weeks",
        lessons: [
          { id: 9, title: "Node.js & Express", duration: "85 min", completed: false },
          { id: 10, title: "Database Design", duration: "70 min", completed: false },
          { id: 11, title: "Authentication & Security", duration: "95 min", completed: false },
          { id: 12, title: "API Development", duration: "80 min", completed: false }
        ]
      },
      {
        id: 4,
        title: "Full Stack Project",
        duration: "2 weeks",
        lessons: [
          { id: 13, title: "Project Planning", duration: "30 min", completed: false },
          { id: 14, title: "Development Phase", duration: "240 min", completed: false },
          { id: 15, title: "Testing & Deployment", duration: "90 min", completed: false },
          { id: 16, title: "Code Review", duration: "60 min", completed: false }
        ]
      }
    ]
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(120deg, #646cff 0%, #74b9ff 50%, #00cec9 100%)',
    color: '#2d3436',
    position: 'relative',
    overflow: 'hidden'
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(100,108,255,0.15)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)',
    margin: '1rem 0'
  };

  const buttonStyle = {
    background: 'linear-gradient(90deg, #646cff 60%, #00b894 100%)',
    color: '#fff',
    border: 'none',
    padding: '0.8rem 2rem',
    borderRadius: 12,
    fontWeight: 700,
    cursor: 'pointer',
    fontSize: '1rem',
    boxShadow: '0 4px 15px rgba(100,108,255,0.3)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  };

  const moduleCardStyle = {
    background: 'rgba(255,255,255,0.7)',
    borderRadius: 15,
    padding: '1.5rem',
    margin: '1rem 0',
    border: '1px solid rgba(116,185,255,0.3)',
    transition: 'all 0.3s ease'
  };

  const lessonStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.8rem 1rem',
    background: 'rgba(255,255,255,0.6)',
    borderRadius: 10,
    margin: '0.5rem 0',
    border: '1px solid rgba(116,185,255,0.2)',
    transition: 'all 0.3s ease'
  };

  const toggleModule = (moduleId) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId);
  };

  const handleEnroll = () => {
    setEnrolledStatus(true);
  };

  return (
    <div style={containerStyle}>
      {/* Background Wave */}
      <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 0 }} height="200" viewBox="0 0 1440 200" fill="none">
        <path fill="#646cff" fillOpacity="0.15" d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,149.3C672,149,768,171,864,170.7C960,171,1056,149,1152,149.3C1248,149,1344,171,1392,181.3L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z" />
      </svg>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <Link 
            to="/" 
            style={{ 
              color: '#646cff', 
              textDecoration: 'none', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              marginBottom: '1rem'
            }}
          >
            <FaArrowLeft /> Back to Courses
          </Link>
        </div>

        {/* Course Hero Section */}
        <div style={cardStyle}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem', alignItems: 'start' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '1rem', lineHeight: 1.2 }}>
                {courseData.title}
              </h1>
              <p style={{ fontSize: '1.2rem', color: '#636e72', marginBottom: '1.5rem', lineHeight: 1.6 }}>
                {courseData.description}
              </p>
              
              {/* Course Stats */}
              <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaStar color="#ffd700" />
                  <span style={{ fontWeight: 600 }}>{courseData.rating}</span>
                  <span style={{ color: '#74b9ff' }}>({courseData.students.toLocaleString()} students)</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaClock color="#646cff" />
                  <span>{courseData.duration}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaUsers color="#00b894" />
                  <span>{courseData.level}</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Skills you'll learn:</h3>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {courseData.skills.map((skill, index) => (
                    <span 
                      key={index}
                      style={{
                        background: 'rgba(100,108,255,0.2)',
                        color: '#646cff',
                        padding: '0.4rem 1rem',
                        borderRadius: 20,
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        border: '1px solid rgba(100,108,255,0.3)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <p style={{ color: '#74b9ff', fontSize: '1rem' }}>
                Instructor: <span style={{ color: '#2d3436', fontWeight: 600 }}>{courseData.instructor}</span>
              </p>
            </div>

            {/* Course Actions Card */}
            <div style={{ ...cardStyle, background: 'rgba(255,255,255,0.9)' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#00b894', marginBottom: '0.5rem' }}>
                  {courseData.price}
                </div>
                <p style={{ color: '#636e72' }}>Full course access</p>
              </div>

              {!enrolledStatus ? (
                <button 
                  style={{ ...buttonStyle, width: '100%', justifyContent: 'center' }}
                  onClick={handleEnroll}
                  onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                >
                  <FaPlay /> Enroll Now
                </button>
              ) : (
                <button 
                  style={{ ...buttonStyle, width: '100%', justifyContent: 'center', background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)' }}
                >
                  <FaPlay /> Continue Learning
                </button>
              )}

              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <button style={{ ...buttonStyle, flex: 1, background: 'rgba(116,185,255,0.2)', justifyContent: 'center' }}>
                  <FaBookmark />
                </button>
                <button style={{ ...buttonStyle, flex: 1, background: 'rgba(116,185,255,0.2)', justifyContent: 'center' }}>
                  <FaDownload />
                </button>
              </div>

              <div style={{ marginTop: '1.5rem', padding: '1rem 0', borderTop: '1px solid rgba(116,185,255,0.3)' }}>
                <h4 style={{ marginBottom: '0.5rem' }}>This course includes:</h4>
                <ul style={{ listStyle: 'none', padding: 0, color: '#636e72' }}>
                  <li style={{ margin: '0.3rem 0' }}>✓ 16 hours of video content</li>
                  <li style={{ margin: '0.3rem 0' }}>✓ Hands-on projects</li>
                  <li style={{ margin: '0.3rem 0' }}>✓ Certificate of completion</li>
                  <li style={{ margin: '0.3rem 0' }}>✓ Lifetime access</li>
                  <li style={{ margin: '0.3rem 0' }}>✓ Community support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Course Curriculum */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>
            Course Curriculum
          </h2>
          
          {courseData.modules.map((module) => (
            <div key={module.id} style={moduleCardStyle}>
              <div 
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '0.5rem 0'
                }}
                onClick={() => toggleModule(module.id)}
              >
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 700 }}>
                    {module.title}
                  </h3>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#74b9ff', fontSize: '0.9rem' }}>
                    {module.duration} • {module.lessons.length} lessons
                  </p>
                </div>
                {expandedModule === module.id ? <FaChevronUp color="#646cff" /> : <FaChevronDown color="#646cff" />}
              </div>

              {expandedModule === module.id && (
                <div style={{ marginTop: '1rem' }}>
                  {module.lessons.map((lesson) => (
                    <div key={lesson.id} style={lessonStyle}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ 
                          width: 20, 
                          height: 20, 
                          borderRadius: '50%', 
                          background: lesson.completed ? '#00b894' : 'rgba(255,255,255,0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          {lesson.completed && <FaCheck size={10} />}
                        </div>
                        <span style={{ fontWeight: 500 }}>{lesson.title}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#74b9ff' }}>
                        <span>{lesson.duration}</span>
                        <FaPlay size={12} style={{ cursor: 'pointer' }} />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Floating Animation Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        button:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 25px rgba(100,108,255,0.4) !important;
        }
        
        .module-card:hover {
          background: rgba(255,255,255,0.8) !important;
          transform: translateY(-2px);
        }
        
        .lesson-item:hover {
          background: rgba(255,255,255,0.7) !important;
        }
      `}</style>
    </div>
  );
};

export default CourseDetails;
