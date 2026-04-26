import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import DashboardHeader from '../components/DashboardHeader';
import { 
  Users, 
  ShieldCheck, 
  BarChart3, 
  Activity, 
  Search, 
  MoreVertical, 
  UserCheck, 
  UserX, 
  TrendingUp, 
  Globe,
  Database,
  Lock,
  ArrowUpRight,
  Filter
} from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeModule, setActiveModule] = useState('overview');
  const [users, setUsers] = useState([
    { id: 1, name: 'Rajesh Kumar', username: 'farmer_raj', role: 'LANDOWNER', status: 'ACTIVE', joined: '2024-03-20' },
    { id: 2, name: 'David Smith', username: 'buyer_dev', role: 'BUYER', status: 'ACTIVE', joined: '2024-03-22' },
    { id: 3, name: 'Vikram Singh', username: 'vik_agro', role: 'LANDOWNER', status: 'INACTIVE', joined: '2024-03-25' },
    { id: 4, name: 'Sarah Jones', username: 'sj_bulk', role: 'BUYER', status: 'ACTIVE', joined: '2024-03-28' },
  ]);

  const stats = [
    { label: 'Total Users', value: '12,402', trend: '+14%', positive: true, icon: Users },
    { label: 'Active Trades', value: '₹2.4 Cr', trend: '+22%', positive: true, icon: TrendingUp },
    { label: 'API Health', value: '99.9%', trend: 'Stable', positive: true, icon: Activity },
    { label: 'Security Alerts', value: '0', trend: 'Secure', positive: true, icon: ShieldCheck }
  ];

  return (
    <>
      <DashboardHeader title="System Administration" user={user} />

      {/* Admin Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((s, i) => (
          <div key={i} className="glass-card p-6 flex items-center gap-6">
            <div className="w-14 h-14 bg-[#F8FAF9] rounded-2xl flex items-center justify-center text-[#2D6A4F] border border-[#D8F3DC]">
              <s.icon size={28} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#52796F] uppercase tracking-widest mb-1">{s.label}</p>
              <h4 className="text-2xl font-bold text-[#1B4332]">{s.value}</h4>
              <p className={`text-[10px] font-bold ${s.positive ? 'text-green-600' : 'text-red-600'}`}>
                {s.trend}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* User Management Table */}
        <div className="lg:col-span-8 space-y-8">
          <div className="glass-card overflow-hidden">
            <div className="p-8 border-b border-[#D8F3DC] flex flex-col md:row justify-between items-center gap-6">
              <h3 className="text-xl font-bold">User Nodes Management</h3>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52796F]" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search UID, Name..." 
                    className="w-full pl-12 pr-4 py-2 bg-[#F8FAF9] border border-[#D8F3DC] rounded-xl focus:border-[#2D6A4F] outline-none"
                  />
                </div>
                <button className="p-2 border border-[#D8F3DC] rounded-xl text-[#52796F] hover:bg-[#F8FAF9]">
                  <Filter size={20} />
                </button>
              </div>
            </div>
            
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#F8FAF9] text-[10px] font-bold text-[#52796F] uppercase tracking-widest">
                  <th className="p-6">User Identity</th>
                  <th className="p-6">Role</th>
                  <th className="p-6">Status</th>
                  <th className="p-6">Joined</th>
                  <th className="p-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8F3DC]">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-[#F8FAF9] transition-all">
                    <td className="p-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#D8F3DC] rounded-full flex items-center justify-center font-bold text-[#2D6A4F]">
                          {u.name[0]}
                        </div>
                        <div>
                          <p className="font-bold text-[#1B4332]">{u.name}</p>
                          <p className="text-xs text-[#52796F]">@{u.username}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                        u.role === 'LANDOWNER' ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${u.status === 'ACTIVE' ? 'bg-green-500' : 'bg-red-400'}`}></div>
                        <span className="text-xs font-bold text-[#52796F]">{u.status}</span>
                      </div>
                    </td>
                    <td className="p-6 text-xs text-[#52796F]">{u.joined}</td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-2">
                        <button className="p-2 hover:bg-white rounded-lg transition-all text-blue-600">
                          <UserCheck size={18} />
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg transition-all text-red-600">
                          <UserX size={18} />
                        </button>
                        <button className="p-2 hover:bg-white rounded-lg transition-all text-[#52796F]">
                          <MoreVertical size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* System Health & Logs */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-card p-8 bg-[#1B4332] text-white">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Globe size={20} className="text-[#D8F3DC]" /> Global Analytics
            </h3>
            <div className="space-y-6">
              <AnalyticsItem label="Top Crop Demand" value="Basmati Rice" trend="+12%" />
              <AnalyticsItem label="Active Regions" value="14 States" trend="+2" />
              <AnalyticsItem label="Avg Market Flux" value="₹420/kg" trend="-4%" negative={true} />
              <button className="w-full py-3 bg-[#2D6A4F] text-white font-bold rounded-xl border border-white/10 hover:bg-[#D8F3DC] hover:text-[#1B4332] transition-all text-sm flex items-center justify-center gap-2">
                Detailed Report <ArrowUpRight size={18} />
              </button>
            </div>
          </div>

          <div className="glass-card p-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Database size={20} className="text-[#2D6A4F]" /> System Pulse
            </h3>
            <div className="space-y-4">
              <LogItem type="success" text="Sync with Govt API successful" time="2m ago" />
              <LogItem type="info" text="New user batch processed (104 nodes)" time="15m ago" />
              <LogItem type="warning" text="High latency in DB-West-1" time="45m ago" />
              <LogItem type="success" text="Market price protocol updated" time="1h ago" />
              <button className="w-full text-xs font-bold text-[#52796F] hover:text-[#1B4332] pt-4">View All Logs</button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

const AnalyticsItem = ({ label, value, trend, negative }) => (
  <div className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0 last:pb-0">
    <div>
      <p className="text-[10px] font-bold text-[#D8F3DC] uppercase tracking-widest">{label}</p>
      <p className="text-lg font-bold">{value}</p>
    </div>
    <span className={`text-xs font-bold ${negative ? 'text-red-400' : 'text-[#D8F3DC]'}`}>{trend}</span>
  </div>
);

const LogItem = ({ type, text, time }) => (
  <div className="flex gap-4 items-start">
    <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
      type === 'success' ? 'bg-green-500' : 
      type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
    }`}></div>
    <div className="flex-1">
      <p className="text-xs font-medium text-[#1B4332] leading-tight">{text}</p>
      <p className="text-[10px] text-[#52796F]">{time}</p>
    </div>
  </div>
);

export default AdminDashboard;
