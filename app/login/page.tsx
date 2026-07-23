"use client";
import { useState } from "react";
import Link from "next/link";
import { Droplets, Mail, Lock } from "lucide-react";

export default function LoginPage() {
  const [role, setRole] = useState<'user' | 'admin'>('user');

  return (
    <div className="flex flex-col lg:flex-row h-screen w-full bg-brand-white overflow-hidden">
      
      {/* Left Panel: Visuals & Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0B150F] overflow-hidden flex-col justify-end">
        {/* Glow Effect */}
        <div className="absolute -bottom-[30%] -left-[20%] w-[120%] h-[100%] bg-brand-primary/40 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute top-[20%] -left-[10%] w-[80%] h-[80%] bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        {/* Marketing Text */}
        <div className="relative z-10 p-12 pb-24 max-w-xl">
          <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
            Streamline your sales. Manage leads.<br />Close more deals.
          </h1>
          <p className="text-white/70 text-sm leading-relaxed">
            Stay financially secure and manage your workflow efficiently. Check your opportunities for growth and scale your business with our advanced SalesPulse insights.
          </p>
        </div>
      </div>

      {/* Right Panel: Login Actions */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative bg-brand-white">
        
        <div className="w-full max-w-sm flex flex-col items-center">
          {/* Logo */}
          <div className="w-12 h-12 rounded-full border-2 border-brand-primary flex items-center justify-center mb-6">
            <Droplets className="w-6 h-6 text-brand-dark" />
          </div>
          
          <h2 className="text-3xl font-bold text-brand-dark mb-8">Welcome back</h2>

          {/* Role Selection Toggle */}
          <div className="flex w-full bg-brand-bg/60 p-1 rounded-xl mb-8">
            <button
              onClick={() => setRole('user')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                role === 'user' 
                  ? 'bg-brand-white shadow-sm text-brand-dark' 
                  : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              User
            </button>
            <button
              onClick={() => setRole('admin')}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                role === 'admin' 
                  ? 'bg-brand-white shadow-sm text-brand-dark' 
                  : 'text-brand-gray hover:text-brand-dark'
              }`}
            >
              Admin
            </button>
          </div>

          {/* Login Form */}
          <div className="w-full flex flex-col gap-5 mb-8">
            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1.5 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
                <input 
                  type="email" 
                  placeholder="name@company.com" 
                  className="w-full pl-10 pr-4 py-3 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark placeholder:text-brand-gray/40 transition-shadow"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-dark mb-1.5 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-10 pr-4 py-3 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark placeholder:text-brand-gray/40 transition-shadow"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-brand-bg text-brand-primary focus:ring-brand-primary accent-brand-primary" />
                <span className="text-sm text-brand-gray font-medium">Remember me</span>
              </label>
              <Link href="#" className="text-sm font-medium text-brand-dark hover:text-brand-primary transition-colors">
                Forgot password?
              </Link>
            </div>

            <Link 
              href={`/${role}/dashboard`} 
              className="w-full text-center py-3.5 mt-2 bg-gradient-to-r from-brand-dark to-[#5ab84b] text-white rounded-xl font-medium shadow-md hover:opacity-90 transition-opacity"
            >
              Log in
            </Link>
          </div>
        </div>

        {/* Footer Terms */}
        <div className="absolute bottom-8 px-8 text-center text-xs text-brand-gray/60 max-w-md">
          By continuing, you acknowledge that you have read and agree to our{' '}
          <Link href="#" className="text-brand-dark hover:text-brand-primary font-medium transition-colors">Terms of Service</Link>{' '}
          and{' '}
          <Link href="#" className="text-brand-dark hover:text-brand-primary font-medium transition-colors">Privacy Policy</Link>.
        </div>

      </div>
    </div>
  );
}