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

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0f0d]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2ECC71]"></div>
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
  if (!user) return <Navigate to="/login" />;
  
  switch (user.role) {
    case 'LANDOWNER':
      return <Navigate to="/farmer" />;
    case 'BUYER':
      return <Navigate to="/buyer" />;
    case 'ADMIN':
      return <Navigate to="/admin" />;
    default:
      return <Navigate to="/login" />;
  }
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          <Route path="/" element={<DashboardRedirect />} />

          {/* Landowner Routes */}
          <Route element={
            <ProtectedRoute allowedRoles={['LANDOWNER']}>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="/farmer" element={<LandownerDashboard />} />
            <Route path="/farmer/recommendation" element={<Recommendation />} />
            <Route path="/farmer/chat" element={<Chat />} />
            <Route path="/farmer/marketplace" element={<Marketplace />} />
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
