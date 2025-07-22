import React, { useState } from 'react';
import { FaCog, FaUserEdit, FaLock, FaBell, FaPalette } from 'react-icons/fa';

const MentorSettings = () => {
  const [profileName, setProfileName] = useState('Dr. Anya Sharma');
  const [email, setEmail] = useState('anya.sharma@example.com');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSaveChanges = () => {
    alert('Settings saved!');
    // In a real app, you'd send this data to a backend API
  };

  return (
    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '18px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h1 style={{ color: '#00b894', marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '800' }}>
        <FaCog style={{ marginRight: '10px' }} />Mentor Settings
      </h1>

      <div style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', padding: '25px', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaUserEdit color="#646cff" />Profile Settings
        </h2>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Name:</label>
          <input
            type="text"
            value={profileName}
            onChange={(e) => setProfileName(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              fontSize: '1rem',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          onClick={handleSaveChanges}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(45deg, #00b894, #00997e)',
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,184,148,0.2)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,184,148,0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,184,148,0.2)'}
        >
          Save Profile Changes
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', padding: '25px', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaLock color="#e74c3c" />Security Settings
        </h2>
        <button
          onClick={() => alert('Change password functionality would be here.')}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(231,76,60,0.2)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(231,76,60,0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(231,76,60,0.2)'}
        >
          Change Password
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', padding: '25px', marginBottom: '20px' }}>
        <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaBell color="#f1c40f" />Notification Preferences
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="checkbox"
            id="notifications"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
            style={{ marginRight: '10px', transform: 'scale(1.2)' }}
          />
          <label htmlFor="notifications" style={{ color: '#555', fontWeight: 'bold' }}>Enable Email Notifications</label>
        </div>
        <button
          onClick={handleSaveChanges}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(45deg, #00b894, #00997e)',
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,184,148,0.2)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,184,148,0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,184,148,0.2)'}
        >
          Save Notification Preferences
        </button>
      </div>

      <div style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', padding: '25px' }}>
        <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaPalette color="#2ecc71" />Appearance
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <input
            type="checkbox"
            id="darkMode"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
            style={{ marginRight: '10px', transform: 'scale(1.2)' }}
          />
          <label htmlFor="darkMode" style={{ color: '#555', fontWeight: 'bold' }}>Enable Dark Mode</label>
        </div>
        <button
          onClick={handleSaveChanges}
          style={{
            padding: '10px 20px',
            background: 'linear-gradient(45deg, #00b894, #00997e)',
            color: '#fff',
            border: 'none',
            borderRadius: '25px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,184,148,0.2)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,184,148,0.4)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,184,148,0.2)'}
        >
          Save Appearance Settings
        </button>
      </div>

    </div>
  );
};

export default MentorSettings;