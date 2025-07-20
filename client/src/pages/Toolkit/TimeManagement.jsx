
import React, { useState, useRef } from 'react';


const TimeManagement = () => {
  // To-Do List State
  const [tasks, setTasks] = React.useState([]);
  const [taskInput, setTaskInput] = React.useState('');

  // Calendar State (simple event list)
  const [events, setEvents] = React.useState([]);
  const [eventInput, setEventInput] = React.useState('');
  const [eventDate, setEventDate] = React.useState('');

  // Pomodoro State
  const [pomodoro, setPomodoro] = React.useState(25 * 60); // 25 min
  const [isRunning, setIsRunning] = React.useState(false);
  const [sessions, setSessions] = React.useState(0);
  const timerRef = React.useRef();

  // To-Do List Handlers
  const addTask = () => {
    if (taskInput.trim()) {
      setTasks([...tasks, { text: taskInput, done: false }]);
      setTaskInput('');
    }
  };
  const toggleTask = idx => {
    setTasks(tasks.map((t, i) => i === idx ? { ...t, done: !t.done } : t));
  };
  const deleteTask = idx => {
    setTasks(tasks.filter((_, i) => i !== idx));
  };

  // Calendar Handlers
  const addEvent = () => {
    if (eventInput.trim() && eventDate) {
      setEvents([...events, { text: eventInput, date: eventDate }]);
      setEventInput('');
      setEventDate('');
    }
  };
  const deleteEvent = idx => {
    setEvents(events.filter((_, i) => i !== idx));
  };

  // Pomodoro Handlers
  React.useEffect(() => {
    if (isRunning && pomodoro > 0) {
      timerRef.current = setTimeout(() => setPomodoro(pomodoro - 1), 1000);
    } else if (pomodoro === 0) {
      setSessions(sessions + 1);
      setIsRunning(false);
      setPomodoro(25 * 60);
      alert('Pomodoro session complete! Take a break.');
    }
    return () => clearTimeout(timerRef.current);
  }, [isRunning, pomodoro]);

  const startPomodoro = () => setIsRunning(true);
  const pausePomodoro = () => setIsRunning(false);
  const resetPomodoro = () => { setIsRunning(false); setPomodoro(25 * 60); };

  // Format timer
  const formatTime = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '2.5rem 2rem', background: 'linear-gradient(120deg, #f8fafc 0%, #eafcff 100%)', borderRadius: 24, boxShadow: '0 6px 32px #00b89422' }}>
      <a href="/dropout-toolkit" style={{ background: 'linear-gradient(90deg, #646cff 60%, #00b894 100%)', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 28px', fontWeight: 700, fontSize: 17, marginBottom: 28, cursor: 'pointer', textDecoration: 'none', display: 'inline-block', boxShadow: '0 2px 8px #646cff33', letterSpacing: 1, transition: 'background 0.2s' }}>← Back to Toolkit</a>
      <h2 style={{ color: '#00b894', fontWeight: 900, fontSize: '2.2rem', marginBottom: 24, letterSpacing: 1, textAlign: 'center' }}>Time Management Tools</h2>
      <style>{`
        @media (max-width: 1200px) {
          .tm-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 900px) {
          .tm-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div className="tm-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 32, alignItems: 'stretch' }}>
        {/* To-Do List */}
        {/* To-Do List as Notebook */}
        <div style={{
          background: 'repeating-linear-gradient(180deg, #fff, #fff 28px, #e3f6f5 29px, #fff 30px)',
          borderRadius: 16,
          boxShadow: '0 2px 8px #00b89422',
          padding: 24,
          minHeight: 340,
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          borderLeft: '8px solid #00b894',
          position: 'relative',
        }}>
          <h3 style={{ color: '#00b894', fontWeight: 800, fontSize: 20, marginBottom: 12 }}>To-Do List</h3>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <input value={taskInput} onChange={e => setTaskInput(e.target.value)} placeholder="Add a task..." style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
            <button onClick={addTask} style={{ background: '#00b894', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 700, cursor: 'pointer' }}>Add</button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {tasks.map((task, idx) => (
              <li key={idx} style={{ display: 'flex', alignItems: 'center', marginBottom: 6 }}>
                <input type="checkbox" checked={task.done} onChange={() => toggleTask(idx)} style={{ marginRight: 8 }} />
                <span style={{ textDecoration: task.done ? 'line-through' : 'none', flex: 1 }}>{task.text}</span>
                <button onClick={() => deleteTask(idx)} style={{ marginLeft: 8, background: '#eee', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer', color: '#00b894', fontWeight: 700 }}>×</button>
              </li>
            ))}
          </ul>
        </div>
        {/* Calendar/Planner */}
        {/* Calendar as Calendar Sheet */}
        <div style={{
          background: 'repeating-linear-gradient(180deg, #f8fafc, #f8fafc 38px, #eafcff 39px, #f8fafc 40px), repeating-linear-gradient(90deg, #eafcff, #eafcff 39px, #f8fafc 40px, #f8fafc 80px)',
          borderRadius: 18,
          boxShadow: '0 4px 18px #646cff33',
          padding: 24,
          minHeight: 340,
          height: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}>
          <div style={{
            position: 'sticky',
            top: 0,
            left: 0,
            width: '100%',
            height: 38,
            background: 'linear-gradient(90deg, #646cff 80%, #00b894 100%)',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            fontWeight: 900,
            fontSize: 18,
            letterSpacing: 2,
            zIndex: 2,
            marginBottom: 10,
            boxShadow: '0 2px 8px #646cff33',
          }}>
            <span style={{ marginRight: 10, fontSize: 22, display: 'inline-block', verticalAlign: 'middle' }}>📅</span>
            CALENDAR
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, marginTop: 8 }}>
            <input type="date" value={eventDate} onChange={e => setEventDate(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
            <input value={eventInput} onChange={e => setEventInput(e.target.value)} placeholder="Event description..." style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #ccc' }} />
            <button onClick={addEvent} style={{ background: '#00b894', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 700, cursor: 'pointer' }}>Add</button>
          </div>
          <ul style={{ listStyle: 'none', padding: 0, marginTop: 8 }}>
            {events.map((event, idx) => (
              <li key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                marginBottom: 8,
                borderRadius: 8,
                background: '#fff',
                boxShadow: '0 1px 4px #646cff11',
                border: '1px solid #eafcff',
                padding: '8px 10px',
                transition: 'box-shadow 0.18s, border 0.18s',
                cursor: 'pointer',
                position: 'relative',
                gap: 8,
                fontSize: 15,
                fontWeight: 500,
                ':hover': {
                  boxShadow: '0 2px 8px #646cff33',
                  border: '1.5px solid #646cff',
                },
              }}>
                <span style={{ marginRight: 8, color: '#646cff', fontWeight: 700, minWidth: 80, textAlign: 'center', fontVariantNumeric: 'tabular-nums' }}>{event.date}</span>
                <span style={{ flex: 1 }}>{event.text}</span>
                <button onClick={() => deleteEvent(idx)} style={{ marginLeft: 8, background: '#eee', border: 'none', borderRadius: 4, padding: '2px 8px', cursor: 'pointer', color: '#00b894', fontWeight: 700 }}>×</button>
              </li>
            ))}
          </ul>
        </div>
        {/* Pomodoro Timer */}
        {/* Pomodoro as Clock */}
        <div style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 8px #00b89422',
          padding: 24,
          minHeight: 340,
          height: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
          <h3 style={{ color: '#00b894', fontWeight: 800, fontSize: 20, marginBottom: 12 }}>Pomodoro Timer</h3>
          <div style={{
            width: 110,
            height: 110,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 60% 40%, #eafcff 60%, #646cff 100%)',
            border: '6px solid #646cff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '18px 0 12px 0',
            fontSize: 28,
            fontWeight: 900,
            color: '#646cff',
            boxShadow: '0 2px 12px #646cff22',
            position: 'relative',
            zIndex: 1,
            userSelect: 'none',
          }}>{formatTime(pomodoro)}</div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 10 }}>
            <button onClick={startPomodoro} disabled={isRunning} style={{ background: '#646cff', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 700, cursor: isRunning ? 'not-allowed' : 'pointer' }}>Start</button>
            <button onClick={pausePomodoro} disabled={!isRunning} style={{ background: '#ffb347', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 700, cursor: !isRunning ? 'not-allowed' : 'pointer' }}>Pause</button>
            <button onClick={resetPomodoro} style={{ background: '#00b894', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 700, cursor: 'pointer' }}>Reset</button>
          </div>
          <div style={{ color: '#333', fontSize: 15 }}>Sessions completed: <strong>{sessions}</strong></div>
        </div>
      </div>
    </div>
  );
};

export default TimeManagement;
