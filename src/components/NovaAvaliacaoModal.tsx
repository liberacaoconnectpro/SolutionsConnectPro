import React, { useState } from 'react';
import { X } from 'lucide-react';

export function NovaAvaliacaoModal({ onClose }: { onClose: () => void }) {
  const [dor, setDor] = useState(0);

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              +
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wide">NOVA AVALIAÇÃO</h2>
              <p className="text-xs text-slate-500 mt-0.5">Preencha os dados clínicos do paciente</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-6 text-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="col-span-1 border-none">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">1. DATA</label>
              <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-slate-700" defaultValue="2026-05-13" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">2. ANAMNESE (QUEIXA PRINCIPAL, HDA, HDP, ETC.)</label>
            <textarea className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 min-h-[80px] outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 placeholder:text-slate-400" placeholder="Descreva a queixa principal, história da doença atual ou pregressa..."></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">3.1 INSPEÇÃO - ESTADO GERAL</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-slate-700">
                <option>Selecione...</option>
                <option>BEG (Bom Estado Geral)</option>
                <option>REG (Regular Estado Geral)</option>
                <option>MEG (Mau Estado Geral)</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">3.1 INSPEÇÃO - PELE</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-slate-700">
                <option>Selecione...</option>
                <option>Normal</option>
                <option>Anormal</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">3.2 PALPAÇÃO - APRESENTA DOR?</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-slate-700">
                <option>Selecione...</option>
                <option>Sim</option>
                <option>Não</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">3.2 PALPAÇÃO - TÔNUS MUSCULAR</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-slate-700">
                <option>Selecione...</option>
                <option>Normal</option>
                <option>Hipotonia</option>
                <option>Hipertonia</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">3.2 PALPAÇÃO - TROFISMO</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 text-slate-700">
                <option>Selecione...</option>
                <option>Normal</option>
                <option>Hipotrofia</option>
                <option>Hipertrofia</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">ESCALA DE DOR (EVA)</label>
              <div className="pt-2 pb-1 relative">
                <input 
                  type="range" 
                  min="0" 
                  max="10" 
                  value={dor} 
                  onChange={(e) => setDor(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600" 
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold text-slate-400 mt-1 uppercase">
                <span>0 = SG</span>
                <span className="text-blue-600 font-black">{dor}</span>
                <span>10 = MÁX</span>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">4. TESTES ORTOPÉDICOS</label>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* MMSS */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase mb-3">MMSS</h4>
                <div className="space-y-2">
                  {['APLEY', 'LATA VAZIA', 'YERGASON', 'NEER', 'COZEN', 'EPICONDILITE LAT', 'EPICONDILITE MED', 'PHALEN', 'PHALEN INVERTIDO'].map(teste => (
                    <div key={teste} className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-600">{teste}</span>
                      <select className="bg-white border border-slate-200 rounded text-[10px] p-1 w-20 outline-none">
                        <option value="">N/A</option>
                        <option value="+">(+) Pos</option>
                        <option value="-">(-) Neg</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* MMII */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase mb-3">MMII</h4>
                <div className="space-y-2">
                  {['TRENDELENBURG', 'THOMAS', 'APREENSÃO PATELAR', 'GAVETA ANTERIOR', 'APLEY', 'THOMPSON', 'GAVETA ANT TORNOZELO', 'GAVETA POS TORNOZELO'].map(teste => (
                    <div key={teste} className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-600">{teste}</span>
                      <select className="bg-white border border-slate-200 rounded text-[10px] p-1 w-20 outline-none">
                        <option value="">N/A</option>
                        <option value="+">(+) Pos</option>
                        <option value="-">(-) Neg</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* COLUNA */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h4 className="text-xs font-bold text-slate-800 uppercase mb-3">COLUNA</h4>
                <div className="space-y-2">
                  {['COMPRESSÃO', 'TRAÇÃO', 'BRUDZINSKI', 'LASÈGUE'].map(teste => (
                    <div key={teste} className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-600">{teste}</span>
                      <select className="bg-white border border-slate-200 rounded text-[10px] p-1 w-20 outline-none">
                        <option value="">N/A</option>
                        <option value="+">(+) Pos</option>
                        <option value="-">(-) Neg</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">5. EXAMES COMPLEMENTARES</label>
            <textarea className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 min-h-[50px] outline-none focus:ring-2 focus:ring-blue-500 text-slate-700 placeholder:text-slate-400" placeholder="Ex: Raio-X de Tórax (10/05): Sem alterações evidentes..."></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">6. DESCRIÇÃO / DIAGNÓSTICO FISIOTERAPÊUTICO</label>
            <textarea className="w-full bg-red-50 border border-red-200 rounded-lg p-3 min-h-[80px] outline-none focus:ring-2 focus:ring-red-500 text-red-700 placeholder:text-red-400" placeholder="Descreva observações clínicas e diagnóstico funcional..."></textarea>
          </div>

          <div className="mb-6">
            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">7. CONDUTA / PROTOCOLO REALIZADO</label>
            <textarea className="w-full bg-blue-50/50 border border-blue-200 rounded-lg p-3 min-h-[80px] outline-none focus:ring-2 focus:ring-blue-500 text-blue-700 placeholder:text-blue-400" placeholder="Condutas adotadas, terapias aplicadas..."></textarea>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50 shrink-0 rounded-b-xl">
          <button onClick={onClose} className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
            Cancelar
          </button>
          <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-colors">
            Salvar Avaliação
          </button>
        </div>
      </div>
    </div>
  );
}
