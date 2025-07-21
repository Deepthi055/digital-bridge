import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import MentorConnect from './pages/MentorConnect';
import StudentDashboard from './pages/Dashboard/StudentDashboard';
import AchievementsPage from './pages/Dashboard/AchievementsPage';
import DashboardLayout from './pages/Dashboard/DashboardLayout';
import DropoutToolkit from './pages/Toolkit/DropoutToolkit';
import ResumeBuilder from './pages/Toolkit/ResumeBuilder';
import TimeManagement from './pages/Toolkit/TimeManagement';
import AdminPanel from './pages/Dashboard/AdminPanel';
import CourseDetails from './pages/CourseDetails';
import MentorDashboard from './pages/Dashboard/MentorDashboard';

function App() {
  return (
    <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route element={<DashboardLayout />}>
                  <Route path="/dashboard/student" element={<StudentDashboard />} />
                  <Route path="/achievements" element={<AchievementsPage />} />
                </Route>
                <Route path="/dashboard/admin" element={<AdminPanel />} />
                <Route path="/dashboard/mentor" element={<MentorDashboard />} />
                <Route path="/course/:courseId" element={<CourseDetails />} />
                <Route path="/dropout-toolkit" element={<DropoutToolkit />} />
                <Route path="/dropout-toolkit/resume" element={<ResumeBuilder />} />
                <Route path="/dropout-toolkit/time-management" element={<TimeManagement />} />
                <Route path="/mentor-connect" element={<MentorConnect />} />
                {/* Add more routes here as you build more pages */}
            </Routes>
    </Router>
  );
}

export default App;
