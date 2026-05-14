import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, User, MoreHorizontal, UserCheck } from 'lucide-react';
import { NovoPacienteModal } from './NovoPacienteModal';
import { dbService } from '@connect-erp/shared/services/dbService';

export function PacientesView({ onViewPatient }: { onViewPatient: (patient: any) => void }) {
  const [isNovoPacienteOpen, setIsNovoPacienteOpen] = useState(false);
  const [patients, setPatients] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Escuta mudanças em tempo real (Local e Firestore)
    const unsub = dbService.listenPacientes((data) => {
        // Remove duplicatas por ID (caso local e remoto venham juntos)
        const unique = data.reduce((acc: any[], current) => {
            const x = acc.find(item => item.id === current.id);
            if (!x) return acc.concat([current]);
            return acc;
        }, []);
        
        // Ordena por nome
        const sorted = unique.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
        setPatients(sorted);
        setLoading(false);
    });

    return () => unsub();
  }, []);

  const filteredPatients = patients.filter(p => 
    (p.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.phone || '').includes(searchTerm)
  );

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <>
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
        <div className="flex flex-col md:flex-row items-center gap-3 mb-6">
          <div className="flex-1 relative w-full">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
                type="text" 
                placeholder="Pesquisar por nome ou contato..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 transition-colors" 
              />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                <Filter className="w-4 h-4" />
                Filtrar
            </button>
            <button onClick={() => setIsNovoPacienteOpen(true)} className="flex-2 md:flex-none px-6 py-2 bg-[#1a1b26] hover:bg-slate-800 text-white rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm uppercase tracking-widest">
                <Plus className="w-4 h-4" />
                Novo Paciente
            </button>
          </div>
        </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest w-full">Paciente</th>
              <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Contato</th>
              <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status / Convênio</th>
              <th className="py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
             {loading ? (
                 <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-400 text-sm">Carregando pacientes...</td>
                 </tr>
             ) : filteredPatients.length === 0 ? (
                <tr>
                    <td colSpan={4} className="py-10 text-center text-slate-400 text-sm">Nenhum paciente encontrado.</td>
                 </tr>
             ) : filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-slate-50 transition-colors group cursor-pointer" onClick={() => onViewPatient(patient)}>
                    <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${patient.sincronizado ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                {getInitials(patient.name)}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-slate-800">{patient.name}</span>
                                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                                    {patient.sincronizado ? (
                                        <><UserCheck className="w-3 h-3 text-emerald-500" /> Sincronizado</>
                                    ) : (
                                        <span className="animate-pulse italic">Sincronizando...</span>
                                    )}
                                </span>
                            </div>
                        </div>
                    </td>
                    <td className="py-3 px-4 text-xs font-medium text-slate-600 whitespace-nowrap">{patient.phone}</td>
                    <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase tracking-tight">
                            {patient.insuranceName || 'Particular'}
                        </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                            <button onClick={(e) => { e.stopPropagation(); onViewPatient(patient); }} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><Search className="w-4 h-4" /></button>
                            <button onClick={(e) => e.stopPropagation()} className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"><MoreHorizontal className="w-4 h-4" /></button>
                        </div>
                    </td>
                </tr>
             ))}
          </tbody>
        </table>
      </div>
    </div>
    {isNovoPacienteOpen && (
      <NovoPacienteModal onClose={() => setIsNovoPacienteOpen(false)} />
    )}
    </>
  );
}
