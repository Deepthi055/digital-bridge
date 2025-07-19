import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import AdminPanel from './pages/Dashboard/AdminPanel';
import CourseDetails from './pages/CourseDetails';

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/dashboard/student" element={<StudentDashboard />} />
                <Route path="/dashboard/admin" element={<AdminPanel />} />

                <Route path="/course/:courseId" element={<CourseDetails />} />
                {/* Add more routes here as you build more pages */}
            </Routes>
    </Router>
  );
}

export default App;
