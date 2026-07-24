"use client";
import { useState, useMemo } from "react";
import { 
  Search, Filter, Eye, X, CheckCircle2, AlertCircle, 
  Clock, Landmark, FileText, Download, ChevronLeft, Check, XCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- MOCK DATA ---
const MOCK_REQUESTS = [
  { id: "TRQ-26-092", invoiceId: "INV-26-0742", date: "05 Aug 2026", user: "Suresh Rao", scheme: "DDA Relief Fund", amount: 98400, status: "Pending Verification" },
  { id: "TRQ-26-095", invoiceId: "INV-26-0811", date: "10 Aug 2026", user: "Ramesh Patel", scheme: "Krishi Vikas Yojana", amount: 45000, status: "Pending Verification" },
];

const MOCK_HISTORY = [
  { id: "TRQ-26-081", invoiceId: "INV-26-0610", date: "22 Jul 2026", user: "Amit Singh", scheme: "State Tribal Seed Grant", amount: 19000, status: "Approved" },
  { id: "TRQ-26-075", invoiceId: "INV-26-0501", date: "15 Jun 2026", user: "Vikram Das", scheme: "Krishi Vikas Yojana", amount: 25000, status: "Rejected", remark: "Invalid authorization document." },
];

export default function TreasuryPage() {
  // Navigation & Tabs
  const [activeTab, setActiveTab] = useState<'requests' | 'history'>('requests');
  
  // Data States
  const [pendingRequests, setPendingRequests] = useState(MOCK_REQUESTS);
  const [historyRequests, setHistoryRequests] = useState(MOCK_HISTORY);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterScheme, setFilterScheme] = useState("All");

  // Panel & Action States
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectRemark, setRejectRemark] = useState("");
  const [showAcceptSuccess, setShowAcceptSuccess] = useState(false);

  // Filter Logic
  const activeData = activeTab === 'requests' ? pendingRequests : historyRequests;
  
  const filteredData = useMemo(() => {
    return activeData.filter(req => {
      const matchesSearch = req.id.toLowerCase().includes(searchQuery.toLowerCase()) || req.invoiceId.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesScheme = filterScheme === "All" || req.scheme === filterScheme;
      return matchesSearch && matchesScheme;
    });
  }, [activeData, searchQuery, filterScheme]);

  const uniqueSchemes = ["All", ...Array.from(new Set([...pendingRequests, ...historyRequests].map(req => req.scheme)))];

  // Action Handlers
  const handleTabChange = (tab: 'requests' | 'history') => {
    setActiveTab(tab);
    setSearchQuery("");
  };

  const openDocumentPanel = (req: any) => {
    setSelectedRequest(req);
  };

  const handleAccept = () => {
    // Move to history
    const updatedRequest = { ...selectedRequest, status: "Approved" };
    setPendingRequests(pendingRequests.filter(req => req.id !== selectedRequest.id));
    setHistoryRequests([updatedRequest, ...historyRequests]);
    
    // UI Updates
    setSelectedRequest(null);
    setShowAcceptSuccess(true);
    setTimeout(() => setShowAcceptSuccess(false), 3000);
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Move to history with remark
    const updatedRequest = { ...selectedRequest, status: "Rejected", remark: rejectRemark };
    setPendingRequests(pendingRequests.filter(req => req.id !== selectedRequest.id));
    setHistoryRequests([updatedRequest, ...historyRequests]);

    // UI Updates
    setIsRejectModalOpen(false);
    setRejectRemark("");
    setSelectedRequest(null);
  };

  return (
    <div className="p-8 pt-10 w-full max-w-[1400px] mx-auto min-h-screen flex flex-col font-sans">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-brand-dark mb-1">Treasury Approvals</h1>
        <p className="text-brand-gray text-sm">Review, verify, and approve treasury subsidy claims.</p>
      </div>

      {/* Metrics Module */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <StatCard title="PENDING REQUESTS" value={pendingRequests.length.toString()} subtitle="Awaiting Verification" icon={<Clock className="w-6 h-6 text-yellow-600" />} iconBg="bg-yellow-50" />
        <StatCard title="APPROVED CLAIMS" value={historyRequests.filter(h => h.status === 'Approved').length.toString()} subtitle="Successfully Processed" icon={<CheckCircle2 className="w-6 h-6 text-emerald-600" />} iconBg="bg-emerald-50" />
        <StatCard title="REJECTED CLAIMS" value={historyRequests.filter(h => h.status === 'Rejected').length.toString()} subtitle="Requires Correction" icon={<XCircle className="w-6 h-6 text-red-600" />} iconBg="bg-red-50" />
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-6 border-b border-brand-bg pb-px">
        <button 
          onClick={() => handleTabChange('requests')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'requests' ? 'border-brand-primary text-brand-dark' : 'border-transparent text-brand-gray hover:text-brand-dark'}`}
        >
          Pending Requests
          {pendingRequests.length > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-brand-primary text-brand-dark font-bold text-[10px]">{pendingRequests.length} New</span>
          )}
        </button>
        <button 
          onClick={() => handleTabChange('history')}
          className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${activeTab === 'history' ? 'border-brand-primary text-brand-dark' : 'border-transparent text-brand-gray hover:text-brand-dark'}`}
        >
          Approval History
        </button>
      </div>

      {/* Table Section */}
      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm flex flex-col flex-1">
        
        {/* Filters */}
        <div className="p-5 border-b border-brand-bg flex justify-between items-center bg-brand-bg/20 rounded-t-2xl">
          <div className="flex gap-4 items-center w-full max-w-2xl">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray/60" />
              <input 
                type="text" 
                placeholder="Search Request or Invoice ID..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-brand-white border border-brand-bg rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-sm text-brand-dark" 
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-brand-gray" />
              <select 
                value={filterScheme} 
                onChange={(e) => setFilterScheme(e.target.value)} 
                className="px-3 py-2 border border-brand-bg bg-brand-white rounded-lg text-sm text-brand-gray font-medium focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
              >
                {uniqueSchemes.map(scheme => <option key={scheme} value={scheme}>{scheme === "All" ? "Scheme: All" : scheme}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* Data List */}
        <div className="w-full overflow-x-auto min-h-[400px]">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-brand-dark font-semibold bg-brand-bg/30">
              <tr>
                <th className="p-4 pl-6">Request ID & Date</th>
                <th className="p-4">Linked Invoice</th>
                <th className="p-4">User & Scheme</th>
                <th className="p-4">Claim Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4 pr-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-brand-gray">
              {filteredData.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-brand-gray">No treasury records found.</td></tr>
              ) : (
                filteredData.map((req, i) => (
                  <tr key={req.id} className="hover:bg-brand-bg/10 transition border-b border-brand-bg/50 last:border-0">
                    <td className="p-4 pl-6">
                      <div className="font-semibold text-brand-dark">{req.id}</div>
                      <div className="text-xs text-brand-gray mt-0.5">{req.date}</div>
                    </td>
                    <td className="p-4 font-mono text-xs font-semibold text-brand-dark">{req.invoiceId}</td>
                    <td className="p-4">
                      <div className="font-medium text-brand-dark">{req.user}</div>
                      <div className="text-xs text-brand-gray mt-0.5">{req.scheme}</div>
                    </td>
                    <td className="p-4 font-bold text-brand-dark">₹{req.amount.toLocaleString('en-IN')}</td>
                    <td className="p-4">
                       <span className={`px-2.5 py-1.5 rounded-md text-xs font-semibold border
                        ${req.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200' : 
                          req.status === 'Rejected' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4 pr-6 text-right">
                      <button 
                        onClick={() => openDocumentPanel(req)}
                        className="px-4 py-2 bg-brand-white border border-brand-bg text-brand-dark hover:border-brand-primary hover:text-brand-primary font-medium rounded-lg transition flex items-center gap-2 ml-auto shadow-sm"
                      >
                        <Eye className="w-4 h-4" /> View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- LEFT SLIDE-OUT DOCUMENT PANEL --- */}
      <AnimatePresence>
        {selectedRequest && (
          <div className="fixed inset-0 z-[100] flex justify-start">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setSelectedRequest(null)} 
              className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" 
            />
            
            {/* Slide Panel (From LEFT) */}
            <motion.div 
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full max-w-2xl bg-[#F9FAFB] h-full shadow-2xl flex flex-col border-r border-brand-bg"
            >
              <div className="p-6 border-b border-brand-bg flex justify-between items-center bg-white shadow-sm z-10">
                <h2 className="text-xl font-bold text-brand-dark">Treasury Document Review</h2>
                <button onClick={() => setSelectedRequest(null)} className="p-2 bg-brand-white border border-brand-bg rounded-full text-brand-gray hover:text-brand-dark hover:bg-brand-bg/50 transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-8 flex-1 overflow-y-auto space-y-6">
                
                {/* Request Details */}
                <div className="bg-white p-6 rounded-xl border border-brand-bg shadow-sm grid grid-cols-2 gap-6">
                  <div>
                    <div className="text-xs font-bold text-brand-gray uppercase tracking-wider mb-1">Request ID</div>
                    <div className="font-bold text-brand-dark text-lg">{selectedRequest.id}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-gray uppercase tracking-wider mb-1">Linked Invoice</div>
                    <div className="font-mono text-brand-dark font-semibold text-lg">{selectedRequest.invoiceId}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-gray uppercase tracking-wider mb-1">Claim Amount</div>
                    <div className="font-bold text-brand-primary text-xl">₹{selectedRequest.amount.toLocaleString('en-IN')}</div>
                  </div>
                  <div>
                    <div className="text-xs font-bold text-brand-gray uppercase tracking-wider mb-1">Scheme Applied</div>
                    <div className="font-bold text-brand-dark">{selectedRequest.scheme}</div>
                  </div>
                </div>

                {/* History Remark Display */}
                {selectedRequest.status === 'Rejected' && (
                  <div className="bg-red-50 p-4 rounded-xl border border-red-100 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                    <div>
                      <div className="font-bold text-red-900 text-sm">Rejection Reason</div>
                      <div className="text-sm text-red-700 mt-1">{selectedRequest.remark}</div>
                    </div>
                  </div>
                )}

                {/* Document Viewer Placeholder */}
                <div className="flex-1 min-h-[400px] border-2 border-brand-bg bg-white rounded-xl flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-brand-bg/5 pattern-dots-sm text-brand-gray/20"></div>
                  <FileText className="w-16 h-16 text-brand-gray mb-4 relative z-10" />
                  <h3 className="text-lg font-bold text-brand-dark relative z-10">Verification Document.pdf</h3>
                  <p className="text-sm text-brand-gray mt-2 relative z-10">Uploaded by {selectedRequest.user} on {selectedRequest.date}</p>
                  <button className="mt-6 px-6 py-2 bg-brand-white border border-brand-bg rounded-lg text-brand-dark font-medium hover:bg-brand-bg/50 transition flex items-center gap-2 relative z-10 shadow-sm">
                    <Download className="w-4 h-4" /> Download to verify
                  </button>
                </div>
              </div>

              {/* Action Footer (Only show if pending) */}
              {selectedRequest.status === "Pending Verification" && (
                <div className="p-6 border-t border-brand-bg bg-white flex justify-end gap-4 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-10">
                  <button 
                    onClick={() => setIsRejectModalOpen(true)}
                    className="px-8 py-3 bg-red-50 text-red-600 border border-red-200 font-bold rounded-xl hover:bg-red-100 transition flex items-center gap-2"
                  >
                    <XCircle className="w-5 h-5" /> Reject Claim
                  </button>
                  <button 
                    onClick={handleAccept}
                    className="px-8 py-3 bg-brand-primary text-brand-dark font-bold rounded-xl hover:bg-[#8CD85F] transition shadow-md flex items-center gap-2"
                  >
                    <Check className="w-5 h-5" /> Approve & Process
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- REJECT REMARK MODAL --- */}
      <AnimatePresence>
        {isRejectModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsRejectModalOpen(false)} className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-brand-white rounded-2xl w-full max-w-lg relative z-10 shadow-2xl flex flex-col overflow-hidden"
            >
              <div className="p-6 border-b border-brand-bg flex justify-between items-center bg-red-50/50">
                <h2 className="text-xl font-bold text-red-600 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" /> Reject Treasury Claim
                </h2>
                <button onClick={() => setIsRejectModalOpen(false)} className="p-2 bg-brand-white border border-brand-bg rounded-lg text-brand-gray hover:text-brand-dark transition">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleRejectSubmit}>
                <div className="p-6">
                  <p className="text-sm text-brand-gray mb-4">Please provide a reason for rejecting this claim. This remark will be visible to the user.</p>
                  <textarea 
                    required
                    value={rejectRemark}
                    onChange={(e) => setRejectRemark(e.target.value)}
                    rows={4} 
                    placeholder="E.g., Authorization signature missing, incorrect scheme selected..." 
                    className="w-full px-4 py-3 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/50 text-brand-dark resize-none"
                  ></textarea>
                </div>
                <div className="p-6 border-t border-brand-bg bg-brand-bg/10 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsRejectModalOpen(false)} className="px-6 py-2.5 border border-brand-bg rounded-xl text-brand-dark font-semibold hover:bg-brand-bg/50 transition">Cancel</button>
                  <button type="submit" className="px-6 py-2.5 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-sm">
                    Confirm Rejection
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- ACCEPT SUCCESS POPUP --- */}
      <AnimatePresence>
        {showAcceptSuccess && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm" />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-brand-white rounded-3xl p-10 flex flex-col items-center justify-center max-w-sm w-full relative z-10 shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-brand-dark mb-2 text-center">Claim Approved!</h2>
              <p className="text-center text-brand-gray mb-2">The treasury claim has been successfully verified.</p>
              <p className="text-center text-sm font-semibold text-brand-primary">Moved to History</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function StatCard({ title, value, subtitle, icon, iconBg }: any) {
  return (
    <div className="bg-brand-white border border-brand-bg rounded-2xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition">
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-xs font-bold text-brand-gray uppercase tracking-wider leading-tight">{title}</h4>
        <div className={`p-3 rounded-xl ${iconBg}`}>{icon}</div>
      </div>
      <div>
        <div className="text-4xl font-black text-brand-dark mb-1">{value}</div>
        <div className="text-sm font-medium text-brand-gray">{subtitle}</div>
      </div>
    </div>
  );
}