
import React, { useState, useRef, useEffect } from 'react';

const mentors = [
  {
    name: 'Dr. Priya Sharma',
    expertise: 'Mathematics, Study Motivation',
    avatar: '🧑‍🏫',
    bio: 'PhD in Mathematics, 10+ years mentoring students. Loves helping learners rediscover their spark!'
  },
  {
    name: 'Mr. Rahul Verma',
    expertise: 'Digital Marketing, Career Guidance',
    avatar: '👨‍💼',
    bio: 'Industry expert in digital marketing. Passionate about guiding students to real-world success.'
  },
  {
    name: 'Ms. Ananya Singh',
    expertise: 'English Communication, Soft Skills',
    avatar: '👩‍🎓',
    bio: 'Soft skills coach, TEDx speaker. Here to boost your confidence and communication!'
  }
];

const aiReplies = [
  'That’s a great question! Here’s what I suggest...',
  'Let’s break this down together. Can you tell me more?',
  'I recommend setting a small, achievable goal for today.',
  'Remember, progress is progress, no matter how small!',
  'Would you like a resource or a motivational tip?'
];

function MentorConnect() {
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [...prev, { sender: 'user', text: input }]);
    setInput('');
    setTimeout(() => {
      const reply = aiReplies[Math.floor(Math.random() * aiReplies.length)];
      setMessages(prev => [...prev, { sender: 'mentor', text: reply }]);
    }, 900);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #a8c0ff 0%, #f8fafc 100%)', padding: '2.5rem 0' }}>
      <div style={{ maxWidth: 900, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #646cff22', padding: '2.5rem 2rem', minHeight: 500 }}>
        <h1 style={{ color: '#646cff', fontWeight: 900, fontSize: '2.1rem', marginBottom: 18, letterSpacing: 1 }}>Mentor Connect <span style={{ fontSize: 28 }}>🤝</span></h1>
        <p style={{ color: '#333', fontSize: 17, marginBottom: 28 }}>Get guidance from expert mentors or chat with our AI mentor for instant support.</p>

        {!selectedMentor ? (
          <>
            <h2 style={{ color: '#00b894', fontWeight: 800, fontSize: '1.2rem', marginBottom: 16 }}>Recommended Mentors</h2>
            <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', marginBottom: 32 }}>
              {mentors.map((mentor, idx) => (
                <div key={idx} style={{ background: '#f8fafc', borderRadius: 14, boxShadow: '0 2px 8px #646cff11', padding: '1.2rem 1rem', minWidth: 220, maxWidth: 240, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', border: '2px solid #e0e0e0', cursor: 'pointer', transition: 'box-shadow 0.2s, border 0.2s' }} onClick={() => setSelectedMentor(mentor)}>
                  <span style={{ fontSize: 38, marginBottom: 8 }}>{mentor.avatar}</span>
                  <div style={{ color: '#646cff', fontWeight: 700, fontSize: 17, marginBottom: 4 }}>{mentor.name}</div>
                  <div style={{ color: '#00b894', fontSize: 14, marginBottom: 6 }}>{mentor.expertise}</div>
                  <div style={{ color: '#333', fontSize: 13, textAlign: 'center', marginBottom: 0 }}>{mentor.bio}</div>
                  <button style={{ marginTop: 12, background: 'linear-gradient(90deg, #646cff 60%, #00b894 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 18px', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 8px #646cff22' }}>Chat</button>
                </div>
              ))}
            </div>
            <div style={{ color: '#888', fontSize: 15, marginTop: 18, textAlign: 'center' }}>Or try our <span style={{ color: '#646cff', fontWeight: 700 }}>AI Mentor</span> for instant answers!</div>
            <button style={{ margin: '18px auto 0 auto', display: 'block', background: 'linear-gradient(90deg, #00b894 60%, #646cff 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 32px', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 8px #00b89433' }} onClick={() => setSelectedMentor({ name: 'AI Mentor', avatar: '🤖', expertise: 'All Subjects', bio: 'I am your friendly AI mentor, here 24/7 for your questions!' })}>Chat with AI Mentor</button>
          </>
        ) : (
          <>
            <button onClick={() => { setSelectedMentor(null); setMessages([]); }} style={{ background: 'none', border: 'none', color: '#646cff', fontWeight: 700, fontSize: 15, marginBottom: 18, cursor: 'pointer' }}>{'< Back to Mentors'}</button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
              <span style={{ fontSize: 34 }}>{selectedMentor.avatar}</span>
              <div>
                <div style={{ color: '#646cff', fontWeight: 700, fontSize: 18 }}>{selectedMentor.name}</div>
                <div style={{ color: '#00b894', fontSize: 14 }}>{selectedMentor.expertise}</div>
              </div>
            </div>
            <div style={{ background: '#f8fafc', borderRadius: 12, boxShadow: '0 2px 8px #646cff11', padding: '1.2rem 1rem', minHeight: 220, maxHeight: 260, overflowY: 'auto', marginBottom: 18 }}>
              {messages.length === 0 && (
                <div style={{ color: '#888', fontSize: 15, textAlign: 'center', marginTop: 40 }}>Say hello or ask a question to start chatting!</div>
              )}
              {messages.map((msg, idx) => (
                <div key={idx} style={{ marginBottom: 10, display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    background: msg.sender === 'user' ? 'linear-gradient(90deg, #646cff 60%, #00b894 100%)' : '#fff',
                    color: msg.sender === 'user' ? '#fff' : '#222',
                    borderRadius: 10,
                    padding: '7px 13px',
                    maxWidth: 220,
                    fontSize: 15,
                    boxShadow: msg.sender === 'user' ? '0 2px 8px #646cff22' : '0 1px 4px #00b89411',
                    alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
            <form style={{ display: 'flex', gap: 8 }} onSubmit={e => { e.preventDefault(); handleSend(); }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                style={{ flex: 1, border: '1px solid #e0e0e0', borderRadius: 8, padding: '8px 12px', fontSize: 15 }}
              />
              <button type="submit" style={{ background: 'linear-gradient(90deg, #646cff 60%, #00b894 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '0 16px', fontSize: 18, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Send
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default MentorConnect;

