import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaCheckCircle, FaHourglassHalf, FaTimesCircle, FaEllipsisH, FaUsers } from 'react-icons/fa';
const mockMentees = [
  {
    id: 1,
    name: 'Alice Johnson',
    course: 'Mathematics Basics',
    progress: 75,
    status: 'Active',
    lastActivity: '2 days ago',
    avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: 2,
    name: 'Bob Smith',
    course: 'Digital Marketing 101',
    progress: 40,
    status: 'Active',
    lastActivity: '1 hour ago',
    avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
  {
    id: 3,
    name: 'Charlie Brown',
    course: 'English Communication',
    progress: 100,
    status: 'Completed',
    lastActivity: '5 days ago',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
  },
  {
    id: 4,
    name: 'Diana Prince',
    course: 'Mathematics Basics',
    progress: 90,
    status: 'Active',
    lastActivity: 'Yesterday',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
  },
  {
    id: 5,
    name: 'Eve Adams',
    course: 'Digital Marketing 101',
    progress: 10,
    status: 'Inactive',
    lastActivity: '2 weeks ago',
    avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
  },
];

const MyMentees = () => {
  const [mentees, setMentees] = React.useState(mockMentees);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterStatus, setFilterStatus] = React.useState('All');
  const [filterCourse, setFilterCourse] = React.useState('All');
  const [sortBy, setSortBy] = React.useState('name'); // 'name', 'progress', 'status', 'lastActivity'
  const [sortOrder, setSortOrder] = React.useState('asc'); // 'asc', 'desc'

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Active':
        return <FaHourglassHalf color="#646cff" />; // Blue for active
      case 'Completed':
        return <FaCheckCircle color="#00b894" />; // Green for completed
      case 'Inactive':
        return <FaTimesCircle color="#ff6b6b" />; // Red for inactive
      default:
        return <FaEllipsisH color="#aaa" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return '#646cff'; // Blue for active
      case 'Completed':
        return '#00b894'; // Green for completed
      case 'Inactive':
        return '#ff6b6b'; // Red for inactive
      default:
        return '#333';
    }
  };

  const filteredMentees = mentees
    .filter(mentee =>
      mentee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentee.course.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(mentee => filterStatus === 'All' || mentee.status === filterStatus)
    .filter(mentee => filterCourse === 'All' || mentee.course === filterCourse)
    .sort((a, b) => {
      let aValue, bValue;
      if (sortBy === 'name') {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      } else if (sortBy === 'progress') {
        aValue = a.progress;
        bValue = b.progress;
      } else if (sortBy === 'status') {
        aValue = a.status.toLowerCase();
        bValue = b.status.toLowerCase();
      } else if (sortBy === 'lastActivity') {
        // This would require more robust date parsing for real-world scenarios
        aValue = a.lastActivity;
        bValue = b.lastActivity;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const allCourses = ['All', ...new Set(mockMentees.map(m => m.course))];
  const allStatuses = ['All', ...new Set(mockMentees.map(m => m.status))];

  return (
    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '18px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h1 style={{ color: '#00b894', marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '800' }}>
        <FaUsers style={{ marginRight: '10px' }} />My Mentees
      </h1>

      {/* Filter and Sort Controls */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search by name or course..."
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

        <select
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          style={{
            flex: '0 0 auto',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            minWidth: '150px',
          }}
        >
          {allCourses.map(course => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            flex: '0 0 auto',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            minWidth: '100px',
          }}
        >
          <option value="name">Name</option>
          <option value="progress">Progress</option>
          <option value="status">Status</option>
          <option value="lastActivity">Last Activity</option>
        </select>

        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          style={{
            flex: '0 0 auto',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            background: '#eee',
            cursor: 'pointer',
            fontSize: '1rem',
          }}
        >
          Sort {sortOrder === 'asc' ? 'Desc' : 'Asc'}
        </button>
      </div>

      {/* Mentees List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' }}>
        {filteredMentees.length === 0 ? (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#666', fontSize: '1.1rem', padding: '20px' }}>
            No mentees found matching your criteria.
          </div>
        ) : (
          filteredMentees.map(mentee => (
            <div
              key={mentee.id}
              style={{
                background: '#ffffff',
                borderRadius: '15px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                border: `2px solid ${getStatusColor(mentee.status)}`,
                transition: 'transform 0.2s ease-in-out',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img
                src={mentee.avatar}
                alt={mentee.name}
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '15px',
                  border: `3px solid ${getStatusColor(mentee.status)}`,
                }}
              />
              <h3 style={{ margin: '0 0 8px 0', color: '#333', fontSize: '1.4rem' }}>{mentee.name}</h3>
              <p style={{ margin: '0 0 15px 0', color: '#555', fontSize: '1rem' }}>
                <FaChalkboardTeacher style={{ marginRight: '5px' }} /> {mentee.course}
              </p>

              {/* Progress Bar */}
              <div style={{ width: '100%', marginBottom: '15px' }}>
                <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '5px' }}>Progress: {mentee.progress}%</div>
                <div style={{ background: '#e0e0e0', borderRadius: '5px', height: '10px', overflow: 'hidden' }}>
                  <div
                    style={{
                      width: `${mentee.progress}%`,
                      height: '100%',
                      background: `linear-gradient(to right, #00b894, ${getStatusColor(mentee.status)})`,
                      borderRadius: '5px',
                      transition: 'width 0.5s ease-in-out',
                    }}
                  ></div>
                </div>
              </div>

              {/* Status and Last Activity */}
              <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', fontSize: '0.9rem', color: '#666' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: getStatusColor(mentee.status), fontWeight: '600' }}>
                  {getStatusIcon(mentee.status)} {mentee.status}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  Last Activity: {mentee.lastActivity}
                </div>
              </div>

              <button
                style={{
                  marginTop: '20px',
                  padding: '10px 20px',
                  background: 'linear-gradient(45deg, #00b894, #646cff)', // Green to Blue gradient
                  color: '#fff',
                  border: 'none',
                  borderRadius: '25px',
                  fontSize: '1rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  boxShadow: '0 4px 10px rgba(0,184,148,0.3)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,184,148,0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 4px 10px rgba(0,184,148,0.3)'}
              >
                View Profile
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyMentees;