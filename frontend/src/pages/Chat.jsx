import React, { useState, useEffect, useRef } from 'react';
import { aiMentorService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  Paperclip, 
  Mic, 
  Trash2, 
  Phone,
  MessageSquare,
  Cpu,
  BrainCircuit,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Chat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const fetchHistory = async () => {
    try {
      const res = await aiMentorService.getHistory();
      const history = res.data.flatMap(h => [
        { id: `${h.id}-u`, text: h.user_query, sender: 'user', time: h.timestamp },
        { id: `${h.id}-a`, text: h.ai_response, sender: 'bot', time: h.timestamp }
      ]).reverse();
      setMessages(history);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSend = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { id: Date.now(), text: input, sender: 'user', time: new Date() };
    setMessages([...messages, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await aiMentorService.sendMessage(input);
      const botMsg = { id: Date.now() + 1, text: res.data.ai_response, sender: 'bot', time: new Date() };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-180px)] xl:h-[calc(100vh-220px)] flex flex-col glass rounded-[4rem] border border-white/5 overflow-hidden relative shadow-2xl">
      {/* Premium Header */}

      {/* Premium Header */}
      <div className="bg-white/5 backdrop-blur-3xl border-b border-white/5 p-8 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-16 h-16 bg-emerald-500 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-500/20">
              <BrainCircuit size={32} />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-[#0d1117] flex items-center justify-center">
              <Zap size={8} className="text-white fill-white" />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-black text-white leading-tight flex items-center tracking-tighter">
              NEURAL MENTOR <Sparkles size={18} className="ml-3 text-amber-500" />
            </h3>
            <span className="flex items-center text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] mt-1">
              <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 animate-pulse shadow-[0_0_10px_#10b981]" />
              SYST: OPTIMAL • 12ms LATENCY
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
           <button className="p-4 bg-white/5 text-gray-500 hover:bg-white/10 hover:text-white rounded-2xl transition-all border border-white/5"><Phone size={20} /></button>
           <button className="p-4 bg-red-500/5 text-red-500/40 hover:bg-red-500/20 hover:text-red-500 rounded-2xl transition-all border border-red-500/5"><Trash2 size={20} /></button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-10 max-w-sm mx-auto opacity-80">
            <div className="w-24 h-24 bg-white/5 rounded-[2.5rem] flex items-center justify-center text-gray-700 border border-white/5">
               <MessageSquare size={48} strokeWidth={1} />
            </div>
            <div className="space-y-4">
              <p className="font-black text-3xl text-white tracking-tighter uppercase">Initiate Neural Link</p>
              <p className="text-sm font-bold text-gray-500 leading-relaxed uppercase tracking-widest">Ask about soil health, pest control, or optimized NPK ratios.</p>
            </div>
            <div className="grid grid-cols-1 gap-4 w-full pt-4">
              {['Soil restoration techniques?', 'Best season for Wheat B?', 'AI pricing projections?'].map((q, i) => (
                <button key={i} onClick={() => { setInput(q); }} className="bg-white/5 hover:bg-emerald-500/10 text-gray-500 hover:text-emerald-400 p-5 rounded-3xl text-[10px] font-black uppercase tracking-widest border border-white/5 transition-all outline-none">
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {messages.map((msg, i) => (
          <motion.div 
            initial={{ opacity: 0, x: msg.sender === 'user' ? 20 : -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex items-start space-x-6 max-w-[85%] sm:max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-2xl transition-transform hover:scale-110 ${
                msg.sender === 'user' ? 'bg-blue-600 text-white' : 'glass-emerald text-emerald-400 border border-emerald-500/20'
              }`}>
                {msg.sender === 'user' ? <User size={18} /> : <Cpu size={18} />}
              </div>
              <div className={`p-8 rounded-[3rem] shadow-2xl text-base font-medium leading-relaxed relative ${
                msg.sender === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/10 border border-white/10' 
                  : 'glass text-gray-300 rounded-tl-none border border-white/10'
              }`}>
                {msg.text}
                <div className={`mt-4 text-[9px] font-black uppercase tracking-widest opacity-40 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                  {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • SYNCED
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="glass p-6 rounded-[2.5rem] rounded-tl-none border border-white/5 flex items-center space-x-3">
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce shadow-[0_0_10px_#10b981]" />
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s] shadow-[0_0_10px_#10b981]" />
                <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s] shadow-[0_0_10px_#10b981]" />
             </div>
          </div>
        )}
        <div ref={scrollRef} className="h-4" />
      </div>

      {/* Input Area */}
      <div className="p-8 bg-black/20 border-t border-white/5">
        <form onSubmit={handleSend} className="relative group max-w-5xl mx-auto">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center space-x-3">
            <button type="button" className="p-3 text-gray-600 hover:text-emerald-500 hover:bg-white/5 rounded-2xl transition-all">
              <Paperclip size={22} />
            </button>
          </div>
          <input 
            type="text"
            className="w-full bg-white/5 border border-white/5 group-focus-within:border-emerald-500/30 group-focus-within:bg-white/10 text-white py-7 pl-20 pr-40 rounded-[2.5rem] outline-none transition-all placeholder:text-gray-600 font-bold text-lg tracking-tight"
            placeholder="Type your query for neural analysis..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center space-x-4">
             <button type="button" className="hidden sm:flex p-3 text-gray-600 hover:text-blue-500 hover:bg-white/5 rounded-2xl transition-all">
               <Mic size={22} />
             </button>
             <button 
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-white/5 disabled:text-gray-800 text-white px-10 py-4 rounded-[2rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-emerald-500/20 transition-all active:scale-95 flex items-center space-x-3"
             >
               <span className="hidden sm:inline">SEND DATA</span>
               <Send size={18} />
             </button>
          </div>
        </form>
        <p className="mt-6 text-center text-[10px] font-black text-gray-700 uppercase tracking-[0.4em]">
           SECURE NEURAL LINK • END-TO-END QUANTUM ENCRYPTION
        </p>
      </div>
    </div>
  );
};

export default Chat;
