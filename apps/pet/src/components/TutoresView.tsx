import React, { useState } from 'react';

export const TutoresView: React.FC = () => {
  const [tutores] = useState([
    { id: 1, nome: 'João Silva', contato: '(11) 99999-1111', email: 'joao@email.com', animais: ['Rex'] },
    { id: 2, nome: 'Maria Souza', contato: '(11) 98888-2222', email: 'maria@email.com', animais: ['Mia', 'Fred'] },
  ]);

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Tutores</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Novo Tutor</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tutores.map(t => (
          <div key={t.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col">
            <h3 className="font-bold text-lg text-slate-800">{t.nome}</h3>
            <div className="text-slate-500 text-sm mt-1">{t.email} • {t.contato}</div>
            
            <div className="mt-4 pt-4 border-t border-slate-100">
              <span className="text-xs font-semibold text-slate-400 uppercase">Animais Cadastrados</span>
              <div className="flex gap-2 mt-2">
                {t.animais.map(animal => (
                  <span key={animal} className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">{animal}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutoresView;
