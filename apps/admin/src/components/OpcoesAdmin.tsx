import React, { useState } from 'react';

export const OpcoesAdmin: React.FC = () => {
  const [manutencao, setManutencao] = useState(false);

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Configurações Globais</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Salvar Alterações</button>
      </div>

      <div className="bg-white p-6 rounded-xl border border-slate-200 max-w-3xl">
        <h2 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-100 pb-2">Sistema</h2>
        
        <div className="space-y-5">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-100">
            <div>
              <div className="font-semibold text-slate-800">Modo de Manutenção</div>
              <div className="text-sm text-slate-500">Bloqueia o acesso a todos os clientes durante atualizações</div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={manutencao} onChange={() => setManutencao(!manutencao)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">E-mail de Contato Suporte</label>
            <input type="email" defaultValue="suporte@connectpro.com" className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpcoesAdmin;
