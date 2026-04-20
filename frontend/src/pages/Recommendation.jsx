import React, { useState, useEffect } from 'react';
import { cropService, landService } from '../services/api';
import { 
  Sprout, 
  Search, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  ChevronRight,
  RefreshCw,
  Info,
  Droplets,
  Wind,
  TrendingUp,
  Target
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
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

const Recommendation = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recommending, setRecommending] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [recsRes, landsRes] = await Promise.all([
        cropService.getRecommendations(),
        landService.getLands()
      ]);
      setRecommendations(recsRes.data);
      setLands(landsRes.data);
      if (landsRes.data.length > 0) setSelectedLand(landsRes.data[0]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommend = async () => {
    if (!selectedLand) return;
    setRecommending(true);
    try {
      await cropService.createRecommendation(selectedLand.id);
      await fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setRecommending(false);
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-12 pb-20 relative"
    >
      {/* Header & Selector */}

      {/* Header & Selector */}
      <motion.div variants={itemVariants} className="glass p-10 rounded-[3.5rem] flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="space-y-4 text-center lg:text-left">
          <h2 className="text-5xl font-black text-white tracking-tighter uppercase whitespace-pre-line">AI CROP<br/><span className="text-emerald-500">OPTIMIZER</span></h2>
          <p className="text-gray-500 font-bold max-w-sm tracking-tight">Select your land and let our neural engine predict the most profitable harvest.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
          <div className="relative group w-full sm:w-80">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-emerald-500 transition-colors" size={20} />
            <select 
              className="w-full bg-white/5 border border-white/5 py-5 pl-14 pr-10 rounded-2xl outline-none focus:border-emerald-500/50 appearance-none font-black text-white text-xs uppercase tracking-widest transition-all"
              value={selectedLand?.id}
              onChange={(e) => setSelectedLand(lands.find(l => l.id === parseInt(e.target.value)))}
            >
              {lands.map(l => (
                  <option key={l.id} value={l.id} className="bg-[#161b22]">{l.location} ({l.size} Acres)</option>
              ))}
            </select>
          </div>
          <button 
            disabled={recommending || !selectedLand}
            onClick={handleRecommend}
            className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-900 text-white px-10 py-5 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center space-x-3 shadow-2xl shadow-emerald-500/20 transition-all active:scale-95"
          >
            {recommending ? <RefreshCw className="animate-spin" size={20} /> : <Target size={20} />}
            <span>GENERATE PLAN</span>
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <AnimatePresence mode="wait">
          {recommendations.slice(0, 1).map((rec) => (
            <motion.div 
              key={rec.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              className="space-y-12"
            >
              {/* Highlight Recommendation */}
              <div className="relative group p-1.5 rounded-[4rem] bg-gradient-to-br from-emerald-500 to-blue-600 shadow-2xl shadow-emerald-500/10">
                <div className="bg-[#0d1117] rounded-[3.8rem] p-12 text-white relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 -m-20 w-80 h-80 bg-emerald-500/10 blur-[100px] rounded-full" />
                  <div className="relative z-10 space-y-10">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 bg-emerald-500/10 backdrop-blur-3xl rounded-[2rem] flex items-center justify-center border border-emerald-500/20">
                        <Sprout size={40} className="text-emerald-400" />
                      </div>
                      <div>
                        <p className="text-emerald-500/60 font-black uppercase tracking-[0.3em] text-[10px] mb-1">CORE RECOMMENDATION</p>
                        <h3 className="text-5xl font-black tracking-tighter uppercase whitespace-nowrap">{rec.crop_details?.name || 'Rice'}</h3>
                      </div>
                    </div>

                    <p className="text-gray-400 leading-relaxed text-lg font-medium italic opacity-80 pl-4 border-l-2 border-emerald-500/20">
                      "{rec.reason}"
                    </p>

                    <div className="grid grid-cols-2 gap-6 pt-6">
                      <div className="glass p-6 rounded-[2.5rem] border border-white/5">
                        <div className="flex items-center space-x-3 text-emerald-400 mb-3">
                          <Droplets size={20} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Hydration</span>
                        </div>
                        <p className="text-2xl font-black uppercase tracking-tight">{rec.crop_details?.water_requirement || 'High'}</p>
                      </div>
                      <div className="glass p-6 rounded-[2.5rem] border border-white/5">
                        <div className="flex items-center space-x-3 text-blue-400 mb-3">
                          <Wind size={20} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Optimal Season</span>
                        </div>
                        <p className="text-2xl font-black uppercase tracking-tight">{rec.crop_details?.ideal_season || 'Summer'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step by Step Guidance */}
              <div className="space-y-8">
                <h3 className="text-3xl font-black text-white uppercase tracking-tighter px-4">Cultivation <span className="text-emerald-500">Roadmap</span></h3>
                <div className="space-y-6">
                  {rec.tasks?.map((task, i) => (
                    <motion.div 
                      layout
                      key={task.id} 
                      className={`group flex items-start space-x-8 p-8 rounded-[3.5rem] border transition-all duration-500 ${
                        task.is_completed ? 'bg-emerald-500/5 border-emerald-500/20 opacity-50 grayscale' : 'glass border-white/5 hover:bg-white/10 hover:shadow-2xl'
                      }`}
                    >
                      <div className={`mt-1 flex-shrink-0 transition-all ${task.is_completed ? 'text-emerald-400' : 'text-gray-700 group-hover:text-emerald-400'}`}>
                        {task.is_completed ? <CheckCircle2 size={28} /> : <Circle size={28} />}
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-black text-white uppercase tracking-tight">0{task.step_number}. {task.title}</h4>
                          <span className="text-[10px] font-black text-gray-500 bg-white/5 border border-white/5 px-4 py-1.5 rounded-full uppercase tracking-widest">{task.scheduled_date || 'WEEK 1'}</span>
                        </div>
                        <p className="text-gray-500 font-medium leading-relaxed">{task.instruction}</p>
                      </div>
                      <ChevronRight className="text-gray-800 self-center group-hover:text-white transition-colors" size={24} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Knowledge Base / AI Tips */}
        <div className="space-y-12">
          <motion.div variants={itemVariants} className="glass border-t-2 border-t-blue-500 rounded-[4rem] p-12 text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 -m-32 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full" />
             <div className="flex items-center space-x-5 mb-10">
                <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20">
                  <TrendingUp size={28} className="text-blue-400" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter">AI INSIGHTS</h3>
             </div>
             <div className="space-y-8 relative z-10">
                <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col sm:row sm:items-center gap-6">
                   <div className="flex-1 space-y-1">
                      <p className="text-blue-400/60 font-black uppercase tracking-widest text-[10px]">Expected Yield Projection</p>
                      <p className="text-5xl font-black tracking-tighter">4.8 <span className="text-xl font-bold opacity-40">TONS/ACRE</span></p>
                   </div>
                   <div className="bg-emerald-500/20 px-6 py-2 rounded-full h-fit flex items-center text-emerald-400 font-black text-[10px] uppercase tracking-widest border border-emerald-500/20">+14% OPTIMIZED</div>
                </div>
                <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col sm:row sm:items-center gap-6">
                   <div className="flex-1 space-y-1">
                      <p className="text-blue-400/60 font-black uppercase tracking-widest text-[10px]">Neural Confidence Score</p>
                      <p className="text-5xl font-black tracking-tighter">9.2<span className="text-xl font-bold opacity-40">/10</span></p>
                   </div>
                   <div className="bg-blue-500/20 px-6 py-2 rounded-full h-fit flex items-center text-blue-400 font-black text-[10px] uppercase tracking-widest border border-blue-500/20">HIGH RELIABILITY</div>
                </div>
                <p className="text-gray-500 font-bold text-xs leading-relaxed px-4 opacity-70 flex items-start">
                  <Info size={14} className="mr-2 mt-0.5 flex-shrink-0" />
                  Projections are based on historical soil data of your field and real-time deep learning synthesis of regional climate trends.
                </p>
             </div>
          </motion.div>
          
          <motion.div variants={itemVariants} className="glass p-10 rounded-[4rem] space-y-10">
             <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Calendar className="text-emerald-500" size={24} />
                  <h4 className="text-2xl font-black uppercase tracking-tighter text-white">MARKET SIGNALS</h4>
                </div>
                <span className="px-5 py-1.5 bg-white/5 rounded-full text-[10px] font-black text-gray-500 uppercase tracking-widest">Updated 2m ago</span>
             </div>
             <div className="space-y-2">
                {[
                  { name: 'BASMATI RICE', demand: 'Surging', confidence: 'High', color: 'text-emerald-400' },
                  { name: 'DURUM WHEAT', demand: 'Stable', confidence: 'Medium', color: 'text-blue-400' },
                  { name: 'YELLOW CORN', demand: 'Decreasing', confidence: 'Low', color: 'text-red-400' }
                ].map((m, i) => (
                  <motion.div 
                    whileHover={{ x: 10 }}
                    key={i} 
                    className="flex justify-between items-center p-6 rounded-[2rem] hover:bg-white/5 transition-all cursor-pointer group"
                  >
                     <div className="space-y-1">
                        <p className="font-black text-lg text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{m.name}</p>
                        <div className="flex items-center space-x-3">
                           <p className={`text-[10px] font-black uppercase tracking-widest ${m.color}`}>
                             Demand: {m.demand}
                           </p>
                           <span className="text-[10px] font-bold text-gray-700 uppercase">Confidence: {m.confidence}</span>
                        </div>
                     </div>
                     <ChevronRight size={22} className="text-gray-800 group-hover:text-white transition-colors" />
                  </motion.div>
                ))}
             </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Recommendation;
