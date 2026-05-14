/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './lib/firebase';
import Login from './Login';
import Dashboard from './Dashboard';
import FisioApp from './FisioApp';
import { dbService } from './services/dbService';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'admin' | 'fisio'>('fisio');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser) {
        dbService.init().catch(err => {
          console.error("Erro na inicialização (Seed):", err);
        });
      }
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Verificando acesso...</div>;
  }

  if (view === 'fisio') {
    return <FisioApp onBack={() => setView('admin')} />;
  }

  return user ? <Dashboard /> : <Login onGoToFisio={() => setView('fisio')} />;
}
