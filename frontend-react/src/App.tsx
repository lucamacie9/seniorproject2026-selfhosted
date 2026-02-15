import { Routes, Route } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import DashboardPage from './pages/DashboardPage'
import MatchPage from './pages/MatchPage'
import InstitutionsPage from './pages/InstitutionsPage'
import ProgramsPage from './pages/ProgramsPage'
import AboutPage from './pages/AboutPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="match" element={<MatchPage />} />
        <Route path="institutions" element={<InstitutionsPage />} />
        <Route path="programs" element={<ProgramsPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}

export default App
