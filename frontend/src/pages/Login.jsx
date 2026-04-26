import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthCard, AuthInput, AuthButton } from '../components/AuthComponents';

import ThreeDBackground from '../components/ThreeDBackground';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(credentials);
      navigate('/');
    } catch (err) {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#F8FAF9] overflow-hidden font-outfit relative">
      <ThreeDBackground type="auth" />

      <div className="flex flex-col items-center w-full max-w-lg relative z-10">
        <div className="mb-10 flex items-center gap-4">
          <div className="w-12 h-12 bg-[#2D6A4F] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg">A</div>
          <h3 className="text-3xl font-black text-[#1B4332] tracking-tighter uppercase">AIFarm</h3>
        </div>

        <AuthCard>
          {/* Form Section */}
          <div className="p-10 md:p-14 flex flex-col justify-center">
            <div className="space-y-2 mb-10">
              <h1 className="text-3xl font-black text-[#1B4332] tracking-tight">Login</h1>
              <p className="text-[#52796F] font-medium text-base">Welcome back to your farm ecosystem.</p>
            </div>

          {error && (
            <div className="bg-red-500/10 text-red-400 p-4 rounded-xl mb-8 text-xs font-bold border border-red-500/20">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <AuthInput 
              label="Username" 
              placeholder="Enter your username" 
              value={credentials.username}
              onChange={(v) => setCredentials({ ...credentials, username: v })}
            />
            <AuthInput 
              label="Password" 
              type="password"
              placeholder="••••••••" 
              value={credentials.password}
              onChange={(v) => setCredentials({ ...credentials, password: v })}
            />
            <AuthButton label="Sign In" loading={loading} />
          </form>

          <p className="mt-10 text-center text-[#52796F] font-bold text-sm">
            Don't have an account?{' '}
            <Link to="/register" className="text-[#2D6A4F] hover:text-[#40916C] underline underline-offset-8 decoration-2 transition-all">Register Now</Link>
          </p>
        </div>
      </AuthCard>
      </div>
    </div>
  );
};

export default Login;
