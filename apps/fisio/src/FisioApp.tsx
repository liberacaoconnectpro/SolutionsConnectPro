import { useState } from 'react';
import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@connect-erp/shared/lib/firebase';
import { LayoutDashboard, Users, FileText, DollarSign, LogOut, Calendar, MessageSquare, UserCircle, Settings, ShieldCheck, Clock, Activity, TrendingUp, CheckCircle2, ChevronRight, UserPlus } from 'lucide-react';
import { DashboardView } from '@/components/DashboardView.tsx';
import { PacientesView } from '@/components/PacientesView.tsx';
import { AgendaView } from '@/components/AgendaView.tsx';
import { FinanceiroView } from '@/components/FinanceiroView.tsx';
import { EquipeView } from '@/components/EquipeView.tsx';
import { OpcoesView } from '@/components/OpcoesView.tsx';
import { PacienteDetailView } from '@/components/PacienteDetailView.tsx';
import { MensagensView } from '@/components/MensagensView.tsx';
import { getMachineId } from '@connect-erp/shared/lib/desktopUtils';

export default function FisioApp({ onBack }: { onBack: () => void }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'pacientes' | 'agenda' | 'financeiro' | 'equipe' | 'opcoes' | 'mensagens'>('dashboard');
  const [selectedPatient, setSelectedPatient] = useState<any | null>(null);
  
  // Login State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regClinicName, setRegClinicName] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const licencaRef = doc(db, 'licencas', user.uid);
      const licencaSnap = await getDoc(licencaRef);
      
      if (!licencaSnap.exists()) {
        await signOut(auth);
        setError('Registro de licença não encontrado para este usuário.');
        setLoading(false);
        return;
      }
      
      const dadosLicenca = licencaSnap.data();
      if (dadosLicenca.status !== true) {
        await signOut(auth);
        setError('Sua licença está bloqueada no sistema ConnectPro.');
        setLoading(false);
        return;
      }
      
      if (dadosLicenca.validade < Date.now()) {
        await signOut(auth);
        setError('Sua assinatura encontra-se expirada.');
        setLoading(false);
        return;
      }
      
      if (dadosLicenca.sistema !== 'Fisio') {
         await signOut(auth);
         setError('Acesso negado. Esta licença pertence a outro sistema (ex: PetShop).');
         setLoading(false);
         return;
      }

      setIsLoggedIn(true);
      setShowLoginModal(false);
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/operation-not-allowed') {
        setError('O login por Email/Senha não está habilitado no Firebase.');
      } else {
        setError(err.message || 'Credenciais inválidas.');
      }
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Criar usuário no Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      const user = userCredential.user;

      // 2. Pegar Device ID (HWID)
      const deviceId = await getMachineId();

      // 3. Criar documento de Licença no Firestore
      // 14 dias de validade
      const validadeInMs = Date.now() + (14 * 24 * 60 * 60 * 1000);

      await setDoc(doc(db, 'licencas', user.uid), {
        status: true,
        validade: validadeInMs,
        device_id: deviceId,
        clienteNome: regName,
        nomeClinica: regClinicName,
        sistema: 'Fisio',
        userId: user.uid,
        createdAt: Date.now()
      });

      // 4. Logar com sucesso
      setIsLoggedIn(true);
      setShowRegisterModal(false);
      // Limpar campos
      setRegName('');
      setRegEmail('');
      setRegPassword('');
      setRegClinicName('');
    } catch (err: any) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Este e-mail já está cadastrado.');
      } else if (err.code === 'auth/weak-password') {
        setError('A senha deve ter pelo menos 6 caracteres.');
      } else {
        setError(err.message || 'Erro ao realizar cadastro.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="bg-[#f0f2f5] font-sans text-slate-900 h-screen flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1a1a24] text-slate-400 flex flex-col border-r border-[#2a2a35] shrink-0">
          <div className="p-8 flex flex-col items-center border-b border-[#2a2a35]/50">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h1 className="font-bold text-white text-xl tracking-tight">Fisio<span className="text-purple-400">ConnectPro</span></h1>
            <p className="text-[10px] font-bold text-slate-500 tracking-widest mt-1 uppercase">Clinical Manager</p>
          </div>
          
          <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('dashboard'); setSelectedPatient(null); }} className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'dashboard' ? 'bg-[#2a2a35] text-white font-semibold relative' : 'text-slate-400 hover:text-white hover:bg-[#2a2a35]/50 font-medium'}`}>
              {activeTab === 'dashboard' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-md"></div>}
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('pacientes'); setSelectedPatient(null); }} className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'pacientes' ? 'bg-[#2a2a35] text-white font-semibold relative' : 'text-slate-400 hover:text-white hover:bg-[#2a2a35]/50 font-medium'}`}>
              {activeTab === 'pacientes' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-md"></div>}
              <Users className="w-5 h-5" />
              Pacientes
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('agenda'); setSelectedPatient(null); }} className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'agenda' ? 'bg-[#2a2a35] text-white font-semibold relative' : 'text-slate-400 hover:text-white hover:bg-[#2a2a35]/50 font-medium'}`}>
              {activeTab === 'agenda' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-md"></div>}
              <Calendar className="w-5 h-5" />
              Agenda
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('mensagens'); setSelectedPatient(null); }} className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'mensagens' ? 'bg-[#2a2a35] text-white font-semibold relative' : 'text-slate-400 hover:text-white hover:bg-[#2a2a35]/50 font-medium'}`}>
              {activeTab === 'mensagens' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-md"></div>}
              <MessageSquare className="w-5 h-5" />
              Mensagens
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('equipe'); setSelectedPatient(null); }} className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'equipe' ? 'bg-[#2a2a35] text-white font-semibold relative' : 'text-slate-400 hover:text-white hover:bg-[#2a2a35]/50 font-medium'}`}>
              {activeTab === 'equipe' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-md"></div>}
              <UserCircle className="w-5 h-5" />
              Equipe
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('financeiro'); setSelectedPatient(null); }} className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'financeiro' ? 'bg-[#2a2a35] text-white font-semibold relative' : 'text-slate-400 hover:text-white hover:bg-[#2a2a35]/50 font-medium'}`}>
              {activeTab === 'financeiro' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-md"></div>}
              <DollarSign className="w-5 h-5" />
              Financeiro
            </a>
            <a href="#" onClick={(e) => { e.preventDefault(); setActiveTab('opcoes'); setSelectedPatient(null); }} className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm transition-colors ${activeTab === 'opcoes' ? 'bg-[#2a2a35] text-white font-semibold relative' : 'text-slate-400 hover:text-white hover:bg-[#2a2a35]/50 font-medium'}`}>
              {activeTab === 'opcoes' && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-white rounded-r-md"></div>}
              <Settings className="w-5 h-5" />
              Opções
            </a>
          </nav>
          
          <div className="p-6 mt-auto border-t border-[#2a2a35]/50 flex items-center justify-between">
            <div>
              <p className="text-xs font-bold text-[#8a91a6]">V1.0.0</p>
              <p className="text-[10px] text-slate-600 font-bold tracking-wider">DESKTOP</p>
            </div>
            <button 
              onClick={() => { signOut(auth); setIsLoggedIn(false); }} 
              className="w-10 h-10 flex items-center justify-center bg-[#2a2a35] hover:bg-rose-500/20 hover:text-rose-400 rounded-xl transition-colors text-slate-400"
              title="Sair"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </aside>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden bg-white">
            <header className="bg-white border-b border-slate-100 h-20 flex items-center justify-between px-8 shrink-0">
              <div>
                {activeTab === 'dashboard' && (
                  <>
                    <h2 className="text-xl text-slate-800">Olá, <span className="font-bold text-purple-600">Mailton</span>!</h2>
                    <p className="text-[11px] text-slate-500 mt-0.5">Que bom ter você aqui na <span className="font-bold">MG FISIOTERAPIA</span>. Vamos transformar vidas hoje? ✌️</p>
                  </>
                )}
                {activeTab === 'pacientes' && (
                  <>
                    <h2 className="text-xl font-bold text-slate-800">Pacientes</h2>
                    <p className="text-[11px] text-slate-500 mt-0.5">Gerencie o histórico clínico da sua unidade - 5 cadastrados</p>
                  </>
                )}
                {activeTab === 'agenda' && (
                  <>
                    <h2 className="text-xl font-bold text-slate-800">Agenda</h2>
                    <p className="text-[11px] text-slate-500 mt-0.5">13 de May de 2026 · Otimize seu tempo</p>
                  </>
                )}
                {activeTab === 'financeiro' && (
                  <>
                    <h2 className="text-xl font-bold text-slate-800">Financeiro</h2>
                    <p className="text-[11px] text-slate-500 mt-0.5 uppercase tracking-wider">MG Fisioterapia</p>
                  </>
                )}
                {activeTab === 'equipe' && (
                  <>
                    <h2 className="text-xl font-bold text-slate-800">Gestão de Equipe</h2>
                    <p className="text-[11px] text-slate-500 mt-0.5 uppercase tracking-wider">MG Fisioterapia</p>
                  </>
                )}
                {activeTab === 'mensagens' && (
                  <>
                    <h2 className="text-xl font-bold text-slate-800">Mensagens</h2>
                    <p className="text-[11px] text-slate-500 mt-0.5 uppercase tracking-wider">Comunicação com pacientes</p>
                  </>
                )}
                {activeTab === 'opcoes' && (
                  <>
                    <h2 className="text-xl font-bold text-slate-800">Opções</h2>
                    <p className="text-[11px] text-slate-500 mt-0.5 uppercase tracking-wider">MG Fisioterapia</p>
                  </>
                )}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-700 font-bold text-xs">M</div>
                  <span className="text-sm font-bold text-slate-700">Mailton Garrido Canuto</span>
                </div>
                <button 
                  onClick={onBack} 
                  className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-purple-600 transition-colors ml-2"
                  title="Voltar ao ADM e Sair"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </header>

            {/* Content */} 
            <main className="flex-1 p-8 overflow-auto bg-[#fafafa]">
              {selectedPatient ? (
                <PacienteDetailView patient={selectedPatient} onBack={() => setSelectedPatient(null)} />
              ) : (
                <>
                  {activeTab === 'dashboard' && <DashboardView />}
                  {activeTab === 'pacientes' && <PacientesView onViewPatient={setSelectedPatient} />}
                  {activeTab === 'agenda' && <AgendaView />}
                  {activeTab === 'financeiro' && <FinanceiroView />}
                  {activeTab === 'equipe' && <EquipeView />}
                  {activeTab === 'mensagens' && <MensagensView />}
                  {activeTab === 'opcoes' && <OpcoesView onLogout={() => { signOut(auth); setIsLoggedIn(false); }} />}
                </>
              )}
            </main>
          </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 overflow-x-hidden">
      {/* Navigation */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-slate-200/60 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="flex items-center gap-3">
           <div className="w-10 h-10 bg-purple-200 rounded-full flex items-center justify-center text-purple-700 font-bold text-lg">
              FCP
           </div>
           <div>
              <h1 className="font-extrabold text-slate-800 leading-tight">Fisio<span className="text-purple-600">ConnectPro</span></h1>
              <p className="text-[10px] text-slate-500 font-medium">Sistema de Gestão Clínica</p>
           </div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
           <a href="#funcionalidades" className="hover:text-purple-600 transition-colors">Funcionalidades</a>
           <a href="#planos" className="hover:text-purple-600 transition-colors">Planos</a>
           <a href="#suporte" className="hover:text-purple-600 transition-colors">Suporte</a>
        </nav>
        <div className="flex items-center gap-3">
           <button onClick={() => setShowLoginModal(true)} className="px-5 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">Entrar</button>
           <button onClick={() => setShowRegisterModal(true)} className="px-5 py-2 text-sm font-medium text-purple-700 bg-purple-200 rounded-lg hover:bg-purple-300 transition-colors hidden sm:block">Começar grátis</button>
           <button onClick={onBack} className="text-xs text-slate-400 hover:text-slate-600 ml-4 hidden lg:block border-l border-slate-200 pl-4">Voltar ao ADM</button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 md:py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
         
         {/* Text Content */}
         <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-bold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
              Novo: Prontuário eletrônico integrado
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-800 leading-[1.1] mb-6">
               Gerencie sua clínica com <span className="text-purple-300">leveza e eficiência</span>
            </h2>
            <p className="text-lg text-slate-500 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
               Plataforma completa para fisioterapeutas: agenda inteligente, prontuário clínico, financeiro e comunicação com a equipe — tudo em um só lugar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-10">
               <button onClick={() => setShowRegisterModal(true)} className="w-full sm:w-auto px-8 py-3.5 bg-purple-200 hover:bg-purple-300 text-purple-800 font-bold rounded-xl transition-colors">
                  Começar 14 dias grátis
               </button>
               <button className="w-full sm:w-auto px-8 py-3.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium rounded-xl transition-colors">
                  Ver demonstração
               </button>
            </div>
            <div className="flex items-center justify-center lg:justify-start gap-4">
               <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-rose-200 flex items-center justify-center text-[10px] font-bold text-rose-700">MG</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-200 flex items-center justify-center text-[10px] font-bold text-emerald-700">AL</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-200 flex items-center justify-center text-[10px] font-bold text-blue-700">RI</div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-200 flex items-center justify-center text-[10px] font-bold text-purple-700">ED</div>
               </div>
               <p className="text-sm font-medium text-slate-500"><span className="text-slate-800 font-bold">+2.400</span> fisioterapeutas já usam</p>
            </div>
         </div>

         {/* App Mockup / Visual */}
         <div className="flex-1 w-full max-w-lg lg:max-w-none relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-emerald-50 rounded-3xl transform rotate-3 scale-105 opacity-50 blur-xl"></div>
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 relative z-10 w-full" style={{ aspectRatio: '4/3' }}>
               <div className="flex justify-between items-center mb-6">
                  <div className="font-bold text-slate-800 text-sm">Meu Consultório</div>
                  <div className="text-xs text-slate-400 font-medium">03 mai 2026 · 16:31</div>
               </div>
               <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="bg-purple-50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                     <span className="text-2xl font-bold text-purple-300">4</span>
                     <span className="text-[9px] font-bold text-purple-300 uppercase tracking-wider mt-1">Pacientes</span>
                  </div>
                  <div className="bg-emerald-50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                     <span className="text-2xl font-bold text-emerald-300">8</span>
                     <span className="text-[9px] font-bold text-emerald-300 uppercase tracking-wider mt-1">Consultas</span>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                     <span className="text-2xl font-bold text-orange-400">R$480</span>
                     <span className="text-[9px] font-bold text-orange-400 uppercase tracking-wider mt-1">Receita</span>
                  </div>
               </div>
               <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <div className="text-xs font-bold text-slate-500 mb-4">Receita vs Despesa — últimos 6 meses</div>
                  <div className="flex items-end h-16 gap-2">
                     <div className="flex-1 bg-emerald-200 rounded-sm h-[20%] relative group"><span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-slate-400">dez</span></div>
                     <div className="flex-1 bg-emerald-200 rounded-sm h-[30%] relative group"><span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-slate-400">jan</span></div>
                     <div className="flex-1 bg-emerald-200 rounded-sm h-[25%] relative group"><span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-slate-400">fev</span></div>
                     <div className="flex-1 bg-emerald-200 rounded-sm h-[40%] relative group"><span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-slate-400">mar</span></div>
                     <div className="flex-1 bg-emerald-200 rounded-sm h-[70%] relative group"><span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-emerald-500 font-bold">abr</span></div>
                     <div className="flex-1 bg-slate-100 border border-dashed border-slate-200 rounded-sm h-[90%] relative group"><span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-slate-400">mai</span></div>
                  </div>
               </div>
               <div className="flex gap-4 mt-6">
                  <div className="flex-1 bg-purple-50 text-purple-600 text-xs font-bold py-2 rounded-lg text-center flex items-center justify-center gap-1">Ver Agenda &rarr;</div>
                  <div className="flex-1 bg-emerald-50 text-emerald-600 text-xs font-bold py-2 rounded-lg text-center flex items-center justify-center gap-1">Novo Paciente &rarr;</div>
               </div>
            </div>
         </div>
      </main>

      {/* Login Modal Overlay */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-slate-200 relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              aria-label="Fechar"
            >
              &times;
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center font-bold text-4xl text-white shadow-md">
                F
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-2 tracking-tight">FisioConnectPro</h2>
            <p className="text-center text-sm text-slate-500 mb-6 border-b border-slate-100 pb-6">Simulação Web do App Cliente</p>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-mail do Cliente</label>
                <input 
                   type="email" 
                   required 
                   value={email}
                   onChange={e => setEmail(e.target.value)}
                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow" 
                   placeholder="cliente@email.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
                <input 
                   type="password" 
                   required 
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-shadow" 
                   placeholder="••••••••" 
                />
              </div>
              
              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3 py-3 rounded-lg leading-relaxed">
                  {error}
                </div>
              )}

              <button 
                 type="submit" 
                 disabled={loading}
                 className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? 'Verificando Licença...' : 'Entrar no Sistema'}
              </button>

              <button 
                 type="button" 
                 onClick={() => setIsLoggedIn(true)}
                 className="mt-3 w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center shadow-sm">
                Acessar sem Login (Modo Demo)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Register Modal Overlay */}
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-sm border border-slate-200 relative">
            <button 
              onClick={() => setShowRegisterModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700 transition-colors"
              aria-label="Fechar"
            >
              &times;
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center font-bold text-4xl text-white shadow-md">
                <UserPlus className="w-8 h-8" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-center text-slate-800 mb-2 tracking-tight">Criar Conta</h2>
            <p className="text-center text-sm text-slate-500 mb-6 border-b border-slate-100 pb-6">Comece seus 14 dias de teste grátis</p>
            
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Seu Nome</label>
                <input 
                   type="text" 
                   required 
                   value={regName}
                   onChange={e => setRegName(e.target.value)}
                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-shadow" 
                   placeholder="João Silva" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Clínica</label>
                <input 
                   type="text" 
                   required 
                   value={regClinicName}
                   onChange={e => setRegClinicName(e.target.value)}
                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-shadow" 
                   placeholder="Minha Clínica Fisio" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">E-mail</label>
                <input 
                   type="email" 
                   required 
                   value={regEmail}
                   onChange={e => setRegEmail(e.target.value)}
                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-shadow" 
                   placeholder="contato@clinica.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Senha</label>
                <input 
                   type="password" 
                   required 
                   value={regPassword}
                   onChange={e => setRegPassword(e.target.value)}
                   className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 focus:outline-none transition-shadow" 
                   placeholder="••••••••" 
                />
              </div>
              
              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs px-3 py-3 rounded-lg leading-relaxed">
                  {error}
                </div>
              )}

              <button 
                 type="submit" 
                 disabled={loading}
                 className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center shadow-sm disabled:opacity-70 disabled:cursor-not-allowed">
                {loading ? 'Criando Conta...' : 'Cadastrar e Começar'}
              </button>
              
              <div className="text-center mt-4">
                <button 
                  type="button"
                  onClick={() => { setShowRegisterModal(false); setShowLoginModal(true); }}
                  className="text-xs text-slate-500 hover:text-purple-600 font-medium"
                >
                  Já tem uma conta? Entrar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

