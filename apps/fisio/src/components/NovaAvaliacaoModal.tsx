import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export interface Avaliacao {
  id?: string;
  pacienteId: string;
  data: string;
  tipo: string;
  peso: number;
  altura: number;
  imc: number;
  postura: string;
  adm: string;
  dor: number;
  observacoes: string;
}

export interface NovaAvaliacaoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSalvar: (avaliacao: Avaliacao) => void;
  pacienteId: string;
}

export const NovaAvaliacaoModal: React.FC<NovaAvaliacaoModalProps> = ({ isOpen, onClose, onSalvar, pacienteId }) => {
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [tipo, setTipo] = useState('inicial');
  const [peso, setPeso] = useState<number | ''>('');
  const [altura, setAltura] = useState<number | ''>('');
  const [imc, setImc] = useState<number>(0);
  const [postura, setPostura] = useState('');
  const [adm, setAdm] = useState('');
  const [dor, setDor] = useState<number>(0);
  const [observacoes, setObservacoes] = useState('');

  // Auto-calcular IMC
  useEffect(() => {
    if (peso && altura) {
      const alturaMetros = altura > 3 ? altura / 100 : altura;
      const calcImc = (peso / (alturaMetros * alturaMetros)).toFixed(1);
      setImc(parseFloat(calcImc));
    } else {
      setImc(0);
    }
  }, [peso, altura]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!peso || !altura || !tipo) {
      alert("Preencha ao menos tipo, peso e altura.");
      return;
    }

    const novaAv: Avaliacao = {
      id: Date.now().toString(),
      pacienteId,
      data,
      tipo,
      peso: Number(peso),
      altura: Number(altura),
      imc,
      postura,
      adm,
      dor,
      observacoes
    };
    onSalvar(novaAv);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Nova Avaliação Física</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="overflow-auto p-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Data da Avaliação</label>
              <input 
                type="date"
                required
                value={data}
                onChange={e => setData(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Tipo de Avaliação *</label>
              <select 
                value={tipo}
                onChange={e => setTipo(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="inicial">Avaliação Inicial</option>
                <option value="reavaliacao">Reavaliação</option>
                <option value="alta">Alta Fisioterapêutica</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 border-t border-slate-100 pt-5 text-sm">
            <div>
              <label className="block font-medium text-slate-700 mb-1">Peso (kg) *</label>
              <input 
                type="number"
                step="0.1"
                required
                value={peso}
                onChange={e => setPeso(parseFloat(e.target.value) || '')}
                placeholder="Ex: 75.5"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">Altura (m) *</label>
              <input 
                type="number"
                step="0.01"
                required
                value={altura}
                onChange={e => setAltura(parseFloat(e.target.value) || '')}
                placeholder="Ex: 1.75"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
              />
            </div>
            <div>
              <label className="block font-medium text-slate-700 mb-1">IMC Calc.</label>
              <div className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 font-semibold flex items-center h-[38px]">
                {imc > 0 ? imc : '--'}
              </div>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-5">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Escala de Dor (EVA) - {dor}
            </label>
            <input 
              type="range"
              min="0"
              max="10"
              value={dor}
              onChange={e => setDor(parseInt(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1 px-1 font-medium">
              <span>0 (Sem dor)</span>
              <span>5 (Moderada)</span>
              <span className="text-rose-400">10 (Insuportável)</span>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Postura</label>
              <textarea 
                value={postura}
                onChange={e => setPostura(e.target.value)}
                placeholder="Desvios posturais, discrepâncias..."
                className="w-full h-20 resize-none px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Amplitude de Movimento (ADM)</label>
              <textarea 
                value={adm}
                onChange={e => setAdm(e.target.value)}
                placeholder="Limitações observadas..."
                className="w-full h-20 resize-none px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Outras Observações</label>
              <textarea 
                value={observacoes}
                onChange={e => setObservacoes(e.target.value)}
                placeholder="Resultados de testes específicos, recomendações..."
                className="w-full h-20 resize-none px-3 py-2 border border-slate-300 rounded-lg text-sm outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              />
            </div>
          </div>
        </form>

        <div className="p-4 bg-slate-50 border-t border-slate-200 rounded-b-2xl flex justify-end gap-3 shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 text-slate-600 bg-white hover:bg-slate-50 font-medium rounded-lg text-sm transition-colors"
          >
            Cancelar
          </button>
          <button 
            type="button"
            onClick={handleSubmit} 
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm shadow-sm transition-colors"
          >
            Salvar Avaliação
          </button>
        </div>
      </div>
    </div>
  );
};

export default NovaAvaliacaoModal;
