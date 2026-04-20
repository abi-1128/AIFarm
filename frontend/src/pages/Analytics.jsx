import React from 'react';
import { 
  BarChart3, 
  BrainCircuit, 
  Activity, 
  Zap, 
  PieChart as PieChartIcon, 
  Compass,
  TrendingUp,
  Wind,
  Droplet,
  Thermometer,
  ShieldCheck,
  ZapOff
} from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  LineChart,
  Line
} from 'recharts';

const cropYieldData = [
  { crop: 'Wheat', yield: 4.8, optimal: 5.2 },
  { crop: 'Rice', yield: 3.9, optimal: 4.5 },
  { crop: 'Cotton', yield: 2.1, optimal: 2.8 },
  { crop: 'Maize', yield: 5.5, optimal: 6.0 },
  { crop: 'Soybean', yield: 1.8, optimal: 2.2 },
];

const soilHealthData = [
  { subject: 'Nitrogen', A: 120, B: 110, fullMark: 150 },
  { subject: 'Phosphorus', A: 98, B: 130, fullMark: 150 },
  { subject: 'Potassium', A: 86, B: 130, fullMark: 150 },
  { subject: 'pH Level', A: 99, B: 100, fullMark: 150 },
  { subject: 'Moisture', A: 85, B: 90, fullMark: 150 },
  { subject: 'Organic Care', A: 65, B: 85, fullMark: 150 },
];

const Analytics = () => {
  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/5">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
             <div className="w-8 h-[1px] bg-emerald-500" />
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-emerald-500">Neural Engine: Deep Insights</span>
          </div>
          <h2 className="text-6xl font-black text-white tracking-tighter uppercase leading-none italic">Neural <span className="text-emerald-500 not-italic">Insights</span></h2>
          <p className="text-gray-500 font-bold tracking-tight text-xl max-w-xl">Advanced predictive analytics and autonomous monitoring of biogenic performance metrics.</p>
        </div>
        
        <div className="flex bg-white/5 p-2 rounded-[2rem] border border-white/5">
           <div className="px-6 py-4 flex items-center space-x-4">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-[10px] font-black text-white uppercase tracking-widest">AI Status: Optimal</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Radar Health Chart */}
        <div className="xl:col-span-5 glass p-12 rounded-[4rem] border border-white/5 flex flex-col items-center justify-center space-y-10 min-h-[500px] relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
           <div className="text-center space-y-2">
              <h3 className="text-2xl font-black uppercase tracking-tighter italic">Soil <span className="text-emerald-500">Biometrics</span></h3>
              <p className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Multi-vector analysis</p>
           </div>
           <div className="w-full h-80">
              <ResponsiveContainer width="100%" height="100%">
                 <RadarChart cx="50%" cy="50%" outerRadius="80%" data={soilHealthData}>
                    <PolarGrid stroke="rgba(255,255,255,0.05)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#4b5563', fontSize: 8, fontWeight: 'black', textTransform: 'uppercase' }} />
                    <Radar
                       name="Current"
                       dataKey="A"
                       stroke="#10b981"
                       fill="#10b981"
                       fillOpacity={0.3}
                    />
                    <Radar
                       name="Optimal"
                       dataKey="B"
                       stroke="#3b82f6"
                       fill="#3b82f6"
                       fillOpacity={0.1}
                    />
                 </RadarChart>
              </ResponsiveContainer>
           </div>
           <div className="flex gap-8 border-t border-white/5 pt-8 w-full justify-center">
              <div className="flex items-center space-x-3">
                 <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Actual Status</span>
              </div>
              <div className="flex items-center space-x-3">
                 <div className="w-3 h-3 bg-blue-500 rounded-full" />
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Target Flux</span>
              </div>
           </div>
        </div>

        {/* Bar Yield Chart */}
        <div className="xl:col-span-7 space-y-8">
           <div className="glass p-10 rounded-[4rem] border border-white/5 space-y-8 h-full flex flex-col relative overflow-hidden">
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/5 blur-[100px] rounded-full" />
              <div className="flex items-center justify-between">
                 <div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter italic">Yield <span className="text-blue-500">Synergy</span></h3>
                    <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Tons per Acre Performance</p>
                 </div>
                 <BarChart3 className="text-gray-800" size={32} />
              </div>
              
              <div className="flex-1 w-full min-h-[300px]">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={cropYieldData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                       <XAxis 
                          dataKey="crop" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={{ fill: '#4b5563', fontSize: 10, fontWeight: '900', textTransform: 'uppercase' }} 
                       />
                       <Tooltip 
                          cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                          contentStyle={{ backgroundColor: '#0d1117', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px' }}
                       />
                       <Bar dataKey="yield" fill="#10b981" radius={[10, 10, 0, 0]} barSize={24} />
                       <Bar dataKey="optimal" fill="rgba(255,255,255,0.05)" radius={[10, 10, 0, 0]} barSize={24} />
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         {[
           { label: 'Neural Confidence', value: '98.2%', icon: BrainCircuit, color: 'text-emerald-500', detail: 'Autonomous drift reduction active' },
           { label: 'Risk Indices', value: '0.04%', icon: ShieldCheck, color: 'text-blue-500', detail: 'Secure operational parameters' },
           { label: 'Entropy Flux', value: 'Stable', icon: Zap, color: 'text-amber-500', detail: 'Resource distribution optimized' },
         ].map((stat, i) => (
           <div key={i} className="glass p-8 rounded-[3.5rem] border border-white/5 space-y-6 group hover:border-white/10 transition-all cursor-default">
              <div className="flex items-center justify-between">
                 <div className={`w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color} border border-white/5 group-hover:scale-105 transition-transform`}>
                    <stat.icon size={28} />
                 </div>
                 <Activity size={16} className="text-gray-800" />
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-gray-600 uppercase tracking-widest">{stat.label}</p>
                 <h4 className="text-4xl font-black italic text-white">{stat.value}</h4>
                 <p className="text-[8px] font-bold text-gray-500 uppercase tracking-tighter pt-2 border-t border-white/5 mt-4">{stat.detail}</p>
              </div>
           </div>
         ))}
      </div>
    </div>
  );
};

export default Analytics;
