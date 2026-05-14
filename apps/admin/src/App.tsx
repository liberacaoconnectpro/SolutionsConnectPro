/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, dbService } from '@connect-erp/shared';
import Login from './Login';
import Dashboard from './AdminApp';
import FisioApp from '../../fisio/src/FisioApp';
import PetApp from '../../pet/src/PetApp';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentApp, setCurrentApp] = useState<string>('admin');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        dbService.init().catch(err => console.error("Erro na inicialização (Seed):", err));
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 font-sans">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <div className="text-slate-600 font-medium">Iniciando ConnectPro...</div>
      </div>
    );
  }

  // Se estiver trocando de app, mostrar o app selecionado
  if (currentApp === 'fisio') {
    return <FisioApp onBack={() => setCurrentApp('admin')} />;
  }

  if (currentApp === 'pet') {
    return <PetApp onBack={() => setCurrentApp('admin')} />;
  }

  // Senão, mostrar Login ou Dashboard do Admin
  if (!user) {
    return (
      <Login 
        onGoToFisio={() => setCurrentApp('fisio')} 
        onGoToPet={() => setCurrentApp('pet')} 
      />
    );
  }

  return (
    <Dashboard onSelectApp={(app) => setCurrentApp(app)} />
  );
}
