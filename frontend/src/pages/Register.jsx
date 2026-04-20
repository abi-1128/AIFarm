import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Lock, Phone, MapPin, Briefcase, ArrowRight, Loader, Sprout, Sparkles, ShieldCheck, ChevronDown, TrendingUp } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'LANDOWNER',
    phone: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  // Mouse tilt effect emulation
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({ 
      x: (clientX - window.innerWidth / 2) / 60, 
      y: (clientY - window.innerHeight / 2) / 60 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate interactive progress
    await new Promise(r => setTimeout(r, 800)); 
    
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Username or email may already be linked to a protocol.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#010409] text-[#e6edf3] relative flex items-center justify-center p-4 lg:p-8 overflow-x-hidden selection:bg-emerald-500/30 font-sans"
    >
      {/* Immersive Neural Matrix Background */}
      <div className="bg-neural-matrix opacity-80" />
      <div className="bg-overlay opacity-60" />
      <div className="fixed inset-0 bg-[#010409]/40 z-[-15]" />


      {/* Dynamic Energy Blobs */}
      <motion.div 
        animate={{ x: mousePos.x * 4, y: mousePos.y * 4 }}
        className="fixed top-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-emerald-500/10 blur-[150px] rounded-full z-10" 
      />

      <div className="relative z-20 w-full max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center w-full">
          
          {/* Left: Interactive Brand Assets */}
          <div className="lg:col-span-5 space-y-12 text-center lg:text-left hidden lg:block">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               animate={{ opacity: 1, x: 0 }}
               className="space-y-10"
            >
              <div className="w-24 h-24 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center text-white shadow-3xl shadow-emerald-500/30">
                <Sprout size={56} />
              </div>
              <div className="space-y-4">
                <h1 className="text-8xl font-black tracking-tighter leading-[0.85] uppercase">
                  Expand <br/> Your <br/><span className="text-emerald-500 italic">Empire</span>
                </h1>
                <p className="text-xl text-gray-400 font-bold max-w-sm tracking-tight leading-relaxed">
                  Onboard your field networks to the global neural matrix. Smarter farming starts here.
                </p>
              </div>
            </motion.div>
            
            <div className="space-y-8 pt-12 border-t border-white/5 relative">
               <div className="absolute top-0 left-0 w-24 h-[1px] bg-emerald-500 shadow-[0_0_15px_#10b981]" />
               {[
                 { icon: Sparkles, label: 'Real-time Soil Analysis', color: 'text-emerald-400' },
                 { icon: TrendingUp, label: 'Yield Projection Engine', color: 'text-blue-400' },
                 { icon: ShieldCheck, label: 'Quantum Secure Data', color: 'text-purple-400' }
               ].map((feat, i) => (
                 <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 * i }}
                  className="flex items-center space-x-6 group cursor-default"
                 >
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/5 group-hover:bg-white/10 transition-colors">
                      <feat.icon size={22} className={feat.color} />
                    </div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-white group-hover:tracking-[0.4em] transition-all">{feat.label}</p>
                 </motion.div>
               ))}
            </div>
          </div>

          {/* Right: Registration Interface */}
          <div className="lg:col-span-7 flex justify-center lg:justify-end">
            <motion.div 
              style={{ rotateX: -mousePos.y * 0.3, rotateY: mousePos.x * 0.3 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass p-10 lg:p-14 rounded-[5rem] border border-white/10 shadow-3xl w-full max-w-[700px] relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 -m-16 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full" />
              
              <div className="space-y-10 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-4xl font-black text-white tracking-tighter uppercase leading-none">Initialize Identity</h3>
                  <p className="text-gray-500 font-black text-[10px] tracking-[0.3em] uppercase">Phase 1: Protocol Onboarding</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <AnimatePresence>
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] text-center"
                      >
                        {error}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Input Fields */}
                    <div className="group relative col-span-1">
                      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-700 group-focus-within:text-emerald-500 transition-colors">
                        <User size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="USERNAME"
                        className="w-full bg-[#161b22]/50 border border-white/5 py-5 pl-16 pr-6 rounded-[2rem] outline-none focus:border-emerald-500/50 focus:bg-white/5 transition-all font-black text-[10px] tracking-widest uppercase text-white"
                        required
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      />
                    </div>

                    <div className="group relative col-span-1">
                      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-700 group-focus-within:text-emerald-500 transition-colors">
                        <Mail size={18} />
                      </div>
                      <input
                        type="email"
                        placeholder="EMAIL ADDRESS"
                        className="w-full bg-[#161b22]/50 border border-white/5 py-5 pl-16 pr-6 rounded-[2rem] outline-none focus:border-emerald-500/50 focus:bg-white/5 transition-all font-black text-[10px] tracking-widest uppercase text-white"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </div>

                    <div className="group relative col-span-1">
                      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-700 group-focus-within:text-emerald-500 transition-colors">
                        <Lock size={18} />
                      </div>
                      <input
                        type="password"
                        placeholder="SECURITY PASSCODE"
                        className="w-full bg-[#161b22]/50 border border-white/5 py-5 pl-16 pr-6 rounded-[2rem] outline-none focus:border-emerald-500/50 focus:bg-white/5 transition-all font-black text-[10px] tracking-widest uppercase text-white"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      />
                    </div>

                    <div className="group relative col-span-1">
                      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-700 group-focus-within:text-emerald-500 transition-colors">
                        <Briefcase size={18} />
                      </div>
                      <select
                        className="w-full bg-[#161b22]/50 border border-white/5 py-5 pl-16 pr-10 rounded-[2rem] outline-none focus:border-emerald-500/50 focus:bg-white/5 transition-all font-black text-[9px] tracking-[0.3em] uppercase text-white appearance-none"
                        value={formData.role}
                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      >
                        <option value="LANDOWNER">Professional Landowner</option>
                        <option value="BUYER">Produce Distributor</option>
                        <option value="ADMIN">Neural Overseer</option>
                      </select>
                      <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
                         <ChevronDown size={14} />
                      </div>
                    </div>

                    <div className="group relative col-span-1">
                      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-700 group-focus-within:text-emerald-500 transition-colors">
                        <Phone size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="SECURE CONTACT"
                        className="w-full bg-[#161b22]/50 border border-white/5 py-5 pl-16 pr-6 rounded-[2rem] outline-none focus:border-emerald-500/50 focus:bg-white/5 transition-all font-black text-[10px] tracking-widest uppercase text-white"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>

                    <div className="group relative col-span-1">
                      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none text-gray-700 group-focus-within:text-emerald-500 transition-colors">
                        <MapPin size={18} />
                      </div>
                      <input
                        type="text"
                        placeholder="SECTOR LOCATION"
                        className="w-full bg-[#161b22]/50 border border-white/5 py-5 pl-16 pr-6 rounded-[2rem] outline-none focus:border-emerald-500/50 focus:bg-white/5 transition-all font-black text-[10px] tracking-widest uppercase text-white"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="pt-6">
                    <motion.button
                      whileHover={{ scale: 1.02, shadow: "0 20px 40px rgba(16,185,129,0.3)" }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={loading}
                      className="w-full h-24 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-950 text-white rounded-[3rem] font-black text-xs uppercase tracking-[0.5em] shadow-3xl flex items-center justify-center space-x-6 transition-all"
                    >
                      {loading ? (
                         <div className="flex space-x-2">
                           <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                           <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                           <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                         </div>
                      ) : (
                        <>
                          <span>Establish Protocol</span>
                          <ArrowRight size={20} />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>

                <div className="mt-12 text-center pt-10 border-t border-white/5 flex flex-col items-center space-y-6">
                  <p className="text-gray-600 font-bold text-[10px] uppercase tracking-widest opacity-60">Already authenticated?</p>
                  <Link to="/login" className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-[2rem] border border-white/10 transition-all">
                    Sign In Protocol
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
