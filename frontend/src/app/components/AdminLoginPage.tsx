import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';
import { login } from '../api';

export function AdminLoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetMsg, setResetMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate('/admin/dashboard');
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '';
      if (!username || !password) {
        setError('Please enter your username and password.');
      } else if (message === 'Invalid credentials') {
        setError('Incorrect username or password. Please try again.');
      } else {
        setError('Unable to reach the server. Make sure the backend is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2C2416] via-[#3d3020] to-[#4A7C2C] flex items-center justify-center p-4 md:p-8">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        {/* Security Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#4A7C2C]/20 border border-[#4A7C2C]/40 rounded-full backdrop-blur-sm">
            <Shield className="w-4 h-4 text-[#A68A64]" />
            <span className="text-sm text-[#E8DCC8]">Secure Portal</span>
          </div>
        </div>

        <div className="bg-[#FDFBF7] rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-[#D4C4B0]">
          {/* Logo & Header */}
          <div className="text-center mb-6 md:mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#4A7C2C] rounded-full mb-3 md:mb-4">
              <Lock className="w-7 h-7 md:w-8 md:h-8 text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl text-[#4A7C2C] font-serif mb-2">Page & Prose</h1>
            <p className="text-[#6B5D4F]">Owner Portal</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error */}
            {error && (
              <div className="px-4 py-3 bg-red-50 border-2 border-red-200 rounded-lg text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-[#2C2416] mb-2">
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416] transition-colors"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#2C2416] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border-2 border-[#D4C4B0] rounded-lg focus:outline-none focus:border-[#4A7C2C] text-[#2C2416] pr-12 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-[#6B5D4F] hover:text-[#4A7C2C] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-[#4A7C2C] border-[#D4C4B0] rounded focus:ring-[#4A7C2C] focus:ring-offset-0"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-[#6B5D4F]">
                Remember me
              </label>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#4A7C2C] text-white rounded-lg hover:bg-[#3d6624] transition-colors font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            {/* Forgot Password Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setResetMsg('Password reset is coming soon. Please contact your administrator.')}
                className="text-sm text-[#A68A64] hover:text-[#8f7556] transition-colors hover:underline"
              >
                Forgot Password?
              </button>
              {resetMsg && (
                <p className="mt-2 text-xs text-[#6B5D4F]">{resetMsg}</p>
              )}
            </div>
          </form>

          {/* Security Notice */}
          <div className="mt-6 pt-6 border-t-2 border-[#E8DCC8]">
            <div className="flex items-center gap-2 text-xs text-[#6B5D4F] justify-center">
              <Lock className="w-3 h-3" />
              <span>Your connection is secure and encrypted</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2">
          <button
            onClick={() => navigate('/')}
            className="text-sm text-[#E8DCC8] hover:text-white transition-colors underline underline-offset-2"
          >
            ← Back to Storefront
          </button>
          <p className="text-sm text-[#E8DCC8]">
            © 2026 Page & Prose. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
