"use client";
import { Search, Download, CheckCircle, XCircle } from "lucide-react";

const KYC_REPORT = [
  { id: "C-901", name: "Ramesh Patel", contact: "+91 9876543210", aadhar: "XXXX-XXXX-1234", kyc: true, bank: "SBI - 4321", onbd: "12 Jan 2024", status: "Active" },
  { id: "C-902", name: "Suresh Rao", contact: "+91 8765432109", aadhar: "XXXX-XXXX-9876", kyc: false, bank: "Pending", onbd: "05 Mar 2024", status: "Hold" },
];

export default function CustomerListReport() {
  return (
    <div className="p-8 pt-10 w-full max-w-[1400px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Customer Audit & KYC Masterlist</h1>
          <p className="text-brand-gray text-sm">Generate compliance reports and verify onboarding documents.</p>
        </div>
        <button className="px-4 py-2 bg-brand-primary text-brand-dark font-semibold rounded-lg flex items-center gap-2 shadow-sm">
          <Download className="w-4 h-4" /> Export CSV (Encrypted)
        </button>
      </div>

      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm overflow-hidden">
        <div className="p-4 border-b border-brand-bg bg-brand-bg/20">
          <input type="text" placeholder="Search by Aadhar, Phone, or Name..." className="w-full max-w-md px-4 py-2 bg-brand-white border border-brand-bg rounded-lg text-sm outline-none" />
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-brand-dark font-semibold bg-brand-bg/30">
              <tr>
                <th className="p-4 pl-6">Customer</th>
                <th className="p-4">Contact Info</th>
                <th className="p-4">Aadhar / ID</th>
                <th className="p-4 text-center">KYC Verified</th>
                <th className="p-4">Bank Details (DBT)</th>
                <th className="p-4">Onboarding Date</th>
                <th className="p-4 pr-6">Acct Status</th>
              </tr>
            </thead>
            <tbody className="text-brand-gray">
              {KYC_REPORT.map((row, i) => (
                <tr key={i} className="border-b border-brand-bg/50 hover:bg-brand-bg/10">
                  <td className="p-4 pl-6 font-semibold text-brand-dark">{row.name} <br/><span className="text-xs font-normal text-brand-gray">{row.id}</span></td>
                  <td className="p-4 font-medium text-brand-dark">{row.contact}</td>
                  <td className="p-4 font-mono text-xs">{row.aadhar}</td>
                  <td className="p-4 text-center">
                    {row.kyc ? <CheckCircle className="w-5 h-5 text-green-500 mx-auto" /> : <XCircle className="w-5 h-5 text-red-500 mx-auto" />}
                  </td>
                  <td className="p-4">{row.bank}</td>
                  <td className="p-4">{row.onbd}</td>
                  <td className="p-4 pr-6">
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{row.status}</span>
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