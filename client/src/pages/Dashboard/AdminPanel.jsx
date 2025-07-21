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
import CertificatePage from '../CertificatePage';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Course-related state
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState({
    title: '',
    instructor: '',
    description: '',
    status: 'Draft',
    duration: '',
    level: 'Beginner',
    category: '',
    price: ''
  });

  // User-related state
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'Student',
    status: 'Active',
    password: ''
  });

  // Mentor-related state
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [editingMentor, setEditingMentor] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [mentorForm, setMentorForm] = useState({
    name: '',
    email: '',
    expertise: '',
    experience: '',
    rating: 5.0,
    status: 'Active',
    bio: '',
    specializations: '',
    hourlyRate: '',
    availability: 'Available',
    studentsAssigned: 0,
    totalSessions: 0
  });

  // Filter state
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [roleFilter, setRoleFilter] = useState('All');

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
    { id: 1, title: 'Full Stack Web Development', instructor: 'Dr. Sarah Johnson', description: 'Complete web development course covering frontend and backend technologies', students: 234, status: 'Published', created: '2024-01-01', duration: '12 weeks', level: 'Intermediate', category: 'Programming', price: 'Free' },
    { id: 2, title: 'Data Science Fundamentals', instructor: 'Prof. Mike Chen', description: 'Introduction to data science with Python and machine learning', students: 189, status: 'Draft', created: '2024-01-03', duration: '10 weeks', level: 'Beginner', category: 'Data Science', price: '$99' },
    { id: 3, title: 'Mobile App Development', instructor: 'Emily Davis', description: 'Build native mobile apps for iOS and Android', students: 156, status: 'Published', created: '2023-12-28', duration: '8 weeks', level: 'Advanced', category: 'Mobile', price: '$149' },
    { id: 4, title: 'Machine Learning Basics', instructor: 'Dr. Alex Kumar', description: 'Fundamentals of machine learning and AI', students: 98, status: 'Review', created: '2024-01-08', duration: '6 weeks', level: 'Intermediate', category: 'AI/ML', price: '$79' }
  ];

  const mentorData = [
    { 
      id: 1, 
      name: 'Dr. Sarah Johnson', 
      email: 'sarah.johnson@digitalbridge.com', 
      expertise: 'Full Stack Development', 
      experience: '8 years', 
      rating: 4.8, 
      status: 'Active', 
      bio: 'Experienced full-stack developer with expertise in React, Node.js, and cloud technologies.',
      specializations: 'React, Node.js, AWS, MongoDB',
      hourlyRate: '$85',
      availability: 'Available',
      studentsAssigned: 15,
      totalSessions: 234,
      joinDate: '2023-08-15'
    },
    { 
      id: 2, 
      name: 'Prof. Mike Chen', 
      email: 'mike.chen@digitalbridge.com', 
      expertise: 'Data Science & AI', 
      experience: '12 years', 
      rating: 4.9, 
      status: 'Active', 
      bio: 'Data science expert with PhD in Machine Learning and 12+ years of industry experience.',
      specializations: 'Python, Machine Learning, Deep Learning, Statistics',
      hourlyRate: '$95',
      availability: 'Available',
      studentsAssigned: 23,
      totalSessions: 567,
      joinDate: '2023-06-20'
    },
    { 
      id: 3, 
      name: 'Emily Davis', 
      email: 'emily.davis@digitalbridge.com', 
      expertise: 'Mobile Development', 
      experience: '6 years', 
      rating: 4.7, 
      status: 'Active', 
      bio: 'Mobile app developer specializing in iOS and Android native development.',
      specializations: 'Swift, Kotlin, React Native, Flutter',
      hourlyRate: '$80',
      availability: 'Busy',
      studentsAssigned: 12,
      totalSessions: 189,
      joinDate: '2023-09-10'
    },
    { 
      id: 4, 
      name: 'Dr. Alex Kumar', 
      email: 'alex.kumar@digitalbridge.com', 
      expertise: 'Machine Learning', 
      experience: '10 years', 
      rating: 4.6, 
      status: 'Active', 
      bio: 'ML researcher turned educator with focus on practical AI applications.',
      specializations: 'TensorFlow, PyTorch, Computer Vision, NLP',
      hourlyRate: '$90',
      availability: 'Available',
      studentsAssigned: 18,
      totalSessions: 345,
      joinDate: '2023-07-05'
    },
    { 
      id: 5, 
      name: 'Lisa Rodriguez', 
      email: 'lisa.rodriguez@digitalbridge.com', 
      expertise: 'UX/UI Design', 
      experience: '7 years', 
      rating: 4.8, 
      status: 'On Leave', 
      bio: 'Senior UX designer with expertise in user research and interface design.',
      specializations: 'Figma, Adobe Creative Suite, User Research, Prototyping',
      hourlyRate: '$75',
      availability: 'Unavailable',
      studentsAssigned: 8,
      totalSessions: 156,
      joinDate: '2023-11-12'
    }
  ];

  // Initialize courses state
  React.useEffect(() => {
    setCourses(recentCourses);
    setUsers(recentUsers);
    setMentors(mentorData);
  }, []);

  // CRUD Operations for Courses
  const handleCreateCourse = () => {
    setEditingCourse(null);
    setCourseForm({
      title: '',
      instructor: '',
      description: '',
      status: 'Draft',
      duration: '',
      level: 'Beginner',
      category: '',
      price: ''
    });
    setShowCourseModal(true);
  };

  const handleEditCourse = (course) => {
    setEditingCourse(course);
    setCourseForm(course);
    setShowCourseModal(true);
  };

  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  const handleSaveCourse = () => {
    if (editingCourse) {
      // Update existing course
      setCourses(courses.map(course => 
        course.id === editingCourse.id ? { ...courseForm, id: editingCourse.id, students: course.students, created: course.created } : course
      ));
    } else {
      // Create new course
      const newCourse = {
        ...courseForm,
        id: Date.now(),
        students: 0,
        created: new Date().toISOString().split('T')[0]
      };
      setCourses([...courses, newCourse]);
    }
    setShowCourseModal(false);
  };

  const handleCourseFormChange = (field, value) => {
    setCourseForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // CRUD Operations for Users
  const handleCreateUser = () => {
    setEditingUser(null);
    setUserForm({
      name: '',
      email: '',
      role: 'Student',
      status: 'Active',
      password: ''
    });
    setShowUserModal(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setUserForm({ ...user, password: '' }); // Don't show existing password
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleSaveUser = () => {
    if (editingUser) {
      // Update existing user
      setUsers(users.map(user => 
        user.id === editingUser.id ? { ...userForm, id: editingUser.id, joinDate: user.joinDate } : user
      ));
    } else {
      // Create new user
      const newUser = {
        ...userForm,
        id: Date.now(),
        joinDate: new Date().toISOString().split('T')[0]
      };
      setUsers([...users, newUser]);
    }
    setShowUserModal(false);
  };

  const handleUserFormChange = (field, value) => {
    setUserForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // CRUD Operations for Mentors
  const handleCreateMentor = () => {
    setEditingMentor(null);
    setMentorForm({
      name: '',
      email: '',
      expertise: '',
      experience: '',
      rating: 5.0,
      status: 'Active',
      bio: '',
      specializations: '',
      hourlyRate: '',
      availability: 'Available',
      studentsAssigned: 0,
      totalSessions: 0
    });
    setShowMentorModal(true);
  };

  const handleEditMentor = (mentor) => {
    setEditingMentor(mentor);
    setMentorForm(mentor);
    setShowMentorModal(true);
  };

  const handleDeleteMentor = (mentorId) => {
    if (window.confirm('Are you sure you want to delete this mentor?')) {
      setMentors(mentors.filter(mentor => mentor.id !== mentorId));
    }
  };

  const handleSaveMentor = () => {
    if (editingMentor) {
      // Update existing mentor
      setMentors(mentors.map(mentor => 
        mentor.id === editingMentor.id ? { ...mentorForm, id: editingMentor.id, joinDate: mentor.joinDate } : mentor
      ));
    } else {
      // Create new mentor
      const newMentor = {
        ...mentorForm,
        id: Date.now(),
        joinDate: new Date().toISOString().split('T')[0]
      };
      setMentors([...mentors, newMentor]);
    }
    setShowMentorModal(false);
  };

  const handleMentorFormChange = (field, value) => {
    setMentorForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Export functions
  const exportToCSV = (data, filename, headers) => {
    const csvContent = [
      headers.join(','),
      ...data.map(row => headers.map(header => {
        const value = row[header.toLowerCase().replace(' ', '')];
        // Handle values that might contain commas or quotes
        return typeof value === 'string' && (value.includes(',') || value.includes('"'))
          ? `"${value.replace(/"/g, '""')}"`
          : value;
      }).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportUsers = () => {
    const filteredUsers = getFilteredUsers();
    if (filteredUsers.length === 0) {
      alert('No users to export. Please adjust your filters or add users.');
      return;
    }
    const headers = ['Name', 'Email', 'Role', 'Status', 'JoinDate'];
    exportToCSV(filteredUsers, 'users_export', headers);
    alert(`Successfully exported ${filteredUsers.length} users to CSV file.`);
  };

  const exportCourses = () => {
    const filteredCourses = getFilteredCourses();
    if (filteredCourses.length === 0) {
      alert('No courses to export. Please adjust your filters or add courses.');
      return;
    }
    const headers = ['Title', 'Instructor', 'Category', 'Level', 'Students', 'Status', 'Duration', 'Price'];
    exportToCSV(filteredCourses, 'courses_export', headers);
    alert(`Successfully exported ${filteredCourses.length} courses to CSV file.`);
  };

  const exportMentors = () => {
    const filteredMentors = getFilteredMentors();
    if (filteredMentors.length === 0) {
      alert('No mentors to export. Please adjust your filters or add mentors.');
      return;
    }
    const headers = ['Name', 'Email', 'Expertise', 'Experience', 'Rating', 'Status', 'HourlyRate', 'StudentsAssigned'];
    exportToCSV(filteredMentors, 'mentors_export', headers);
    alert(`Successfully exported ${filteredMentors.length} mentors to CSV file.`);
  };

  // Filter functions
  const getFilteredUsers = () => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
      const matchesRole = roleFilter === 'All' || user.role === roleFilter;
      return matchesSearch && matchesStatus && matchesRole;
    });
  };

  const getFilteredCourses = () => {
    return courses.filter(course => {
      const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || course.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

  const getFilteredMentors = () => {
    return mentors.filter(mentor => {
      const matchesSearch = mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           mentor.expertise.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || mentor.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  };

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
        <button style={buttonStyle} onClick={handleCreateUser}>
          <FaPlus /> Add New User
        </button>
      </div>
      
      <div style={cardStyle}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 300px', minWidth: '250px' }}>
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
                color: '#2d3436',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <button 
              style={{ 
                ...buttonStyle, 
                background: 'rgba(116,185,255,0.2)', 
                color: '#646cff',
                whiteSpace: 'nowrap',
                minWidth: 'auto'
              }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> Filter
            </button>
            <button style={{ 
              ...buttonStyle, 
              background: 'rgba(0,184,148,0.2)', 
              color: '#00b894',
              whiteSpace: 'nowrap',
              minWidth: 'auto'
            }}
            onClick={exportUsers}
            title="Export filtered users to CSV"
            >
              <FaDownload /> Export
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div style={{
            background: 'rgba(116,185,255,0.1)',
            padding: '1rem',
            borderRadius: 10,
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436', fontSize: '0.9rem' }}>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '0.5rem',
                  border: '1px solid rgba(116,185,255,0.3)',
                  borderRadius: 6,
                  fontSize: '0.9rem',
                  fontFamily: 'inherit'
                }}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Suspended">Suspended</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436', fontSize: '0.9rem' }}>
                Role
              </label>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                style={{
                  padding: '0.5rem',
                  border: '1px solid rgba(116,185,255,0.3)',
                  borderRadius: 6,
                  fontSize: '0.9rem',
                  fontFamily: 'inherit'
                }}
              >
                <option value="All">All Roles</option>
                <option value="Student">Student</option>
                <option value="Mentor">Mentor</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
            <button
              style={{
                ...buttonStyle,
                background: 'rgba(255,107,107,0.2)',
                color: '#ff6b6b',
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                marginTop: '1.5rem'
              }}
              onClick={() => {
                setStatusFilter('All');
                setRoleFilter('All');
                setSearchTerm('');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

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
              {getFilteredUsers().map((user) => (
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
                      <button 
                        style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(0,184,148,0.2)', color: '#00b894' }}
                        onClick={() => handleEditUser(user)}
                        title="Edit User"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(255,107,107,0.2)', color: '#ff6b6b' }}
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete User"
                      >
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

      {/* User Modal */}
      {showUserModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 15,
            padding: '2rem',
            width: '90%',
            maxWidth: '600px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#2d3436' }}>
              {editingUser ? 'Edit User' : 'Create New User'}
            </h3>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={userForm.name}
                  onChange={(e) => handleUserFormChange('name', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid rgba(116,185,255,0.3)',
                    borderRadius: 8,
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={userForm.email}
                  onChange={(e) => handleUserFormChange('email', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid rgba(116,185,255,0.3)',
                    borderRadius: 8,
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter email address"
                />
              </div>

              {!editingUser && (
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Password *
                  </label>
                  <input
                    type="password"
                    value={userForm.password}
                    onChange={(e) => handleUserFormChange('password', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                    placeholder="Enter password"
                  />
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Role
                  </label>
                  <select
                    value={userForm.role}
                    onChange={(e) => handleUserFormChange('role', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Student">Student</option>
                    <option value="Mentor">Mentor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Status
                  </label>
                  <select
                    value={userForm.status}
                    onChange={(e) => handleUserFormChange('status', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
              <button
                style={{
                  ...buttonStyle,
                  background: 'rgba(116,185,255,0.2)',
                  color: '#646cff'
                }}
                onClick={() => setShowUserModal(false)}
              >
                Cancel
              </button>
              <button
                style={buttonStyle}
                onClick={handleSaveUser}
                disabled={!userForm.name || !userForm.email || (!editingUser && !userForm.password)}
              >
                {editingUser ? 'Update User' : 'Create User'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderCourses = () => (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#2d3436', margin: 0 }}>
          Course Management
        </h2>
        <button style={buttonStyle} onClick={handleCreateCourse}>
          <FaPlus /> Add New Course
        </button>
      </div>
      
      <div style={cardStyle}>
        {/* Search and Filter Bar */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: '1 1 300px', minWidth: '250px' }}>
            <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#74b9ff' }} />
            <input
              type="text"
              placeholder="Search courses..."
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
                color: '#2d3436',
                boxSizing: 'border-box'
              }}
            />
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
            <button 
              style={{ 
                ...buttonStyle, 
                background: 'rgba(116,185,255,0.2)', 
                color: '#646cff',
                whiteSpace: 'nowrap',
                minWidth: 'auto'
              }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> Filter
            </button>
            <button style={{ 
              ...buttonStyle, 
              background: 'rgba(0,184,148,0.2)', 
              color: '#00b894',
              whiteSpace: 'nowrap',
              minWidth: 'auto'
            }}
            onClick={exportCourses}
            title="Export filtered courses to CSV"
            >
              <FaDownload /> Export
            </button>
          </div>
        </div>

        {/* Filter Panel for Courses */}
        {showFilters && (
          <div style={{
            background: 'rgba(116,185,255,0.1)',
            padding: '1rem',
            borderRadius: 10,
            marginBottom: '1.5rem',
            display: 'flex',
            gap: '1rem',
            alignItems: 'center'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436', fontSize: '0.9rem' }}>
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '0.5rem',
                  border: '1px solid rgba(116,185,255,0.3)',
                  borderRadius: 6,
                  fontSize: '0.9rem',
                  fontFamily: 'inherit'
                }}
              >
                <option value="All">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Review">Review</option>
              </select>
            </div>
            <button
              style={{
                ...buttonStyle,
                background: 'rgba(255,107,107,0.2)',
                color: '#ff6b6b',
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                marginTop: '1.5rem'
              }}
              onClick={() => {
                setStatusFilter('All');
                setSearchTerm('');
              }}
            >
              Clear Filters
            </button>
          </div>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(116,185,255,0.3)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Course Title</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Instructor</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Category</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Level</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Students</th>
                <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Status</th>
                <th style={{ padding: '1rem', textAlign: 'center', color: '#74b9ff', fontWeight: 700 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {getFilteredCourses().map((course) => (
                <tr key={course.id} style={{ borderBottom: '1px solid rgba(116,185,255,0.2)' }}>
                  <td style={{ padding: '1rem', color: '#2d3436', fontWeight: 600 }}>
                    <div>
                      <div>{course.title}</div>
                      <div style={{ fontSize: '0.8rem', color: '#636e72', marginTop: '0.2rem' }}>
                        {course.duration} • {course.price}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: '#636e72' }}>{course.instructor}</td>
                  <td style={{ padding: '1rem', color: '#636e72' }}>{course.category}</td>
                  <td style={{ padding: '1rem', color: '#636e72' }}>{course.level}</td>
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
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      <button 
                        style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(116,185,255,0.2)', color: '#646cff' }}
                        title="View Course"
                      >
                        <FaEye />
                      </button>
                      <button 
                        style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(0,184,148,0.2)', color: '#00b894' }}
                        onClick={() => handleEditCourse(course)}
                        title="Edit Course"
                      >
                        <FaEdit />
                      </button>
                      <button 
                        style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(255,107,107,0.2)', color: '#ff6b6b' }}
                        onClick={() => handleDeleteCourse(course.id)}
                        title="Delete Course"
                      >
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

      {/* Course Modal */}
      {showCourseModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#fff',
            borderRadius: 15,
            padding: '2rem',
            width: '90%',
            maxWidth: '700px',
            maxHeight: '90vh',
            overflow: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
          }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#2d3436' }}>
              {editingCourse ? 'Edit Course' : 'Create New Course'}
            </h3>
            
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                  Course Title *
                </label>
                <input
                  type="text"
                  value={courseForm.title}
                  onChange={(e) => handleCourseFormChange('title', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid rgba(116,185,255,0.3)',
                    borderRadius: 8,
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter course title"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                  Instructor *
                </label>
                <input
                  type="text"
                  value={courseForm.instructor}
                  onChange={(e) => handleCourseFormChange('instructor', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid rgba(116,185,255,0.3)',
                    borderRadius: 8,
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter instructor name"
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                  Description
                </label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => handleCourseFormChange('description', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid rgba(116,185,255,0.3)',
                    borderRadius: 8,
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    minHeight: '100px',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Enter course description"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Category
                  </label>
                  <input
                    type="text"
                    value={courseForm.category}
                    onChange={(e) => handleCourseFormChange('category', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                    placeholder="e.g., Programming"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Duration
                  </label>
                  <input
                    type="text"
                    value={courseForm.duration}
                    onChange={(e) => handleCourseFormChange('duration', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                    placeholder="e.g., 8 weeks"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Level
                  </label>
                  <select
                    value={courseForm.level}
                    onChange={(e) => handleCourseFormChange('level', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Price
                  </label>
                  <input
                    type="text"
                    value={courseForm.price}
                    onChange={(e) => handleCourseFormChange('price', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                    placeholder="e.g., $99 or Free"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Status
                  </label>
                  <select
                    value={courseForm.status}
                    onChange={(e) => handleCourseFormChange('status', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Draft">Draft</option>
                    <option value="Review">Review</option>
                    <option value="Published">Published</option>
                  </select>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end' }}>
              <button
                style={{
                  ...buttonStyle,
                  background: 'rgba(116,185,255,0.2)',
                  color: '#646cff'
                }}
                onClick={() => setShowCourseModal(false)}
              >
                Cancel
              </button>
              <button
                style={buttonStyle}
                onClick={handleSaveCourse}
                disabled={!courseForm.title || !courseForm.instructor}
              >
                {editingCourse ? 'Update Course' : 'Create Course'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderMentors = () => {
    const filteredMentors = getFilteredMentors();
    
    return (
      <div>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#2d3436', margin: 0 }}>
              Mentor Management
            </h2>
            <p style={{ color: '#636e72', margin: '0.5rem 0 0 0', fontSize: '1rem' }}>
              Manage mentor profiles and assignments
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <button 
              style={{ ...buttonStyle, background: 'rgba(0,184,148,0.2)', color: '#00b894' }}
              onClick={exportMentors}
            >
              <FaDownload /> Export Mentors
            </button>
            <button style={buttonStyle} onClick={handleCreateMentor}>
              <FaPlus /> Add New Mentor
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1', minWidth: '300px' }}>
              <div style={{ position: 'relative' }}>
                <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#74b9ff' }} />
                <input
                  type="text"
                  placeholder="Search mentors by name, email, or expertise..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem 1rem 0.8rem 3rem',
                    border: '2px solid rgba(116,185,255,0.3)',
                    borderRadius: 10,
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
            
            <button 
              style={{ ...buttonStyle, background: showFilters ? '#646cff' : 'rgba(116,185,255,0.2)', color: showFilters ? '#fff' : '#646cff' }}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter /> Filters
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', padding: '1rem', background: 'rgba(116,185,255,0.1)', borderRadius: 10, flexWrap: 'wrap' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: '2px solid rgba(116,185,255,0.3)',
                    borderRadius: 5,
                    fontSize: '0.9rem',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="On Leave">On Leave</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          )}

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(100,108,255,0.1)', borderRadius: 10 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#646cff' }}>{mentors.length}</h3>
              <p style={{ margin: '0.5rem 0 0 0', color: '#636e72' }}>Total Mentors</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(0,184,148,0.1)', borderRadius: 10 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#00b894' }}>
                {mentors.filter(m => m.status === 'Active').length}
              </h3>
              <p style={{ margin: '0.5rem 0 0 0', color: '#636e72' }}>Active Mentors</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(255,193,7,0.1)', borderRadius: 10 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#ffd32a' }}>
                {mentors.reduce((sum, m) => sum + m.studentsAssigned, 0)}
              </h3>
              <p style={{ margin: '0.5rem 0 0 0', color: '#636e72' }}>Students Assigned</p>
            </div>
            <div style={{ textAlign: 'center', padding: '1rem', background: 'rgba(225,112,85,0.1)', borderRadius: 10 }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#e17055' }}>
                {(mentors.reduce((sum, m) => sum + m.rating, 0) / mentors.length || 0).toFixed(1)}
              </h3>
              <p style={{ margin: '0.5rem 0 0 0', color: '#636e72' }}>Average Rating</p>
            </div>
          </div>

          {/* Mentors Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(116,185,255,0.3)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Mentor</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Expertise</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Experience</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Rating</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Students</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Rate</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredMentors.map((mentor) => (
                  <tr key={mentor.id} style={{ borderBottom: '1px solid rgba(116,185,255,0.2)' }}>
                    <td style={{ padding: '1rem' }}>
                      <div>
                        <div style={{ color: '#2d3436', fontWeight: 600 }}>{mentor.name}</div>
                        <div style={{ color: '#636e72', fontSize: '0.9rem' }}>{mentor.email}</div>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: '#636e72' }}>{mentor.expertise}</td>
                    <td style={{ padding: '1rem', color: '#636e72' }}>{mentor.experience}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                        <span style={{ color: '#ffd32a' }}>★</span>
                        <span style={{ color: '#2d3436', fontWeight: 600 }}>{mentor.rating}</span>
                      </div>
                    </td>
                    <td style={{ padding: '1rem', color: '#636e72' }}>{mentor.studentsAssigned}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{
                        background: mentor.status === 'Active' ? 'rgba(0,184,148,0.2)' : 
                                   mentor.status === 'On Leave' ? 'rgba(255,193,7,0.2)' : 'rgba(255,107,107,0.2)',
                        color: mentor.status === 'Active' ? '#00b894' : 
                               mentor.status === 'On Leave' ? '#ffd32a' : '#ff6b6b',
                        padding: '0.3rem 0.8rem',
                        borderRadius: 15,
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        {mentor.status}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', color: '#636e72', fontWeight: 600 }}>{mentor.hourlyRate}</td>
                    <td style={{ padding: '1rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button
                          onClick={() => handleEditMentor(mentor)}
                          style={{
                            background: 'rgba(116,185,255,0.2)',
                            color: '#646cff',
                            border: 'none',
                            padding: '0.5rem',
                            borderRadius: 5,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.9rem'
                          }}
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteMentor(mentor.id)}
                          style={{
                            background: 'rgba(255,107,107,0.2)',
                            color: '#ff6b6b',
                            border: 'none',
                            padding: '0.5rem',
                            borderRadius: 5,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '0.9rem'
                          }}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredMentors.length === 0 && (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#636e72' }}>
              No mentors found. {searchTerm && 'Try adjusting your search terms.'}
            </div>
          )}
        </div>

        {/* Mentor Modal */}
        {showMentorModal && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem'
          }}>
            <div style={{
              background: '#fff',
              borderRadius: 15,
              padding: '2rem',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '90vh',
              overflow: 'auto'
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#2d3436' }}>
                {editingMentor ? 'Edit Mentor' : 'Add New Mentor'}
              </h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    value={mentorForm.name}
                    onChange={(e) => handleMentorFormChange('name', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                    placeholder="e.g., Dr. Sarah Johnson"
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={mentorForm.email}
                    onChange={(e) => handleMentorFormChange('email', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                    placeholder="mentor@example.com"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Expertise *
                  </label>
                  <input
                    type="text"
                    value={mentorForm.expertise}
                    onChange={(e) => handleMentorFormChange('expertise', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                    placeholder="e.g., Full Stack Development"
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Experience
                  </label>
                  <input
                    type="text"
                    value={mentorForm.experience}
                    onChange={(e) => handleMentorFormChange('experience', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                    placeholder="e.g., 5 years"
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Status
                  </label>
                  <select
                    value={mentorForm.status}
                    onChange={(e) => handleMentorFormChange('status', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Hourly Rate
                  </label>
                  <input
                    type="text"
                    value={mentorForm.hourlyRate}
                    onChange={(e) => handleMentorFormChange('hourlyRate', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                    placeholder="e.g., $85"
                  />
                </div>
                
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                    Rating
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    step="0.1"
                    value={mentorForm.rating}
                    onChange={(e) => handleMentorFormChange('rating', parseFloat(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '0.8rem',
                      border: '2px solid rgba(116,185,255,0.3)',
                      borderRadius: 8,
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                  Specializations
                </label>
                <input
                  type="text"
                  value={mentorForm.specializations}
                  onChange={(e) => handleMentorFormChange('specializations', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid rgba(116,185,255,0.3)',
                    borderRadius: 8,
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    boxSizing: 'border-box'
                  }}
                  placeholder="e.g., React, Node.js, AWS, MongoDB"
                />
              </div>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                  Bio
                </label>
                <textarea
                  value={mentorForm.bio}
                  onChange={(e) => handleMentorFormChange('bio', e.target.value)}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '0.8rem',
                    border: '2px solid rgba(116,185,255,0.3)',
                    borderRadius: 8,
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                    resize: 'vertical',
                    boxSizing: 'border-box'
                  }}
                  placeholder="Brief description of mentor's background and expertise..."
                />
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  onClick={() => setShowMentorModal(false)}
                  style={{
                    background: 'rgba(255,107,107,0.2)',
                    color: '#ff6b6b',
                    border: 'none',
                    padding: '0.8rem 1.5rem',
                    borderRadius: 8,
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveMentor}
                  style={buttonStyle}
                >
                  {editingMentor ? 'Update Mentor' : 'Add Mentor'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderCertificates = () => (
    <CertificatePage />
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
