import React, { useState } from 'react';

// Interfaces
interface Transacao {
  id: string;
  data: string;
  descricao: string;
  paciente?: string;
  tipo: 'entrada' | 'saida';
  valor: number;
  status: 'pago' | 'pendente';
}

export const FinanceiroView: React.FC = () => {
  const [periodo, setPeriodo] = useState('mes');
  const [transacoes] = useState<Transacao[]>([
    { id: '1', data: '2026-05-14', descricao: 'Sessão RPG', paciente: 'João Silva', tipo: 'entrada', valor: 150, status: 'pago' },
    { id: '2', data: '2026-05-13', descricao: 'Sessão Pilates', paciente: 'Maria Souza', tipo: 'entrada', valor: 120, status: 'pendente' },
    { id: '3', data: '2026-05-12', descricao: 'Material de Limpeza', tipo: 'saida', valor: 85.50, status: 'pago' },
    { id: '4', data: '2026-05-10', descricao: 'Sessão Quiropraxia', paciente: 'Carlos Pereira', tipo: 'entrada', valor: 200, status: 'pago' },
    { id: '5', data: '2026-05-09', descricao: 'Conta de Energia', tipo: 'saida', valor: 350, status: 'pendente' },
  ]);

  const resumo = {
    receitas: 470, // Mock baseado nos de cima entradas pagas ou geral
    despesas: 85.50, // Mock
    lucro: 384.50,
    inadimplencia: 120 // Pendentes de entrada
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  };

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Financeiro</h1>
          <p className="text-slate-500 text-sm mt-1">Gestão de receitas e despesas</p>
        </div>
        <div className="flex items-center gap-4">
          <select 
            value={periodo} 
            onChange={(e) => setPeriodo(e.target.value)}
            className="border-slate-200 border rounded-lg px-3 py-2 bg-white text-sm outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
          >
            <option value="semana">Esta Semana</option>
            <option value="mes">Este Mês</option>
            <option value="ano">Este Ano</option>
          </select>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Nova Transação
          </button>
        </div>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Receita do Mês</div>
          <div className="text-2xl font-bold text-emerald-600">{formatCurrency(resumo.receitas)}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Despesas</div>
          <div className="text-2xl font-bold text-rose-600">{formatCurrency(resumo.despesas)}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Lucro Líquido</div>
          <div className="text-2xl font-bold text-blue-600">{formatCurrency(resumo.lucro)}</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="text-slate-500 text-sm font-medium mb-1">Inadimplência</div>
          <div className="text-2xl font-bold text-amber-500">{formatCurrency(resumo.inadimplencia)}</div>
        </div>
      </div>

      {/* Tabela de Transações */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="font-semibold text-slate-800">Transações Recentes</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-medium tracking-wider text-xs uppercase">
              <tr>
                <th className="py-3 px-5">Data</th>
                <th className="py-3 px-5">Descrição</th>
                <th className="py-3 px-5">Paciente</th>
                <th className="py-3 px-5">Tipo</th>
                <th className="py-3 px-5">Valor</th>
                <th className="py-3 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transacoes.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-5 whitespace-nowrap">{formatDate(item.data)}</td>
                  <td className="py-3 px-5 font-medium text-slate-800">{item.descricao}</td>
                  <td className="py-3 px-5 text-slate-500">{item.paciente || '-'}</td>
                  <td className="py-3 px-5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${item.tipo === 'entrada' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {item.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                    </span>
                  </td>
                  <td className={`py-3 px-5 font-medium ${item.tipo === 'entrada' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {item.tipo === 'entrada' ? '+' : '-'}{formatCurrency(item.valor)}
                  </td>
                  <td className="py-3 px-5">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${item.status === 'pago' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>
                      {item.status === 'pago' ? 'Pago' : 'Pendente'}
                    </span>
                  </td>
                </tr>
              ))}
              {transacoes.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-slate-500">
                    Nenhuma transação encontrada neste período.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FinanceiroView;
