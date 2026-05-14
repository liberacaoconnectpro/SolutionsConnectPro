import { useState } from 'react';
import { PawPrint, LogOut, Settings, Users, Calendar, BarChart3, User, Search, Bell } from 'lucide-react';
import DashboardPet from './components/DashboardPet';
import AnimaisView from './components/AnimaisView';
import ConsultasView from './components/ConsultasView';
import TutoresView from './components/TutoresView';
import FinanceiroPet from './components/FinanceiroPet';
import OpcoesPet from './components/OpcoesPet';

export default function PetApp({ onBack }: { onBack: () => void }) {
  const [currentView, setCurrentView] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: <BarChart3 className="w-5 h-5" />, label: 'Dashboard' },
    { id: 'animais', icon: <PawPrint className="w-5 h-5" />, label: 'Animais' },
    { id: 'consultas', icon: <Calendar className="w-5 h-5" />, label: 'Agenda' },
    { id: 'tutores', icon: <Users className="w-5 h-5" />, label: 'Tutores' },
    { id: 'financeiro', icon: <BarChart3 className="w-5 h-5" />, label: 'Financeiro' },
  ];

  const renderView = () => {
    switch (currentView) {
      case 'dashboard': return <DashboardPet />;
      case 'animais': return <AnimaisView />;
      case 'consultas': return <ConsultasView />;
      case 'tutores': return <TutoresView />;
      case 'financeiro': return <FinanceiroPet />;
      case 'opcoes': return <OpcoesPet />;
      default: return <DashboardPet />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white mr-3 shadow-lg">
            <PawPrint className="w-5 h-5" />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">PetConnect Pro</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu Principal</div>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentView === item.id 
                  ? 'bg-emerald-500/10 text-emerald-400' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className={`mr-3 ${currentView === item.id ? 'text-emerald-400' : 'text-slate-400'}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button 
            onClick={() => setCurrentView('opcoes')}
            className={`w-full flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-2 ${currentView === 'opcoes' ? 'bg-emerald-500/10 text-emerald-400' : 'hover:bg-slate-800 hover:text-white'}`}
          >
            <Settings className="w-5 h-5 mr-3 text-slate-400" />
            Configurações
          </button>
          <div className="flex items-center p-3 bg-slate-800 rounded-xl mt-4">
            <div className="w-10 h-10 rounded-full bg-slate-700 flex flex-shrink-0 items-center justify-center text-white">
              <User className="w-5 h-5" />
            </div>
            <div className="ml-3 flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Dr. Veterinário</p>
              <p className="text-xs text-slate-400 truncate">Clinica Central</p>
            </div>
            <button onClick={onBack} className="p-2 text-slate-400 hover:text-white transition-colors" title="Voltar ao Portal">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shadow-sm z-10">
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Buscar paciente, tutor ou prontuário..." 
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
              />
            </div>
          </div>
          <div className="flex items-center gap-4 ml-4">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-lg transition-colors shadow-sm">
              Novo Agendamento
            </button>
          </div>
        </header>

        {/* Dynamic View Area */}
        <div className="flex-1 overflow-auto p-8">
          <div className="max-w-7xl mx-auto h-full">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
}
