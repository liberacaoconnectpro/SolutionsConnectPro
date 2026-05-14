import React, { useState } from 'react';
import { 
  ArrowLeft, Plus, Calendar, User, Activity, FileText, Folder, CheckCircle, 
  TrendingUp, Download
} from 'lucide-react';

export interface PacienteDetailProps {
  pacienteId: string;
  onVoltar: () => void;
}

export const PacienteDetailView: React.FC<PacienteDetailProps> = ({ pacienteId, onVoltar }) => {
  const [activeTab, setActiveTab] = useState<'dados' | 'sessoes' | 'avaliacoes' | 'evolucao' | 'documentos' | 'observacoes'>('dados');
  
  // Mock data for the specific patient
  const [paciente] = useState({
    id: pacienteId,
    nome: 'João Silva',
    idade: 45,
    email: 'joao.silva@email.com',
    telefone: '(11) 98765-4321',
    diagnostico: 'Lombalgia Crônica',
    dataInicio: '2026-03-15',
    status: 'Em tratamento',
    sessoesRealizadas: 12,
    sessoesPrevistas: 20
  });

  const tabs = [
    { id: 'dados', label: 'Dados Pessoais', icon: User },
    { id: 'sessoes', label: 'Histórico de Sessões', icon: Calendar },
    { id: 'avaliacoes', label: 'Avaliações Físicas', icon: Activity },
    { id: 'evolucao', label: 'Evolução', icon: TrendingUp },
    { id: 'documentos', label: 'Documentos', icon: Folder },
    { id: 'observacoes', label: 'Observações Clínicas', icon: FileText },
  ] as const;

  return (
    <div className="flex flex-col h-full bg-slate-50 relative">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white border-b border-slate-200 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={onVoltar}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">{paciente.nome}</h1>
            <div className="flex bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-xs font-semibold w-max mt-1">
              {paciente.diagnostico}
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors">
            <Plus className="w-4 h-4" />
            Nova Sessão
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors">
            <Activity className="w-4 h-4" />
            Nova Avaliação
          </button>
        </div>
      </div>

      {/* Tabs Menu */}
      <div className="px-6 bg-white border-b border-slate-200 shrink-0">
        <div className="flex overflow-x-auto gap-6 hide-scrollbar">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-4 border-b-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive 
                    ? 'border-blue-600 text-blue-600' 
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto p-6">
        <div className="max-w-5xl mx-auto">
          {activeTab === 'dados' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-2">Informações Cadastrais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Idade</p>
                  <p className="font-medium text-slate-800">{paciente.idade} anos</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Email</p>
                  <p className="font-medium text-slate-800">{paciente.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Telefone</p>
                  <p className="font-medium text-slate-800">{paciente.telefone}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 mb-1">Data de Início</p>
                  <p className="font-medium text-slate-800">{new Date(paciente.dataInicio).toLocaleDateString('pt-BR')}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'sessoes' && (
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex gap-4">
                  <div className="flex flex-col items-center justify-center bg-blue-50 text-blue-700 w-16 h-16 rounded-lg shrink-0">
                    <span className="text-xs font-bold uppercase">{new Date().toLocaleDateString('pt-BR', { month: 'short' })}</span>
                    <span className="text-xl font-black">{14 - i}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-slate-800">Sessão de Fisioterapia Convencional</h3>
                      <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold bg-emerald-50 px-2 py-1 rounded">
                        <CheckCircle className="w-3 h-3" /> Realizada
                      </span>
                    </div>
                    <p className="text-slate-600 text-sm mt-2">
                      Exercícios de alongamento passivo, fortalecimento de core e TENS (15min) na região lombar.
                      Paciente relatou leve melhora na dor (Pico 4/10).
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'avaliacoes' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
               <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold">
                  <tr>
                    <th className="py-3 px-5">Data</th>
                    <th className="py-3 px-5">Tipo</th>
                    <th className="py-3 px-5">Evolução (Dor)</th>
                    <th className="py-3 px-5 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5">15/03/2026</td>
                    <td className="py-3 px-5"><span className="bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-bold">Avaliação Inicial</span></td>
                    <td className="py-3 px-5 text-rose-600 font-medium">8 / 10</td>
                    <td className="py-3 px-5 text-right">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">Ver completo</button>
                    </td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-3 px-5">15/04/2026</td>
                    <td className="py-3 px-5"><span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-xs font-bold">Reavaliação</span></td>
                    <td className="py-3 px-5 text-emerald-600 font-medium">4 / 10</td>
                    <td className="py-3 px-5 text-right">
                      <button className="text-blue-600 hover:text-blue-800 font-medium">Ver completo</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'evolucao' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex flex-col justify-center items-center h-80">
              <TrendingUp className="w-16 h-16 text-slate-300 mb-4" />
              <p className="text-slate-500 font-medium">Comportamento da Dor Evolutivo</p>
              <div className="w-full max-w-md mt-8 border-l-2 border-b-2 border-slate-200 h-40 relative flex items-end justify-between px-6 pb-0">
                <div className="flex flex-col items-center gap-2 group">
                  <div className="w-10 bg-rose-400 h-32 rounded-t-sm group-hover:bg-rose-500 transition-colors flex justify-center items-start pt-2 text-white text-xs font-bold">8</div>
                  <span className="text-[10px] text-slate-500 font-semibold absolute -bottom-6">15/03</span>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="w-10 bg-orange-400 h-24 rounded-t-sm group-hover:bg-orange-500 transition-colors flex justify-center items-start pt-2 text-white text-xs font-bold">6</div>
                  <span className="text-[10px] text-slate-500 font-semibold absolute -bottom-6">25/03</span>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="w-10 bg-yellow-400 h-16 rounded-t-sm group-hover:bg-yellow-500 transition-colors flex justify-center items-start pt-2 text-white text-xs font-bold">4</div>
                  <span className="text-[10px] text-slate-500 font-semibold absolute -bottom-6">05/04</span>
                </div>
                <div className="flex flex-col items-center gap-2 group">
                  <div className="w-10 bg-emerald-400 h-8 rounded-t-sm group-hover:bg-emerald-500 transition-colors flex justify-center items-start pt-2 text-white text-xs font-bold">2</div>
                  <span className="text-[10px] text-slate-500 font-semibold absolute -bottom-6">15/04</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documentos' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-blue-300 transition-colors group">
                <FileText className="w-10 h-10 text-blue-500 mb-2 group-hover:-translate-y-1 transition-transform" />
                <p className="text-sm font-bold text-slate-700">Ressonância Mag.</p>
                <p className="text-xs text-slate-400 mt-1">15/03/2026</p>
                <button className="mt-3 text-xs flex items-center gap-1 text-slate-500 hover:text-blue-600 font-medium">
                  <Download className="w-3 h-3" /> Baixar
                </button>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col items-center justify-center text-center border-dashed cursor-pointer hover:bg-slate-50 transition-colors">
                <Plus className="w-8 h-8 text-slate-400 mb-2" />
                <p className="text-sm font-medium text-slate-500">Adicionar Arquivo</p>
              </div>
            </div>
          )}

          {activeTab === 'observacoes' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <label className="block text-sm font-bold text-slate-700 mb-2">Anotações Internas (Não visível para o paciente)</label>
              <textarea 
                className="w-full h-40 border border-slate-300 rounded-lg p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none text-slate-700"
                placeholder="Insira notas clínicas, evolução de humor, adesão ao tratamento..."
                defaultValue="Paciente muito colaborativo, traz os alongamentos práticos feitos em casa. Queixa principal segue sendo ao levantar da cama pela manhã."
              />
              <div className="flex justify-end mt-4">
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-sm transition-colors">
                  Salvar Observações
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PacienteDetailView;
