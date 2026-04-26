import React, { useState, useEffect, useRef } from 'react';
import { aiMentorService } from '../services/api';
import DashboardHeader from '../components/DashboardHeader';
import { useAuth } from '../context/AuthContext';
import { 
  Send, 
  Sparkles, 
  Paperclip, 
  Mic, 
  Trash2, 
  MessageSquare,
  User,
  Bot,
  Zap,
  MoreVertical,
  Plus
} from 'lucide-react';

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
      console.error("Chat history fetch failed", err);
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
      console.error("AI Response failed", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <DashboardHeader title="AI Mentor" user={user} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[calc(100vh-200px)]">
        
        {/* Chat List/History Sidebar */}
        <div className="hidden lg:block lg:col-span-3 space-y-6">
          <div className="glass-card p-6 h-full flex flex-col">
            <button className="btn-primary w-full py-3 mb-6 justify-center gap-2">
              <Plus size={18} /> New Conversation
            </button>
            <div className="flex-1 overflow-y-auto space-y-2">
              <p className="text-[10px] font-bold text-[#52796F] uppercase tracking-widest px-2 mb-4">Recent Discussions</p>
              <ChatItem active={true} title="Soil Nutrition Plan" date="Today" />
              <ChatItem title="Wheat Pest Control" date="Yesterday" />
              <ChatItem title="Market Price Analysis" date="24 Apr" />
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="lg:col-span-9 flex flex-col h-full glass-card overflow-hidden bg-white">
          
          {/* Chat Header */}
          <div className="p-6 border-b border-[#D8F3DC] flex justify-between items-center bg-[#F8FAF9]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#2D6A4F] rounded-2xl flex items-center justify-center text-white shadow-lg shadow-[#2D6A4F22]">
                <Sparkles size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#1B4332]">Neural Mentor AI</h4>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-widest">Active & Learning</span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-white rounded-lg text-[#52796F] transition-all"><Trash2 size={20} /></button>
              <button className="p-2 hover:bg-white rounded-lg text-[#52796F] transition-all"><MoreVertical size={20} /></button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-8 space-y-8">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-6">
                <div className="w-20 h-20 bg-[#F8FAF9] rounded-full flex items-center justify-center text-[#D8F3DC]">
                  <MessageSquare size={48} />
                </div>
                <h3 className="text-2xl font-bold text-[#1B4332]">How can I help you today?</h3>
                <p className="text-sm text-[#52796F]">Ask me anything about your crops, soil, or the marketplace.</p>
                <div className="grid grid-cols-1 gap-3 w-full">
                  {["Best fertilizer for Rice?", "Weather forecast for next week", "How to increase yield?"].map((q, i) => (
                    <button key={i} onClick={() => setInput(q)} className="text-left px-6 py-3 bg-[#F8FAF9] border border-[#D8F3DC] rounded-xl text-xs font-bold text-[#2D6A4F] hover:bg-[#D8F3DC] transition-all">
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-4 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                    msg.sender === 'user' ? 'bg-[#3A86FF] text-white' : 'bg-[#D8F3DC] text-[#2D6A4F]'
                  }`}>
                    {msg.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
                  </div>
                  <div className={`p-5 rounded-[24px] text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                    ? 'bg-[#3A86FF] text-white rounded-tr-none' 
                    : 'bg-[#F8FAF9] text-[#1B4332] border border-[#D8F3DC] rounded-tl-none'
                  }`}>
                    {msg.text}
                    <p className={`text-[9px] mt-3 font-bold uppercase opacity-50 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex gap-4 max-w-[80%]">
                  <div className="w-10 h-10 bg-[#D8F3DC] rounded-xl flex items-center justify-center text-[#2D6A4F]">
                    <Bot size={20} />
                  </div>
                  <div className="bg-[#F8FAF9] p-5 rounded-[24px] rounded-tl-none border border-[#D8F3DC] flex gap-2">
                    <div className="w-2 h-2 bg-[#2D6A4F] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#2D6A4F] rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-[#2D6A4F] rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={scrollRef} />
          </div>

          {/* Input Area */}
          <div className="p-6 bg-[#F8FAF9] border-t border-[#D8F3DC]">
            <form onSubmit={handleSend} className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button type="button" className="p-2 text-[#52796F] hover:bg-white rounded-lg transition-all"><Paperclip size={20} /></button>
              </div>
              <input 
                type="text"
                placeholder="Ask your mentor..."
                className="w-full pl-14 pr-32 py-4 bg-white border border-[#D8F3DC] rounded-2xl focus:border-[#2D6A4F] outline-none font-medium shadow-inner"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button type="button" className="p-2 text-[#52796F] hover:bg-white rounded-lg transition-all"><Mic size={20} /></button>
                <button 
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="bg-[#2D6A4F] text-white p-3 rounded-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
            <p className="text-[9px] font-bold text-[#52796F] uppercase text-center mt-4 tracking-widest flex items-center justify-center gap-2">
              <Zap size={10} className="text-amber-500 fill-amber-500" /> Powered by AIFarm Neural Engine
            </p>
          </div>
        </div>

      </div>
    </>
  );
};

const ChatItem = ({ title, date, active }) => (
  <button className={`w-full p-4 rounded-2xl text-left transition-all ${
    active ? 'bg-[#D8F3DC] border-[#2D6A4F] border' : 'hover:bg-[#F8FAF9] border border-transparent'
  }`}>
    <h5 className="text-xs font-bold text-[#1B4332] truncate">{title}</h5>
    <p className="text-[10px] text-[#52796F]">{date}</p>
  </button>
);

export default Chat;
