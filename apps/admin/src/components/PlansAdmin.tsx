import React, { useState } from 'react';

export const PlansAdmin: React.FC = () => {
  const [planos] = useState([
    { id: 1, nome: 'Basic', preco: 99.90, limitePacientes: 50 },
    { id: 2, nome: 'Pro', preco: 199.90, limitePacientes: 200 },
    { id: 3, nome: 'Enterprise', preco: 499.90, limitePacientes: 'Ilimitado' },
  ]);

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Planos e Assinaturas</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Criar Plano</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {planos.map(p => (
          <div key={p.id} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h2 className="text-xl font-bold text-slate-800">{p.nome}</h2>
            <div className="mt-4 text-3xl font-extrabold text-blue-600">R$ {p.preco.toFixed(2).replace('.', ',')}</div>
            <div className="text-sm text-slate-500 mt-1">por mês</div>
            
            <ul className="mt-6 space-y-3 mb-6 flex-1">
              <li className="flex items-center text-sm text-slate-600">
                <span className="text-green-500 mr-2">✓</span> Limite: {p.limitePacientes} Cadastros
              </li>
              <li className="flex items-center text-sm text-slate-600">
                <span className="text-green-500 mr-2">✓</span> Suporte Email
              </li>
            </ul>

            <button className="w-full py-2 border border-blue-200 text-blue-600 hover:bg-blue-50 font-bold rounded-lg transition-colors text-sm">
              Editar Plano
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlansAdmin;
