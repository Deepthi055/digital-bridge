import React, { useState, useEffect } from 'react';
import { 
  FaUsers, 
  FaBook, 
  FaCertificate, 
  FaChartLine, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaSearch,
  FaFilter,
  FaDownload,
  FaBell,
  FaCog,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserShield,
  FaSignOutAlt,
  FaTachometerAlt
} from 'react-icons/fa';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');

  // Sidebar links data
  const sidebarLinks = [
    { icon: <FaTachometerAlt />, label: 'Dashboard', key: 'dashboard' },
    { icon: <FaUsers />, label: 'Users', key: 'users' },
    { icon: <FaBook />, label: 'Courses', key: 'courses' },
    { icon: <FaChalkboardTeacher />, label: 'Mentors', key: 'mentors' },
    { icon: <FaCertificate />, label: 'Certificates', key: 'certificates' },
    { icon: <FaChartLine />, label: 'Analytics', key: 'analytics' },
    { icon: <FaCog />, label: 'Settings', key: 'settings' },
  ];

  // Sidebar Link Component
  const SidebarLink = ({ icon, label, active, onClick }) => (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        padding: '1rem 1.2rem',
        marginBottom: '0.5rem',
        borderRadius: 12,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        background: active ? 'rgba(255,255,255,0.2)' : 'transparent',
        color: active ? '#fff' : 'rgba(255,255,255,0.8)',
        fontWeight: active ? 700 : 600,
        fontSize: '0.95rem'
      }}
    >
      <span style={{ fontSize: '1.1rem' }}>{icon}</span>
      {label}
    </div>
  );

  // Sample data
  const stats = {
    totalUsers: 1247,
    totalCourses: 45,
    totalCertificates: 892,
    activeStudents: 734
  };

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Student', status: 'Active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Mentor', status: 'Active', joinDate: '2024-01-10' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Student', status: 'Inactive', joinDate: '2024-01-05' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Student', status: 'Active', joinDate: '2024-01-12' }
  ];

  const recentCourses = [
    { id: 1, title: 'Full Stack Web Development', instructor: 'Dr. Sarah Johnson', students: 234, status: 'Published', created: '2024-01-01' },
    { id: 2, title: 'Data Science Fundamentals', instructor: 'Prof. Mike Chen', students: 189, status: 'Draft', created: '2024-01-03' },
    { id: 3, title: 'Mobile App Development', instructor: 'Emily Davis', students: 156, status: 'Published', created: '2023-12-28' },
    { id: 4, title: 'Machine Learning Basics', instructor: 'Dr. Alex Kumar', students: 98, status: 'Review', created: '2024-01-08' }
  ];

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(120deg, #646cff 0%, #74b9ff 50%, #00cec9 100%)',
    display: 'flex',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: '1.5rem',
    boxShadow: '0 8px 32px rgba(100,108,255,0.15)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)',
    margin: '1rem 0'
  };

  const statCardStyle = {
    ...cardStyle,
    padding: '1.5rem',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  };

  const buttonStyle = {
    background: 'linear-gradient(90deg, #646cff 60%, #00b894 100%)',
    color: '#fff',
    border: 'none',
    padding: '0.7rem 1.5rem',
    borderRadius: 10,
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '0.9rem',
    boxShadow: '0 4px 15px rgba(100,108,255,0.3)',
    transition: 'all 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontFamily: 'inherit'
  };

  const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.95rem',
    fontFamily: 'inherit'
  };

  const renderDashboard = () => (
    <div>
      <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '2rem', color: '#2d3436' }}>
        Admin Dashboard Overview
      </h2>
      
      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={statCardStyle}>
          <FaUsers size={40} color="#646cff" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0', color: '#2d3436' }}>
            {stats.totalUsers.toLocaleString()}
          </h3>
          <p style={{ color: '#74b9ff', fontWeight: 600, margin: 0, fontSize: '1rem' }}>Total Users</p>
        </div>
        
        <div style={statCardStyle}>
          <FaBook size={40} color="#00b894" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0', color: '#2d3436' }}>
            {stats.totalCourses}
          </h3>
          <p style={{ color: '#74b9ff', fontWeight: 600, margin: 0, fontSize: '1rem' }}>Total Courses</p>
        </div>
        
        <div style={statCardStyle}>
          <FaCertificate size={40} color="#fdcb6e" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0', color: '#2d3436' }}>
            {stats.totalCertificates.toLocaleString()}
          </h3>
          <p style={{ color: '#74b9ff', fontWeight: 600, margin: 0, fontSize: '1rem' }}>Certificates Issued</p>
        </div>
        
        <div style={statCardStyle}>
          <FaUserGraduate size={40} color="#e17055" style={{ marginBottom: '1rem' }} />
          <h3 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.5rem 0', color: '#2d3436' }}>
            {stats.activeStudents.toLocaleString()}
          </h3>
          <p style={{ color: '#74b9ff', fontWeight: 600, margin: 0, fontSize: '1rem' }}>Active Students</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#2d3436' }}>
            Recent Users
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(116,185,255,0.3)' }}>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Name</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Role</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} style={{ borderBottom: '1px solid rgba(116,185,255,0.2)' }}>
                    <td style={{ padding: '1rem 0.5rem', color: '#2d3436', fontWeight: 600 }}>{user.name}</td>
                    <td style={{ padding: '1rem 0.5rem', color: '#636e72' }}>{user.role}</td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <span style={{
                        background: user.status === 'Active' ? 'rgba(0,184,148,0.2)' : 'rgba(255,107,107,0.2)',
                        color: user.status === 'Active' ? '#00b894' : '#ff6b6b',
                        padding: '0.3rem 0.8rem',
                        borderRadius: 15,
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {user.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#2d3436' }}>
            Recent Courses
          </h3>
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(116,185,255,0.3)' }}>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Title</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Students</th>
                  <th style={{ padding: '1rem 0.5rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentCourses.map((course) => (
                  <tr key={course.id} style={{ borderBottom: '1px solid rgba(116,185,255,0.2)' }}>
                    <td style={{ padding: '1rem 0.5rem', color: '#2d3436', fontWeight: 600 }}>{course.title}</td>
                    <td style={{ padding: '1rem 0.5rem', color: '#636e72' }}>{course.students}</td>
                    <td style={{ padding: '1rem 0.5rem' }}>
                      <span style={{
                        background: course.status === 'Published' ? 'rgba(0,184,148,0.2)' : 
                                   course.status === 'Draft' ? 'rgba(255,193,7,0.2)' : 'rgba(116,185,255,0.2)',
                        color: course.status === 'Published' ? '#00b894' : 
                               course.status === 'Draft' ? '#ffd32a' : '#74b9ff',
                        padding: '0.3rem 0.8rem',
                        borderRadius: 15,
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {course.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#2d3436', margin: 0 }}>
          User Management
        </h2>
        <button style={buttonStyle}>
          <FaPlus /> Add New User
        </button>
      </div>
      
      <div style={cardStyle}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#74b9ff' }} />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '0.8rem 0.8rem 0.8rem 2.5rem',
                border: '2px solid rgba(116,185,255,0.3)',
                borderRadius: 10,
                fontSize: '1rem',
                fontFamily: 'inherit',
                background: 'rgba(255,255,255,0.8)',
                color: '#2d3436'
              }}
            />
          </div>
          <button style={{ ...buttonStyle, background: 'rgba(116,185,255,0.2)', color: '#646cff' }}>
            <FaFilter /> Filter
          </button>
          <button style={{ ...buttonStyle, background: 'rgba(0,184,148,0.2)', color: '#00b894' }}>
            <FaDownload /> Export
          </button>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(116,185,255,0.3)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Name</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Email</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Role</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Join Date</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: '#74b9ff', fontWeight: 700 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid rgba(116,185,255,0.2)' }}>
                  <td style={{ padding: '1rem', color: '#2d3436', fontWeight: 600 }}>{user.name}</td>
                  <td style={{ padding: '1rem', color: '#636e72' }}>{user.email}</td>
                  <td style={{ padding: '1rem', color: '#636e72' }}>{user.role}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      background: user.status === 'Active' ? 'rgba(0,184,148,0.2)' : 'rgba(255,107,107,0.2)',
                      color: user.status === 'Active' ? '#00b894' : '#ff6b6b',
                      padding: '0.3rem 0.8rem',
                      borderRadius: 15,
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      {user.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#636e72' }}>{user.joinDate}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(116,185,255,0.2)', color: '#646cff' }}>
                        <FaEye />
                      </button>
                      <button style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(0,184,148,0.2)', color: '#00b894' }}>
                        <FaEdit />
                      </button>
                      <button style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(255,107,107,0.2)', color: '#ff6b6b' }}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderCourses = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#2d3436', margin: 0 }}>
          Course Management
        </h2>
        <button style={buttonStyle}>
          <FaPlus /> Add New Course
        </button>
      </div>
      
      <div style={cardStyle}>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(116,185,255,0.3)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Course Title</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Instructor</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Students</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Created</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: '#74b9ff', fontWeight: 700 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentCourses.map((course) => (
                <tr key={course.id} style={{ borderBottom: '1px solid rgba(116,185,255,0.2)' }}>
                  <td style={{ padding: '1rem', color: '#2d3436', fontWeight: 600 }}>{course.title}</td>
                  <td style={{ padding: '1rem', color: '#636e72' }}>{course.instructor}</td>
                  <td style={{ padding: '1rem', color: '#636e72' }}>{course.students}</td>
                  <td style={{ padding: '1rem' }}>
                    <span style={{
                      background: course.status === 'Published' ? 'rgba(0,184,148,0.2)' : 
                                 course.status === 'Draft' ? 'rgba(255,193,7,0.2)' : 'rgba(116,185,255,0.2)',
                      color: course.status === 'Published' ? '#00b894' : 
                             course.status === 'Draft' ? '#ffd32a' : '#74b9ff',
                      padding: '0.3rem 0.8rem',
                      borderRadius: 15,
                      fontSize: '0.8rem',
                      fontWeight: 600
                    }}>
                      {course.status}
                    </span>
                  </td>
                  <td style={{ padding: '1rem', color: '#636e72' }}>{course.created}</td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(116,185,255,0.2)', color: '#646cff' }}>
                        <FaEye />
                      </button>
                      <button style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(0,184,148,0.2)', color: '#00b894' }}>
                        <FaEdit />
                      </button>
                      <button style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(255,107,107,0.2)', color: '#ff6b6b' }}>
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderMentors = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#2d3436', margin: 0 }}>
          Mentor Management
        </h2>
        <button style={buttonStyle}>
          <FaPlus /> Add New Mentor
        </button>
      </div>
      
      <div style={cardStyle}>
        <p style={{ color: '#636e72', fontSize: '1.1rem', textAlign: 'center', padding: '2rem' }}>
          Mentor management interface coming soon...
        </p>
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#2d3436', margin: 0 }}>
          Certificate Management
        </h2>
        <button style={buttonStyle}>
          <FaDownload /> Export All
        </button>
      </div>
      
      <div style={cardStyle}>
        <p style={{ color: '#636e72', fontSize: '1.1rem', textAlign: 'center', padding: '2rem' }}>
          Certificate management interface coming soon...
        </p>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#2d3436', margin: 0 }}>
          Analytics & Reports
        </h2>
        <button style={buttonStyle}>
          <FaDownload /> Generate Report
        </button>
      </div>
      
      <div style={cardStyle}>
        <p style={{ color: '#636e72', fontSize: '1.1rem', textAlign: 'center', padding: '2rem' }}>
          Advanced analytics dashboard coming soon...
        </p>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#2d3436', margin: 0 }}>
          System Settings
        </h2>
        <button style={buttonStyle}>
          <FaCog /> Configure
        </button>
      </div>
      
      <div style={cardStyle}>
        <p style={{ color: '#636e72', fontSize: '1.1rem', textAlign: 'center', padding: '2rem' }}>
          System configuration interface coming soon...
        </p>
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      {/* Sidebar */}
      <aside style={{ 
        width: 280, 
        background: '#646cff', 
        color: '#fff', 
        minHeight: '100vh', 
        padding: '2.5rem 1.5rem 2rem 1.5rem', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        boxShadow: '2px 0 16px rgba(100,108,255,0.3)', 
        position: 'sticky', 
        top: 0, 
        zIndex: 2 
      }}>
        <div style={{ 
          fontWeight: 900, 
          fontSize: '1.5rem', 
          marginBottom: '2rem', 
          letterSpacing: 1, 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.8rem' 
        }}>
          <FaUserShield size={28} style={{ marginRight: 6 }} /> Admin Panel
        </div>
        
        <nav style={{ width: '100%', flex: 1 }}>
          {sidebarLinks.map(link => (
            <SidebarLink
              key={link.key}
              icon={link.icon}
              label={link.label}
              active={activeTab === link.key}
              onClick={() => setActiveTab(link.key)}
            />
          ))}
        </nav>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1rem', width: '100%' }}>
          <button style={{ 
            background: 'none', 
            border: 'none', 
            color: '#fff', 
            fontWeight: 700, 
            fontSize: '1rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.8rem', 
            cursor: 'pointer',
            padding: '0.8rem',
            borderRadius: 8,
            transition: 'all 0.3s ease',
            width: '100%'
          }}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ 
        flex: 1, 
        padding: '2rem', 
        minWidth: 0, 
        background: 'linear-gradient(120deg, #f8fafc 60%, #eafcff 100%)',
        color: '#2d3436'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ ...cardStyle, marginBottom: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#2d3436' }}>
                  {activeTab === 'dashboard' && 'Dashboard Overview'}
                  {activeTab === 'users' && 'User Management'}
                  {activeTab === 'courses' && 'Course Management'}
                  {activeTab === 'mentors' && 'Mentor Management'}
                  {activeTab === 'certificates' && 'Certificate Management'}
                  {activeTab === 'analytics' && 'Analytics & Reports'}
                  {activeTab === 'settings' && 'System Settings'}
                </h1>
                <p style={{ color: '#636e72', margin: '0.5rem 0 0 0', fontSize: '1.1rem' }}>
                  {activeTab === 'dashboard' && 'Monitor platform performance and activity'}
                  {activeTab === 'users' && 'Manage platform users and permissions'}
                  {activeTab === 'courses' && 'Oversee course content and enrollment'}
                  {activeTab === 'mentors' && 'Manage mentor profiles and assignments'}
                  {activeTab === 'certificates' && 'Review and manage issued certificates'}
                  {activeTab === 'analytics' && 'View detailed platform analytics'}
                  {activeTab === 'settings' && 'Configure platform settings'}
                </p>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <button style={{ ...buttonStyle, background: 'rgba(116,185,255,0.2)', color: '#646cff' }}>
                  <FaBell />
                </button>
                <button style={{ ...buttonStyle, background: 'rgba(116,185,255,0.2)', color: '#646cff' }}>
                  <FaCog />
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div>
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'users' && renderUsers()}
            {activeTab === 'courses' && renderCourses()}
            {activeTab === 'mentors' && renderMentors()}
            {activeTab === 'certificates' && renderCertificates()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'settings' && renderSettings()}
          </div>
        </div>
      </div>

      {/* Hover Styles */}
      <style>{`
        button:hover {
          transform: translateY(-2px) !important;
          box-shadow: 0 8px 25px rgba(100,108,255,0.4) !important;
        }
        
        table tr:hover {
          background: rgba(116,185,255,0.1) !important;
        }
        
        input:focus {
          outline: none;
          border-color: #646cff !important;
          box-shadow: 0 0 0 3px rgba(100,108,255,0.1) !important;
        }
        
        aside button:hover {
          background: rgba(255,255,255,0.1) !important;
        }
      `}</style>
    </div>
  );
};

export default AdminPanel;
