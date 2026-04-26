import React, { useState, useEffect } from 'react';
import { marketplaceService } from '../services/api';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { 
  ShoppingBag, 
  TrendingUp, 
  MapPin, 
  Truck, 
  Clock, 
  ArrowRight,
  Search,
  Filter,
  BarChart2,
  Box
} from 'lucide-react';

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, orderRes] = await Promise.all([
        marketplaceService.getProducts(),
        marketplaceService.getOrders(),
      ]);
      setRecentProducts(prodRes.data.slice(0, 4));
      setRecentOrders(orderRes.data.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
      <DashboardHeader title="Buyer Dashboard" user={user} />

      {/* Hero Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        <StatCard label="Active Orders" value={recentOrders.length} icon={ShoppingBag} color="text-blue-600" />
        <StatCard label="Total Spent" value="₹45,800" icon={TrendingUp} color="text-[#2D6A4F]" />
        <StatCard label="Tracked Shipments" value="2" icon={Truck} color="text-amber-600" />
        <StatCard label="Market Avg Index" value="+2.4%" icon={BarChart2} color="text-emerald-600" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Marketplace Preview */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-xl font-bold">Recommended Produce</h3>
            <button className="text-sm font-bold text-[#2D6A4F] flex items-center gap-2 hover:gap-3 transition-all">
              Marketplace <ArrowRight size={18} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentProducts.map(p => (
              <div key={p.id} className="glass-card group overflow-hidden flex">
                <div className="w-32 h-full relative overflow-hidden bg-[#F8FAF9]">
                  <img src={p.image_url || '/farming_3d_icons_set_1777140649782.png'} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={p.crop_name} />
                </div>
                <div className="flex-1 p-5 space-y-3">
                  <div>
                    <h4 className="font-bold text-[#1B4332]">{p.crop_name}</h4>
                    <p className="text-[10px] text-[#52796F] flex items-center gap-1 uppercase tracking-widest">
                      <MapPin size={10} /> {p.location}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <p className="text-lg font-bold text-[#2D6A4F]">₹{p.price_per_kg}<span className="text-[10px] text-[#52796F]">/kg</span></p>
                    <button className="text-[10px] font-bold text-[#2D6A4F] border border-[#D8F3DC] px-3 py-1 rounded-lg hover:bg-[#D8F3DC] transition-all">ORDER</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-card p-8 bg-[#2D6A4F] text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
             <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">Live Price Tracking</h3>
                <p className="text-[#D8F3DC] text-sm mb-6 max-w-md">Set up alerts for your favorite crops and get notified when prices reach your target range.</p>
                <div className="flex gap-4">
                   <button className="px-6 py-2 bg-white text-[#2D6A4F] font-bold rounded-xl text-sm">Set Alerts</button>
                   <button className="px-6 py-2 bg-[#1B4332] text-white font-bold rounded-xl text-sm border border-white/10">View Index</button>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar: Orders & Trends */}
        <div className="lg:col-span-4 space-y-8">
           <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><Clock size={20} className="text-[#2D6A4F]" /> Recent Orders</h3>
              <div className="space-y-4">
                 {recentOrders.length > 0 ? recentOrders.map(o => (
                   <div key={o.id} className="flex justify-between items-center p-3 hover:bg-[#F8FAF9] rounded-2xl transition-all border border-transparent hover:border-[#D8F3DC]">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-[#D8F3DC] rounded-xl flex items-center justify-center text-[#2D6A4F]">
                            <Box size={18} />
                         </div>
                         <div>
                            <p className="text-xs font-bold text-[#1B4332]">{o.product_name}</p>
                            <p className="text-[10px] text-[#52796F]">{o.status}</p>
                         </div>
                      </div>
                      <ChevronRight size={16} className="text-[#D8F3DC]" />
                   </div>
                 )) : (
                   <p className="text-xs text-[#52796F] text-center py-4">No recent orders found.</p>
                 )}
              </div>
           </div>

           <div className="glass-card p-6">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2"><BarChart2 size={20} className="text-[#2D6A4F]" /> Market Signals</h3>
              <div className="space-y-5">
                 <SignalItem label="Basmati Rice" status="Upward" color="text-green-600" />
                 <SignalItem label="Yellow Wheat" status="Stable" color="text-blue-600" />
                 <SignalItem label="Organic Mustard" status="Volatile" color="text-amber-600" />
                 <SignalItem label="Long Grain Corn" status="Downward" color="text-red-600" />
              </div>
           </div>
        </div>

      </div>
    </>
  );
};

const StatCard = ({ label, value, icon: Icon, color }) => (
  <div className="glass-card p-6 flex items-center gap-6">
    <div className={`w-12 h-12 bg-[#F8FAF9] rounded-2xl flex items-center justify-center border border-[#D8F3DC] ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-[10px] font-bold text-[#52796F] uppercase tracking-widest mb-1">{label}</p>
      <h4 className="text-2xl font-bold text-[#1B4332]">{value}</h4>
    </div>
  </div>
);

const SignalItem = ({ label, status, color }) => (
  <div className="flex justify-between items-center">
     <span className="text-xs font-bold text-[#1B4332]">{label}</span>
     <span className={`text-[10px] font-bold uppercase ${color}`}>{status}</span>
  </div>
);

const ChevronRight = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

export default BuyerDashboard;
