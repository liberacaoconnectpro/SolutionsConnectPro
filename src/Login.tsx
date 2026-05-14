import { LogIn, Monitor } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from './lib/firebase';

export default function Login({ onGoToFisio }: { onGoToFisio?: () => void }) {
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
          Acesso restrito
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-sm border border-slate-200 sm:rounded-xl sm:px-10">
          <button
            onClick={handleLogin}
            className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            <LogIn className="w-5 h-5 mr-2 opacity-90" />
            Entrar com Google
          </button>

          {onGoToFisio && (
            <div className="mt-6 pt-6 border-t border-slate-100">
              <button
                onClick={onGoToFisio}
                className="w-full flex justify-center items-center py-2.5 px-4 border border-slate-300 rounded-lg shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
              >
                <Monitor className="w-5 h-5 mr-2 opacity-70" />
                Testar App Cliente (FisioConnectPro)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
