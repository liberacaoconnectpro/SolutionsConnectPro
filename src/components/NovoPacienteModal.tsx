import React, { useState } from 'react';
import { X, UserPlus, Save, Loader2 } from 'lucide-react';
import { dbService } from '../services/dbService';

export function NovoPacienteModal({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    birthDate: '',
    cpf: '',
    gender: '',
    phone: '',
    phoneSecondary: '',
    email: '',
    cep: '',
    address: '',
    addressNumber: '',
    complement: '',
    neighborhood: '',
    city: '',
    uf: '',
    insuranceName: '',
    insuranceCard: '',
    notes: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.cpf) {
      alert('Nome e CPF são obrigatórios.');
      return;
    }

    setLoading(true);
    try {
      const response = await dbService.saveData('pacientes', {
        ...formData,
        createdAt: new Date().getTime(),
      });

      if (response.sucesso) {
        alert('Paciente salvo com sucesso!');
        onClose();
      } else {
        alert('Erro ao salvar: ' + response.erro);
      }
    } catch (error) {
      console.error(error);
      alert('Falha na comunicação com o banco de dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#f4f0ff] text-[#cbbcf6] flex items-center justify-center font-bold">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-[#1a1b26] uppercase tracking-wide">NOVO PACIENTE</h2>
              <p className="text-xs text-slate-500 mt-0.5">Cadastrar novo paciente no sistema</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-[#1a1b26] p-2 rounded-xl transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-auto p-6 text-sm">
          <div className="space-y-8">
            {/* Seção Dados Pessoais */}
            <section>
              <h3 className="text-[10px] font-black text-[#cbbcf6] uppercase tracking-widest mb-4">Dados Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Nome Completo</label>
                  <input 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                    placeholder="Nome completo do paciente" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Data de Nascimento</label>
                  <input 
                    name="birthDate"
                    value={formData.birthDate}
                    onChange={handleChange}
                    type="date" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">CPF</label>
                  <input 
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                    placeholder="000.000.000-00" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Gênero</label>
                  <select 
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all"
                  >
                    <option value="">Selecione...</option>
                    <option value="M">Masculino</option>
                    <option value="F">Feminino</option>
                    <option value="O">Outro</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Seção Contato */}
            <section>
              <h3 className="text-[10px] font-black text-[#cbbcf6] uppercase tracking-widest mb-4">Contato</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Telefone Principal (WhatsApp)</label>
                  <input 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                    placeholder="(00) 00000-0000" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Telefone Secundário / Recado</label>
                  <input 
                    name="phoneSecondary"
                    value={formData.phoneSecondary}
                    onChange={handleChange}
                    type="tel" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                    placeholder="(00) 00000-0000" 
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">E-mail</label>
                  <input 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                    placeholder="paciente@exemplo.com" 
                  />
                </div>
              </div>
            </section>

            {/* Seção Endereço */}
            <section>
              <h3 className="text-[10px] font-black text-[#cbbcf6] uppercase tracking-widest mb-4">Endereço</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">CEP</label>
                  <input 
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                    placeholder="00000-000" 
                  />
                </div>
                <div className="col-span-1 md:col-span-3"> {/* Rua takes full width on small screens, 3 cols otherwise */}
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Logradouro</label>
                  <input 
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                    placeholder="Rua, Avenida, etc." 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Número</label>
                  <input 
                    name="addressNumber"
                    value={formData.addressNumber}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                    placeholder="Número" 
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Complemento</label>
                  <input 
                    name="complement"
                    value={formData.complement}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                    placeholder="Apto, Bloco, etc." 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Bairro</label>
                  <input 
                    name="neighborhood"
                    value={formData.neighborhood}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                    placeholder="Bairro" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Cidade</label>
                  <input 
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                    placeholder="Cidade" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Estado</label>
                  <input 
                    name="uf"
                    value={formData.uf}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                    placeholder="UF" 
                  />
                </div>
              </div>
            </section>
            
            {/* Informações Adicionais */}
            <section>
              <h3 className="text-[10px] font-black text-[#cbbcf6] uppercase tracking-widest mb-4">Informações Adicionais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Convênio</label>
                  <input 
                    name="insuranceName"
                    value={formData.insuranceName}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                    placeholder="Nome do plano de saúde" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Carteirinha do Convênio</label>
                  <input 
                    name="insuranceCard"
                    value={formData.insuranceCard}
                    onChange={handleChange}
                    type="text" 
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all" 
                    placeholder="Número da carteirinha" 
                  />
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Observações (Opcional)</label>
                  <textarea 
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 min-h-[60px] outline-none focus:ring-2 focus:ring-[#cbbcf6] focus:border-[#cbbcf6] text-slate-700 font-medium transition-all placeholder:text-slate-400" 
                    placeholder="Anotações gerais sobre o paciente..."
                  ></textarea>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-end gap-3 bg-slate-50 shrink-0 rounded-b-xl mt-auto">
          <button 
            onClick={onClose} 
            disabled={loading}
            className="px-6 py-3 text-sm font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors uppercase tracking-widest disabled:opacity-50"
          >
            Cancelar
          </button>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="px-8 py-3 bg-[#1a1b26] hover:bg-slate-800 text-white text-sm font-bold uppercase tracking-widest rounded-xl transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Salvar Paciente
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
