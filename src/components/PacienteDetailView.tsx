import React, { useState } from 'react';
import { ArrowLeft, Printer, Settings, User, FileText, Calendar as CalendarIcon, FileSymlink, Edit3, MapPin, Edit2, Trash2 } from 'lucide-react';
import { PacientePrintPreview } from './PacientePrintPreview';
import { NovaAvaliacaoModal } from './NovaAvaliacaoModal';

export function PacienteDetailView({ patient, onBack }: { patient: any, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('visao_geral');
  const [showPrintPreview, setShowPrintPreview] = useState(false);
  const [showNovaAvaliacao, setShowNovaAvaliacao] = useState(false);

  if (showPrintPreview) {
    return (
      <div id="print-preview-container" className="fixed inset-0 z-50 bg-white overflow-hidden">
        <PacientePrintPreview patient={patient} onClose={() => setShowPrintPreview(false)} />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Header Profile */}
        <div className="p-8 pb-6 border-b border-slate-100 flex items-start justify-between">
          <div className="flex items-center gap-6">
            <button onClick={onBack} className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-purple-600 transition-colors shrink-0">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-2xl shrink-0">
              {patient.initials || 'GI'}
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-800">{patient.name || 'Gilberto Andrade Silva'}</h1>
              <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {patient.age || '53 anos'}</span>
                <span>•</span>
                <span className="flex items-center gap-1.5"><FileSymlink className="w-4 h-4" /> {patient.contact || '71992420129'}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={() => setShowPrintPreview(true)} className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-sm font-bold rounded-lg transition-colors flex items-center gap-2">
               <Printer className="w-4 h-4" />
               Imprimir Ficha
             </button>
             <button className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-lg transition-colors flex items-center gap-2">
               <Settings className="w-4 h-4" />
               Configurar Perfil
             </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 px-8 border-b border-slate-100 bg-white">
          <button 
            onClick={() => setActiveTab('visao_geral')}
            className={`py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'visao_geral' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            <User className="w-4 h-4" /> Visão Geral
          </button>
          <button 
            onClick={() => setActiveTab('avaliacao')}
            className={`py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'avaliacao' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            <FileText className="w-4 h-4" /> Avaliação
          </button>
          <button 
            onClick={() => setActiveTab('evolucoes')}
            className={`py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors flex items-center gap-2 ${activeTab === 'evolucoes' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
          >
            <CalendarIcon className="w-4 h-4" /> Evoluções
          </button>
          <button 
            className="py-4 text-xs font-bold uppercase tracking-widest border-b-2 border-transparent text-slate-300 flex items-center gap-2 cursor-not-allowed"
          >
            <FileText className="w-4 h-4" /> Exames &amp; Docs <span className="bg-slate-100 text-slate-400 text-[9px] px-1.5 py-0.5 rounded-md ml-1">EM BREVE</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-8 bg-[#fafafa] min-h-[400px]">
          {activeTab === 'visao_geral' && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 w-[400px]">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2 text-indigo-600">
                  <User className="w-4 h-4" />
                  <h3 className="text-xs font-bold uppercase tracking-widest">Dados Pessoais</h3>
                </div>
                <button className="text-slate-300 hover:text-indigo-600 transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Nascimento</span>
                    <span className="text-sm font-medium text-slate-800">15/02/1973</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Gênero</span>
                    <span className="text-sm font-medium text-slate-800">Masculino</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Profissão</span>
                    <span className="text-sm font-medium text-slate-800">Motoboy</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Escolaridade</span>
                    <span className="text-sm font-medium text-slate-800">Não Informado</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estado Civil</span>
                    <span className="text-sm font-medium text-slate-800">Casado</span>
                  </div>
                  <div>
                    <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Telefone</span>
                    <span className="text-sm font-medium text-slate-800">{patient?.contact || '71992420129'}</span>
                  </div>
                </div>

                <div>
                  <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Endereço</span>
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-800">2 tv Deusdete Muniz, 42 - Marechal Rondon - Salvador/BA</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'avaliacao' && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Avaliação Inicial / Prontuário</h2>
                  <p className="text-sm text-slate-500 mt-0.5">Gere o acompanhamento clínico deste paciente</p>
                </div>
                <button 
                  onClick={() => setShowNovaAvaliacao(true)}
                  className="bg-[#1e58f2] hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors"
                >
                  + Nova Avaliação
                </button>
              </div>

              <div className="space-y-4">
                {/* Evaluation item 1 */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between hover:border-slate-300 transition-colors shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 text-blue-600 rounded-lg p-3 flex flex-col items-center justify-center min-w-[56px] min-h-[56px]">
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">MAI.</span>
                      <span className="text-lg font-black leading-none">4</span>
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-slate-800 text-[15px]">Avaliação Inicial</h3>
                        <span className="bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md flex items-center gap-1">PED: EVA 7</span>
                      </div>
                      <p className="text-sm text-slate-500">Hernia discal cervical + retificação cervical</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setShowPrintPreview(true)} className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                      <Printer className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Evaluation item 2 */}
                <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center justify-between hover:border-slate-300 transition-colors shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-50 text-blue-600 rounded-lg p-3 flex flex-col items-center justify-center min-w-[56px] min-h-[56px]">
                      <span className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">MAI.</span>
                      <span className="text-lg font-black leading-none">4</span>
                    </div>
                    <div className="pt-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-slate-800 text-[15px]">Avaliação Inicial</h3>
                        <span className="bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-md flex items-center gap-1">PED: EVA 7</span>
                      </div>
                      <p className="text-sm text-slate-500">Hernia discal cervical + retificação cervical</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50 transition-colors">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => setShowPrintPreview(true)} className="w-8 h-8 rounded border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors">
                      <Printer className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {showNovaAvaliacao && <NovaAvaliacaoModal onClose={() => setShowNovaAvaliacao(false)} />}
            </div>
          )}
          {activeTab === 'evolucoes' && (
            <div className="text-center py-12 text-slate-400 font-medium">Nenhuma evolução registrada</div>
          )}
        </div>
      </div>
    </div>
  );
}
