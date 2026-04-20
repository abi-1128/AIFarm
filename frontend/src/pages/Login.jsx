import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Sprout, Mail, Lock, Loader, ArrowRight, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // Mouse tilt effect emulation
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    setMousePos({ 
      x: (clientX - window.innerWidth / 2) / 40, 
      y: (clientY - window.innerHeight / 2) / 40 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    await new Promise(r => setTimeout(r, 600)); 
    
    try {
      await login(credentials);
      navigate('/');
    } catch (err) {
      setError('Neural Link failed: Invalid security credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#010409] text-[#e6edf3] relative flex items-center justify-center p-6 lg:p-12 overflow-hidden selection:bg-emerald-500/30 font-sans"
    >
      {/* Immersive Neural Matrix Background */}
      <div className="bg-neural-matrix opacity-80" />
      <div className="bg-overlay opacity-60" />
      <div className="fixed inset-0 bg-[#010409]/40 z-[-15]" />


      {/* Subtle Energy Blobs for depth */}
      <motion.div 
        animate={{ x: mousePos.x * 2, y: mousePos.y * 2 }}
        className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-emerald-500/5 blur-[120px] rounded-full z-10" 
      />

      <div className="relative z-20 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-center w-full">
          
          {/* Left Side: Branding */}
          <div className="lg:col-span-7 space-y-16 text-center lg:text-left hidden lg:block">
            <motion.div 
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-10"
            >
              <div className="flex items-center space-x-6 justify-center lg:justify-start">
                <div className="w-24 h-24 bg-emerald-500 rounded-[2.2rem] flex items-center justify-center text-white shadow-3xl shadow-emerald-500/40">
                  <Sprout size={56} />
                </div>
                <div>
                  <h1 className="text-9xl font-black tracking-tighter leading-none uppercase drop-shadow-2xl">
                    Agri<span className="text-emerald-500 underline decoration-white/10 underline-offset-8">AI</span>
                  </h1>
                </div>
              </div>
              
              <div className="space-y-6">
                <h2 className="text-6xl lg:text-8xl font-black tracking-tighter leading-[0.8] text-white uppercase drop-shadow-2xl">
                  Whole <br/> <span className="text-white/40">Intelligence.</span>
                </h2>
                <p className="text-2xl text-white font-bold max-w-lg leading-relaxed tracking-tight drop-shadow-xl">
                  Synthesizing global climate telemetry & soil genetics in real-time.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Interactive Card - PERFECTLY CENTERED on Mobile */}
          <div className="lg:col-span-5 w-full flex justify-center lg:justify-end">
            <motion.div 
              style={{ 
                rotateX: -mousePos.y * 0.4, 
                rotateY: mousePos.x * 0.4,
                transformStyle: "preserve-3d"
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-12 lg:p-16 rounded-[5rem] border border-white/10 shadow-[0_60px_120px_rgba(0,0,0,0.6)] w-full max-w-[500px] relative backdrop-blur-3.5xl"
            >
              <div className="space-y-12 relative z-10" style={{ transform: "translateZ(30px)" }}>
                <div className="space-y-6 text-center lg:text-left">
                  <div className="lg:hidden flex justify-center mb-10">
                    <div className="w-20 h-20 bg-emerald-500 rounded-3xl flex items-center justify-center text-white shadow-3xl">
                      <Sprout size={40} />
                    </div>
                  </div>
                  <h3 className="text-5xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-lg">Protocol Sync</h3>
                  <p className="text-emerald-500 font-black text-[10px] tracking-[0.4em] uppercase">Security Level: Quantum Node</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <AnimatePresence>
                    {error && (
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-[2.5rem] text-[10px] font-black uppercase tracking-widest text-center flex items-center justify-center space-x-3"
                      >
                        <AlertCircle size={14} />
                        <span>{error}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="space-y-6">
                    <div className="group relative">
                      <Mail className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-emerald-500 transition-colors" size={18} />
                      <input
                        type="text"
                        placeholder="USERNAME"
                        className="w-full bg-[#161b22]/60 border border-white/5 text-white py-7 pl-18 pr-6 rounded-[2.5rem] outline-none focus:border-emerald-500/50 transition-all font-black text-[11px] tracking-widest uppercase"
                        required
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                      />
                    </div>

                    <div className="group relative">
                      <Lock className="absolute left-7 top-1/2 -translate-y-1/2 text-gray-700 group-focus-within:text-emerald-500 transition-colors" size={18} />
                      <input
                        type="password"
                        placeholder="SECURITY PASSCODE"
                        className="w-full bg-[#161b22]/60 border border-white/5 text-white py-7 pl-18 pr-6 rounded-[2.5rem] outline-none focus:border-emerald-500/50 transition-all font-black text-[11px] tracking-widest uppercase"
                        required
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                      />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full h-24 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-950 text-white rounded-[3.5rem] font-black text-xs uppercase tracking-[0.5em] shadow-3xl flex items-center justify-center space-x-4 transition-all relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                    {loading ? (
                      <div className="flex space-x-2">
                         <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                         <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.1s]" />
                         <div className="w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
                      </div>
                    ) : (
                      <>
                        <span>Start Neural Sync</span>
                        <ArrowRight size={20} />
                      </>
                    )}
                  </motion.button>
                </form>

                <div className="pt-10 border-t border-white/5 text-center flex flex-col items-center space-y-8">
                   <Link to="/register" className="w-full py-6 bg-white/5 hover:bg-white/10 text-white font-black text-[10px] uppercase tracking-[0.4em] rounded-[2rem] border border-white/10 transition-all">
                    Register New Identity
                  </Link>
                   <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-600 opacity-50">Secure Node v4.2 • Quantum Ready</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
