import React from 'react';
import { ArrowLeft, Download, Filter, Printer, Calendar } from 'lucide-react';
import { getReportTableRows } from '../data/reportDocumentSeed';
import { ReportDocumentTable } from './ReportDocumentTable';

interface ReportDetailProps {
  reportName: string;
  onBack: () => void;
}

export const ReportDetail: React.FC<ReportDetailProps> = ({ reportName, onBack }) => {
  const data = getReportTableRows(reportName);

  return (
    <div className="max-w-6xl mx-auto p-8 pb-32 animate-in fade-in duration-300">
      {/* Header & Controls */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Reports
          </button>
          <h1 className="text-2xl font-bold text-gray-900">{reportName}</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-gray-200 rounded-[8px] px-3 py-2 shadow-sm">
            <Calendar className="w-4 h-4 text-gray-400 mr-2" />
            <span className="text-sm font-medium text-gray-700">This Month</span>
            <div className="w-px h-4 bg-gray-200 mx-3"></div>
            <span className="text-sm text-gray-500 cursor-pointer hover:text-gray-900">Jan 1 - Jan 31</span>
          </div>
          
          <button className="p-2 bg-white border border-gray-200 text-gray-700 rounded-[8px] hover:bg-gray-50 transition-colors shadow-sm" title="Filter">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-2 bg-white border border-gray-200 text-gray-700 rounded-[8px] hover:bg-gray-50 transition-colors shadow-sm" title="Print">
            <Printer className="w-4 h-4" />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-[8px] text-sm font-medium hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Document View */}
      <div className="bg-white border border-gray-200 rounded-[12px] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
           <div>
             <h2 className="text-lg font-bold text-gray-900">Clio Accounting Demo Firm</h2>
           </div>
           <div className="text-right">
             <p className="text-sm font-medium text-gray-900">Basis: Accrual</p>
             <p className="text-xs text-gray-500">Currency: USD</p>
           </div>
        </div>
        
        <ReportDocumentTable rows={data} />
      </div>
    </div>
  );
};
