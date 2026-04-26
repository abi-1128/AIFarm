import React, { useState, useEffect } from 'react';
import { marketplaceService } from '../services/api';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { 
  ShoppingBag, 
  Search, 
  Plus, 
  TrendingUp, 
  MapPin, 
  Truck, 
  Clock, 
  CheckCircle,
  TrendingDown,
  Box,
  Filter
} from 'lucide-react';

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
      console.error("Market fetch failed", err);
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAF9]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2D6A4F]"></div>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader title="Market & Selling" user={user} />

      {/* Market Stats & Price Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <div className="lg:col-span-8 glass-card p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold">Live Market Prices</h3>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-[#D8F3DC] text-[#2D6A4F] text-[10px] font-bold rounded-full uppercase tracking-widest">Real-time</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <MarketPriceCard name="Wheat" price="₹2,150" change="+2.4%" positive={true} />
            <MarketPriceCard name="Basmati Rice" price="₹3,800" change="+1.8%" positive={true} />
            <MarketPriceCard name="Mustard" price="₹5,600" change="-0.5%" positive={false} />
            <MarketPriceCard name="Cotton" price="₹6,200" change="+3.2%" positive={true} />
          </div>
        </div>
        
        <div className="lg:col-span-4 glass-card p-8 bg-[#2D6A4F] text-white">
          <h3 className="text-lg font-bold mb-4">Sell Directly</h3>
          <p className="text-sm text-[#D8F3DC] mb-6">Skip the middleman. Connect directly with over 5,000 verified consumers and bulk buyers.</p>
          <button 
            onClick={() => setIsAddingProduct(true)}
            className="w-full py-3 bg-white text-[#2D6A4F] font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#D8F3DC] transition-all"
          >
            <Plus size={20} /> Create Listing
          </button>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="flex gap-8 mb-8 border-b border-[#D8F3DC]">
        <TabButton active={activeTab === 'browse'} onClick={() => setActiveTab('browse')} label="Marketplace" />
        <TabButton active={activeTab === 'orders'} onClick={() => setActiveTab('orders')} label="Transactions" />
        {user?.role === 'LANDOWNER' && (
          <TabButton active={activeTab === 'listings'} onClick={() => setActiveTab('listings')} label="My Listings" />
        )}
      </div>

      {activeTab === 'browse' && (
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#52796F]" size={18} />
                <input type="text" placeholder="Search produce..." className="w-full pl-10 pr-4 py-2 bg-white border border-[#D8F3DC] rounded-xl focus:outline-none focus:border-[#2D6A4F]" />
              </div>
              <button className="p-2 border border-[#D8F3DC] rounded-xl text-[#52796F] hover:bg-[#F8FAF9]">
                <Filter size={20} />
              </button>
            </div>
            <p className="text-sm font-bold text-[#52796F] uppercase tracking-widest">{products.length} Products Found</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map(p => (
              <div key={p.id} className="glass-card group overflow-hidden">
                <div className="h-48 relative">
                  <img src={p.image_url || '/farming_3d_icons_set_1777140649782.png'} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={p.crop_name} />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-[#2D6A4F] border border-[#D8F3DC]">
                    VERIFIED
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="text-lg font-bold text-[#1B4332]">{p.crop_name}</h4>
                    <p className="text-xs text-[#52796F] flex items-center gap-1">
                      <MapPin size={12} /> {p.location}
                    </p>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-bold text-[#52796F] uppercase">Price</p>
                      <p className="text-xl font-bold text-[#2D6A4F]">₹{p.price_per_kg}<span className="text-xs text-[#52796F] font-normal">/kg</span></p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-[#52796F] uppercase">Stock</p>
                      <p className="text-sm font-bold text-[#1B4332]">{p.quantity_available} kg</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleBuy(p.id)}
                    className="w-full py-2 bg-[#D8F3DC] text-[#2D6A4F] font-bold rounded-xl hover:bg-[#2D6A4F] hover:text-white transition-all text-sm"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="glass-card overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAF9] border-b border-[#D8F3DC]">
                <th className="p-6 text-[10px] font-bold text-[#52796F] uppercase tracking-widest">Order ID</th>
                <th className="p-6 text-[10px] font-bold text-[#52796F] uppercase tracking-widest">Product</th>
                <th className="p-6 text-[10px] font-bold text-[#52796F] uppercase tracking-widest">Quantity</th>
                <th className="p-6 text-[10px] font-bold text-[#52796F] uppercase tracking-widest">Total</th>
                <th className="p-6 text-[10px] font-bold text-[#52796F] uppercase tracking-widest">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D8F3DC]">
              {myOrders.map(o => (
                <tr key={o.id} className="hover:bg-[#F8FAF9] transition-all">
                  <td className="p-6 text-sm font-bold text-[#52796F]">#ORD-{o.id}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[#D8F3DC] rounded-lg flex items-center justify-center text-[#2D6A4F]">
                        <Box size={16} />
                      </div>
                      <span className="font-bold text-[#1B4332]">{o.product_name}</span>
                    </div>
                  </td>
                  <td className="p-6 text-sm font-bold">{o.quantity} kg</td>
                  <td className="p-6 text-sm font-bold text-[#2D6A4F]">₹{o.total_price}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-2 w-fit ${
                      o.status === 'DELIVERED' ? 'bg-green-100 text-green-700' : 
                      o.status === 'SHIPPED' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {o.status === 'DELIVERED' ? <CheckCircle size={12} /> : o.status === 'SHIPPED' ? <Truck size={12} /> : <Clock size={12} />}
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'listings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {myListings.map(p => (
            <div key={p.id} className="glass-card p-8 space-y-6">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 bg-[#D8F3DC] rounded-xl flex items-center justify-center text-[#2D6A4F]">
                  <ShoppingBag size={24} />
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-[#52796F] uppercase">Price</p>
                  <p className="text-xl font-bold text-[#1B4332]">₹{p.price_per_kg}/kg</p>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-[#1B4332]">{p.crop_name}</h4>
              <div className="p-4 bg-[#F8FAF9] rounded-2xl border border-[#D8F3DC] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Box size={16} className="text-[#52796F]" />
                  <span className="text-xs font-bold text-[#52796F]">Available</span>
                </div>
                <span className="font-bold text-[#1B4332]">{p.quantity_available} kg</span>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-2 bg-white border border-[#D8F3DC] text-[#52796F] font-bold rounded-xl hover:border-[#2D6A4F] transition-all text-sm">Edit</button>
                <button className="flex-1 py-2 bg-[#D8F3DC] text-[#2D6A4F] font-bold rounded-xl hover:bg-[#2D6A4F] hover:text-white transition-all text-sm">Stats</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Product Modal */}
      {isAddingProduct && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm">
          <div className="bg-white max-w-lg w-full p-10 rounded-[32px] shadow-2xl border border-[#D8F3DC]">
            <h3 className="text-2xl font-bold mb-6">Create New Listing</h3>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setIsAddingProduct(false); }}>
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#52796F] uppercase">Crop Species</label>
                <input type="text" placeholder="e.g. Basmati Rice" className="w-full px-4 py-3 bg-[#F8FAF9] border border-[#D8F3DC] rounded-xl focus:border-[#2D6A4F] outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#52796F] uppercase">Price (₹/kg)</label>
                  <input type="number" placeholder="45" className="w-full px-4 py-3 bg-[#F8FAF9] border border-[#D8F3DC] rounded-xl focus:border-[#2D6A4F] outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#52796F] uppercase">Quantity (kg)</label>
                  <input type="number" placeholder="1000" className="w-full px-4 py-3 bg-[#F8FAF9] border border-[#D8F3DC] rounded-xl focus:border-[#2D6A4F] outline-none" />
                </div>
              </div>
              <button type="submit" className="btn-primary w-full py-4 justify-center">Commit Listing</button>
              <button onClick={() => setIsAddingProduct(false)} className="w-full text-sm font-bold text-[#52796F] hover:text-[#1B4332] mt-4">Cancel</button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

const MarketPriceCard = ({ name, price, change, positive }) => (
  <div className="bg-[#F8FAF9] p-4 rounded-2xl border border-[#D8F3DC] hover:border-[#2D6A4F] transition-all">
    <p className="text-[10px] font-bold text-[#52796F] uppercase tracking-widest mb-1">{name}</p>
    <div className="flex justify-between items-center">
      <p className="text-lg font-bold text-[#1B4332]">{price}</p>
      <div className={`flex items-center gap-0.5 text-xs font-bold ${positive ? 'text-green-600' : 'text-red-600'}`}>
        {positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {change}
      </div>
    </div>
  </div>
);

const TabButton = ({ active, onClick, label }) => (
  <button 
    onClick={onClick}
    className={`pb-4 px-2 text-sm font-bold transition-all relative ${
      active ? 'text-[#2D6A4F]' : 'text-[#52796F] hover:text-[#2D6A4F]'
    }`}
  >
    {label}
    {active && <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#2D6A4F] rounded-t-full"></div>}
  </button>
);

export default Marketplace;
