"use client";
import { Search, Filter, Download, Calendar, ShoppingBag, Sprout, ShieldCheck } from "lucide-react";

const PURCHASE_DATA = [
  { id: "ORD-9932", date: "12 Aug 2026", variety: "Wheat - Lok 1", class: "Certified", qty: "2,000 kg", rate: 45, scheme: "None", total: 90000, status: "Delivered" },
  { id: "ORD-9841", date: "05 Aug 2026", variety: "Soybean - JS 335", class: "Foundation", qty: "1,200 kg", rate: 82, scheme: "State Tribal Grant (50%)", total: 49200, status: "In Transit" },
  { id: "ORD-9755", date: "22 Jul 2026", variety: "Paddy - IR 64", class: "Certified", qty: "500 kg", rate: 38, scheme: "None", total: 19000, status: "Delivered" },
  { id: "ORD-9510", date: "10 Jun 2026", variety: "Maize - Ganga 5", class: "Breeder", qty: "1,500 kg", rate: 65, scheme: "KVY Subsidy", total: 68250, status: "Delivered" },
];

export default function PurchaseReport() {
  return (
    <div className="p-8 pt-4 w-full max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Seed Purchase Report</h1>
          <p className="text-brand-gray text-sm">Detailed breakdown of your procured seed varieties, pricing, and subsidies.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-brand-white border border-brand-bg text-brand-dark font-medium rounded-lg flex items-center gap-2 hover:bg-brand-bg/50">
            <Calendar className="w-4 h-4" /> Kharif Season 2026
          </button>
          <button className="px-4 py-2 bg-brand-primary text-brand-dark font-semibold rounded-lg flex items-center gap-2 hover:bg-[#8CD85F] shadow-sm">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-brand-white border border-brand-bg rounded-xl p-5 shadow-sm flex justify-between items-center">
          <div>
            <div className="text-xs font-semibold text-brand-gray mb-1">TOTAL SEED PROCURED</div>
            <div className="text-2xl font-bold text-brand-dark">5,200 kg</div>
          </div>
          <div className="p-3 bg-brand-primary/20 rounded-lg text-brand-dark"><Sprout className="w-6 h-6" /></div>
        </div>
        <div className="bg-brand-white border border-brand-bg rounded-xl p-5 shadow-sm flex justify-between items-center">
          <div>
            <div className="text-xs font-semibold text-brand-gray mb-1">TOTAL SPENT (OUT OF POCKET)</div>
            <div className="text-2xl font-bold text-brand-dark">₹2,26,450</div>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600"><ShoppingBag className="w-6 h-6" /></div>
        </div>
        <div className="bg-brand-white border border-brand-bg rounded-xl p-5 shadow-sm flex justify-between items-center">
          <div>
            <div className="text-xs font-semibold text-brand-gray mb-1">SUBSIDIES & GRANTS APPLIED</div>
            <div className="text-2xl font-bold text-emerald-600">₹78,450</div>
          </div>
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600"><ShieldCheck className="w-6 h-6" /></div>
        </div>
      </div>

      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20">
          <div className="flex gap-3 items-center w-full max-w-2xl">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
              <input type="text" placeholder="Search Order ID or Seed..." className="w-full pl-9 pr-4 py-2 bg-brand-white border border-brand-bg rounded-lg text-sm outline-none focus:ring-2 focus:ring-brand-primary/50" />
            </div>
            <button className="px-3 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray flex items-center gap-2 hover:bg-brand-bg/50"><Filter className="w-4 h-4"/> Seed Class</button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-brand-dark font-semibold bg-brand-bg/30">
              <tr>
                <th className="p-4 pl-6">Order ID & Date</th>
                <th className="p-4">Seed Variety & Class</th>
                <th className="p-4 text-right">Quantity</th>
                <th className="p-4 text-right">Unit Rate</th>
                <th className="p-4">Applied Scheme</th>
                <th className="p-4 text-right">Final Amount</th>
                <th className="p-4 pr-6">Status</th>
              </tr>
            </thead>
            <tbody className="text-brand-gray">
              {PURCHASE_DATA.map((row, i) => (
                <tr key={i} className="border-b border-brand-bg/50 hover:bg-brand-bg/10">
                  <td className="p-4 pl-6">
                    <div className="font-semibold text-brand-dark">{row.id}</div>
                    <div className="text-xs">{row.date}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-brand-dark">{row.variety}</div>
                    <div className="text-xs text-brand-gray">{row.class}</div>
                  </td>
                  <td className="p-4 text-right">{row.qty}</td>
                  <td className="p-4 text-right">₹{row.rate}/kg</td>
                  <td className="p-4">
                    {row.scheme === 'None' ? <span className="text-brand-gray">-</span> : <span className="px-2 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded border border-emerald-100">{row.scheme}</span>}
                  </td>
                  <td className="p-4 text-right font-bold text-brand-dark">₹{row.total.toLocaleString('en-IN')}</td>
                  <td className="p-4 pr-6">
                    <span className={`px-2 py-1 rounded-md text-xs font-bold ${row.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationFooter />
      </div>
    </div>
  );
}

const PaginationFooter = () => (
  <div className="p-4 border-t border-brand-bg flex justify-between items-center bg-brand-white">
    <span className="text-sm text-brand-gray font-medium">Showing 1 to 10 entries</span>
    <div className="flex gap-1">
      <button className="px-3 py-1 border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50 text-sm">Prev</button>
      <button className="px-3 py-1 border border-brand-primary bg-brand-primary/10 rounded-md text-brand-dark font-semibold text-sm">1</button>
      <button className="px-3 py-1 border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50 text-sm">Next</button>
    </div>
  </div>
);