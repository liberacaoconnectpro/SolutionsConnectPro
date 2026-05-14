import React, { useState } from 'react';
import { ChevronLeft, Building2, User, ShieldCheck, Settings, Database, CreditCard, Download, Upload, Printer, Clock, TrendingUp } from 'lucide-react';

export function ConfiguracoesDetalhes({ initialTab, onBack }: { initialTab: string, onBack: () => void }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { id: 'unidade', label: 'Unidade', icon: Building2 },
    { id: 'perfil', label: 'Meu Perfil', icon: User },
    { id: 'seguranca', label: 'Segurança', icon: ShieldCheck },
    { id: 'agenda', label: 'Agenda', icon: Settings },
    { id: 'backup', label: 'Backup', icon: Database },
    { id: 'assinatura', label: 'Assinatura', icon: CreditCard },
  ];

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-[#1a1b26] uppercase tracking-tight">Ajustes Detalhados</h1>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-0.5">Controle técnico da sua conta</p>
          </div>
        </div>
        <div className="px-4 py-1.5 rounded-full border border-slate-200 bg-white shadow-sm flex items-center gap-2">
           <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest">Estado Atual:</span>
           <span className="text-[10px] font-black text-[#cbbcf6] uppercase tracking-widest">Produtivo</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {/* Tabs Header */}
        <div className="flex border-b border-slate-100 overflow-x-auto hide-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-xs font-bold uppercase tracking-widest border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id 
                  ? 'border-[#cbbcf6] text-slate-800' 
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:bg-slate-50'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-[#cbbcf6]' : ''}`} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-8 bg-[#fafafa] flex-1">
          {/* UNIDADE */}
          {activeTab === 'unidade' && (
            <div className="w-full space-y-6">
              <div>
                 <h2 className="text-xl font-black text-[#1a1b26] uppercase tracking-tight">Dados da Unidade</h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Informações institucionais e localização da sua clínica</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                 <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
                       <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Identidade Visual</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Como sua clínica aparece para os pacientes</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="block text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2">Nome da Clínica</label>
                       <input type="text" defaultValue="MG FISIOTERAPIA" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium" />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2">Responsável Técnico</label>
                       <input type="text" defaultValue="Mailton Garrido Canuto" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium" />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                 <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
                       <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Localização</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Endereço completo da sua unidade de atendimento</p>
                    </div>
                 </div>
                 
                 <div className="space-y-6">
                    <div className="grid grid-cols-[3fr_1fr] gap-6">
                       <div>
                          <label className="block text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2">Logradouro / Rua</label>
                          <input type="text" defaultValue="Rua Vicente Celestino" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium" />
                       </div>
                       <div>
                          <label className="block text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2">Número</label>
                          <input type="text" defaultValue="22" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium" />
                       </div>
                    </div>
                    <div className="grid grid-cols-[2fr_2fr_1fr] gap-6">
                       <div>
                          <label className="block text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2">Bairro</label>
                          <input type="text" defaultValue="Marechal Rondon" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium" />
                       </div>
                       <div>
                          <label className="block text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2">Cidade</label>
                          <input type="text" defaultValue="Salvador" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium" />
                       </div>
                       <div>
                          <label className="block text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2">Estado</label>
                          <select className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium bg-white">
                             <option>BA</option>
                             <option>SP</option>
                             <option>RJ</option>
                          </select>
                       </div>
                    </div>
                 </div>

                 <div className="mt-8 flex justify-end">
                    <button className="px-6 py-3.5 bg-[#d8b4fe] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#c084fc] transition-colors shadow-sm">
                       Salvar Alterações
                    </button>
                 </div>
              </div>
            </div>
          )}

          {/* MEU PERFIL */}
          {activeTab === 'perfil' && (
            <div className="w-full space-y-6">
              <div>
                 <h2 className="text-xl font-black text-[#1a1b26] uppercase tracking-tight">Meu Perfil</h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Gerencie suas informações pessoais e de acesso</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                 <div className="flex items-start gap-6 border-b border-slate-100 pb-8 mb-8">
                    <div className="w-24 h-24 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-[#1a1a24] font-black text-4xl shadow-sm shrink-0">
                       M
                    </div>
                    <div className="pt-2">
                       <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Foto do Perfil</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 mb-4">Sua foto aparecerá nos agendamentos e avaliações</p>
                       <div className="flex items-center gap-4">
                          <button className="px-4 py-2 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-700 tracking-wider uppercase hover:bg-slate-50 transition-colors">
                             Alterar Foto
                          </button>
                          <button className="px-4 py-2 text-[10px] font-bold text-rose-500 tracking-wider uppercase hover:text-rose-600 transition-colors">
                             Remover
                          </button>
                       </div>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6">
                    <div>
                       <label className="block text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2">Nome Completo</label>
                       <input type="text" defaultValue="Mailton Garrido Canuto" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium" />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2">E-mail de Acesso</label>
                       <input type="email" defaultValue="profissional@exemplo.com" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium bg-slate-50 text-slate-500" readOnly />
                    </div>
                 </div>

                 <div className="mt-8 flex justify-end">
                    <button className="px-6 py-3.5 bg-[#1a1b26] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-colors shadow-sm">
                       Salvar Perfil
                    </button>
                 </div>
              </div>
            </div>
          )}

          {/* SEGURANÇA */}
          {activeTab === 'seguranca' && (
            <div className="w-full space-y-6">
              <div>
                 <h2 className="text-xl font-black text-[#1a1b26] uppercase tracking-tight">Segurança e Acesso</h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Proteja os dados dos seus pacientes e sua conta</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                 <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
                       <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Alteração de Senha</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Mantenha sua conta protegida com uma senha forte</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-6 mb-8">
                    <div>
                       <label className="block text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2">Nova Senha</label>
                       <input type="password" placeholder="Mínimo 8 caracteres" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium" />
                    </div>
                    <div>
                       <label className="block text-[10px] font-black text-slate-800 uppercase tracking-widest mb-2">Confirmar Senha</label>
                       <input type="password" placeholder="Repita a nova senha" className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium" />
                    </div>
                 </div>

                 <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
                    <label className="block text-[10px] font-black text-slate-800 uppercase tracking-widest mb-4">Verificador de Segurança</label>
                    <div className="grid grid-cols-3 gap-y-4">
                       <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border border-slate-300 bg-white"></div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">8+ Caracteres</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border border-slate-300 bg-white"></div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Maiúscula</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border border-slate-300 bg-white"></div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Número</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border border-slate-300 bg-white"></div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Símbolo (@$!...)</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full border border-slate-300 bg-white"></div>
                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Coincidência</span>
                       </div>
                    </div>
                 </div>

                 <div className="flex justify-center">
                    <button className="bg-slate-400 text-white text-xs font-black uppercase tracking-widest px-8 py-3.5 rounded-xl cursor-not-allowed">
                       Atualizar Senha de Acesso
                    </button>
                 </div>
              </div>
            </div>
          )}

          {/* AGENDA */}
          {activeTab === 'agenda' && (
            <div className="w-full space-y-6">
              <div>
                 <h2 className="text-xl font-black text-[#1a1b26] uppercase tracking-tight">Ajustes da Agenda</h2>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Defina os horários de funcionamento da sua clínica</p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                 <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
                       <Settings className="w-5 h-5" />
                    </div>
                    <div>
                       <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Funcionamento</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Horários padrão para novos agendamentos</p>
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-12 mb-8">
                    <div>
                       <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-4">Expediente Diário</h4>
                       <div className="flex gap-4">
                          <div className="flex-1">
                             <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Início</label>
                             <div className="relative">
                                <input type="time" defaultValue="07:00" className="w-full border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium" />
                             </div>
                          </div>
                          <div className="flex-1">
                             <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Fim</label>
                             <div className="relative">
                                <input type="time" defaultValue="16:30" className="w-full border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium" />
                             </div>
                          </div>
                       </div>
                    </div>
                    <div>
                       <h4 className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-4">Intervalo de Almoço</h4>
                       <div className="flex gap-4">
                          <div className="flex-1">
                             <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Saída</label>
                             <div className="relative">
                                <input type="time" defaultValue="12:00" className="w-full border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium" />
                             </div>
                          </div>
                          <div className="flex-1">
                             <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Retorno</label>
                             <div className="relative">
                                <input type="time" defaultValue="13:00" className="w-full border border-slate-200 rounded-xl pl-4 pr-10 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium" />
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button className="px-6 py-3.5 bg-[#d8b4fe] text-white text-xs font-black uppercase tracking-widest rounded-xl hover:bg-[#c084fc] transition-colors shadow-sm">
                       Atualizar Agenda
                    </button>
                 </div>
              </div>
            </div>
          )}

          {/* BACKUP */}
          {activeTab === 'backup' && (
             <div className="w-full space-y-6">
               <div>
                  <h2 className="text-xl font-black text-[#1a1b26] uppercase tracking-tight">Backup & Dados</h2>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Gerencie a soberania da sua base de dados</p>
               </div>
 
               <div className="bg-white rounded-2xl border border-slate-200 p-12 shadow-sm text-center flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-800 mb-6 shadow-sm">
                     <Database className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-wider mb-2">Soberania da Informação</h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest leading-relaxed max-w-md mb-12">
                     Você pode exportar toda a sua base de dados clínicos em formato JSON a qualquer momento para backups manuais ou migração.
                  </p>

                  <div className="grid grid-cols-3 gap-6 w-full max-w-2xl mb-8">
                     <button className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all group shadow-sm">
                        <Download className="w-6 h-6 text-slate-600 mb-4 group-hover:text-blue-500 transition-colors" />
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1">Exportar Dados</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Download Completo .JSON</span>
                     </button>
                     <button className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all group shadow-sm">
                        <Upload className="w-6 h-6 text-slate-600 mb-4 group-hover:text-green-500 transition-colors" />
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1">Importar Base</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Restaurar de arquivo .JSON</span>
                     </button>
                     <button className="flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 hover:bg-slate-50 transition-all group shadow-sm">
                        <Printer className="w-6 h-6 text-slate-600 mb-4 transition-colors" />
                        <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-1">Ficha Em Branco</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Uso Manual (Backup)</span>
                     </button>
                  </div>

                  <div className="bg-rose-50/50 border border-rose-100 rounded-xl p-4 w-full max-w-2xl">
                     <p className="text-[10px] font-black text-rose-500 uppercase tracking-widest leading-relaxed">
                        Atenção: A importação de dados substitui os registros atuais. Certifique-se de ter um backup antes de prosseguir.
                     </p>
                  </div>
               </div>
             </div>
          )}

          {/* ASSINATURA */}
          {activeTab === 'assinatura' && (
             <div className="space-y-6">
                <div>
                   <h2 className="text-xl font-black text-[#1a1b26] uppercase tracking-tight">Assinatura e Plano</h2>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Gerencie seu ciclo de faturamento e recursos</p>
                </div>
                
                <div className="grid grid-cols-[1fr_350px] gap-6">
                   <div className="space-y-6">
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                         <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                                  <ShieldCheck className="w-5 h-5" />
                               </div>
                               <div>
                                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Plano FisioPro Elite</h3>
                                  <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mt-0.5">Ativo e Regular</p>
                               </div>
                            </div>
                            <div className="text-right">
                               <p className="text-lg font-black text-slate-800">R$ 42,99</p>
                               <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Cobrança Mensal</p>
                            </div>
                         </div>
                         
                         <div className="border-t border-slate-100 pt-6">
                            <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-4">Recursos Incluídos:</p>
                            <div className="grid grid-cols-2 gap-y-3">
                               <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 className="w-3 h-3" /></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pacientes Ilimitados</span></div>
                               <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 className="w-3 h-3" /></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Agenda Inteligente</span></div>
                               <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 className="w-3 h-3" /></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Financeiro Completo</span></div>
                               <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 className="w-3 h-3" /></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Prontuário Personalizado</span></div>
                               <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 className="w-3 h-3" /></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Suporte Prioritário</span></div>
                               <div className="flex items-center gap-2"><div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><CheckCircle2 className="w-3 h-3" /></div><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Backup Automático</span></div>
                            </div>
                         </div>
                      </div>

                      <div className="bg-[#1a1b26] rounded-2xl shadow-sm p-6 flex items-center justify-between">
                         <div className="flex items-center gap-12">
                            <div>
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Status do Ciclo</p>
                               <div className="flex items-center gap-3">
                                  <div className="w-8 h-8 rounded-full border border-slate-600 flex items-center justify-center text-white"><Clock className="w-4 h-4" /></div>
                                  <div className="flex flex-col">
                                     <span className="text-xl font-black text-white leading-none">28 <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Dias Restantes</span></span>
                                  </div>
                               </div>
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-[#cbbcf6] uppercase tracking-widest mb-1">Início</p>
                               <div className="flex items-center gap-2 text-white"><CalendarIcon className="w-4 h-4 text-slate-400" /><span className="text-xs font-bold">10/05/2026</span></div>
                               <p className="text-[9px] font-bold text-slate-500 mt-0.5 ml-6">Ativado Em</p>
                            </div>
                            <div>
                               <p className="text-[10px] font-black text-[#cbbcf6] uppercase tracking-widest mb-1">Vencimento</p>
                               <div className="flex items-center gap-2 text-white"><CreditCard className="w-4 h-4 text-slate-400" /><span className="text-xs font-bold">10/06/2026</span></div>
                               <p className="text-[9px] font-bold text-slate-500 mt-0.5 ml-6">Próxima Renovação</p>
                            </div>
                         </div>
                      </div>

                      <div className="bg-orange-50 border border-orange-100 rounded-2xl p-6 flex items-center justify-between shadow-sm">
                         <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500"><TrendingUp className="w-5 h-5" /></div>
                            <div>
                               <p className="text-sm font-black text-slate-800 uppercase tracking-wider">Upgrade Agendado</p>
                               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">Muda para no próximo ciclo</p>
                            </div>
                         </div>
                         <button className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:text-rose-600">Cancelar Agendamento</button>
                      </div>

                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-64 flex flex-col">
                         <div className="flex items-center gap-3 mb-6">
                            <div className="flex items-center justify-center text-slate-400"><History className="w-5 h-5" /></div>
                            <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider">Histórico de Faturas</h3>
                         </div>
                         <div className="flex-1 border border-dashed border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 bg-slate-50/50">
                            <History className="w-6 h-6 mb-2 opacity-50" />
                            <p className="text-[10px] font-bold uppercase tracking-widest">Nenhuma Fatura Encontrada</p>
                         </div>
                      </div>

                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
                         <h3 className="text-sm font-black text-slate-800 uppercase tracking-wider mb-6">Planos Disponíveis</h3>
                         <div className="grid grid-cols-3 gap-6">
                            {/* plan essential */}
                            <div className="border border-slate-200 rounded-2xl p-6 relative">
                               <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1">Essencial</h4>
                               <div className="flex items-baseline gap-1 mb-4">
                                  <span className="text-lg font-black text-[#cbbcf6]">R$ 29,90</span><span className="text-[9px] font-bold text-slate-400 uppercase">/mês</span>
                               </div>
                               <div className="space-y-3 mb-6">
                                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider leading-relaxed">Até 50 pacientes</span></div>
                                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider leading-relaxed">Agenda Completa</span></div>
                                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider leading-relaxed">Suporte Básico</span></div>
                               </div>
                               <button className="w-full py-2 border border-[#d8b4fe] text-[#d8b4fe] text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-colors">Selecionar</button>
                            </div>
                            
                            {/* plan professional */}
                            <div className="border border-slate-200 rounded-2xl p-6 relative">
                               <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1">Profissional</h4>
                               <div className="flex items-baseline gap-1 mb-4">
                                  <span className="text-lg font-black text-[#cbbcf6]">R$ 49,90</span><span className="text-[9px] font-bold text-slate-400 uppercase">/mês</span>
                               </div>
                               <div className="space-y-3 mb-6">
                                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider leading-relaxed">Até 200 pacientes</span></div>
                                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider leading-relaxed">Múltiplos profissiona...</span></div>
                                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider leading-relaxed">Fichas Customiza...</span></div>
                               </div>
                               <button className="w-full py-2 border border-[#d8b4fe] text-[#d8b4fe] text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-colors">Selecionar</button>
                            </div>

                            {/* plan premium */}
                            <div className="border border-slate-200 rounded-2xl p-6 relative">
                               <h4 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-1">Premium</h4>
                               <div className="flex items-baseline gap-1 mb-4">
                                  <span className="text-lg font-black text-[#cbbcf6]">R$ 59,90</span><span className="text-[9px] font-bold text-slate-400 uppercase">/mês</span>
                               </div>
                               <div className="space-y-3 mb-6">
                                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider leading-relaxed">Ilimitado</span></div>
                                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider leading-relaxed">Relatórios Avanç...</span></div>
                                  <div className="flex items-start gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-[9px] font-bold text-slate-600 uppercase tracking-wider leading-relaxed">Prioridade no sup...</span></div>
                               </div>
                               <button className="w-full py-2 border border-[#d8b4fe] text-[#d8b4fe] text-[10px] font-black uppercase tracking-widest rounded-lg hover:bg-slate-50 transition-colors">Selecionar</button>
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* Sidebar Assinatura */}
                   <div className="space-y-6">
                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
                         <div className="flex items-center gap-2 mb-4">
                            <span className="text-rose-500 font-bold">⚡</span>
                            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider">Forma de Pagamento</h3>
                         </div>
                         <div className="bg-[#1a1b26] rounded-xl p-5 mb-4 text-white">
                            <p className="text-xs font-bold uppercase tracking-widest leading-relaxed text-white">O faturamento mensal será realizado via PIX.</p>
                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest mt-2">Ativo · MG Fisioterapia</p>
                         </div>
                         <button className="w-full py-3.5 border border-slate-200 rounded-xl text-xs font-black text-slate-800 uppercase tracking-widest hover:bg-slate-50 transition-colors">
                            Ver Código PIX
                         </button>
                      </div>

                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed mb-4">
                            Satisfeito com o sistema?<br /> Indique para um colega!
                         </p>
                         <button className="w-full py-3.5 bg-slate-50 border border-slate-200 text-[#d8b4fe] font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-colors shadow-sm">
                            Compartilhar FisioConnectPro
                         </button>
                      </div>

                      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 text-center">
                         <p className="text-[10px] font-black text-slate-800 uppercase tracking-widest leading-relaxed mb-4">
                            Deseja suspender sua conta?
                         </p>
                         <button className="w-full py-3.5 border border-slate-300 rounded-xl text-[10px] font-black text-slate-800 uppercase tracking-widest hover:border-slate-400 transition-colors">
                            Solicitar Cancelamento
                         </button>
                      </div>
                   </div>
                </div>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CheckCircle2(props: any) {
  return (
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
  );
}

function CalendarIcon(props: any) {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
}

function History(props: any) {
  return <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>;
}
