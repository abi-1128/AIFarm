import React, { useState, useEffect } from 'react';
import { cropService } from '../services/api';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { 
  Sprout, 
  CheckCircle2, 
  Circle, 
  ChevronRight, 
  Droplets,
  Zap,
  ShieldCheck,
  Clock,
  Info,
  Tractor
} from 'lucide-react';

const GrowthProtocol = () => {
  const { user } = useAuth();
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
      console.error("Advisory fetch failed", err);
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

  if (loading && recommendations.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF9]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D6A4F]"></div>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader title="Smart Advisory" user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Active Crops Selector */}
        <div className="lg:col-span-4 space-y-6">
          <h3 className="text-xl font-bold px-2">Your Crops</h3>
          <div className="space-y-4">
            {recommendations.map(rec => (
              <button
                key={rec.id}
                onClick={() => { setSelectedRec(rec); fetchTasks(rec.id); }}
                className={`w-full p-6 glass-card text-left transition-all relative overflow-hidden ${
                  selectedRec?.id === rec.id ? 'border-[#2D6A4F] bg-[#D8F3DC]' : 'hover:border-[#2D6A4F]'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedRec?.id === rec.id ? 'bg-[#2D6A4F] text-white' : 'bg-[#F8FAF9] text-[#2D6A4F] border border-[#D8F3DC]'
                  }`}>
                    <Sprout size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-[#1B4332]">{rec.crop_details?.name || 'Crop'}</h4>
                    <p className="text-xs text-[#52796F]">{rec.land_location}</p>
                  </div>
                  <ChevronRight size={16} className={`ml-auto text-[#2D6A4F] transition-transform ${selectedRec?.id === rec.id ? 'rotate-90' : ''}`} />
                </div>
              </button>
            ))}
            {recommendations.length === 0 && (
              <div className="p-8 text-center bg-[#F8FAF9] rounded-3xl border border-dashed border-[#D8F3DC]">
                <p className="text-sm text-[#52796F]">No active crops. Generate a recommendation to start.</p>
              </div>
            )}
          </div>

          {/* Quick Advisory Cards */}
          <div className="glass-card p-6 bg-[#2D6A4F] text-white">
            <h4 className="font-bold mb-4 flex items-center gap-2"><Zap size={18} /> AI Quick Tips</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-[#D8F3DC] rounded-full mt-1.5 shrink-0"></div>
                <span>Water your wheat field before 10 AM to minimize evaporation.</span>
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 bg-[#D8F3DC] rounded-full mt-1.5 shrink-0"></div>
                <span>Check for leaf rust in Sector B due to increased humidity.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Guidance Timeline */}
        <div className="lg:col-span-8 space-y-8">
          {selectedRec ? (
            <>
              {/* Progress Card */}
              <div className="glass-card p-8 bg-white flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="space-y-1 text-center md:text-left">
                  <p className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-widest">Active Roadmap</p>
                  <h3 className="text-3xl font-bold text-[#1B4332]">{selectedRec.crop_details?.name} Protocol</h3>
                  <p className="text-sm text-[#52796F]">Managed by AIFarm Intelligent Systems</p>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-[10px] font-bold text-[#52796F] uppercase">Completion</p>
                    <p className="text-2xl font-bold text-[#2D6A4F]">
                      {Math.round((tasks.filter(t => t.is_completed).length / (tasks.length || 1)) * 100)}%
                    </p>
                  </div>
                  <div className="w-16 h-16 rounded-[24px] bg-[#D8F3DC] flex items-center justify-center text-[#2D6A4F] shadow-inner">
                    <Clock size={28} />
                  </div>
                </div>
              </div>

              {/* Timeline Tasks */}
              <div className="space-y-4 relative before:absolute before:left-[47px] before:top-10 before:bottom-10 before:w-0.5 before:bg-[#D8F3DC]">
                {tasks.map((task, i) => (
                  <div key={task.id} className="flex gap-8 group">
                    <button 
                      onClick={() => handleToggleTask(task.id, task.is_completed)}
                      className={`w-24 h-24 rounded-[32px] shrink-0 flex items-center justify-center border-4 transition-all z-10 ${
                        task.is_completed 
                        ? 'bg-[#2D6A4F] border-[#D8F3DC] text-white' 
                        : 'bg-white border-[#F8FAF9] text-[#D8F3DC] hover:border-[#2D6A4F]'
                      }`}
                    >
                      {task.is_completed ? <CheckCircle2 size={36} /> : <Circle size={36} />}
                    </button>
                    
                    <div className={`flex-1 glass-card p-6 self-center transition-all ${task.is_completed ? 'opacity-60 grayscale bg-[#F8FAF9]' : 'hover:border-[#2D6A4F]'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-[#52796F] uppercase tracking-widest">Phase {task.step_number}</span>
                        {task.scheduled_date && (
                          <span className="text-[10px] font-bold bg-[#D8F3DC] text-[#2D6A4F] px-3 py-1 rounded-full uppercase">
                            {new Date(task.scheduled_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                      <h4 className={`text-xl font-bold mb-2 ${task.is_completed ? 'text-[#52796F]' : 'text-[#1B4332]'}`}>{task.title}</h4>
                      <p className="text-sm text-[#52796F] leading-relaxed">{task.instruction}</p>
                      
                      {!task.is_completed && (
                        <div className="flex gap-4 mt-4 pt-4 border-t border-[#D8F3DC]">
                          <div className="flex items-center gap-2 text-[10px] font-bold text-[#3A86FF] uppercase">
                            <Droplets size={12} /> Irrigation required
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-amber-600 uppercase">
                            <Tractor size={12} /> Equipment ready
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {tasks.length === 0 && (
                  <div className="p-20 text-center bg-white rounded-[40px] border border-dashed border-[#D8F3DC]">
                    <Info size={48} className="mx-auto text-[#D8F3DC] mb-4" />
                    <p className="text-[#52796F] font-bold">Initializing growth steps for this cultivation...</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="h-[60vh] flex flex-col items-center justify-center text-center p-12 glass-card">
              <div className="w-20 h-20 bg-[#F8FAF9] rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={48} className="text-[#D8F3DC]" />
              </div>
              <h3 className="text-2xl font-bold text-[#1B4332] mb-2">Awaiting Selection</h3>
              <p className="text-[#52796F] max-w-sm">Select an active crop from the left to view your personalized smart advisory timeline.</p>
            </div>
          )}
        </div>

      </div>
    </>
  );
};

export default GrowthProtocol;
