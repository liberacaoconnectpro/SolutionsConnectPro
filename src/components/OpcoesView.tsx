import React, { useState } from 'react';
import { ConfiguracoesDetalhes } from './ConfiguracoesDetalhes';

export function OpcoesView({ onLogout }: { onLogout: () => void }) {
  const [activeConfig, setActiveConfig] = useState<string | null>(null);

  if (activeConfig) {
    return <ConfiguracoesDetalhes initialTab={activeConfig} onBack={() => setActiveConfig(null)} />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center text-white shrink-0">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </div>
            <h1 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Central de Opções</h1>
          </div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Gerencie sua experiência FisioConnectPro</p>
        </div>
        
        <div className="text-right">
           <p className="text-sm font-bold text-slate-800 uppercase tracking-wider">Mailton Garrido Canuto</p>
           <p className="text-[10px] font-bold text-slate-400 mt-0.5 uppercase tracking-widest">Admin</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div onClick={() => setActiveConfig('unidade')} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-purple-200 transition-colors cursor-pointer group">
           <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
           </div>
           <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Minha Clínica</h3>
           <p className="text-xs text-slate-500 leading-relaxed">Dados institucionais, endereço e identidade visual da unidade.</p>
        </div>

        <div onClick={() => setActiveConfig('seguranca')} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-purple-200 transition-colors cursor-pointer group">
           <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center mb-4 group-hover:bg-purple-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
           </div>
           <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Segurança</h3>
           <p className="text-xs text-slate-500 leading-relaxed">Alteração de senha, controles de acesso e privacidade da conta.</p>
        </div>

        <div onClick={() => setActiveConfig('agenda')} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-purple-200 transition-colors cursor-pointer group">
           <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center mb-4 group-hover:bg-orange-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           </div>
           <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Ajustes da Agenda</h3>
           <p className="text-xs text-slate-500 leading-relaxed">Horários de atendimento, intervalos e configurações de visualização.</p>
        </div>

        <div onClick={() => setActiveConfig('backup')} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-purple-200 transition-colors cursor-pointer group">
           <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>
           </div>
           <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Backup & Dados</h3>
           <p className="text-xs text-slate-500 leading-relaxed">Exportação manual de toda sua base de dados e restauração.</p>
        </div>

        <div onClick={() => setActiveConfig('perfil')} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-purple-200 transition-colors cursor-pointer group">
           <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center mb-4 group-hover:bg-pink-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           </div>
           <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Meu Perfil</h3>
           <p className="text-xs text-slate-500 leading-relaxed">Personalize suas informações de login e exibição no sistema.</p>
        </div>

        <div onClick={() => setActiveConfig('assinatura')} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:border-purple-200 transition-colors cursor-pointer group">
           <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4 group-hover:bg-emerald-100 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
           </div>
           <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-2">Assinatura</h3>
           <p className="text-xs text-slate-500 leading-relaxed">Gerencie seu plano FisioConnectPro e histórico de faturas.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1f1f2e] rounded-2xl shadow-sm p-8 relative overflow-hidden flex flex-col justify-between">
           <div className="absolute -right-8 -bottom-8">
             <svg className="w-48 h-48 text-white/5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
           </div>
           <div className="relative z-10 mb-8">
             <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-2">Suporte Técnico MG</h3>
             <p className="text-xs text-slate-400 leading-relaxed pr-8">Precisa de ajuda com o sistema ou quer solicitar uma nova funcionalidade? Nossa equipe está pronta para te ouvir.</p>
           </div>
           <button className="bg-white text-slate-900 font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl hover:bg-slate-100 transition-colors relative z-10 self-start">
             Abrir Chamado
           </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col justify-between">
          <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 font-black text-xl shrink-0 shadow-sm">
               M
             </div>
             <div>
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">Mailton Garrido Canuto</h3>
               <p className="text-xs text-slate-500 italic mt-0.5">admin · mgcfisio@hotmail.com</p>
             </div>
          </div>
          
          <div className="flex items-center justify-between pt-6 mt-6 border-t border-slate-100">
             <button onClick={onLogout} className="flex items-center gap-2 text-xs font-bold text-rose-500 hover:text-rose-600 uppercase tracking-widest transition-colors">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
               Encerrar Sessão
             </button>
             <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
               <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">V 1.2.0 Estável</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
