"use client";
import { Search, Filter, Download, CreditCard, Landmark, ArrowDownUp } from "lucide-react";

const PAYMENT_DATA = [
  { id: "PAY-88210", date: "25 Jul 2026", mode: "Treasury Offset", ref: "DDA-GRANT-44", invoice: "INV-26-0610", amount: 19000, status: "Approved" },
  { id: "PAY-87550", date: "15 Jun 2026", mode: "NEFT / Online", ref: "TXN-99881122", invoice: "INV-26-0501", amount: 50000, status: "Success" },
  { id: "PAY-86112", date: "10 May 2026", mode: "Manual Cheque", ref: "CHQ-000452", invoice: "INV-26-0211", amount: 25000, status: "Cleared" },
  { id: "PAY-85004", date: "01 Apr 2026", mode: "NEFT / Online", ref: "TXN-11223344", invoice: "OB-FY26", amount: 15000, status: "Failed" },
];

export default function PaymentHistoryReport() {
  return (
    <div className="p-8 pt-4 w-full max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Payment History</h1>
          <p className="text-brand-gray text-sm">Track your online payments, manual cheques, and DDA treasury authorizations.</p>
        </div>
        <button className="px-4 py-2 bg-brand-primary text-brand-dark font-semibold rounded-lg flex items-center gap-2 hover:bg-[#8CD85F] shadow-sm">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20">
          <div className="flex gap-3 items-center w-full max-w-2xl">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
              <input type="text" placeholder="Search Txn ID or UTR..." className="w-full pl-9 pr-4 py-2 bg-brand-white border border-brand-bg rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-primary/50" />
            </div>
            <button className="px-3 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray flex items-center gap-2 hover:bg-brand-bg/50"><Filter className="w-4 h-4"/> Mode</button>
            <button className="px-3 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray flex items-center gap-2 hover:bg-brand-bg/50"><Filter className="w-4 h-4"/> Status</button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-brand-dark font-semibold bg-brand-bg/30">
              <tr>
                <th className="p-4 pl-6">Payment Info</th>
                <th className="p-4">Payment Mode</th>
                <th className="p-4">Settled Against</th>
                <th className="p-4 text-right"><div className="flex justify-end items-center gap-1 cursor-pointer">Amount (₹) <ArrowDownUp className="w-3 h-3"/></div></th>
                <th className="p-4 pr-6">Status</th>
              </tr>
            </thead>
            <tbody className="text-brand-gray">
              {PAYMENT_DATA.map((row, i) => (
                <tr key={i} className="border-b border-brand-bg/50 hover:bg-brand-bg/10">
                  <td className="p-4 pl-6">
                    <div className="font-semibold text-brand-dark">{row.id}</div>
                    <div className="text-xs">{row.date}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 font-medium text-brand-dark">
                      {row.mode.includes('Treasury') ? <Landmark className="w-4 h-4 text-brand-primary"/> : <CreditCard className="w-4 h-4 text-brand-gray"/>}
                      {row.mode}
                    </div>
                    <div className="text-xs text-brand-gray mt-1">Ref: {row.ref}</div>
                  </td>
                  <td className="p-4 text-xs font-mono">{row.invoice}</td>
                  <td className="p-4 text-right font-bold text-brand-dark">₹{row.amount.toLocaleString('en-IN')}</td>
                  <td className="p-4 pr-6">
                    {row.status === 'Failed' ? (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs font-bold">Failed</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">{row.status}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-brand-bg flex justify-between items-center bg-brand-white">
          <span className="text-sm text-brand-gray font-medium">Showing 1 to 4 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50 text-sm">Prev</button>
            <button className="px-3 py-1 border border-brand-primary bg-brand-primary/10 rounded-md text-brand-dark font-semibold text-sm">1</button>
            <button className="px-3 py-1 border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50 text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}