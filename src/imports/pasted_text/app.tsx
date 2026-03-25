import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  ArrowRightLeft, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Users, 
  PieChart, 
  BookOpen, 
  Link2, 
  Settings,
  Sparkles,
  Send,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  TrendingUp,
  History,
  Info
} from 'lucide-react';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMorePlans, setShowMorePlans] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [hasExecuted, setHasExecuted] = useState(false);

  const brandColor = "#0069D1";

  // Sidebar Navigation Items matching the provided reference image
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Transactions', icon: ArrowRightLeft, active: false },
    { name: 'Funds In', icon: ArrowDownToLine, active: false },
    { name: 'Funds Out', icon: ArrowUpFromLine, active: false },
    { name: 'Payroll', icon: Users, active: false },
    { name: 'Finances', icon: PieChart, active: false },
    { name: 'Chart of Accounts', icon: BookOpen, active: false },
    { name: 'Connections', icon: Link2, active: false },
  ];

  const handleExecute = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setHasExecuted(true);
      setTimeout(() => {
        setIsModalOpen(false);
        setHasExecuted(false);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] font-sans text-gray-900 overflow-hidden">
      
      {/* LEFT NAVIGATION SIDEBAR (Based on your provided image) */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex z-10 shadow-sm">
        <div className="p-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xl" style={{ backgroundColor: brandColor }}>C</div>
            <div>
              <h1 className="text-[15px] font-bold text-gray-900 leading-tight">Clio Accounting</h1>
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Financial Management</p>
            </div>
          </div>
        </div>
        
        <nav className="flex-1 px-3 space-y-0.5">
          {navItems.map((item) => (
            <a
              key={item.name}
              href="#"
              className={`flex items-center px-3 py-2 rounded-md text-[13px] font-medium transition-all group ${
                item.active 
                  ? 'bg-gray-100 text-gray-900' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon className={`mr-3 h-[18px] w-[18px] ${item.active ? 'text-gray-900' : 'text-gray-400 group-hover:text-gray-600'}`} strokeWidth={2} />
              {item.name}
            </a>
          ))}
        </nav>

        <div className="mt-auto p-3 border-t border-gray-100">
          <a href="#" className="flex items-center px-3 py-2 rounded-md text-[13px] font-medium text-gray-500 hover:bg-gray-50 transition-colors group">
            <Settings className="mr-3 h-[18px] w-[18px] text-gray-400 group-hover:text-gray-600" />
            Settings
          </a>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto relative custom-scrollbar">
        <div className="max-w-6xl mx-auto p-8 space-y-8">
          
          {/* TOP SECTION: Chat-Centric Command Center (NQL Interface) */}
          <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center mb-5">
              <div className="h-10 w-10 rounded-full bg-blue-50 flex items-center justify-center mr-4 border border-blue-100">
                <Sparkles className="h-5 w-5" style={{ color: brandColor }} />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Welcome back, Rachel.</h2>
                <p className="text-sm text-gray-500">How can I help you model your firm's financial future today?</p>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <Send className="h-4 w-4 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
              </div>
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask your Firm Intelligence... (e.g., 'Model the impact of increasing our hourly rate by 10%')"
                className="w-full pl-11 pr-24 py-4 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-400 transition-all shadow-inner"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <span className="text-[10px] font-bold text-gray-400 border border-gray-200 rounded px-1.5 py-0.5 bg-white">NQL</span>
                <button 
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white transition-opacity shadow-sm"
                  style={{ backgroundColor: brandColor }}
                >
                  Analyze
                </button>
              </div>
            </div>
          </section>

          {/* MIDDLE SECTION: Financial Goals Tracker */}
          <section>
            <div className="flex justify-between items-end mb-4 px-1">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Active Financial Goals</h3>
              <button className="text-[11px] font-bold text-blue-600 uppercase hover:underline">Manage Goals</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 group hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-[13px] font-semibold text-gray-700">Q3 Revenue Target</span>
                  </div>
                  <span className="text-[13px] font-bold text-gray-900">$450,000 <span className="text-gray-400 font-normal">/ $500k</span></span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 relative overflow-hidden">
                  <div className="bg-green-500 h-2 rounded-full transition-all duration-1000" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 group hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center">
                    <History className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-[13px] font-semibold text-gray-700">Annual Cash Flow Reserve</span>
                  </div>
                  <span className="text-[13px] font-bold text-gray-900">$80,000 <span className="text-gray-400 font-normal">/ $120k</span></span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 relative overflow-hidden">
                  <div className="h-2 rounded-full transition-all duration-1000" style={{ width: '66.6%', backgroundColor: brandColor }}></div>
                </div>
              </div>
            </div>
          </section>

          {/* BOTTOM SECTION: Customizable Widgets Grid */}
          <section>
            <div className="flex justify-between items-end mb-4 px-1">
              <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Firm Overview</h3>
              <button className="text-[11px] font-bold text-gray-400 uppercase hover:text-gray-600 flex items-center">Customize Dashboard <Settings className="h-3 w-3 ml-1" /></button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* PRIMARY WIDGET: Cash Flow Projection */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 lg:col-span-2 flex flex-col relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">Cash Flow Projection</h3>
                    <p className="text-xs text-gray-500 mt-0.5 flex items-center">
                      <Sparkles className="h-3 w-3 mr-1 text-blue-500" /> 
                      Proactive modeling based on current billing velocity
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 bg-gray-900 rounded-full"></div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Actual</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-2 h-2 border border-gray-400 border-dashed rounded-full"></div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Projected</span>
                    </div>
                  </div>
                </div>

                {/* SVG-based Chart Visualization */}
                <div className="flex-1 min-h-[220px] w-full bg-gray-50/50 rounded-xl relative border border-gray-100 overflow-hidden mb-6 flex items-end px-6 pb-10 pt-4">
                  
                  {/* Goal Line - Dashed Green */}
                  <div className="absolute top-[25%] left-0 right-0 border-t border-green-300 border-dashed w-full opacity-60">
                     <span className="absolute right-4 -top-5 text-[10px] font-bold text-green-600 bg-white px-1.5 py-0.5 rounded-full border border-green-100 shadow-sm">Target Velocity</span>
                  </div>

                  {/* Main SVG Plot */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                    {/* Actual Path */}
                    <path d="M 5 85 L 20 75 L 35 60 L 50 55 L 65 45" fill="none" stroke="#111827" strokeWidth="2.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    {/* Projection Path */}
                    <path d="M 65 45 L 80 52 L 95 65" fill="none" stroke="#94A3B8" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                    {/* Area Gradient Under Actual */}
                    <path d="M 5 85 L 20 75 L 35 60 L 50 55 L 65 45 L 65 100 L 5 100 Z" fill="url(#blue-grad)" opacity="0.05" />
                    <defs>
                      <linearGradient id="blue-grad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#0069D1" />
                        <stop offset="100%" stopColor="#0069D1" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Alert Annotation */}
                  <div className="absolute top-[55%] right-[10%] group">
                     <div className="relative">
                        <div className="h-5 w-5 bg-red-100 text-red-600 rounded-full flex items-center justify-center animate-bounce border border-red-200">
                           <AlertCircle className="h-3 w-3" />
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-gray-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap">
                          -$15,200 Gap Projected for Q3
                          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900"></div>
                        </div>
                     </div>
                  </div>
                  
                  {/* X Axis Labels */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-between px-6 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    <span>Jun</span><span>Jul</span><span>Aug</span><span>Sep (Forecast)</span>
                  </div>
                </div>

                <div className="mt-auto">
                  <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 mb-4 flex items-start space-x-3">
                    <div className="bg-white p-1.5 rounded-lg shadow-sm">
                      <AlertCircle className="h-4 w-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-red-900">Revenue Gap Detected</h4>
                      <p className="text-[11px] text-red-800/80 leading-relaxed mt-0.5">Your current collection cycle has slowed. I've modeled a recovery plan to close the $15.2k gap.</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="group w-full py-3.5 px-4 text-white text-sm font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:shadow-blue-600/30 active:scale-[0.98] transition-all flex justify-center items-center overflow-hidden relative"
                    style={{ backgroundColor: brandColor }}
                  >
                    <span className="relative z-10 flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                      Review AI Recommended Actions
                    </span>
                  </button>
                </div>
              </div>

              {/* SIDE WIDGET: A/R Aging */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col hover:border-gray-300 transition-colors">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-base font-bold text-gray-900">A/R Aging</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Pending collection health</p>
                  </div>
                  <Info className="h-4 w-4 text-gray-300 cursor-help" />
                </div>
                
                <div className="space-y-6 flex-1">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="font-semibold text-gray-600">Current</span>
                      <span className="font-bold text-gray-900">$24,500</span>
                    </div>
                    <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                      <div className="h-1.5 rounded-full" style={{ backgroundColor: brandColor, width: '60%' }}></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="font-semibold text-gray-600">31-60 Days</span>
                      <span className="font-bold text-gray-900">$12,400</span>
                    </div>
                    <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-yellow-400 h-1.5 rounded-full w-[40%]"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[12px]">
                      <span className="font-semibold text-gray-600">60+ Days</span>
                      <span className="font-bold text-red-600">$4,500</span>
                    </div>
                    <div className="w-full bg-gray-50 rounded-full h-1.5 overflow-hidden">
                      <div className="bg-red-500 h-1.5 rounded-full w-[15%]"></div>
                    </div>
                  </div>
                </div>
                
                <button className="mt-8 w-full py-2.5 text-xs font-bold text-gray-500 border border-gray-200 rounded-xl hover:bg-gray-50 hover:text-gray-900 transition-all uppercase tracking-wider">
                  View Full A/R Report
                </button>
              </div>

            </div>
          </section>
        </div>
      </main>

      {/* OVERLAY: James's Actioning Story Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-md transition-opacity duration-300" 
            onClick={() => !isExecuting && setIsModalOpen(false)}
          ></div>
          
          <div className="relative bg-white rounded-[24px] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center border border-blue-100">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900 tracking-tight">Financial Recovery Plan</h2>
                  <p className="text-xs text-gray-500 font-medium">Closing the projected Q3 cash flow gap</p>
                </div>
              </div>
              <button 
                disabled={isExecuting}
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
              
              <div className="bg-gray-50/80 rounded-2xl p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Model Results: +$15,300 Impact</h4>
                  <div className="bg-green-100 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-200 uppercase">92% Confidence</div>
                </div>

                <div className="space-y-6">
                  <div className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[13px] font-semibold text-gray-800">1. Automate 31-60 day A/R Reminders</span>
                      <span className="text-[13px] font-bold text-green-600">+$6,800</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2 shadow-inner">
                      <div className="bg-green-500 h-2 rounded-full shadow-sm" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  <div className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[13px] font-semibold text-gray-800">2. Pre-bill Retainer for 'Smith Estate'</span>
                      <span className="text-[13px] font-bold text-green-600">+$5,000</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2 shadow-inner">
                      <div className="bg-green-500 h-2 rounded-full shadow-sm" style={{ width: '33%' }}></div>
                    </div>
                  </div>

                  <div className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[13px] font-semibold text-gray-800">3. Defer Q3 Software Upgrades</span>
                      <span className="text-[13px] font-bold text-green-600">+$3,500</span>
                    </div>
                    <div className="w-full bg-white rounded-full h-2 shadow-inner">
                      <div className="bg-green-400 h-2 rounded-full shadow-sm" style={{ width: '22%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button 
                  disabled={isExecuting || hasExecuted}
                  onClick={handleExecute}
                  className={`w-full py-4 px-6 text-white text-base font-bold rounded-2xl shadow-xl transition-all flex justify-center items-center relative overflow-hidden ${
                    hasExecuted ? 'bg-green-600' : 'hover:opacity-90'
                  }`}
                  style={{ backgroundColor: !hasExecuted ? brandColor : '' }}
                >
                  {isExecuting ? (
                    <div className="flex items-center space-x-2 animate-pulse">
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      <span className="ml-2 uppercase text-xs tracking-widest font-bold">Executing Model...</span>
                    </div>
                  ) : hasExecuted ? (
                    <div className="flex items-center animate-in zoom-in duration-300">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Actions Executed Successfully
                    </div>
                  ) : (
                    <span className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 mr-2" />
                      Execute Recommended Plan
                    </span>
                  )}
                </button>
                
                <button 
                  disabled={isExecuting}
                  onClick={() => setShowMorePlans(!showMorePlans)}
                  className="w-full py-4 px-6 text-gray-600 text-sm font-bold bg-gray-50 border border-gray-200 rounded-2xl hover:bg-white hover:border-gray-300 transition-all flex justify-center items-center"
                >
                  Explore Alternative Models
                  {showMorePlans ? <ChevronUp className="h-4 w-4 ml-2" /> : <ChevronDown className="h-4 w-4 ml-2" />}
                </button>
              </div>

              {/* Collapsible Alternative Plans */}
              {showMorePlans && (
                <div className="grid grid-cols-1 gap-3 pb-4 animate-in slide-in-from-top-4 duration-300">
                  <div className="p-5 rounded-2xl border border-gray-200 bg-white hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600">Model A: Aggressive Collection</h4>
                      <div className="text-[10px] font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded-lg border border-orange-100 uppercase">Medium Risk</div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">Focuses on liquidating all 60+ day receivables immediately through third-party partners. +$12,000 projected.</p>
                  </div>
                  
                  <div className="p-5 rounded-2xl border border-gray-200 bg-white hover:shadow-md transition-all cursor-pointer group">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600">Model B: Expense Optimization</h4>
                      <div className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 uppercase">Low Risk</div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">Adjusts operating marketing budget for next 30 days to rebalance reserves. +$14,500 projected.</p>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* Embedded CSS for custom styling */}
      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E5E7EB;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #D1D5DB;
        }
      `}} />

    </div>
  );
}