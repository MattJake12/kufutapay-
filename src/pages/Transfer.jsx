import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowRightLeft, Phone, MapPin, 
  ChevronRight, CheckCircle2, Wallet, LogOut
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import PageTransition from '../components/ui/PageTransition';
import { cn } from '../utils/cn';

const Transfer = () => {
    const navigate = useNavigate();
    const { formatKz, wallet } = useApp();
    
    const [step, setStep] = useState('menu'); // menu | amount | success
    const [method, setMethod] = useState(null);
    const [amount, setAmount] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const methods = [
        { id: 'bank', title: 'Conta Bancária', icon: MapPin, color: 'bg-blue-50 text-blue-600' },
        { id: 'mooney', title: 'Unitel Money / MCel', icon: Phone, color: 'bg-purple-50 text-purple-600' },
    ];

    const handleConfirm = async () => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsLoading(false);
        setStep('success');
    };

    if (step === 'success') {
        return (
            <PageTransition className="min-h-full flex flex-col bg-white p-6 justify-center items-center text-center">
                <div className="w-24 h-24 bg-[#EDF7ED] rounded-full flex items-center justify-center text-[#2E7D32] mb-6">
                    <CheckCircle2 size={56} strokeWidth={2.5} />
                </div>
                <h1 className="text-3xl font-black text-slate-800 mb-2">Levantamento Solicitado</h1>
                <p className="text-slate-500 font-bold mb-8">O valor selecionado estará disponível em breve</p>
                <button 
                    onClick={() => navigate('/app/home')}
                    className="w-full h-18 bg-[#084C54] text-white rounded-[32px] font-black text-lg shadow-lg"
                >
                    Voltar ao Início
                </button>
            </PageTransition>
        );
    }

    return (
        <PageTransition className="min-h-full flex flex-col bg-[#F9FAF8]">
            
            {/* HEADER VERDE TEAL */}
            <div className="bg-[#084C54] pt-8 pb-16 px-6 text-white text-left relative">
                <button 
                  onClick={() => step === 'amount' ? setStep('menu') : navigate('/app/home')}
                  className="flex items-center gap-2 text-white text-sm font-bold mb-6"
                >
                    <ArrowLeft size={18} strokeWidth={2.5} />
                    Voltar
                </button>
                
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black mb-1">Levantamentos</h1>
                        <p className="text-white/80 text-sm font-medium italic">Retirar saldo do terminal</p>
                    </div>
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                        <LogOut size={24} className="rotate-180" />
                    </div>
                </div>
            </div>

            {/* CONTEUDO OVERLAP */}
            <div className="-mt-10 px-6 pb-32 flex-1 overflow-y-auto no-scrollbar">
                
                {/* WALLET CARD */}
                <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/50 border border-slate-100 mb-8 flex flex-col items-center">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Saldo Disponível</p>
                    <h2 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">{formatKz(wallet.balance)}</h2>
                    <div className="px-4 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase border border-emerald-100">
                        Pronto para levantar
                    </div>
                </div>

                {step === 'menu' && (
                    <div className="space-y-4">
                        <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Destino</h3>
                        {methods.map((m) => (
                            <button 
                                key={m.id}
                                onClick={() => { setMethod(m.id); setStep('amount'); }}
                                className="w-full bg-white p-6 rounded-[32px] border border-slate-100 flex items-center justify-between group active:scale-95 transition-all shadow-sm"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center", m.color)}>
                                        <m.icon size={28} strokeWidth={2.5} />
                                    </div>
                                    <div className="text-left">
                                        <h4 className="font-extrabold text-slate-800 text-lg">{m.title}</h4>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase">Recebimento Imediato</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-slate-300" />
                            </button>
                        ))}

                        <div className="mt-8 bg-blue-50 border border-blue-100 p-6 rounded-[28px] text-center">
                            <p className="text-[11px] font-bold text-blue-700 leading-relaxed uppercase tracking-wider">
                                Taxa de levantamento: 0 Kz para Agentes Diamante
                            </p>
                        </div>
                    </div>
                )}

                {step === 'amount' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div>
                            <p className="text-sm font-bold text-slate-500 mb-4 px-1">Quanto deseja levantar?</p>
                            <input 
                                type="tel"
                                placeholder="0,00 Kz"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full h-20 bg-white border-2 border-slate-100 rounded-[24px] px-8 text-3xl font-black text-slate-800 placeholder:text-slate-200 focus:border-[#D9480F] focus:ring-4 focus:ring-orange-50 outline-none transition-all text-center"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {[1000, 5000, 10000, wallet.balance].map((val) => (
                                <button 
                                    key={val}
                                    onClick={() => setAmount(val.toString())}
                                    className="h-16 rounded-[24px] bg-white border border-slate-200 flex items-center justify-center text-sm font-black text-slate-600 active:border-[#084C54] active:text-[#084C54] transition-all"
                                >
                                    {val === wallet.balance ? 'Tudo' : formatKz(val)}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={handleConfirm}
                            disabled={isLoading || !amount || parseFloat(amount) <= 0}
                            className={cn(
                                "w-full h-20 rounded-[32px] font-black text-xl transition-all shadow-lg",
                                parseFloat(amount) > 0 ? "bg-[#084C54] text-white shadow-[#084C54]/20" : "bg-slate-100 text-slate-400"
                            )}
                        >
                            {isLoading ? "A processar..." : "Confirmar Levantamento"}
                        </button>
                    </div>
                )}

            </div>

        </PageTransition>
    );
};

export default Transfer;
