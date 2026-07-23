"use client";
import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, CreditCard, PieChart, Landmark, UploadCloud, ShieldCheck } from "lucide-react";

export default function PaymentPage() {
  const [paymentMode, setPaymentMode] = useState<'full' | 'partial' | 'treasury'>('full');
  
  // Mock Invoice Total
  const TOTAL_AMOUNT = 90000;
  
  // States for dynamic inputs
  const [userAmount, setUserAmount] = useState<number | string>(TOTAL_AMOUNT);
  const [treasuryScheme, setTreasuryScheme] = useState("");

  // Auto-calculate treasury amount
  const parsedUserAmount = typeof userAmount === 'string' ? parseFloat(userAmount) || 0 : userAmount;
  const treasuryAmount = Math.max(0, TOTAL_AMOUNT - parsedUserAmount);

  const handleUserAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val === '') {
      setUserAmount('');
      return;
    }
    const num = parseFloat(val);
    if (num >= 0 && num <= TOTAL_AMOUNT) {
      setUserAmount(num);
    }
  };

  return (
    <div className="p-8 pt-10 w-full max-w-[1000px] mx-auto">
      
      {/* Back Button */}
      <Link href="/user/invoice" className="inline-flex items-center gap-2 text-brand-gray hover:text-brand-dark font-medium mb-8 transition">
        <ChevronLeft className="w-4 h-4" /> Back to Invoices
      </Link>

      <div className="bg-brand-white border border-brand-bg rounded-2xl shadow-sm p-8">
        
        {/* Payment Header */}
        <div className="flex justify-between items-center mb-8 pb-8 border-b border-brand-bg">
          <div>
            <h1 className="text-3xl font-bold text-brand-dark mb-2">Complete Payment</h1>
            <p className="text-brand-gray">Invoice: <span className="font-semibold text-brand-dark">INV-26-0801</span></p>
          </div>
          <div className="text-right">
            <p className="text-brand-gray text-sm mb-1">Total Amount Due</p>
            <div className="text-4xl font-bold text-brand-dark">₹{TOTAL_AMOUNT.toLocaleString('en-IN')}</div>
          </div>
        </div>

        {/* Payment Mode Selection */}
        <h3 className="font-semibold text-brand-dark mb-4 text-lg">Select Payment Strategy</h3>
        <div className="grid grid-cols-3 gap-4 mb-8">
          
          {/* Full Pay Option */}
          <button 
            onClick={() => { setPaymentMode('full'); setUserAmount(TOTAL_AMOUNT); }}
            className={`p-5 rounded-xl border-2 text-left transition-all ${paymentMode === 'full' ? 'border-brand-primary bg-brand-primary/5' : 'border-brand-bg hover:border-brand-gray/30'}`}
          >
            <CreditCard className={`w-6 h-6 mb-3 ${paymentMode === 'full' ? 'text-brand-primary' : 'text-brand-gray'}`} />
            <div className="font-bold text-brand-dark mb-1">Pay Fully</div>
            <div className="text-xs text-brand-gray">Clear the entire invoice amount online via gateway.</div>
          </button>

          {/* Partial Pay Option */}
          <button 
            onClick={() => { setPaymentMode('partial'); setUserAmount(''); }}
            className={`p-5 rounded-xl border-2 text-left transition-all ${paymentMode === 'partial' ? 'border-brand-primary bg-brand-primary/5' : 'border-brand-bg hover:border-brand-gray/30'}`}
          >
            <PieChart className={`w-6 h-6 mb-3 ${paymentMode === 'partial' ? 'text-brand-primary' : 'text-brand-gray'}`} />
            <div className="font-bold text-brand-dark mb-1">Pay Partially</div>
            <div className="text-xs text-brand-gray">Pay a custom amount now, balance remains due.</div>
          </button>

          {/* Treasury Option */}
          <button 
            onClick={() => { setPaymentMode('treasury'); setUserAmount(0); }}
            className={`p-5 rounded-xl border-2 text-left transition-all ${paymentMode === 'treasury' ? 'border-brand-primary bg-brand-primary/5' : 'border-brand-bg hover:border-brand-gray/30'}`}
          >
            <Landmark className={`w-6 h-6 mb-3 ${paymentMode === 'treasury' ? 'text-brand-primary' : 'text-brand-gray'}`} />
            <div className="font-bold text-brand-dark mb-1">Treasury / Scheme</div>
            <div className="text-xs text-brand-gray">Claim DDA subsidies or government scheme offsets.</div>
          </button>
        </div>

        {/* Dynamic Forms based on Mode */}
        <div className="bg-[#F9FAFB] p-6 rounded-xl border border-brand-bg mb-8">
          
          {paymentMode === 'full' && (
            <div className="flex items-center gap-4 text-brand-dark">
              <ShieldCheck className="w-8 h-8 text-emerald-500" />
              <div>
                <p className="font-semibold">You are paying the full amount of ₹{TOTAL_AMOUNT.toLocaleString('en-IN')}</p>
                <p className="text-sm text-brand-gray">You will be redirected to the secure payment gateway.</p>
              </div>
            </div>
          )}

          {paymentMode === 'partial' && (
            <div>
              <label className="block text-sm font-semibold text-brand-dark mb-2">Enter Amount to Pay Now</label>
              <div className="relative max-w-md">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray font-bold">₹</span>
                <input 
                  type="number" 
                  value={userAmount}
                  onChange={handleUserAmountChange}
                  placeholder="0.00" 
                  className="w-full pl-8 pr-4 py-3 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark font-semibold text-lg" 
                />
              </div>
              <p className="text-sm text-brand-gray mt-2">
                Remaining Balance: <span className="font-bold text-red-500">₹{(TOTAL_AMOUNT - parsedUserAmount).toLocaleString('en-IN')}</span>
              </p>
            </div>
          )}

          {paymentMode === 'treasury' && (
            <div className="space-y-6">
              
              <div className="grid grid-cols-2 gap-6">
                {/* User Contribution */}
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">Your Contribution (Pay Now)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gray font-bold">₹</span>
                    <input 
                      type="number" 
                      value={userAmount}
                      onChange={handleUserAmountChange}
                      className="w-full pl-8 pr-4 py-3 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark font-semibold text-lg" 
                    />
                  </div>
                  <p className="text-xs text-brand-gray mt-2">Enter 0 if Treasury pays fully.</p>
                </div>

                {/* Treasury Contribution (Auto) */}
                <div>
                  <label className="block text-sm font-semibold text-brand-dark mb-2">Covered by Treasury (Auto)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-primary font-bold">₹</span>
                    <input 
                      type="text" 
                      readOnly
                      value={treasuryAmount.toLocaleString('en-IN')}
                      className="w-full pl-8 pr-4 py-3 bg-brand-primary/10 border border-brand-primary/30 rounded-xl text-brand-dark font-semibold text-lg cursor-not-allowed" 
                    />
                  </div>
                </div>
              </div>

              {/* Scheme Dropdown */}
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-2">Select Treasury Scheme</label>
                <select className="w-full px-4 py-3 bg-brand-white border border-brand-bg rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-primary/50 text-brand-dark">
                  <option value="" disabled selected>Select an applicable scheme...</option>
                  <option>Krishi Vikas Yojana (KVY) - 50% Subsidy</option>
                  <option>State Tribal Seed Grant - 100% Coverage</option>
                  <option>DDA Drought Relief Fund</option>
                  <option>Other / Manual Entry</option>
                </select>
              </div>

              {/* Document Upload */}
              <div>
                <label className="block text-sm font-semibold text-brand-dark mb-2">Upload Treasury Authorization Document</label>
                <div className="w-full h-32 border-2 border-dashed border-brand-bg bg-brand-white rounded-xl flex flex-col items-center justify-center text-brand-gray hover:bg-brand-bg/50 transition cursor-pointer">
                  <UploadCloud className="w-8 h-8 text-brand-gray mb-2" />
                  <span className="text-sm font-medium text-brand-dark">Click to upload official PDF</span>
                  <span className="text-xs mt-1">Required for verification</span>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button className="px-8 py-4 bg-brand-primary text-brand-dark font-bold text-lg rounded-xl hover:bg-[#8CD85F] transition shadow-md">
            {paymentMode === 'treasury' ? 'Submit for Treasury Approval' : 'Proceed to Secure Payment'}
          </button>
        </div>

      </div>
    </div>
  );
}