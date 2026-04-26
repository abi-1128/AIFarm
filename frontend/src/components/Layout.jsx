import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Sidebar from './Sidebar';
import ThreeDBackground from './ThreeDBackground';

const Layout = () => {
  const { user } = useAuth();
  
  return (
    <div className="dashboard-layout relative">
      <ThreeDBackground type="dashboard" />
      <Sidebar user={user} role={user?.role} />
      
      <main className="main-content relative z-10">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
