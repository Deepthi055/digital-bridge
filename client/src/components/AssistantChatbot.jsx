import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane } from 'react-icons/fa';

const initialMessages = [
  { sender: 'bot', text: 'Hi! I am your Study Assistant. How can I help you today?' }
];

const suggestions = [
  'How do I stay motivated?',
  'Suggest a learning plan for this week.',
  'Tips to manage my time better.',
  'How do I earn more certificates?',
  'What should I do if I feel stuck in a course?'
];

function AssistantChatbot() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [show, setShow] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (show && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, show]);

  const handleSend = (msg) => {
    const userMsg = msg || input.trim();
    if (!userMsg) return;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      setMessages((prev) => [...prev, { sender: 'bot', text: getBotReply(userMsg) }]);
    }, 700);
  };

  const getBotReply = (msg) => {
    msg = msg.toLowerCase();
    if (msg.includes('motivat')) return 'Staying motivated is about setting small, achievable goals and celebrating progress! Try our Dropout Toolkit for more tips.';
    if (msg.includes('plan')) return 'A weekly plan can help! Set aside 15-30 minutes daily for learning. Want a sample plan?';
    if (msg.includes('time')) return 'Time management is key! Use our Toolkit’s Time Management feature to organize your study sessions.';
    if (msg.includes('certificate')) return 'Complete courses and quizzes to earn certificates. Check the Certificates section for your progress!';
    if (msg.includes('stuck')) return 'It’s normal to feel stuck. Try revisiting previous lessons, or reach out to a mentor via Mentor Connect.';
    if (msg.includes('hello') || msg.includes('hi')) return 'Hello! How can I assist you with your learning journey today?';
    return 'I am here to help with study tips, motivation, and using the platform. Try asking about motivation, planning, or certificates!';
  };

  return (
    <div style={{ position: 'fixed', bottom: 32, right: 32, zIndex: 1000 }}>
      {show ? (
        <div style={{ width: 340, background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px #646cff44', padding: 0, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ background: 'linear-gradient(90deg, #646cff 60%, #00b894 100%)', color: '#fff', padding: '1rem 1.2rem', fontWeight: 800, fontSize: 18, display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Cute face in header */}
            <span style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'linear-gradient(145deg, #f8fafc 70%, #eafcff 100%)',
              boxShadow: '0 2px 8px #646cff22',
              border: '1.5px solid #b0c4de',
              position: 'relative',
            }}>
              {/* Antenna */}
              <span style={{
                position: 'absolute',
                top: -8,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 4,
                height: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}>
                <span style={{ width: 2, height: 6, background: '#b0c4de', borderRadius: 2 }} />
                <span style={{ width: 6, height: 6, background: '#00b894', borderRadius: '50%', marginTop: -2, border: '1px solid #b0c4de' }} />
              </span>
              {/* Eyes */}
              <span style={{ display: 'flex', gap: 4, marginTop: 8 }}>
                <span className="chatbot-eye" style={{
                  width: 5, height: 5, borderRadius: '50%', background: '#646cff', display: 'inline-block',
                  border: '1px solid #b0c4de',
                  animation: 'blink 2.8s infinite',
                }} />
                <span className="chatbot-eye" style={{
                  width: 5, height: 5, borderRadius: '50%', background: '#00b894', display: 'inline-block',
                  border: '1px solid #b0c4de',
                  animation: 'blink 3.1s infinite',
                }} />
              </span>
              {/* Smile (robot mouth) */}
              <span style={{
                display: 'block',
                width: 14,
                height: 6,
                borderBottom: '2px solid #b0c4de',
                borderRadius: '0 0 8px 8px',
                marginTop: 2,
                position: 'relative',
              }}>
                {/* Chin */}
                <span style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: -3,
                  transform: 'translateX(-50%)',
                  width: 6,
                  height: 3,
                  background: '#b0c4de',
                  borderRadius: '0 0 4px 4px',
                  opacity: 0.5,
                }} />
              </span>
            </span>
            Study Assistant
            <span style={{ flex: 1 }} />
            <button onClick={() => setShow(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', fontWeight: 700, marginLeft: 8 }}>&times;</button>
            <style>{`
              @keyframes blink {
                0%, 90%, 100% { transform: scaleY(1); }
                92%, 98% { transform: scaleY(0.2); }
              }
            `}</style>
          </div>
          <div style={{ flex: 1, maxHeight: 320, overflowY: 'auto', padding: '1rem 1.2rem', background: '#f8fafc' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ marginBottom: 10, display: 'flex', justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  background: msg.sender === 'user' ? 'linear-gradient(90deg, #646cff 60%, #00b894 100%)' : '#eafcff',
                  color: msg.sender === 'user' ? '#fff' : '#222',
                  borderRadius: 12,
                  padding: '8px 14px',
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
          <div style={{ padding: '0.7rem 1.2rem', background: '#f8fafc', borderTop: '1px solid #e0e0e0' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
              {suggestions.map((s, i) => (
                <button key={i} style={{ background: '#eafcff', color: '#646cff', border: 'none', borderRadius: 8, padding: '4px 10px', fontSize: 13, cursor: 'pointer', marginBottom: 4 }} onClick={() => handleSend(s)}>{s}</button>
              ))}
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
                <FaPaperPlane />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShow(true)}
          style={{
            background: 'linear-gradient(90deg, #646cff 60%, #00b894 100%)',
            border: 'none',
            borderRadius: '50%',
            width: 68,
            height: 68,
            boxShadow: '0 4px 18px #646cff44',
            fontSize: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
          aria-label="Open Assistant Chatbot"
        >
          {/* Cute robot face with antenna and chin */}
          <span style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'linear-gradient(145deg, #f8fafc 70%, #eafcff 100%)',
            boxShadow: '0 2px 8px #646cff22',
            border: '2.5px solid #b0c4de',
            position: 'relative',
          }}>
            {/* Antenna */}
            <span style={{
              position: 'absolute',
              top: -12,
              left: '50%',
              transform: 'translateX(-50%)',
              width: 6,
              height: 14,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}>
              <span style={{ width: 3, height: 8, background: '#b0c4de', borderRadius: 2 }} />
              <span style={{ width: 8, height: 8, background: '#00b894', borderRadius: '50%', marginTop: -2, border: '1.5px solid #b0c4de' }} />
            </span>
            {/* Eyes */}
            <span style={{ display: 'flex', gap: 7, marginTop: 14 }}>
              <span className="chatbot-eye" style={{
                width: 8, height: 8, borderRadius: '50%', background: '#646cff', display: 'inline-block',
                border: '1.5px solid #b0c4de',
                animation: 'blink 2.8s infinite',
              }} />
              <span className="chatbot-eye" style={{
                width: 8, height: 8, borderRadius: '50%', background: '#00b894', display: 'inline-block',
                border: '1.5px solid #b0c4de',
                animation: 'blink 3.1s infinite',
              }} />
            </span>
            {/* Smile (robot mouth) */}
            <span style={{
              display: 'block',
              width: 22,
              height: 10,
              borderBottom: '3px solid #b0c4de',
              borderRadius: '0 0 12px 12px',
              marginTop: 4,
              position: 'relative',
            }}>
              {/* Chin */}
              <span style={{
                position: 'absolute',
                left: '50%',
                bottom: -4,
                transform: 'translateX(-50%)',
                width: 10,
                height: 4,
                background: '#b0c4de',
                borderRadius: '0 0 6px 6px',
                opacity: 0.5,
              }} />
            </span>
          </span>
          {/* Keyframes for blinking eyes */}
          <style>{`
            @keyframes blink {
              0%, 90%, 100% { transform: scaleY(1); }
              92%, 98% { transform: scaleY(0.2); }
            }
          `}</style>
        </button>
      )}
    </div>
  );
}

export default AssistantChatbot;
