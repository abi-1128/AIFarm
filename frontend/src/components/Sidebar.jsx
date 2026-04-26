import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sprout, 
  MessageSquare, 
  ShoppingBag, 
  ShieldCheck, 
  Settings, 
  LogOut,
  Users,
  BarChart3,
  Landmark
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ role }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const landownerLinks = [
    { to: '/farmer', icon: LayoutDashboard, label: 'Overview' },
    { to: '/farmer/recommendation', icon: Sprout, label: 'AI Optimizer' },
    { to: '/farmer/advisory', icon: ShieldCheck, label: 'Smart Advisory' },
    { to: '/farmer/marketplace', icon: ShoppingBag, label: 'Marketplace' },
    { to: '/farmer/schemes', icon: Landmark, label: 'Govt Schemes' },
    { to: '/farmer/chat', icon: MessageSquare, label: 'AI Mentor' },
  ];

  const buyerLinks = [
    { to: '/buyer', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/buyer/marketplace', icon: ShoppingBag, label: 'Browse Market' },
    { to: '/buyer/chat', icon: MessageSquare, label: 'AI Support' },
  ];

  const adminLinks = [
    { to: '/admin', icon: BarChart3, label: 'System Overview' },
    { to: '/admin/users', icon: Users, label: 'User Nodes' },
    { to: '/admin/marketplace', icon: ShieldCheck, label: 'Audit Hub' },
    { to: '/admin/settings', icon: Settings, label: 'Core Config' },
  ];

  const links = role === 'ADMIN' ? adminLinks : role === 'BUYER' ? buyerLinks : landownerLinks;

  return (
    <aside className="sidebar">
      <div className="flex items-center gap-3 mb-12 px-2">
        <div className="w-10 h-10 bg-[#2D6A4F] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#2D6A4F44]">
          <Sprout size={24} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-[#1B4332]">
          AI<span className="text-[#2D6A4F]">Farm</span>
        </h1>
      </div>

      <nav className="flex-1 space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
            end={link.to === '/farmer' || link.to === '/buyer' || link.to === '/admin'}
          >
            <link.icon />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-[#D8F3DC]">
        <button 
          onClick={handleLogout}
          className="sidebar-link w-full text-red-600 hover:bg-red-50 hover:text-red-700 btn-logout"
        >
          <LogOut />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
