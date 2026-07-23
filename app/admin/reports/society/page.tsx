"use client";
import { Search, Filter, Download, Calendar, ArrowDownUp } from "lucide-react";

const MOCK_REPORT = [
  { id: "SOC-001", name: "Kisan Agro Cooperative", region: "Raipur", members: 450, vol: "45,000 kg", rev: 1450000, due: 120000, treasury: 350000, status: "Healthy" },
  { id: "SOC-002", name: "Vidarbha Farmers DDA", region: "Nagpur", members: 820, vol: "85,200 kg", rev: 2840000, due: 450000, treasury: 1200000, status: "At Risk" },
  { id: "SOC-003", name: "Bastar Tribal Agri Guild", region: "Jagdalpur", members: 1200, vol: "110,500 kg", rev: 4200000, due: 0, treasury: 2500000, status: "Excellent" },
];

export default function SocietyReport() {
  return (
    <div className="p-8 pt-10 w-full max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Society Performance Report</h1>
          <p className="text-brand-gray text-sm">Analyze aggregated sales, dues, and treasury claims by society.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-brand-white border border-brand-bg text-brand-dark font-medium rounded-lg flex items-center gap-2 hover:bg-brand-bg/50">
            <Calendar className="w-4 h-4" /> FY 2026-27
          </button>
          <button className="px-4 py-2 bg-brand-primary text-brand-dark font-semibold rounded-lg flex items-center gap-2 hover:bg-[#8CD85F] shadow-sm">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-brand-white border border-brand-bg rounded-xl p-5 shadow-sm">
          <div className="text-xs font-semibold text-brand-gray mb-1">TOTAL SOCIETY REVENUE</div>
          <div className="text-2xl font-bold text-brand-dark">₹84.9L</div>
        </div>
        <div className="bg-brand-white border border-brand-bg rounded-xl p-5 shadow-sm">
          <div className="text-xs font-semibold text-brand-gray mb-1">TOTAL OUTSTANDING DUES</div>
          <div className="text-2xl font-bold text-red-600">₹5.7L</div>
        </div>
        <div className="bg-brand-white border border-brand-bg rounded-xl p-5 shadow-sm">
          <div className="text-xs font-semibold text-brand-gray mb-1">PENDING TREASURY CLAIMS</div>
          <div className="text-2xl font-bold text-yellow-600">₹40.5L</div>
        </div>
        <div className="bg-brand-white border border-brand-bg rounded-xl p-5 shadow-sm">
          <div className="text-xs font-semibold text-brand-gray mb-1">TOTAL SEED VOLUME</div>
          <div className="text-2xl font-bold text-brand-primary text-green-700">240,700 kg</div>
        </div>
      </div>

      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20">
          <div className="flex gap-3 items-center w-full max-w-2xl">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
              <input type="text" placeholder="Search Society ID or Name..." className="w-full pl-9 pr-4 py-2 bg-brand-white border border-brand-bg rounded-lg text-sm focus:ring-2 focus:ring-brand-primary/50 outline-none" />
            </div>
            <button className="px-3 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray flex items-center gap-2 hover:bg-brand-bg/50"><Filter className="w-4 h-4"/> Region: All</button>
            <button className="px-3 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray flex items-center gap-2 hover:bg-brand-bg/50"><Filter className="w-4 h-4"/> Risk: All</button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-brand-dark font-semibold bg-brand-bg/30">
              <tr>
                <th className="p-4 pl-6">Society Info</th>
                <th className="p-4"><div className="flex items-center gap-1 cursor-pointer">Seed Vol (kg) <ArrowDownUp className="w-3 h-3"/></div></th>
                <th className="p-4 text-right"><div className="flex justify-end items-center gap-1 cursor-pointer">YTD Revenue <ArrowDownUp className="w-3 h-3"/></div></th>
                <th className="p-4 text-right">Outstanding Dues</th>
                <th className="p-4 text-right">Pending Treasury</th>
                <th className="p-4 pr-6">Financial Health</th>
              </tr>
            </thead>
            <tbody className="text-brand-gray">
              {MOCK_REPORT.map((row, i) => (
                <tr key={i} className="border-b border-brand-bg/50 hover:bg-brand-bg/10">
                  <td className="p-4 pl-6">
                    <div className="font-semibold text-brand-dark">{row.name}</div>
                    <div className="text-xs">{row.id} • {row.region} • {row.members} Members</div>
                  </td>
                  <td className="p-4 font-medium text-brand-dark">{row.vol}</td>
                  <td className="p-4 text-right font-bold text-brand-dark">₹{row.rev.toLocaleString('en-IN')}</td>
                  <td className="p-4 text-right font-semibold text-red-600">{row.due > 0 ? `₹${row.due.toLocaleString('en-IN')}` : 'Nil'}</td>
                  <td className="p-4 text-right font-medium text-yellow-600">₹{row.treasury.toLocaleString('en-IN')}</td>
                  <td className="p-4 pr-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${row.status === 'Excellent' ? 'bg-green-100 text-green-700' : row.status === 'Healthy' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationFooter total={142} />
      </div>
    </div>
  );
}

const PaginationFooter = ({ total }: { total: number }) => (
  <div className="p-4 border-t border-brand-bg flex justify-between items-center bg-brand-white">
    <span className="text-sm text-brand-gray font-medium">Showing 1 to 10 of {total} entries</span>
    <div className="flex gap-1">
      <button className="px-3 py-1 border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50 text-sm">Prev</button>
      <button className="px-3 py-1 border border-brand-primary bg-brand-primary/10 rounded-md text-brand-dark font-semibold text-sm">1</button>
      <button className="px-3 py-1 border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50 text-sm">2</button>
      <button className="px-3 py-1 border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50 text-sm">Next</button>
    </div>
  </div>
);