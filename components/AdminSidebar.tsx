"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  LayoutGrid, 
  Package, 
  Users, 
  Building2, 
  UserSquare2, 
  Banknote, 
  Truck, 
  Sprout,
  LogOut,
  FileBarChart,
  ChevronDown
} from "lucide-react";

export default function AdminSidebar() {
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
        <span className="text-2xl font-bold tracking-wide">Seed Sales</span>
      </div>

      <span className="text-xs text-white/50 uppercase tracking-wider mb-4 font-semibold">Admin Menu</span>
      
      <nav className="flex flex-col gap-2 overflow-y-auto pb-4 custom-scrollbar">
        <Link href="/admin/dashboard" className={isActive("/admin/dashboard") ? activeClass : inactiveClass}>
          <LayoutGrid className="w-5 h-5" /> Dashboard
        </Link>
        
        <Link href="/admin/items" className={isActive("/admin/items") ? activeClass : inactiveClass}>
          <Package className="w-5 h-5" /> Items
        </Link>

        <Link href="/admin/users" className={isActive("/admin/users") ? activeClass : inactiveClass}>
          <Users className="w-5 h-5" /> Users
        </Link>

        <Link href="/admin/society" className={isActive("/admin/society") ? activeClass : inactiveClass}>
          <Building2 className="w-5 h-5" /> Society
        </Link>

        <Link href="/admin/customer" className={isActive("/admin/customer") ? activeClass : inactiveClass}>
          <UserSquare2 className="w-5 h-5" /> Customer
        </Link>

       

        <Link href="/admin/supplier" className={isActive("/admin/supplier") ? activeClass : inactiveClass}>
          <Truck className="w-5 h-5" /> Supplier
        </Link>

        {/* Reports Dropdown */}
        <div>
          <button 
            onClick={() => setIsReportsOpen(!isReportsOpen)} 
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all font-medium ${
              pathname.includes('/admin/reports') ? 'bg-brand-primary/10 text-brand-primary' : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              <FileBarChart className="w-5 h-5" /> Reports
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isReportsOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {/* Sub-menu */}
          <div className={`flex flex-col gap-1 mt-1 overflow-hidden transition-all duration-300 ${isReportsOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
            <Link href="/admin/reports/society" className="pl-12 pr-4 py-2 text-sm text-white/50 hover:text-white transition-colors">Society wise report</Link>
            <Link href="/admin/reports/customer" className="pl-12 pr-4 py-2 text-sm text-white/50 hover:text-white transition-colors">Customer wise report</Link>
            <Link href="/admin/reports/list-customer" className="pl-12 pr-4 py-2 text-sm text-white/50 hover:text-white transition-colors">List of customer</Link>
            <Link href="/admin/reports/list-supplier" className="pl-12 pr-4 py-2 text-sm text-white/50 hover:text-white transition-colors">List of supplier</Link>
            <Link href="/admin/reports/stock" className="pl-12 pr-4 py-2 text-sm text-white/50 hover:text-white transition-colors">Stock & variety of seed</Link>
          </div>
        </div>
      </nav>

      {/* Logout Pinned to Bottom */}
      <div className="mt-auto pt-4 border-t border-white/10">
        <Link href="/login" className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-white/5 hover:text-red-300 rounded-xl transition-all font-medium">
          <LogOut className="w-5 h-5" /> Logout
        </Link>
      </div>
    </aside>
  );
}