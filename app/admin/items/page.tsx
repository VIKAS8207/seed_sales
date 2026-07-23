"use client";
import { useState } from "react";
import { 
  Search, Plus, Filter, Image as ImageIcon, UploadCloud, 
  X, ChevronLeft, ChevronRight, MoreVertical 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data for the Seed Inventory
const MOCK_INVENTORY = [
  { id: "MB-W101", name: "Wheat - Lok 1", type: "Certified Seed", qty: "15,000 kg", moisture: "10.2%", inStock: "01 May 2026", expiry: "01 May 2027", rate: "₹45/kg", sold: 65, img: "🌾" },
  { id: "MB-S335", name: "Soybean - JS 335", type: "Foundation Seed", qty: "8,500 kg", moisture: "9.5%", inStock: "15 Jun 2026", expiry: "15 Jun 2027", rate: "₹82/kg", sold: 30, img: "🌱" },
  { id: "MB-C004", name: "Cotton - Bt Hybrid", type: "Research Seed", qty: "2,000 kg", moisture: "8.0%", inStock: "10 Jul 2026", expiry: "10 Jan 2028", rate: "₹1,200/kg", sold: 85, img: "🌿" },
  { id: "MB-P992", name: "Paddy - IR 64", type: "Certified Seed", qty: "25,000 kg", moisture: "12.0%", inStock: "20 May 2026", expiry: "20 Nov 2027", rate: "₹38/kg", sold: 45, img: "🌾" },
  { id: "MB-M110", name: "Maize - Ganga 5", type: "Breeder Seed", qty: "5,200 kg", moisture: "11.5%", inStock: "05 Jun 2026", expiry: "05 Dec 2027", rate: "₹65/kg", sold: 15, img: "🌽" },
];

export default function ItemsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 pt-10 w-full max-w-[1400px] mx-auto">
      
      {/* Page Header & Actions */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Inventory Items</h1>
          <p className="text-brand-gray text-sm">Manage seed stock, pricing, and quality metrics.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2.5 bg-brand-primary text-brand-dark font-semibold rounded-xl flex items-center gap-2 hover:bg-[#8CD85F] transition shadow-sm"
        >
          <Plus className="w-5 h-5" /> Add New Item
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm flex flex-col">
        
        {/* Filters & Search Toolbar */}
        <div className="p-5 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20 rounded-t-2xl">
          <div className="flex gap-4 items-center w-full max-w-2xl">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
              <input 
                type="text" 
                placeholder="Search seed name, SKU..." 
                className="w-full pl-9 pr-4 py-2 bg-brand-white border border-brand-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm text-brand-dark"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray font-medium hover:bg-brand-bg/50 transition">
              <Filter className="w-4 h-4" /> Type: All
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray font-medium hover:bg-brand-bg/50 transition">
              Status: In Stock
            </button>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-brand-dark font-semibold bg-brand-bg/30">
              <tr>
                <th className="p-4 pl-6 w-8"><input type="checkbox" className="rounded text-brand-primary focus:ring-brand-primary border-brand-gray/30" /></th>
                <th className="p-4">Seed Item & SKU</th>
                <th className="p-4">Stock & Specs</th>
                <th className="p-4">Timelines</th>
                <th className="p-4 w-48">Rate & Sales Progress</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-brand-gray">
              {MOCK_INVENTORY.map((item, i) => (
                <tr key={i} className="hover:bg-brand-bg/10 transition border-b border-brand-bg/50 last:border-0">
                  <td className="p-4 pl-6">
                    <input type="checkbox" className="rounded text-brand-primary focus:ring-brand-primary border-brand-gray/30" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-brand-bg/50 border border-brand-bg flex items-center justify-center text-xl">
                        {item.img}
                      </div>
                      <div>
                        <div className="font-semibold text-brand-dark">{item.name}</div>
                        <div className="text-xs text-brand-gray mt-0.5">{item.id} • {item.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-brand-dark">{item.qty}</div>
                    <div className="text-xs text-brand-gray mt-0.5">Moisture: {item.moisture}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-brand-dark">In: {item.inStock}</div>
                    <div className="text-xs text-brand-gray mt-0.5">Exp: {item.expiry}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex justify-between items-end mb-1">
                      <span className="font-bold text-brand-dark">{item.rate}</span>
                      <span className="text-xs font-medium text-brand-gray">{item.sold}% Sold</span>
                    </div>
                    <div className="w-full h-1.5 bg-brand-bg rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} animate={{ width: `${item.sold}%` }} 
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="h-full bg-brand-primary rounded-full"
                      />
                    </div>
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
          <span className="text-sm text-brand-gray font-medium pl-2">Showing 1 to 5 of 24 items</span>
          <div className="flex gap-1">
            <button className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50"><ChevronLeft className="w-4 h-4" /></button>
            <button className="w-8 h-8 flex items-center justify-center border border-brand-primary bg-brand-primary/10 rounded-md text-brand-dark font-semibold">1</button>
            <button className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50 font-medium">2</button>
            <button className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50 font-medium">3</button>
            <button className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Add New Item Modal (Glassmorphism + Framer Motion) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm"
            />
            
            {/* Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} 
              animate={{ opacity: 1, scale: 1, y: 0 }} 
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-brand-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20">
                <h2 className="text-xl font-bold text-brand-dark">Add New Seed Stock</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-brand-white border border-brand-bg rounded-full text-brand-gray hover:text-brand-dark hover:bg-brand-bg/50 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <div className="grid grid-cols-2 gap-6">
                  
                  {/* Left Column: Image Upload & Basics */}
                  <div className="space-y-5">
                    {/* Image Upload Zone */}
                    <div className="w-full h-40 border-2 border-dashed border-brand-primary/40 bg-brand-primary/5 rounded-xl flex flex-col items-center justify-center text-brand-gray hover:bg-brand-primary/10 transition cursor-pointer">
                      <UploadCloud className="w-8 h-8 text-brand-primary mb-2" />
                      <span className="text-sm font-medium text-brand-dark">Click to upload seed image</span>
                      <span className="text-xs mt-1">SVG, PNG, JPG or GIF (max. 2MB)</span>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-brand-dark mb-1.5">Seed Name & Variety</label>
                      <input type="text" placeholder="e.g. Wheat - Lok 1" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-brand-dark mb-1.5">SKU / ID</label>
                        <input type="text" placeholder="MB-W101" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-dark mb-1.5">Seed Type</label>
                        <select className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark">
                          <option>Breeder Seed</option>
                          <option>Foundation Seed</option>
                          <option>Certified Seed</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Specs & Pricing */}
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-brand-dark mb-1.5">Stock Qty (kg)</label>
                        <input type="number" placeholder="5000" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-dark mb-1.5">Moisture %</label>
                        <input type="text" placeholder="10.2%" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-brand-dark mb-1.5">In-Stock Date</label>
                        <input type="date" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark text-sm" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-dark mb-1.5">Expiry Date</label>
                        <input type="date" className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark text-sm" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-brand-dark mb-1.5">Selling Rate (per kg)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray font-semibold">₹</span>
                        <input type="number" placeholder="45" className="w-full pl-8 pr-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-brand-dark mb-1.5">Research / Extra Notes</label>
                      <textarea rows={2} placeholder="Add any specific storage instructions..." className="w-full px-4 py-2.5 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark resize-none"></textarea>
                    </div>
                  </div>

                </div>
              </div>

              <div className="p-6 border-t border-brand-bg bg-brand-bg/10 flex justify-end gap-3">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 border border-brand-bg rounded-xl text-brand-dark font-semibold hover:bg-brand-bg/50 transition"
                >
                  Cancel
                </button>
                <button 
                  className="px-6 py-2.5 bg-brand-primary text-brand-dark font-semibold rounded-xl hover:bg-[#8CD85F] transition shadow-sm"
                >
                  Save to Inventory
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}