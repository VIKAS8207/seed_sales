"use client";
import { Search, Bell } from "lucide-react";

export default function Topbar() {
  return (
    <header className="sticky top-4 z-50 mx-8 flex justify-between items-center bg-brand-white/80 backdrop-blur-md border border-brand-bg rounded-2xl px-6 py-3 shadow-sm">
      
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-gray/50" />
        <input 
          type="text" 
          placeholder="Search invoices, customers, or transactions..." 
          className="w-full pl-10 pr-4 py-2 bg-brand-bg/50 border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark text-sm transition-all"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative text-brand-gray hover:text-brand-dark transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-brand-white"></span>
        </button>
        <div className="h-8 w-px bg-brand-bg"></div>
        <div className="flex items-center gap-3 cursor-pointer">
          <img src="https://ui-avatars.com/api/?name=Admin+User&background=9EE970&color=254F4C" alt="Profile" className="w-9 h-9 rounded-full" />
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-brand-dark leading-none">Admin User</span>
            <span className="text-[10px] text-brand-gray mt-1">seed sales HQ</span>
          </div>
        </div>
      </div>
      
    </header>
  );
}