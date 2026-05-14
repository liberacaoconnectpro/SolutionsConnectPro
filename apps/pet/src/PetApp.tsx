import { useState } from 'react';
import { auth } from '@connect-erp/shared';
import { PawPrint, LogOut, Settings, Users, Calendar } from 'lucide-react';

export default function PetApp({ onBack }: { onBack: () => void }) {
  return (
    <div className="bg-[#f0f2f5] font-sans text-slate-900 h-screen flex flex-col items-center justify-center">
      <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-orange-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <PawPrint className="w-12 h-12" />
          </div>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">ConnectPet</h1>
        <p className="text-slate-500 mb-8">O sistema do futuro para seu PetShop.</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <Users className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <span className="text-xs font-bold text-slate-600">Pets</span>
          </div>
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <Calendar className="w-6 h-6 text-orange-500 mx-auto mb-2" />
            <span className="text-xs font-bold text-slate-600">Banhos</span>
          </div>
        </div>

        <div className="space-y-3">
          <button className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl transition-colors shadow-md">
            Acessar Sistema
          </button>
          <button onClick={onBack} className="w-full py-3 bg-white border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors">
            Voltar ao Menu
          </button>
        </div>
        
        <p className="mt-8 text-xs text-slate-400">Em desenvolvimento • ConnectPro</p>
      </div>
    </div>
  );
}
