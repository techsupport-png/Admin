import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import useAuthStore from './store/authStore'
import SessionMonitor from './components/shared/SessionMonitor'
import AdminLayout from './layouts/AdminLayout'
import CollegeLayout from './layouts/CollegeLayout'
import FranchiseLayout from './layouts/FranchiseLayout'
import StudentLayout from './layouts/StudentLayout'
import LoginPage from './pages/auth/LoginPage'
import AdminDashboard from './pages/admin/Dashboard'
import AdminColleges from './pages/admin/Colleges'
import AdminApplications from './pages/admin/Applications'
import AdminStudents from './pages/admin/Students'
import AdminAnalytics from './pages/admin/Analytics'
import AdminSettings from './pages/admin/Settings'
import CollegeDashboard from './pages/college/Dashboard'
import FranchiseDashboard from './pages/franchise/Dashboard'
import StudentDashboard from './pages/student/Dashboard'

const App: React.FC = () => {
  const { user } = useAuthStore()

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <SessionMonitor />
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="colleges" element={<AdminColleges />} />
          <Route path="applications" element={<AdminApplications />} />
          <Route path="students" element={<AdminStudents />} />
          <Route path="analytics" element={<AdminAnalytics />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

        <Route path="/college" element={<CollegeLayout />}>
          <Route index element={<CollegeDashboard />} />
        </Route>

        <Route path="/franchise" element={<FranchiseLayout />}>
          <Route index element={<FranchiseDashboard />} />
        </Route>

        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<StudentDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to={`/${user.role}`} replace />} />
      </Routes>
    </Suspense>
  )
}

export default App