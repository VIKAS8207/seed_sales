"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { 
  FileText, CheckCircle, AlertCircle, Clock, 
  Search, Filter, Eye, X, Download, Receipt, Plus,
  ChevronDown, ChevronLeft, ChevronRight, Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Expanded Mock Data
const MOCK_INVOICES = [
  { id: "INV-26-0801", date: "12 Aug 2026", society: "Kisan Agro", user: "Ramesh Patel", seed: "Wheat Seed - Lok 1 (Certified)", moisture: "10%", qty: "2,000", amount: 90000, status: "Unpaid", dueDate: "25 Aug 2026", notes: "Standard dispatch." },
  { id: "INV-26-0742", date: "05 Aug 2026", society: "Vidarbha DDA", user: "Suresh Rao", seed: "Soybean Seed - JS 335", moisture: "12%", qty: "1,200", amount: 98400, status: "Pending Treasury", dueDate: "15 Aug 2026", notes: "" },
  { id: "INV-26-0610", date: "22 Jul 2026", society: "Bastar Tribal", user: "Amit Singh", seed: "Paddy Seed - IR 64", moisture: "11%", qty: "500", amount: 19000, status: "Paid", dueDate: "05 Aug 2026", notes: "" },
  { id: "INV-26-0605", date: "18 Jul 2026", society: "Green Earth Traders", user: "Vikram Das", seed: "Maize Seed - Ganga 5 (Breeder)", moisture: "9%", qty: "3,500", amount: 210000, status: "Paid", dueDate: "01 Aug 2026", notes: "" },
  { id: "INV-26-0590", date: "10 Jul 2026", society: "Kisan Agro", user: "Ramesh Patel", seed: "Mustard Seed - Pusa Bold", moisture: "8%", qty: "800", amount: 48000, status: "Unpaid", dueDate: "24 Jul 2026", notes: "Urgent delivery requested." },
  { id: "INV-26-0540", date: "02 Jul 2026", society: "Vidarbha DDA", user: "Suresh Rao", seed: "Cotton Seed - Bt Hybrid", moisture: "10%", qty: "250", amount: 125000, status: "Paid", dueDate: "16 Jul 2026", notes: "" },
  { id: "INV-26-0480", date: "25 Jun 2026", society: "Bastar Tribal", user: "Amit Singh", seed: "Gram Seed - Kranti", moisture: "11%", qty: "1,000", amount: 65000, status: "Pending Treasury", dueDate: "10 Jul 2026", notes: "" },
  { id: "INV-26-0412", date: "15 Jun 2026", society: "Green Earth Traders", user: "Vikram Das", seed: "Paddy Seed - Swarna", moisture: "12%", qty: "4,000", amount: 152000, status: "Paid", dueDate: "30 Jun 2026", notes: "" },
];

export default function UserInvoicePage() {
  const [invoices, setInvoices] = useState(MOCK_INVOICES);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSociety, setFilterSociety] = useState("All");
  const [filterUser, setFilterUser] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Pagination States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Form State for multiple seed items
  const [invoiceItems, setInvoiceItems] = useState([{ seed: "", qty: "", amount: "", moisture: "" }]);

  // Filter Logic
  const filteredInvoices = useMemo(() => {
    return invoices.filter(inv => {
      const matchesSearch = inv.id.toLowerCase().includes(searchQuery.toLowerCase()) || inv.seed.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSociety = filterSociety === "All" || inv.society === filterSociety;
      const matchesUser = filterUser === "All" || inv.user === filterUser;
      const matchesStatus = filterStatus === "All" || inv.status === filterStatus;
      return matchesSearch && matchesSociety && matchesUser && matchesStatus;
    });
  }, [invoices, searchQuery, filterSociety, filterUser, filterStatus]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredInvoices.length / itemsPerPage);
  const paginatedInvoices = filteredInvoices.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Extract unique lists for filter dropdowns
  const uniqueSocieties = ["All", ...Array.from(new Set(invoices.map(inv => inv.society)))];
  const uniqueUsers = ["All", ...Array.from(new Set(invoices.map(inv => inv.user)))];
  const uniqueStatuses = ["All", "Paid", "Unpaid", "Pending Treasury"];

  // Reset pagination when filters change
  useMemo(() => { setCurrentPage(1); }, [searchQuery, filterSociety, filterUser, filterStatus]);

  const handleCreateInvoice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const seedNames = invoiceItems.map(item => item.seed).join(" + ");
    const totalQty = invoiceItems.map(item => item.qty).join(" + ");
    const moistures = invoiceItems.map(item => item.moisture + "%").join(", ");
    const totalAmount = invoiceItems.reduce((sum, item) => sum + Number(item.amount || 0), 0);

    const newInvoice = {
      id: `INV-26-0${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      society: formData.get("society") as string,
      user: formData.get("userName") as string,
      seed: seedNames,
      moisture: moistures,
      qty: totalQty,
      amount: totalAmount,
      status: "Unpaid",
      dueDate: formData.get("dueDate") as string,
      notes: formData.get("notes") as string,
    };

    setInvoices([newInvoice, ...invoices]);
    setIsAddModalOpen(false);
    setInvoiceItems([{ seed: "", qty: "", amount: "", moisture: "" }]);
  };

  return (
    <div className="p-8 pt-10 w-full max-w-[1400px] mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">My Invoices</h1>
          <p className="text-brand-gray text-sm">View your billing history and manage payments.</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-5 py-2.5 bg-brand-primary text-brand-dark font-semibold rounded-lg flex items-center gap-2 hover:bg-[#8CD85F] transition shadow-sm"
        >
          <Plus className="w-5 h-5" /> Create Invoice
        </button>
      </div>

      {/* 4-Column Stat Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="TOTAL BILLED" value="₹2.07L" subtitle="Current FY" icon={<Receipt className="w-5 h-5 text-brand-dark" />} iconBg="bg-brand-primary/20" />
        <StatCard title="OUTSTANDING DUE" value="₹1.38L" subtitle="2 Unpaid Invoices" icon={<AlertCircle className="w-5 h-5 text-red-600" />} iconBg="bg-red-50" />
        <StatCard title="IN TREASURY APPROVAL" value="₹1.63L" subtitle="Awaiting DDA Verification" icon={<Clock className="w-5 h-5 text-yellow-600" />} iconBg="bg-yellow-50" />
        <StatCard title="PAID INVOICES" value="4" subtitle="Fully cleared" icon={<CheckCircle className="w-5 h-5 text-emerald-600" />} iconBg="bg-emerald-50" />
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col overflow-hidden">
        
        {/* Filters Bar */}
        <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 flex-wrap gap-4">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search Invoice ID or Seed Variety..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-sm text-gray-800" 
            />
          </div>
          
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-4 h-4 text-gray-400 mr-1" />
            
            {/* Custom Styled Selects */}
            <div className="relative">
              <select 
                value={filterSociety} 
                onChange={(e) => setFilterSociety(e.target.value)} 
                className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary cursor-pointer"
              >
                {uniqueSocieties.map(soc => <option key={soc} value={soc}>{soc === "All" ? "All Societies" : soc}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            
            <div className="relative">
              <select 
                value={filterUser} 
                onChange={(e) => setFilterUser(e.target.value)} 
                className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary cursor-pointer"
              >
                {uniqueUsers.map(usr => <option key={usr} value={usr}>{usr === "All" ? "All Users" : usr}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            <div className="relative">
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)} 
                className="appearance-none pl-4 pr-10 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-700 font-medium focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary cursor-pointer"
              >
                {uniqueStatuses.map(status => <option key={status} value={status}>{status === "All" ? "All Statuses" : status}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="w-full overflow-x-auto min-h-[350px]">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-gray-600 font-semibold bg-gray-50/50 border-b border-gray-200">
              <tr>
                <th className="p-4 pl-6">Invoice ID & Date</th>
                <th className="p-4">Billed To</th>
                <th className="p-4">Seed Variety & Details</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {paginatedInvoices.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500 font-medium">No invoices match your filters.</td>
                </tr>
              ) : (
                paginatedInvoices.map((inv, i) => (
                  <tr key={inv.id} className="hover:bg-gray-50 transition border-b border-gray-100 last:border-0">
                    <td className="p-4 pl-6">
                      <div className="font-semibold text-gray-900">{inv.id}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{inv.date}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900">{inv.society}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{inv.user}</div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-gray-900 max-w-[220px] truncate">{inv.seed}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{inv.qty} kg • Moisture: {inv.moisture}</div>
                    </td>
                    <td className="p-4 font-bold text-gray-900">₹{inv.amount.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                       <span className={`px-2.5 py-1.5 rounded-md text-xs font-semibold border
                        ${inv.status === 'Paid' ? 'bg-green-50 text-green-700 border-green-200' : 
                          inv.status === 'Pending Treasury' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button 
                        onClick={() => setSelectedInvoice(inv)}
                        className="px-4 py-2 bg-white border border-gray-200 text-gray-700 hover:border-brand-primary hover:text-brand-primary font-medium rounded-lg transition flex items-center gap-2 ml-auto shadow-sm"
                      >
                        <Eye className="w-4 h-4" /> View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-between items-center bg-gray-50">
          <span className="text-sm text-gray-600 font-medium">
            Showing {filteredInvoices.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredInvoices.length)} of {filteredInvoices.length} entries
          </span>
          <div className="flex gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-800 bg-white shadow-sm">
              Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
            </div>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed bg-white shadow-sm transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* --- SLIDE-OUT INVOICE PANEL (From the RIGHT, Wider and Detailed) --- */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setSelectedInvoice(null)} 
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-3xl bg-gray-50 h-full shadow-2xl flex flex-col border-l border-gray-200"
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-white shadow-sm z-10">
                <h2 className="text-xl font-bold text-gray-900">Tax Invoice Details</h2>
                <button onClick={() => setSelectedInvoice(null)} className="p-2 bg-white border border-gray-200 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 flex-1 overflow-y-auto">
                <div className="bg-white p-10 rounded-xl border border-gray-200 shadow-sm">
                  
                  {/* Company & Invoice Header */}
                  <div className="flex justify-between items-start border-b border-gray-200 pb-6 mb-6">
                    <div>
                      <div className="text-3xl font-black text-gray-900 mb-1 tracking-tight">Maha Beej</div>
                      <div className="text-sm font-semibold text-gray-600 mb-1">State Seed Corporation Ltd.</div>
                      <div className="text-xs text-gray-500 leading-relaxed">
                        Krishi Bhavan, VIP Road, Raipur, CG - 492001<br/>
                        GSTIN: 22AAAAA0000A1Z5 | PAN: AAAAA0000A
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Invoice Number</div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">{selectedInvoice.id}</div>
                      <div className="text-sm text-gray-600"><strong>Issue Date:</strong> {selectedInvoice.date}</div>
                      <div className="text-sm text-gray-600"><strong>Due Date:</strong> {selectedInvoice.dueDate || 'N/A'}</div>
                    </div>
                  </div>

                  {/* Billing Details */}
                  <div className="flex justify-between mb-8 bg-gray-50 p-5 rounded-lg border border-gray-200">
                    <div>
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Billed To Society</div>
                      <div className="font-bold text-gray-900 text-lg">{selectedInvoice.society}</div>
                      <div className="text-sm text-gray-600 mt-1">Registration/License On File</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Authorized Buyer</div>
                      <div className="font-bold text-gray-900 text-lg">{selectedInvoice.user}</div>
                      <div className="text-sm text-gray-600 mt-1">Account Contact</div>
                    </div>
                  </div>

                  {/* Itemized Detailed Table */}
                  <div className="mb-6 rounded-lg border border-gray-200 overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-gray-100 text-gray-700">
                        <tr>
                          <th className="p-3 font-semibold border-b border-gray-200">Seed Description</th>
                          <th className="p-3 font-semibold border-b border-gray-200 text-center">Moisture</th>
                          <th className="p-3 font-semibold border-b border-gray-200 text-right">Quantity (kg)</th>
                          <th className="p-3 font-semibold border-b border-gray-200 text-right">Total Amount</th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600">
                        {selectedInvoice.seed.split(" + ").map((s: string, idx: number) => {
                          const qtys = selectedInvoice.qty.split(" + ");
                          const moistures = selectedInvoice.moisture.split(", ");
                          const itemQty = qtys[idx] || qtys[0];
                          const itemMoist = moistures[idx] || moistures[0];
                          return (
                            <tr key={idx} className="border-b border-gray-100 last:border-0">
                              <td className="p-3 font-medium text-gray-900">{s}</td>
                              <td className="p-3 text-center">{itemMoist}</td>
                              <td className="p-3 text-right">{itemQty}</td>
                              <td className="p-3 text-right text-gray-900 font-medium">
                                ₹{idx === 0 ? selectedInvoice.amount.toLocaleString('en-IN') : '0'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Financial Breakdown */}
                  <div className="flex justify-end mb-8">
                    <div className="w-full max-w-sm space-y-3">
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>Subtotal (Excl. Tax)</span>
                        <span className="font-medium text-gray-900">₹{(selectedInvoice.amount * 0.95).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600">
                        <span>CGST (2.5%)</span>
                        <span className="font-medium text-gray-900">₹{(selectedInvoice.amount * 0.025).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm text-gray-600 border-b border-gray-200 border-dashed pb-3">
                        <span>SGST (2.5%)</span>
                        <span className="font-medium text-gray-900">₹{(selectedInvoice.amount * 0.025).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between items-center pt-2">
                        <span className="font-bold text-gray-900 text-lg">Grand Total</span>
                        <span className="text-2xl font-black text-brand-primary">₹{selectedInvoice.amount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Footer Notes */}
                  <div className="text-xs text-gray-500 border-t border-gray-200 pt-4 leading-relaxed">
                    <strong>Remarks:</strong> {selectedInvoice.notes || 'All seeds are quality tested and verified prior to dispatch. Subsidies apply subject to DDA verification.'}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 border-t border-gray-200 bg-white flex justify-between items-center z-10 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                <button className="px-6 py-2.5 text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition flex items-center gap-2 border border-gray-300">
                  <Download className="w-4 h-4" /> Download Official PDF
                </button>
                {selectedInvoice.status === "Unpaid" ? (
                  <Link 
                    href="/user/invoice/pay"
                    className="px-8 py-2.5 bg-brand-dark text-white font-semibold rounded-lg hover:bg-black transition shadow-md flex items-center gap-2"
                  >
                    Proceed to Payment
                  </Link>
                ) : (
                  <span className={`px-6 py-2.5 rounded-lg font-bold text-sm ${selectedInvoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    Status: {selectedInvoice.status}
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ADD NEW INVOICE MODAL (Professional UI) --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200"
            >
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Generate Seed Invoice</h2>
                  <p className="text-sm text-gray-500 mt-1">Create a new billing record for seed dispatch.</p>
                </div>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition shadow-sm">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateInvoice} className="flex flex-col max-h-[80vh]">
                <div className="p-8 overflow-y-auto space-y-8 bg-white">
                  
                  {/* Billing Details */}
                  <div className="space-y-4">
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide border-b border-gray-200 pb-2">Billing Information</h3>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Society Name <span className="text-red-500">*</span></label>
                        <div className="relative">
                          <select name="society" required className="appearance-none w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-gray-900 cursor-pointer">
                            <option value="" disabled selected>Select Society...</option>
                            <option value="Kisan Agro Cooperative">Kisan Agro Cooperative</option>
                            <option value="Vidarbha Farmers DDA">Vidarbha Farmers DDA</option>
                            <option value="Green Earth Traders">Green Earth Traders</option>
                            <option value="Bastar Tribal Guild">Bastar Tribal Guild</option>
                          </select>
                          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Customer Name</label>
                        <input list="users" name="userName" placeholder="Select or type..." className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-gray-900" />
                        <datalist id="users">
                          <option value="Ramesh Patel" />
                          <option value="Suresh Rao" />
                          <option value="Amit Singh" />
                          <option value="Vikram Das" />
                        </datalist>
                      </div>
                    </div>
                  </div>

                  {/* Seed Items Mapping */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-end border-b border-gray-200 pb-2">
                      <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide">Seed Dispatch Details</h3>
                    </div>
                    
                    {invoiceItems.map((item, index) => (
                      <div key={index} className="p-5 border border-gray-200 rounded-lg bg-gray-50/50 space-y-5">
                        
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-semibold text-gray-700">Item {index + 1}</h4>
                          {invoiceItems.length > 1 && (
                            <button 
                              type="button" 
                              onClick={() => {
                                const newItems = [...invoiceItems];
                                newItems.splice(index, 1);
                                setInvoiceItems(newItems);
                              }} 
                              className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition"
                            >
                              <Trash2 className="w-4 h-4" /> Remove
                            </button>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Seed Variety <span className="text-red-500">*</span></label>
                          <div className="relative">
                            <select 
                              required 
                              value={item.seed}
                              onChange={(e) => {
                                const newItems = [...invoiceItems];
                                newItems[index].seed = e.target.value;
                                setInvoiceItems(newItems);
                              }}
                              className="appearance-none w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-gray-900 cursor-pointer"
                            >
                              <option value="" disabled>Select a seed variety...</option>
                              <option value="Wheat Seed - Lok 1 (Certified)">Wheat Seed - Lok 1 (Certified)</option>
                              <option value="Soybean Seed - JS 335 (Foundation)">Soybean Seed - JS 335 (Foundation)</option>
                              <option value="Paddy Seed - IR 64 (Certified)">Paddy Seed - IR 64 (Certified)</option>
                              <option value="Maize Seed - Ganga 5 (Breeder)">Maize Seed - Ganga 5 (Breeder)</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity (kg) <span className="text-red-500">*</span></label>
                            <input 
                              type="number" required placeholder="1000" value={item.qty} min="1"
                              onChange={(e) => { const newItems = [...invoiceItems]; newItems[index].qty = e.target.value; setInvoiceItems(newItems); }}
                              className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-gray-900" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Total Amount <span className="text-red-500">*</span></label>
                            <div className="relative">
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                              <input 
                                type="number" required placeholder="50000" value={item.amount} min="1"
                                onChange={(e) => { const newItems = [...invoiceItems]; newItems[index].amount = e.target.value; setInvoiceItems(newItems); }}
                                className="w-full pl-8 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-gray-900" 
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Seed Moisture</label>
                            <div className="relative">
                              <input 
                                type="number" placeholder="10.5" value={item.moisture} step="0.1" min="0" max="100"
                                onChange={(e) => { const newItems = [...invoiceItems]; newItems[index].moisture = e.target.value; setInvoiceItems(newItems); }}
                                className="w-full pl-4 pr-8 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-gray-900" 
                              />
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    type="button" 
                    onClick={() => setInvoiceItems([...invoiceItems, { seed: "", qty: "", amount: "", moisture: "" }])}
                    className="w-full py-3 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 hover:border-gray-400 transition flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Plus className="w-4 h-4" /> Add Another Seed Variety
                  </button>

                  <div className="space-y-4 pt-4">
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wide border-b border-gray-200 pb-2">Terms & Remarks</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Due Date <span className="text-red-500">*</span></label>
                        <input name="dueDate" type="date" required className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-gray-900" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Remarks</label>
                        <textarea name="notes" rows={1} placeholder="Dispatch notes, transport details..." className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary text-gray-900 resize-none"></textarea>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-end gap-4 rounded-b-xl">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition shadow-sm">
                    Cancel
                  </button>
                  <button type="submit" className="px-8 py-2.5 bg-brand-dark text-white font-semibold rounded-lg hover:bg-black transition shadow-md flex items-center gap-2">
                    <FileText className="w-4 h-4" /> Generate Tax Invoice
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function StatCard({ title, value, subtitle, icon, iconBg }: any) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider leading-tight">{title}</h4>
        <div className={`p-2.5 rounded-lg ${iconBg}`}>{icon}</div>
      </div>
      <div>
        <div className="text-3xl font-black text-gray-900 mb-1">{value}</div>
        <div className="text-sm font-medium text-gray-500">{subtitle}</div>
      </div>
    </div>
  );
}