import React from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart as PieChartIcon, 
  ArrowUpRight, 
  ArrowDownRight,
  Wallet,
  Activity,
  BarChart3,
  Layers,
  ShoppingBag
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts';

const data = [
  { name: 'Week 1', revenue: 4000, cost: 2400 },
  { name: 'Week 2', revenue: 3000, cost: 1398 },
  { name: 'Week 3', revenue: 2000, cost: 9800 },
  { name: 'Week 4', revenue: 2780, cost: 3908 },
  { name: 'Week 5', revenue: 1890, cost: 4800 },
  { name: 'Week 6', revenue: 2390, cost: 3800 },
  { name: 'Week 7', revenue: 3490, cost: 4300 },
];

const pieData = [
  { name: 'Seeds', value: 400, color: '#10b981' },
  { name: 'Fertilizers', value: 300, color: '#3b82f6' },
  { name: 'Labor', value: 300, color: '#f59e0b' },
  { name: 'Irrigation', value: 200, color: '#8b5cf6' },
];

const Financials = () => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/5">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-[1px] bg-emerald-500" />
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500">Resource Matrix: Capital Hub</span>
          </div>
          <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none italic">Cap <span className="text-emerald-500 not-italic">Matrix</span></h2>
          <p className="text-gray-500 font-bold tracking-tight text-xl max-w-xl">Deep analytics of operational capital, profit projections, and trade flux synchronization.</p>
        </div>
        
        <div className="glass px-8 py-4 rounded-3xl border border-white/5 flex items-center space-x-6 backdrop-blur-3xl">
           <div className="space-y-1">
              <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Global Balance</p>
              <p className="text-3xl font-black text-white italic">₹12.48L</p>
           </div>
           <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
              <Wallet size={24} />
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {[
          { label: 'Net Yield Flux', value: '₹4.2L', trend: '+12.4%', icon: TrendingUp, color: 'text-emerald-500' },
          { label: 'Operational Debt', value: '₹84K', trend: '-2.1%', icon: TrendingDown, color: 'text-rose-500' },
          { label: 'Market Liquidity', value: '₹2.1L', trend: '+5.8%', icon: Activity, color: 'text-blue-500' },
          { label: 'Asset Valuation', value: '₹45.2L', trend: '+1.2%', icon: Layers, color: 'text-purple-500' },
        ].map((stat, i) => (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="glass p-8 rounded-[3rem] border border-white/5 space-y-4 group hover:bg-white/5 transition-all duration-500 shadow-3xl shadow-black/20"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-[1.2rem] bg-white/5 flex items-center justify-center ${stat.color} border border-white/5 group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <span className={`text-[10px] font-black uppercase tracking-widest ${stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {stat.trend}
              </span>
            </div>
            <div>
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mb-1">{stat.label}</p>
              <h4 className="text-4xl font-black text-white tracking-tighter italic">{stat.value}</h4>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Revenue Chart */}
        <div className="xl:col-span-8 glass p-10 rounded-[4rem] border border-white/5 space-y-8 min-h-[500px] flex flex-col relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />
           <div className="flex items-center justify-between">
              <div className="space-y-1">
                 <h3 className="text-2xl font-black uppercase tracking-tighter italic">Capital <span className="text-emerald-500">Flow</span></h3>
                 <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">7-Cycle Synchronization</p>
              </div>
              <div className="flex space-x-3">
                 <button className="px-5 py-2 rounded-xl bg-white/5 text-[9px] font-black uppercase tracking-widest text-emerald-500 border border-emerald-500/20">Revenue</button>
                 <button className="px-5 py-2 rounded-xl bg-white/5 text-[9px] font-black uppercase tracking-widest text-gray-500 border border-white/5">Expenses</button>
              </div>
           </div>
           
           <div className="flex-1 w-full min-h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} 
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: '900', textTransform: 'uppercase' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRev)" strokeWidth={4} />
                  <Area type="monotone" dataKey="cost" stroke="#3b82f6" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
                </AreaChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Expense Distribution */}
        <div className="xl:col-span-4 glass p-10 rounded-[4rem] border border-white/5 space-y-8 flex flex-col">
           <div className="space-y-1">
              <h3 className="text-2xl font-black uppercase tracking-tighter italic">Cost <span className="text-blue-500">Matrix</span></h3>
              <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Operational Breakdown</p>
           </div>
           
           <div className="flex-1 flex flex-col items-center justify-center py-4">
              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={8}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-4 w-full pt-8">
                 {pieData.map((p, i) => (
                   <div key={i} className="flex items-center space-x-3">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: p.color }} />
                      <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{p.name}</span>
                      <span className="text-[10px] font-black text-white ml-auto">{Math.round((p.value/1200)*100)}%</span>
                   </div>
                 ))}
              </div>
        </div>
      </div>
    </div>

    {/* Recent Transactions */}
    <div className="glass rounded-[4rem] overflow-hidden border border-white/5">
       <div className="p-10 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-2xl font-black uppercase tracking-tighter italic">Recent <span className="text-amber-500">Flux</span></h3>
          <button className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-white transition-colors">Export Ledger</button>
       </div>
       <div className="p-10 space-y-6">
          {[
            { id: 'T-8422', label: 'Seed Acquisition', type: 'EXPENSE', amount: '-₹12,400', time: '2 HOURS AGO', icon: ShoppingBag, color: 'text-rose-500' },
            { id: 'T-8421', label: 'Market Yield Sale', type: 'REVENUE', amount: '+₹84,200', time: '5 HOURS AGO', icon: TrendingUp, color: 'text-emerald-500' },
            { id: 'T-8420', label: 'Irrigation Protocol', type: 'EXPENSE', amount: '-₹4,200', time: '1 DAY AGO', icon: Activity, color: 'text-rose-500' },
          ].map((t, i) => (
            <div key={i} className="flex items-center justify-between group">
               <div className="flex items-center space-x-6">
                  <div className={`w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center transition-all group-hover:bg-white/10 ${t.color}`}>
                     <t.icon size={24} />
                  </div>
                  <div>
                     <p className="text-xl font-black tracking-tighter text-white uppercase italic">{t.label}</p>
                     <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest mt-0.5">{t.id} • {t.time}</p>
                  </div>
               </div>
               <div className="text-right">
                  <p className={`text-2xl font-black italic ${t.color}`}>{t.amount}</p>
                  <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest mt-0.5">{t.type}</p>
               </div>
            </div>
          ))}
       </div>
    </div>
  </div>
  );
};

export default Financials;
