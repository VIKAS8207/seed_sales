"use client";
import { Users, FileText, Clock, AlertCircle, TrendingUp, AlertOctagon } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  return (
    <div className="p-8 pt-10 w-full max-w-[1400px] mx-auto">
      
      {/* 5-Column Stat Cards (Updated with Brand Palette) */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        <StatCard 
          title="TOTAL CUSTOMERS" 
          value="1,250" 
          subtitle="31 locations" 
          icon={<Users className="w-5 h-5 text-brand-dark" />} 
          iconBg="bg-brand-primary/20" 
        />
        <StatCard 
          title="TOTAL INVOICES" 
          value="2,456" 
          subtitle="This month" 
          icon={<FileText className="w-5 h-5 text-brand-dark" />} 
          iconBg="bg-brand-primary/20" 
        />
        <StatCard 
          title="PENDING APPROVALS" 
          value="12" 
          subtitle="Treasury docs" 
          icon={<Clock className="w-5 h-5 text-brand-gray" />} 
          iconBg="bg-brand-bg" 
        />
        <StatCard 
          title="OUTSTANDING AMOUNT" 
          value="₹45.2L" 
          subtitle="Across all customers" 
          icon={<AlertCircle className="w-5 h-5 text-brand-dark" />} 
          iconBg="bg-brand-bg" 
        />
        <StatCard 
          title="COLLECTED THIS MONTH" 
          value="₹78.5L" 
          subtitle="↑ 12% vs last month" 
          icon={<TrendingUp className="w-5 h-5 text-brand-dark" />} 
          iconBg="bg-brand-primary/20" 
        />
      </div>

      {/* Urgent Actions Alert Box (Kept semantic red for urgency) */}
      <div className="bg-[#FFF8F8] border border-[#FAD2D2] rounded-2xl p-5 mb-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-red-600">
          <AlertOctagon className="w-5 h-5" />
          <h3 className="font-semibold text-lg">Urgent Actions Required</h3>
        </div>
        <ul className="space-y-2 text-sm text-[#B91C1C] ml-7 list-disc">
          <li><strong>5 Overdue invoices</strong> exceeding 60 days pending collection action</li>
          <li><strong>8 Treasury documents</strong> pending verification and approval</li>
          <li><strong>3 Payment failures</strong> requiring customer follow-up</li>
        </ul>
      </div>

      {/* Middle Section: Charts */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        
        {/* Bar Chart: Monthly Collections */}
        <div className="col-span-2 bg-brand-white border border-brand-bg rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-brand-dark mb-6 text-lg">Collection Overview</h3>
          <div className="relative h-64 w-full flex items-end justify-between pb-6 pl-10">
            {/* Y-Axis Labels */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-xs text-brand-gray/50 font-medium">
              <span>100L</span><span>80L</span><span>60L</span><span>40L</span><span>20L</span><span>0</span>
            </div>
            {/* Horizontal Grid Lines */}
            <div className="absolute left-10 right-0 top-0 bottom-6 flex flex-col justify-between">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="w-full border-t border-brand-bg border-dashed" />
              ))}
            </div>
            {/* Animated Bars */}
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"].map((month, i) => {
              const height1 = Math.random() * 40 + 20; // Target
              const height2 = height1 - (Math.random() * 20); // Actual
              return (
                <div key={month} className="relative group flex items-end justify-center gap-1 flex-1 z-10 h-full">
                  {/* Background/Target Bar (Dark Green) */}
                  <motion.div 
                    initial={{ height: 0 }} animate={{ height: `${height1}%` }} 
                    transition={{ duration: 0.8, delay: i * 0.05, ease: "easeOut" }}
                    className="w-3 rounded-t-sm bg-brand-dark opacity-20"
                  />
                  {/* Actual Value Bar (Primary Green) */}
                  <motion.div 
                    initial={{ height: 0 }} animate={{ height: `${height2}%` }} 
                    transition={{ duration: 0.8, delay: i * 0.05 + 0.2, ease: "easeOut" }}
                    className="w-3 rounded-t-sm bg-brand-primary"
                  />
                  <span className="absolute -bottom-6 text-xs text-brand-gray font-medium">{month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-6 mt-4 text-xs font-medium text-brand-gray">
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-brand-primary" /> Collected Amount</div>
             <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-brand-dark opacity-20" /> Target Amount</div>
          </div>
        </div>

        {/* Donut Chart: Invoice Status */}
        <div className="bg-brand-white border border-brand-bg rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="font-semibold text-brand-dark mb-6 text-lg">Invoice Status</h3>
          <div className="relative flex-1 flex flex-col items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-48 h-48 transform -rotate-90">
              {/* Background (Overdue - Dark Gray) */}
              <circle cx="50" cy="50" r="40" stroke="var(--color-brand-gray)" strokeWidth="16" fill="transparent" />
              
              {/* Pending (Dark Green) */}
              <motion.circle 
                cx="50" cy="50" r="40" stroke="var(--color-brand-dark)" strokeWidth="16" fill="transparent" 
                strokeDasharray="251.2" initial={{ strokeDashoffset: 251.2 }} animate={{ strokeDashoffset: 60 }} 
                transition={{ duration: 1, delay: 0.2 }}
              />
              
              {/* Paid (Primary Light Green) */}
               <motion.circle 
                cx="50" cy="50" r="40" stroke="var(--color-brand-primary)" strokeWidth="16" fill="transparent" 
                strokeDasharray="251.2" initial={{ strokeDashoffset: 251.2 }} animate={{ strokeDashoffset: 140 }} 
                transition={{ duration: 1, delay: 0.4 }}
              />
            </svg>
            <div className="absolute text-center flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-brand-dark">2,456</span>
              <span className="text-xs text-brand-gray font-medium">Total Invoices</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-6 text-sm font-medium text-brand-gray w-full px-4">
             <div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-brand-primary" /> Paid</div><span className="text-brand-dark">55%</span></div>
             <div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-brand-dark" /> Pending</div><span className="text-brand-dark">32%</span></div>
             <div className="flex justify-between items-center"><div className="flex items-center gap-2"><div className="w-3 h-3 rounded-sm bg-brand-gray" /> Overdue</div><span className="text-brand-dark">13%</span></div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Outstanding Breakdown (Refined Colors) */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-brand-white border border-brand-bg rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-brand-dark mb-6 text-lg">Outstanding Breakdown</h3>
          <div className="space-y-6">
            <ProgressBar label="Current (0-30 days)" value="₹18.5L" percentage={60} color="bg-brand-primary" textColor="text-brand-dark" />
            <ProgressBar label="30-60 days" value="₹16.7L" percentage={45} color="bg-brand-dark" textColor="text-brand-dark" />
            <ProgressBar label="60+ days (Overdue)" value="₹10.0L" percentage={25} color="bg-brand-gray" textColor="text-brand-gray" />
          </div>
        </div>

        <div className="bg-brand-white border border-brand-bg rounded-2xl p-6 shadow-sm">
          <h3 className="font-semibold text-brand-dark mb-6 text-lg">Payment Methods</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-brand-bg/50 rounded-xl border border-brand-bg">
              <span className="font-medium text-brand-dark">Society - Online Payment</span>
              <span className="font-semibold text-brand-dark">₹45.3L</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-brand-bg/50 rounded-xl border border-brand-bg">
              <span className="font-medium text-brand-dark">DDA - Treasury Payment</span>
              <span className="font-semibold text-brand-dark">₹33.2L</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-brand-bg/50 rounded-xl border border-brand-bg">
              <span className="font-medium text-brand-dark">Manual Cheque</span>
              <span className="font-semibold text-brand-gray">₹10.1L</span>
            </div>
          </div>
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

/* Helper Component: Animated Progress Bar */
function ProgressBar({ label, value, percentage, color, textColor }: any) {
  return (
    <div>
      <div className="flex justify-between text-sm font-medium mb-2">
        <span className="text-brand-dark">{label}</span>
        <span className={`font-bold ${textColor}`}>{value}</span>
      </div>
      <div className="w-full h-2.5 bg-brand-bg rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }} 
          animate={{ width: `${percentage}%` }} 
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );
}