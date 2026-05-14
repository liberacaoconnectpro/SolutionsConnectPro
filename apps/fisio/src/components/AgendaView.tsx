import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Clock, CheckCircle2, CircleDashed, XCircle } from 'lucide-react';
import { motion } from 'motion/react';

export interface Agendamento {
  id: string;
  pacienteNome: string;
  horario: string; // Esperamos formato ISO para facilitar manipulação de data/hora
  tipoSessao: string;
  status: 'confirmado' | 'pendente' | 'cancelado';
}

interface AgendaViewProps {
  agendamentos?: Agendamento[];
}

const HORARIOS = [
  '08:00', '09:00', '10:00', '11:00', '12:00', 
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

export const AgendaView: React.FC<AgendaViewProps> = ({ agendamentos = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const getDaysOfWeek = (date: Date) => {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Ajuste para segunda-feira
    start.setDate(diff);
    
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      return d;
    });
  };

  const daysOfWeek = getDaysOfWeek(currentDate);

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentDate(newDate);
  };

  const getStatusConfig = (status: Agendamento['status']) => {
    switch (status) {
      case 'confirmado':
        return { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: <CheckCircle2 className="w-3 h-3" /> };
      case 'pendente':
        return { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: <CircleDashed className="w-3 h-3" /> };
      case 'cancelado':
        return { color: 'bg-rose-100 text-rose-700 border-rose-200', icon: <XCircle className="w-3 h-3" /> };
      default:
        return { color: 'bg-slate-100 text-slate-700 border-slate-200', icon: null };
    }
  };

  const getAppointmentsForSlot = (day: Date, time: string) => {
    return agendamentos.filter(a => {
      const appointmentDate = new Date(a.horario);
      return (
        appointmentDate.toDateString() === day.toDateString() &&
        appointmentDate.getHours() === parseInt(time.split(':')[0])
      );
    });
  };

  const formatDateLabel = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const formatDayName = (date: Date) => {
    return date.toLocaleDateString('pt-BR', { weekday: 'short' }).replace('.', '');
  };

  const getMonthAndYear = () => {
    return currentDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden font-sans">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg text-white">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800 capitalize">{getMonthAndYear()}</h2>
            <p className="text-xs text-slate-500 font-medium">Agenda Semanal de Fisioterapia</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button 
            onClick={() => navigateWeek('prev')}
            className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-lg transition-all text-slate-600"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setCurrentDate(new Date())}
            className="px-4 py-2 text-sm font-bold text-blue-600 bg-white border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Hoje
          </button>
          <button 
            onClick={() => navigateWeek('next')}
            className="p-2 hover:bg-white hover:shadow-sm border border-transparent hover:border-slate-200 rounded-lg transition-all text-slate-600"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Grid Container */}
      <div className="flex-1 overflow-auto">
        <div className="min-w-[800px]">
          {/* Weekday Labels */}
          <div className="sticky top-0 z-10 grid grid-cols-[80px_repeat(7,1fr)] bg-white border-b border-slate-200 shadow-sm">
            <div className="p-4 border-r border-slate-100 flex items-center justify-center">
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            {daysOfWeek.map((day, idx) => {
              const isToday = day.toDateString() === new Date().toDateString();
              return (
                <div key={idx} className={`p-3 text-center border-r border-slate-100 last:border-0 ${isToday ? 'bg-blue-50/30' : ''}`}>
                  <p className={`text-xs font-bold uppercase tracking-wider ${isToday ? 'text-blue-600' : 'text-slate-400'}`}>
                    {formatDayName(day)}
                  </p>
                  <p className={`text-lg font-extrabold ${isToday ? 'text-blue-700' : 'text-slate-800'}`}>
                    {formatDateLabel(day)}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Time Slots */}
          <div className="bg-slate-50/20">
            {HORARIOS.map((time) => (
              <div key={time} className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-slate-100 min-h-[100px]">
                {/* Time Label */}
                <div className="p-4 border-r border-slate-100 bg-white flex items-start justify-center">
                  <span className="text-xs font-bold text-slate-400 tabular-nums">{time}</span>
                </div>

                {/* Day Slots */}
                {daysOfWeek.map((day, idx) => {
                  const dayAppointments = getAppointmentsForSlot(day, time);
                  return (
                    <div 
                      key={idx} 
                      className={`p-2 border-r border-slate-100 last:border-0 relative transition-colors ${day.getDay() === 0 || day.getDay() === 6 ? 'bg-slate-100/30' : 'hover:bg-white'}`}
                    >
                      {dayAppointments.length > 0 ? (
                        <div className="space-y-2">
                          {dayAppointments.map((app) => {
                            const config = getStatusConfig(app.status);
                            return (
                              <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                key={app.id}
                                className={`p-2 rounded-xl border-l-4 ${config.color} shadow-sm border border-slate-200/50 cursor-pointer hover:shadow-md transition-shadow group`}
                              >
                                <p className="text-[10px] font-bold uppercase tracking-tight opacity-70 mb-0.5">{app.tipoSessao}</p>
                                <p className="text-xs font-extrabold leading-tight truncate mb-1.5">{app.pacienteNome}</p>
                                <div className="flex items-center gap-1.5">
                                  {config.icon}
                                  <span className="text-[10px] font-bold capitalize">{app.status}</span>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="w-full h-full min-h-[60px] group cursor-pointer flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <button className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shadow-sm">
                            <span className="text-xl font-medium leading-none">+</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgendaView;
