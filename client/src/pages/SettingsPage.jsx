import React, { useState } from 'react';
import { 
  FaCog, 
  FaSave, 
  FaBell, 
  FaShieldAlt, 
  FaUsers, 
  FaEnvelope, 
  FaToggleOn, 
  FaToggleOff,
  FaExclamationTriangle,
  FaGlobe,
  FaPalette,
  FaDatabase,
  FaSearch,
  FaCheck,
  FaTimes,
  FaInfoCircle,
  FaChevronRight,
  FaUpload,
  FaDownload,
  FaHistory,
  FaLock,
  FaEye,
  FaEyeSlash
} from 'react-icons/fa';

// Add CSS animations
const styles = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  .settings-card {
    animation: fadeIn 0.5s ease-out;
  }
  
  .loading-pulse {
    animation: pulse 1.5s infinite;
  }
  
  input:focus, textarea:focus, select:focus {
    border-color: #646cff !important;
    box-shadow: 0 0 0 3px rgba(100,108,255,0.1) !important;
    transform: translateY(-1px);
  }
  
  button:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(100,108,255,0.4) !important;
  }
  
  .toggle-switch:hover {
    transform: scale(1.1);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Digital Bridge',
      siteDescription: 'Empowering learners through digital education',
      contactEmail: 'admin@digitalbridge.com',
      supportEmail: 'support@digitalbridge.com',
      maintenanceMode: false,
      allowRegistration: true,
      requireEmailVerification: true,
      defaultLanguage: 'en',
      timezone: 'UTC'
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: false,
      smsNotifications: false,
      notifyOnNewUser: true,
      notifyOnNewCourse: true,
      notifyOnCertificate: true,
      notifyOnMentorAssignment: true,
      digestFrequency: 'daily'
    },
    security: {
      passwordMinLength: 8,
      requireUppercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      sessionTimeout: 30,
      maxLoginAttempts: 5,
      twoFactorAuth: false,
      allowPasswordReset: true,
      forcePasswordChange: false
    },
    features: {
      enableCertificates: true,
      enableMentorSystem: true,
      enableAnalytics: true,
      enableForums: false,
      enableLiveChat: true,
      enableFileSharing: true,
      enableVideoConferencing: false,
      enableMobileApp: true
    },
    appearance: {
      theme: 'light',
      primaryColor: '#646cff',
      secondaryColor: '#74b9ff',
      logoUrl: '',
      faviconUrl: '',
      customCSS: ''
    },
    integrations: {
      googleAnalytics: '',
      mailchimpApi: '',
      slackWebhook: '',
      zoomApi: '',
      paypalApi: '',
      stripeApi: ''
    }
  });

  const [activeSection, setActiveSection] = useState('general');
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedCards, setExpandedCards] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    { key: 'general', label: 'General Settings', icon: <FaGlobe /> },
    { key: 'notifications', label: 'Notifications', icon: <FaBell /> },
    { key: 'security', label: 'Security', icon: <FaShieldAlt /> },
    { key: 'features', label: 'Features', icon: <FaCog /> },
    { key: 'appearance', label: 'Appearance', icon: <FaPalette /> },
    { key: 'integrations', label: 'Integrations', icon: <FaDatabase /> }
  ];

  const filteredSections = sections.filter(section =>
    searchQuery === '' || 
    section.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSettingChange = (section, key, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value
      }
    }));
    setUnsavedChanges(true);
  };

  const handleSaveSettings = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Saving settings:', settings);
      setUnsavedChanges(false);
      
      // Add success notification
      const successNotification = {
        id: Date.now(),
        type: 'success',
        message: 'Settings saved successfully!',
        timestamp: new Date()
      };
      setNotifications(prev => [successNotification, ...prev.slice(0, 4)]);
      
      // Auto-remove notification after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== successNotification.id));
      }, 5000);
    } catch (error) {
      const errorNotification = {
        id: Date.now(),
        type: 'error',
        message: 'Failed to save settings. Please try again.',
        timestamp: new Date()
      };
      setNotifications(prev => [errorNotification, ...prev.slice(0, 4)]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleCardExpansion = (cardId) => {
    setExpandedCards(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const togglePasswordVisibility = (fieldId) => {
    setShowPasswordFields(prev => ({
      ...prev,
      [fieldId]: !prev[fieldId]
    }));
  };

  const resetSection = (section) => {
    if (window.confirm(`Are you sure you want to reset all ${section} settings to default values?`)) {
      // Reset to default values (you can define defaults here)
      setUnsavedChanges(true);
    }
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(120deg, #f8fafc 60%, #eafcff 100%)',
    padding: '2rem',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
  };

  const cardStyle = {
    background: 'rgba(255,255,255,0.95)',
    borderRadius: 15,
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(100,108,255,0.15)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.3)',
    margin: '1rem 0',
    transition: 'all 0.3s ease',
    animation: 'fadeIn 0.5s ease-out'
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

  const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    border: '2px solid rgba(116,185,255,0.3)',
    borderRadius: 8,
    fontSize: '1rem',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    background: 'rgba(255,255,255,0.9)',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const ToggleSwitch = ({ checked, onChange, label }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0' }}>
      <span style={{ fontWeight: 600, color: '#2d3436' }}>{label}</span>
      <div 
        onClick={() => onChange(!checked)}
        className="toggle-switch"
        style={{ 
          cursor: 'pointer', 
          color: checked ? '#00b894' : '#636e72',
          fontSize: '1.5rem',
          transition: 'all 0.3s ease',
          padding: '0.2rem'
        }}
      >
        {checked ? <FaToggleOn /> : <FaToggleOff />}
      </div>
    </div>
  );

  const renderGeneralSettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2d3436', margin: 0 }}>
        General Settings
      </h3>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Site Name
          </label>
          <input
            type="text"
            value={settings.general.siteName}
            onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Default Language
          </label>
          <select
            value={settings.general.defaultLanguage}
            onChange={(e) => handleSettingChange('general', 'defaultLanguage', e.target.value)}
            style={inputStyle}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
          Site Description
        </label>
        <textarea
          value={settings.general.siteDescription}
          onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
          style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Contact Email
          </label>
          <input
            type="email"
            value={settings.general.contactEmail}
            onChange={(e) => handleSettingChange('general', 'contactEmail', e.target.value)}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Support Email
          </label>
          <input
            type="email"
            value={settings.general.supportEmail}
            onChange={(e) => handleSettingChange('general', 'supportEmail', e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      <div style={{ border: '1px solid rgba(116,185,255,0.3)', borderRadius: 10, padding: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#2d3436' }}>Site Settings</h4>
        <ToggleSwitch
          checked={settings.general.maintenanceMode}
          onChange={(value) => handleSettingChange('general', 'maintenanceMode', value)}
          label="Maintenance Mode"
        />
        <ToggleSwitch
          checked={settings.general.allowRegistration}
          onChange={(value) => handleSettingChange('general', 'allowRegistration', value)}
          label="Allow New Registrations"
        />
        <ToggleSwitch
          checked={settings.general.requireEmailVerification}
          onChange={(value) => handleSettingChange('general', 'requireEmailVerification', value)}
          label="Require Email Verification"
        />
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2d3436', margin: 0 }}>
        Notification Settings
      </h3>

      <div style={{ border: '1px solid rgba(116,185,255,0.3)', borderRadius: 10, padding: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#2d3436' }}>Notification Channels</h4>
        <ToggleSwitch
          checked={settings.notifications.emailNotifications}
          onChange={(value) => handleSettingChange('notifications', 'emailNotifications', value)}
          label="Email Notifications"
        />
        <ToggleSwitch
          checked={settings.notifications.pushNotifications}
          onChange={(value) => handleSettingChange('notifications', 'pushNotifications', value)}
          label="Push Notifications"
        />
        <ToggleSwitch
          checked={settings.notifications.smsNotifications}
          onChange={(value) => handleSettingChange('notifications', 'smsNotifications', value)}
          label="SMS Notifications"
        />
      </div>

      <div style={{ border: '1px solid rgba(116,185,255,0.3)', borderRadius: 10, padding: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#2d3436' }}>Event Notifications</h4>
        <ToggleSwitch
          checked={settings.notifications.notifyOnNewUser}
          onChange={(value) => handleSettingChange('notifications', 'notifyOnNewUser', value)}
          label="New User Registration"
        />
        <ToggleSwitch
          checked={settings.notifications.notifyOnNewCourse}
          onChange={(value) => handleSettingChange('notifications', 'notifyOnNewCourse', value)}
          label="New Course Created"
        />
        <ToggleSwitch
          checked={settings.notifications.notifyOnCertificate}
          onChange={(value) => handleSettingChange('notifications', 'notifyOnCertificate', value)}
          label="Certificate Issued"
        />
        <ToggleSwitch
          checked={settings.notifications.notifyOnMentorAssignment}
          onChange={(value) => handleSettingChange('notifications', 'notifyOnMentorAssignment', value)}
          label="Mentor Assignment"
        />
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
          Digest Frequency
        </label>
        <select
          value={settings.notifications.digestFrequency}
          onChange={(e) => handleSettingChange('notifications', 'digestFrequency', e.target.value)}
          style={inputStyle}
        >
          <option value="immediate">Immediate</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2d3436', margin: 0 }}>
        Security Settings
      </h3>

      <div style={{ background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.3)', borderRadius: 10, padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <FaExclamationTriangle style={{ color: '#ffd32a' }} />
          <strong style={{ color: '#2d3436' }}>Security Notice</strong>
        </div>
        <p style={{ margin: 0, color: '#636e72' }}>
          Changes to security settings will affect all users. Please review carefully before saving.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Minimum Password Length
          </label>
          <input
            type="number"
            min="6"
            max="32"
            value={settings.security.passwordMinLength}
            onChange={(e) => handleSettingChange('security', 'passwordMinLength', parseInt(e.target.value))}
            style={inputStyle}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Session Timeout (minutes)
          </label>
          <input
            type="number"
            min="5"
            max="480"
            value={settings.security.sessionTimeout}
            onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
            style={inputStyle}
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
          Maximum Login Attempts
        </label>
        <input
          type="number"
          min="3"
          max="10"
          value={settings.security.maxLoginAttempts}
          onChange={(e) => handleSettingChange('security', 'maxLoginAttempts', parseInt(e.target.value))}
          style={inputStyle}
        />
      </div>

      <div style={{ border: '1px solid rgba(116,185,255,0.3)', borderRadius: 10, padding: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#2d3436' }}>Password Requirements</h4>
        <ToggleSwitch
          checked={settings.security.requireUppercase}
          onChange={(value) => handleSettingChange('security', 'requireUppercase', value)}
          label="Require Uppercase Letters"
        />
        <ToggleSwitch
          checked={settings.security.requireNumbers}
          onChange={(value) => handleSettingChange('security', 'requireNumbers', value)}
          label="Require Numbers"
        />
        <ToggleSwitch
          checked={settings.security.requireSpecialChars}
          onChange={(value) => handleSettingChange('security', 'requireSpecialChars', value)}
          label="Require Special Characters"
        />
      </div>

      <div style={{ border: '1px solid rgba(116,185,255,0.3)', borderRadius: 10, padding: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#2d3436' }}>Authentication</h4>
        <ToggleSwitch
          checked={settings.security.twoFactorAuth}
          onChange={(value) => handleSettingChange('security', 'twoFactorAuth', value)}
          label="Two-Factor Authentication"
        />
        <ToggleSwitch
          checked={settings.security.allowPasswordReset}
          onChange={(value) => handleSettingChange('security', 'allowPasswordReset', value)}
          label="Allow Password Reset"
        />
        <ToggleSwitch
          checked={settings.security.forcePasswordChange}
          onChange={(value) => handleSettingChange('security', 'forcePasswordChange', value)}
          label="Force Password Change on First Login"
        />
      </div>

      {/* Advanced Password Management */}
      <div style={{ 
        border: '1px solid rgba(116,185,255,0.3)', 
        borderRadius: 10, 
        padding: '1rem',
        background: 'rgba(100,108,255,0.05)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h4 style={{ margin: 0, color: '#2d3436', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FaLock />
            Advanced Password Management
          </h4>
          <button
            onClick={() => toggleCardExpansion('passwordManagement')}
            style={{
              background: 'none',
              border: 'none',
              color: '#646cff',
              cursor: 'pointer',
              fontSize: '1.2rem',
              transition: 'transform 0.3s ease'
            }}
          >
            <FaChevronRight style={{
              transform: expandedCards.passwordManagement ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.3s ease'
            }} />
          </button>
        </div>
        
        {expandedCards.passwordManagement && (
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div style={{ position: 'relative' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                  Admin Password
                </label>
                <input
                  type={showPasswordFields.adminPassword ? 'text' : 'password'}
                  placeholder="Enter new admin password"
                  style={{ ...inputStyle, paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('adminPassword')}
                  style={{
                    position: 'absolute',
                    right: '0.8rem',
                    top: '2.2rem',
                    background: 'none',
                    border: 'none',
                    color: '#636e72',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  {showPasswordFields.adminPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              
              <div style={{ position: 'relative' }}>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                  Confirm Password
                </label>
                <input
                  type={showPasswordFields.confirmPassword ? 'text' : 'password'}
                  placeholder="Confirm admin password"
                  style={{ ...inputStyle, paddingRight: '2.5rem' }}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirmPassword')}
                  style={{
                    position: 'absolute',
                    right: '0.8rem',
                    top: '2.2rem',
                    background: 'none',
                    border: 'none',
                    color: '#636e72',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  {showPasswordFields.confirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <button style={{
                ...buttonStyle,
                background: 'rgba(255,107,107,0.2)',
                color: '#ff6b6b',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaHistory />
                Password History
              </button>
              <button style={{
                ...buttonStyle,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <FaLock />
                Update Password
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderFeatureSettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2d3436', margin: 0 }}>
        Feature Settings
      </h3>

      <div style={{ border: '1px solid rgba(116,185,255,0.3)', borderRadius: 10, padding: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#2d3436' }}>Core Features</h4>
        <ToggleSwitch
          checked={settings.features.enableCertificates}
          onChange={(value) => handleSettingChange('features', 'enableCertificates', value)}
          label="Certificate System"
        />
        <ToggleSwitch
          checked={settings.features.enableMentorSystem}
          onChange={(value) => handleSettingChange('features', 'enableMentorSystem', value)}
          label="Mentor System"
        />
        <ToggleSwitch
          checked={settings.features.enableAnalytics}
          onChange={(value) => handleSettingChange('features', 'enableAnalytics', value)}
          label="Analytics Dashboard"
        />
      </div>

      <div style={{ border: '1px solid rgba(116,185,255,0.3)', borderRadius: 10, padding: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#2d3436' }}>Communication Features</h4>
        <ToggleSwitch
          checked={settings.features.enableForums}
          onChange={(value) => handleSettingChange('features', 'enableForums', value)}
          label="Discussion Forums"
        />
        <ToggleSwitch
          checked={settings.features.enableLiveChat}
          onChange={(value) => handleSettingChange('features', 'enableLiveChat', value)}
          label="Live Chat Support"
        />
        <ToggleSwitch
          checked={settings.features.enableVideoConferencing}
          onChange={(value) => handleSettingChange('features', 'enableVideoConferencing', value)}
          label="Video Conferencing"
        />
      </div>

      <div style={{ border: '1px solid rgba(116,185,255,0.3)', borderRadius: 10, padding: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#2d3436' }}>Additional Features</h4>
        <ToggleSwitch
          checked={settings.features.enableFileSharing}
          onChange={(value) => handleSettingChange('features', 'enableFileSharing', value)}
          label="File Sharing"
        />
        <ToggleSwitch
          checked={settings.features.enableMobileApp}
          onChange={(value) => handleSettingChange('features', 'enableMobileApp', value)}
          label="Mobile App Access"
        />
      </div>
    </div>
  );

  const renderAppearanceSettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2d3436', margin: 0 }}>
        Appearance Settings
      </h3>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
          Theme
        </label>
        <select
          value={settings.appearance.theme}
          onChange={(e) => handleSettingChange('appearance', 'theme', e.target.value)}
          style={inputStyle}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto (System)</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Primary Color
          </label>
          <input
            type="color"
            value={settings.appearance.primaryColor}
            onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
            style={{ ...inputStyle, height: '3rem' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Secondary Color
          </label>
          <input
            type="color"
            value={settings.appearance.secondaryColor}
            onChange={(e) => handleSettingChange('appearance', 'secondaryColor', e.target.value)}
            style={{ ...inputStyle, height: '3rem' }}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Logo URL
          </label>
          <input
            type="url"
            value={settings.appearance.logoUrl}
            onChange={(e) => handleSettingChange('appearance', 'logoUrl', e.target.value)}
            style={inputStyle}
            placeholder="https://example.com/logo.png"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Favicon URL
          </label>
          <input
            type="url"
            value={settings.appearance.faviconUrl}
            onChange={(e) => handleSettingChange('appearance', 'faviconUrl', e.target.value)}
            style={inputStyle}
            placeholder="https://example.com/favicon.ico"
          />
        </div>
      </div>

      <div>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
          Custom CSS
        </label>
        <textarea
          value={settings.appearance.customCSS}
          onChange={(e) => handleSettingChange('appearance', 'customCSS', e.target.value)}
          style={{ ...inputStyle, minHeight: '150px', fontFamily: 'monospace', fontSize: '0.9rem' }}
          placeholder="/* Add your custom CSS here */"
        />
      </div>
    </div>
  );

  const renderIntegrationSettings = () => (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2d3436', margin: 0 }}>
        Integration Settings
      </h3>

      <div style={{ border: '1px solid rgba(116,185,255,0.3)', borderRadius: 10, padding: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#2d3436' }}>Analytics & Marketing</h4>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Google Analytics Tracking ID
          </label>
          <input
            type="text"
            value={settings.integrations.googleAnalytics}
            onChange={(e) => handleSettingChange('integrations', 'googleAnalytics', e.target.value)}
            style={inputStyle}
            placeholder="UA-XXXXXXXXX-X"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Mailchimp API Key
          </label>
          <input
            type="text"
            value={settings.integrations.mailchimpApi}
            onChange={(e) => handleSettingChange('integrations', 'mailchimpApi', e.target.value)}
            style={inputStyle}
            placeholder="Enter Mailchimp API key"
          />
        </div>
      </div>

      <div style={{ border: '1px solid rgba(116,185,255,0.3)', borderRadius: 10, padding: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#2d3436' }}>Communication</h4>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Slack Webhook URL
          </label>
          <input
            type="url"
            value={settings.integrations.slackWebhook}
            onChange={(e) => handleSettingChange('integrations', 'slackWebhook', e.target.value)}
            style={inputStyle}
            placeholder="https://hooks.slack.com/services/..."
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Zoom API Key
          </label>
          <input
            type="text"
            value={settings.integrations.zoomApi}
            onChange={(e) => handleSettingChange('integrations', 'zoomApi', e.target.value)}
            style={inputStyle}
            placeholder="Enter Zoom API key"
          />
        </div>
      </div>

      <div style={{ border: '1px solid rgba(116,185,255,0.3)', borderRadius: 10, padding: '1rem' }}>
        <h4 style={{ margin: '0 0 1rem 0', color: '#2d3436' }}>Payment Processing</h4>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            PayPal API Key
          </label>
          <input
            type="text"
            value={settings.integrations.paypalApi}
            onChange={(e) => handleSettingChange('integrations', 'paypalApi', e.target.value)}
            style={inputStyle}
            placeholder="Enter PayPal API key"
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
            Stripe API Key
          </label>
          <input
            type="text"
            value={settings.integrations.stripeApi}
            onChange={(e) => handleSettingChange('integrations', 'stripeApi', e.target.value)}
            style={inputStyle}
            placeholder="Enter Stripe API key"
          />
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSettings();
      case 'notifications':
        return renderNotificationSettings();
      case 'security':
        return renderSecuritySettings();
      case 'features':
        return renderFeatureSettings();
      case 'appearance':
        return renderAppearanceSettings();
      case 'integrations':
        return renderIntegrationSettings();
      default:
        return renderGeneralSettings();
    }
  };

  return (
    <div style={containerStyle}>
      {/* Notification System */}
      {notifications.length > 0 && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem'
        }}>
          {notifications.map(notification => (
            <div
              key={notification.id}
              style={{
                background: notification.type === 'success' ? 'linear-gradient(90deg, #00b894, #00a085)' : 'linear-gradient(90deg, #ff6b6b, #ee5a52)',
                color: '#fff',
                padding: '0.8rem 1.2rem',
                borderRadius: 8,
                boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                minWidth: '300px',
                animation: 'slideIn 0.3s ease-out'
              }}
            >
              {notification.type === 'success' ? <FaCheck /> : <FaTimes />}
              <span>{notification.message}</span>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  marginLeft: 'auto',
                  fontSize: '0.9rem'
                }}
              >
                <FaTimes />
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#2d3436' }}>
                System Settings
              </h1>
              <p style={{ color: '#636e72', margin: '0.5rem 0 0 0', fontSize: '1.1rem' }}>
                Configure platform settings and preferences
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {unsavedChanges && (
                <span style={{ 
                  color: '#ffd32a', 
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <FaExclamationTriangle />
                  Unsaved Changes
                </span>
              )}
              <button 
                style={{
                  ...buttonStyle,
                  opacity: !unsavedChanges || isLoading ? 0.6 : 1,
                  cursor: !unsavedChanges || isLoading ? 'not-allowed' : 'pointer',
                  background: isLoading ? 'linear-gradient(90deg, #636e72, #636e72)' : buttonStyle.background
                }}
                onClick={handleSaveSettings}
                disabled={!unsavedChanges || isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-pulse" style={{ 
                      width: '1rem', 
                      height: '1rem', 
                      borderRadius: '50%', 
                      background: '#fff',
                      marginRight: '0.5rem'
                    }} />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave /> Save Settings
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '2rem' }}>
          {/* Sidebar */}
          <div style={cardStyle}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem', color: '#2d3436' }}>
              Settings Categories
            </h3>
            
            {/* Search Bar */}
            <div style={{ marginBottom: '1.5rem', position: 'relative' }}>
              <input
                type="text"
                placeholder="Search settings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  ...inputStyle,
                  paddingLeft: '2.5rem',
                  fontSize: '0.9rem'
                }}
              />
              <FaSearch style={{
                position: 'absolute',
                left: '0.8rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#636e72',
                fontSize: '0.9rem'
              }} />
            </div>

            <nav>
              {filteredSections.map(section => (
                <div
                  key={section.key}
                  onClick={() => setActiveSection(section.key)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.8rem',
                    padding: '1rem',
                    marginBottom: '0.5rem',
                    borderRadius: 10,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: activeSection === section.key ? 'rgba(100,108,255,0.1)' : 'transparent',
                    color: activeSection === section.key ? '#646cff' : '#636e72',
                    fontWeight: activeSection === section.key ? 700 : 600,
                    border: activeSection === section.key ? '2px solid rgba(100,108,255,0.3)' : '2px solid transparent'
                  }}
                >
                  <span style={{ fontSize: '1.1rem' }}>{section.icon}</span>
                  {section.label}
                  <FaChevronRight style={{
                    marginLeft: 'auto',
                    fontSize: '0.8rem',
                    opacity: 0.6,
                    transform: activeSection === section.key ? 'rotate(90deg)' : 'rotate(0deg)',
                    transition: 'transform 0.3s ease'
                  }} />
                </div>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div style={cardStyle}>
            {renderActiveSection()}
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              marginTop: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(116,185,255,0.3)'
            }}>
              <button
                style={{
                  ...buttonStyle,
                  background: 'rgba(255,107,107,0.2)',
                  color: '#ff6b6b'
                }}
                onClick={() => resetSection(activeSection)}
              >
                Reset Section
              </button>
              <button 
                style={{
                  ...buttonStyle,
                  opacity: !unsavedChanges || isLoading ? 0.6 : 1,
                  cursor: !unsavedChanges || isLoading ? 'not-allowed' : 'pointer',
                  background: isLoading ? 'linear-gradient(90deg, #636e72, #636e72)' : buttonStyle.background
                }}
                onClick={handleSaveSettings}
                disabled={!unsavedChanges || isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-pulse" style={{ 
                      width: '1rem', 
                      height: '1rem', 
                      borderRadius: '50%', 
                      background: '#fff',
                      marginRight: '0.5rem'
                    }} />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave /> Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
