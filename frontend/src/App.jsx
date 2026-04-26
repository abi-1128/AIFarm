import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/Layout';
import LandownerDashboard from './pages/LandownerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Recommendation from './pages/Recommendation';
import Chat from './pages/Chat';
import Marketplace from './pages/Marketplace';
import AddLand from './pages/AddLand';

import LandingPage from './pages/LandingPage';

import Schemes from './pages/Schemes';
import GrowthProtocol from './pages/GrowthProtocol';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF9]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D6A4F]"></div>
      </div>
    );
  }

  if (!user) return <Navigate to="/login" />;
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <LandingPage />;
  
  switch (user.role) {
    case 'LANDOWNER':
      return <Navigate to="/farmer" />;
    case 'BUYER':
      return <Navigate to="/buyer" />;
    case 'ADMIN':
      return <Navigate to="/admin" />;
    default:
      return <LandingPage />;
  }
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<DashboardRedirect />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Landowner Routes */}
          <Route element={
            <ProtectedRoute allowedRoles={['LANDOWNER']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/farmer" element={<LandownerDashboard />} />
            <Route path="/farmer/add-land" element={<AddLand />} />
            <Route path="/farmer/recommendation" element={<Recommendation />} />
            <Route path="/farmer/advisory" element={<GrowthProtocol />} />
            <Route path="/farmer/marketplace" element={<Marketplace />} />
            <Route path="/farmer/schemes" element={<Schemes />} />
            <Route path="/farmer/chat" element={<Chat />} />
          </Route>



          {/* Buyer Routes */}
          <Route element={
            <ProtectedRoute allowedRoles={['BUYER']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/buyer" element={<BuyerDashboard />} />
            <Route path="/buyer/marketplace" element={<Marketplace />} />
          </Route>

          {/* Admin Routes */}
          <Route element={
            <ProtectedRoute allowedRoles={['ADMIN']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
