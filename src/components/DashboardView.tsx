import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Users, DollarSign, Activity, TrendingUp, CheckCircle2, ChevronRight } from 'lucide-react';
import { dbService } from '../services/dbService';

export function DashboardView() {
  const [patients, setPatients] = useState<any[]>([]);

  useEffect(() => {
    const unsub = dbService.listenPacientes((data) => {
        // Unique patients
        const unique = data.reduce((acc: any[], current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) return acc.concat([current]);
            return acc;
        }, []);
        setPatients(unique);
    });
    return () => unsub();
  }, []);

  const recentPatients = [...patients]
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .slice(0, 5);

  const handleManualSync = async () => {
    try {
      await dbService.syncPendentes();
      await dbService.init();
      alert('Sincronização manual concluída!');
    } catch (err) {
      alert('Erro na sincronização: ' + err);
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-500 shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pacientes</p>
            <p className="text-2xl font-extrabold text-slate-800 leading-none mt-1">{patients.length}</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hoje</p>
            <p className="text-2xl font-extrabold text-slate-800 leading-none mt-1">0</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center text-orange-500 shrink-0">
            <Calendar className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Próx. Dia</p>
            <p className="text-2xl font-extrabold text-slate-800 leading-none mt-1">0</p>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 shrink-0">
            <DollarSign className="w-6 h-6" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Receita</p>
            <p className="text-2xl font-extrabold text-slate-800 leading-none mt-1">R$ 0,00</p>
          </div>
        </div>
      </div>

      {/* Meus Atendimentos de Hoje */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
             <Clock className="w-5 h-5 text-slate-400" />
             <div>
               <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Meus Atendimentos de Hoje</h3>
               <p className="text-[10px] text-slate-500 uppercase tracking-wider">Confira sua grade para este turno</p>
             </div>
          </div>
          <button className="text-xs font-bold text-purple-600 hover:text-purple-700 uppercase tracking-wider">
            Agenda Completa &rarr;
          </button>
        </div>
        <div className="border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center py-12 bg-slate-50/50">
          <Calendar className="w-6 h-6 text-slate-300 mb-2" />
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Nenhuma sessão agendada para você hoje</p>
        </div>
      </div>

      {/* Atividade & Desempenho */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1f1f2e] rounded-2xl shadow-sm p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
             <Activity className="w-32 h-32 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-8 relative z-10">
              <Activity className="w-5 h-5 text-purple-400" />
              <div>
                <h3 className="text-sm font-bold text-white uppercase tracking-wide">Atividade Clínica</h3>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider">Últimas avaliações</p>
              </div>
            </div>
            
            <div className="bg-white/5 rounded-xl p-4 border border-white/10 relative z-10 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Última Atualização</span>
                <span className="text-[10px] text-slate-400 italic">Hoje</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                Novos protocolos de reabilitação motora aplicados aos pacientes com acompanhamento ativo.
              </p>
            </div>
          </div>
          
          <button className="w-full bg-white text-slate-900 font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl hover:bg-slate-100 transition-colors relative z-10">
            Acessar Prontuários
          </button>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-slate-400" />
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">Desempenho Semanal</h3>
          </div>
          
          <div className="flex-1 flex flex-col justify-center">
            <div className="flex items-baseline gap-3 mb-4">
              <span className="text-5xl font-extrabold text-slate-800">100%</span>
              <span className="text-sm font-bold text-emerald-500">Sistema Online via PouchDB & Firestore</span>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
              <div className="h-full bg-emerald-300 w-[100%] rounded-full"></div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Sincronização Ativa</span>
            </div>
            <button 
              onClick={handleManualSync}
              className="text-[10px] font-bold text-purple-600 hover:underline uppercase"
            >
              Sincronizar Agora
            </button>
          </div>
        </div>
      </div>

      {/* Charts and Recent Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-64 flex flex-col">
            <h3 className="text-sm font-bold text-slate-800 mb-6">Cadastros · total de pacientes: {patients.length}</h3>
            <div className="flex-1 flex items-end gap-2 relative">
               {/* Fake Chart Lines */}
               <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="border-t border-dashed border-slate-100 w-full h-0"></div>
                  <div className="border-t border-dashed border-slate-100 w-full h-0"></div>
                  <div className="border-t border-dashed border-slate-100 w-full h-0"></div>
                  <div className="border-t border-dashed border-slate-100 w-full h-0 mb-6"></div>
               </div>
               {/* Bars */}
               <div className="flex-1 flex flex-col items-center justify-end h-full z-10"><div className="w-12 bg-indigo-500 rounded-t-sm h-[0%]"></div><span className="text-[10px] text-slate-400 mt-2">jan.</span></div>
               <div className="flex-1 flex flex-col items-center justify-end h-full z-10"><div className="w-12 bg-indigo-500 rounded-t-sm h-[0%]"></div><span className="text-[10px] text-slate-400 mt-2">fev.</span></div>
               <div className="flex-1 flex flex-col items-center justify-end h-full z-10"><div className="w-12 bg-indigo-500 rounded-t-sm h-[0%]"></div><span className="text-[10px] text-slate-400 mt-2">mar.</span></div>
               <div className="flex-1 flex flex-col items-center justify-end h-full z-10"><div className="w-12 bg-indigo-500 rounded-t-sm h-[40%]"></div><span className="text-[10px] text-slate-400 mt-2">abr.</span></div>
               <div className="flex-1 flex flex-col items-center justify-end h-full z-10"><div className="w-12 bg-indigo-500 rounded-t-sm h-[80%]"></div><span className="text-[10px] text-slate-400 mt-2 font-bold text-slate-600">mai.</span></div>
               <div className="flex-1 flex flex-col items-center justify-end h-full z-10"><div className="w-12 bg-indigo-400 rounded-t-sm h-[100%]"></div><span className="text-[10px] text-slate-400 mt-2 font-bold text-slate-600">jun.</span></div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-64 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-sm font-bold text-slate-800">Financeiro · Resumo Diário</h3>
              <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-emerald-500"></div><span className="text-[10px] font-bold text-slate-400">Receita</span></div>
                 <div className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-rose-400"></div><span className="text-[10px] font-bold text-slate-400">Despesa</span></div>
              </div>
            </div>
            <div className="flex-1 flex items-end gap-2 relative">
               <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                  <div className="border-t border-dashed border-slate-100 w-full h-0"></div>
                  <div className="border-t border-dashed border-slate-100 w-full h-0"></div>
                  <div className="border-t border-dashed border-slate-100 w-full h-0"></div>
                  <div className="border-t border-dashed border-slate-100 w-full h-0 mb-6"></div>
               </div>
               <div className="flex-1 flex items-end justify-center h-full z-10 gap-1 pb-6 relative"><span className="absolute bottom-0 text-[10px] text-slate-400">jan.</span></div>
               <div className="flex-1 flex items-end justify-center h-full z-10 gap-1 pb-6 relative"><span className="absolute bottom-0 text-[10px] text-slate-400">fev.</span></div>
               <div className="flex-1 flex items-end justify-center h-full z-10 gap-1 pb-6 relative"><span className="absolute bottom-0 text-[10px] text-slate-400">mar.</span></div>
               <div className="flex-1 flex items-end justify-center h-full z-10 gap-1 pb-6 relative"><span className="absolute bottom-0 text-[10px] text-slate-400">abr.</span></div>
               <div className="flex-1 flex items-end justify-center h-full z-10 gap-1 pb-6 relative">
                 <div className="w-6 bg-emerald-500 rounded-t-sm h-[70%]"></div><div className="w-6 bg-rose-400 rounded-t-sm h-[0%]"></div>
                 <span className="absolute bottom-0 text-[10px] text-slate-400 font-bold text-slate-600">mai.</span>
               </div>
               <div className="flex-1 flex items-end justify-center h-full z-10 gap-1 pb-6 relative">
                 <div className="w-6 bg-emerald-500 rounded-t-sm h-[40%]"></div><div className="w-6 bg-rose-400 rounded-t-sm h-[20%]"></div>
                 <span className="absolute bottom-0 text-[10px] text-slate-400 font-bold text-slate-600">jun.</span>
               </div>
            </div>
          </div>
        </div>

        {/* Recent Patients */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 flex flex-col h-[536px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-slate-800">Pacientes recentes</h3>
            <button className="text-[10px] font-bold text-purple-600 hover:text-purple-700 uppercase">Ver todos &rarr;</button>
          </div>
          
          <div className="flex-1 flex flex-col gap-4 overflow-y-auto pr-2">
             {recentPatients.length === 0 ? (
                 <p className="text-xs text-slate-400 text-center py-10">Nenhum paciente recente.</p>
             ) : recentPatients.map(patient => (
                <div key={patient.id} className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 -mx-2 rounded-xl transition-colors">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs shrink-0">
                            {getInitials(patient.name)}
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-800">{patient.name}</p>
                            <p className="text-[10px] text-slate-400">{patient.phone}</p>
                        </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-purple-500 transition-colors" />
                </div>
             ))}
          </div>
          
          <button className="w-full bg-[#1a1b26] hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-widest py-3 rounded-xl transition-colors mt-4">
            ADICIONAR PACIENTE &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}
