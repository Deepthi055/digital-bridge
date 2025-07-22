import React, { useState } from 'react';
import { FaLifeRing, FaQuestionCircle, FaEnvelope, FaPhone, FaComments } from 'react-icons/fa';

const faqs = [
  {
    question: "How do I add a new course to my mentored list?",
    answer: "Navigate to the 'Course Management' section. There you will find options to add or assign new courses to yourself or your mentees."
  },
  {
    question: "Can I track the individual progress of my mentees?",
    answer: "Yes, go to the 'My Mentees' section. Click on a specific mentee's card to view their detailed progress, assignments, and activities."
  },
  {
    question: "How do I provide feedback on a submitted assignment?",
    answer: "In the 'Assignments Review' section, locate the assignment you wish to review. Click on the 'Feedback' button to enter grades and comments."
  },
  {
    question: "Where can I find resources for professional development as a mentor?",
    answer: "The 'Resource Library' contains various materials, including articles, webinars, and guides, to help you enhance your mentoring skills."
  },
  {
    question: "What should I do if a mentee is unresponsive?",
    answer: "First, try reaching out through the platform's messaging system. If there's no response, you might need to escalate the issue through the support channels mentioned below."
  },
];

const MentorHelpAndSupport = () => {
  const [openFaq, setOpenFaq] = useState(null); // State to manage which FAQ is open

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div style={{ padding: '2rem', background: '#f8fafc', borderRadius: '18px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
      <h1 style={{ color: '#00b894', marginBottom: '1.5rem', fontSize: '2rem', fontWeight: '800' }}>
        <FaLifeRing style={{ marginRight: '10px' }} />Mentor Help & Support
      </h1>

      {/* FAQs Section */}
      <div style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', padding: '25px', marginBottom: '30px' }}>
        <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaQuestionCircle color="#646cff" />Frequently Asked Questions
        </h2>
        {faqs.map((faq, index) => (
          <div key={index} style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
            <button
              onClick={() => toggleFaq(index)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: '10px 0',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                color: '#00b894',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {faq.question}
              <span>{openFaq === index ? '-' : '+'}</span>
            </button>
            {openFaq === index && (
              <p style={{ marginTop: '10px', color: '#555', lineHeight: '1.6' }}>{faq.answer}</p>
            )}
          </div>
        ))}
      </div>

      {/* Contact Support Section */}
      <div style={{ background: '#fff', borderRadius: '15px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', padding: '25px' }}>
        <h2 style={{ color: '#333', fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FaComments color="#e74c3c" />Contact Support
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#555', fontSize: '1.1rem' }}>
            <FaEnvelope color="#2980b9" size={24} />
            Email: <a href="mailto:support@digitalbridge.com" style={{ color: '#00b894', textDecoration: 'none', fontWeight: 'bold' }}>support@digitalbridge.com</a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#555', fontSize: '1.1rem' }}>
            <FaPhone color="#27ae60" size={24} />
            Phone: <a href="tel:+1-800-123-4567" style={{ color: '#00b894', textDecoration: 'none', fontWeight: 'bold' }}>+1-800-123-4567</a> (Mon-Fri, 9 AM - 5 PM IST)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#555', fontSize: '1.1rem' }}>
            <FaComments color="#f39c12" size={24} />
            Live Chat: Available on our website during business hours.
          </div>
        </div>
        <button
          onClick={() => alert('Opening a new support ticket form.')}
          style={{
            marginTop: '30px',
            padding: '12px 25px',
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
          Submit a Support Ticket
        </button>
      </div>
    </div>
  );
};

export default MentorHelpAndSupport;