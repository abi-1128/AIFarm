import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { marketplaceService } from '../services/api';
import { 
  ShoppingBag, 
  MapPin, 
  Search, 
  ChevronRight, 
  TrendingUp, 
  Clock,
  CheckCircle,
  Truck,
  User,
  Heart,
  Star,
  CreditCard,
  Package,
  History,
  Navigation,
  Filter,
  ArrowRight
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

const BuyerDashboard = () => {
  const { user } = useAuth();
  const [activeModule, setActiveModule] = useState('marketplace');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prodRes, orderRes] = await Promise.all([
          marketplaceService.getProducts(),
          marketplaceService.getOrders()
        ]);
        setProducts(prodRes.data);
        setOrders(orderRes.data);
      } catch (err) {
        console.error("Commerce Sync Failure", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const menuItems = [
    { id: 'marketplace', label: 'Fresh Market', icon: ShoppingBag },
    { id: 'orders', label: 'Order History', icon: History },
    { id: 'wishlist', label: 'Curated List', icon: Heart },
    { id: 'profile', label: 'Buyer Profile', icon: User },
    { id: 'payment', label: 'Payment Hub', icon: CreditCard }
  ];

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0a0f0d] space-y-6">
      <div className="w-16 h-16 border-4 border-blue-500/10 border-t-blue-500 rounded-full animate-spin" />
      <p className="text-[10px] font-black text-blue-500/50 uppercase tracking-[0.8em]">Initializing Market Link...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0f0d] text-white flex flex-col lg:flex-row overflow-hidden">
      {/* Buyer Sidebar */}
      <aside className="w-full lg:w-80 bg-[#0d1412]/80 backdrop-blur-2xl border-r border-white/5 p-8 flex flex-col space-y-12 z-50">
        <div className="space-y-2">
           <div className="flex items-center space-x-4 mb-4">
             <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                <ShoppingBag className="text-white" size={24} />
             </div>
             <h1 className="text-2xl font-black tracking-tighter uppercase leading-none">Agri<span className="text-blue-500">Buyer</span></h1>
           </div>
           <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest border-t border-white/5 pt-4">Premium Buyer Protocol</p>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`w-full flex items-center space-x-4 px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 group relative ${
                activeModule === item.id 
                  ? 'bg-blue-600 text-white shadow-[0_8px_30px_rgba(37,99,235,0.2)]' 
                  : 'text-gray-500 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} className={`${activeModule === item.id ? 'text-white' : 'text-gray-600 group-hover:text-blue-400'}`} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="glass p-6 rounded-[2rem] border border-white/5 flex items-center space-x-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
            <User size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-black text-white truncate uppercase tracking-tighter">{user?.username}</p>
            <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest">Global Buyer</p>
          </div>
        </div>
      </aside>

      {/* Buyer Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-6 lg:p-12 space-y-12 custom-scrollbar relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <AnimatePresence mode="wait">
          {activeModule === 'marketplace' && (
            <motion.div
              key="marketplace"
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, x: -20 }}
              variants={containerVariants}
              className="space-y-12"
            >
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                 <div className="space-y-4">
                    <h2 className="text-6xl font-black tracking-tighter uppercase leading-none">Fresh <br/><span className="text-blue-500">Marketplace</span></h2>
                    <p className="text-gray-500 text-xl font-bold tracking-tight max-w-xl">Direct access to the world's most sustainable agricultural products.</p>
                 </div>
                 <div className="flex items-center space-x-4 bg-white/5 p-2 rounded-2xl border border-white/5 backdrop-blur-3xl">
                    <div className="relative group">
                       <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-hover:text-blue-400 transition-colors" size={18} />
                       <input 
                        type="text" 
                        placeholder="SEARCH PRODUCTS..." 
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-transparent border-none focus:ring-0 text-[10px] font-black uppercase tracking-widest pl-12 pr-6 py-3 w-64 text-white placeholder-gray-700"
                       />
                    </div>
                    <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-gray-500 hover:text-white transition-all"><Filter size={18} /></button>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 mt-12">
                 {products.filter(p => !filter || p.crop_name.toLowerCase().includes(filter.toLowerCase())).map((p) => (
                   <motion.div
                    key={p.id}
                    variants={itemVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="glass rounded-[3rem] overflow-hidden group border border-white/5 hover:border-blue-500/20 transition-all duration-500"
                   >
                     <div className="h-64 relative overflow-hidden">
                        <img 
                          src={p.image_url || 'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=400&h=400&crop=faces'} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                          alt={p.crop_name} 
                        />
                        <div className="absolute top-6 left-6 bg-blue-600 text-white px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/20 shadow-xl">
                           ₹{p.price_per_kg}/KG
                        </div>
                        <button className="absolute top-6 right-6 p-3 rounded-full bg-black/20 backdrop-blur-md text-white/40 hover:text-rose-500 transition-colors border border-white/10 shadow-xl">
                           <Heart size={16} />
                        </button>
                     </div>
                     <div className="p-8 space-y-6">
                        <div className="flex justify-between items-start">
                           <div>
                              <h4 className="text-2xl font-black uppercase tracking-tighter leading-none mb-1">{p.crop_name}</h4>
                              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest flex items-center"><MapPin size={10} className="mr-2 text-blue-500" /> {p.location}</p>
                           </div>
                           <div className="flex items-center space-x-1 text-amber-500">
                              <Star size={12} fill="currentColor" />
                              <span className="text-[10px] font-black">4.8</span>
                           </div>
                        </div>
                        
                        <div className="flex items-center justify-between border-t border-white/5 pt-6">
                           <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                                 <User size={14} />
                              </div>
                              <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{p.seller_name}</span>
                           </div>
                           <button className="bg-white text-black px-6 py-2.5 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-3xl">Trade</button>
                        </div>
                     </div>
                   </motion.div>
                 ))}
              </div>
            </motion.div>
          )}

          {activeModule === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              <h2 className="text-6xl font-black tracking-tighter uppercase leading-none">Order <span className="text-blue-500">History</span></h2>
              
              <div className="glass rounded-[3.5rem] overflow-hidden border border-white/5">
                <div className="overflow-x-auto">
                   <table className="w-full text-left">
                      <thead className="bg-white/5 border-b border-white/5">
                        <tr>
                          <th className="p-10 text-[10px] font-black text-gray-500 uppercase tracking-widest">Transaction</th>
                          <th className="p-10 text-[10px] font-black text-gray-500 uppercase tracking-widest">Weight</th>
                          <th className="p-10 text-[10px] font-black text-gray-500 uppercase tracking-widest">Capital</th>
                          <th className="p-10 text-[10px] font-black text-gray-500 uppercase tracking-widest">Telemetry</th>
                          <th className="p-10 text-[10px] font-black text-gray-500 uppercase tracking-widest">Protocol Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                         {orders.map(o => (
                           <tr key={o.id} className="hover:bg-white/5 transition-colors group">
                             <td className="p-10">
                                <div className="flex items-center space-x-6">
                                   <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 font-black text-xl shadow-inner border border-blue-500/10">
                                      {o.product_name?.[0]}
                                   </div>
                                   <div>
                                      <p className="font-black text-lg text-white group-hover:text-blue-400 transition-colors uppercase tracking-tight">{o.product_name}</p>
                                      <p className="text-[10px] text-gray-600 font-bold tracking-widest uppercase">ID #{o.id}</p>
                                   </div>
                                </div>
                             </td>
                             <td className="p-10 font-black text-white">{o.quantity} KG</td>
                             <td className="p-10 font-black text-blue-400 text-lg">₹{o.total_price}</td>
                             <td className="p-10">
                                <span className={`px-5 py-2 rounded-full text-[10px] font-black uppercase flex items-center w-fit space-x-2 border ${
                                  o.status === 'DELIVERED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                                  o.status === 'SHIPPED' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                                }`}>
                                  {o.status === 'DELIVERED' ? <CheckCircle size={14} /> : o.status === 'SHIPPED' ? <Truck size={14} /> : <Clock size={14} />}
                                  <span>{o.status}</span>
                                </span>
                             </td>
                             <td className="p-10 text-gray-500 font-bold">{new Date(o.order_date).toLocaleDateString()}</td>
                           </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
                {orders.length === 0 && (
                  <div className="p-32 text-center space-y-8">
                     <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto text-gray-700">
                        <History size={48} strokeWidth={1} />
                     </div>
                     <div className="space-y-4">
                        <p className="text-gray-500 text-2xl font-black uppercase tracking-tight">Vault Empty</p>
                        <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest max-w-xs mx-auto">Initialize trade protocols with local farms to populate history.</p>
                     </div>
                     <button onClick={() => setActiveModule('marketplace')} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-3xl hover:scale-105 transition-all">Go to Market</button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {(activeModule === 'wishlist' || activeModule === 'profile' || activeModule === 'payment') && (
            <motion.div key="upcoming" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="h-[65vh] flex flex-col items-center justify-center text-center space-y-10 p-12 glass rounded-[4rem] border border-white/5">
                <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-blue-500 border border-blue-500/10 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
                   <Package size={48} strokeWidth={1} className="animate-pulse" />
                </div>
                <div className="space-y-4">
                   <h3 className="text-4xl font-black tracking-tighter uppercase leading-none">Security Protocol <span className="text-blue-500">Syncing</span></h3>
                   <p className="text-gray-500 font-bold max-w-md mx-auto text-xl leading-relaxed">The {menuItems.find(m => m.id === activeModule)?.label} module is currently being optimized for global commerce standards.</p>
                </div>
                <button onClick={() => setActiveModule('marketplace')} className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] shadow-3xl hover:translate-y-[-4px] transition-all">Return to Trade Hub</button>
            </motion.div>
          )}
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
          background: rgba(37, 99, 235, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(37, 99, 235, 0.3);
        }
        .glass {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(50px);
          -webkit-backdrop-filter: blur(50px);
        }
        .shadow-3xl {
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.4);
        }
      `}} />
    </div>
  );
};

export default BuyerDashboard;
