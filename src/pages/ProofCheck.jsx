import React from 'react';
import { ShieldAlert, ShieldCheck, ArrowLeft, Info, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';

const ProofCheck = () => {
    const navigate = useNavigate();

    return (
        <PageTransition className="pb-32 min-h-full bg-[#F9FAF8]">
            <div className="bg-[#084C54] pt-8 pb-16 px-6 relative text-white rounded-b-[40px]">
                <button onClick={() => navigate('/app/home')} className="flex items-center gap-2 text-white/80 text-sm font-bold mb-6">
                    <ArrowLeft size={18} strokeWidth={2.5} /> Voltar
                </button>
                <h1 className="text-2xl font-black mb-1">Portal Anti-Burla</h1>
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest">Proteja seu negócio</p>
            </div>

            <div className="px-6 -mt-8 space-y-4 relative z-10">
                <div className="bg-white rounded-[28px] p-6 shadow-lg border border-slate-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-[#CCF030]/20 text-[#084C54] rounded-xl flex items-center justify-center">
                            <Search size={20} />
                        </div>
                        <div>
                            <h3 className="text-base font-black text-slate-800">Verificar IBAN</h3>
                            <p className="text-[11px] font-bold text-slate-400">Verifique se o IBAN é seguro</p>
                        </div>
                    </div>
                    
                    <div className="relative mb-6">
                        <input 
                            type="text" 
                            placeholder="AO06 0000 0000..."
                            className="w-full h-14 bg-slate-50 border border-slate-100 rounded-2xl px-5 text-sm font-black text-slate-800 outline-none focus:border-[#D9480F] transition-all"
                        />
                    </div>
                    
                    <button className="w-full h-14 bg-[#084C54] text-white rounded-2xl font-black text-sm shadow-lg shadow-[#084C54]/10">
                        Verificar Agora
                    </button>
                </div>

                <div className="bg-emerald-500 rounded-[28px] p-6 text-white flex items-center gap-4">
                    <div className="bg-white/20 p-3 rounded-2xl"><ShieldCheck size={24} /></div>
                    <div>
                        <h4 className="text-base font-black">Sistema Ativo</h4>
                        <p className="text-emerald-50 text-[10px] font-bold uppercase tracking-widest">Proteção em tempo real</p>
                    </div>
                </div>

                <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-50">
                    <div className="flex items-center gap-3 mb-4">
                        <Info size={16} className="text-blue-500" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dicas de Segurança</span>
                    </div>
                    <ul className="space-y-3">
                        {['Nunca partilhe o seu PIN', 'Verifique o nome do destinatário', 'Desconfie de prémios fáceis'].map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-xs font-bold text-slate-600">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#084C54] mt-1.5 shrink-0" />
                                {tip}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </PageTransition>
    );
};

export default ProofCheck;
