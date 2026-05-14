import React, { useState } from 'react';

interface Profissional {
  id: string;
  nome: string;
  especialidade: string;
  crf: string;
  status: 'ativo' | 'inativo';
  pacientes: number;
  sessoesSemana: number;
  avaliacao: number;
  avatarUrl: string;
}

export const EquipeView: React.FC = () => {
  const [equipe] = useState<Profissional[]>([
    {
      id: '1',
      nome: 'Dr. Thiago Santos',
      especialidade: 'Ortopedia e Traumatologia',
      crf: 'CRF-SP 12345',
      status: 'ativo',
      pacientes: 45,
      sessoesSemana: 32,
      avaliacao: 4.8,
      avatarUrl: 'https://ui-avatars.com/api/?name=Thiago+Santos&background=0D8ABC&color=fff'
    },
    {
      id: '2',
      nome: 'Dra. Amanda Costa',
      especialidade: 'Fisioterapia Pélvica',
      crf: 'CRF-SP 54321',
      status: 'ativo',
      pacientes: 28,
      sessoesSemana: 20,
      avaliacao: 4.9,
      avatarUrl: 'https://ui-avatars.com/api/?name=Amanda+Costa&background=10B981&color=fff'
    },
    {
      id: '3',
      nome: 'Dr. Roberto Almeida',
      especialidade: 'Desportiva',
      crf: 'CRF-SP 98765',
      status: 'inativo',
      pacientes: 0,
      sessoesSemana: 0,
      avaliacao: 4.5,
      avatarUrl: 'https://ui-avatars.com/api/?name=Roberto+Almeida&background=64748B&color=fff'
    }
  ]);

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Equipe</h1>
          <p className="text-slate-500 text-sm mt-1">Gestão de profissionais e fisioterapeutas</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          Adicionar Membro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {equipe.map((membro) => (
          <div key={membro.id} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-shadow">
            <div className="p-6 flex-1">
              <div className="flex justify-between items-start mb-4">
                <img 
                  src={membro.avatarUrl} 
                  alt={membro.nome} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-slate-100"
                />
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${membro.status === 'ativo' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'}`}>
                  {membro.status === 'ativo' ? 'Ativo' : 'Inativo'}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-slate-800 leading-tight">{membro.nome}</h3>
              <p className="text-sm text-blue-600 font-medium mb-1">{membro.especialidade}</p>
              <p className="text-xs text-slate-400 mb-6">{membro.crf}</p>
              
              <div className="grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-slate-700">{membro.pacientes}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Pacientes</div>
                </div>
                <div className="text-center border-x border-slate-100">
                  <div className="text-lg font-bold text-slate-700">{membro.sessoesSemana}</div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Sessões/Sem</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-amber-500 flex items-center justify-center gap-1">
                    {membro.avaliacao.toFixed(1)}
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Avaliação</div>
                </div>
              </div>
            </div>
            <div className="bg-slate-50 border-t border-slate-100 px-6 py-3 flex justify-end gap-2">
              <button className="text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors">Ver Perfil</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EquipeView;
