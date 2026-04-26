import React from 'react';
import { Search, Bell, Calendar, ChevronDown } from 'lucide-react';

const DashboardHeader = ({ title, user }) => {
  return (
    <div className="flex justify-between items-center mb-10">
      <div>
        <h1 className="text-4xl font-bold text-[#1B4332]">{title}</h1>
        <p className="text-[#52796F]">Welcome back, {user?.username}. Here's what's happening today.</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center bg-white px-5 py-3 rounded-2xl border border-[#D8F3DC] shadow-sm w-80">
          <Search size={20} className="text-[#52796F] mr-3" />
          <input 
            type="text" 
            placeholder="Search crops, tasks..." 
            className="bg-transparent focus:outline-none text-sm w-full"
          />
        </div>

        <button className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border border-[#D8F3DC] text-[#52796F] hover:bg-[#D8F3DC] transition-all relative">
          <Bell size={20} />
          <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-[#D8F3DC] shadow-sm">
          <div className="w-8 h-8 bg-[#2D6A4F] rounded-lg flex items-center justify-center text-white text-sm font-bold">
            {user?.username?.[0]?.toUpperCase() || 'U'}
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-bold text-[#1B4332]">{user?.username}</p>
            <p className="text-[10px] text-[#52796F] font-bold uppercase tracking-wider">Farmer</p>
          </div>
          <ChevronDown size={14} className="text-[#52796F]" />
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
