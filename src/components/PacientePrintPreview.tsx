import React from 'react';
import { ArrowLeft, Printer } from 'lucide-react';

export function PacientePrintPreview({ patient, onClose }: { patient: any, onClose: () => void }) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-[#f0f4f8] z-50 flex flex-col overflow-hidden">
      {/* Top Bar (Not printed) */}
      <div className="print:hidden h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
        <button onClick={onClose} className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-slate-800 transition-colors uppercase tracking-wider bg-slate-100 hover:bg-slate-200 px-4 py-2 rounded-lg">
          <ArrowLeft className="w-4 h-4" /> Sair da Visualização
        </button>
        <div className="text-center">
          <h2 className="text-sm font-black text-slate-800">SmartSheet Pro</h2>
          <p className="text-[10px] text-slate-500 uppercase tracking-widest">Avaliação de Alto Desempenho</p>
        </div>
        <button onClick={handlePrint} className="flex items-center gap-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 transition-colors uppercase tracking-wider px-6 py-2 rounded-lg">
          <Printer className="w-4 h-4" /> Imprimir Agora
        </button>
      </div>

      {/* Pages Container (Scrollable) */}
      <div className="flex-1 overflow-auto p-8 print:p-0 print:overflow-visible flex flex-col items-center gap-8">
        
        {/* PAGE 1: Avaliação */}
        <div className="bg-white w-[210mm] min-h-[297mm] shadow-lg print:shadow-none print:w-auto print:h-auto print:min-h-0 print:block">
           <div className="p-8 h-full flex flex-col gap-2 text-blue-900">
             
             {/* Header */}
             <div className="flex border-[3px] border-blue-900 pb-2">
               <div className="w-1/4 flex flex-col items-center justify-center border-r-[3px] border-blue-900 pr-4">
                 <h1 className="text-4xl font-black tracking-tighter">MG</h1>
                 <p className="text-[10px] font-bold mt-1 uppercase tracking-widest">MG Fisioterapia</p>
               </div>
               <div className="w-3/4 flex flex-col items-center justify-center pl-4">
                 <h2 className="text-2xl font-bold uppercase tracking-tight">Ficha de Avaliação Fisioterapêutica</h2>
                 <p className="text-xs uppercase tracking-widest mt-1">Protocolo de Exame Físico e Funcional</p>
               </div>
             </div>

             {/* Section 1 */}
             <div className="border-[3px] border-blue-900">
               <div className="bg-blue-900 text-white text-xs font-bold p-1 uppercase tracking-wider">1. Dados de Identificação</div>
               <div className="flex justify-between border-b-[1px] border-blue-900">
                 <div className="p-1 px-2 flex-1 border-r-[1px] border-blue-900">
                   <div className="text-[9px] font-bold uppercase">Nome do Paciente</div>
                   <div className="text-sm font-bold uppercase">{patient.name || 'Gilberto Andrade Silva'}</div>
                 </div>
                 <div className="p-1 px-2 w-32 border-r-[1px] border-blue-900">
                   <div className="text-[9px] font-bold uppercase">Gênero</div>
                   <div className="text-xs font-bold mt-0.5 flex items-center gap-2">
                     F <div className="w-3 h-3 border border-blue-900"></div> 
                     M <div className="w-3 h-3 border border-blue-900 bg-blue-900 flex items-center justify-center text-white"><svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg></div>
                   </div>
                 </div>
                 <div className="p-1 px-2 w-40">
                   <div className="text-[9px] font-bold uppercase">Telefone</div>
                   <div className="text-sm font-bold">{patient.contact || '71992420129'}</div>
                 </div>
               </div>
               
               <div className="flex border-b-[1px] border-blue-900">
                 <div className="p-1 px-2 flex-1 border-r-[1px] border-blue-900">
                   <div className="text-[9px] font-bold uppercase">Endereço</div>
                   <div className="text-sm uppercase">2 tv Deusdete Muniz, 42 - Marechal Rondon - Salvador/BA</div>
                 </div>
                 <div className="p-1 px-2 w-48">
                   <div className="text-[9px] font-bold uppercase">Nascimento</div>
                   <div className="text-sm font-bold">15/02/1973</div>
                 </div>
               </div>

               <div className="flex">
                 <div className="p-1 px-2 flex-1 border-r-[1px] border-blue-900">
                   <div className="text-[9px] font-bold uppercase">Profissão</div>
                   <div className="text-xs uppercase">Motoboy</div>
                 </div>
                 <div className="p-1 px-2 flex-1 border-r-[1px] border-blue-900">
                   <div className="text-[9px] font-bold uppercase">Escolaridade</div>
                   <div className="text-xs uppercase">Não Informado</div>
                 </div>
                 <div className="p-1 px-2 flex-1 border-r-[1px] border-blue-900">
                   <div className="text-[9px] font-bold uppercase">Estado Civil</div>
                   <div className="text-xs uppercase">Casado</div>
                 </div>
                 <div className="p-1 px-2 flex-1">
                   <div className="text-[9px] font-bold uppercase">Avaliado em</div>
                   <div className="text-sm font-bold">04/05/2026</div>
                 </div>
               </div>
             </div>

             {/* Section 2 */}
             <div className="border-[3px] border-blue-900 flex-none">
               <div className="bg-blue-900 text-white text-xs font-bold p-1 uppercase tracking-wider">2. Anamnese (QP / HDA / HDP)</div>
               <div className="p-2 h-36 text-sm leading-relaxed">
                 Paciente relata fortes dores na coluna cervical desde dia a cerca de 6 meses mas se auto medicava e voltava a trabalhar, apresenta RNM com retificação da coluna cervical, e herda discais principal c6-c7;
               </div>
             </div>

             {/* Section 3 */}
             <div className="border-[3px] border-blue-900">
               <div className="bg-blue-900 text-white text-xs font-bold p-1 uppercase tracking-wider text-center">3. Avaliação Física e Clínica</div>
               <div className="p-2 flex border-b border-blue-200">
                 <div className="w-1/2 border-r border-blue-200 pr-2">
                   <div className="text-xs font-bold uppercase mb-2">■ 3.1 Inspeção</div>
                   <div className="text-xs font-bold uppercase flex gap-4">
                     <span>EST: [X] BEG [ ] REG [ ] MEG</span>
                     <span>PELE: [X] N [ ] A</span>
                   </div>
                 </div>
                 <div className="w-1/2 pl-2">
                   <div className="text-xs font-bold uppercase mb-2">■ 3.2 Palpação</div>
                   <div className="flex gap-8 mb-1">
                     <span className="text-xs font-bold uppercase">TÔN: [N] <span className="text-blue-300 font-normal">N/HI/HP</span></span>
                     <span className="text-xs font-bold uppercase">TROF: [N] <span className="text-blue-300 font-normal">N/HI/HP</span></span>
                   </div>
                   <div className="text-xs font-bold uppercase">DOR: [X] S [ ] N</div>
                 </div>
               </div>
               
               <div className="p-2 flex items-center justify-between">
                 <div className="text-xs font-bold uppercase mr-2">Escala de Dor (EVA):</div>
                 <div className="flex flex-1 border border-blue-900 rounded overflow-hidden">
                   {[0,1,2,3,4,5,6,7,8,9,10].map(n => (
                     <div key={n} className={`flex-1 text-center py-1 border-r border-blue-900 last:border-r-0 text-sm font-bold ${n === 7 ? 'bg-blue-900 text-white' : ''}`}>
                       {n}
                     </div>
                   ))}
                 </div>
                 <div className="text-[8px] font-bold text-blue-500 uppercase leading-tight ml-2 text-center w-12 pt-0.5">0:SEM DOR<br/>10:MÁXIMA</div>
               </div>
             </div>

             {/* Section 4 */}
             <div className="border-[3px] border-blue-900">
               <div className="bg-blue-900 text-white text-xs font-bold p-1 uppercase tracking-wider flex justify-between">
                 <span>4. Testes Ortopédicos</span>
                 <span>(+) POSITIVO ; (-) NEGATIVO</span>
               </div>
               <div className="flex">
                 <div className="w-16 border-r border-blue-900 flex items-center justify-center font-bold text-xs uppercase text-blue-900">MMSS</div>
                 <div className="flex-1 p-2 grid grid-cols-3 gap-2 text-xs font-bold uppercase">
                   <div>APLEY [ &nbsp;&nbsp; ]</div>
                   <div>LATA VAZIA [ &nbsp;&nbsp; ]</div>
                   <div>YERGASON [ &nbsp;&nbsp; ]</div>
                   <div>NEER [ &nbsp;&nbsp; ]</div>
                   <div>COZEN [ &nbsp;&nbsp; ]</div>
                   <div className="col-span-2">EPICONDILITE: LAT [ &nbsp;&nbsp; ] MED [ &nbsp;&nbsp; ]</div>
                   <div>PHALEN [ &nbsp;&nbsp; ]</div>
                   <div>PHALEN INVERTIDO [ &nbsp;&nbsp; ]</div>
                 </div>
               </div>
               <div className="flex border-t border-blue-900">
                 <div className="w-16 border-r border-blue-900 flex items-center justify-center font-bold text-xs uppercase text-blue-900">MMII</div>
                 <div className="flex-1 p-2 grid grid-cols-3 gap-2 text-xs font-bold uppercase">
                   <div>TRENDELENBURG [ &nbsp;&nbsp; ]</div>
                   <div>THOMAS [ &nbsp;&nbsp; ]</div>
                   <div>APREENSÃO PATELAR [ &nbsp;&nbsp; ]</div>
                   <div>GAVETA ANTERIOR [ &nbsp;&nbsp; ]</div>
                   <div>APLEY [ &nbsp;&nbsp; ]</div>
                   <div>THOMPSON [ &nbsp;&nbsp; ]</div>
                   <div>GAVETA ANT TORNOZELO [ &nbsp;&nbsp; ]</div>
                   <div className="col-span-2">GAVETA POS TORNOZELO [ &nbsp;&nbsp; ]</div>
                 </div>
               </div>
               <div className="flex border-t border-blue-900">
                 <div className="w-16 border-r border-blue-900 flex items-center justify-center font-bold text-xs uppercase text-blue-900">COLUNA</div>
                 <div className="flex-1 p-2 flex justify-between text-xs font-bold uppercase pr-8">
                   <div>COMPRESSÃO [ &nbsp;&nbsp; ]</div>
                   <div>TRAÇÃO [ &nbsp;&nbsp; ]</div>
                   <div>BRUDZINSKI [ &nbsp;&nbsp; ]</div>
                   <div>LASÈGUE [ &nbsp;&nbsp; ]</div>
                 </div>
               </div>
             </div>

             {/* Section 5, 6, 7 */}
             <div className="flex gap-2 h-full flex-1 min-h-[160px]">
               <div className="flex-1 flex flex-col gap-2 h-full">
                 <div className="border-[3px] border-blue-900">
                   <div className="bg-blue-900 text-white text-xs font-bold p-1 uppercase tracking-wider">5. Exames Complementares</div>
                   <div className="p-2 text-sm">RX AP+P cervical + RNM cervical</div>
                 </div>
                 <div className="border-[3px] border-blue-900">
                   <div className="bg-blue-900 text-white text-xs font-bold p-1 uppercase tracking-wider">6. Diagnóstico</div>
                   <div className="p-2 text-sm">Hernia discal cervical + retificação cervical</div>
                 </div>
                 <div className="border-[3px] border-blue-900 flex-1">
                   <div className="bg-blue-900 text-white text-xs font-bold p-1 uppercase tracking-wider">7. Conduta</div>
                   <div className="p-2 text-sm">Alongamento + fortalecimento + Analgesia</div>
                 </div>
               </div>
               
               <div className="w-48 border-[3px] border-blue-900 flex items-end justify-center pb-2 px-2 text-center h-full">
                 <div>
                   <div className="text-[10px] font-bold uppercase">MAILTON GARRIDO CANUTO</div>
                   <div className="text-[7px] font-bold uppercase text-blue-600 mt-1">RUA VICENTE CELESTINO, 22 - MARECHAL RONDON<br/>ASSINATURA DO PROFISSIONAL</div>
                 </div>
               </div>
             </div>

           </div>
        </div>

        {/* PAGE BREAK (Visual Only) */}
        <div className="print:hidden w-[210mm] border-t-2 border-dashed border-slate-300 relative my-4">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f0f4f8] px-4 text-xs font-bold text-slate-400 uppercase tracking-widest">Folha 02 - Evolução</div>
        </div>
        <div className="hidden print:block page-break-after-auto" style={{pageBreakAfter: 'always'}}></div>

        {/* PAGE 2: Evolução */}
        <div className="bg-white w-[210mm] min-h-[297mm] shadow-lg print:shadow-none print:w-auto print:min-h-0 print:h-auto print:block">
           <div className="p-8 h-full flex flex-col gap-4 text-blue-900">
             
             {/* Header */}
             <div className="flex justify-between items-end border-b-2 border-blue-900 pb-1">
               <h2 className="text-lg font-bold">Ficha De Evolução</h2>
               <div className="text-right">
                 <div className="text-[8px] uppercase tracking-widest">PACIENTE:</div>
                 <div className="text-xs font-bold uppercase">{patient.name || 'Gilberto Andrade Silva'}</div>
               </div>
             </div>

             {/* Lines */}
             <div className="flex-1 flex flex-col gap-1.5">
               {Array.from({length: 20}).map((_, i) => (
                 <div key={i} className="flex-1 flex flex-col">
                   <div className="flex-1 flex items-end gap-1">
                     <span className="text-xs font-bold uppercase whitespace-nowrap pb-0.5">{`${(i+1).toString().padStart(2, '0')} - DATA: ___/___/___:`}</span>
                     <span className="text-[11px] font-bold uppercase text-blue-700 whitespace-nowrap pb-0.5">Paciente BEG [ &nbsp;&nbsp; ] REG [ &nbsp;&nbsp; ] MEG [ &nbsp;&nbsp; ],</span>
                     <div className="flex-1 border-b border-blue-300"></div>
                   </div>
                   <div className="flex-1 border-b border-blue-300 w-full"></div>
                   <div className="flex-1 border-b border-blue-300 w-full"></div>
                 </div>
               ))}
             </div>

           </div>
        </div>

      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * {
            visibility: hidden;
          }
          #print-preview-container, #print-preview-container * {
            visibility: visible;
          }
          #print-preview-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}} />
    </div>
  );
}
