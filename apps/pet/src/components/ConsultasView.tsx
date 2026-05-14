import React, { useState } from 'react';

export const ConsultasView: React.FC = () => {
  const [data] = useState('2026-05-14');

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Agenda de Consultas</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Nova Consulta</button>
      </div>

      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm mb-6">
        <div className="font-semibold text-slate-800 mb-4">Hoje, {new Date(data).toLocaleDateString('pt-BR')}</div>
        <div className="space-y-3">
          {['09:00', '10:00', '14:00', '16:00'].map(hora => (
            <div key={hora} className="flex items-center gap-4 p-3 border border-slate-100 rounded-lg hover:bg-slate-50">
              <div className="text-purple-600 font-bold w-12">{hora}</div>
              <div className="flex-1">
                <div className="font-semibold text-slate-800">Consulta de Rotina</div>
                <div className="text-sm text-slate-500">Animal: Rex (Golden Retriever)</div>
              </div>
              <div>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-bold">Agendado</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConsultasView;
