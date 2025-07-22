import React, { useState } from 'react';
import { FaBookOpen, FaSearch, FaFilePdf, FaVideo, FaLink, FaLightbulb, FaEye } from 'react-icons/fa';

const mockResources = [
  {
    id: 1,
    title: 'Advanced Mentoring Techniques Handbook',
    category: 'Mentoring Skills',
    type: 'PDF',
    description: 'A comprehensive guide to effective mentoring strategies and communication.',
    link: '#', // Placeholder link
    icon: <FaFilePdf color="#e74c3c" />,
  },
  {
    id: 2,
    title: 'Curriculum Development Guide for Mentors',
    category: 'Course Development',
    type: 'PDF',
    description: 'Learn how to create structured and engaging learning paths for your mentees.',
    link: '#',
    icon: <FaFilePdf color="#e74c3c" />,
  },
  {
    id: 3,
    title: 'Webinar: Effective Feedback Delivery',
    category: 'Mentoring Skills',
    type: 'Video',
    description: 'Watch this webinar to master the art of constructive feedback.',
    link: '#',
    icon: <FaVideo color="#c0392b" />,
  },
  {
    id: 4,
    title: 'Time Management for Mentees',
    category: 'Mentee Support',
    type: 'Link',
    description: 'An external article on helping mentees manage their time effectively.',
    link: '#',
    icon: <FaLink color="#2980b9" />,
  },
  {
    id: 5,
    title: 'Guide to Setting SMART Goals',
    category: 'Mentee Support',
    type: 'PDF',
    description: 'A printable guide to teach your mentees how to set Specific, Measurable, Achievable, Relevant, and Time-bound goals.',
    link: '#',
    icon: <FaFilePdf color="#e74c3c" />,
  },
  {
    id: 6,
    title: 'Dealing with Mentee Challenges',
    category: 'Mentoring Skills',
    type: 'Link',
    description: 'Resources and strategies for handling common mentee challenges and roadblocks.',
    link: '#',
    icon: <FaLink color="#2980b9" />,
  },
];

const MentorResourceLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterType, setFilterType] = useState('All');

  const allCategories = ['All', ...new Set(mockResources.map(res => res.category))];
  const allTypes = ['All', ...new Set(mockResources.map(res => res.type))];

  const filteredResources = mockResources
    .filter(resource =>
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(resource => filterCategory === 'All' || resource.category === filterCategory)
    .filter(resource => filterType === 'All' || resource.type === filterType);

  return (
    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '18px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h1 style={{ color: '#00b894', marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '800' }}>
        <FaBookOpen style={{ marginRight: '10px' }} />Mentor Resource Library
      </h1>

      {/* Filter and Search Controls */}
      <div style={{ marginBottom: '1.5rem', display: 'flex', flexWrap: 'wrap', gap: '15px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            flex: '1 1 280px',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1rem',
          }}
        />

        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{
            flex: '0 0 auto',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            minWidth: '150px',
          }}
        >
          {allCategories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          style={{
            flex: '0 0 auto',
            padding: '10px 15px',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '1rem',
            minWidth: '120px',
          }}
        >
          {allTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {/* Resources List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
        {filteredResources.length === 0 ? (
          <div style={{ textAlign: 'center', gridColumn: '1 / -1', color: '#666', fontSize: '1.1rem', padding: '20px' }}>
            No resources found matching your criteria.
          </div>
        ) : (
          filteredResources.map(resource => (
            <div
              key={resource.id}
              style={{
                background: '#ffffff',
                borderRadius: '15px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: '5px solid #646cff', // Consistent color
                transition: 'transform 0.2s ease-in-out',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '10px' }}>
                  <span style={{ fontSize: '1.8rem' }}>{resource.icon}</span>
                  <h3 style={{ margin: 0, color: '#333', fontSize: '1.3rem' }}>{resource.title}</h3>
                </div>
                <p style={{ margin: '0 0 8px 0', color: '#555', fontSize: '0.95rem' }}>
                  <span style={{ fontWeight: 'bold' }}>Category:</span> {resource.category}
                </p>
                <p style={{ margin: '0 0 15px 0', color: '#666', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  {resource.description}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                <a
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '8px 15px',
                    background: 'linear-gradient(45deg, #646cff, #4a54d6)',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(100,108,255,0.2)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    textDecoration: 'none', // Remove underline from link
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 12px rgba(100,108,255,0.4)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(100,108,255,0.2)'}
                >
                  <FaEye /> View Resource
                </a>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MentorResourceLibrary;