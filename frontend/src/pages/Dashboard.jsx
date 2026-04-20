import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { landService, cropService, weatherService } from '../services/api';
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
  CloudSun
} from 'lucide-react';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const StatPulse = ({ icon: Icon, label, value, unit, color }) => (
  <motion.div 
    variants={itemVariants}
    whileHover={{ y: -5 }}
    className="glass p-5 rounded-[2rem] flex items-center space-x-4 border border-white/5"
  >
    <div className={`w-12 h-12 rounded-xl ${color} bg-opacity-10 flex items-center justify-center text-white shadow-inner`}>
      <Icon size={20} />
    </div>
    <div>
      <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">{label}</p>
      <div className="flex items-baseline space-x-1">
        <h4 className="text-2xl font-black text-white tracking-tighter">{value}</h4>
        <span className="text-[10px] font-bold text-gray-600 uppercase">{unit}</span>
      </div>
    </div>
  </motion.div>
);

const Dashboard = () => {
  const { user } = useAuth();
  const [lands, setLands] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

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
      } catch (err) {
        console.error("Critical Telemetry Failure", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-10 h-10 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      <p className="text-[10px] font-black text-emerald-500/40 uppercase tracking-[0.5em]">Establishing Neural Link...</p>
    </div>
  );

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-10"
    >
      {/* 1. Hero Command Matrix */}
      <motion.div variants={itemVariants} className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#10b981] via-[#059669] to-[#010409] p-8 lg:p-16 border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-white/5 blur-[120px] rounded-full translate-x-1/2 opacity-30 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="space-y-8 flex-1">
            <div className="space-y-2">
              <span className="text-[10px] font-black text-emerald-300/60 uppercase tracking-[0.5em]">Command Protocol V.04</span>
              <h2 className="text-5xl lg:text-7xl font-black tracking-tighter leading-[0.85] uppercase text-white">
                Welcome, <br/>
                <span className="text-white/40">{user?.username}</span>
              </h2>
            </div>
            
            <p className="text-emerald-100/60 text-lg font-bold max-w-lg tracking-tight leading-relaxed">
              Global intelligence active. Monitoring {lands.reduce((acc, l) => acc + l.size, 0)} acres across your synchronized field networks. Optimal yield projected at <span className="text-white">+12.4%</span>.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-white text-emerald-950 px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] shadow-xl hover:scale-105 transition-transform active:scale-95">Initiate Analysis</button>
              <button className="bg-white/10 backdrop-blur-3xl text-white px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] border border-white/10 hover:bg-white/20 transition-all">View Analytics</button>
            </div>
          </div>

          <div className="w-full lg:w-80 glass-emerald p-8 rounded-[2.5rem] border border-white/5 space-y-6">
            <div className="flex items-center justify-between border-b border-emerald-500/10 pb-4">
               <h3 className="text-[10px] font-black text-emerald-400 uppercase tracking-widest flex items-center">
                 <CloudSun size={14} className="mr-2 text-amber-500" /> Climate Terminal
               </h3>
               <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            </div>
            
            <div className="space-y-6">
               <div className="flex justify-between items-center bg-black/20 p-6 rounded-3xl border border-white/5">
                 <div className="space-y-1">
                   <p className="text-[8px] font-black text-emerald-500/30 uppercase tracking-widest font-black">Temp</p>
                   <p className="text-4xl font-black tracking-tighter text-white">{weather?.temp}°</p>
                 </div>
                 <div className="text-right space-y-1">
                   <p className="text-[8px] font-black text-emerald-500/30 uppercase tracking-widest font-black">Condition</p>
                   <p className="text-sm font-black text-white uppercase tracking-tighter">{weather?.condition}</p>
                 </div>
               </div>
               
               <div className="flex items-start space-x-3 px-2">
                 <AlertTriangle size={14} className="text-amber-500 mt-0.5 flex-shrink-0" />
                 <p className="text-[9px] font-bold text-amber-100/40 uppercase tracking-widest leading-loose italic">
                   "{weather?.alerts[0] || 'Atmosphere Stable'}"
                 </p>
               </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2. Operational Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatPulse icon={Layers} label="Operational Area" value={lands.reduce((acc, l) => acc + l.size, 0) || 0} unit="Acres" color="bg-blue-600" />
        <StatPulse icon={Droplets} label="Active Units" value={recommendations.length} unit="Sensors" color="bg-emerald-600" />
        <StatPulse icon={TrendingUp} label="Yield Projection" value="₹45.2K" unit="Net" color="bg-amber-600" />
        <StatPulse icon={Calendar} label="Due Protocols" value="12" unit="Tasks" color="bg-purple-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* 3. Field Network Management */}
        <div className="lg:col-span-8 space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center">
                <MapPin size={20} className="mr-3 text-emerald-500" /> Field Networks
              </h3>
              <button className="text-[9px] font-black text-emerald-500 bg-emerald-500/5 px-4 py-2 rounded-xl border border-emerald-500/10 hover:bg-emerald-500 hover:text-white transition-all uppercase tracking-widest">
                Deploy Node
              </button>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {lands.length > 0 ? lands.map((land) => (
               <motion.div 
                 variants={itemVariants}
                 whileHover={{ y: -5 }}
                 key={land.id} 
                 className="glass p-6 rounded-[2.5rem] hover:border-emerald-500/20 transition-all group"
               >
                 <div className="flex items-center justify-between mb-6">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                     <Wheat size={24} />
                   </div>
                   <span className="text-[8px] font-black text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full uppercase tracking-widest border border-blue-500/20">{land.soil_type}</span>
                 </div>
                 <div className="space-y-1">
                   <h4 className="text-xl font-black text-white tracking-tight uppercase leading-none">{land.location}</h4>
                   <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">{land.size} Acre Quadrant</p>
                 </div>
                 <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between bg-gradient-to-t from-white/2 to-transparent -mx-6 -mb-6 p-6 rounded-b-[2.5rem]">
                   <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Status: Monitoring</span>
                   <ChevronRight size={18} className="text-gray-700 group-hover:text-white transition-colors" />
                 </div>
               </motion.div>
             )) : (
               <div className="col-span-full glass p-16 rounded-[3rem] border border-dashed border-white/10 text-center">
                 <p className="text-gray-600 font-black text-xs uppercase tracking-widest">No Active Nodes Detected</p>
               </div>
             )}
           </div>
        </div>

        {/* 4. Priority Queue / Planner */}
        <div className="lg:col-span-4 space-y-6">
           <h3 className="text-xl font-black text-white uppercase tracking-tighter px-2">Priority Queue</h3>
           <div className="glass p-8 rounded-[3rem] space-y-8 flex flex-col h-full border border-white/5">
             <div className="space-y-6 flex-1">
                {[
                  { time: 'T-04:00', label: 'Irrigation Hub', sub: 'Sector A-12', status: 'Pending' },
                  { time: 'T-12:00', label: 'Fertilizer Cycle', sub: 'Sector B-04', status: 'Scheduled' },
                  { time: '28 MAR', label: 'Bio-Sentinel Scan', sub: 'Global Link', status: 'Autonomous' }
                ].map((task, i) => (
                  <div key={i} className="flex items-center space-x-5 group cursor-pointer">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <div className="flex-1 space-y-1">
                      <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">{task.time}</p>
                      <h5 className="font-black text-sm text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{task.label}</h5>
                      <p className="text-[9px] font-bold text-gray-500">{task.sub}</p>
                    </div>
                  </div>
                ))}
             </div>
             <button className="w-full bg-white/5 text-gray-500 py-4 rounded-2xl font-black uppercase text-[9px] tracking-[0.3em] hover:bg-emerald-500 hover:text-white border border-white/5 transition-all">Launch Scheduler</button>
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
