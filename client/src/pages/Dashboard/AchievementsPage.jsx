import React from 'react';

// AchievementsPanel and LeaderboardPanel are reused from AssignmentTasksPage
import AssignmentTasksPage from '../Toolkit/AssignmentTasksPage';

// Extract the panels from AssignmentTasksPage for reuse
function AchievementsPanel({ achievements, streak, badges }) {
  return (
    <div style={{ minWidth: 340, maxWidth: 420, display: 'flex', flexDirection: 'column', gap: 22, flex: '0 0 380px' }}>
      {/* Achievements Card */}
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #00b89411', padding: '1.3rem 1.5rem' }}>
        <div style={{ color: '#00b894', fontWeight: 800, fontSize: 18, marginBottom: 14 }}>Achievements</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {achievements.map((a, idx) => (
            <div key={idx} style={{ background: '#f8fafc', borderRadius: 10, padding: '10px 16px', fontWeight: 700, color: '#646cff', fontSize: 16, boxShadow: '0 1px 4px #646cff11', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }}>{a.icon}</span> <span style={{ color: '#232b4e', fontWeight: 700 }}>{a.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Streak Card */}
      <div style={{ background: '#fff7e6', borderRadius: 16, boxShadow: '0 1px 6px #FFD70022', padding: '1.3rem 1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 2 }}>
          <span style={{ fontSize: 26, color: '#FF9800' }}>🔥</span>
          <span style={{ color: '#FF9800', fontWeight: 900, fontSize: 18 }}>Current Streak</span>
        </div>
        <div style={{ color: '#232b4e', fontWeight: 800, fontSize: 16, marginBottom: 2 }}>{streak} days</div>
        <div style={{ width: '100%', height: 10, background: '#ffe0b2', borderRadius: 6, overflow: 'hidden' }}>
          <div style={{ width: `${Math.min(streak, 30) * 3.33}%`, height: 10, background: 'linear-gradient(90deg, #FF9800 60%, #FFD700 100%)', borderRadius: 6, transition: 'width 0.4s' }}></div>
        </div>
        <div style={{ color: '#FF9800', fontWeight: 700, fontSize: 13, marginTop: 2 }}>Keep it up!</div>
      </div>
      {/* Badges Card */}
      <div style={{ background: '#f8fafc', borderRadius: 16, boxShadow: '0 1px 6px #646cff11', padding: '1.3rem 1.5rem' }}>
        <div style={{ color: '#646cff', fontWeight: 800, fontSize: 16, marginBottom: 6 }}>Badges</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {badges.map((b, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, minWidth: 54 }}>
              <span style={{ fontSize: 28, color: b.color, filter: 'drop-shadow(0 1px 2px #646cff22)' }}>{b.icon}</span>
              <span style={{ color: '#232b4e', fontWeight: 700, fontSize: 13, textAlign: 'center' }}>{b.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Analysis Graph Card */}
      <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #00b89411', padding: '1.3rem 1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
        <div style={{ color: '#00b894', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>Analysis Graph</div>
        {/* Simple SVG line chart placeholder */}
        <svg width="100%" height="80" viewBox="0 0 260 80" style={{ maxWidth: '100%', background: '#f8fafc', borderRadius: 8 }}>
          <polyline
            fill="none"
            stroke="#646cff"
            strokeWidth="4"
            points="0,70 30,60 60,65 90,40 120,50 150,30 180,35 210,20 240,30 260,10"
          />
          <circle cx="260" cy="10" r="5" fill="#00b894" />
        </svg>
        <div style={{ color: '#888', fontWeight: 600, fontSize: 13 }}>Your weekly progress</div>
      </div>
    </div>
  );
}

function LeaderboardPanel({ leaderboard }) {
  // Top 3 users for podium
  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);
  const medalColors = ['#FFD700', '#C0C0C0', '#CD7F32'];
  const placeLabels = ['1st', '2nd', '3rd'];
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {/* Podium */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 28, marginBottom: 28, width: '100%' }}>
          {top3.map((entry, idx) => (
            <div key={idx} style={{
              background: 'linear-gradient(120deg, #646cff 60%, #00b894 100%)',
              borderRadius: 18,
              boxShadow: `0 4px 24px ${medalColors[idx]}33`,
              padding: idx === 1 ? '2.2rem 2.2rem 2.7rem 2.2rem' : '1.5rem 1.2rem 2.2rem 1.2rem',
              minWidth: 140,
              minHeight: idx === 1 ? 190 : 150,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end',
              position: 'relative',
              zIndex: 2,
              border: `4px solid ${medalColors[idx]}`,
              marginTop: idx === 1 ? 0 : 40,
              transition: 'all 0.2s',
            }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10, boxShadow: '0 2px 12px #232b4e22' }}>
                <span style={{ fontSize: 38, color: '#232b4e' }}>👤</span>
              </div>
              <div style={{ color: '#fff', fontWeight: 900, fontSize: 22, marginBottom: 4, textAlign: 'center' }}>{entry.name.replace(' (You)', '')}</div>
              <div style={{ color: medalColors[idx], fontWeight: 900, fontSize: 19, marginBottom: 2 }}>{placeLabels[idx]}</div>
              <div style={{ color: '#fff', fontWeight: 700, fontSize: 16, marginBottom: 2 }}>Score</div>
              <div style={{ color: '#FFD700', fontWeight: 900, fontSize: 28 }}>{entry.score}</div>
            </div>
          ))}
        </div>
        {/* Rest of leaderboard as list */}
        <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #646cff22', padding: '1.2rem 1.2rem', minWidth: 260, maxWidth: 340, width: '100%' }}>
          {rest.map((entry, idx) => (
            <div key={idx + 3} style={{
              display: 'flex', alignItems: 'center', gap: 18, padding: '0.7rem 0', borderBottom: idx !== rest.length - 1 ? '1px solid #e0e0e0' : 'none',
              background: entry.name.includes('(You)') ? 'rgba(0,184,148,0.10)' : 'none',
              borderRadius: 10,
              fontWeight: entry.name.includes('(You)') ? 900 : 700,
              color: entry.name.includes('(You)') ? '#00b894' : '#232b4e',
            }}>
              <div style={{ width: 32, textAlign: 'center', fontWeight: 900, fontSize: 18 }}>{idx + 4}</div>
              <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: 22, color: '#232b4e' }}>👤</span>
              </div>
              <div style={{ flex: 1, minWidth: 0, fontWeight: 800, fontSize: 16 }}>{entry.name}</div>
              <div style={{ fontWeight: 900, fontSize: 18, color: '#FFD700', minWidth: 50, textAlign: 'right' }}>{entry.score}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Focus Time Bar Graph Card */}
      <FocusTimeBarGraph />
    </>
  );
}

// Focus Time Bar Graph Card (right bottom)
function FocusTimeBarGraph() {
  // Example data: hours focused per day
  const data = [2, 3.5, 1, 4, 2.5, 5, 3];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const max = Math.max(...data, 6);
  return (
    <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #00b89411', padding: '1.3rem 1.5rem', marginTop: 24, minWidth: 380, maxWidth: 520, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 10 }}>
      <div style={{ color: '#646cff', fontWeight: 800, fontSize: 17, marginBottom: 8 }}>Focus Time (hrs)</div>
      <svg width="100%" height="150" viewBox="0 0 350 150" style={{ maxWidth: '100%' }}>
        {data.map((val, i) => (
          <g key={i}>
            <rect
              x={i * 45 + 20}
              y={120 - (val / max) * 90}
              width={28}
              height={(val / max) * 90}
              rx={7}
              fill="#00b894"
              style={{ filter: 'drop-shadow(0 1px 4px #00b89422)' }}
            />
            <text x={i * 45 + 34} y={138} textAnchor="middle" fontSize="14" fill="#888">{days[i]}</text>
            <text x={i * 45 + 34} y={120 - (val / max) * 90 - 8} textAnchor="middle" fontSize="15" fontWeight="bold" fill="#646cff">{val}</text>
          </g>
        ))}
      </svg>
      <div style={{ color: '#888', fontWeight: 600, fontSize: 14 }}>Last 7 days focus</div>
    </div>
  );
}


const initialAchievements = [
  { icon: '🏅', label: 'First Assignment Completed' },
  { icon: '⏰', label: 'On-Time Submission' },
  { icon: '💯', label: '100% Score in Quiz' }
];

const userStreak = 7; // Example: 7-day streak

const userBadges = [
  { icon: '🌟', label: 'Star Performer', color: '#FFD700' },
  { icon: '🚀', label: 'Fast Starter', color: '#00b894' },
  { icon: '📚', label: 'Quiz Master', color: '#646cff' },
  { icon: '🧠', label: 'Consistent Learner', color: '#ff9800' },
];

const initialLeaderboard = [
  { name: 'Alex (You)', score: 95 },
  { name: 'Priya', score: 92 },
  { name: 'Rahul', score: 88 },
  { name: 'Sara', score: 85 },
  { name: 'John', score: 80 }
];

export default function AchievementsPage() {
  return (
    <div style={{
      background: 'linear-gradient(120deg, #eafcff 0%, #f8fafc 100%)',
      borderRadius: 20,
      boxShadow: '0 6px 32px #646cff22',
      padding: '3.2rem 2.2rem 3.2rem 2.2rem',
      marginBottom: 32,
      minHeight: 700,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      maxWidth: 1300,
      margin: '0 auto',
    }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 120, height: 120, background: 'radial-gradient(circle at 80% 20%, #646cff22 60%, transparent 100%)', zIndex: 0 }} />
      <h2 style={{ color: '#646cff', fontWeight: 900, fontSize: '2.1rem', marginBottom: 8, letterSpacing: 1, zIndex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span role="img" aria-label="achievements">🏆</span> Achievements & Leaderboard
      </h2>
      <p style={{ color: '#333', fontSize: 17, marginBottom: 28, zIndex: 1 }}>See your achievements and how you rank among your peers!</p>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 56,
        width: '100%',
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        minHeight: 520
      }}>
        <AchievementsPanel achievements={initialAchievements} streak={userStreak} badges={userBadges} />
        <div style={{ flex: 1, minWidth: 340, maxWidth: 600, display: 'flex', flexDirection: 'column', gap: 18 }}>
          <LeaderboardPanel leaderboard={initialLeaderboard} />
        </div>
      </div>
    </div>
  );
}
