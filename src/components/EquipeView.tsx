import React from 'react';

export function EquipeView() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-rose-400"></div>
          <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest">Gestão de Equipe</h2>
        </div>

        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-slate-600"><span className="font-bold text-slate-800">1</span> profissionais ativos na clínica</p>
          <button className="px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-xl transition-colors flex items-center gap-2">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>
             Novo Membro
          </button>
        </div>

        <div className="border border-slate-100 rounded-2xl p-6 bg-white hover:border-purple-200 transition-colors cursor-pointer group shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-5">
             <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center font-bold text-xl shrink-0 group-hover:bg-indigo-100 transition-colors">
               MA
             </div>
             <div>
               <div className="flex items-center gap-2">
                 <h3 className="text-lg font-bold text-slate-800">Mailton Garrido Canuto</h3>
                 <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </div>
               <p className="text-sm text-slate-500 mt-0.5">mgcfisio@hotmail.com</p>
               <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-wider">CREFITO 167742-F</p>
             </div>
           </div>

           <div className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-lg uppercase tracking-wider">
             Admin
           </div>
        </div>
      </div>
    </div>
  );
}
