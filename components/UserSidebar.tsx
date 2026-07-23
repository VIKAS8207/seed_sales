"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutGrid, 
  Receipt, 
  BookOpen, 
  CreditCard,
  Sprout,
  LogOut,
  FileBarChart,
  ChevronDown
} from "lucide-react";

export default function UserSidebar() {
  const pathname = usePathname();
  const [isReportsOpen, setIsReportsOpen] = useState(false);

  // Helper function to check if the link is active
  const isActive = (path: string) => pathname === path;

  // Reusable active/inactive classes for the dark theme
  const activeClass = "flex items-center gap-3 px-4 py-3 bg-brand-primary text-brand-dark font-semibold rounded-xl shadow-sm transition-all";
  const inactiveClass = "flex items-center gap-3 px-4 py-3 text-white/70 hover:bg-white/10 hover:text-white rounded-xl transition-all font-medium";

  return (
    <aside className="w-72 h-full bg-brand-dark flex flex-col p-6 shrink-0 shadow-xl z-10 border-r border-brand-dark">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10 text-white">
        <div className="p-1.5 bg-brand-primary/10 rounded-lg">
          <Sprout className="w-8 h-8 text-brand-primary" />
        </div>
        <span className="text-2xl font-bold tracking-wide">Maha Beej</span>
      </div>

      <span className="text-xs text-white/50 uppercase tracking-wider mb-4 font-semibold">User Menu</span>
      
      <nav className="flex flex-col gap-2 overflow-y-auto pb-4">
        <Link href="/user/dashboard" className={isActive("/user/dashboard") ? activeClass : inactiveClass}>
          <LayoutGrid className="w-5 h-5" /> Dashboard
        </Link>
        
        <Link href="/user/invoice" className={isActive("/user/invoice") ? activeClass : inactiveClass}>
          <Receipt className="w-5 h-5" /> Invoice
        </Link>

        <Link href="/user/ledger" className={isActive("/user/ledger") ? activeClass : inactiveClass}>
          <BookOpen className="w-5 h-5" /> Ledger
        </Link>

        <Link href="/user/payment" className={isActive("/user/payment") ? activeClass : inactiveClass}>
          <CreditCard className="w-5 h-5" /> Online Payment & Treasury
        </Link>

        {/* Reports Dropdown */}
        <div>
          <button 
            onClick={() => setIsReportsOpen(!isReportsOpen)} 
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium ${
              pathname.includes('/user/reports') ? 'bg-brand-primary/10 text-brand-primary' : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileBarChart className="w-5 h-5" /> Reports
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isReportsOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Sub-menu (Tailored for the user context) */}
          <div className={`flex flex-col gap-1 mt-1 overflow-hidden transition-all duration-300 ${isReportsOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
            <Link href="/user/reports/purchase" className="pl-12 pr-4 py-2 text-sm text-white/50 hover:text-white transition-colors">Purchase Report</Link>
            <Link href="/user/reports/ledger" className="pl-12 pr-4 py-2 text-sm text-white/50 hover:text-white transition-colors">Ledger Summary</Link>
            <Link href="/user/reports/payment" className="pl-12 pr-4 py-2 text-sm text-white/50 hover:text-white transition-colors">Payment History</Link>
          </div>
        </div>
      </nav>

      {/* Logout Pinned to Bottom (Updated for dark theme) */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5 hover:text-red-300 rounded-xl transition-all font-medium">
          <LogOut className="w-5 h-5" /> Logout
        </Link>
      </div>
    </aside>
  );
}