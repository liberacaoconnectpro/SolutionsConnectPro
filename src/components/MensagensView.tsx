import React, { useState } from 'react';
import { Search, MoreVertical, Paperclip, Send, User, Check, CheckCheck, Clock, Plus } from 'lucide-react';

const CONVERSAS = [
  { id: 1, name: 'João Silva', date: '10:42', lastMessage: 'Bom dia, doutor! Posso remarcar a sessão?', unread: 2, online: true },
  { id: 2, name: 'Maria Fernandes', date: 'Ontem', lastMessage: 'A dor nas costas melhorou muito.', unread: 0, online: false },
  { id: 3, name: 'Carlos Roberto', date: 'Segunda', lastMessage: 'Confirmado para amanhã às 14h.', unread: 0, online: true },
  { id: 4, name: 'Ana Paula (Mãe do Lucas)', date: '12/05', lastMessage: 'Obrigada pelo relatório!', unread: 0, online: false },
  { id: 5, name: 'Ricardo Mendes', date: '10/05', lastMessage: 'Vou enviar os exames em anexo.', unread: 0, online: false },
];

const MESSAGES = [
  { id: 1, text: 'Bom dia, João. Como você está hoje?', sender: 'me', time: '10:30', status: 'read' },
  { id: 2, text: 'Bom dia, doutor! Posso remarcar a sessão?', sender: 'other', time: '10:42' },
  { id: 3, text: 'Estou com um imprevisto no trabalho.', sender: 'other', time: '10:43' },
];

export function MensagensView() {
  const [activeChat, setActiveChat] = useState(CONVERSAS[0]);
  const [messageText, setMessageText] = useState('');

  return (
    <div className="flex h-full max-h-[800px] w-full bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      
      {/* Sidebar - Contacts */}
      <div className="w-1/3 border-r border-slate-200 flex flex-col bg-slate-50 min-w-[300px]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 bg-white">
          <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-4">Conversas</h2>
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar paciente..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Contact List */}
        <div className="flex-1 overflow-y-auto">
          {CONVERSAS.map(conversa => (
            <button
              key={conversa.id}
              onClick={() => setActiveChat(conversa)}
              className={`w-full flex items-start gap-4 p-4 border-b border-slate-100 hover:bg-slate-100/50 transition-colors text-left ${activeChat.id === conversa.id ? 'bg-[#f4f0ff]' : ''}`}
            >
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                  {conversa.name.charAt(0)}
                </div>
                {conversa.online && (
                  <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className={`font-bold text-sm truncate ${activeChat.id === conversa.id ? 'text-[#1a1b26]' : 'text-slate-800'}`}>
                    {conversa.name}
                  </h3>
                  <span className={`text-[10px] font-bold uppercase tracking-wider shrink-0 ml-2 ${conversa.unread > 0 ? 'text-[#cbbcf6]' : 'text-slate-400'}`}>
                    {conversa.date}
                  </span>
                </div>
                <p className={`text-xs truncate ${conversa.unread > 0 ? 'font-bold text-slate-700' : 'text-slate-500'}`}>
                  {conversa.lastMessage}
                </p>
              </div>
              {conversa.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-[#1a1b26] flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-white">{conversa.unread}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-[#fafafa]">
        {/* Chat Header */}
        <div className="h-20 px-6 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#f4f0ff] flex items-center justify-center text-[#1a1b26] font-bold">
                {activeChat.name.charAt(0)}
              </div>
              {activeChat.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>
              )}
            </div>
            <div>
              <h2 className="font-black text-[#1a1b26] uppercase tracking-wider">{activeChat.name}</h2>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">{activeChat.online ? 'Online' : 'Offline'}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
           <div className="flex justify-center">
             <div className="bg-slate-200/50 text-slate-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
               Hoje
             </div>
           </div>
           
           {MESSAGES.map(msg => (
             <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[70%] font-medium text-sm rounded-2xl px-5 py-3 shadow-sm ${
                 msg.sender === 'me' 
                  ? 'bg-[#1a1b26] text-white rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none'
               }`}>
                 <p className="leading-relaxed">{msg.text}</p>
                 <div className={`flex items-center justify-end gap-1 mt-2 ${msg.sender === 'me' ? 'text-slate-400' : 'text-slate-400'}`}>
                   <span className="text-[10px] uppercase font-bold tracking-widest">{msg.time}</span>
                   {msg.sender === 'me' && (
                     msg.status === 'read' ? <CheckCheck className="w-3.5 h-3.5 text-blue-400" /> : <Clock className="w-3 h-3" />
                   )}
                 </div>
               </div>
             </div>
           ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-white border-t border-slate-200">
          <div className="flex items-center gap-3">
            <button className="w-12 h-12 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-colors shrink-0">
              <Paperclip className="w-5 h-5" />
            </button>
            <input 
              type="text" 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Digite sua mensagem..." 
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-5 py-4 text-sm text-slate-700 outline-none focus:border-purple-300 focus:ring-2 focus:ring-purple-100 transition-all font-medium placeholder:text-slate-400"
            />
            <button className="w-12 h-12 rounded-xl flex items-center justify-center bg-[#cbbcf6] hover:bg-[#b5a3f1] text-[#1a1b26] transition-colors shrink-0 shadow-sm">
              <Send className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
