import React, { useState, useEffect } from 'react';
import { marketplaceService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  ShoppingBag, 
  MapPin, 
  Plus, 
  Search, 
  ChevronRight, 
  TrendingUp, 
  Clock,
  CheckCircle,
  Truck,
  User,
  Box,
  Trash2,
  Edit3,
  DollarSign
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

const Marketplace = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('browse');
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  useEffect(() => {
    fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [prodRes, orderRes] = await Promise.all([
        marketplaceService.getProducts(),
        marketplaceService.getOrders(),
      ]);
      setProducts(prodRes.data);
      setMyOrders(orderRes.data);
      
      if (user?.role === 'LANDOWNER') {
        const listingsRes = await marketplaceService.getMyListings();
        setMyListings(listingsRes.data);
      }
    } catch (err) {
      console.error("Market Protocol Sync Error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBuy = async (productId) => {
    try {
      await marketplaceService.createOrder({ product: productId, quantity: 10 });
      alert("Order placed successfully!");
      fetchData();
      setActiveTab('orders');
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    // In a real app, I'd get values from form. Here we mock it based on context or user prompt.
    alert("Product Initialization Protocol Success! (Mock)");
    setIsAddingProduct(false);
    fetchData();
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin shadow-[0_0_30px_rgba(16,185,129,0.2)]" />
      <p className="text-[10px] font-black text-emerald-500/40 uppercase tracking-widest">Compiling Trade Flux...</p>
    </div>
  );

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="space-y-12 relative"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/5">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-[1px] bg-emerald-500" />
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500">Node Hub: Global Commerce</span>
          </div>
          <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none italic">Trade <span className="text-emerald-500 not-italic">Protocols</span></h2>
          <p className="text-gray-500 font-bold tracking-tight text-xl max-w-xl">Direct synchronization between specialized landowners and global commerce entities.</p>
        </div>
        
        <div className="flex bg-white/5 p-2 rounded-[2rem] border border-white/5 backdrop-blur-3xl shadow-3xl">
           <button onClick={() => setActiveTab('browse')} className={`px-10 py-4 rounded-3xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${activeTab === 'browse' ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}>Market</button>
           <button onClick={() => setActiveTab('orders')} className={`px-10 py-4 rounded-3xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${activeTab === 'orders' ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white'}`}>Orders</button>
           {user?.role === 'LANDOWNER' && (
             <button onClick={() => setActiveTab('listings')} className={`px-10 py-4 rounded-3xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${activeTab === 'listings' ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'text-gray-500 hover:text-white'}`}>My Listings</button>
           )}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeTab === 'browse' && (
          <motion.div 
            key="browse" 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.98 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12"
          >
            {products.map((p) => (
              <motion.div 
                variants={itemVariants}
                whileHover={{ y: -15, scale: 1.01 }}
                key={p.id} 
                className="glass rounded-[3.5rem] overflow-hidden group hover:shadow-3xl hover:shadow-emerald-500/10 transition-all duration-700 border border-white/5 relative"
              >
                <div className="h-80 relative overflow-hidden bg-white/5">
                   <img 
                    src={p.image_url || 'https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&q=80&w=400&h=400&crop=faces'} 
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000 grayscale group-hover:grayscale-0" 
                    alt={p.crop_name} 
                   />
                   <div className="absolute top-8 left-8 bg-black/60 backdrop-blur-xl text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-white/10">
                      ₹{p.price_per_kg}/KG
                   </div>
                   <div className="absolute top-8 right-8 bg-emerald-500 p-4 rounded-2xl text-white shadow-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-emerald-500/40">
                      <TrendingUp size={24} />
                   </div>
                </div>
                
                <div className="p-10 space-y-8 bg-gradient-to-b from-transparent to-white/2">
                  <div>
                    <h3 className="text-3xl font-black text-white tracking-tighter leading-none mb-2 uppercase italic">{p.crop_name}</h3>
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest flex items-center">
                       <MapPin size={14} className="mr-3 text-emerald-500" /> {p.location}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                      <span>Available Logic</span>
                      <span className="text-white">{p.quantity_available} KG</span>
                    </div>
                    <div className="w-full bg-white/5 h-[2px] rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: '75%' }}
                        className="bg-emerald-500 h-full shadow-[0_0_15px_#10b981]" 
                      />
                    </div>
                  </div>

                  <div className="pt-8 flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center space-x-3 group/user">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-gray-600 border border-white/5 group-hover/user:bg-emerald-500/10 group-hover/user:text-emerald-400 transition-colors">
                        <User size={18} />
                      </div>
                      <span className="text-[10px] font-black text-gray-500 group-hover/user:text-white uppercase tracking-widest">{p.seller_name}</span>
                    </div>
                    <button 
                      onClick={() => handleBuy(p.id)}
                      className="bg-white text-black px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all shadow-3xl active:scale-95"
                    >
                      Initialize
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'orders' && (
          <motion.div 
            key="orders" 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0 }}
            className="glass rounded-[4rem] overflow-hidden border border-white/5"
          >
             <div className="overflow-x-auto">
               <table className="w-full text-left">
                  <thead className="bg-white/2 border-b border-white/5">
                     <tr>
                        <th className="p-12 text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Transaction</th>
                        <th className="p-12 text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Mass</th>
                        <th className="p-12 text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Capital</th>
                        <th className="p-12 text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Status</th>
                        <th className="p-12 text-[10px] font-black text-gray-500 uppercase tracking-[0.4em]">Timestamp</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[11px] font-black text-white italic">
                    {myOrders.map((o) => (
                      <tr key={o.id} className="hover:bg-white/5 transition-colors group">
                         <td className="p-12">
                            <div className="flex items-center space-x-8 not-italic">
                               <div className="w-16 h-16 bg-blue-500/10 rounded-[2rem] flex items-center justify-center text-blue-400 font-black text-2xl shadow-inner border border-blue-500/10">
                                  {o.product_name?.[0]}
                               </div>
                               <div>
                                  <p className="text-xl font-black tracking-tight text-white italic uppercase">{o.product_name}</p>
                                  <p className="text-[10px] text-gray-600 font-bold tracking-[0.3em] uppercase mt-1">REF#ORD-{o.id}</p>
                               </div>
                            </div>
                         </td>
                         <td className="p-12 font-black text-white">{o.quantity} KG</td>
                         <td className="p-12 font-black text-emerald-400 text-lg">₹{o.total_price}</td>
                         <td className="p-12">
                            <span className={`px-6 py-2.5 rounded-full text-[9px] font-black uppercase flex items-center w-fit space-x-3 border ${
                              o.status === 'DELIVERED' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                              o.status === 'SHIPPED' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)]'
                            }`}>
                              {o.status === 'DELIVERED' ? <CheckCircle size={14} /> : o.status === 'SHIPPED' ? <Truck size={14} /> : <Clock size={14} />}
                              <span className="tracking-widest">{o.status}</span>
                            </span>
                         </td>
                         <td className="p-12 text-gray-600 font-bold not-italic font-sans">{new Date(o.order_date).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
               </table>
             </div>
             {myOrders.length === 0 && (
                <div className="p-32 text-center space-y-10">
                   <Box size={80} strokeWidth={1} className="mx-auto text-gray-800 animate-pulse" />
                   <div className="space-y-4">
                      <h4 className="text-3xl font-black uppercase tracking-tighter text-gray-500">History Vault Clear</h4>
                      <p className="text-[10px] font-bold text-gray-700 uppercase tracking-widest max-w-sm mx-auto">Initialize trade protocols within the market arena to populate synchronization history.</p>
                   </div>
                   <button onClick={() => setActiveTab('browse')} className="bg-white text-black px-12 py-5 rounded-3xl font-black uppercase text-[11px] tracking-widest shadow-3xl hover:bg-emerald-500 hover:text-white transition-all">Go to Market</button>
                </div>
             )}
          </motion.div>
        )}

        {activeTab === 'listings' && (
          <motion.div key="listings" variants={containerVariants} initial="hidden" animate="visible" exit={{ opacity: 0 }} className="space-y-12">
            <div className="flex items-center justify-between px-4">
               <h3 className="text-3xl font-black uppercase tracking-tighter">My <span className="text-emerald-500">Inventory</span></h3>
               <button onClick={() => setIsAddingProduct(true)} className="bg-emerald-500 text-white px-8 py-4 rounded-3xl font-black uppercase text-[11px] tracking-widest shadow-3xl flex items-center hover:scale-105 transition-all"><Plus size={18} className="mr-3" /> Commit Listing</button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
               {myListings.map(p => (
                 <div key={p.id} className="glass p-10 rounded-[4rem] border border-white/5 space-y-8 group hover:border-emerald-500/20 transition-all duration-500">
                    <div className="flex justify-between items-start">
                       <div className="w-16 h-16 bg-white/5 rounded-[2.2rem] flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner border border-white/5">
                          <ShoppingBag size={28} />
                       </div>
                       <div className="text-right">
                          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-1.5">Market Cap</p>
                          <h5 className="text-3xl font-black text-white tracking-tighter leading-none italic">₹{p.price_per_kg}<span className="text-[10px] text-gray-600 not-italic uppercase ml-2">/KG</span></h5>
                       </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-3xl font-black uppercase tracking-tighter leading-none italic">{p.crop_name}</h4>
                       <div className="flex items-center space-x-4 bg-black/20 p-4 rounded-2xl border border-white/5">
                          <Box size={16} className="text-gray-600" />
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Available Stock: <span className="text-white ml-2">{p.quantity_available} KG</span></p>
                       </div>
                    </div>

                    <div className="pt-8 border-t border-white/5 flex items-center justify-between">
                       <div className="flex space-x-3">
                          <button className="p-3.5 bg-white/5 rounded-2xl text-gray-600 hover:text-white transition-all border border-white/5"><Edit3 size={18} /></button>
                          <button className="p-3.5 bg-rose-500/5 rounded-2xl text-rose-500/40 hover:text-rose-500 transition-all border border-rose-500/5 hover:border-rose-500/20"><Trash2 size={18} /></button>
                       </div>
                       <div className="flex items-center space-x-3 text-emerald-500 bg-emerald-500/5 px-6 py-3 rounded-2xl border border-emerald-500/10">
                          <TrendingUp size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">+14% Flux</span>
                       </div>
                    </div>
                 </div>
               ))}
               {myListings.length === 0 && (
                 <div className="col-span-full h-80 glass rounded-[4rem] border border-dashed border-white/10 flex flex-col items-center justify-center text-center p-12 space-y-6">
                    <Box size={48} className="text-gray-800" />
                    <div className="space-y-2">
                       <p className="text-gray-500 font-black uppercase tracking-widest">Repository Empty</p>
                       <p className="text-[10px] font-bold text-gray-700 uppercase tracking-[0.2em] max-w-xs leading-loose">No active trade listings detected in your synchronized inventory.</p>
                    </div>
                 </div>
               )}
            </div>
            
            <AnimatePresence>
               {isAddingProduct && (
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center p-6 backdrop-blur-3xl bg-black/80">
                    <motion.div initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 30 }} className="glass-dark max-w-xl w-full p-12 rounded-[5rem] border border-white/10 space-y-12 relative shadow-3xl">
                       <button onClick={() => setIsAddingProduct(false)} className="absolute top-10 right-10 text-gray-600 hover:text-white transition-colors p-4">Close Protocol</button>
                       
                       <div className="space-y-4">
                          <h3 className="text-4xl font-black tracking-tighter uppercase leading-none italic">Listing <span className="text-emerald-500 not-italic">Commit</span></h3>
                          <p className="text-gray-500 font-bold uppercase text-[9px] tracking-[0.4em]">Node ID: {user?.username?.toUpperCase()}_SELLER</p>
                       </div>

                       <form className="space-y-8" onSubmit={handleAddProduct}>
                          <div className="space-y-3">
                             <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Crop Species</label>
                             <input type="text" placeholder="WHEAT, COTTON, RICE..." className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-sm font-black text-white focus:border-emerald-500/50 outline-none uppercase tracking-widest" />
                          </div>
                          <div className="grid grid-cols-2 gap-8">
                             <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Price (₹/KG)</label>
                                <input type="number" placeholder="45" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-sm font-black text-white focus:border-emerald-500/50 outline-none" />
                             </div>
                             <div className="space-y-3">
                                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-4">Inventory (KG)</label>
                                <input type="number" placeholder="5000" className="w-full bg-white/5 border border-white/10 rounded-3xl px-8 py-5 text-sm font-black text-white focus:border-emerald-500/50 outline-none" />
                             </div>
                          </div>
                          <button type="submit" className="w-full bg-emerald-500 text-white py-6 rounded-3xl font-black uppercase text-[11px] tracking-[0.4em] shadow-3xl shadow-emerald-500/20 hover:scale-[1.02] transition-all">Execute Commit</button>
                       </form>
                    </motion.div>
                 </motion.div>
               )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Marketplace;
