import { useState } from 'react';
import { auth } from '@connect-erp/shared';
import { LogOut, MonitorSmartphone, LayoutDashboard, Code, Users, CreditCard, Settings } from 'lucide-react';
import { signOut } from 'firebase/auth';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
// @ts-ignore
import guideContent from './guide.md?raw';

import DashboardAdmin from './components/DashboardAdmin';
import ClientesAdmin from './components/ClientesAdmin';
import PlansAdmin from './components/PlansAdmin';
import OpcoesAdmin from './components/OpcoesAdmin';

export default function AdminApp({ onSelectApp }: { onSelectApp?: (app: string) => void }) {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'clientes' | 'planos' | 'opcoes' | 'guide'>('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardAdmin />;
      case 'clientes': return <ClientesAdmin />;
      case 'planos': return <PlansAdmin />;
      case 'opcoes': return <OpcoesAdmin />;
      case 'guide': return (
        <div className="flex-1 overflow-auto p-8 bg-white h-full">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-slate prose-blue max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {guideContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      );
      default: return <DashboardAdmin />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col border-r border-slate-200 shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-lg">C</div>
          <h1 className="text-xl font-bold tracking-tight">ConnectPro</h1>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <LayoutDashboard className={`w-5 h-5 ${activeTab === 'dashboard' ? 'opacity-80' : ''}`} />
            Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('clientes')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'clientes' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <Users className={`w-5 h-5 ${activeTab === 'clientes' ? 'opacity-80' : ''}`} />
            Clientes Licenciados
          </button>
          <button 
            onClick={() => setActiveTab('planos')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'planos' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <CreditCard className={`w-5 h-5 ${activeTab === 'planos' ? 'opacity-80' : ''}`} />
            Planos
          </button>
          <button 
            onClick={() => setActiveTab('opcoes')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'opcoes' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <Settings className={`w-5 h-5 ${activeTab === 'opcoes' ? 'opacity-80' : ''}`} />
            Configurações
          </button>
          <button 
            onClick={() => setActiveTab('guide')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'guide' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <Code className={`w-5 h-5 ${activeTab === 'guide' ? 'opacity-80' : ''}`} />
            Guia de Integração
          </button>

          <div className="pt-6 pb-2 px-3 text-[10px] uppercase font-bold text-slate-500 tracking-wider">Acesso Rápido</div>
          
          <button 
            onClick={() => onSelectApp?.('fisio')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <MonitorSmartphone className="w-5 h-5" />
            ConnectFisio
          </button>

          <button 
            onClick={() => onSelectApp?.('pet')}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
            <MonitorSmartphone className="w-5 h-5" />
            ConnectPet
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10 shadow-sm">
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Admin Control</span>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <span className="font-semibold capitalize">{activeTab}</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs font-bold text-slate-800">{auth.currentUser?.email || 'Admin'}</p>
              <p className="text-[10px] text-slate-500">Sessão Ativa</p>
            </div>
            <button
              onClick={() => signOut(auth)}
              className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
              title="Sair"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        {/* Dynamic Content */}
        <div className="flex-1 overflow-auto bg-slate-100">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
