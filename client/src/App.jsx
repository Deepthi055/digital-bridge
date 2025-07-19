import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import StudentDashboard from './pages/Dashboard/StudentDashboard';

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard/student" element={<StudentDashboard />} />
                {/* Add more routes here as you build more pages */}
            </Routes>
    </Router>
  );
}

export default App;
