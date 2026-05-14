import React, { useState } from 'react';

export const OpcoesView: React.FC = () => {
  const [config, setConfig] = useState({
    nomeClinica: 'Clínica Bem Estar Fisioterapia',
    emailContato: 'contato@bemestarfisio.exemplo.com',
    telefone: '(11) 98765-4321',
    endereco: 'Av. Paulista, 1000 - São Paulo, SP',
    notificacoesSms: true,
    notificacoesEmail: true,
    lembretesWhatsApp: true,
    temaEscuro: false,
    integracaoAgendaGoogle: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Simulando um save
    console.log('Configurações salvas:', config);
    alert('Configurações salvas com sucesso!');
  };

  return (
    <div className="p-6 bg-slate-50 min-h-full">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Opções e Configurações</h1>
            <p className="text-slate-500 text-sm mt-1">Gerencie as preferências do sistema</p>
          </div>
          <button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm"
          >
            Salvar Alterações
          </button>
        </div>

        <div className="space-y-6">
          {/* Dados da Clínica */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800">Dados da Clínica</h2>
              <p className="text-xs text-slate-500">Informações públicas que aparecem em recibos e agendamentos</p>
            </div>
            <div className="p-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Clínica</label>
                  <input
                    type="text"
                    name="nomeClinica"
                    value={config.nomeClinica}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">E-mail de Contato</label>
                  <input
                    type="email"
                    name="emailContato"
                    value={config.emailContato}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Telefone / WhatsApp</label>
                  <input
                    type="text"
                    name="telefone"
                    value={config.telefone}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Endereço Completo</label>
                  <input
                    type="text"
                    name="endereco"
                    value={config.endereco}
                    onChange={handleChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Notificações */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800">Notificações</h2>
              <p className="text-xs text-slate-500">Como o sistema deve avisar pacientes e profissionais</p>
            </div>
            <div className="p-5 space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="notificacoesSms" checked={config.notificacoesSms} onChange={handleChange} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 checked:border-blue-500 checked:bg-blue-500 transition-all duration-300" style={{ transform: config.notificacoesSms ? 'translateX(100%)' : 'translateX(0)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                  <div className={`block overflow-hidden h-5 rounded-full ${config.notificacoesSms ? 'bg-blue-200' : 'bg-slate-200'}`}></div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-800">Lembretes por SMS</div>
                  <div className="text-xs text-slate-500">Enviar SMS para pacientes 24h antes da sessão</div>
                </div>
              </label>
              
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="notificacoesEmail" checked={config.notificacoesEmail} onChange={handleChange} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 checked:border-blue-500 checked:bg-blue-500 transition-all duration-300" style={{ transform: config.notificacoesEmail ? 'translateX(100%)' : 'translateX(0)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                  <div className={`block overflow-hidden h-5 rounded-full ${config.notificacoesEmail ? 'bg-blue-200' : 'bg-slate-200'}`}></div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-800">Lembretes por E-mail</div>
                  <div className="text-xs text-slate-500">Enviar confirmação de agendamento por e-mail</div>
                </div>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="lembretesWhatsApp" checked={config.lembretesWhatsApp} onChange={handleChange} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 checked:border-emerald-500 checked:bg-emerald-500 transition-all duration-300" style={{ transform: config.lembretesWhatsApp ? 'translateX(100%)' : 'translateX(0)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                  <div className={`block overflow-hidden h-5 rounded-full ${config.lembretesWhatsApp ? 'bg-emerald-200' : 'bg-slate-200'}`}></div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-800">Integração WhatsApp API</div>
                  <div className="text-xs text-emerald-600 font-medium">BETA - Envio automático via WhatsApp</div>
                </div>
              </label>
            </div>
          </section>

          {/* Aparência */}
          <section className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
              <h2 className="text-lg font-bold text-slate-800">Aparência do Sistema</h2>
              <p className="text-xs text-slate-500">Personalize como você vê o sistema</p>
            </div>
            <div className="p-5">
               <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                  <input type="checkbox" name="temaEscuro" checked={config.temaEscuro} onChange={handleChange} className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 appearance-none cursor-pointer border-slate-300 checked:border-slate-800 checked:bg-slate-800 transition-all duration-300" style={{ transform: config.temaEscuro ? 'translateX(100%)' : 'translateX(0)', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                  <div className={`block overflow-hidden h-5 rounded-full ${config.temaEscuro ? 'bg-slate-400' : 'bg-slate-200'}`}></div>
                </div>
                <div>
                  <div className="text-sm font-medium text-slate-800">Modo Escuro (Dark Mode)</div>
                  <div className="text-xs text-slate-500">Aplica tema escuro a todas as telas</div>
                </div>
              </label>
            </div>
          </section>

          {/* Plano */}
          <section className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl border border-transparent shadow-sm overflow-hidden text-white">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold">Plano Profissional</h2>
                  <p className="text-blue-100 text-sm">Sua assinatura está ativa</p>
                </div>
                <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold border border-white/30">
                  Próxima fatura: 10/06/2026
                </div>
              </div>
              <p className="text-sm text-blue-100 mb-4 max-w-lg">
                Você tem acesso a agendamentos ilimitados, prontuário eletrônico completo, controle financeiro e 3 permissões para profissionais.
              </p>
              <button className="bg-white text-blue-700 hover:bg-slate-50 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                Gerenciar Assinatura
              </button>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default OpcoesView;
