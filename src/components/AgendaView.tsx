import React from 'react';

export function AgendaView() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 min-h-[calc(100vh-10rem)]">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column - Mini Calendar & Summary */}
        <div className="w-full md:w-64 shrink-0 space-y-6">
          <div className="border border-slate-200 rounded-2xl p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-slate-800">maio 2026</span>
              <div className="flex gap-1">
                <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors bg-white">
                  &lt;
                </button>
                <button className="w-6 h-6 flex items-center justify-center rounded border border-slate-200 text-slate-400 hover:bg-slate-50 transition-colors bg-white">
                  &gt;
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map((day, ix) => (
                <div key={ix} className="text-[10px] font-bold text-slate-400">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-2 text-center text-xs">
              {[26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(day => (
                <div key={`prev-${day}`} className={`py-1 ${day > 20 ? 'text-slate-300' : 'text-slate-700'}`}>{day}</div>
              ))}
              <div className="py-1 bg-purple-600 text-white font-bold rounded-lg relative">
                13
              </div>
              {[14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3, 4, 5, 6].map(day => (
                <div key={`next-${day}`} className={`py-1 ${day < 10 ? 'text-slate-300' : 'text-slate-700'}`}>{day}</div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-emerald-600 mb-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              <h3 className="text-xs font-bold uppercase tracking-wider">Resumo do Dia</h3>
            </div>
            <p className="text-2xl font-extrabold text-slate-800 mb-1">3 Agendamentos</p>
            <p className="text-xs text-emerald-600">Seus pacientes estão<br/>esperando por você.</p>
          </div>
        </div>

        {/* Right Column - Schedule Details */}
        <div className="flex-1">
          <div className="flex items-center justify-between bg-purple-50/50 rounded-xl p-3 mb-6 border border-purple-100/50">
            <h3 className="font-bold text-slate-800">quarta-feira, 13 de maio de 2026</h3>
            <div className="flex gap-2">
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 bg-white hover:bg-slate-50 transition-colors">
                 &lt;
              </button>
              <button className="px-4 py-1.5 bg-purple-600 text-white text-sm font-bold rounded-lg hover:bg-purple-700 transition-colors">
                Hoje
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-400 bg-white hover:bg-slate-50 transition-colors">
                 &gt;
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* 07:00 Slot */}
            <div className="flex gap-4 min-h-[4rem]">
              <div className="w-12 text-right pt-2 shrink-0">
                <span className="text-xs font-medium text-slate-400">07:00</span>
              </div>
              <div className="flex-1 flex gap-4">
                <div className="flex-1 bg-purple-50/50 border border-purple-100 rounded-xl p-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-200 text-pink-700 flex items-center justify-center font-bold text-sm shrink-0">H</div>
                  <div>
                    <p className="text-sm font-bold text-purple-600">Henrique souza da cruz</p>
                    <p className="text-xs text-purple-400 mt-1">30 min · Confirmado</p>
                  </div>
                </div>
                <div className="flex-1 bg-purple-50/50 border border-purple-100 rounded-xl p-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0">R</div>
                  <div>
                    <p className="text-sm font-bold text-purple-600">Rita de cassia santos lima</p>
                    <p className="text-xs text-purple-400 mt-1">30 min · Confirmado</p>
                  </div>
                </div>
              </div>
            </div>

            {/* 07:30 Slot */}
            <div className="flex gap-4 min-h-[3rem]">
              <div className="w-12 text-right pt-2 shrink-0">
                <span className="text-xs font-medium text-slate-400">07:30</span>
              </div>
              <div className="flex-1 flex gap-4">
                <div className="flex-1 border border-dashed border-slate-200 rounded-xl"></div>
                <div className="flex-1 border border-dashed border-slate-200 rounded-xl"></div>
              </div>
            </div>

            {/* 08:00 Slot */}
            <div className="flex gap-4 min-h-[4rem]">
              <div className="w-12 text-right pt-2 shrink-0">
                <span className="text-xs font-medium text-slate-400">08:00</span>
              </div>
              <div className="flex-1 flex gap-4">
                <div className="flex-1 bg-purple-50/50 border border-purple-100 rounded-xl p-3 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-pink-200 text-pink-700 flex items-center justify-center font-bold text-sm shrink-0">A</div>
                  <div>
                    <p className="text-sm font-bold text-purple-600">Alaide Esmeralda de oliveira</p>
                    <p className="text-xs text-purple-400 mt-1">30 min · Confirmado</p>
                  </div>
                </div>
                <div className="flex-1 border border-dashed border-slate-200 rounded-xl"></div>
              </div>
            </div>

            {/* Empty Slots */}
            {['08:30', '09:00', '09:30', '10:00', '10:30'].map(time => (
              <div key={time} className="flex gap-4 min-h-[3rem]">
                <div className="w-12 text-right pt-2 shrink-0">
                  <span className="text-xs font-medium text-slate-400">{time}</span>
                </div>
                <div className="flex-1 flex gap-4">
                  <div className="flex-1 border border-dashed border-slate-200 rounded-xl"></div>
                  <div className="flex-1 border border-dashed border-slate-200 rounded-xl"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
