import React, { useState } from 'react';

export const AnimaisView: React.FC = () => {
  const [animais] = useState([
    { id: 1, nome: 'Rex', especie: 'Cachorro', raca: 'Golden Retriever', tutor: 'João Silva', ultimaConsulta: '2026-04-10', vacina: 'Em dia' },
    { id: 2, nome: 'Mia', especie: 'Gato', raca: 'Siamês', tutor: 'Maria Souza', ultimaConsulta: '2026-05-02', vacina: 'Atrasada' },
  ]);

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Animais</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium">Novo Animal</button>
      </div>

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
            <tr>
              <th className="py-3 px-5">Nome</th>
              <th className="py-3 px-5">Espécie/Raça</th>
              <th className="py-3 px-5">Tutor</th>
              <th className="py-3 px-5">Última Consulta</th>
              <th className="py-3 px-5">Status Vacina</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {animais.map(animal => (
              <tr key={animal.id} className="hover:bg-slate-50">
                <td className="py-3 px-5 font-medium text-slate-800">{animal.nome}</td>
                <td className="py-3 px-5">{animal.especie} - {animal.raca}</td>
                <td className="py-3 px-5">{animal.tutor}</td>
                <td className="py-3 px-5">{new Date(animal.ultimaConsulta).toLocaleDateString('pt-BR')}</td>
                <td className="py-3 px-5">
                  <span className={`px-2 py-1 flex w-fit rounded-full text-xs font-bold ${animal.vacina === 'Em dia' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {animal.vacina}
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

export default AnimaisView;
