import React, { useState } from 'react';
import { 
  FaChartLine, 
  FaUsers, 
  FaBook, 
  FaCertificate, 
  FaDownload, 
  FaFileExport,
  FaEye,
  FaClock,
  FaGraduationCap,
  FaUserGraduate
} from 'react-icons/fa';

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  // Common styles
  const cardStyle = {
    background: '#fff',
    borderRadius: 20,
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(100,108,255,0.15)',
    border: '1px solid rgba(255,255,255,0.18)',
    backdropFilter: 'blur(10px)'
  };

  const buttonStyle = {
    background: 'linear-gradient(135deg, #646cff 0%, #747bff 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    padding: '0.8rem 1.5rem',
    fontSize: '1rem',
    fontWeight: 600,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(100,108,255,0.4)',
    textDecoration: 'none'
  };

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const exportAnalyticsData = () => {
    const analyticsData = {
      period: selectedPeriod + ' days',
      totalUsers: 2847,
      activeCourses: 156,
      certificatesIssued: 892,
      mentorSessions: 1534,
      exportDate: new Date().toISOString(),
      detailedMetrics: {
        userGrowth: [120, 150, 180, 220, 250],
        courseCompletions: [45, 67, 89, 78, 95],
        engagementRate: 87.5,
        retentionRate: 78.2
      }
    };

    const dataStr = JSON.stringify(analyticsData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `analytics-report-${selectedPeriod}days-${new Date().toISOString().split('T')[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const generateDetailedReport = () => {
    const reportData = [
      ['Metric', 'Value', 'Change', 'Target'],
      ['Total Users', '2,847', '+12.5%', '3,000'],
      ['Active Courses', '156', '+8.2%', '180'],
      ['Certificates Issued', '892', '+15.7%', '1,000'],
      ['Course Completion Rate', '87.5%', '+5.3%', '90%'],
      ['User Retention Rate', '78.2%', '+2.1%', '80%'],
      ['Mentor Sessions', '1,534', '+18.9%', '1,600'],
      ['Platform Uptime', '99.9%', '+0.1%', '99.9%'],
      ['User Satisfaction', '4.7/5', '+0.2', '4.8/5']
    ];

    let csvContent = "data:text/csv;charset=utf-8,";
    reportData.forEach(row => {
      csvContent += row.join(",") + "\r\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `detailed-analytics-report-${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const viewAllCourses = () => {
    // Navigate to courses tab - this would typically use router navigation
    console.log('Navigate to courses management');
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      minHeight: '100vh',
      padding: '2rem'
    }}>
      {/* Header Section */}
      <div style={{ 
        background: '#fff',
        borderRadius: 20,
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 8px 32px rgba(100,108,255,0.15)',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#fff'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, marginBottom: '0.5rem' }}>
              Analytics Dashboard
            </h1>
            <p style={{ fontSize: '1.1rem', margin: 0, opacity: 0.9 }}>
              Comprehensive insights into platform performance and user engagement
            </p>
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              style={{
                ...buttonStyle,
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
              onClick={exportAnalyticsData}
            >
              <FaDownload /> Export Data
            </button>
            <button 
              style={{
                ...buttonStyle,
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
              onClick={generateDetailedReport}
            >
              <FaFileExport /> Generate Report
            </button>
            <button 
              style={{
                ...buttonStyle,
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)'
              }}
              onClick={viewAllCourses}
            >
              <FaEye /> View All Courses
            </button>
          </div>
        </div>
      </div>

      {/* Time Period Selector */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#2d3436' }}>
            Analytics Overview
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['7', '30', '90'].map(period => (
              <button 
                key={period}
                style={{
                  ...buttonStyle,
                  background: selectedPeriod === period ? '#646cff' : 'rgba(116,185,255,0.2)',
                  color: selectedPeriod === period ? '#fff' : '#646cff',
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem',
                  boxShadow: selectedPeriod === period ? '0 4px 15px rgba(100,108,255,0.4)' : 'none'
                }}
                onClick={() => handlePeriodChange(period)}
              >
                {period} Days
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {[
          { 
            title: 'Total Users', 
            value: '2,847', 
            change: '+12.5%', 
            icon: <FaUsers />, 
            color: '#646cff',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          },
          { 
            title: 'Active Courses', 
            value: '156', 
            change: '+8.2%', 
            icon: <FaBook />, 
            color: '#00b894',
            background: 'linear-gradient(135deg, #00b894 0%, #00cec9 100%)'
          },
          { 
            title: 'Certificates Issued', 
            value: '892', 
            change: '+15.7%', 
            icon: <FaCertificate />, 
            color: '#fdcb6e',
            background: 'linear-gradient(135deg, #fdcb6e 0%, #e17055 100%)'
          },
          { 
            title: 'Mentor Sessions', 
            value: '1,534', 
            change: '+18.9%', 
            icon: <FaGraduationCap />, 
            color: '#e17055',
            background: 'linear-gradient(135deg, #fd79a8 0%, #e84393 100%)'
          }
        ].map((metric, index) => (
          <div key={index} style={{
            ...cardStyle,
            background: metric.background,
            color: '#fff',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{ position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ fontSize: '2rem', opacity: 0.9 }}>
                  {metric.icon}
                </div>
                <span style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '0.3rem 0.8rem',
                  borderRadius: 15,
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)'
                }}>
                  {metric.change}
                </span>
              </div>
              <h3 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, marginBottom: '0.5rem' }}>
                {metric.value}
              </h3>
              <p style={{ fontSize: '1rem', margin: 0, opacity: 0.9, fontWeight: 600 }}>
                {metric.title}
              </p>
            </div>
            <div style={{
              position: 'absolute',
              top: '-50%',
              right: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              pointerEvents: 'none'
            }} />
          </div>
        ))}
      </div>

      {/* Charts and Detailed Analytics */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        {/* User Growth Chart */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: 0, color: '#2d3436' }}>
              User Growth Trend
            </h3>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                style={{
                  ...buttonStyle,
                  background: selectedPeriod === '7' ? '#646cff' : 'rgba(116,185,255,0.2)',
                  color: selectedPeriod === '7' ? '#fff' : '#646cff',
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem'
                }}
                onClick={() => handlePeriodChange('7')}
              >
                7D
              </button>
              <button 
                style={{
                  ...buttonStyle,
                  background: selectedPeriod === '30' ? '#646cff' : 'rgba(116,185,255,0.2)',
                  color: selectedPeriod === '30' ? '#fff' : '#646cff',
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem'
                }}
                onClick={() => handlePeriodChange('30')}
              >
                30D
              </button>
              <button 
                style={{
                  ...buttonStyle,
                  background: selectedPeriod === '90' ? '#646cff' : 'rgba(116,185,255,0.2)',
                  color: selectedPeriod === '90' ? '#fff' : '#646cff',
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem'
                }}
                onClick={() => handlePeriodChange('90')}
              >
                90D
              </button>
            </div>
          </div>
          
          {/* Simple Chart Visualization */}
          <div style={{ height: '300px', display: 'flex', alignItems: 'end', gap: '0.5rem', padding: '1rem 0' }}>
            {[120, 150, 180, 220, 250, 280, 320, 350, 380, 420, 450, 480].map((value, index) => (
              <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                <div style={{
                  width: '100%',
                  maxWidth: '40px',
                  height: `${(value / 480) * 250}px`,
                  background: `linear-gradient(45deg, #646cff ${index * 8}%, #74b9ff ${100 - index * 5}%)`,
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s ease',
                  marginBottom: '0.5rem'
                }} />
                <span style={{ fontSize: '0.7rem', color: '#636e72', transform: 'rotate(-45deg)', whiteSpace: 'nowrap' }}>
                  Week {index + 1}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#2d3436' }}>
            Performance Metrics
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { label: 'Course Completion Rate', value: 92, color: '#00b894' },
              { label: 'User Retention Rate', value: 78, color: '#646cff' },
              { label: 'Mentor Satisfaction', value: 96, color: '#fdcb6e' },
              { label: 'Platform Uptime', value: 99.9, color: '#e17055' }
            ].map((metric, index) => (
              <div key={index}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600, color: '#2d3436' }}>{metric.label}</span>
                  <span style={{ fontWeight: 700, color: metric.color }}>{metric.value}%</span>
                </div>
                <div style={{
                  width: '100%',
                  height: '8px',
                  background: 'rgba(116,185,255,0.2)',
                  borderRadius: 4,
                  overflow: 'hidden'
                }}>
                  <div style={{
                    width: `${metric.value}%`,
                    height: '100%',
                    background: metric.color,
                    borderRadius: 4,
                    transition: 'width 0.3s ease'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity & Top Courses */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        {/* Recent Activity */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#2d3436' }}>
            Recent Activity
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { action: 'New user registration', user: 'Sarah Johnson', time: '2 minutes ago', icon: <FaUsers />, color: '#646cff' },
              { action: 'Course completion', user: 'Mike Chen', time: '15 minutes ago', icon: <FaGraduationCap />, color: '#00b894' },
              { action: 'Certificate issued', user: 'Emma Wilson', time: '1 hour ago', icon: <FaCertificate />, color: '#fdcb6e' },
              { action: 'Mentor session started', user: 'Alex Rodriguez', time: '2 hours ago', icon: <FaClock />, color: '#e17055' },
              { action: 'New course published', user: 'Dr. Smith', time: '3 hours ago', icon: <FaBook />, color: '#a29bfe' }
            ].map((activity, index) => (
              <div key={index} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem',
                background: 'rgba(116,185,255,0.1)',
                borderRadius: 10,
                border: '1px solid rgba(116,185,255,0.2)'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: activity.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '1rem'
                }}>
                  {activity.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 600, color: '#2d3436', fontSize: '0.9rem' }}>
                    {activity.action}
                  </p>
                  <p style={{ margin: 0, color: '#636e72', fontSize: '0.8rem' }}>
                    {activity.user} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Courses */}
        <div style={cardStyle}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', color: '#2d3436' }}>
            Top Performing Courses
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              { title: 'React Development Masterclass', students: 1248, rating: 4.9, completion: 94 },
              { title: 'Python for Data Science', students: 987, rating: 4.8, completion: 89 },
              { title: 'JavaScript Fundamentals', students: 756, rating: 4.7, completion: 92 },
              { title: 'Machine Learning Basics', students: 634, rating: 4.6, completion: 87 },
              { title: 'Web Design Principles', students: 523, rating: 4.8, completion: 91 }
            ].map((course, index) => (
              <div key={index} style={{
                padding: '1.2rem',
                background: 'rgba(116,185,255,0.1)',
                borderRadius: 10,
                border: '1px solid rgba(116,185,255,0.2)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                  <h4 style={{ margin: 0, fontWeight: 600, color: '#2d3436', fontSize: '1rem' }}>
                    {course.title}
                  </h4>
                  <span style={{
                    background: '#646cff',
                    color: '#fff',
                    padding: '0.2rem 0.6rem',
                    borderRadius: 12,
                    fontSize: '0.7rem',
                    fontWeight: 600
                  }}>
                    #{index + 1}
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: '#636e72' }}>
                    <span><FaUserGraduate style={{ marginRight: '0.3rem' }} />{course.students} students</span>
                    <span>⭐ {course.rating}</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#00b894' }}>
                    {course.completion}% completion
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
