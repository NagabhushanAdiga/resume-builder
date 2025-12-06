import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ResumeProvider } from './context/ResumeContext'
import PrivateRoute from './components/PrivateRoute'
// import Login from './pages/Login' // COMMENTED OUT: Login feature
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Templates from './pages/Templates'
import ResumeEditor from './pages/ResumeEditor'
import ResumePreview from './pages/ResumePreview'

function App() {
  return (
    <AuthProvider>
      <ResumeProvider>
        <Router>
          <Routes>
            {/* COMMENTED OUT: Login route - uncomment when login feature is enabled */}
            {/* <Route path="/login" element={<Login />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } />
            <Route path="/templates" element={
              <PrivateRoute>
                <Templates />
              </PrivateRoute>
            } />
            <Route path="/editor/:id?" element={
              <PrivateRoute>
                <ResumeEditor />
              </PrivateRoute>
            } />
            <Route path="/preview/:id" element={
              <PrivateRoute>
                <ResumePreview />
              </PrivateRoute>
            } />
            <Route path="/" element={<Navigate to="/templates" replace />} />
          </Routes>
        </Router>
      </ResumeProvider>
    </AuthProvider>
  )
}

export default App

