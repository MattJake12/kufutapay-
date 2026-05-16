import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Download, Share2, Check, 
  Copy, Smartphone, Calendar, Hash, ShieldCheck,
  ChevronRight
} from 'lucide-react';

import PageTransition from '../components/ui/PageTransition';
import { useApp } from '../context/AppContext';
import { cn } from '../utils/cn';

const Receipt = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { formatKz } = useApp();
    const receiptRef = useRef(null);
    
    // Fallback if accessed without state
    const transaction = location.state?.transaction || {
        id: 'REF-832194021',
        type: 'transfer',
        amount: 25000,
        recipient: 'JOÃO DOMINGOS',
        bank: 'BFA',
        date: '24 Maio 2024  14:32',
        status: 'success'
    };

    const isSuccess = transaction.status === 'success';

    return (
        <PageTransition className="min-h-full flex flex-col px-5 pt-6 pb-20 bg-brand-light">
            
            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <button 
                    onClick={() => navigate(-1)} 
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 active:scale-90 transition-all border border-slate-100"
                >
                    <ArrowLeft size={20} />
                </button>
                <h1 className="text-xl font-black text-slate-800 tracking-tight">Comprovativo</h1>
                <div className="w-10" /> {/* Spacer */}
            </div>

            {/* RECEIPT CARD */}
            <div className="flex-1 flex flex-col items-center">
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="w-full max-w-sm relative"
                >
                    {/* The "Paper" part */}
                    <div className="bg-white rounded-[40px] shadow-2xl shadow-slate-200 overflow-hidden relative border border-slate-100">
                        
                        {/* Status Brand Header */}
                        <div className={cn(
                            "h-32 flex flex-col items-center justify-center text-white",
                            isSuccess ? "bg-brand-primary" : "bg-red-500"
                        )}>
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                                <Check size={24} strokeWidth={3} />
                            </div>
                            <span className="font-black text-xs uppercase tracking-[0.2em]">Pagamento Concluído</span>
                        </div>

                        {/* Content */}
                        <div className="px-8 pt-10 pb-12 flex flex-col items-center">
                            <span className="text-slate-600 text-[10px] font-black uppercase tracking-widest mb-2">Valor Total</span>
                            <h2 className="text-4xl font-black text-slate-800 mb-8">{formatKz(transaction.amount)}</h2>
                            
                            <div className="w-full space-y-6">
                                {/* Recipient */}
                                <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                                            <div className="w-6 h-6 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary font-bold text-[10px]">
                                                {transaction.recipient?.charAt(0) || 'P'}
                                            </div>
                                        </div>
                                        <div>
                                            <p className="text-[9px] text-slate-600 font-black uppercase tracking-wider">Destinatário</p>
                                            <p className="text-sm font-black text-slate-800 uppercase line-clamp-1">{transaction.recipient || transaction.entity}</p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-500" />
                                </div>

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-y-6 px-2">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 text-slate-600">
                                            <Calendar size={12} />
                                            <span className="text-[9px] font-black uppercase tracking-wider">Data e Hora</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-700">{transaction.date}</p>
                                    </div>

                                    <div className="space-y-1 text-right">
                                        <div className="flex items-center justify-end gap-1.5 text-slate-600">
                                            <Smartphone size={12} />
                                            <span className="text-[9px] font-black uppercase tracking-wider">Metódo</span>
                                        </div>
                                        <p className="text-xs font-bold text-slate-700 uppercase">{transaction.type}</p>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-1.5 text-slate-600">
                                            <Hash size={12} />
                                            <span className="text-[9px] font-black uppercase tracking-wider">Referência</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <p className="text-[10px] font-bold text-slate-700 font-mono tracking-tighter">{transaction.id}</p>
                                            <button className="text-brand-primary active:scale-90 transition-transform">
                                                <Copy size={12} />
                                            </button>
                                        </div>
                                    </div>

                                    <div className="space-y-1 text-right">
                                        <div className="flex items-center justify-end gap-1.5 text-slate-600">
                                            <ShieldCheck size={12} />
                                            <span className="text-[9px] font-black uppercase tracking-wider">Segurança</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-emerald-500 uppercase">Verificado</p>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Cutout Circle Left */}
                            <div className="absolute left-0 top-[28%] -translate-x-1/2 w-8 h-8 bg-brand-light rounded-full border-r border-slate-100 hidden sm:block" />
                            {/* Decorative Cutout Circle Right */}
                            <div className="absolute right-0 top-[28%] translate-x-1/2 w-8 h-8 bg-brand-light rounded-full border-l border-slate-100 hidden sm:block" />
                        </div>

                        {/* QR Code Placeholder */}
                        <div className="pb-10 flex flex-col items-center">
                            <div className="w-24 h-24 bg-slate-50 rounded-2xl p-2 border border-slate-100 flex items-center justify-center opacity-40">
                                <div className="w-full h-full bg-[radial-gradient(circle,rgba(0,0,0,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />
                            </div>
                            <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mt-3">Selo Digital PayService+</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex gap-4 max-w-sm mx-auto w-full">
                <button 
                    className="flex-1 h-14 bg-white border border-slate-200 rounded-3xl flex items-center justify-center gap-3 text-slate-600 font-black text-sm shadow-sm active:scale-95 transition-all"
                >
                    <Download size={20} />
                    PDF
                </button>
                <button 
                    className="flex-1 h-14 bg-brand-primary rounded-3xl flex items-center justify-center gap-3 text-white font-black text-sm shadow-xl shadow-brand-primary/25 active:scale-95 transition-all"
                >
                    <Share2 size={20} />
                    COMPARTILHAR
                </button>
            </div>

            <div className="mt-6 text-center">
                <button 
                    onClick={() => navigate('/app')}
                    className="text-slate-600 font-black text-[10px] uppercase tracking-widest hover:text-brand-primary transition-colors"
                >
                    Voltar para o Início
                </button>
            </div>

        </PageTransition>
    );
};

export default Receipt;
