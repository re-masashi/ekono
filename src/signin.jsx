import { motion } from "framer-motion";
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createRouter, useNavigate } from '@tanstack/react-router';
import { useFlash } from './FlashContext';

import { api } from './api';

// import { Envelope, Lock, Github, Google } from "./Icons"; // Import your icons
import { FaEnvelope as Envelope } from "react-icons/fa6";
import { FcGoogle as Google } from "react-icons/fc";
import { FaGithub as Github } from "react-icons/fa";
import { FaLock as Lock } from "react-icons/fa";

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { addFlash } = useFlash();

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (credentials) => {
      const response = await fetch('http://localhost:8000/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        addFlash('error', error.message || 'Oops! Sign in failed!');
        throw new Error(error.message || 'Login failed');
      }

      return response.json();
    },
    onSuccess: (data) => {
      addFlash('success', 'Logged in successfully!');
      localStorage.setItem('jwt_token', data.access_token);
      navigate({ to: '/dashboard' });
    },
    // onError: (error) => {
    // }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({ username: email, password });
  };

  return (
    <div
      style={{
        backgroundImage: "url('/loginbg.png')",
        backgroundRepeat: "norepeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }} 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-900">

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-zinc-900/50 backdrop-blur-lg border border-zinc-800 rounded-2xl p-8 w-full max-w-md shadow-2xl"
      >
        {/* Glowing Border Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/30 to-cyan-500/30 blur-xl -z-10" />
        
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
          Welcome Back
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Email Input */}

          <div>
            <label className="block text-zinc-300 mb-2">Email</label>
            <div className="relative">
              <Envelope className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-zinc-200 pl-10 pr-4 py-3 bg-zinc-800/50 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all placeholder-zinc-500"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-zinc-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-zinc-200 pl-10 pr-4 py-3 bg-zinc-800/50 rounded-lg border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all placeholder-zinc-500"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">
              {error.message}
            </div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isPending}
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white py-3 rounded-lg font-medium hover:shadow-lg hover:shadow-purple-500/20 transition-all disabled:opacity-50"
          >
            {isPending ? 'Signing In...' : 'Sign In'}
          </motion.button>

          <div className="text-zinc-300 text-sm text-center">No account? <a className="text-zinc-200 font-bold" href="/signin">Sign Up</a></div>

          {/* Social Login */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-zinc-700" />
            <span className="text-zinc-400 text-sm">Or continue with</span>
            <div className="flex-1 h-px bg-zinc-700" />
          </div>

          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-zinc-800/50 hover:bg-zinc-800/70 py-3 rounded-lg transition-all">
              <Github className="w-5 h-5" />
              <span className="text-zinc-300">GitHub</span>
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-zinc-800/50 hover:bg-zinc-800/70 py-3 rounded-lg transition-all">
              <Google className="w-5 h-5" />
              <span className="text-zinc-300">Google</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}