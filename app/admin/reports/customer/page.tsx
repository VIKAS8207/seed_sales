"use client";
import { Search, Filter, Download, ArrowDownUp } from "lucide-react";

const CUST_REPORT = [
  { id: "C-901", name: "Ramesh Patel", soc: "Kisan Agro", orders: 12, vol: "4,500 kg", pref: "Wheat Lok-1", ltv: 185000, risk: "Low", lastOrder: "10 Aug 2026" },
  { id: "C-902", name: "Suresh Rao", soc: "Vidarbha DDA", orders: 4, vol: "1,200 kg", pref: "Soybean JS-335", ltv: 98400, risk: "High", lastOrder: "05 Aug 2026" },
  { id: "C-903", name: "Geeta Devi", soc: "Green Earth", orders: 8, vol: "2,800 kg", pref: "Paddy IR-64", ltv: 112000, risk: "Medium", lastOrder: "22 Jul 2026" },
];

export default function CustomerWiseReport() {
  return (
    <div className="p-8 pt-10 w-full max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Customer Purchasing Analytics</h1>
          <p className="text-brand-gray text-sm">Detailed report on individual buying patterns, preferences, and credit risk.</p>
        </div>
        <button className="px-4 py-2 bg-brand-primary text-brand-dark font-semibold rounded-lg flex items-center gap-2 hover:bg-[#8CD85F] shadow-sm">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-brand-bg flex gap-3 bg-brand-bg/20">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
            <input type="text" placeholder="Search Customer Name or ID..." className="w-full pl-9 pr-4 py-2 bg-brand-white border border-brand-bg rounded-lg text-sm focus:ring-brand-primary/50 outline-none" />
          </div>
          <button className="px-3 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray flex items-center gap-2"><Filter className="w-4 h-4"/> Variety Pref</button>
          <button className="px-3 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray flex items-center gap-2"><Filter className="w-4 h-4"/> Risk Level</button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-brand-dark font-semibold bg-brand-bg/30">
              <tr>
                <th className="p-4 pl-6">Customer Details</th>
                <th className="p-4">Linked Society</th>
                <th className="p-4">Seed Preference</th>
                <th className="p-4 text-right">Total Orders</th>
                <th className="p-4 text-right">Total Vol (kg)</th>
                <th className="p-4 text-right"><div className="flex justify-end items-center gap-1">Lifetime Value (₹) <ArrowDownUp className="w-3 h-3"/></div></th>
                <th className="p-4">Last Order</th>
                <th className="p-4 pr-6">Credit Risk</th>
              </tr>
            </thead>
            <tbody className="text-brand-gray">
              {CUST_REPORT.map((row, i) => (
                <tr key={i} className="border-b border-brand-bg/50 hover:bg-brand-bg/10">
                  <td className="p-4 pl-6">
                    <div className="font-semibold text-brand-dark">{row.name}</div>
                    <div className="text-xs">{row.id}</div>
                  </td>
                  <td className="p-4">{row.soc}</td>
                  <td className="p-4 font-medium text-brand-dark">{row.pref}</td>
                  <td className="p-4 text-right">{row.orders}</td>
                  <td className="p-4 text-right">{row.vol}</td>
                  <td className="p-4 text-right font-bold text-brand-primary text-green-700">₹{row.ltv.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-xs">{row.lastOrder}</td>
                  <td className="p-4 pr-6">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${row.risk === 'Low' ? 'bg-green-50 text-green-600 border border-green-200' : row.risk === 'High' ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-yellow-50 text-yellow-600 border border-yellow-200'}`}>
                      {row.risk}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Simplified Pagination Footer for brevity in code snippet */}
        <div className="p-4 border-t border-brand-bg bg-brand-white text-sm text-brand-gray">Showing top results...</div>
      </div>
    </div>
  );
}