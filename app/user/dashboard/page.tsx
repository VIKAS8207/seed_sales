"use client";
import { 
  ShoppingBag, Wallet, ShieldCheck, Clock, Scale, 
  BellRing, ArrowDownUp, SlidersHorizontal 
} from "lucide-react";
import { motion } from "framer-motion";

export default function UserDashboard() {
  return (
    <div className="p-8 pt-10 w-full max-w-[1400px] mx-auto">
      
      {/* 5-Column Stat Cards (User Perspective) */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <StatCard 
          title="TOTAL PURCHASES" 
          value="₹4.2L" 
          subtitle="Current FY" 
          icon={<ShoppingBag className="w-5 h-5 text-brand-dark" />} 
          iconBg="bg-brand-primary/20" 
        />
        <StatCard 
          title="OUTSTANDING DUE" 
          value="₹45,000" 
          subtitle="Pay by 15th Aug" 
          icon={<Wallet className="w-5 h-5 text-red-600" />} 
          iconBg="bg-red-50" 
        />
        <StatCard 
          title="SCHEME SUBSIDY" 
          value="₹28,500" 
          subtitle="DBT Applied" 
          icon={<ShieldCheck className="w-5 h-5 text-brand-dark" />} 
          iconBg="bg-brand-primary/20" 
        />
        <StatCard 
          title="PENDING APPROVALS" 
          value="2" 
          subtitle="DDA Verification" 
          icon={<Clock className="w-5 h-5 text-brand-gray" />} 
          iconBg="bg-brand-bg" 
        />
        <StatCard 
          title="TOTAL SEED QTY" 
          value="5,200 kg" 
          subtitle="Across 3 varieties" 
          icon={<Scale className="w-5 h-5 text-brand-dark" />} 
          iconBg="bg-brand-primary/20" 
        />
      </div>

      {/* User Alerts / Notifications Box */}
      <div className="bg-brand-primary/10 border border-brand-primary/30 rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-brand-dark">
          <BellRing className="w-5 h-5 text-brand-primary" />
          <h3 className="font-semibold text-lg">Action Items & Updates</h3>
        </div>
        <ul className="space-y-2 text-sm text-brand-dark/80 ml-7 list-disc">
          <li>You have an <strong>outstanding balance of ₹45,000</strong>. Please clear this by 15th Aug to avoid late penalties.</li>
          <li>Your recent order for <strong>Soybean - JS 335 (1,200 kg)</strong> is awaiting treasury approval.</li>
          <li>New government subsidy schemes for Rabi crops are now active. <a href="#" className="text-brand-primary font-semibold hover:underline">Apply here</a>.</li>
        </ul>
      </div>

      {/* Middle Section: Charts */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        
        {/* Bar Chart: Purchase vs Payment History */}
        <div className="col-span-2 bg-brand-white border border-brand-bg rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-brand-dark mb-6 text-lg">Purchase & Payment History</h3>
          <div className="relative h-64 w-full flex items-end justify-between pb-6 pl-10">
            {/* Y-Axis Labels */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-brand-gray/50 font-medium">
              <span>100k</span><span>80k</span><span>60k</span><span>40k</span><span>20k</span><span>0</span>
            </div>
            {/* Horizontal Grid Lines */}
            <div className="absolute left-10 right-0 top-0 bottom-6 flex flex-col justify-between">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-full border-t border-brand-bg border-dashed" />
              ))}
            </div>
            {/* Animated Bars */}
            {["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map((month, i) => {
              const purchaseHeight = Math.random() * 40 + 30; // Total Bought
              const paymentHeight = purchaseHeight - (Math.random() * 20); // Amount Paid
              return (
                <div key={month} className="relative group flex items-end justify-center gap-1 flex-1 z-10 h-full">
                  {/* Total Purchase Bar (Dark Green) */}
                  <motion.div 
                    initial={{ height: 0 }} animate={{ height: `${purchaseHeight}%` }} 
                    transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                    className="w-4 rounded-t-sm bg-brand-dark opacity-30"
                  />
                  {/* Paid Amount Bar (Primary Green) */}
                  <motion.div 
                    initial={{ height: 0 }} animate={{ height: `${paymentHeight}%` }} 
                    transition={{ duration: 0.8, delay: i * 0.05 + 0.2, ease: "easeOut" }}
                    className="w-4 rounded-t-sm bg-brand-primary"
                  />
                  <span className="absolute -bottom-6 text-xs text-brand-gray font-medium">{month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-6 mt-4 text-xs font-medium text-brand-gray">
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-brand-dark opacity-30" /> Total Billed</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-brand-primary" /> Amount Paid</div>
          </div>
        </div>

        {/* Donut Chart: Seed Portfolio (What they bought) */}
        <div className="bg-brand-white border border-brand-bg rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="font-semibold text-brand-dark mb-6 text-lg">Your Seed Portfolio</h3>
          <div className="relative flex-1 flex flex-col items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-48 h-48 transform -rotate-90">
              {/* Paddy (Gray) */}
              <circle cx="50" cy="50" r="40" stroke="var(--color-brand-gray)" strokeWidth="16" fill="transparent" />
              
              {/* Soybean (Dark Green) */}
              <motion.circle 
                cx="50" cy="50" r="40" stroke="var(--color-brand-dark)" strokeWidth="16" fill="transparent" 
                strokeDasharray="251.2" initial={{ strokeDashoffset: 251.2 }} animate={{ strokeDashoffset: 100 }} 
                transition={{ duration: 1, delay: 0.2 }}
              />
              
              {/* Wheat (Primary Light Green) */}
               <motion.circle 
                cx="50" cy="50" r="40" stroke="var(--color-brand-primary)" strokeWidth="16" fill="transparent" 
                strokeDasharray="251.2" initial={{ strokeDashoffset: 251.2 }} animate={{ strokeDashoffset: 160 }} 
                transition={{ duration: 1, delay: 0.4 }}
              />
            </svg>
            <div className="absolute text-center flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-brand-dark">5.2k</span>
              <span className="text-xs text-brand-gray font-medium">Total Kg</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6 text-sm font-medium text-brand-gray w-full px-4">
             <div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-brand-primary" /> Wheat - Lok 1</div><span className="text-brand-dark">45%</span></div>
             <div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-brand-dark" /> Soybean - JS 335</div><span className="text-brand-dark">35%</span></div>
             <div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-brand-gray" /> Paddy - IR 64</div><span className="text-brand-dark">20%</span></div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Orders & Ledger */}
      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm overflow-hidden">
         <div className="flex justify-between items-center p-6 border-b border-brand-bg">
            <h3 className="font-semibold text-brand-dark text-lg">Recent Orders & Transactions</h3>
            <div className="flex gap-3">
              <button className="flex items-center gap-2 text-sm text-brand-gray px-3 py-1.5 border border-brand-bg rounded-lg hover:bg-brand-bg/50">
                <ArrowDownUp className="w-4 h-4" /> Sort
              </button>
              <button className="flex items-center gap-2 text-sm text-brand-gray px-3 py-1.5 border border-brand-bg rounded-lg hover:bg-brand-bg/50">
                <SlidersHorizontal className="w-4 h-4" /> Filter
              </button>
            </div>
         </div>
         
         <div className="w-full overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-brand-dark font-semibold bg-brand-bg/20">
                <tr>
                  <th className="p-4 pl-6">Date</th>
                  <th className="p-4">Order ID</th>
                  <th className="p-4">Seed Variety</th>
                  <th className="p-4">Quantity</th>
                  <th className="p-4">Total Amount</th>
                  <th className="p-4 pr-6">Status</th>
                </tr>
              </thead>
              <tbody className="text-brand-gray">
                {[
                  { date: "12 Aug 2026", id: "ORD-9932", seed: "Wheat - Lok 1 (Certified)", qty: "2,000 kg", amount: "₹90,000", status: "Delivered", statusColor: "bg-green-100 text-green-700" },
                  { date: "05 Aug 2026", id: "ORD-9841", seed: "Soybean - JS 335 (Foundation)", qty: "1,200 kg", amount: "₹98,400", status: "Pending Approval", statusColor: "bg-yellow-100 text-yellow-700" },
                  { date: "22 Jul 2026", id: "ORD-9755", seed: "Paddy - IR 64 (Certified)", qty: "500 kg", amount: "₹19,000", status: "Payment Due", statusColor: "bg-red-100 text-red-700" },
                  { date: "10 Jun 2026", id: "ORD-9510", seed: "Maize - Ganga 5 (Breeder)", qty: "1,500 kg", amount: "₹97,500", status: "Delivered", statusColor: "bg-green-100 text-green-700" }
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-brand-bg/10 transition border-b border-brand-bg/50 last:border-0">
                    <td className="p-4 pl-6">{row.date}</td>
                    <td className="p-4 font-medium text-brand-dark">{row.id}</td>
                    <td className="p-4">{row.seed}</td>
                    <td className="p-4 font-medium">{row.qty}</td>
                    <td className="p-4 font-semibold text-brand-dark">{row.amount}</td>
                    <td className="p-4 pr-6">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${row.statusColor}`}>
                        {row.status}
                      </span>
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

/* Helper Component: Top 5 Stat Cards */
function StatCard({ title, value, subtitle, icon, iconBg }: any) {
  return (
    <div className="bg-brand-white border border-brand-bg rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xs font-semibold text-brand-gray uppercase tracking-wide w-2/3 leading-tight">{title}</h4>
        <div className={`p-2 rounded-lg ${iconBg}`}>
          {icon}
        </div>
      </div>
      <div>
        <div className="text-2xl font-bold text-brand-dark mb-1">{value}</div>
        <div className="text-xs font-medium text-brand-gray/70">{subtitle}</div>
      </div>
    </div>
  );
}