import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Shield, 
  Users, 
  BarChart3, 
  Settings, 
  Search, 
  ChevronRight, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  TrendingUp, 
  ShoppingBag,
  Activity,
  Server,
  Terminal,
  Database,
  Lock,
  Eye,
  ArrowUpRight,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1 }
};

const AdminDashboard = () => {
  const { user } = useAuth();
  const [activeModule, setActiveModule] = useState('overview');
  const [users, setUsers] = useState([
    { id: 1, username: 'farmer_raj', role: 'LANDOWNER', status: 'ACTIVE', joined: '2024-03-20' },
    { id: 2, username: 'buyer_dev', role: 'BUYER', status: 'ACTIVE', joined: '2024-03-22' },
    { id: 3, username: 'scammer_99', role: 'LANDOWNER', status: 'BLOCKED', joined: '2024-03-25' },
  ]);
  const [loading, setLoading] = useState(false);

  const menuItems = [
    { id: 'overview', label: 'Matrix Control', icon: Activity },
    { id: 'users', label: 'User Nodes', icon: Users },
    { id: 'marketplace', label: 'Protocol Audit', icon: Shield },
    { id: 'analytics', label: 'Neural Stats', icon: BarChart3 },
    { id: 'system', label: 'Core Config', icon: Settings }
  ];

  const stats = [
    { label: 'Total Synchronized Nodes', value: '4,204', trend: '+12%', color: 'text-amber-500' },
    { label: 'Active Trade Flux', value: '₹84.2M', trend: '+24%', color: 'text-emerald-500' },
    { label: 'Neural Latency', value: '14ms', trend: '-2ms', color: 'text-blue-500' },
    { label: 'Security Breaches', value: '0', trend: 'STABLE', color: 'text-rose-500' }
  ];

  return (
    <div className="min-h-screen bg-[#060606] text-[#e0e0e0] flex flex-col lg:flex-row overflow-hidden font-mono">
      {/* Admin Sidebar */}
      <aside className="w-full lg:w-80 bg-[#0a0a0a] border-r border-[#1a1a1a] p-8 flex flex-col space-y-12 z-50">
        <div className="space-y-4">
           <div className="flex items-center space-x-4">
             <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                <Shield className="text-amber-500" size={20} />
             </div>
             <h1 className="text-xl font-black tracking-widest uppercase leading-none text-white">Agri<span className="text-amber-500">Root</span></h1>
           </div>
           <div className="px-3 py-1 bg-amber-500 text-black text-[9px] font-black w-fit rounded uppercase tracking-[0.2em]">Master Admin</div>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.3em] transition-all duration-300 group relative ${
                activeModule === item.id 
                  ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                  : 'text-gray-600 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={16} className={`${activeModule === item.id ? 'text-amber-500' : 'text-gray-700 group-hover:text-amber-400'}`} />
              <span>{item.label}</span>
              {activeModule === item.id && <div className="absolute left-0 w-1 h-1/2 bg-amber-500 rounded-full" />}
            </button>
          ))}
        </nav>

        <div className="bg-[#0f0f0f] border border-[#1a1a1a] p-6 rounded-2xl space-y-4">
           <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded bg-gray-900 border border-white/5 flex items-center justify-center"><Terminal size={14} className="text-gray-400" /></div>
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Terminal Active</p>
           </div>
           <div className="space-y-2 opacity-30 text-[8px] font-bold">
              <p>&gt; ACCESS_GRANTED</p>
              <p>&gt; SYNC_START_v4.2</p>
           </div>
        </div>
      </aside>

      {/* Admin Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-6 lg:p-12 space-y-12 custom-scrollbar relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-amber-500/5 blur-[200px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {activeModule === 'overview' && (
            <motion.div
              key="overview"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -20 }}
              variants={containerVariants}
              className="space-y-12"
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/5 pb-12">
                 <div className="space-y-4">
                    <h2 className="text-5xl font-black tracking-tighter uppercase leading-none text-white italic">Neural <span className="text-amber-500 font-normal not-italic">Backbone</span></h2>
                    <p className="text-gray-500 text-lg font-bold tracking-tight max-w-xl font-sans">Global system heartbeat monitoring active. Real-time telemetry synchronized.</p>
                 </div>
                 <div className="flex items-center space-x-6">
                    <div className="text-right">
                       <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1">UPTIME</p>
                       <p className="text-xl font-black text-white">99.982%</p>
                    </div>
                    <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center animate-pulse">
                       <Activity className="text-emerald-500" size={20} />
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                 {stats.map((s, i) => (
                   <motion.div key={i} variants={itemVariants} className="bg-[#0a0a0a] border border-[#1a1a1a] p-8 rounded-2xl hover:border-amber-500/20 transition-all group">
                      <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-3 group-hover:text-amber-500 transition-colors">{s.label}</p>
                      <h4 className="text-3xl font-black text-white tracking-tighter mb-2">{s.value}</h4>
                      <p className={`text-[10px] font-black ${s.color} uppercase tracking-widest bg-white/5 w-fit px-3 py-1 rounded`}>{s.trend}</p>
                   </motion.div>
                 ))}
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 mt-12">
                 <div className="xl:col-span-8 bg-[#0a0a0a] border border-[#1a1a1a] rounded-[2rem] overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/2">
                       <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-white flex items-center"><Terminal size={16} className="mr-3 text-amber-500" /> System Logs</h3>
                       <button className="text-[9px] font-bold text-gray-500 hover:text-white uppercase transition-colors">Clear Protocol</button>
                    </div>
                    <div className="p-8 font-mono text-[10px] space-y-4 h-96 overflow-y-auto custom-scrollbar-minimal bg-black/40">
                       <p className="text-emerald-500 flex items-center"><ArrowUpRight size={12} className="mr-3" /> [SYS] KERNEL SYNC SUCCESSFUL (v4.2.1-lts)</p>
                       <p className="text-gray-600 flex items-center"><ArrowUpRight size={12} className="mr-3 whitespace-nowrap" /> [AUTH] USER 4022 LOGGED IN (IP: 192.168.1.104)</p>
                       <p className="text-amber-500 flex items-center"><AlertTriangle size={12} className="mr-3" /> [TRADE] HIGH VOLUME DETECTED IN SECTOR-7G</p>
                       <p className="text-gray-600 flex items-center"><ArrowUpRight size={12} className="mr-3" /> [DATA] AI RE-MODELING COMPLETION (LATENCY: 4MS)</p>
                       <p className="text-rose-500 flex items-center"><XCircle size={12} className="mr-3" /> [SEC] REJECTED TAMPER ATTEMPT AT NODER_ID_90</p>
                       <p className="text-gray-600 flex items-center"><ArrowUpRight size={12} className="mr-3" /> [SYNC] WORLD CLIMATE MATRIX UPDATED</p>
                       <p className="text-gray-600 flex items-center"><ArrowUpRight size={12} className="mr-3" /> [AUTH] SYSTEM RE-SCAN COMPLETE</p>
                       <p className="text-emerald-500 flex items-center"><ArrowUpRight size={12} className="mr-3 font-bold" /> [LOAD] LOAD BALANCER STABLE (DIST: 32%)</p>
                    </div>
                 </div>

                 <div className="xl:col-span-4 space-y-6">
                    <div className="bg-amber-500/5 border border-amber-500/20 p-8 rounded-[2rem] space-y-6">
                       <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-amber-500 text-black rounded-xl flex items-center justify-center shadow-2xl"><Server size={24} /></div>
                          <div>
                             <h4 className="text-lg font-black uppercase tracking-widest text-white">Cluster Alpha</h4>
                             <p className="text-[10px] font-bold text-amber-500/60 uppercase">Node Center: EU-WEST-1</p>
                          </div>
                       </div>
                       <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                             <span className="text-gray-600">CPU Usage</span>
                             <span className="text-white">42%</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                             <div className="bg-amber-500 h-full w-[42%]" />
                          </div>
                       </div>
                       <div className="space-y-3">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                             <span className="text-gray-600">Memory Load</span>
                             <span className="text-white">8.2 / 32 GB</span>
                          </div>
                          <div className="h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                             <div className="bg-emerald-500 h-full w-[25%]" />
                          </div>
                       </div>
                    </div>
                    
                    <button className="w-full py-5 rounded-2xl bg-[#0a0a0a] border border-[#1a1a1a] text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 hover:text-amber-500 hover:border-amber-500/40 transition-all">Launch Shell</button>
                 </div>
              </div>
            </motion.div>
          )}

          {activeModule === 'users' && (
            <motion.div key="users" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
               <div className="flex items-center justify-between">
                  <h2 className="text-5xl font-black tracking-tighter uppercase leading-none text-white italic">User <span className="text-amber-500 font-normal not-italic">Identity Matrix</span></h2>
                  <div className="flex space-x-4">
                     <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={16} />
                        <input type="text" placeholder="QUERY UUID..." className="bg-[#0f0f0f] border border-[#1a1a1a] rounded-xl px-12 py-3 text-[10px] font-black uppercase tracking-widest w-72 text-white focus:border-amber-500/40 transition-all outline-none" />
                     </div>
                  </div>
               </div>

               <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-[2.5rem] overflow-hidden">
                  <table className="w-full text-left">
                     <thead className="bg-white/2 border-b border-white/5 text-[9px] font-black uppercase tracking-[0.3em] text-gray-600">
                        <tr>
                           <th className="p-10">Subject</th>
                           <th className="p-10">Protocol</th>
                           <th className="p-10">Status</th>
                           <th className="p-10">Synchronization</th>
                           <th className="p-10 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-white/5 text-[11px] font-black text-white italic">
                        {users.map(u => (
                          <tr key={u.id} className="hover:bg-amber-500/2 transition-colors">
                            <td className="p-10">
                               <div className="flex items-center space-x-6 not-italic">
                                  <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gray-400 font-bold font-sans">
                                     {u.username[0].toUpperCase()}
                                  </div>
                                  <div>
                                     <p className="text-lg font-black tracking-tight text-white italic">{u.username}</p>
                                     <p className="text-[8px] font-black uppercase tracking-widest text-gray-600">ID#6042-{u.id}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="p-10 text-amber-500">{u.role}</td>
                            <td className="p-10">
                               <span className={`px-4 py-1.5 rounded text-[8px] font-black uppercase tracking-widest ${u.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                                  {u.status}
                               </span>
                            </td>
                            <td className="p-10 text-gray-600">{u.joined}</td>
                            <td className="p-10 text-right">
                               <button className="p-3 bg-white/2 rounded-lg text-gray-600 hover:text-white transition-colors mr-2"><Eye size={16} /></button>
                               <button className={`p-3 rounded-lg transition-colors ${u.status === 'ACTIVE' ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'}`}>
                                  {u.status === 'ACTIVE' ? <Lock size={16} /> : <CheckCircle size={16} />}
                               </button>
                            </td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </motion.div>
          )}

          {(activeModule === 'marketplace' || activeModule === 'analytics' || activeModule === 'system') && (
            <motion.div key="upcoming" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="h-[60vh] flex flex-col items-center justify-center text-center space-y-10 p-12 bg-[#0a0a0a] border border-[#1a1a1a] rounded-[4rem]">
                <div className="relative">
                   <div className="w-24 h-24 bg-amber-500/5 rounded-[2.5rem] flex items-center justify-center text-amber-500 border border-amber-500/10 shadow-[0_0_60px_rgba(245,158,11,0.05)]">
                      <Database size={48} strokeWidth={1} className="animate-pulse" />
                   </div>
                   <div className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-lg flex items-center justify-center text-black font-black text-[10px]"><Settings size={12} /></div>
                </div>
                <div className="space-y-4 font-sans">
                   <h3 className="text-4xl font-black tracking-tighter uppercase leading-none text-white italic">Protocol <span className="text-amber-500 font-normal not-italic">Optimization</span></h3>
                   <p className="text-gray-500 font-bold max-w-sm mx-auto text-lg leading-relaxed">The {menuItems.find(m => m.id === activeModule)?.label} interface is currently under encryption re-sync.</p>
                </div>
                <button onClick={() => setActiveModule('overview')} className="bg-amber-500 text-black px-12 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.4em] shadow-3xl hover:translate-y-[-4px] transition-all">Back to Root</button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar-minimal::-webkit-scrollbar {
          width: 2px;
        }
        .custom-scrollbar-minimal::-webkit-scrollbar-thumb {
          background: rgba(245, 158, 11, 0.4);
        }
        .shadow-3xl {
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.6);
        }
      `}} />
    </div>
  );
};

export default AdminDashboard;
