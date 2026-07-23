"use client";
import { Download, Calendar, Filter, FileText } from "lucide-react";

const STATEMENT_DATA = [
  { date: "01 Apr 2026", desc: "Opening Balance Brought Forward", ref: "OB-FY26", debit: null, credit: null, bal: 15000 },
  { date: "10 Jun 2026", desc: "Seed Purchase - Maize", ref: "INV-26-0501", debit: 68250, credit: null, bal: 83250 },
  { date: "15 Jun 2026", desc: "Payment via NEFT", ref: "TXN-998811", debit: null, credit: 50000, bal: 33250 },
  { date: "22 Jul 2026", desc: "Seed Purchase - Paddy", ref: "INV-26-0610", debit: 19000, credit: null, bal: 52250 },
  { date: "25 Jul 2026", desc: "Treasury Subsidy Adjustment", ref: "DDA-GRANT-44", debit: null, credit: 19000, bal: 33250 },
  { date: "05 Aug 2026", desc: "Seed Purchase - Soybean", ref: "INV-26-0742", debit: 49200, credit: null, bal: 82450 },
];

export default function LedgerSummaryReport() {
  return (
    <div className="p-8 pt-4 w-full max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Statement of Account</h1>
          <p className="text-brand-gray text-sm">Official ledger summary for your financial reconciliations.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-brand-white border border-brand-bg text-brand-dark font-medium rounded-lg flex items-center gap-2 hover:bg-brand-bg/50">
            <Calendar className="w-4 h-4" /> 01 Apr 2026 - Present
          </button>
          <button className="px-4 py-2 bg-brand-dark text-white font-semibold rounded-lg flex items-center gap-2 hover:bg-brand-dark/90 shadow-sm">
            <Download className="w-4 h-4" /> Download Statement (PDF)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-brand-white border border-brand-bg rounded-xl p-5 shadow-sm">
          <div className="text-xs font-semibold text-brand-gray mb-1">OPENING BALANCE</div>
          <div className="text-xl font-bold text-brand-dark">₹15,000</div>
        </div>
        <div className="bg-brand-white border border-brand-bg rounded-xl p-5 shadow-sm border-l-4 border-l-red-400">
          <div className="text-xs font-semibold text-brand-gray mb-1">TOTAL DEBITS (BILLED)</div>
          <div className="text-xl font-bold text-brand-dark">₹1,36,450</div>
        </div>
        <div className="bg-brand-white border border-brand-bg rounded-xl p-5 shadow-sm border-l-4 border-l-green-400">
          <div className="text-xs font-semibold text-brand-gray mb-1">TOTAL CREDITS (PAID)</div>
          <div className="text-xl font-bold text-brand-dark">₹69,000</div>
        </div>
        <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-xl p-5 shadow-sm">
          <div className="text-xs font-semibold text-brand-dark mb-1">CLOSING OUTSTANDING</div>
          <div className="text-xl font-bold text-brand-dark">₹82,450</div>
        </div>
      </div>

      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20">
          <h3 className="font-semibold text-brand-dark flex items-center gap-2"><FileText className="w-4 h-4"/> Ledger Entries</h3>
          <button className="px-3 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray flex items-center gap-2 hover:bg-brand-bg/50"><Filter className="w-4 h-4"/> Filter Txns</button>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-brand-dark font-semibold bg-brand-bg/30">
              <tr>
                <th className="p-4 pl-6">Date</th>
                <th className="p-4">Particulars</th>
                <th className="p-4">Ref/Voucher No.</th>
                <th className="p-4 text-right">Debit (₹)</th>
                <th className="p-4 text-right">Credit (₹)</th>
                <th className="p-4 pr-6 text-right">Running Balance (₹)</th>
              </tr>
            </thead>
            <tbody className="text-brand-gray">
              {STATEMENT_DATA.map((row, i) => (
                <tr key={i} className="border-b border-brand-bg/50 hover:bg-brand-bg/10">
                  <td className="p-4 pl-6">{row.date}</td>
                  <td className="p-4 font-medium text-brand-dark">{row.desc}</td>
                  <td className="p-4 text-xs font-mono text-brand-gray/80">{row.ref}</td>
                  <td className="p-4 text-right text-red-600 font-medium">{row.debit ? row.debit.toLocaleString('en-IN') : '-'}</td>
                  <td className="p-4 text-right text-green-600 font-medium">{row.credit ? row.credit.toLocaleString('en-IN') : '-'}</td>
                  <td className="p-4 pr-6 text-right font-bold text-brand-dark">{row.bal.toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}