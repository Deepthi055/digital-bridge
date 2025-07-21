import React, { useState, useEffect } from 'react';
import { 
  FaCertificate, 
  FaPlus, 
  FaEdit, 
  FaTrash, 
  FaEye,
  FaSearch,
  FaFilter,
  FaDownload,
  FaCheckSquare,
  FaSquare,
  FaPrint,
  FaBan,
  FaCalendarAlt,
  FaUser,
  FaBook,
  FaIdCard,
  FaTimes,
  FaFileExport
} from 'react-icons/fa';

const CertificatePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');
  const [courseFilter, setCourseFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');
  const [selectedCertificates, setSelectedCertificates] = useState([]);
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  const [previewingCertificate, setPreviewingCertificate] = useState(null);
  
  // Certificate form state
  const [certificateForm, setCertificateForm] = useState({
    studentName: '',
    studentEmail: '',
    courseName: '',
    certificateId: '',
    issueDate: new Date().toISOString().split('T')[0],
    completionDate: '',
    grade: '',
    template: 'default',
    status: 'Issued'
  });

  // Sample certificate data
  const [certificates, setCertificates] = useState([
    {
      id: 1,
      certificateId: 'CERT-2024-001',
      studentName: 'John Doe',
      studentEmail: 'john@example.com',
      courseName: 'Full Stack Web Development',
      issueDate: '2024-01-15',
      completionDate: '2024-01-10',
      status: 'Issued',
      grade: 'A',
      template: 'default',
      instructor: 'Dr. Sarah Johnson'
    },
    {
      id: 2,
      certificateId: 'CERT-2024-002',
      studentName: 'Jane Smith',
      studentEmail: 'jane@example.com',
      courseName: 'Data Science Fundamentals',
      issueDate: '2024-01-20',
      completionDate: '2024-01-18',
      status: 'Issued',
      grade: 'A+',
      template: 'premium',
      instructor: 'Prof. Mike Chen'
    },
    {
      id: 3,
      certificateId: 'CERT-2024-003',
      studentName: 'Bob Wilson',
      studentEmail: 'bob@example.com',
      courseName: 'Mobile App Development',
      issueDate: '2024-01-12',
      completionDate: '2024-01-08',
      status: 'Revoked',
      grade: 'B+',
      template: 'default',
      instructor: 'Emily Davis'
    },
    {
      id: 4,
      certificateId: 'CERT-2024-004',
      studentName: 'Alice Brown',
      studentEmail: 'alice@example.com',
      courseName: 'Machine Learning Basics',
      issueDate: '2024-01-25',
      completionDate: '2024-01-22',
      status: 'Issued',
      grade: 'A',
      template: 'modern',
      instructor: 'Dr. Alex Kumar'
    },
    {
      id: 5,
      certificateId: 'CERT-2024-005',
      studentName: 'Charlie Davis',
      studentEmail: 'charlie@example.com',
      courseName: 'Full Stack Web Development',
      issueDate: '2024-01-30',
      completionDate: '2024-01-28',
      status: 'Expired',
      grade: 'B',
      template: 'default',
      instructor: 'Dr. Sarah Johnson'
    }
  ]);

  // Available courses for dropdown
  const availableCourses = [
    'Full Stack Web Development',
    'Data Science Fundamentals',
    'Mobile App Development',
    'Machine Learning Basics',
    'Cloud Computing Essentials',
    'Cybersecurity Fundamentals'
  ];

  // Certificate templates
  const certificateTemplates = [
    { value: 'default', label: 'Default Template' },
    { value: 'premium', label: 'Premium Template' },
    { value: 'modern', label: 'Modern Template' },
    { value: 'classic', label: 'Classic Template' }
  ];

  // Generate unique certificate ID
  const generateCertificateId = () => {
    const year = new Date().getFullYear();
    const number = (certificates.length + 1).toString().padStart(3, '0');
    return `CERT-${year}-${number}`;
  };

  // Export functions
  const exportToCSV = (data, filename) => {
    const headers = ['Certificate ID', 'Student Name', 'Student Email', 'Course Name', 'Issue Date', 'Completion Date', 'Status', 'Grade', 'Template'];
    const csvContent = [
      headers.join(','),
      ...data.map(cert => [
        cert.certificateId,
        cert.studentName,
        cert.studentEmail,
        cert.courseName,
        cert.issueDate,
        cert.completionDate,
        cert.status,
        cert.grade,
        cert.template
      ].map(field => typeof field === 'string' && field.includes(',') ? `"${field}"` : field).join(','))
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

  const exportAllCertificates = () => {
    const filteredCerts = getFilteredCertificates();
    if (filteredCerts.length === 0) {
      alert('No certificates to export. Please adjust your filters.');
      return;
    }
    exportToCSV(filteredCerts, 'all_certificates_export');
    alert(`Successfully exported ${filteredCerts.length} certificates to CSV file.`);
  };

  const exportSelectedCertificates = () => {
    const selectedCerts = certificates.filter(cert => selectedCertificates.includes(cert.id));
    if (selectedCerts.length === 0) {
      alert('Please select certificates to export.');
      return;
    }
    exportToCSV(selectedCerts, 'selected_certificates_export');
    alert(`Successfully exported ${selectedCerts.length} selected certificates to CSV file.`);
  };

  // Filter functions
  const getFilteredCertificates = () => {
    return certificates.filter(cert => {
      const matchesSearch = cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || cert.status === statusFilter;
      const matchesCourse = courseFilter === 'All' || cert.courseName === courseFilter;
      
      let matchesDate = true;
      if (dateFilter !== 'All') {
        const issueDate = new Date(cert.issueDate);
        const now = new Date();
        const daysDiff = Math.floor((now - issueDate) / (1000 * 60 * 60 * 24));
        
        switch (dateFilter) {
          case 'Last 7 days':
            matchesDate = daysDiff <= 7;
            break;
          case 'Last 30 days':
            matchesDate = daysDiff <= 30;
            break;
          case 'Last 90 days':
            matchesDate = daysDiff <= 90;
            break;
          default:
            matchesDate = true;
        }
      }
      
      return matchesSearch && matchesStatus && matchesCourse && matchesDate;
    });
  };

  // CRUD Operations
  const handleIssueCertificate = () => {
    setEditingCertificate(null);
    setCertificateForm({
      studentName: '',
      studentEmail: '',
      courseName: '',
      certificateId: generateCertificateId(),
      issueDate: new Date().toISOString().split('T')[0],
      completionDate: '',
      grade: '',
      template: 'default',
      status: 'Issued'
    });
    setShowIssueModal(true);
  };

  const handleEditCertificate = (certificate) => {
    setEditingCertificate(certificate);
    setCertificateForm(certificate);
    setShowIssueModal(true);
  };

  const handleSaveCertificate = () => {
    if (!certificateForm.studentName || !certificateForm.courseName) {
      alert('Please fill in all required fields.');
      return;
    }

    if (editingCertificate) {
      // Update existing certificate
      setCertificates(certificates.map(cert => 
        cert.id === editingCertificate.id ? { ...certificateForm, id: editingCertificate.id } : cert
      ));
      alert('Certificate updated successfully!');
    } else {
      // Create new certificate
      const newCertificate = {
        ...certificateForm,
        id: Date.now()
      };
      setCertificates([...certificates, newCertificate]);
      alert('Certificate issued successfully!');
    }
    setShowIssueModal(false);
  };

  const handleRevokeCertificate = (certificateId) => {
    if (window.confirm('Are you sure you want to revoke this certificate? This action cannot be undone.')) {
      setCertificates(certificates.map(cert => 
        cert.id === certificateId ? { ...cert, status: 'Revoked' } : cert
      ));
      alert('Certificate revoked successfully.');
    }
  };

  const handleDeleteCertificate = (certificateId) => {
    if (window.confirm('Are you sure you want to delete this certificate? This action cannot be undone.')) {
      setCertificates(certificates.filter(cert => cert.id !== certificateId));
      alert('Certificate deleted successfully.');
    }
  };

  const handlePreviewCertificate = (certificate) => {
    setPreviewingCertificate(certificate);
    setShowPreviewModal(true);
  };

  // Selection functions
  const handleSelectAll = () => {
    const filteredCerts = getFilteredCertificates();
    if (selectedCertificates.length === filteredCerts.length) {
      setSelectedCertificates([]);
    } else {
      setSelectedCertificates(filteredCerts.map(cert => cert.id));
    }
  };

  const handleSelectCertificate = (certificateId) => {
    if (selectedCertificates.includes(certificateId)) {
      setSelectedCertificates(selectedCertificates.filter(id => id !== certificateId));
    } else {
      setSelectedCertificates([...selectedCertificates, certificateId]);
    }
  };

  const handleBulkRevoke = () => {
    if (selectedCertificates.length === 0) {
      alert('Please select certificates to revoke.');
      return;
    }
    
    if (window.confirm(`Are you sure you want to revoke ${selectedCertificates.length} selected certificates?`)) {
      setCertificates(certificates.map(cert => 
        selectedCertificates.includes(cert.id) ? { ...cert, status: 'Revoked' } : cert
      ));
      setSelectedCertificates([]);
      alert(`Successfully revoked ${selectedCertificates.length} certificates.`);
    }
  };

  const handleFormChange = (field, value) => {
    setCertificateForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Styles
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(120deg, #646cff 0%, #74b9ff 50%, #00cec9 100%)',
    padding: '2rem',
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

  const getStatusColor = (status) => {
    switch (status) {
      case 'Issued':
        return { bg: 'rgba(0,184,148,0.2)', color: '#00b894' };
      case 'Revoked':
        return { bg: 'rgba(255,107,107,0.2)', color: '#ff6b6b' };
      case 'Expired':
        return { bg: 'rgba(255,193,7,0.2)', color: '#ffd32a' };
      default:
        return { bg: 'rgba(116,185,255,0.2)', color: '#74b9ff' };
    }
  };

  const filteredCertificates = getFilteredCertificates();

  return (
    <div style={containerStyle}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: 900, margin: 0, color: '#2d3436', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <FaCertificate size={48} color="#646cff" />
                Certificate Management
              </h1>
              <p style={{ color: '#636e72', margin: '0.5rem 0 0 0', fontSize: '1.1rem' }}>
                Manage issued certificates, track completions, and handle certifications
              </p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <button style={buttonStyle} onClick={handleIssueCertificate}>
                <FaPlus /> Issue Certificate
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div style={cardStyle}>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 300px', minWidth: '250px' }}>
              <FaSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#74b9ff' }} />
              <input
                type="text"
                placeholder="Search by student name, course, or certificate ID..."
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
              <button 
                style={{ 
                  ...buttonStyle, 
                  background: 'rgba(0,184,148,0.2)', 
                  color: '#00b894',
                  whiteSpace: 'nowrap',
                  minWidth: 'auto'
                }}
                onClick={exportAllCertificates}
                title="Export all filtered certificates"
              >
                <FaDownload /> Export All
              </button>
              {selectedCertificates.length > 0 && (
                <button 
                  style={{ 
                    ...buttonStyle, 
                    background: 'rgba(255,193,7,0.2)', 
                    color: '#ffd32a',
                    whiteSpace: 'nowrap',
                    minWidth: 'auto'
                  }}
                  onClick={exportSelectedCertificates}
                  title="Export selected certificates"
                >
                  <FaFileExport /> Export Selected ({selectedCertificates.length})
                </button>
              )}
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
              alignItems: 'center',
              flexWrap: 'wrap'
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
                  <option value="Issued">Issued</option>
                  <option value="Revoked">Revoked</option>
                  <option value="Expired">Expired</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436', fontSize: '0.9rem' }}>
                  Course
                </label>
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid rgba(116,185,255,0.3)',
                    borderRadius: 6,
                    fontSize: '0.9rem',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="All">All Courses</option>
                  {availableCourses.map(course => (
                    <option key={course} value={course}>{course}</option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436', fontSize: '0.9rem' }}>
                  Issue Date
                </label>
                <select
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid rgba(116,185,255,0.3)',
                    borderRadius: 6,
                    fontSize: '0.9rem',
                    fontFamily: 'inherit'
                  }}
                >
                  <option value="All">All Dates</option>
                  <option value="Last 7 days">Last 7 days</option>
                  <option value="Last 30 days">Last 30 days</option>
                  <option value="Last 90 days">Last 90 days</option>
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
                  setCourseFilter('All');
                  setDateFilter('All');
                  setSearchTerm('');
                }}
              >
                Clear Filters
              </button>
            </div>
          )}

          {/* Bulk Actions */}
          {selectedCertificates.length > 0 && (
            <div style={{
              background: 'rgba(255,193,7,0.1)',
              padding: '1rem',
              borderRadius: 10,
              marginBottom: '1.5rem',
              display: 'flex',
              gap: '1rem',
              alignItems: 'center'
            }}>
              <span style={{ fontWeight: 600, color: '#2d3436' }}>
                {selectedCertificates.length} certificate(s) selected
              </span>
              <button
                style={{
                  ...buttonStyle,
                  background: 'rgba(255,107,107,0.2)',
                  color: '#ff6b6b',
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem'
                }}
                onClick={handleBulkRevoke}
              >
                <FaBan /> Bulk Revoke
              </button>
              <button
                style={{
                  ...buttonStyle,
                  background: 'rgba(116,185,255,0.2)',
                  color: '#646cff',
                  padding: '0.5rem 1rem',
                  fontSize: '0.85rem'
                }}
                onClick={() => setSelectedCertificates([])}
              >
                Clear Selection
              </button>
            </div>
          )}

          {/* Certificate Table */}
          <div style={{ overflowX: 'auto' }}>
            <table style={tableStyle}>
              <thead>
                <tr style={{ borderBottom: '2px solid rgba(116,185,255,0.3)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left' }}>
                    <button
                      onClick={handleSelectAll}
                      style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#74b9ff',
                        fontSize: '1.2rem'
                      }}
                      title="Select all"
                    >
                      {selectedCertificates.length === filteredCertificates.length && filteredCertificates.length > 0 ? 
                        <FaCheckSquare /> : <FaSquare />}
                    </button>
                  </th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Certificate ID</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Student Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Course Name</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Issue Date</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Grade</th>
                  <th style={{ padding: '1rem', textAlign: 'left', color: '#74b9ff', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '1rem', textAlign: 'center', color: '#74b9ff', fontWeight: 700 }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificates.map((certificate) => {
                  const statusColors = getStatusColor(certificate.status);
                  return (
                    <tr key={certificate.id} style={{ 
                      borderBottom: '1px solid rgba(116,185,255,0.2)',
                      background: selectedCertificates.includes(certificate.id) ? 'rgba(116,185,255,0.1)' : 'transparent'
                    }}>
                      <td style={{ padding: '1rem' }}>
                        <button
                          onClick={() => handleSelectCertificate(certificate.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: selectedCertificates.includes(certificate.id) ? '#646cff' : '#74b9ff',
                            fontSize: '1.2rem'
                          }}
                        >
                          {selectedCertificates.includes(certificate.id) ? <FaCheckSquare /> : <FaSquare />}
                        </button>
                      </td>
                      <td style={{ padding: '1rem', color: '#2d3436', fontWeight: 600 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FaIdCard color="#646cff" />
                          {certificate.certificateId}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', color: '#2d3436', fontWeight: 600 }}>
                        <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FaUser color="#00b894" />
                            {certificate.studentName}
                          </div>
                          <div style={{ fontSize: '0.8rem', color: '#636e72', marginTop: '0.2rem' }}>
                            {certificate.studentEmail}
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '1rem', color: '#636e72' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FaBook color="#74b9ff" />
                          {certificate.courseName}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', color: '#636e72' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <FaCalendarAlt color="#ffd32a" />
                          {certificate.issueDate}
                        </div>
                      </td>
                      <td style={{ padding: '1rem', color: '#636e72', fontWeight: 600 }}>
                        {certificate.grade}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        <span style={{
                          background: statusColors.bg,
                          color: statusColors.color,
                          padding: '0.3rem 0.8rem',
                          borderRadius: 15,
                          fontSize: '0.8rem',
                          fontWeight: 600
                        }}>
                          {certificate.status}
                        </span>
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                          <button 
                            style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(116,185,255,0.2)', color: '#646cff' }}
                            onClick={() => handlePreviewCertificate(certificate)}
                            title="Preview Certificate"
                          >
                            <FaEye />
                          </button>
                          <button 
                            style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(0,184,148,0.2)', color: '#00b894' }}
                            onClick={() => handleEditCertificate(certificate)}
                            title="Edit Certificate"
                          >
                            <FaEdit />
                          </button>
                          {certificate.status === 'Issued' && (
                            <button 
                              style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(255,193,7,0.2)', color: '#ffd32a' }}
                              onClick={() => handleRevokeCertificate(certificate.id)}
                              title="Revoke Certificate"
                            >
                              <FaBan />
                            </button>
                          )}
                          <button 
                            style={{ ...buttonStyle, padding: '0.5rem', background: 'rgba(255,107,107,0.2)', color: '#ff6b6b' }}
                            onClick={() => handleDeleteCertificate(certificate.id)}
                            title="Delete Certificate"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredCertificates.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#636e72',
              fontSize: '1.1rem'
            }}>
              <FaCertificate size={48} color="#74b9ff" style={{ marginBottom: '1rem' }} />
              <p>No certificates found matching your criteria.</p>
              <p>Try adjusting your search terms or filters.</p>
            </div>
          )}
        </div>

        {/* Issue/Edit Certificate Modal */}
        {showIssueModal && (
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2d3436', margin: 0 }}>
                  {editingCertificate ? 'Edit Certificate' : 'Issue New Certificate'}
                </h3>
                <button
                  onClick={() => setShowIssueModal(false)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.5rem',
                    color: '#636e72',
                    cursor: 'pointer'
                  }}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                      Student Name *
                    </label>
                    <input
                      type="text"
                      value={certificateForm.studentName}
                      onChange={(e) => handleFormChange('studentName', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid rgba(116,185,255,0.3)',
                        borderRadius: 8,
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box'
                      }}
                      placeholder="Enter student full name"
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                      Student Email *
                    </label>
                    <input
                      type="email"
                      value={certificateForm.studentEmail}
                      onChange={(e) => handleFormChange('studentEmail', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid rgba(116,185,255,0.3)',
                        borderRadius: 8,
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box'
                      }}
                      placeholder="Enter student email"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                      Course Name *
                    </label>
                    <select
                      value={certificateForm.courseName}
                      onChange={(e) => handleFormChange('courseName', e.target.value)}
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
                      <option value="">Select a course</option>
                      {availableCourses.map(course => (
                        <option key={course} value={course}>{course}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                      Certificate ID
                    </label>
                    <input
                      type="text"
                      value={certificateForm.certificateId}
                      onChange={(e) => handleFormChange('certificateId', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid rgba(116,185,255,0.3)',
                        borderRadius: 8,
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box'
                      }}
                      placeholder="Auto-generated"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                      Completion Date
                    </label>
                    <input
                      type="date"
                      value={certificateForm.completionDate}
                      onChange={(e) => handleFormChange('completionDate', e.target.value)}
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

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                      Issue Date
                    </label>
                    <input
                      type="date"
                      value={certificateForm.issueDate}
                      onChange={(e) => handleFormChange('issueDate', e.target.value)}
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

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                      Grade
                    </label>
                    <input
                      type="text"
                      value={certificateForm.grade}
                      onChange={(e) => handleFormChange('grade', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.8rem',
                        border: '2px solid rgba(116,185,255,0.3)',
                        borderRadius: 8,
                        fontSize: '1rem',
                        fontFamily: 'inherit',
                        boxSizing: 'border-box'
                      }}
                      placeholder="e.g., A, B+, 95%"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                      Template
                    </label>
                    <select
                      value={certificateForm.template}
                      onChange={(e) => handleFormChange('template', e.target.value)}
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
                      {certificateTemplates.map(template => (
                        <option key={template.value} value={template.value}>{template.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: '#2d3436' }}>
                      Status
                    </label>
                    <select
                      value={certificateForm.status}
                      onChange={(e) => handleFormChange('status', e.target.value)}
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
                      <option value="Issued">Issued</option>
                      <option value="Revoked">Revoked</option>
                      <option value="Expired">Expired</option>
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
                  onClick={() => setShowIssueModal(false)}
                >
                  Cancel
                </button>
                <button
                  style={buttonStyle}
                  onClick={handleSaveCertificate}
                  disabled={!certificateForm.studentName || !certificateForm.courseName}
                >
                  {editingCertificate ? 'Update Certificate' : 'Issue Certificate'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Certificate Preview Modal */}
        {showPreviewModal && previewingCertificate && (
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
              maxWidth: '800px',
              maxHeight: '90vh',
              overflow: 'auto',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#2d3436', margin: 0 }}>
                  Certificate Preview
                </h3>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    style={{
                      ...buttonStyle,
                      background: 'rgba(0,184,148,0.2)',
                      color: '#00b894',
                      padding: '0.5rem 1rem'
                    }}
                  >
                    <FaPrint /> Print
                  </button>
                  <button
                    style={{
                      ...buttonStyle,
                      background: 'rgba(116,185,255,0.2)',
                      color: '#646cff',
                      padding: '0.5rem 1rem'
                    }}
                  >
                    <FaDownload /> Download PDF
                  </button>
                  <button
                    onClick={() => setShowPreviewModal(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: '1.5rem',
                      color: '#636e72',
                      cursor: 'pointer'
                    }}
                  >
                    <FaTimes />
                  </button>
                </div>
              </div>
              
              {/* Certificate Preview */}
              <div style={{
                border: '3px solid #646cff',
                borderRadius: 15,
                padding: '3rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%)',
                position: 'relative',
                minHeight: '400px'
              }}>
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(100,108,255,0.1)',
                  padding: '0.5rem 1rem',
                  borderRadius: 8,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: '#646cff'
                }}>
                  {previewingCertificate.certificateId}
                </div>
                
                <FaCertificate size={64} color="#646cff" style={{ marginBottom: '2rem' }} />
                
                <h1 style={{
                  fontSize: '2.5rem',
                  fontWeight: 900,
                  color: '#2d3436',
                  marginBottom: '1rem',
                  fontFamily: 'serif'
                }}>
                  Certificate of Completion
                </h1>
                
                <p style={{
                  fontSize: '1.2rem',
                  color: '#636e72',
                  marginBottom: '2rem'
                }}>
                  This is to certify that
                </p>
                
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: '#646cff',
                  marginBottom: '1rem',
                  borderBottom: '2px solid #646cff',
                  display: 'inline-block',
                  paddingBottom: '0.5rem'
                }}>
                  {previewingCertificate.studentName}
                </h2>
                
                <p style={{
                  fontSize: '1.2rem',
                  color: '#636e72',
                  marginBottom: '1rem'
                }}>
                  has successfully completed the course
                </p>
                
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#2d3436',
                  marginBottom: '2rem'
                }}>
                  {previewingCertificate.courseName}
                </h3>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '3rem',
                  borderTop: '1px solid rgba(116,185,255,0.3)',
                  paddingTop: '2rem'
                }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#636e72' }}>Issue Date</p>
                    <p style={{ margin: 0, fontWeight: 600, color: '#2d3436' }}>{previewingCertificate.issueDate}</p>
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#636e72' }}>Grade</p>
                    <p style={{ margin: 0, fontWeight: 600, color: '#2d3436' }}>{previewingCertificate.grade}</p>
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#636e72' }}>Template</p>
                    <p style={{ margin: 0, fontWeight: 600, color: '#2d3436' }}>
                      {certificateTemplates.find(t => t.value === previewingCertificate.template)?.label}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Hover Styles */}
        <style>{`
          button:hover {
            transform: translateY(-2px) !important;
            box-shadow: 0 8px 25px rgba(100,108,255,0.4) !important;
          }
          
          table tr:hover {
            background: rgba(116,185,255,0.1) !important;
          }
          
          input:focus, select:focus {
            outline: none;
            border-color: #646cff !important;
            box-shadow: 0 0 0 3px rgba(100,108,255,0.1) !important;
          }
        `}</style>
      </div>
    </div>
  );
};

export default CertificatePage;
