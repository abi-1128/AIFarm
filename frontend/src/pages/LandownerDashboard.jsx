import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { landService, cropService, weatherService, marketplaceService } from '../services/api';
import { 
  Plus, 
  MapPin, 
  Layers, 
  Wheat, 
  TrendingUp, 
  AlertTriangle,
  ChevronRight,
  Droplets, 
  Calendar, 
  Settings,
  CloudSun,
  User,
  ShoppingBag,
  BarChart3,
  MessageSquare,
  Thermometer,
  Wind,
  Droplet,
  Sun,
  BrainCircuit,
  PieChart,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Recommendation from './Recommendation';
import Chat from './Chat';
import Marketplace from './Marketplace';
import GrowthProtocol from './GrowthProtocol';
import Financials from './Financials';
import Analytics from './Analytics';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const StatCard = ({ icon: Icon, label, value, unit, color, trend }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -5, scale: 1.02 }}
    className="glass p-6 rounded-[2.5rem] flex items-center space-x-5 border border-white/5 relative overflow-hidden group"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-white/2 blur-[40px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-emerald-500/10 transition-colors" />
    <div className={`w-14 h-14 rounded-2xl ${color} bg-opacity-10 flex items-center justify-center text-white shadow-inner border border-white/5`}>
      <Icon size={24} />
    </div>
    <div className="flex-1">
      <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1.5">{label}</p>
      <div className="flex items-baseline space-x-1.5">
        <h4 className="text-3xl font-black text-white tracking-tighter">{value}</h4>
        <span className="text-[11px] font-bold text-gray-600 uppercase tracking-tight">{unit}</span>
      </div>
      {trend && (
        <p className={`text-[9px] font-black mt-1.5 uppercase tracking-widest ${trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
          {trend} <span className="text-gray-600 uppercase tracking-tighter ml-1">v. last cycle</span>
        </p>
      )}
    </div>
  </motion.div>
);

const LandownerDashboard = () => {
  const { user } = useAuth();
  const [activeModule, setActiveModule] = useState('overview');
  const [lands, setLands] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAires: 0,
    activeCrops: 0,
    projectedProfit: '₹4.2L',
    pendingTasks: 8
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [landsRes, recsRes, weatherRes] = await Promise.all([
          landService.getLands(),
          cropService.getRecommendations(),
          weatherService.getWeather(28.6139, 77.2090)
        ]);
        setLands(landsRes.data);
        setRecommendations(recsRes.data);
        setWeather(weatherRes.data);
        
        const totalSize = landsRes.data.reduce((acc, l) => acc + l.size, 0);
        setStats(prev => ({
          ...prev,
          totalAires: totalSize,
          activeCrops: recsRes.data.length
        }));
      } catch (err) {
        console.error("Telemetry Extraction Failure", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Command Hub', icon: Layers },
    { id: 'land', label: 'Land Matrix', icon: MapPin },
    { id: 'recommendation', label: 'AI Synthesis', icon: BrainCircuit },
    { id: 'guidance', label: 'Growth Protocol', icon: Wheat },
    { id: 'chat', label: 'AI Mentor', icon: MessageSquare },
    { id: 'marketplace', label: 'Global Trade', icon: ShoppingBag },
    { id: 'financials', label: 'Cap Matrix', icon: DollarSign },
    { id: 'analytics', label: 'Neural Insights', icon: BarChart3 }
  ];

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#05080a] space-y-6">
      <div className="relative">
        <div className="w-20 h-20 border-4 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin shadow-[0_0_50px_rgba(16,185,129,0.2)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-emerald-500/20 rounded-full blur-xl animate-pulse" />
      </div>
      <p className="text-[11px] font-black text-emerald-500/50 uppercase tracking-[0.8em] animate-pulse">Syncing Neural Link...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#05080a] text-white flex flex-col lg:flex-row overflow-hidden">
      {/* Cinematic Sidebar */}
      <aside className="w-full lg:w-80 bg-[#080d11]/80 backdrop-blur-2xl border-r border-white/5 p-8 flex flex-col space-y-12 z-50">
        <div className="space-y-2">
           <div className="flex items-center space-x-4 mb-4">
             <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <BrainCircuit className="text-white" size={24} />
             </div>
             <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">Agri<span className="text-emerald-500">AI</span> Mentor</h1>
           </div>
           <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest border-t border-white/5 pt-4">Landowner Interface V.2.0</p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto pr-4 custom-scrollbar">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 group relative ${
                activeModule === item.id 
                  ? 'bg-emerald-500 text-white shadow-[0_8px_30px_rgba(16,185,129,0.2)]' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              {activeModule === item.id && (
                <motion.div layoutId="activeTab" className="absolute inset-0 bg-emerald-500 rounded-2xl -z-10 shadow-3xl shadow-emerald-500/20" />
              )}
              <item.icon size={18} className={`${activeModule === item.id ? 'text-white' : 'text-gray-600 group-hover:text-emerald-400'}`} />
              <span>{item.label}</span>
              {activeModule === item.id && <ChevronRight size={14} className="ml-auto opacity-50" />}
            </button>
          ))}
        </nav>

        <div className="glass p-6 rounded-[2rem] border border-white/5 flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/20 flex items-center justify-center text-blue-400 shadow-inner">
            <User size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-white truncate uppercase tracking-tighter">{user?.username}</p>
            <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Master Farmer</p>
          </div>
          <button className="text-rose-500 hover:scale-110 transition-transform"><Settings size={16} /></button>
        </div>
      </aside>

      {/* Main Content Arena */}
      <main className="flex-1 h-screen overflow-y-auto p-6 lg:p-12 space-y-12 custom-scrollbar relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
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
              {/* Header Command */}
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                <div className="space-y-4">
                  <h2 className="text-6xl font-black tracking-tighter uppercase leading-none">Operational <br/><span className="text-emerald-500">Summary</span></h2>
                  <p className="text-gray-500 text-xl font-bold tracking-tight max-w-xl">Intelligent monitoring active. Systems synchronized across {lands.length} active quadrants.</p>
                </div>
                <div className="flex items-center gap-4">
                   <div className="glass px-6 py-4 rounded-2xl border border-white/5 flex items-center space-x-4">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Nominal</span>
                   </div>
                   <button className="bg-white text-black px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-2xl hover:scale-105 transition-all">Export Protocol</button>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                <StatCard icon={Layers} label="Operational Area" value={stats.totalAires} unit="Acres" color="bg-blue-600" trend="+4.2%" />
                <StatCard icon={Wheat} label="Active Cultivations" value={stats.activeCrops} unit="Species" color="bg-emerald-600" trend="Optimal" />
                <StatCard icon={TrendingUp} label="Projected Revenue" value={stats.projectedProfit} unit="Net" color="bg-amber-600" trend="+12.4%" />
                <StatCard icon={Calendar} label="Priority Tasks" value={stats.pendingTasks} unit="Actions" color="bg-purple-600" trend="8 Unread" />
              </div>

              <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
                {/* Weather Station */}
                <div className="xl:col-span-4 space-y-6">
                   <h3 className="text-xl font-black uppercase tracking-tighter flex items-center"><CloudSun size={20} className="mr-3 text-emerald-500" /> Climate Terminal</h3>
                   <div className="glass h-[400px] rounded-[3rem] p-10 flex flex-col justify-between border border-white/5 relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent opacity-50" />
                      
                      <div className="space-y-8 relative z-10">
                        <div className="flex justify-between items-start">
                           <div>
                              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">Current Condition</p>
                              <h4 className="text-4xl font-black uppercase tracking-tighter">{weather?.condition || 'Clear Sky'}</h4>
                           </div>
                           <Sun size={48} className="text-amber-400 drop-shadow-[0_0_20px_#fbbf2455]" />
                        </div>

                        <div className="flex items-center space-x-6">
                           <div className="text-7xl font-black tracking-tighter text-white">{weather?.temp || 32}°</div>
                           <div className="space-y-1 py-1 px-4 bg-emerald-500 text-black rounded-xl border border-white/20">
                              <p className="text-[8px] font-black uppercase tracking-widest">Feels Like</p>
                              <p className="text-lg font-black leading-none">{weather?.temp + 2 || 34}°</p>
                           </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
                           <div className="text-center space-y-2">
                              <Droplet size={18} className="mx-auto text-blue-400" />
                              <p className="text-[8px] font-black text-gray-500 uppercase">Humidity</p>
                              <p className="text-xs font-black">42%</p>
                           </div>
                           <div className="text-center space-y-2">
                              <Wind size={18} className="mx-auto text-emerald-400" />
                              <p className="text-[8px] font-black text-gray-500 uppercase">Wind Speed</p>
                              <p className="text-xs font-black">12km/h</p>
                           </div>
                           <div className="text-center space-y-2">
                              <Thermometer size={18} className="mx-auto text-rose-400" />
                              <p className="text-[8px] font-black text-gray-500 uppercase">Pressure</p>
                              <p className="text-xs font-black">1012hp</p>
                           </div>
                        </div>
                      </div>

                      <div className={`mt-8 p-6 rounded-[2rem] border flex items-center space-x-4 ${weather?.alerts?.length > 0 ? 'bg-amber-500/10 border-amber-500/20' : 'bg-emerald-500/5 border-emerald-500/10'}`}>
                         <AlertTriangle size={20} className={weather?.alerts?.length > 0 ? 'text-amber-500' : 'text-emerald-500'} />
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide italic leading-relaxed">
                           {weather?.alerts?.[0] || "No significant atmospheric anomalies detected. Operations clear."}
                         </p>
                      </div>
                   </div>
                </div>

                {/* Field Activity */}
                <div className="xl:col-span-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-black uppercase tracking-tighter flex items-center"><MapPin size={20} className="mr-3 text-emerald-500" /> Quadrant Control</h3>
                    <button onClick={() => setActiveModule('land')} className="text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center hover:translate-x-2 transition-transform">Expand Network <ChevronRight size={14} className="ml-2" /></button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {lands.slice(0, 4).map((land, i) => (
                      <motion.div
                        key={land.id}
                        whileHover={{ y: -5 }}
                        className="glass p-8 rounded-[3rem] border border-white/5 group relative overflow-hidden"
                      >
                         <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-emerald-500/5 blur-3xl rounded-full group-hover:bg-emerald-500/10 transition-colors" />
                         <div className="flex items-start justify-between mb-8">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner border border-white/5">
                               <Wheat size={24} />
                            </div>
                            <div className="text-right">
                               <p className="text-[8px] font-black text-gray-600 uppercase tracking-[0.25em] mb-1">Status</p>
                               <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20 uppercase tracking-widest">Active Scan</span>
                            </div>
                         </div>
                         <div className="space-y-2">
                           <h4 className="text-2xl font-black tracking-tighter uppercase leading-none">{land.location}</h4>
                           <div className="flex items-center space-x-3">
                              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{land.size} Acres</span>
                              <span className="w-1 h-1 bg-gray-700 rounded-full" />
                              <span className="text-[10px] font-bold text-emerald-400/60 uppercase tracking-widest">{land.soil_type}</span>
                           </div>
                         </div>
                         <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                            <div className="flex -space-x-2">
                               {[1,2,3].map(j => <div key={j} className="w-6 h-6 rounded-full border-2 border-[#05080a] bg-emerald-500/20" />)}
                               <div className="w-6 h-6 rounded-full border-2 border-[#05080a] bg-emerald-500 flex items-center justify-center text-[8px] font-black">+2</div>
                            </div>
                            <button className="text-[10px] font-black text-white px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 transition-colors uppercase tracking-widest border border-white/10">Manage Node</button>
                         </div>
                      </motion.div>
                    ))}
                    {lands.length === 0 && (
                      <div className="col-span-full glass-dark h-64 rounded-[3rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-12 space-y-4">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-gray-700"><Plus size={32} strokeWidth={1} /></div>
                        <div className="space-y-1">
                          <p className="text-gray-500 font-black uppercase tracking-widest">No Active Quadrants Detected</p>
                          <p className="text-[10px] font-bold text-gray-700 max-w-xs uppercase">Initialize your first field node to begin global synchronization.</p>
                        </div>
                        <button onClick={() => setActiveModule('land')} className="bg-emerald-500 text-white px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-3xl hover:scale-105 transition-all">Initialize Matrix</button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeModule === 'land' && (
            <motion.div key="land" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="space-y-12">
               <div className="flex items-center justify-between">
                  <h2 className="text-5xl font-black tracking-tighter uppercase leading-none">Land <span className="text-emerald-500">Matrix</span></h2>
                  <button className="bg-emerald-500 text-white px-8 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-2xl flex items-center"><Plus size={18} className="mr-2" /> Add Quadrant</button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {lands.map(land => (
                    <div key={land.id} className="glass p-10 rounded-[3.5rem] border border-white/5 space-y-8 group hover:border-emerald-500/20 transition-all">
                       <div className="flex justify-between items-start">
                          <div className="w-16 h-16 bg-emerald-500/10 rounded-3xl flex items-center justify-center text-emerald-400 border border-emerald-500/10 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
                             <MapPin size={28} />
                          </div>
                          <div className="text-right">
                             <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Area Size</p>
                             <h5 className="text-2xl font-black text-white tracking-tighter leading-none">{land.size} <span className="text-xs text-gray-600 uppercase">Acres</span></h5>
                          </div>
                       </div>
                       
                       <div className="space-y-4">
                          <h4 className="text-3xl font-black uppercase tracking-tighter leading-none">{land.location}</h4>
                          <div className="grid grid-cols-2 gap-4">
                             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Soil Type</p>
                                <p className="text-[11px] font-black text-white uppercase tracking-tighter">{land.soil_type}</p>
                             </div>
                             <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Water Source</p>
                                <p className="text-[11px] font-black text-white uppercase tracking-tighter">{land.water_source || 'Groundwater'}</p>
                             </div>
                          </div>
                       </div>

                       <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                          <button className="text-[10px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors">Edit Config</button>
                          <button className="bg-white text-black px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">Analyze</button>
                       </div>
                    </div>
                  ))}
               </div>
            </motion.div>
          )}

          {activeModule === 'recommendation' && <Recommendation />}
          {activeModule === 'chat' && <Chat />}
          {activeModule === 'marketplace' && <Marketplace />}
          {activeModule === 'guidance' && <GrowthProtocol />}
          {activeModule === 'financials' && <Financials />}
          {activeModule === 'analytics' && <Analytics />}
        </AnimatePresence>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(16, 185, 129, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(16, 185, 129, 0.3);
        }
        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
        .glass-dark {
          background: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
        }
        .shadow-3xl {
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
        }
      `}} />
    </div>
  );
};

export default LandownerDashboard;
