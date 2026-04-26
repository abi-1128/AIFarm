import React, { useState, useEffect } from 'react';
import { cropService, landService } from '../services/api';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { 
  Sprout, 
  MapPin, 
  Calendar, 
  Droplets, 
  DollarSign, 
  Target, 
  ArrowRight,
  ShieldAlert,
  TrendingUp,
  ChevronRight,
  Info
} from 'lucide-react';

const Recommendation = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState([]);
  const [lands, setLands] = useState([]);
  const [selectedLand, setSelectedLand] = useState('');
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  // Form states
  const [form, setForm] = useState({
    landType: 'Plain',
    soilType: 'Alluvial',
    season: 'Kharif',
    waterAvailability: 'High',
    budget: '50000'
  });

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
      if (landsRes.data.length > 0) setSelectedLand(landsRes.data[0].id);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      // In a real app, we'd pass the form data too
      await cropService.createRecommendation(selectedLand);
      await fetchData();
    } catch (err) {
      console.error(err);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF9]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D6A4F]"></div>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader title="AI Crop Recommendation" user={user} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Section */}
          <div className="lg:col-span-4 space-y-8">
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Target size={20} className="text-[#2D6A4F]" /> Farm Parameters
              </h3>
              
              <div className="space-y-5">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#52796F] uppercase">Select Land</label>
                  <select 
                    className="w-full px-4 py-3 bg-[#F8FAF9] border border-[#D8F3DC] rounded-xl focus:ring-2 focus:ring-[#2D6A4F] transition-all"
                    value={selectedLand}
                    onChange={(e) => setSelectedLand(e.target.value)}
                  >
                    {lands.map(l => (
                      <option key={l.id} value={l.id}>{l.location} ({l.size} Acres)</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#52796F] uppercase">Soil Type</label>
                  <select 
                    className="w-full px-4 py-3 bg-[#F8FAF9] border border-[#D8F3DC] rounded-xl focus:ring-2 focus:ring-[#2D6A4F] transition-all"
                    value={form.soilType}
                    onChange={(e) => setForm({...form, soilType: e.target.value})}
                  >
                    <option>Alluvial</option>
                    <option>Black Soil</option>
                    <option>Red Soil</option>
                    <option>Laterite</option>
                    <option>Sandy</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#52796F] uppercase">Season</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Kharif', 'Rabi'].map(s => (
                      <button 
                        key={s}
                        onClick={() => setForm({...form, season: s})}
                        className={`py-3 rounded-xl border font-bold text-sm transition-all ${
                          form.season === s ? 'bg-[#2D6A4F] text-white border-[#2D6A4F]' : 'bg-white text-[#52796F] border-[#D8F3DC] hover:border-[#2D6A4F]'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#52796F] uppercase">Water Availability</label>
                  <select 
                    className="w-full px-4 py-3 bg-[#F8FAF9] border border-[#D8F3DC] rounded-xl focus:ring-2 focus:ring-[#2D6A4F] transition-all"
                    value={form.waterAvailability}
                    onChange={(e) => setForm({...form, waterAvailability: e.target.value})}
                  >
                    <option>High (Canal/Pump)</option>
                    <option>Medium (Well)</option>
                    <option>Low (Rainfed)</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#52796F] uppercase">Budget (₹)</label>
                  <input 
                    type="range" 
                    min="10000" 
                    max="500000" 
                    step="5000"
                    className="w-full h-2 bg-[#D8F3DC] rounded-lg appearance-none cursor-pointer accent-[#2D6A4F]"
                    value={form.budget}
                    onChange={(e) => setForm({...form, budget: e.target.value})}
                  />
                  <div className="flex justify-between text-xs font-bold text-[#2D6A4F]">
                    <span>₹10k</span>
                    <span>₹{parseInt(form.budget).toLocaleString()}</span>
                    <span>₹5L</span>
                  </div>
                </div>

                <button 
                  onClick={handleGenerate}
                  disabled={generating}
                  className="btn-primary w-full py-4 mt-4 justify-center shadow-lg disabled:opacity-70"
                >
                  {generating ? 'AI Analyzing...' : 'Generate AI Plan'}
                  <ArrowRight size={20} />
                </button>
              </div>
            </div>

            <div className="p-6 bg-[#E9F5F8] rounded-3xl border border-[#3A86FF1a] flex gap-4">
              <Info className="text-[#3A86FF] shrink-0" />
              <p className="text-sm text-[#52796F]">
                Our AI uses satellite imagery and historical soil data to provide 95% accurate crop predictions.
              </p>
            </div>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-8 space-y-8">
            {recommendations.length > 0 ? (
              <div className="space-y-8">
                {/* Top Recommendation */}
                <div className="glass-card p-10 bg-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[#D8F3DC] blur-[100px] rounded-full -z-10"></div>
                  
                  <div className="flex flex-col md:flex-row gap-10 items-center">
                    <div className="w-48 h-48 bg-[#F8FAF9] rounded-[40px] flex items-center justify-center border border-[#D8F3DC] shadow-inner">
                      <img src="/farming_3d_icons_set_1777140649782.png" alt="Crop" className="h-32 img-3d" />
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="inline-block px-4 py-1 bg-[#2D6A4F] text-white rounded-full text-[10px] font-bold uppercase tracking-widest">
                        Best Choice
                      </div>
                      <h2 className="text-5xl font-bold text-[#1B4332]">{recommendations[0].crop_details?.name || 'Basmati Rice'}</h2>
                      <p className="text-lg text-[#52796F] italic">"{recommendations[0].reason}"</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                        <ResultStat label="Yield" value="4.2 t/Acre" />
                        <ResultStat label="Profit" value="₹1.8L" />
                        <ResultStat label="Confidence" value="98%" />
                        <ResultStat label="Risk" value="Low" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Detailed Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="glass-card p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <TrendingUp size={20} className="text-[#2D6A4F]" /> Financial Analysis
                    </h3>
                    <div className="space-y-4">
                      <AnalysisRow label="Initial Investment" value="₹45,000" />
                      <AnalysisRow label="Maintenance Cost" value="₹12,000" />
                      <AnalysisRow label="Projected Sales" value="₹2,40,000" />
                      <div className="pt-4 border-t border-[#D8F3DC] flex justify-between">
                        <span className="font-bold text-[#1B4332]">Net Profit</span>
                        <span className="font-bold text-2xl text-[#2D6A4F]">₹1,83,000</span>
                      </div>
                    </div>
                  </div>

                  <div className="glass-card p-8">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                      <ShieldAlert size={20} className="text-amber-500" /> Risk Assessment
                    </h3>
                    <div className="space-y-4">
                      <RiskItem label="Pest Susceptibility" level="Low" color="text-green-600" />
                      <RiskItem label="Weather Vulnerability" level="Medium" color="text-amber-600" />
                      <RiskItem label="Market Volatility" level="Low" color="text-green-600" />
                      <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 mt-4">
                        <p className="text-xs text-amber-800 font-medium">
                          Alert: Mild risk of stem borer detected in nearby fields. Early preventive spraying recommended.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cultivation Roadmap */}
                <div className="glass-card p-8">
                  <h3 className="text-xl font-bold mb-8">Cultivation Roadmap</h3>
                  <div className="space-y-8 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#D8F3DC]">
                    {recommendations[0].tasks?.slice(0, 3).map((task, i) => (
                      <div key={task.id} className="relative pl-12">
                        <div className="absolute left-0 top-1 w-8 h-8 bg-white border-4 border-[#2D6A4F] rounded-full z-10"></div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-[#1B4332]">{task.title}</h4>
                            <p className="text-sm text-[#52796F]">{task.instruction}</p>
                          </div>
                          <span className="text-[10px] font-bold bg-[#D8F3DC] text-[#2D6A4F] px-3 py-1 rounded-full uppercase">Day {i * 7}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="glass-card p-20 flex flex-col items-center justify-center text-center">
                <div className="w-24 h-24 bg-[#F8FAF9] rounded-full flex items-center justify-center mb-6">
                  <Sprout size={48} className="text-[#D8F3DC]" />
                </div>
                <h3 className="text-2xl font-bold text-[#1B4332] mb-2">No Recommendations Yet</h3>
                <p className="text-[#52796F] max-w-sm mb-8">
                  Fill in your farm parameters on the left and click 'Generate AI Plan' to see the best crops for your land.
                </p>
              </div>
            )}
          </div>

        </div>
    </>
  );
};

const ResultStat = ({ label, value }) => (
  <div className="bg-[#F8FAF9] p-3 rounded-2xl border border-[#D8F3DC] text-center">
    <p className="text-[10px] font-bold text-[#52796F] uppercase tracking-wider mb-1">{label}</p>
    <p className="text-sm font-bold text-[#1B4332]">{value}</p>
  </div>
);

const AnalysisRow = ({ label, value }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-[#52796F] font-medium">{label}</span>
    <span className="text-[#1B4332] font-bold">{value}</span>
  </div>
);

const RiskItem = ({ label, level, color }) => (
  <div className="flex justify-between items-center text-sm">
    <span className="text-[#52796F] font-medium">{label}</span>
    <span className={`font-bold ${color}`}>{level}</span>
  </div>
);

export default Recommendation;
