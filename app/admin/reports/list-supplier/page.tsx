"use client";
import { Search, Filter, Download, Truck } from "lucide-react";

const SUPPLIER_REPORT = [
  { id: "SUP-101", name: "National Seeds Corp", type: "Gov Entity", spec: "Wheat & Paddy", contract: "500,000 kg", fulfilled: 85, owed: 0, nextDel: "15 Sep 2026" },
  { id: "SUP-102", name: "AgriGenetics Ltd", type: "Private Biotech", spec: "Bt Cotton", contract: "50,000 kg", fulfilled: 40, owed: 1250000, nextDel: "20 Aug 2026" },
  { id: "SUP-103", name: "Deccan Breeder Hub", type: "Cooperative", spec: "Soybean", contract: "150,000 kg", fulfilled: 95, owed: 450000, nextDel: "Complete" },
];

export default function SupplierReport() {
  return (
    <div className="p-8 pt-10 w-full max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Supplier & Procurement Pipeline</h1>
          <p className="text-brand-gray text-sm">Manage incoming seed supply contracts, fulfillment rates, and payables.</p>
        </div>
        <button className="px-4 py-2 bg-brand-primary text-brand-dark font-semibold rounded-lg flex items-center gap-2 shadow-sm">
          <Download className="w-4 h-4" /> Export Ledger
        </button>
      </div>

      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-brand-bg flex gap-3 bg-brand-bg/20">
          <div className="relative w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
            <input type="text" placeholder="Search Supplier Name..." className="w-full pl-9 pr-4 py-2 bg-brand-white border border-brand-bg rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-primary/50" />
          </div>
          <button className="px-3 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray flex items-center gap-2"><Filter className="w-4 h-4"/> Entity Type</button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-brand-dark font-semibold bg-brand-bg/30">
              <tr>
                <th className="p-4 pl-6">Supplier Details</th>
                <th className="p-4">Seed Specialization</th>
                <th className="p-4 text-right">Annual Contract Vol</th>
                <th className="p-4 w-48">Fulfillment Rate</th>
                <th className="p-4 text-right">Payment Owed (₹)</th>
                <th className="p-4 pr-6">Next Delivery Status</th>
              </tr>
            </thead>
            <tbody className="text-brand-gray">
              {SUPPLIER_REPORT.map((row, i) => (
                <tr key={i} className="border-b border-brand-bg/50 hover:bg-brand-bg/10">
                  <td className="p-4 pl-6">
                    <div className="font-semibold text-brand-dark flex items-center gap-2"><Truck className="w-4 h-4 text-brand-primary"/> {row.name}</div>
                    <div className="text-xs mt-1">{row.id} • {row.type}</div>
                  </td>
                  <td className="p-4 font-medium text-brand-dark">{row.spec}</td>
                  <td className="p-4 text-right font-medium">{row.contract}</td>
                  <td className="p-4">
                    <div className="flex justify-between items-end mb-1">
                      <span className="text-xs font-bold text-brand-dark">{row.fulfilled}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-brand-bg rounded-full overflow-hidden">
                      <div style={{ width: `${row.fulfilled}%` }} className={`h-full rounded-full ${row.fulfilled > 80 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                    </div>
                  </td>
                  <td className="p-4 text-right font-bold text-red-600">{row.owed > 0 ? `₹${row.owed.toLocaleString('en-IN')}` : 'Settled'}</td>
                  <td className="p-4 pr-6 font-medium text-brand-dark">{row.nextDel}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}