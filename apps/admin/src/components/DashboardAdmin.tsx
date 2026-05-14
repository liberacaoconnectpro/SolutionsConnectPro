import React from 'react';

export const DashboardAdmin: React.FC = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-blue-600">
          <div className="text-slate-500 text-sm font-medium mb-1">Total de Clínicas</div>
          <div className="text-2xl font-bold text-slate-800">45</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-cyan-600">
          <div className="text-slate-500 text-sm font-medium mb-1">Total Pet Shops</div>
          <div className="text-2xl font-bold text-slate-800">12</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-indigo-600">
          <div className="text-slate-500 text-sm font-medium mb-1">Usuários Ativos</div>
          <div className="text-2xl font-bold text-slate-800">1,240</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-600">
          <div className="text-slate-500 text-sm font-medium mb-1">Receita Consolidada</div>
          <div className="text-2xl font-bold text-slate-800">R$ 54.300,00</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardAdmin;
