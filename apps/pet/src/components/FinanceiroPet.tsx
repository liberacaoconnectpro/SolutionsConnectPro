import React, { useState } from 'react';

export const FinanceiroPet: React.FC = () => {
  const [transacoes] = useState([
    { id: 1, data: '2026-05-14', desc: 'Consulta - Rex', tipo: 'entrada', valor: 150.0 },
    { id: 2, data: '2026-05-12', desc: 'Fornecedor - Vacinas', tipo: 'saida', valor: 850.0 },
  ]);

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Financeiro Pet</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Lançamento</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="text-slate-500 text-sm font-medium mb-1">Receitas Mês</div>
          <div className="text-xl font-bold text-green-600">R$ 5.430,00</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="text-slate-500 text-sm font-medium mb-1">Despesas Mês</div>
          <div className="text-xl font-bold text-red-600">R$ 2.100,00</div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-slate-200">
          <div className="text-slate-500 text-sm font-medium mb-1">Saldo</div>
          <div className="text-xl font-bold text-blue-600">R$ 3.330,00</div>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase text-xs">
            <tr>
              <th className="py-3 px-5">Data</th>
              <th className="py-3 px-5">Descrição</th>
              <th className="py-3 px-5">Tipo</th>
              <th className="py-3 px-5">Valor</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {transacoes.map(t => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="py-3 px-5">{new Date(t.data).toLocaleDateString('pt-BR')}</td>
                <td className="py-3 px-5">{t.desc}</td>
                <td className="py-3 px-5">
                  <span className={`px-2 py-1 flex w-fit rounded-full text-xs font-bold ${t.tipo === 'entrada' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {t.tipo === 'entrada' ? 'Entrada' : 'Saída'}
                  </span>
                </td>
                <td className="py-3 px-5 font-medium">R$ {t.valor.toFixed(2).replace('.', ',')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FinanceiroPet;
