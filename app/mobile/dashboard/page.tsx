"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  Sprout, LogOut, FileText, CheckCircle, AlertCircle, Clock, 
  Search, Filter, Eye, X, Download, Receipt, ChevronLeft, ChevronRight,
  CreditCard, PieChart, Landmark, ShieldCheck, UploadCloud, CheckCircle2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK DATA ---
const INITIAL_PENDING = [
  { id: "INV-26-0801", date: "12 Aug 2026", seed: "Wheat - Lok 1 (Certified)", hsn: "100199", qty: 2000, rate: 42.85, amount: 90000, status: "Unpaid", dueDate: "25 Aug 2026" },
  { id: "INV-26-0845", date: "14 Aug 2026", seed: "Maize - Ganga 5", hsn: "100590", qty: 1500, rate: 61.90, amount: 97500, status: "Unpaid", dueDate: "28 Aug 2026" },
];

const INITIAL_HISTORY = [
  { id: "INV-26-0742", date: "05 Aug 2026", seed: "Soybean - JS 335", qty: 1200, amount: 98400, status: "Pending Treasury", payMode: "DDA Scheme" },
  { id: "INV-26-0610", date: "22 Jul 2026", seed: "Paddy - IR 64", qty: 500, amount: 19000, status: "Paid", payMode: "NEFT" },
  { id: "INV-26-0501", date: "10 Jun 2026", seed: "Wheat - Lok 1", qty: 1000, amount: 45000, status: "Failed", payMode: "UPI" },
];

export default function UserInvoicePage() {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [unreadCount, setUnreadCount] = useState(INITIAL_PENDING.length);
  
  // Data States
  const [pendingInvoices, setPendingInvoices] = useState(INITIAL_PENDING);
  const [historyInvoices, setHistoryInvoices] = useState(INITIAL_HISTORY);
  
  // Table States
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Panel & Payment States
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [payStep, setPayStep] = useState<'view' | 'menu' | 'full' | 'partial' | 'treasury'>('view');
  const [userAmount, setUserAmount] = useState<number | string>(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Dynamic calculations for payment
  const activeAmount = selectedInvoice ? selectedInvoice.amount : 0;
  const parsedUserAmount = typeof userAmount === 'string' ? parseFloat(userAmount) || 0 : userAmount;
  const treasuryAmount = Math.max(0, activeAmount - parsedUserAmount);

  // Handlers
  const handleTabChange = (tab: 'pending' | 'history') => {
    setActiveTab(tab);
    setCurrentPage(1);
    if (tab === 'pending') setUnreadCount(0); // Clear badge on view
  };

  const handleUserAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') { setUserAmount(''); return; }
    const num = parseFloat(val);
    if (num >= 0 && num <= activeAmount) setUserAmount(num);
  };

  const openInvoicePanel = (inv: any) => {
    setSelectedInvoice(inv);
    setPayStep('view');
  };

  const completePayment = (mode: string) => {
    // 1. Remove from pending
    const updatedPending = pendingInvoices.filter(inv => inv.id !== selectedInvoice.id);
    setPendingInvoices(updatedPending);
    
    // 2. Add to history
    const completedInvoice = { 
      ...selectedInvoice, 
      status: mode === 'Treasury Claim' ? 'Pending Treasury' : 'Paid', 
      payMode: mode 
    };
    setHistoryInvoices([completedInvoice, ...historyInvoices]);

    // 3. Trigger UI success
    setSelectedInvoice(null);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  // Pagination Logic
  const activeData = activeTab === 'pending' ? pendingInvoices : historyInvoices;
  const totalPages = Math.ceil(activeData.length / itemsPerPage);
  const paginatedData = activeData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="bg-brand-dark px-8 py-5 shadow-md flex justify-between items-center text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-brand-primary/20 rounded-lg">
            <Sprout className="w-8 h-8 text-brand-primary" />
          </div>
          <span className="text-2xl font-bold tracking-wide">Seed Sales</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-white/60">Welcome back,</p>
            <p className="text-sm font-semibold">Ramesh Kumar</p>
          </div>
          <div className="h-8 w-px bg-white/20"></div>
          <Link href="/login" className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-xl hover:bg-white/20 transition text-red-300 hover:text-red-200 text-sm font-medium">
            <LogOut className="w-4 h-4" /> Logout
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="p-8 w-full max-w-[1400px] mx-auto flex-1">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Billing & Invoices</h1>
          <p className="text-brand-gray text-sm">Manage your pending invoices and view payment history.</p>
        </div>

        {/* 4-Column Stat Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard title="TOTAL BILLED" value="₹2.07L" subtitle="Current FY" icon={<Receipt className="w-5 h-5 text-brand-dark" />} iconBg="bg-brand-primary/20" />
          <StatCard title="OUTSTANDING DUE" value="₹1.87L" subtitle={`${pendingInvoices.length} Unpaid Invoices`} icon={<AlertCircle className="w-5 h-5 text-red-600" />} iconBg="bg-red-50" />
          <StatCard title="IN TREASURY APPROVAL" value="₹98,400" subtitle="Awaiting DDA Verification" icon={<Clock className="w-5 h-5 text-yellow-600" />} iconBg="bg-yellow-50" />
          <StatCard title="PAID INVOICES" value="12" subtitle="Fully cleared" icon={<CheckCircle className="w-5 h-5 text-emerald-600" />} iconBg="bg-emerald-50" />
        </div>

        {/* --- TABS --- */}
        <div className="flex gap-4 mb-6 border-b border-brand-bg pb-px">
          <button 
            onClick={() => handleTabChange('pending')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'pending' ? 'border-brand-primary text-brand-dark' : 'border-transparent text-brand-gray hover:text-brand-dark'}`}
          >
            Pending Invoices
            {unreadCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-[10px]">{unreadCount} New</span>
            )}
          </button>
          <button 
            onClick={() => handleTabChange('history')}
            className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'history' ? 'border-brand-primary text-brand-dark' : 'border-transparent text-brand-gray hover:text-brand-dark'}`}
          >
            Payment History
          </button>
        </div>

        {/* Table Section */}
        <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm flex flex-col">
          
          {/* Toolbar */}
          <div className="p-5 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20 rounded-t-2xl">
            <div className="flex gap-4 items-center w-full max-w-3xl">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
                <input type="text" placeholder="Search Invoice ID..." className="w-full pl-9 pr-4 py-2 bg-brand-white border border-brand-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm text-brand-dark" />
              </div>
              
              {/* Payment Status Dropdown */}
              <div className="relative">
                <select className="appearance-none pl-10 pr-8 py-2 bg-brand-white border border-brand-bg rounded-lg text-sm text-brand-dark font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/50 cursor-pointer">
                  <option value="all">Status: All</option>
                  {activeTab === 'pending' ? (
                    <option value="unpaid">Unpaid</option>
                  ) : (
                    <>
                      <option value="paid">Paid</option>
                      <option value="treasury">Pending Treasury</option>
                      <option value="failed">Failed</option>
                    </>
                  )}
                </select>
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray" />
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="w-full overflow-x-auto min-h-[300px]">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-brand-dark font-semibold bg-brand-bg/30">
                <tr>
                  <th className="p-4 pl-6">Invoice ID & Date</th>
                  <th className="p-4">Seed Variety</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 pr-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-brand-gray">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-brand-gray">No records found.</td>
                  </tr>
                ) : (
                  paginatedData.map((inv, i) => (
                    <tr key={i} className="hover:bg-brand-bg/10 transition border-b border-brand-bg/50 last:border-0">
                      <td className="p-4 pl-6">
                        <div className="font-semibold text-brand-dark">{inv.id}</div>
                        <div className="text-xs text-brand-gray mt-0.5">{inv.date}</div>
                      </td>
                      <td className="p-4 font-medium text-brand-dark">{inv.seed}</td>
                      <td className="p-4">{inv.qty} kg</td>
                      <td className="p-4 font-bold text-brand-dark">₹{inv.amount.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold 
                          ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                            inv.status === 'Failed' ? 'bg-red-100 text-red-700' :
                            inv.status === 'Pending Treasury' ? 'bg-yellow-100 text-yellow-700' : 
                            'bg-orange-100 text-orange-700'}`}>
                          {inv.status}
                        </span>
                        {inv.payMode && <div className="text-[10px] mt-1 font-medium text-brand-gray ml-1">via {inv.payMode}</div>}
                      </td>
                      <td className="p-4 pr-6 text-right">
                        <button 
                          onClick={() => openInvoicePanel(inv)}
                          className="px-4 py-1.5 bg-brand-bg/50 text-brand-dark hover:bg-brand-primary hover:text-brand-dark font-medium rounded-lg transition flex items-center gap-2 ml-auto"
                        >
                          <Eye className="w-4 h-4" /> {activeTab === 'pending' ? 'View & Pay' : 'View Receipt'}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="p-4 border-t border-brand-bg flex justify-between items-center bg-white rounded-b-2xl">
            <span className="text-sm text-brand-gray font-medium">
              Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, activeData.length)} of {activeData.length} entries
            </span>
            <div className="flex gap-1">
              <button 
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50 disabled:opacity-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center border border-brand-primary bg-brand-primary/10 rounded-md text-brand-dark font-semibold">
                {currentPage}
              </button>
              <button 
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(p => p + 1)}
                className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50 disabled:opacity-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* --- RIGHT SLIDE-OUT PANEL (Wider & Detailed) --- */}
      <AnimatePresence>
        {selectedInvoice && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setSelectedInvoice(null)} 
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" 
            />
            
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-brand-white h-full shadow-2xl flex flex-col border-l border-brand-bg overflow-hidden"
            >
              {/* Dynamic Header */}
              <div className="p-6 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20">
                <div className="flex items-center gap-3">
                  {payStep !== 'view' && (
                    <button onClick={() => setPayStep('menu')} className="p-1 hover:bg-brand-bg rounded-full text-brand-gray transition">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  <h2 className="text-xl font-bold text-brand-dark">
                    {payStep === 'view' ? 'Tax Invoice' : payStep === 'menu' ? 'Payment Strategy' : 'Complete Payment'}
                  </h2>
                </div>
                <button onClick={() => setSelectedInvoice(null)} className="p-2 bg-brand-white border border-brand-bg rounded-full text-brand-gray hover:text-brand-dark hover:bg-brand-bg/50">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic Content Area */}
              <div className="p-8 flex-1 overflow-y-auto bg-[#F9FAFB] custom-scrollbar">
                
                {/* 1. VIEW DETAILED INVOICE */}
                {payStep === 'view' && (
                  <div className="bg-white p-8 rounded-xl border border-brand-bg shadow-sm">
                    {/* Invoice Header */}
                    <div className="flex justify-between items-start border-b border-brand-bg border-dashed pb-6 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Sprout className="w-6 h-6 text-brand-primary" />
                          <div className="text-2xl font-bold text-brand-dark tracking-wide">Maha Beej</div>
                        </div>
                        <div className="text-xs text-brand-gray leading-relaxed">
                          State Seed Corporation Ltd.<br />
                          Krishi Bhavan, VIP Road, Raipur, CG - 492001<br />
                          GSTIN: 22AAAAA0000A1Z5
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-brand-dark mb-1">{selectedInvoice.id}</div>
                        <div className="text-sm font-medium text-brand-gray">Date: {selectedInvoice.date}</div>
                        <div className="text-sm font-medium text-brand-gray">Due: {selectedInvoice.dueDate || 'N/A'}</div>
                      </div>
                    </div>

                    {/* Billed To */}
                    <div className="mb-8 p-4 bg-brand-bg/20 rounded-xl border border-brand-bg">
                      <div className="text-xs font-bold text-brand-gray uppercase tracking-wider mb-2">Billed To</div>
                      <div className="font-bold text-brand-dark text-lg">Ramesh Kumar</div>
                      <div className="text-sm text-brand-gray mt-1 leading-relaxed">
                        Kisan Agro Cooperative<br />
                        Village Arang, Raipur District, CG<br />
                        Registration ID: CG-KAC-2024
                      </div>
                    </div>

                    {/* Itemized Table */}
                    <table className="w-full text-sm text-left mb-6">
                      <thead className="border-b border-brand-bg text-brand-gray">
                        <tr>
                          <th className="pb-3 font-semibold">Description</th>
                          <th className="pb-3 font-semibold">HSN</th>
                          <th className="pb-3 font-semibold text-right">Qty</th>
                          <th className="pb-3 font-semibold text-right">Rate</th>
                          <th className="pb-3 font-semibold text-right">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="text-brand-dark">
                        <tr className="border-b border-brand-bg/50">
                          <td className="py-4 font-medium">{selectedInvoice.seed}</td>
                          <td className="py-4 text-brand-gray">{selectedInvoice.hsn || '100199'}</td>
                          <td className="py-4 text-right">{selectedInvoice.qty} kg</td>
                          <td className="py-4 text-right">₹{(selectedInvoice.amount * 0.95 / selectedInvoice.qty).toFixed(2)}</td>
                          <td className="py-4 text-right font-medium">₹{(selectedInvoice.amount * 0.95).toLocaleString('en-IN')}</td>
                        </tr>
                      </tbody>
                    </table>

                    {/* Totals */}
                    <div className="flex justify-end mb-8">
                      <div className="w-1/2 space-y-3">
                        <div className="flex justify-between text-sm text-brand-gray">
                          <span>Subtotal</span>
                          <span className="font-medium text-brand-dark">₹{(selectedInvoice.amount * 0.95).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm text-brand-gray">
                          <span>CGST (2.5%)</span>
                          <span className="font-medium text-brand-dark">₹{(selectedInvoice.amount * 0.025).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between text-sm text-brand-gray border-b border-brand-bg border-dashed pb-3">
                          <span>SGST (2.5%)</span>
                          <span className="font-medium text-brand-dark">₹{(selectedInvoice.amount * 0.025).toLocaleString('en-IN')}</span>
                        </div>
                        <div className="flex justify-between items-center pt-1">
                          <span className="font-bold text-brand-dark text-lg">Grand Total</span>
                          <span className="text-2xl font-bold text-brand-primary text-green-600">₹{selectedInvoice.amount.toLocaleString('en-IN')}</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Terms */}
                    <div className="text-[10px] text-brand-gray/60 leading-relaxed text-center border-t border-brand-bg pt-4">
                      This is a computer-generated invoice. Goods once sold cannot be taken back unless approved under DDA scheme guidelines. 
                      Late payments subject to 1.5% monthly interest.
                    </div>
                  </div>
                )}

                {/* 2. PAYMENT MENU */}
                {payStep === 'menu' && (
                  <div className="space-y-4 max-w-md mx-auto mt-4">
                    <h3 className="font-semibold text-brand-dark mb-4 text-center text-lg">Invoice {selectedInvoice.id}</h3>
                    
                    <button onClick={() => { setPayStep('full'); setUserAmount(activeAmount); }} className="w-full p-5 rounded-xl border border-brand-bg bg-white text-left flex items-center gap-4 hover:border-brand-primary hover:shadow-md transition group">
                      <div className="p-3 bg-brand-bg group-hover:bg-brand-primary/20 rounded-xl transition"><CreditCard className="w-6 h-6 text-brand-dark group-hover:text-brand-primary transition" /></div>
                      <div>
                        <div className="font-bold text-brand-dark text-lg">Pay Fully</div>
                        <div className="text-sm text-brand-gray">Clear ₹{activeAmount.toLocaleString('en-IN')} online</div>
                      </div>
                    </button>

                    <button onClick={() => { setPayStep('partial'); setUserAmount(''); }} className="w-full p-5 rounded-xl border border-brand-bg bg-white text-left flex items-center gap-4 hover:border-brand-primary hover:shadow-md transition group">
                      <div className="p-3 bg-brand-bg group-hover:bg-brand-primary/20 rounded-xl transition"><PieChart className="w-6 h-6 text-brand-dark group-hover:text-brand-primary transition" /></div>
                      <div>
                        <div className="font-bold text-brand-dark text-lg">Pay Partially</div>
                        <div className="text-sm text-brand-gray">Enter custom amount manually</div>
                      </div>
                    </button>

                    <button onClick={() => { setPayStep('treasury'); setUserAmount(0); }} className="w-full p-5 rounded-xl border border-brand-bg bg-white text-left flex items-center gap-4 hover:border-brand-primary hover:shadow-md transition group">
                      <div className="p-3 bg-brand-bg group-hover:bg-brand-primary/20 rounded-xl transition"><Landmark className="w-6 h-6 text-brand-dark group-hover:text-brand-primary transition" /></div>
                      <div>
                        <div className="font-bold text-brand-dark text-lg">Treasury / Scheme</div>
                        <div className="text-sm text-brand-gray">Claim DDA subsidies/offsets</div>
                      </div>
                    </button>
                  </div>
                )}

                {/* 3A. PAY FULL */}
                {payStep === 'full' && (
                  <div className="text-center mt-12 max-w-sm mx-auto">
                    <ShieldCheck className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                    <h3 className="text-4xl font-bold text-brand-dark mb-3">₹{activeAmount.toLocaleString('en-IN')}</h3>
                    <p className="text-sm text-brand-gray">You will be redirected to the secure payment gateway to complete this transaction via NetBanking or UPI.</p>
                  </div>
                )}

                {/* 3B. PAY PARTIAL */}
                {payStep === 'partial' && (
                  <div className="max-w-md mx-auto mt-8">
                    <label className="block text-sm font-semibold text-brand-dark mb-3 text-center">Enter Custom Amount (₹)</label>
                    <div className="relative mb-8">
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-gray font-bold text-2xl">₹</span>
                      <input 
                        type="number" 
                        value={userAmount}
                        onChange={handleUserAmountChange}
                        className="w-full pl-12 pr-4 py-5 bg-white border border-brand-bg rounded-2xl text-center focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark font-bold text-4xl shadow-inner" 
                      />
                    </div>
                    <div className="bg-red-50 p-5 rounded-xl flex justify-between items-center border border-red-100">
                      <span className="text-sm font-bold text-red-800">Remaining Balance:</span>
                      <span className="font-bold text-red-600 text-xl">₹{(activeAmount - parsedUserAmount).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}

                {/* 3C. PAY TREASURY */}
                {payStep === 'treasury' && (
                  <div className="space-y-6 max-w-md mx-auto mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-brand-dark mb-1.5">Your Pay (₹)</label>
                        <input 
                          type="number" 
                          value={userAmount}
                          onChange={handleUserAmountChange}
                          className="w-full px-4 py-3 bg-white border border-brand-bg rounded-xl outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark font-bold shadow-sm" 
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-brand-primary mb-1.5">Treasury Claim (₹)</label>
                        <input 
                          type="text" 
                          readOnly
                          value={treasuryAmount.toLocaleString('en-IN')}
                          className="w-full px-4 py-3 bg-brand-primary/10 border border-brand-primary/30 rounded-xl text-brand-dark font-bold" 
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-dark mb-1.5">Select DDA Scheme</label>
                      <select className="w-full px-4 py-3 bg-white border border-brand-bg rounded-xl text-brand-dark outline-none focus:ring-2 focus:ring-brand-primary/50 shadow-sm">
                        <option>Krishi Vikas Yojana (KVY)</option>
                        <option>DDA Relief Fund (Raipur)</option>
                      </select>
                    </div>
                    <div>
  <label className="block text-sm font-semibold text-brand-dark mb-1.5">Upload Authorization</label>
  {/* Converted div to label and added the hidden file input */}
  <label className="w-full h-32 border-2 border-dashed border-brand-primary/40 bg-brand-primary/5 rounded-xl flex flex-col items-center justify-center text-brand-gray hover:bg-brand-primary/10 transition cursor-pointer">
    <input type="file" accept=".pdf" className="hidden" />
    <UploadCloud className="w-8 h-8 text-brand-primary mb-2" />
    <span className="text-sm font-medium text-brand-dark">Upload Treasury PDF</span>
  </label>
</div>
                  </div>
                )}

              </div>

              {/* Dynamic Footer Actions */}
              <div className="p-6 border-t border-brand-bg bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
                {payStep === 'view' ? (
                  <div className="flex flex-col gap-3">
                    {selectedInvoice.status === "Unpaid" ? (
                      <button onClick={() => setPayStep('menu')} className="w-full py-3.5 bg-brand-primary text-brand-dark font-bold rounded-xl hover:bg-[#8CD85F] transition shadow-md">
                        Proceed to Payment
                      </button>
                    ) : (
                      <button className="w-full py-3.5 bg-brand-bg text-brand-gray font-bold rounded-xl cursor-not-allowed">
                        {selectedInvoice.status}
                      </button>
                    )}
                    <button className="w-full py-2 text-brand-dark font-medium rounded-xl hover:bg-brand-bg/50 transition flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" /> Download Original PDF
                    </button>
                  </div>
                ) : payStep !== 'menu' ? (
                  <button 
                    onClick={() => completePayment(payStep === 'treasury' ? 'Treasury Claim' : 'Online Payment')} 
                    className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-black transition shadow-lg"
                  >
                    {payStep === 'treasury' ? 'Submit Treasury Claim' : 'Complete Secure Payment'}
                  </button>
                ) : null}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- SUCCESS MODAL --- */}
      <AnimatePresence>
        {showSuccess && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-10 flex flex-col items-center justify-center max-w-sm w-full relative z-10 shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-brand-dark mb-2 text-center">Payment Successful!</h2>
              <p className="text-center text-brand-gray mb-8">Your invoice status has been updated and moved to the history tab.</p>
              <button onClick={() => setShowSuccess(false)} className="w-full py-3 bg-brand-bg text-brand-dark font-bold rounded-xl hover:bg-brand-bg/80 transition">
                Close
              </button>
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