import { motion } from 'framer-motion';

// 1. Structural Card Container
export const AuthCard = ({ children }) => {
  return (
    <div className="w-full bg-white rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-[#E2E8F0] relative z-10">
      {children}
    </div>
  );
};

// 2. Structured Input Field
export const AuthInput = ({ label, type = "text", placeholder, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-[#1B4332] ml-1">{label}</label>
    <div className="relative">
      <input
        type={type}
        required
        className="w-full px-5 py-3.5 bg-[#F8FAFB] border border-[#E2E8F0] rounded-xl focus:ring-4 focus:ring-[#2D6A4F]/5 focus:border-[#2D6A4F] focus:bg-white outline-none transition-all font-semibold text-[#1B4332] placeholder:text-[#94A3B8] text-sm"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  </div>
);

// 3. Structural Action Button
export const AuthButton = ({ label, loading, onClick }) => (
  <button 
    type="submit" 
    disabled={loading}
    onClick={onClick}
    className="w-full py-4 bg-[#2D6A4F] text-white rounded-xl font-bold tracking-tight shadow-[0_10px_20px_rgba(45,106,79,0.15)] hover:bg-[#1B4332] transition-all disabled:opacity-50 text-sm mt-2"
  >
    {loading ? 'Processing...' : label}
  </button>
);

// 4. 3D Logo Scene
export const AIFarmLogo = () => (
  <div className="relative w-48 h-48 mx-auto" style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}>
    <motion.div 
      animate={{ rotateY: 360, rotateX: [0, 10, 0] }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className="w-full h-full relative"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-[180px] font-black text-[#2D6A4F] leading-none drop-shadow-[0_0_20px_#2D6A4F33]" style={{ transform: 'translateZ(50px)' }}>A</div>
        <div className="text-[180px] font-black text-[#40916C] leading-none absolute opacity-20" style={{ transform: 'translateZ(-50px)' }}>A</div>
      </div>
      <div className="absolute inset-[-40px] border-4 border-[#2D6A4F]/10 rounded-full" style={{ transform: 'rotateX(80deg)' }} />
      <div className="absolute inset-[-40px] border-4 border-[#2D6A4F]/5 rounded-full" style={{ transform: 'rotateY(80deg)' }} />
    </motion.div>
  </div>
);
