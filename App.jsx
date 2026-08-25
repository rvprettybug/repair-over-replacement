import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ProtectedRoute from './components/ProtectedRoute'

import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import FindRepairer from './pages/FindRepairer'
import RepairerProfile from './pages/RepairerProfile'
import RepairRequest from './pages/RepairRequest'
import CostEstimator from './pages/CostEstimator'
import MyRepairs from './pages/MyRepairs'
import Chat from './pages/Chat'
import SpareParts from './pages/SpareParts'
import PartDetails from './pages/PartDetails'
import Cart from './pages/Cart'
import CustomerDashboard from './pages/CustomerDashboard'
import RepairerDashboard from './pages/RepairerDashboard'
import AdminDashboard from './pages/AdminDashboard'
import EcoImpact from './pages/EcoImpact'
import SearchResults from './pages/SearchResults'
import HowItWorks from './pages/HowItWorks'
import { About, Contact, Help, Privacy, Terms } from './pages/InfoPages'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/find-repairer" element={<FindRepairer />} />
        <Route path="/repairer/:id" element={<RepairerProfile />} />
        <Route path="/estimate" element={<CostEstimator />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/eco-impact" element={<EcoImpact />} />
        <Route path="/search" element={<SearchResults />} />

        <Route path="/spare-parts" element={<SpareParts />} />
        <Route path="/spare-parts/:id" element={<PartDetails />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/help" element={<Help />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />

        <Route path="/repair-request" element={<ProtectedRoute><RepairRequest /></ProtectedRoute>} />
        <Route path="/my-repairs" element={<ProtectedRoute><MyRepairs /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />
        <Route path="/repairer-dashboard" element={<ProtectedRoute role="repairer"><RepairerDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <p className="font-display text-6xl font-bold text-emerald-600">404</p>
      <h1 className="font-display text-2xl font-semibold text-ink-900 dark:text-cream-50 mt-2">Page not found</h1>
      <p className="text-ink-700/60 dark:text-cream-300/60 mt-2">The page you're looking for doesn't exist.</p>
    </div>
  )
}
