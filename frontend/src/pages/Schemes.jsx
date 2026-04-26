import React from 'react';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldCheck, 
  ArrowRight, 
  BadgeCheck, 
  FileText, 
  Landmark, 
  Search,
  ChevronRight
} from 'lucide-react';

const Schemes = () => {
  const { user } = useAuth();

  const schemes = [
    {
      title: "PM-Kisan Samman Nidhi",
      description: "Direct income support of ₹6,000 per year to all landholding farmer families.",
      type: "Direct Support",
      benefit: "₹6,000/yr",
      status: "Eligible",
      category: "Central Government"
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana",
      description: "Insurance coverage and financial support to farmers in the event of failure of any of the notified crops.",
      type: "Insurance",
      benefit: "Coverage up to 100%",
      status: "Apply Now",
      category: "Insurance"
    },
    {
      title: "Soil Health Card Scheme",
      description: "Get a free soil health card with expert advice on fertilizers and soil management.",
      type: "Advisory",
      benefit: "Free Testing",
      status: "Applied",
      category: "Technical"
    },
    {
      title: "Kisan Credit Card (KCC)",
      description: "Get affordable loans for agricultural needs at low interest rates.",
      type: "Loan",
      benefit: "4% Interest",
      status: "Eligible",
      category: "Financial"
    }
  ];

  return (
    <>
      <DashboardHeader title="Government Schemes" user={user} />

      {/* Search & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-10">
        <div className="lg:col-span-8 glass-card p-8 bg-white">
          <h3 className="text-xl font-bold mb-6">Find Eligible Schemes</h3>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#52796F]" size={20} />
              <input 
                type="text" 
                placeholder="Search by state, crop or benefit type..." 
                className="w-full pl-12 pr-4 py-4 bg-[#F8FAF9] border border-[#D8F3DC] rounded-2xl focus:border-[#2D6A4F] outline-none"
              />
            </div>
            <button className="btn-primary px-8">Find Schemes</button>
          </div>
        </div>
        
        <div className="lg:col-span-4 glass-card p-8 bg-[#D8F3DC] border-[#2D6A4F1a]">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#2D6A4F] rounded-2xl flex items-center justify-center text-white">
              <Landmark size={24} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-widest">Total Benefits</p>
              <h4 className="text-3xl font-bold text-[#1B4332]">₹12,450</h4>
            </div>
          </div>
          <p className="text-xs text-[#52796F]">Benefits received from applied schemes this year.</p>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {schemes.map((scheme, i) => (
          <div key={i} className="glass-card p-8 group hover:border-[#2D6A4F] transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <ShieldCheck size={120} />
            </div>
            
            <div className="flex justify-between items-start mb-6">
              <span className="px-3 py-1 bg-[#F8FAF9] text-[#2D6A4F] text-[10px] font-bold rounded-full border border-[#D8F3DC] uppercase tracking-widest">
                {scheme.category}
              </span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                scheme.status === 'Eligible' ? 'bg-blue-50 text-blue-600' :
                scheme.status === 'Apply Now' ? 'bg-[#2D6A4F] text-white' :
                'bg-green-50 text-green-600'
              }`}>
                {scheme.status}
              </span>
            </div>
            
            <h4 className="text-2xl font-bold text-[#1B4332] mb-3 group-hover:text-[#2D6A4F] transition-colors">{scheme.title}</h4>
            <p className="text-sm text-[#52796F] mb-8 leading-relaxed">{scheme.description}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-[#F8FAF9] rounded-2xl border border-[#D8F3DC]">
                <p className="text-[10px] font-bold text-[#52796F] uppercase mb-1">Type</p>
                <p className="text-sm font-bold text-[#1B4332]">{scheme.type}</p>
              </div>
              <div className="p-4 bg-[#F8FAF9] rounded-2xl border border-[#D8F3DC]">
                <p className="text-[10px] font-bold text-[#52796F] uppercase mb-1">Benefit</p>
                <p className="text-sm font-bold text-[#2D6A4F]">{scheme.benefit}</p>
              </div>
            </div>
            
            <button className="flex items-center gap-2 text-[#2D6A4F] font-bold hover:gap-4 transition-all">
              View Eligibility & Apply <ArrowRight size={18} />
            </button>
          </div>
        ))}
      </div>

      {/* Application Tracking */}
      <div className="mt-12">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <FileText size={24} className="text-[#2D6A4F]" /> Application Tracking
        </h3>
        <div className="glass-card overflow-hidden">
          <div className="p-6 bg-[#F8FAF9] border-b border-[#D8F3DC] flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-[#D8F3DC]">
                <BadgeCheck className="text-green-600" size={20} />
              </div>
              <div>
                <h5 className="font-bold text-[#1B4332]">Soil Health Card Application</h5>
                <p className="text-xs text-[#52796F]">ID: SCH-88219 • Applied on 12 April 2026</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden md:flex gap-2">
                <div className="w-16 h-1.5 bg-green-500 rounded-full"></div>
                <div className="w-16 h-1.5 bg-green-500 rounded-full"></div>
                <div className="w-16 h-1.5 bg-[#D8F3DC] rounded-full"></div>
                <div className="w-16 h-1.5 bg-[#D8F3DC] rounded-full"></div>
              </div>
              <span className="text-xs font-bold text-green-600 uppercase">Processing</span>
              <ChevronRight className="text-[#52796F]" size={20} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Schemes;
