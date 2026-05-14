import React from 'react';

export function FinanceiroView() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="w-2 h-6 rounded-full bg-purple-400"></div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Relatórios Financeiros</h2>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl p-1">
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50">&lt;</button>
            <span className="text-xs font-bold text-slate-800 px-2 uppercase tracking-widest">Mai 26</span>
            <button className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50">&gt;</button>
          </div>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-xl p-1">
            <button className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg uppercase tracking-wider">Panorama</button>
            <button className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold rounded-lg uppercase tracking-wider">Receitas</button>
            <button className="px-4 py-2 text-slate-500 hover:text-slate-800 text-xs font-bold rounded-lg uppercase tracking-wider">Despesas</button>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Recebimentos</p>
          </div>
          <p className="text-3xl font-extrabold text-slate-800 pl-11">R$ 250,00</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saídas</p>
          </div>
          <p className="text-3xl font-extrabold text-slate-800 pl-11">R$ 91,00</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center">
              <span className="font-bold text-xs">$</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Saldo Atual</p>
          </div>
          <p className="text-3xl font-extrabold text-slate-800 pl-11">R$ 159,00</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[300px]">
         <div className="flex justify-between items-center mb-6">
           <div className="flex items-center gap-2">
             <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
             <h3 className="text-sm font-bold text-slate-700">Fluxo de Caixa</h3>
           </div>
           <div className="flex items-center gap-4">
             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Receita</span></div>
             <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-rose-400"></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Despesa</span></div>
           </div>
         </div>
         {/* Chart Placeholder */}
         <div className="flex-1 border-t border-slate-100 relative">
            <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] text-slate-400 py-4 w-8">
               <span>260</span><span>195</span><span>130</span><span>65</span><span>0</span>
            </div>
            <div className="ml-8 h-full flex items-end justify-center pb-8 pt-4">
               {/* Just one bar group for "Mensal" based on the image */}
               <div className="flex items-end gap-1 relative">
                 <div className="w-12 bg-emerald-500 rounded-t-sm h-[200px]"></div>
                 <div className="w-12 bg-rose-400 rounded-t-sm h-[70px]"></div>
                 <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-slate-400 font-medium">Mensal</span>
               </div>
            </div>
         </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button className="flex-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold uppercase tracking-wider py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
           Exportar Relatório
        </button>
        <button className="flex-1 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold uppercase tracking-wider py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2">
           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
           Novo Lançamento
        </button>
      </div>

      {/* Histórico Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-2">
           <svg className="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           <h3 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Histórico de Lançamentos</h3>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-100">
              <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Data</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Descrição</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Categoria</th>
              <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
             <tr className="hover:bg-slate-50 transition-colors group">
               <td className="py-4 px-6 text-xs text-slate-500 font-medium">10/05/2026</td>
               <td className="py-4 px-6 text-sm font-bold text-slate-800">12 Papel lencol</td>
               <td className="py-4 px-6">
                 <span className="px-2 py-1 bg-rose-50 text-rose-500 text-[10px] font-bold rounded-md uppercase tracking-wider border border-rose-100">Equipamentos</span>
               </td>
               <td className="py-4 px-6 text-right">
                 <div className="flex items-center justify-end gap-4">
                   <span className="text-sm font-bold text-rose-500">- R$ 69,00</span>
                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="text-slate-400 hover:text-indigo-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                     <button className="text-slate-400 hover:text-rose-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                   </div>
                 </div>
               </td>
             </tr>
             <tr className="hover:bg-slate-50 transition-colors group">
               <td className="py-4 px-6 text-xs text-slate-500 font-medium">10/05/2026</td>
               <td className="py-4 px-6 text-sm font-bold text-slate-800">Resma Papel A4</td>
               <td className="py-4 px-6">
                 <span className="px-2 py-1 bg-rose-50 text-rose-500 text-[10px] font-bold rounded-md uppercase tracking-wider border border-rose-100">Geral</span>
               </td>
               <td className="py-4 px-6 text-right">
                 <div className="flex items-center justify-end gap-4">
                   <span className="text-sm font-bold text-rose-500">- R$ 22,00</span>
                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="text-slate-400 hover:text-indigo-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                     <button className="text-slate-400 hover:text-rose-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                   </div>
                 </div>
               </td>
             </tr>
             <tr className="hover:bg-slate-50 transition-colors group">
               <td className="py-4 px-6 text-xs text-slate-500 font-medium">04/05/2026</td>
               <td className="py-4 px-6 text-sm font-bold text-slate-800">Gilberto</td>
               <td className="py-4 px-6">
                 <span className="px-2 py-1 bg-emerald-50 text-emerald-500 text-[10px] font-bold rounded-md uppercase tracking-wider border border-emerald-100">Consultas</span>
               </td>
               <td className="py-4 px-6 text-right">
                 <div className="flex items-center justify-end gap-4">
                   <span className="text-sm font-bold text-emerald-500">+ R$ 250,00</span>
                   <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button className="text-slate-400 hover:text-indigo-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg></button>
                     <button className="text-slate-400 hover:text-rose-500"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                   </div>
                 </div>
               </td>
             </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
