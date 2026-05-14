import React from 'react';

export const DashboardPet: React.FC = () => {
  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard Pet Shop</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-purple-500">
          <div className="text-slate-500 text-sm font-medium mb-1">Total de Animais</div>
          <div className="text-2xl font-bold text-slate-800">1,245</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-green-500">
          <div className="text-slate-500 text-sm font-medium mb-1">Consultas Hoje</div>
          <div className="text-2xl font-bold text-slate-800">12</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-blue-500">
          <div className="text-slate-500 text-sm font-medium mb-1">Receita do Mês</div>
          <div className="text-2xl font-bold text-slate-800">R$ 15.430,00</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm border-l-4 border-l-red-500">
          <div className="text-slate-500 text-sm font-medium mb-1">Alertas de Vacinas</div>
          <div className="text-2xl font-bold text-slate-800">8 pendentes</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPet;
