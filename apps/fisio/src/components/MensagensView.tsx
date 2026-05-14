import React, { useState } from 'react';
import { Search, Send, CheckCheck, Check, User, MessageSquare } from 'lucide-react';

export const MensagensView: React.FC = () => {
  const [activeChat, setActiveChat] = useState<number | null>(1);
  const [mensagem, setMensagem] = useState('');

  const [conversas] = useState([
    { id: 1, nome: 'Maria Oliveira', tipo: 'paciente', lastMsg: 'Doutor, amanhã que horas?', time: '10:30', unread: 2 },
    { id: 2, nome: 'Dr. Fernando (Ortopedia)', tipo: 'equipe', lastMsg: 'Te enviei a ressonância.', time: 'Ontem', unread: 0 },
    { id: 3, nome: 'Recepção', tipo: 'equipe', lastMsg: 'O paciente das 14h chegou.', time: 'Ontem', unread: 0 },
  ]);

  const [mensagens, setMensagens] = useState([
    { id: 1, chatId: 1, text: 'Bom dia! Tudo bem?', sender: 'me', time: '09:00', isRead: true },
    { id: 2, chatId: 1, text: 'Queria confirmar a sessão de amanhã.', sender: 'other', time: '09:05', isRead: true },
    { id: 3, chatId: 1, text: 'Sim, confirmada para as 15h.', sender: 'me', time: '09:30', isRead: true },
    { id: 4, chatId: 1, text: 'Obrigada!', sender: 'other', time: '10:25', isRead: false },
  ]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mensagem.trim() || !activeChat) return;
    
    const newMsg = {
      id: Date.now(),
      chatId: activeChat,
      text: mensagem,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false
    };
    
    setMensagens([...mensagens, newMsg]);
    setMensagem('');
  };

  const activeChatData = conversas.find(c => c.id === activeChat);
  const activeMensagens = mensagens.filter(m => m.chatId === activeChat);

  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden m-6">
      <div className="w-80 flex flex-col border-r border-slate-200 bg-slate-50 shrink-0">
        <div className="p-4 border-b border-slate-200 bg-white">
          <h2 className="font-bold text-slate-800 text-lg mb-4">Mensagens</h2>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Buscar conversa..." 
              className="w-full bg-slate-100 text-sm border-none rounded-lg pl-9 pr-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {conversas.map(chat => (
            <div 
              key={chat.id} 
              onClick={() => setActiveChat(chat.id)}
              className={`p-4 border-b border-slate-100 flex gap-3 cursor-pointer transition-colors ${
                activeChat === chat.id ? 'bg-blue-50' : 'hover:bg-slate-100'
              }`}
            >
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-slate-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-sm text-slate-800 truncate">{chat.nome}</h3>
                  <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{chat.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate">{chat.lastMsg}</p>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-[10px] text-white font-bold shrink-0 self-center">
                  {chat.unread}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {activeChatData ? (
        <div className="flex-1 flex flex-col min-w-0 bg-white">
          <div className="h-16 border-b border-slate-200 flex items-center justify-between px-6 shrink-0 bg-white shadow-sm z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{activeChatData.nome}</h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full mt-1 inline-block border ${
                  activeChatData.tipo === 'paciente' 
                    ? 'bg-green-50 text-green-700 border-green-200' 
                    : 'bg-purple-50 text-purple-700 border-purple-200'
                }`}>
                  {activeChatData.tipo === 'paciente' ? 'Paciente' : 'Equipe'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6 bg-slate-50 flex flex-col gap-4">
            {activeMensagens.map(msg => {
              const isMe = msg.sender === 'me';
              return (
                <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    isMe 
                      ? 'bg-blue-600 text-white rounded-br-sm' 
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm shadow-sm'
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                      isMe ? 'text-blue-200' : 'text-slate-400'
                    }`}>
                      {msg.time}
                      {isMe && (
                        msg.isRead ? <CheckCheck className="w-3 h-3 text-blue-200" /> : <Check className="w-3 h-3" />
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="p-4 bg-white border-t border-slate-200 shrink-0">
            <form onSubmit={handleSend} className="flex gap-2 items-end max-w-4xl mx-auto">
              <textarea 
                value={mensagem}
                onChange={e => setMensagem(e.target.value)}
                placeholder="Digite sua mensagem..." 
                className="flex-1 resize-none h-[48px] py-3 px-4 bg-slate-100 border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend(e);
                  }
                }}
              />
              <button 
                type="submit"
                disabled={!mensagem.trim()}
                className="w-12 h-12 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white flex items-center justify-center rounded-xl transition-colors shadow-sm shrink-0"
              >
                <Send className="w-5 h-5 -ml-0.5" />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center">
          <MessageSquare className="w-16 h-16 text-slate-300 mb-4" />
          <p className="font-medium text-slate-500">Selecione uma conversa</p>
        </div>
      )}
    </div>
  );
};

export default MensagensView;
