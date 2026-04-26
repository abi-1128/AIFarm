import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { landService } from '../services/api';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { MapPin, Layers, Sprout, ArrowRight, Save, X } from 'lucide-react';

const AddLand = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    size: '',
    soil_type: 'Alluvial',
    lat: 28.61,
    long: 77.20
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await landService.createLand(formData);
      navigate('/farmer');
    } catch (err) {
      console.error(err);
      alert("Failed to add land. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardHeader title="Add New Land" user={user} />
      
      <div className="max-w-4xl mx-auto py-10">
        <div className="glass-card overflow-hidden">
          <div className="bg-[#2D6A4F] p-8 text-white flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold mb-2">Register Your Land</h2>
              <p className="text-[#D8F3DC] text-sm">Provide details to enable AI field monitoring and crop recommendations.</p>
            </div>
            <MapPin size={48} className="opacity-20" />
          </div>
          
          <form onSubmit={handleSubmit} className="p-10 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-xs font-bold text-[#52796F] uppercase flex items-center gap-2">
                  <MapPin size={14} /> Field Location / Name
                </label>
                <input 
                  required
                  type="text" 
                  placeholder="e.g. North Plain Sector B" 
                  className="w-full px-5 py-4 bg-[#F8FAF9] border border-[#D8F3DC] rounded-2xl focus:border-[#2D6A4F] outline-none font-bold"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-[#52796F] uppercase flex items-center gap-2">
                  <Layers size={14} /> Land Size (Acres)
                </label>
                <input 
                  required
                  type="number" 
                  placeholder="e.g. 5.5" 
                  className="w-full px-5 py-4 bg-[#F8FAF9] border border-[#D8F3DC] rounded-2xl focus:border-[#2D6A4F] outline-none font-bold"
                  value={formData.size}
                  onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-[#52796F] uppercase flex items-center gap-2">
                  <Sprout size={14} /> Soil Type
                </label>
                <select 
                  className="w-full px-5 py-4 bg-[#F8FAF9] border border-[#D8F3DC] rounded-2xl focus:border-[#2D6A4F] outline-none font-bold appearance-none cursor-pointer"
                  value={formData.soil_type}
                  onChange={(e) => setFormData({ ...formData, soil_type: e.target.value })}
                >
                  <option>Alluvial</option>
                  <option>Black Soil</option>
                  <option>Red Soil</option>
                  <option>Laterite</option>
                  <option>Desert</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-[#52796F] uppercase flex items-center gap-2">
                   GPS Coordinates (Simulated)
                </label>
                <div className="flex gap-4">
                   <div className="flex-1 bg-[#F8FAF9] p-4 rounded-2xl border border-[#D8F3DC] text-sm font-bold text-[#52796F]">
                      Lat: 28.61
                   </div>
                   <div className="flex-1 bg-[#F8FAF9] p-4 rounded-2xl border border-[#D8F3DC] text-sm font-bold text-[#52796F]">
                      Long: 77.20
                   </div>
                </div>
              </div>
            </div>

            <div className="pt-6 flex flex-col md:flex-row gap-4">
              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary flex-1 py-4 justify-center shadow-lg hover:scale-[1.02] active:scale-[0.98]"
              >
                {loading ? 'Initializing AI Node...' : 'Register Land Quadrant'}
                <Save size={20} />
              </button>
              <button 
                type="button"
                onClick={() => navigate('/farmer')}
                className="px-8 py-4 bg-[#F8FAF9] text-[#52796F] font-bold rounded-2xl border border-[#D8F3DC] hover:bg-white hover:text-red-600 hover:border-red-100 transition-all flex items-center justify-center gap-2"
              >
                <X size={20} /> Cancel
              </button>
            </div>
          </form>

          <div className="p-8 bg-[#F8FAF9] border-t border-[#D8F3DC] flex gap-6">
             <div className="w-16 h-16 bg-white rounded-2xl border border-[#D8F3DC] flex items-center justify-center shrink-0">
                <img src="/farming_3d_icons_set_1777140649782.png" className="h-10 img-3d" alt="3d" />
             </div>
             <div>
                <h5 className="font-bold text-[#1B4332] mb-1">Satellite Mapping Integration</h5>
                <p className="text-xs text-[#52796F]">Once registered, our Neural Engine will automatically perform a multispectral satellite scan of your field every 24 hours.</p>
             </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLand;
