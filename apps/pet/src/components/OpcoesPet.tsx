import React, { useState } from 'react';

export const OpcoesPet: React.FC = () => {
  const [nome, setNome] = useState('PetShop Amigo');

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Opções</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Salvar</button>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Nome do Estabelecimento</label>
            <input type="text" value={nome} onChange={e => setNome(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500" />
          </div>
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded text-purple-600 focus:ring-purple-500" defaultChecked />
              <span className="text-sm text-slate-700">Enviar lembretes de vacina por SMS</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpcoesPet;
