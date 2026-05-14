import { useState, useEffect, useMemo } from 'react';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, addDoc, setDoc } from 'firebase/firestore';
import { db, auth } from './lib/firebase';
import { LogOut, MonitorSmartphone, ShieldBan, ShieldCheck, Plus, Trash2, Calendar, LayoutDashboard, FileKey, ShieldAlert, CheckCircle2, Code } from 'lucide-react';
import { format } from 'date-fns';
import { signOut } from 'firebase/auth';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import guideContent from './guide.md?raw';

enum OperationType {
  CREATE = 'create', UPDATE = 'update', DELETE = 'delete', LIST = 'list', GET = 'get', WRITE = 'write'
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  alert(`Permissão Negada ou Erro no Firebase: ${error instanceof Error ? error.message : 'Verifique o console'}`);
}

interface Licenca {
  id: string;
  clienteNome: string;
  sistema: string;
  status: boolean;
  validade: number;
  device_id: string;
  userId: string;
}

export default function Dashboard() {
  const [licencas, setLicencas] = useState<Licenca[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newLicenca, setNewLicenca] = useState({ clienteNome: '', sistema: 'Fisio', userId: '', validadeMeses: 12 });
  const [activeTab, setActiveTab] = useState<'dashboard' | 'guide'>('guide');

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'licencas'),
      (snapshot) => {
        const data: Licenca[] = [];
        snapshot.forEach((doc) => data.push({ id: doc.id, ...doc.data() } as Licenca));
        setLicencas(data);
      },
      (error) => handleFirestoreError(error, OperationType.LIST, 'licencas')
    );
    return () => unsubscribe();
  }, []);

  const toggleStatus = async (licenca: Licenca) => {
    try {
      await updateDoc(doc(db, 'licencas', licenca.id), { status: !licenca.status });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `licencas/${licenca.id}`);
    }
  };

  const resetDevice = async (id: string) => {
    if (!confirm('Deseja realmente resetar o HWID vinculado localmente a este cliente? Ele precisará logar novamente.')) return;
    try {
      await updateDoc(doc(db, 'licencas', id), { device_id: '' });
    } catch (e) {
      handleFirestoreError(e, OperationType.UPDATE, `licencas/${id}`);
    }
  };

  const deleteLicenca = async (id: string) => {
    if (!confirm('Excluir esta licença permanentemente?')) return;
    try {
      await deleteDoc(doc(db, 'licencas', id));
    } catch (e) {
      handleFirestoreError(e, OperationType.DELETE, `licencas/${id}`);
    }
  };

  const handleAddLicenca = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const validade = Date.now() + (newLicenca.validadeMeses * 30 * 24 * 60 * 60 * 1000);
      const payload = {
        clienteNome: newLicenca.clienteNome,
        sistema: newLicenca.sistema,
        status: true,
        validade: validade,
        device_id: '',
        userId: newLicenca.userId
      };
      await setDoc(doc(db, 'licencas', newLicenca.userId), payload);
      setIsModalOpen(false);
      setNewLicenca({ clienteNome: '', sistema: 'Fisio', userId: '', validadeMeses: 12 });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, 'licencas');
    }
  };

  const totalLicencas = useMemo(() => licencas.length, [licencas]);
  const appsFisio = useMemo(() => licencas.filter(l => l.sistema === 'Fisio').length, [licencas]);
  const appsPetShop = useMemo(() => licencas.filter(l => l.sistema === 'PetShop').length, [licencas]);

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col border-r border-slate-200">
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
            onClick={() => setActiveTab('guide')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'guide' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            <Code className={`w-5 h-5 ${activeTab === 'guide' ? 'opacity-80' : ''}`} />
            Guia de Integração
          </button>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="bg-slate-800 p-3 rounded-lg flex flex-col gap-2">
            <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Status Firebase</div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <span className="text-xs text-slate-300">Conectado (v10+)</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <header className="h-16 shrink-0 bg-white border-b border-slate-200 flex items-center justify-between px-8">
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Gestão / Clientes</span>
            <div className="w-1 h-1 rounded-full bg-slate-300"></div>
            <span className="font-semibold">Admin Console</span>
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

        {activeTab === 'dashboard' ? (
        <>
          {/* Scrollable Content */}
          <div className="flex-1 overflow-auto flex flex-col">
            {/* Statistics Grid */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-4 gap-6 shrink-0">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-slate-500 text-xs font-medium uppercase">Total Licenças</p>
              <p className="text-3xl font-bold mt-1 text-slate-800">{totalLicencas}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-slate-500 text-xs font-medium uppercase">Apps Fisio</p>
              <p className="text-3xl font-bold mt-1 text-blue-600">{appsFisio}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
              <p className="text-slate-500 text-xs font-medium uppercase">Apps PetShop</p>
              <p className="text-3xl font-bold mt-1 text-orange-600">{appsPetShop}</p>
            </div>
            <div className="bg-white p-5 rounded-xl border border-emerald-100 shadow-sm">
              <p className="text-emerald-600 text-xs font-medium uppercase">Status Sistema</p>
              <p className="text-lg font-bold mt-1 flex items-center gap-2 text-emerald-700">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Operacional
              </p>
            </div>
          </div>

          {/* Client List Table */}
          <div className="px-8 pb-8 flex-1 flex flex-col min-h-0">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-white shrink-0">
                <h2 className="font-bold text-slate-800">Gerenciamento de Clientes</h2>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
                  >
                    <Plus className="h-4 w-4" /> Nova Licença
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 sticky top-0 border-b border-slate-200 custom-table-header z-10">
                    <tr>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Cliente / UID</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Sistema</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Device HWID</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Vencimento</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {licencas.map((licenca) => (
                      <tr key={licenca.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <p className="font-bold text-sm text-slate-800">{licenca.clienteNome}</p>
                          <p className="text-[10px] text-slate-400 font-mono mt-0.5">uid: {licenca.id}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                            licenca.sistema === 'Fisio' 
                              ? 'bg-blue-50 text-blue-700 border border-blue-100' 
                              : 'bg-orange-50 text-orange-700 border border-orange-100'
                          }`}>
                            {licenca.sistema}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {licenca.device_id ? (
                            <span className="font-mono text-xs text-slate-600 block truncate max-w-[150px]" title={licenca.device_id}>
                              {licenca.device_id}
                            </span>
                          ) : (
                            <span className="font-mono text-xs text-slate-400">NÃO VINCULADO</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-600">
                          {format(licenca.validade, 'dd MMM yyyy')}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`flex items-center gap-1.5 text-xs font-medium ${
                            licenca.status ? 'text-emerald-600' : 'text-rose-600'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${licenca.status ? 'bg-emerald-500' : 'bg-rose-500'}`}></div> 
                            {licenca.status ? 'Ativo' : 'Bloqueado'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                             <button
                              onClick={() => toggleStatus(licenca)}
                              title={licenca.status ? 'Bloquear' : 'Desbloquear'}
                              className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                                licenca.status 
                                  ? 'text-rose-600 hover:bg-rose-50' 
                                  : 'text-emerald-600 hover:bg-emerald-50'
                              }`}
                            >
                              {licenca.status ? 'Bloquear' : 'Desbloquear'}
                            </button>
                            <button
                              onClick={() => resetDevice(licenca.id)}
                              disabled={!licenca.device_id}
                              title="Resetar HWID vinculado"
                              className={`p-1.5 rounded transition-colors ${
                                licenca.device_id 
                                  ? 'text-blue-600 hover:bg-blue-50' 
                                  : 'text-slate-300 cursor-not-allowed'
                              }`}
                            >
                              <MonitorSmartphone className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => deleteLicenca(licenca.id)}
                              title="Excluir"
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {licencas.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-8 text-center text-sm text-slate-500">
                          <div className="flex flex-col items-center justify-center gap-2">
                             <ShieldAlert className="w-8 h-8 text-slate-300" />
                             Nenhuma licença cadastrada.
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="p-4 border-t border-slate-100 bg-white shrink-0 flex justify-between items-center text-xs text-slate-400">
                <span>Exibindo {licencas.length} licenças no total</span>
              </div>
            </div>
          </div>
          
          {/* Electron Check-in Logic Preview Section (Footer) */}
          <div className="px-8 py-4 bg-slate-100 border-t border-slate-200 shrink-0">
            <div className="flex items-center gap-6">
              <div className="flex-1 flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-800 rounded flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-700">Firebase Firestore Security Rules Active</p>
                  <p className="text-[10px] text-slate-500">O Firestore protege a leitura/gravação do Check-In</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
        </>
        ) : (
          <div className="flex-1 overflow-auto p-8 bg-white">
            <div className="max-w-4xl mx-auto">
              <div className="prose prose-slate prose-blue max-w-none">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {guideContent}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal Nova Licença */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAddLicenca}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Cadastrar Nova Licença</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">UID do Usuário (Firebase Auth)</label>
                      <input type="text" required value={newLicenca.userId} onChange={e => setNewLicenca({...newLicenca, userId: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nome do Cliente</label>
                      <input type="text" required value={newLicenca.clienteNome} onChange={e => setNewLicenca({...newLicenca, clienteNome: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Sistema</label>
                      <select value={newLicenca.sistema} onChange={e => setNewLicenca({...newLicenca, sistema: e.target.value})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                        <option value="Fisio">Fisio</option>
                        <option value="PetShop">PetShop</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Validade (meses)</label>
                      <input type="number" min="1" required value={newLicenca.validadeMeses} onChange={e => setNewLicenca({...newLicenca, validadeMeses: parseInt(e.target.value) || 1})} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Salvar
                  </button>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
