import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ThreeDBackground from '../components/ThreeDBackground';

const LandingPage = () => {
  return (
    <div className="bg-white relative min-h-screen overflow-hidden">
      <ThreeDBackground type="dashboard" />
      <div className="relative z-10">
      {/* Navigation */}
      <nav className="nav-glass px-8 py-4 flex justify-between items-center fixed w-full top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#2D6A4F] rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-xl">A</span>
          </div>
          <span className="text-2xl font-bold text-[#1B4332] font-outfit">AIFarm</span>
        </div>
        <div className="hidden md:flex gap-8 text-[#52796F] font-medium">
          <a href="#features" className="hover:text-[#2D6A4F] transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-[#2D6A4F] transition-colors">How it Works</a>
          <a href="#testimonials" className="hover:text-[#2D6A4F] transition-colors">Testimonials</a>
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-6 py-2 text-[#2D6A4F] font-semibold hover:bg-[#D8F3DC] rounded-xl transition-all">Login</Link>
          <Link to="/register" className="btn-primary">Get Started</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-8">
        <div className="container-custom flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8 fade-in">
            <div className="inline-block px-4 py-1 bg-[#D8F3DC] text-[#2D6A4F] rounded-full text-sm font-bold tracking-wide uppercase">
              AI-Powered Agriculture
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Start Smart Farming with <span className="text-[#40916C]">AI Guidance</span>
            </h1>
            <p className="text-xl text-[#52796F] max-w-lg">
              Empowering beginners, landowners, and retired professionals to build successful, sustainable farms with data-driven insights.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/register" className="btn-primary text-lg px-10 py-4">
                Start My Journey
              </Link>
              <button className="btn-secondary text-lg px-10 py-4">
                Explore Crops
              </button>
            </div>
          </div>
          <div className="flex-1 relative">
            <img 
              src="/hero_farming_3d_1777140631220.png" 
              alt="3D Smart Farm" 
              className="w-full h-auto img-3d animate-float"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section-padding bg-[#F8FAF9]">
        <div className="container-custom">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl font-bold">Comprehensive Farming Solutions</h2>
            <p className="text-[#52796F] max-w-2xl mx-auto text-lg">
              Everything you need to go from a patch of land to a thriving, profitable agricultural enterprise.
            </p>
          </div>
          <div className="grid-auto">
            <FeatureCard 
              icon="🌱" 
              title="Crop Recommendation" 
              description="AI analysis of your soil, climate, and budget to find the perfect crops for your land."
            />
            <FeatureCard 
              icon="📊" 
              title="Market Intelligence" 
              description="Real-time price monitoring and demand forecasting to maximize your profits."
            />
            <FeatureCard 
              icon="🛡️" 
              title="Smart Advisory" 
              description="Step-by-step guidance on fertilizers, irrigation, and pest control tailored to your crops."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding">
        <div className="container-custom bg-[#2D6A4F] rounded-[40px] p-12 md:p-20 text-white flex flex-wrap justify-between gap-12">
          <StatItem value="10k+" label="Active Farmers" />
          <StatItem value="50+" label="Supported Crops" />
          <StatItem value="25%" label="Average Yield Increase" />
          <StatItem value="100k" label="Acres Monitored" />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-[#D8F3DC] py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-[#2D6A4F] rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <span className="text-2xl font-bold text-[#1B4332]">AIFarm</span>
              </div>
              <p className="text-[#52796F]">
                Making agriculture accessible and profitable for everyone through artificial intelligence.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Platform</h4>
              <ul className="space-y-4 text-[#52796F]">
                <li><a href="#" className="hover:text-[#2D6A4F]">Dashboard</a></li>
                <li><a href="#" className="hover:text-[#2D6A4F]">Marketplace</a></li>
                <li><a href="#" className="hover:text-[#2D6A4F]">AI Advisor</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Company</h4>
              <ul className="space-y-4 text-[#52796F]">
                <li><a href="#" className="hover:text-[#2D6A4F]">About Us</a></li>
                <li><a href="#" className="hover:text-[#2D6A4F]">Success Stories</a></li>
                <li><a href="#" className="hover:text-[#2D6A4F]">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Newsletter</h4>
              <p className="text-[#52796F] mb-4">Stay updated with latest farming trends.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Email address" className="flex-1 px-4 py-2 border border-[#D8F3DC] rounded-xl focus:outline-none focus:border-[#2D6A4F]" />
                <button className="bg-[#2D6A4F] text-white p-2 rounded-xl">➔</button>
              </div>
            </div>
          </div>
          <div className="text-center text-[#52796F] text-sm">
            © 2026 AIFarm Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="glass-card p-10 hover:border-[#2D6A4F]">
    <div className="text-4xl mb-6">{icon}</div>
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className="text-[#52796F]">{description}</p>
  </div>
);

const StatItem = ({ value, label }) => (
  <div className="text-center space-y-2">
    <div className="text-5xl font-bold">{value}</div>
    <div className="text-[#B7E4C7] font-medium tracking-wide uppercase text-sm">{label}</div>
  </div>
);

export default LandingPage;
