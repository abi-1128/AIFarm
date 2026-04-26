import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { landService, cropService, weatherService } from '../services/api';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { 
  Sprout, 
  CloudSun, 
  Droplets, 
  TrendingUp, 
  AlertTriangle,
  ArrowRight,
  Plus,
  Thermometer,
  Wind,
  Layers,
  MapPin,
  Calendar as CalendarIcon
} from 'lucide-react';

const LandownerDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [lands, setLands] = useState([]);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [landsRes, weatherRes] = await Promise.all([
          landService.getLands(),
          weatherService.getWeather(28.61, 77.20) // Default coords
        ]);
        setLands(landsRes.data);
        setWeather(weatherRes.data);
      } catch (err) {
        console.error("Dashboard data fetch failed", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF9]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D6A4F]"></div>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader title="Farm Overview" user={user} />


        {/* Welcome & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          <StatCard 
            title="Total Land" 
            value={lands.reduce((acc, l) => acc + l.size, 0) + " Acres"} 
            icon={<Layers className="text-[#2D6A4F]" />}
            color="bg-[#D8F3DC]"
          />
          <StatCard 
            title="Active Crops" 
            value="3 Species" 
            icon={<Sprout className="text-[#40916C]" />}
            color="bg-[#B7E4C7]"
          />
          <StatCard 
            title="Est. Revenue" 
            value="₹4.2L" 
            icon={<TrendingUp className="text-[#2D6A4F]" />}
            color="bg-[#D8F3DC]"
          />
          <StatCard 
            title="Weather" 
            value={weather?.temp + "°C" || "28°C"} 
            icon={<CloudSun className="text-[#3A86FF]" />}
            color="bg-[#E9F5F8]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Recommended Crops Section */}
            <div className="glass-card p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">Recommended for You</h3>
                <button 
                  onClick={() => navigate('/farmer/recommendation')}
                  className="text-[#2D6A4F] font-semibold flex items-center gap-1 hover:underline"
                >
                  View All <ArrowRight size={16} />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CropRecommendationCard 
                  name="Basmati Rice" 
                  suitability="98%" 
                  profit="High" 
                  image="/farming_3d_icons_set_1777140649782.png" // Using the icon set for demo
                />
                <CropRecommendationCard 
                  name="Organic Wheat" 
                  suitability="85%" 
                  profit="Medium" 
                  image="/farming_3d_icons_set_1777140649782.png"
                />
                <CropRecommendationCard 
                  name="Mustard" 
                  suitability="72%" 
                  profit="Medium" 
                  image="/farming_3d_icons_set_1777140649782.png"
                />
              </div>
            </div>

            {/* Field Monitoring Cards (3D themed) */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold px-2">Active Field Monitoring</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {lands.map(land => (
                  <div key={land.id} className="glass-card overflow-hidden group">
                    <div className="h-48 bg-[#D8F3DC] relative flex items-center justify-center p-4">
                      <img src="/hero_farming_3d_1777140631220.png" alt="Field 3D" className="h-40 img-3d group-hover:scale-110 transition-transform" />
                      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-[#2D6A4F] border border-[#D8F3DC]">
                        LIVE SCAN
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold">{land.location}</h4>
                          <p className="text-sm text-[#52796F]">{land.size} Acres • {land.soil_type}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-bold text-[#52796F] uppercase">Soil Health</p>
                          <p className="text-lg font-bold text-[#40916C]">Optimal</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 border-t border-[#D8F3DC] pt-4">
                        <FieldMetric icon={<Droplets size={14} />} label="Moisture" value="42%" />
                        <FieldMetric icon={<Thermometer size={14} />} label="Temp" value="24°C" />
                        <FieldMetric icon={<Layers size={14} />} label="pH" value="6.5" />
                      </div>
                    </div>
                  </div>
                ))}
                {lands.length === 0 && (
                  <button 
                    onClick={() => navigate('/farmer/add-land')}
                    className="glass-card p-12 border-dashed border-2 flex flex-col items-center justify-center text-[#52796F] hover:text-[#2D6A4F] hover:border-[#2D6A4F] transition-all"
                  >
                    <div className="w-16 h-16 bg-[#D8F3DC] rounded-full flex items-center justify-center mb-4">
                      <Plus size={32} />
                    </div>
                    <p className="font-bold">Add Your First Land Quadrant</p>
                    <p className="text-xs">Start AI monitoring for your farm</p>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Weather Widget */}
            <div className="glass-card p-8 bg-[#2D6A4F] text-white">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <p className="text-[#B7E4C7] font-bold uppercase tracking-widest text-xs mb-1">Weather Forecast</p>
                  <h4 className="text-3xl font-bold">{weather?.condition || "Sunny Day"}</h4>
                  <p className="text-[#D8F3DC]">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
                </div>
                <CloudSun size={48} className="text-[#D8F3DC]" />
              </div>
              
              <div className="flex items-center gap-6 mb-8">
                <span className="text-6xl font-bold">{weather?.temp || 32}°</span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Wind size={16} /> <span>12 km/h</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Droplets size={16} /> <span>42% Humid</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/10 rounded-2xl border border-white/10 flex items-center gap-4">
                <AlertTriangle size={20} className="text-[#D8F3DC]" />
                <p className="text-xs font-medium">Ideal conditions for wheat harvest in the next 48 hours.</p>
              </div>
            </div>

            {/* Task Reminders */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <CalendarIcon size={20} className="text-[#2D6A4F]" /> Task Reminders
              </h3>
              <div className="space-y-4">
                <TaskItem title="Irrigate Sector B" time="Today, 04:00 PM" priority="High" />
                <TaskItem title="Soil Testing - Sector A" time="Tomorrow" priority="Medium" />
                <TaskItem title="Apply NPK Fertilizer" time="28 April" priority="Low" />
              </div>
              <button className="btn-secondary w-full mt-6 py-3">View Full Calendar</button>
            </div>

            {/* Market Prices */}
            <div className="glass-card p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp size={20} className="text-[#2D6A4F]" /> Market Trends
              </h3>
              <div className="space-y-4">
                <MarketItem crop="Rice" price="₹2,450" change="+2.4%" positive={true} />
                <MarketItem crop="Wheat" price="₹2,100" change="-0.8%" positive={false} />
                <MarketItem crop="Mustard" price="₹5,800" change="+1.2%" positive={true} />
              </div>
            </div>

          </div>
        </div>
    </>
  );
};

const StatCard = ({ title, value, icon, color }) => (
  <div className="glass-card p-6 flex items-center gap-5">
    <div className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center text-2xl shadow-sm`}>
      {icon}
    </div>
    <div>
      <p className="text-sm font-bold text-[#52796F] uppercase tracking-wider">{title}</p>
      <h4 className="text-2xl font-bold text-[#1B4332]">{value}</h4>
    </div>
  </div>
);

const CropRecommendationCard = ({ name, suitability, profit, image }) => (
  <div className="bg-[#F8FAF9] p-6 rounded-[24px] border border-[#D8F3DC] hover:border-[#2D6A4F] transition-all cursor-pointer group">
    <div className="flex justify-center mb-4">
      <img src={image} alt={name} className="h-20 img-3d group-hover:scale-110 transition-transform" />
    </div>
    <h4 className="text-lg font-bold text-[#1B4332] text-center mb-1">{name}</h4>
    <div className="flex justify-between items-center text-xs mt-4 pt-4 border-t border-[#D8F3DC]">
      <div className="text-center">
        <p className="text-[#52796F] font-bold">Suitability</p>
        <p className="text-[#2D6A4F] font-bold">{suitability}</p>
      </div>
      <div className="text-center">
        <p className="text-[#52796F] font-bold">Profit</p>
        <p className="text-[#40916C] font-bold">{profit}</p>
      </div>
    </div>
  </div>
);

const FieldMetric = ({ icon, label, value }) => (
  <div className="text-center">
    <div className="flex items-center justify-center gap-1 text-[#52796F] mb-1">
      {icon} <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </div>
    <p className="font-bold text-[#1B4332]">{value}</p>
  </div>
);

const TaskItem = ({ title, time, priority }) => (
  <div className="flex items-center justify-between p-4 bg-[#F8FAF9] rounded-2xl border border-[#D8F3DC]">
    <div>
      <p className="font-bold text-[#1B4332] text-sm">{title}</p>
      <p className="text-xs text-[#52796F]">{time}</p>
    </div>
    <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
      priority === 'High' ? 'bg-red-50 text-red-600 border border-red-100' :
      priority === 'Medium' ? 'bg-amber-50 text-amber-600 border border-amber-100' :
      'bg-blue-50 text-blue-600 border border-blue-100'
    }`}>
      {priority}
    </span>
  </div>
);

const MarketItem = ({ crop, price, change, positive }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-[#F8FAF9] rounded-xl flex items-center justify-center border border-[#D8F3DC]">
        <Sprout size={18} className="text-[#2D6A4F]" />
      </div>
      <p className="font-bold text-[#1B4332]">{crop}</p>
    </div>
    <div className="text-right">
      <p className="font-bold text-[#1B4332]">{price}</p>
      <p className={`text-xs font-bold ${positive ? 'text-green-600' : 'text-red-600'}`}>{change}</p>
    </div>
  </div>
);

export default LandownerDashboard;
