"use client";
import { useState } from "react";
import { 
  Search, Plus, Filter, UserCheck, UserPlus, ShoppingCart, 
  X, ChevronLeft, ChevronRight, MoreVertical 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data for Customers
const MOCK_CUSTOMERS = [
  { id: "CUST-001", realName: "Ramesh Kumar Patel", username: "ramesh.k", society: "Kisan Agro Cooperative", gender: "Male", contact: "+91 98765 43210", status: "Active" },
  { id: "CUST-002", realName: "Suresh Rao", username: "suresh_rao99", society: "Vidarbha Farmers DDA", gender: "Male", contact: "+91 87654 32109", status: "Active" },
  { id: "CUST-003", realName: "Geeta Devi", username: "geeta.d", society: "Green Earth Seed Traders", gender: "Female", contact: "+91 76543 21098", status: "Inactive" },
  { id: "CUST-004", realName: "Amit Singh", username: "amit_bastar", society: "Bastar Tribal Agri Guild", gender: "Male", contact: "+91 65432 10987", status: "Active" },
  { id: "CUST-005", realName: "Priya Sharma", username: "priya_sharma", society: "Narmada Valley Society", gender: "Female", contact: "+91 54321 09876", status: "Pending" },
];

export default function CustomerPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 pt-10 w-full max-w-[1400px] mx-auto">
      
      {/* Page Header & Actions */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Customer Directory</h1>
          <p className="text-brand-gray text-sm">Manage individual users and their society linkages.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-brand-primary text-brand-dark font-semibold rounded-xl flex items-center gap-2 hover:bg-[#8CD85F] transition shadow-sm"
        >
          <Plus className="w-5 h-5" /> Add New Customer
        </button>
      </div>

      {/* 4-Column Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="TOTAL CUSTOMERS" value="24,512" subtitle="Across all societies" icon={<UserCheck className="w-5 h-5 text-blue-600" />} iconBg="bg-blue-50" />
        <StatCard title="NEW THIS MONTH" value="+845" subtitle="Recent onboards" icon={<UserPlus className="w-5 h-5 text-green-600" />} iconBg="bg-green-50" />
        <StatCard title="ACTIVE BUYERS" value="18,200" subtitle="Purchased in last 90 days" icon={<ShoppingCart className="w-5 h-5 text-emerald-600" />} iconBg="bg-emerald-50" />
        <StatCard title="LARGEST SOCIETY" value="Bastar Tribal" subtitle="1,200 linked customers" icon={<Filter className="w-5 h-5 text-purple-600" />} iconBg="bg-purple-50" />
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
                placeholder="Search name, username, contact..." 
                className="w-full pl-9 pr-4 py-2 bg-brand-white border border-brand-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm text-brand-dark"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray font-medium hover:bg-brand-bg/50 transition">
              <Filter className="w-4 h-4" /> Society: All
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-brand-dark font-semibold bg-brand-bg/30">
              <tr>
                <th className="p-4 pl-6">Customer Details</th>
                <th className="p-4">Username (Portal Login)</th>
                <th className="p-4">Linked Society</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-brand-gray">
              {MOCK_CUSTOMERS.map((cust, i) => (
                <tr key={cust.id} className="hover:bg-brand-bg/10 transition border-b border-brand-bg/50 last:border-0">
                  <td className="p-4 pl-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-white ${cust.gender === 'Male' ? 'bg-blue-400' : 'bg-pink-400'}`}>
                        {cust.realName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-brand-dark">{cust.realName}</div>
                        <div className="text-xs text-brand-gray mt-0.5">{cust.gender} • {cust.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-medium text-brand-dark">@{cust.username}</td>
                  <td className="p-4">
                    <span className="px-3 py-1 bg-brand-bg/60 border border-brand-bg rounded-md text-xs font-semibold text-brand-dark">
                      {cust.society}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-brand-dark">{cust.contact}</td>
                  <td className="p-4">
                     <span className={`px-2.5 py-1 rounded-full text-xs font-semibold 
                      ${cust.status === 'Active' ? 'bg-green-100 text-green-700' : 
                        cust.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                      {cust.status}
                    </span>
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
          <span className="text-sm text-brand-gray font-medium pl-2">Showing 1 to 5 of 24,512 customers</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-8 h-8 flex items-center justify-center border border-brand-primary bg-brand-primary/10 rounded-md text-brand-dark font-semibold">1</button>
            <button className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50 font-medium">2</button>
            <button className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Add Customer Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-brand-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20">
                <h2 className="text-xl font-bold text-brand-dark">Onboard New Customer</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-brand-white border border-brand-bg rounded-full text-brand-gray hover:text-brand-dark hover:bg-brand-bg/50 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1 space-y-5">
                
                {/* Critical Linkage */}
                <div className="bg-brand-primary/5 border border-brand-primary/30 p-4 rounded-xl mb-4">
                  <label className="block text-sm font-semibold text-brand-dark mb-1.5">Link to Society <span className="text-red-500">*</span></label>
                  <select className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark font-medium">
                    <option value="" disabled selected>Select the society this customer belongs to...</option>
                    <option>Kisan Agro Cooperative</option>
                    <option>Vidarbha Farmers DDA</option>
                    <option>Bastar Tribal Agri Guild</option>
                    <option>Narmada Valley Society</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Real Full Name</label>
                    <input type="text" placeholder="e.g. Ramesh Kumar Patel" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Portal Username</label>
                    <input type="text" placeholder="e.g. ramesh.k" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Gender</label>
                    <select className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark">
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Mobile Number</label>
                    <input type="tel" placeholder="+91 00000 00000" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Aadhar / KYC ID</label>
                    <input type="text" placeholder="XXXX-XXXX-XXXX" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Email Address (Optional)</label>
                    <input type="email" placeholder="name@example.com" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-1.5">Full Address</label>
                  <textarea rows={2} placeholder="House no, Village, District..." className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark resize-none"></textarea>
                </div>
              </div>

              <div className="p-6 border-t border-brand-bg bg-brand-bg/10 flex justify-end gap-3">
                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2.5 border border-brand-bg rounded-xl text-brand-dark font-semibold hover:bg-brand-bg/50 transition">Cancel</button>
                <button className="px-6 py-2.5 bg-brand-primary text-brand-dark font-semibold rounded-xl hover:bg-[#8CD85F] transition shadow-sm">Create Customer Account</button>
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