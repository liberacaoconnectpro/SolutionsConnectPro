import { LogIn, Monitor } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '@connect-erp/shared';

export default function Login({ onGoToFisio, onGoToPet }: { onGoToFisio?: () => void; onGoToPet?: () => void }) {
  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
      alert('Erro ao fazer login.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans text-slate-900">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center text-blue-600">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center font-bold text-4xl text-white shadow-lg">
            C
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-800 tracking-tight">
          ConnectPro Admin
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Gerenciamento de Licenças e Sistemas
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-xl sm:px-10">
          <button
            onClick={handleLogin}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <LogIn className="w-5 h-5 mr-2 opacity-90" />
            Entrar no Painel ADM
          </button>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-slate-500 font-medium tracking-tight">Acesso Rápido aos Apps</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={onGoToFisio}
                className="w-full flex flex-col items-center justify-center py-4 border border-slate-200 rounded-xl hover:bg-purple-50 hover:border-purple-200 transition-all group"
              >
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-2 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Monitor className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-600">ConnectFisio</span>
              </button>
              
              <button
                onClick={onGoToPet}
                className="w-full flex flex-col items-center justify-center py-4 border border-slate-200 rounded-xl hover:bg-orange-50 hover:border-orange-200 transition-all group"
              >
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 mb-2 group-hover:bg-orange-600 group-hover:text-white transition-colors">
                  <Monitor className="w-6 h-6" />
                </div>
                <span className="text-xs font-bold text-slate-600">ConnectPet</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
