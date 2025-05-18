import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatBubble from '@/components/ChatBubble';
import { authService } from '@/services/authService';
import { Eye, EyeOff } from 'lucide-react';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const query = useQuery();
  const token = query.get('token') || '';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    const ok = authService.resetPassword(token, password);
    if (ok) {
      setSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } else {
      setError('Invalid or expired reset link.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
            {success ? (
              <div className="text-green-600 text-center">Password reset! Redirecting to login...</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      tabIndex={-1}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      style={{ background: 'none', border: 'none', padding: 0 }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={e => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(v => !v)}
                      className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                      tabIndex={-1}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      style={{ background: 'none', border: 'none', padding: 0 }}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                {error && <div className="text-red-600 text-sm">{error}</div>}
                <Button type="submit" className="w-full">Reset Password</Button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
      <ChatBubble />
    </div>
  );
};
export default ResetPassword; 