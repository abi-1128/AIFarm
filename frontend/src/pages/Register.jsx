import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthCard, AuthInput, AuthButton } from '../components/AuthComponents';
import ThreeDBackground from '../components/ThreeDBackground';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'LANDOWNER',
    phone: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAF9] overflow-hidden font-outfit relative">
      <ThreeDBackground type="auth" />

      <div className="flex flex-col items-center w-full max-w-3xl relative z-10">
        <div className="mb-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2D6A4F] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">A</div>
          <h3 className="text-3xl font-black text-[#1B4332] tracking-tighter uppercase">AIFarm</h3>
        </div>

        <AuthCard>
          {/* Form Side */}
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <div className="space-y-2 mb-10">
              <h1 className="text-3xl font-black text-[#1B4332] tracking-tight">Register</h1>
              <p className="text-[#52796F] font-medium text-base">Create your AIFarm account to start growing.</p>
            </div>

          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-xl mb-6 text-xs font-bold border border-red-500/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AuthInput 
              label="Username" 
              placeholder="Pick a username" 
              value={formData.username}
              onChange={(v) => setFormData({ ...formData, username: v })}
            />
            <AuthInput 
              label="Email" 
              type="email"
              placeholder="email@example.com" 
              value={formData.email}
              onChange={(v) => setFormData({ ...formData, email: v })}
            />
            <AuthInput 
              label="Password" 
              type="password"
              placeholder="••••••••" 
              value={formData.password}
              onChange={(v) => setFormData({ ...formData, password: v })}
            />
            <div className="space-y-2">
              <label className="text-[9px] font-black text-[#2D6A4F] uppercase tracking-widest ml-1">Role</label>
              <select
                className="w-full px-5 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-[#2D6A4F] outline-none transition-all font-bold text-white appearance-none cursor-pointer"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="LANDOWNER">Farmer / Landowner</option>
                <option value="BUYER">Buyer / Distributor</option>
              </select>
            </div>
            <AuthInput 
              label="Phone" 
              placeholder="+00 000 000" 
              value={formData.phone}
              onChange={(v) => setFormData({ ...formData, phone: v })}
            />
            <AuthInput 
              label="Location" 
              placeholder="City, Country" 
              value={formData.location}
              onChange={(v) => setFormData({ ...formData, location: v })}
            />
            <div className="md:col-span-2 pt-4">
              <AuthButton label="Create Account" loading={loading} />
            </div>
          </form>

          <p className="mt-8 text-center text-[#52796F] font-bold text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-[#2D6A4F] hover:text-[#40916C] underline underline-offset-8 decoration-2 transition-all">Log In</Link>
          </p>
        </div>
      </AuthCard>
      </div>
    </div>
  );
};

export default Register;
