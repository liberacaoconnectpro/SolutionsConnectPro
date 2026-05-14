import React, { useState } from 'react';

export const ClientesAdmin: React.FC = () => {
  const [clientes] = useState([
    { id: 1, nome: 'Fisio Vida', tipo: 'Fisio', plano: 'Pro', status: 'Ativo', vencimento: '2026-06-15' },
    { id: 2, nome: 'Pet Amigo', tipo: 'Pet', plano: 'Basic', status: 'Inadimplente', vencimento: '2026-05-10' },
  ]);

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Clientes Ativos</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Novo Cliente</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
            <tr>
              <th className="py-3 px-5">Nome do Cliente</th>
              <th className="py-3 px-5">Sistema</th>
              <th className="py-3 px-5">Plano</th>
              <th className="py-3 px-5">Vencimento</th>
              <th className="py-3 px-5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clientes.map(c => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="py-3 px-5 font-medium text-slate-800">{c.nome}</td>
                <td className="py-3 px-5">{c.tipo}</td>
                <td className="py-3 px-5"><span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-semibold">{c.plano}</span></td>
                <td className="py-3 px-5">{new Date(c.vencimento).toLocaleDateString('pt-BR')}</td>
                <td className="py-3 px-5">
                  <span className={`px-2 py-1 flex w-fit rounded-full text-xs font-bold ${c.status === 'Ativo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClientesAdmin;
