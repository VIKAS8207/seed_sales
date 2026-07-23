"use client";
import { Search, Filter, Download, AlertTriangle, ArrowDownUp } from "lucide-react";

const STOCK_REPORT = [
  { sku: "MB-W101", variety: "Wheat - Lok 1", class: "Certified", total: 15000, alloc: 12500, expiry: "May 2027", rate: 45, val: 675000, risk: "Safe" },
  { sku: "MB-S335", variety: "Soybean - JS 335", class: "Foundation", total: 8500, alloc: 8000, expiry: "Nov 2026", rate: 82, val: 697000, risk: "Low Stock" },
  { sku: "MB-M110", variety: "Maize - Ganga 5", class: "Breeder", total: 5200, alloc: 500, expiry: "Sep 2026", rate: 65, val: 338000, risk: "Expiry Warning" },
];

export default function StockReport() {
  return (
    <div className="p-8 pt-10 w-full max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Seed Stock & Valuation Matrix</h1>
          <p className="text-brand-gray text-sm">Analyze warehouse inventory, unallocated assets, and expiration risks.</p>
        </div>
        <button className="px-4 py-2 bg-brand-primary text-brand-dark font-semibold rounded-lg flex items-center gap-2 shadow-sm">
          <Download className="w-4 h-4" /> Download Inventory Matrix
        </button>
      </div>

      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-brand-bg flex gap-3 bg-brand-bg/20">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
            <input type="text" placeholder="Search SKU or Variety..." className="w-full pl-9 pr-4 py-2 bg-brand-white border border-brand-bg rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <button className="px-3 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray flex items-center gap-2"><Filter className="w-4 h-4"/> Seed Class</button>
          <button className="px-3 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray flex items-center gap-2"><Filter className="w-4 h-4"/> Risk Flag</button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-brand-dark font-semibold bg-brand-bg/30">
              <tr>
                <th className="p-4 pl-6">SKU & Variety</th>
                <th className="p-4">Seed Class</th>
                <th className="p-4 text-right"><div className="flex justify-end items-center gap-1">Total Stock (kg) <ArrowDownUp className="w-3 h-3"/></div></th>
                <th className="p-4 text-right">Allocated / Sold (kg)</th>
                <th className="p-4 text-right">Available Sale (kg)</th>
                <th className="p-4 text-right">Asset Valuation (₹)</th>
                <th className="p-4">Expiring Date</th>
                <th className="p-4 pr-6">Status Flag</th>
              </tr>
            </thead>
            <tbody className="text-brand-gray">
              {STOCK_REPORT.map((row, i) => (
                <tr key={i} className="border-b border-brand-bg/50 hover:bg-brand-bg/10">
                  <td className="p-4 pl-6">
                    <div className="font-bold text-brand-dark">{row.variety}</div>
                    <div className="text-xs">{row.sku}</div>
                  </td>
                  <td className="p-4 font-medium text-brand-dark">{row.class}</td>
                  <td className="p-4 text-right">{row.total.toLocaleString()}</td>
                  <td className="p-4 text-right">{row.alloc.toLocaleString()}</td>
                  <td className="p-4 text-right font-bold text-brand-primary text-green-700">{(row.total - row.alloc).toLocaleString()}</td>
                  <td className="p-4 text-right font-semibold text-brand-dark">₹{row.val.toLocaleString('en-IN')}</td>
                  <td className="p-4">{row.expiry}</td>
                  <td className="p-4 pr-6">
                    {row.risk === 'Safe' && <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-bold">Optimal</span>}
                    {row.risk === 'Low Stock' && <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold">Restock Needed</span>}
                    {row.risk === 'Expiry Warning' && <span className="px-2 py-1 bg-red-100 text-red-700 flex items-center gap-1 w-max rounded-md text-xs font-bold"><AlertTriangle className="w-3 h-3"/> Critical</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}