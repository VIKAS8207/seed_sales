"use client";
import { useState } from "react";
import { 
  Search, Plus, Filter, Building2, TrendingUp, Users as UsersIcon, Award, 
  X, ChevronLeft, ChevronRight, MoreVertical, MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data for Societies
const MOCK_SOCIETIES = [
  { id: "1", name: "Kisan Agro Cooperative", date: "12 Jan 2021", place: "Raipur, CG", regNo: "CG-KAC-2021-091", members: 450, status: "Active" },
  { id: "2", name: "Vidarbha Farmers DDA", date: "05 Mar 2022", place: "Nagpur, MH", regNo: "MH-VFD-2022-112", members: 820, status: "Active" },
  { id: "3", name: "Green Earth Seed Traders", date: "18 Aug 2023", place: "Bilaspur, CG", regNo: "CG-GES-2023-441", members: 150, status: "Pending" },
  { id: "4", name: "Bastar Tribal Agri Guild", date: "22 Nov 2020", place: "Jagdalpur, CG", regNo: "CG-BTA-2020-008", members: 1200, status: "Active" },
  { id: "5", name: "Narmada Valley Society", date: "10 Feb 2024", place: "Jabalpur, MP", regNo: "MP-NVS-2024-555", members: 85, status: "Active" },
];

export default function SocietyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 pt-10 w-full max-w-[1400px] mx-auto">
      
      {/* Page Header & Actions */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Registered Societies</h1>
          <p className="text-brand-gray text-sm">Manage cooperative societies, DDA groups, and trading entities.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-brand-primary text-brand-dark font-semibold rounded-xl flex items-center gap-2 hover:bg-[#8CD85F] transition shadow-sm"
        >
          <Plus className="w-5 h-5" /> Add New Society
        </button>
      </div>

      {/* 4-Column Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="TOTAL SOCIETIES" value="142" subtitle="Across 4 states" icon={<Building2 className="w-5 h-5 text-blue-600" />} iconBg="bg-blue-50" />
        <StatCard title="ACTIVE MEMBERS" value="24,500+" subtitle="Total enrolled farmers" icon={<UsersIcon className="w-5 h-5 text-green-600" />} iconBg="bg-green-50" />
        <StatCard title="TOP PERFORMING" value="Kisan Agro" subtitle="Highest revenue this FY" icon={<Award className="w-5 h-5 text-yellow-600" />} iconBg="bg-yellow-50" />
        <StatCard title="AVG REVENUE / SOC" value="₹12.5L" subtitle="↑ 8% vs last year" icon={<TrendingUp className="w-5 h-5 text-emerald-600" />} iconBg="bg-emerald-50" />
      </div>

      {/* Table Section */}
      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm flex flex-col">
        
        {/* Filters & Search */}
        <div className="p-5 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20 rounded-t-2xl">
          <div className="flex gap-4 items-center w-full max-w-2xl">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
              <input 
                type="text" 
                placeholder="Search society name, reg number..." 
                className="w-full pl-9 pr-4 py-2 bg-brand-white border border-brand-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm text-brand-dark"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray font-medium hover:bg-brand-bg/50 transition">
              <Filter className="w-4 h-4" /> State: All
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-brand-dark font-semibold bg-brand-bg/30">
              <tr>
                <th className="p-4 pl-6 w-16">S.No</th>
                <th className="p-4">Society Name</th>
                <th className="p-4">Reg Number</th>
                <th className="p-4">Place / Region</th>
                <th className="p-4">Date Created</th>
                <th className="p-4">Members</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-brand-gray">
              {MOCK_SOCIETIES.map((soc, i) => (
                <tr key={soc.id} className="hover:bg-brand-bg/10 transition border-b border-brand-bg/50 last:border-0">
                  <td className="p-4 pl-6 font-medium text-brand-dark">{soc.id}</td>
                  <td className="p-4">
                    <div className="font-semibold text-brand-dark">{soc.name}</div>
                    <div className={`text-[10px] font-bold uppercase mt-1 w-max px-2 py-0.5 rounded-full ${soc.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {soc.status}
                    </div>
                  </td>
                  <td className="p-4 font-medium text-brand-dark">{soc.regNo}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-1.5 text-brand-gray">
                      <MapPin className="w-4 h-4 text-brand-primary" /> {soc.place}
                    </div>
                  </td>
                  <td className="p-4">{soc.date}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-brand-bg rounded-lg font-semibold text-brand-dark">{soc.members}</span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button className="p-1.5 hover:bg-brand-bg rounded-md transition">
                      <MoreVertical className="w-5 h-5 text-brand-gray" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-brand-bg flex justify-between items-center bg-brand-white rounded-b-2xl">
          <span className="text-sm text-brand-gray font-medium pl-2">Showing 1 to 5 of 142 societies</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-8 h-8 flex items-center justify-center border border-brand-primary bg-brand-primary/10 rounded-md text-brand-dark font-semibold">1</button>
            <button className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50 font-medium">2</button>
            <button className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Add Society Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-brand-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20">
                <h2 className="text-xl font-bold text-brand-dark">Register New Society</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-brand-white border border-brand-bg rounded-full text-brand-gray hover:text-brand-dark hover:bg-brand-bg/50 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Society/Entity Name</label>
                    <input type="text" placeholder="e.g. Kisan Agro Cooperative" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Registration Number</label>
                    <input type="text" placeholder="CG-KAC-2024-..." className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Place / City</label>
                    <input type="text" placeholder="e.g. Raipur" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">State</label>
                    <select className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark">
                      <option>Chhattisgarh</option>
                      <option>Madhya Pradesh</option>
                      <option>Maharashtra</option>
                      <option>Odisha</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Date Created / Established</label>
                    <input type="date" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Operating Zone</label>
                    <input type="text" placeholder="e.g. Central Zone" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-1.5">Head/President Name</label>
                  <input type="text" placeholder="Full Name" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                </div>
              </div>

              <div className="p-6 border-t border-brand-bg bg-brand-bg/10 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 border border-brand-bg rounded-xl text-brand-dark font-semibold hover:bg-brand-bg/50 transition">Cancel</button>
                <button className="px-6 py-2.5 bg-brand-primary text-brand-dark font-semibold rounded-xl hover:bg-[#8CD85F] transition shadow-sm">Save Society</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function StatCard({ title, value, subtitle, icon, iconBg }: any) {
  return (
    <div className="bg-brand-white border border-brand-bg rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xs font-semibold text-brand-gray uppercase tracking-wide w-2/3 leading-tight">{title}</h4>
        <div className={`p-2 rounded-lg ${iconBg}`}>{icon}</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-brand-dark mb-1">{value}</div>
        <div className="text-xs font-medium text-brand-gray/70">{subtitle}</div>
      </div>
    </div>
  );
}