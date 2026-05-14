/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@connect-erp/shared/lib/firebase';
import Login from './Login';
import Dashboard from './AdminApp';
import { dbService } from '@connect-erp/shared/services/dbService';

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

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
    return <div className="min-h-screen flex items-center justify-center">Verificando acesso...</div>;
  }

  return user ? <Dashboard /> : <Login />;
}
