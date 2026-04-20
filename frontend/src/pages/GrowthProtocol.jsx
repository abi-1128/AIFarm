import React, { useState, useEffect } from 'react';
import { cropService } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wheat, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  Calendar, 
  AlertCircle,
  Clock,
  Droplets,
  Sprout,
  Trash2,
  Tractor
} from 'lucide-react';

const GrowthProtocol = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [selectedRec, setSelectedRec] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    try {
      const res = await cropService.getRecommendations();
      setRecommendations(res.data);
      if (res.data.length > 0) {
        setSelectedRec(res.data[0]);
        fetchTasks(res.data[0].id);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("Growth Logic Sync Failure", err);
      setLoading(false);
    }
  };

  const fetchTasks = async (recId) => {
    setLoading(true);
    try {
      const res = await cropService.getTasks(recId);
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleTask = async (taskId, currentStatus) => {
    try {
      await cropService.updateTask(taskId, { is_completed: !currentStatus });
      setTasks(tasks.map(t => t.id === taskId ? { ...t, is_completed: !currentStatus } : t));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading && recommendations.length === 0) return (
    <div className="h-[40vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
      <p className="text-[10px] font-black text-emerald-500/40 uppercase tracking-widest">Compiling Growth Flux...</p>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/5">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-[1px] bg-emerald-500" />
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500">Operation: Precision Growth</span>
          </div>
          <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none italic">Growth <span className="text-emerald-500 not-italic">Protocol</span></h2>
          <p className="text-gray-500 font-bold tracking-tight text-xl max-w-xl">Step-by-step synthesized guidance for optimal crop yield and resource efficiency.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
        {/* Recommendation Selector */}
        <div className="xl:col-span-4 space-y-6">
          <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-600 ml-4">Active Cultivations</h3>
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <button
                key={rec.id}
                onClick={() => {
                  setSelectedRec(rec);
                  fetchTasks(rec.id);
                }}
                className={`w-full glass p-8 rounded-[2.5rem] border text-left transition-all duration-500 group relative overflow-hidden ${
                  selectedRec?.id === rec.id 
                    ? 'border-emerald-500/30 bg-emerald-500/5 shadow-3xl shadow-emerald-500/10' 
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                {selectedRec?.id === rec.id && (
                  <motion.div layoutId="activeRec" className="absolute left-0 top-0 bottom-0 w-1.5 bg-emerald-500" />
                )}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-colors ${
                    selectedRec?.id === rec.id ? 'bg-emerald-500 text-white border-emerald-500/20 shadow-lg' : 'bg-white/5 text-gray-600 border-white/5'
                  }`}>
                    <Sprout size={24} />
                  </div>
                  <ChevronRight size={16} className={`transition-transform duration-500 ${selectedRec?.id === rec.id ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} />
                </div>
                <h4 className="text-2xl font-black tracking-tighter uppercase italic text-white group-hover:text-emerald-400 transition-colors">{rec.crop_name}</h4>
                <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mt-1">{rec.land_location} • Sector Delta</p>
              </button>
            ))}
            {recommendations.length === 0 && (
              <div className="glass p-12 rounded-[3rem] border border-dashed border-white/10 text-center space-y-4">
                <AlertCircle size={32} className="mx-auto text-gray-800" />
                <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest leading-loose">No active growth protocols detected. Initialize a recommendation first.</p>
              </div>
            )}
          </div>
        </div>

        {/* Task List */}
        <div className="xl:col-span-8 space-y-8">
          <AnimatePresence mode="wait">
            {selectedRec ? (
              <motion.div
                key={selectedRec.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <div className="glass p-10 rounded-[4rem] border border-white/5 flex items-center justify-between bg-gradient-to-br from-emerald-500/5 to-transparent">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-[0.4em]">Protocol Details</p>
                    <h3 className="text-4xl font-black tracking-tighter text-white uppercase italic">{selectedRec.crop_name} <span className="text-emerald-500 not-italic">Sync</span></h3>
                  </div>
                  <div className="flex gap-4">
                    <div className="text-right">
                       <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest mb-1">Completion</p>
                       <p className="text-2xl font-black text-white italic">{Math.round((tasks.filter(t => t.is_completed).length / (tasks.length || 1)) * 100)}%</p>
                    </div>
                    <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-emerald-500 shadow-inner">
                       <Clock size={28} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 relative">
                  <div className="absolute left-[39px] top-10 bottom-10 w-[1px] bg-white/5 -z-10" />
                  
                  {tasks.map((task, index) => (
                    <motion.div
                      key={task.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={`glass group p-8 rounded-[3rem] border transition-all duration-500 flex items-start space-x-8 ${
                        task.is_completed ? 'border-emerald-500/20 bg-emerald-500/2 opacity-60' : 'border-white/5 hover:border-white/10'
                      }`}
                    >
                      <button 
                        onClick={() => handleToggleTask(task.id, task.is_completed)}
                        className={`w-20 h-20 rounded-[2rem] flex-shrink-0 flex items-center justify-center border transition-all duration-500 ${
                          task.is_completed ? 'bg-emerald-500 border-emerald-500 shadow-[0_0_25px_#10b98155] text-white' : 'bg-white/5 border-white/10 text-gray-700 hover:border-emerald-500/50 hover:text-emerald-400'
                        }`}
                      >
                        {task.is_completed ? <CheckCircle2 size={32} /> : <Circle size={32} strokeWidth={1} />}
                      </button>
                      
                      <div className="flex-1 space-y-3 pt-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-black text-gray-600 uppercase tracking-[0.3em]">Phase {task.step_number}</span>
                          {task.scheduled_date && (
                            <div className="flex items-center space-x-2 text-[9px] font-black text-gray-500 uppercase tracking-widest bg-white/5 px-4 py-1.5 rounded-full border border-white/5">
                               <Calendar size={12} />
                               <span>{new Date(task.scheduled_date).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                        <h5 className={`text-2xl font-black tracking-tighter uppercase italic transition-colors ${task.is_completed ? 'text-gray-500' : 'text-white'}`}>{task.title}</h5>
                        <p className={`text-[11px] font-bold leading-relaxed max-w-2xl italic transition-colors ${task.is_completed ? 'text-gray-600' : 'text-gray-400'}`}>{task.instruction}</p>
                        
                        {!task.is_completed && (
                          <div className="flex items-center space-x-4 pt-4">
                             <span className="flex items-center space-x-2 text-[8px] font-black text-blue-400 uppercase tracking-widest"><Droplets size={12} /> <span>Hydration Required</span></span>
                             <span className="flex items-center space-x-2 text-[8px] font-black text-amber-400 uppercase tracking-widest"><Tractor size={12} /> <span>Equipment Ready</span></span>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  
                  {tasks.length === 0 && !loading && (
                    <div className="glass p-20 rounded-[4rem] border border-dashed border-white/5 text-center space-y-6">
                       <Wheat size={64} strokeWidth={1} className="mx-auto text-gray-800" />
                       <div className="space-y-2">
                          <p className="text-gray-500 font-black uppercase tracking-widest">Protocol Matrix Empty</p>
                          <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest leading-loose max-w-sm mx-auto">The neural engine has not yet synthesized growth steps for this cultivation. Initializing sync...</p>
                       </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              <div className="h-[60vh] glass rounded-[4rem] border border-dashed border-white/5 flex flex-col items-center justify-center space-y-8 p-12 text-center">
                 <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-gray-800 border border-white/5">
                    <CheckCircle2 size={48} strokeWidth={1} />
                 </div>
                 <div className="space-y-3">
                    <h3 className="text-4xl font-black tracking-tighter uppercase text-gray-700 leading-none">Awaiting <br/> <span className="text-emerald-500">Synchronization</span></h3>
                    <p className="text-gray-600 font-bold max-w-sm mx-auto text-lg leading-relaxed uppercase tracking-tighter">Select a cultivation node from the left matrix to initialize growth protocols.</p>
                 </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default GrowthProtocol;
