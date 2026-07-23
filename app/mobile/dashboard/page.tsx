"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  Sprout, LogOut, FileText, CheckCircle, AlertCircle, Clock, 
  Search, Filter, Eye, X, Download, Receipt, Plus,
  CreditCard, PieChart, Landmark, ShieldCheck, UploadCloud, ChevronLeft
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data
const MOCK_INVOICES = [
  { id: "INV-26-0801", date: "12 Aug 2026", seed: "Wheat - Lok 1 (Certified)", qty: "2,000 kg", amount: 45000, status: "Unpaid", dueDate: "25 Aug 2026" },
  { id: "INV-26-0742", date: "05 Aug 2026", seed: "Soybean - JS 335", qty: "1,200 kg", amount: 98400, status: "Pending Treasury", dueDate: "15 Aug 2026" },
  { id: "INV-26-0610", date: "22 Jul 2026", seed: "Paddy - IR 64", qty: "500 kg", amount: 19000, status: "Paid", dueDate: "05 Aug 2026" },
];

export default function StandaloneDesktopDashboard() {
  // Main Data States
  const [invoices, setInvoices] = useState(MOCK_INVOICES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  
  // Payment Flow States (Inside Right Panel)
  const [payStep, setPayStep] = useState<'view' | 'menu' | 'full' | 'partial' | 'treasury'>('view');
  const [userAmount, setUserAmount] = useState<number | string>(0);

  // Dynamic calculations for payment
  const activeAmount = selectedInvoice ? selectedInvoice.amount : 0;
  const parsedUserAmount = typeof userAmount === 'string' ? parseFloat(userAmount) || 0 : userAmount;
  const treasuryAmount = Math.max(0, activeAmount - parsedUserAmount);

  const handleUserAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setUserAmount('');
      return;
    }
    const num = parseFloat(val);
    if (num >= 0 && num <= activeAmount) setUserAmount(num);
  };

  const handleCreateInvoice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newInvoice = {
      id: `INV-26-0${Math.floor(100 + Math.random() * 900)}`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      seed: formData.get("seed") as string,
      qty: formData.get("qty") + " kg",
      amount: Number(formData.get("amount")),
      status: "Unpaid",
      dueDate: formData.get("dueDate") as string,
    };
    setInvoices([newInvoice, ...invoices]);
    setIsAddModalOpen(false);
  };

  const openInvoicePanel = (inv: any) => {
    setSelectedInvoice(inv);
    setPayStep('view');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans">
      
      {/* Standalone Top Header */}
      <header className="bg-brand-dark px-8 py-5 shadow-md flex justify-between items-center text-white shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-brand-primary/20 rounded-lg">
            <Sprout className="w-8 h-8 text-brand-primary" />
          </div>
          <span className="text-2xl font-bold tracking-wide">Maha Beej</span>
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
        
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-brand-dark mb-1">My Dashboard</h1>
            <p className="text-brand-gray text-sm">Manage your invoices, purchases, and complete payments securely.</p>
          </div>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="px-5 py-2.5 bg-brand-primary text-brand-dark font-semibold rounded-xl flex items-center gap-2 hover:bg-[#8CD85F] transition shadow-sm"
          >
            <Plus className="w-5 h-5" /> Create New Invoice
          </button>
        </div>

        {/* 4-Column Stat Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard title="TOTAL BILLED" value="₹2.07L" subtitle="Current FY" icon={<Receipt className="w-5 h-5 text-brand-dark" />} iconBg="bg-brand-primary/20" />
          <StatCard title="OUTSTANDING DUE" value="₹45,000" subtitle="1 Unpaid Invoice" icon={<AlertCircle className="w-5 h-5 text-red-600" />} iconBg="bg-red-50" />
          <StatCard title="IN TREASURY APPROVAL" value="₹98,400" subtitle="Awaiting DDA Verification" icon={<Clock className="w-5 h-5 text-yellow-600" />} iconBg="bg-yellow-50" />
          <StatCard title="PAID INVOICES" value="12" subtitle="Fully cleared" icon={<CheckCircle className="w-5 h-5 text-emerald-600" />} iconBg="bg-emerald-50" />
        </div>

        {/* Table Section */}
        <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm flex flex-col">
          <div className="p-5 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20 rounded-t-2xl">
            <div className="flex gap-4 items-center w-full max-w-2xl">
              <div className="relative w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
                <input type="text" placeholder="Search Invoice ID..." className="w-full pl-9 pr-4 py-2 bg-brand-white border border-brand-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm text-brand-dark" />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray font-medium hover:bg-brand-bg/50">
                <Filter className="w-4 h-4" /> Status: All
              </button>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
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
                {invoices.map((inv, i) => (
                  <tr key={i} className="hover:bg-brand-bg/10 transition border-b border-brand-bg/50 last:border-0">
                    <td className="p-4 pl-6">
                      <div className="font-semibold text-brand-dark">{inv.id}</div>
                      <div className="text-xs text-brand-gray mt-0.5">{inv.date}</div>
                    </td>
                    <td className="p-4 font-medium text-brand-dark">{inv.seed}</td>
                    <td className="p-4">{inv.qty}</td>
                    <td className="p-4 font-bold text-brand-dark">₹{inv.amount.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                       <span className={`px-2.5 py-1 rounded-full text-xs font-semibold 
                        ${inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                          inv.status === 'Pending Treasury' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button 
                        onClick={() => openInvoicePanel(inv)}
                        className="px-4 py-1.5 bg-brand-bg/50 text-brand-dark hover:bg-brand-primary hover:text-brand-dark font-medium rounded-lg transition flex items-center gap-2 ml-auto"
                      >
                        <Eye className="w-4 h-4" /> View & Pay
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* --- ADD NEW INVOICE MODAL (Center Screen) --- */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsAddModalOpen(false)} className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-brand-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20">
                <h2 className="text-xl font-bold text-brand-dark">Create New Invoice</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 bg-brand-white border border-brand-bg rounded-full text-brand-gray hover:text-brand-dark hover:bg-brand-bg/50 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateInvoice} className="flex flex-col max-h-[80vh]">
                <div className="p-6 overflow-y-auto space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Seed Variety</label>
                    <select name="seed" required className="w-full px-4 py-3 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark">
                      <option value="" disabled selected>Select seed variety...</option>
                      <option value="Wheat - Lok 1 (Certified)">Wheat - Lok 1 (Certified)</option>
                      <option value="Soybean - JS 335 (Foundation)">Soybean - JS 335 (Foundation)</option>
                      <option value="Paddy - IR 64 (Certified)">Paddy - IR 64 (Certified)</option>
                      <option value="Maize - Ganga 5 (Breeder)">Maize - Ganga 5 (Breeder)</option>
                    </select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-brand-dark mb-1.5">Quantity (kg)</label>
                      <input name="qty" type="number" required placeholder="e.g. 1000" className="w-full px-4 py-3 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-brand-dark mb-1.5">Total Amount (₹)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray font-semibold">₹</span>
                        <input name="amount" type="number" required placeholder="50000" className="w-full pl-8 pr-4 py-3 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Payment Due Date</label>
                    <input name="dueDate" type="date" required className="w-full px-4 py-3 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                  </div>
                </div>

                <div className="p-6 border-t border-brand-bg bg-brand-bg/10 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-6 py-2.5 border border-brand-bg rounded-xl text-brand-dark font-semibold hover:bg-brand-bg/50 transition">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 bg-brand-primary text-brand-dark font-bold rounded-xl hover:bg-[#8CD85F] transition shadow-sm">
                    Generate Invoice
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- RIGHT SLIDE-OUT PANEL (Invoice View & Integrated Payment Flow) --- */}
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
              className="relative w-full max-w-md bg-brand-white h-full shadow-2xl flex flex-col border-l border-brand-bg overflow-hidden"
            >
              {/* Dynamic Header based on Step */}
              <div className="p-6 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20">
                <div className="flex items-center gap-3">
                  {payStep !== 'view' && (
                    <button onClick={() => setPayStep('menu')} className="p-1 hover:bg-brand-bg rounded-full text-brand-gray transition">
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                  )}
                  <h2 className="text-xl font-bold text-brand-dark">
                    {payStep === 'view' ? 'Invoice Details' : payStep === 'menu' ? 'Payment Strategy' : 'Complete Payment'}
                  </h2>
                </div>
                <button onClick={() => setSelectedInvoice(null)} className="p-2 bg-brand-white border border-brand-bg rounded-full text-brand-gray hover:text-brand-dark hover:bg-brand-bg/50">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Dynamic Content Area */}
              <div className="p-8 flex-1 overflow-y-auto bg-[#F9FAFB]">
                
                {/* 1. VIEW INVOICE */}
                {payStep === 'view' && (
                  <div className="bg-white p-6 rounded-xl border border-brand-bg shadow-sm">
                    <div className="flex justify-between items-start border-b border-brand-bg border-dashed pb-4 mb-4">
                      <div>
                        <div className="text-2xl font-bold text-brand-dark mb-1">Maha Beej</div>
                        <div className="text-xs text-brand-gray">State Seed Corporation</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-brand-dark">{selectedInvoice.id}</div>
                        <div className="text-xs text-brand-gray mt-1">Date: {selectedInvoice.date}</div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="text-xs font-semibold text-brand-gray uppercase tracking-wider mb-2">Billed To</div>
                      <div className="font-semibold text-brand-dark">Ramesh Kumar</div>
                      <div className="text-sm text-brand-gray">Mobile Login User</div>
                    </div>
                    <div className="space-y-3 border-b border-brand-bg border-dashed pb-4 mb-4">
                      <div className="flex justify-between text-sm font-semibold text-brand-dark"><span>Item</span><span>Total</span></div>
                      <div className="flex justify-between text-sm text-brand-gray">
                        <span>{selectedInvoice.seed} <br/><span className="text-xs text-brand-gray/60">{selectedInvoice.qty} @ standard rate</span></span>
                        <span className="font-medium text-brand-dark">₹{(selectedInvoice.amount * 0.95).toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-sm text-brand-gray">
                        <span>GST (5%)</span>
                        <span className="font-medium text-brand-dark">₹{(selectedInvoice.amount * 0.05).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-brand-dark">Grand Total</span>
                      <span className="text-xl font-bold text-brand-primary text-green-600">₹{selectedInvoice.amount.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                )}

                {/* 2. PAYMENT MENU */}
                {payStep === 'menu' && (
                  <div className="space-y-4">
                    <h3 className="font-semibold text-brand-dark mb-2 text-center text-lg">Invoice {selectedInvoice.id}</h3>
                    
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
                  <div className="text-center mt-8">
                    <ShieldCheck className="w-20 h-20 text-emerald-500 mx-auto mb-6" />
                    <h3 className="text-4xl font-bold text-brand-dark mb-3">₹{activeAmount.toLocaleString('en-IN')}</h3>
                    <p className="text-sm text-brand-gray">You will be redirected to the secure payment gateway to complete this transaction via NetBanking or UPI.</p>
                  </div>
                )}

                {/* 3B. PAY PARTIAL */}
                {payStep === 'partial' && (
                  <div>
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
                  <div className="space-y-6">
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
                      <div className="w-full h-32 border-2 border-dashed border-brand-primary/40 bg-brand-primary/5 rounded-xl flex flex-col items-center justify-center text-brand-gray hover:bg-brand-primary/10 transition cursor-pointer">
                        <UploadCloud className="w-8 h-8 text-brand-primary mb-2" />
                        <span className="text-sm font-medium text-brand-dark">Upload Treasury PDF</span>
                      </div>
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
                        {selectedInvoice.status === 'Paid' ? 'Payment Completed' : 'Awaiting Treasury Approval'}
                      </button>
                    )}
                    <button className="w-full py-2 text-brand-dark font-medium rounded-xl hover:bg-brand-bg/50 transition flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" /> Download PDF
                    </button>
                  </div>
                ) : payStep !== 'menu' ? (
                  <button onClick={() => setSelectedInvoice(null)} className="w-full py-4 bg-brand-dark text-white font-bold rounded-xl hover:bg-black transition shadow-lg">
                    {payStep === 'treasury' ? 'Submit Treasury Claim' : 'Proceed to Secure Pay'}
                  </button>
                ) : null}
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