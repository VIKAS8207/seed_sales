"use client";
import { useState } from "react";
import { 
  Search, Filter, Plus, ShieldCheck, Key, Lock, 
  Mail, Smartphone, ShieldAlert, X, MoreVertical, 
  RefreshCw, Send, Unlock
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Mock Data for Portal Access
const MOCK_USERS = [
  { id: "USR-1001", customerId: "CUST-001", name: "Ramesh Kumar Patel", society: "Kisan Agro", username: "ramesh.k", status: "Active", lastLogin: "23 Jul 2026, 10:45 AM", twoFactor: true },
  { id: "USR-1002", customerId: "CUST-002", name: "Suresh Rao", society: "Vidarbha DDA", username: "suresh_rao99", status: "Pending Activation", lastLogin: "Never logged in", twoFactor: false },
  { id: "USR-1003", customerId: "CUST-004", name: "Amit Singh", society: "Bastar Tribal", username: "amit_bastar", status: "Locked", lastLogin: "20 Jul 2026, 09:12 AM", twoFactor: false },
  { id: "USR-1004", customerId: "CUST-005", name: "Priya Sharma", society: "Narmada Valley", username: "priya_sharma", status: "Active", lastLogin: "22 Jul 2026, 04:30 PM", twoFactor: true },
];

export default function UserAccessManagement() {
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [tempPassword, setTempPassword] = useState("");

  // Function to simulate secure password generation
  const generatePassword = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < 12; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setTempPassword(password);
  };

  return (
    <div className="p-8 pt-4 w-full max-w-[1400px] mx-auto">
      
      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-brand-dark mb-1">Portal Access & Security</h1>
          <p className="text-brand-gray text-sm">Provision digital access, manage passwords, and monitor account security.</p>
        </div>
        <button 
          onClick={() => { setIsProvisionModalOpen(true); setTempPassword(""); }}
          className="px-5 py-2.5 bg-brand-primary text-brand-dark font-semibold rounded-xl flex items-center gap-2 hover:bg-[#8CD85F] transition shadow-sm"
        >
          <Plus className="w-5 h-5" /> Provision New Access
        </button>
      </div>

      {/* Security Overview Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard title="ACTIVE PORTAL USERS" value="18,204" subtitle="Currently enabled" icon={<ShieldCheck className="w-5 h-5 text-emerald-600" />} iconBg="bg-emerald-50" />
        <StatCard title="PENDING ACTIVATION" value="450" subtitle="Temp passwords unused" icon={<Key className="w-5 h-5 text-blue-600" />} iconBg="bg-blue-50" />
        <StatCard title="LOCKED ACCOUNTS" value="28" subtitle="Failed login attempts" icon={<Lock className="w-5 h-5 text-red-600" />} iconBg="bg-red-50" />
        <StatCard title="2FA ADOPTION" value="42%" subtitle="Of total active users" icon={<Smartphone className="w-5 h-5 text-purple-600" />} iconBg="bg-purple-50" />
      </div>

      {/* Access Table */}
      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm flex flex-col">
        <div className="p-5 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20 rounded-t-2xl">
          <div className="flex gap-4 items-center w-full max-w-2xl">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
              <input type="text" placeholder="Search Username or Customer Name..." className="w-full pl-9 pr-4 py-2 bg-brand-white border border-brand-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm text-brand-dark" />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray font-medium hover:bg-brand-bg/50 transition">
              <Filter className="w-4 h-4" /> Status: All
            </button>
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-brand-dark font-semibold bg-brand-bg/30">
              <tr>
                <th className="p-4 pl-6">Portal User</th>
                <th className="p-4">Customer & Society Link</th>
                <th className="p-4">Security Level</th>
                <th className="p-4">Last Login</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Access Control</th>
              </tr>
            </thead>
            <tbody className="text-brand-gray">
              {MOCK_USERS.map((user, i) => (
                <tr key={user.id} className="hover:bg-brand-bg/10 transition border-b border-brand-bg/50 last:border-0">
                  <td className="p-4 pl-6">
                    <div className="font-bold text-brand-dark">@{user.username}</div>
                    <div className="text-xs text-brand-gray mt-0.5">{user.id}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-brand-dark">{user.name}</div>
                    <div className="text-xs text-brand-gray mt-0.5">{user.customerId} • {user.society}</div>
                  </td>
                  <td className="p-4">
                    {user.twoFactor ? (
                      <span className="flex items-center gap-1.5 text-emerald-600 font-semibold text-xs"><ShieldCheck className="w-4 h-4" /> 2FA Enabled</span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-yellow-600 font-semibold text-xs"><ShieldAlert className="w-4 h-4" /> Standard Auth</span>
                    )}
                  </td>
                  <td className="p-4">{user.lastLogin}</td>
                  <td className="p-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold 
                      ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 
                        user.status === 'Locked' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4 pr-6 text-right">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="px-3 py-1.5 bg-brand-bg/50 text-brand-dark hover:bg-brand-primary hover:text-brand-dark font-medium rounded-lg transition flex items-center gap-2 ml-auto"
                    >
                      <Key className="w-4 h-4" /> Manage
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PaginationFooter />
      </div>

      {/* Provision New Access Modal */}
      <AnimatePresence>
        {isProvisionModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsProvisionModalOpen(false)} className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-brand-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20">
                <h2 className="text-xl font-bold text-brand-dark">Provision Digital Access</h2>
                <button onClick={() => setIsProvisionModalOpen(false)} className="p-2 bg-brand-white border border-brand-bg rounded-full text-brand-gray hover:text-brand-dark hover:bg-brand-bg/50 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 overflow-y-auto space-y-6">
                
                {/* Step 1: Link Customer */}
                <div className="bg-brand-primary/5 border border-brand-primary/30 p-5 rounded-xl">
                  <label className="block text-sm font-semibold text-brand-dark mb-1.5">Step 1: Select Existing Customer Profile</label>
                  <p className="text-xs text-brand-gray mb-3">Only customers without active portal credentials will appear here.</p>
                  <select className="w-full px-4 py-3 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark font-medium">
                    <option value="" disabled selected>Search & Select Customer...</option>
                    <option>Rajesh Kumar (CUST-088) - Vidarbha DDA</option>
                    <option>Sita Devi (CUST-092) - Kisan Agro</option>
                  </select>
                </div>

                {/* Step 2: Credentials */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Step 2: Assign Username</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray font-semibold">@</span>
                      <input type="text" placeholder="rajesh.kumar" className="w-full pl-8 pr-4 py-3 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark mb-1.5">Step 3: Generate Password</label>
                    <div className="flex gap-2">
                      <input type="text" readOnly value={tempPassword} placeholder="Click to generate" className="w-full px-4 py-3 bg-brand-bg/40 border border-brand-bg rounded-xl text-brand-dark font-mono text-sm tracking-wide" />
                      <button onClick={generatePassword} className="px-4 py-3 bg-brand-bg border border-brand-bg rounded-xl hover:bg-brand-bg/80 text-brand-dark transition">
                        <RefreshCw className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 4: Dispatch Method */}
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">Step 4: Dispatch Credentials via</label>
                  <div className="flex gap-4">
                    <label className="flex-1 flex items-center gap-3 p-4 border border-brand-bg rounded-xl cursor-pointer hover:border-brand-primary transition">
                      <input type="radio" name="dispatch" className="w-4 h-4 text-brand-primary focus:ring-brand-primary" defaultChecked />
                      <Mail className="w-5 h-5 text-brand-gray" />
                      <div>
                        <div className="font-semibold text-brand-dark text-sm">Email Access Link</div>
                        <div className="text-xs text-brand-gray">Sends to registered email</div>
                      </div>
                    </label>
                    <label className="flex-1 flex items-center gap-3 p-4 border border-brand-bg rounded-xl cursor-pointer hover:border-brand-primary transition">
                      <input type="radio" name="dispatch" className="w-4 h-4 text-brand-primary focus:ring-brand-primary" />
                      <Smartphone className="w-5 h-5 text-brand-gray" />
                      <div>
                        <div className="font-semibold text-brand-dark text-sm">SMS OTP & Link</div>
                        <div className="text-xs text-brand-gray">Sends to registered mobile</div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-800 leading-relaxed">
                    <strong>Security Note:</strong> The generated password is temporary. The customer will be forced to change it and setup 2FA upon their first successful login. The temporary link expires in 24 hours.
                  </p>
                </div>

              </div>

              <div className="p-6 border-t border-brand-bg bg-brand-bg/10 flex justify-end gap-3">
                <button onClick={() => setIsProvisionModalOpen(false)} className="px-6 py-2.5 border border-brand-bg rounded-xl text-brand-dark font-semibold hover:bg-brand-bg/50 transition">Cancel</button>
                <button className="px-6 py-2.5 bg-brand-primary text-brand-dark font-bold rounded-xl hover:bg-[#8CD85F] transition shadow-sm flex items-center gap-2">
                  <Send className="w-4 h-4" /> Provision & Dispatch
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Manage Existing User Slide-out */}
      <AnimatePresence>
        {selectedUser && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedUser(null)} className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" />
            
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-brand-white h-full shadow-2xl flex flex-col border-l border-brand-bg"
            >
              <div className="p-6 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20">
                <h2 className="text-xl font-bold text-brand-dark">Security Controls</h2>
                <button onClick={() => setSelectedUser(null)} className="p-2 bg-brand-white border border-brand-bg rounded-full text-brand-gray hover:text-brand-dark hover:bg-brand-bg/50">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-6 flex-1 overflow-y-auto space-y-6">
                
                {/* User Identity */}
                <div className="flex items-center gap-4 border-b border-brand-bg border-dashed pb-6">
                  <div className="w-14 h-14 bg-brand-primary/20 text-brand-dark font-bold text-xl rounded-full flex items-center justify-center">
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-brand-dark text-lg">{selectedUser.name}</h3>
                    <p className="text-sm font-medium text-brand-gray">@{selectedUser.username}</p>
                    <span className={`mt-2 inline-block px-2 py-1 rounded text-[10px] font-bold uppercase ${selectedUser.status === 'Locked' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                      {selectedUser.status}
                    </span>
                  </div>
                </div>

                {/* Security Actions */}
                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-brand-dark uppercase tracking-wide">Account Actions</h4>
                  
                  {selectedUser.status === 'Locked' ? (
                     <button className="w-full p-4 border border-green-200 bg-green-50 hover:bg-green-100 rounded-xl flex items-center gap-4 transition text-left">
                      <div className="p-2 bg-green-200 text-green-700 rounded-lg"><Unlock className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold text-brand-dark">Unlock Account</div>
                        <div className="text-xs text-brand-gray">Restore access for this user</div>
                      </div>
                    </button>
                  ) : (
                    <button className="w-full p-4 border border-red-200 bg-red-50 hover:bg-red-100 rounded-xl flex items-center gap-4 transition text-left">
                      <div className="p-2 bg-red-200 text-red-700 rounded-lg"><Lock className="w-5 h-5" /></div>
                      <div>
                        <div className="font-bold text-brand-dark">Force Account Lock</div>
                        <div className="text-xs text-brand-gray">Immediately suspend all active sessions</div>
                      </div>
                    </button>
                  )}

                  <button className="w-full p-4 border border-brand-bg bg-brand-white hover:bg-brand-bg/50 rounded-xl flex items-center gap-4 transition text-left">
                    <div className="p-2 bg-brand-bg text-brand-dark rounded-lg"><Key className="w-5 h-5" /></div>
                    <div>
                      <div className="font-bold text-brand-dark">Reset Password</div>
                      <div className="text-xs text-brand-gray">Invalidate current & email a reset link</div>
                    </div>
                  </button>

                  <button className="w-full p-4 border border-brand-bg bg-brand-white hover:bg-brand-bg/50 rounded-xl flex items-center gap-4 transition text-left">
                    <div className="p-2 bg-brand-bg text-brand-dark rounded-lg"><Smartphone className="w-5 h-5" /></div>
                    <div>
                      <div className="font-bold text-brand-dark">Reset 2FA Devices</div>
                      <div className="text-xs text-brand-gray">Clear authenticator app associations</div>
                    </div>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function StatCard({ title, value, subtitle, icon, iconBg }: any) {
  return (
    <div className="bg-brand-white border border-brand-bg rounded-2xl p-5 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xs font-semibold text-brand-gray uppercase tracking-wide w-2/3 leading-tight">{title}</h4>
        <div className={`p-2 rounded-lg ${iconBg}`}>{icon}</div>
      </div>
      <div>
        <div className="text-2xl font-bold text-brand-dark mb-1">{value}</div>
        <div className="text-xs font-medium text-brand-gray/70">{subtitle}</div>
      </div>
    </div>
  );
}

const PaginationFooter = () => (
  <div className="p-4 border-t border-brand-bg flex justify-between items-center bg-brand-white rounded-b-2xl">
    <span className="text-sm text-brand-gray font-medium pl-2">Showing 1 to 4 of 18,204 users</span>
    <div className="flex gap-1">
      <button className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50">{'<'}</button>
      <button className="w-8 h-8 flex items-center justify-center border border-brand-primary bg-brand-primary/10 rounded-md text-brand-dark font-semibold">1</button>
      <button className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50 font-medium">2</button>
      <button className="w-8 h-8 flex items-center justify-center border border-brand-bg rounded-md text-brand-gray hover:bg-brand-bg/50">{'>'}</button>
    </div>
  </div>
);