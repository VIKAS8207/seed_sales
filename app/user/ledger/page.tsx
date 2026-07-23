"use client";
import { Calendar, Download } from "lucide-react";
import { motion } from "framer-motion";

// Mock Data matching the screenshot's ledger entries
const LEDGER_DATA = [
  { id: 1, date: "Mar 01, 2024", desc: "Opening Balance", ref: "OB", debit: null, credit: null, balance: 50000 },
  { id: 2, date: "Mar 15, 2024", desc: "Invoice Created", ref: "INV-2024-001", debit: 12500, credit: null, balance: 62500 },
  { id: 3, date: "Mar 16, 2024", desc: "Payment Received", ref: "CHQ-12345", debit: null, credit: 12500, balance: 50000 },
  { id: 4, date: "Mar 18, 2024", desc: "Invoice Created", ref: "INV-2024-002", debit: 8750, credit: null, balance: 58750 },
  { id: 5, date: "Mar 22, 2024", desc: "Invoice Created", ref: "INV-2024-003", debit: 15000, credit: null, balance: 73750 },
  { id: 6, date: "Mar 25, 2024", desc: "Invoice Created", ref: "INV-2024-004", debit: 9000, credit: null, balance: 82750 },
  { id: 7, date: "Mar 26, 2024", desc: "Payment Received", ref: "NEFT-67890", debit: null, credit: 37750, balance: 45000 },
  { id: 8, date: "Mar 28, 2024", desc: "Invoice Created", ref: "INV-2024-005", debit: 22000, credit: null, balance: 67000 },
  { id: 9, date: "Mar 30, 2024", desc: "Invoice Created", ref: "INV-2024-006", debit: 11500, credit: null, balance: 78500 },
];

export default function LedgerPage() {
  return (
    <div className="p-8 pt-10 w-full max-w-[1400px] mx-auto">
      
      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Account Ledger</h1>
          <p className="text-brand-gray text-sm">Track all your invoices, payments, and account balances.</p>
        </div>
      </div>

      {/* 4-Column Stat Cards (Colors mapped to screenshot semantics) */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 shadow-sm">
          <div className="text-sm font-semibold text-blue-800 mb-2">Opening Balance</div>
          <div className="text-3xl font-bold text-blue-900">₹50,000</div>
        </div>
        <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 shadow-sm">
          <div className="text-sm font-semibold text-emerald-800 mb-2">Total Invoiced</div>
          <div className="text-3xl font-bold text-emerald-900">₹2,45,000</div>
        </div>
        <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5 shadow-sm">
          <div className="text-sm font-semibold text-amber-800 mb-2">Total Paid</div>
          <div className="text-3xl font-bold text-amber-900">₹2,50,000</div>
        </div>
        <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 shadow-sm">
          <div className="text-sm font-semibold text-rose-800 mb-2">Outstanding</div>
          <div className="text-3xl font-bold text-rose-900">₹45,000</div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex justify-between items-center mb-4">
        <div className="relative w-64">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
          <select className="w-full pl-9 pr-4 py-2.5 bg-brand-white border border-brand-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm text-brand-dark appearance-none font-medium shadow-sm">
            <option>All Time</option>
            <option>This Financial Year</option>
            <option>Last 6 Months</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-brand-primary text-brand-dark font-semibold rounded-lg hover:bg-[#8CD85F] transition shadow-sm">
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      {/* Ledger Table */}
      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm overflow-hidden mb-6">
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-brand-dark font-semibold bg-brand-bg/30">
              <tr>
                <th className="p-4 pl-6">Date</th>
                <th className="p-4">Description</th>
                <th className="p-4">Reference</th>
                <th className="p-4 text-right">Debit</th>
                <th className="p-4 text-right">Credit</th>
                <th className="p-4 pr-6 text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="text-brand-gray">
              {LEDGER_DATA.map((row) => (
                <tr key={row.id} className="hover:bg-brand-bg/10 transition border-b border-brand-bg/50 last:border-0">
                  <td className="p-4 pl-6">{row.date}</td>
                  <td className="p-4 font-semibold text-brand-dark">{row.desc}</td>
                  <td className="p-4 text-brand-gray/80">{row.ref}</td>
                  <td className="p-4 text-right font-medium text-brand-dark">
                    {row.debit ? `₹${row.debit.toLocaleString('en-IN')}` : "-"}
                  </td>
                  <td className="p-4 text-right font-medium text-brand-dark">
                    {row.credit ? `₹${row.credit.toLocaleString('en-IN')}` : "-"}
                  </td>
                  <td className="p-4 pr-6 text-right font-bold text-brand-primary text-green-600">
                    ₹{row.balance.toLocaleString('en-IN')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Cards Section */}
      <div className="grid grid-cols-2 gap-6">
        
        {/* Payment Terms Card */}
        <div className="bg-brand-white border border-brand-bg rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-brand-dark mb-6 text-lg">Payment Terms</h3>
          
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center border-b border-brand-bg border-dashed pb-3">
              <span className="text-brand-gray font-medium">Payment Terms</span>
              <span className="font-semibold text-brand-dark">Net 30 Days</span>
            </div>
            <div className="flex justify-between items-center border-b border-brand-bg border-dashed pb-3">
              <span className="text-brand-gray font-medium">Credit Limit</span>
              <span className="font-bold text-brand-dark">₹1,00,000</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between text-sm font-medium mb-2">
              <span className="text-brand-gray">Credit Used</span>
              <span className="font-bold text-brand-primary text-green-600">78.5%</span>
            </div>
            <div className="w-full h-2.5 bg-brand-bg rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: "78.5%" }} 
                transition={{ duration: 1, ease: "easeOut" }}
                className="h-full bg-brand-primary rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Outstanding Breakdown Card */}
        <div className="bg-brand-white border border-brand-bg rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-brand-dark mb-6 text-lg">Outstanding Breakdown</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-brand-gray font-medium">Current (0-30 days)</span>
                <span className="font-semibold text-emerald-600">₹24,750</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-brand-gray font-medium">30-60 days</span>
                <span className="font-semibold text-amber-500">₹15,000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-brand-gray font-medium">60+ days (Overdue)</span>
                <span className="font-semibold text-red-500">₹5,250</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t border-brand-bg mt-6">
            <span className="font-bold text-brand-dark">Total Outstanding</span>
            <span className="text-xl font-bold text-brand-dark">₹45,000</span>
          </div>
        </div>

      </div>

    </div>
  );
}