import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle2, QrCode, CreditCard, Banknote, X, Share2, Printer,
  Smartphone, Hash, ChevronRight, Copy, Info
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import PageTransition from '../components/ui/PageTransition';
import { cn } from '../utils/cn';

const POS = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { processSale, formatKz } = useApp();
    
    // amount | method | qr | reference | ref_generated | success
    const [step, setStep] = useState('amount'); 
    const [amountStr, setAmountStr] = useState('0');
    const [selectedMethod, setSelectedMethod] = useState('Dinheiro');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedRef, setGeneratedRef] = useState('');
    const [transactionTime, setTransactionTime] = useState('');

    const preSelectedMethod = location.state?.method;

    const handleQuickValue = (val) => {
        const currentAmount = parseFloat(amountStr) || 0;
        setAmountStr((currentAmount + val).toString());
    };

    const handleBack = () => {
        if (step === 'method') setStep('amount');
        else if (step === 'qr' || step === 'reference') setStep('method');
        else if (step === 'ref_generated') setStep('amount');
        else navigate('/app/home');
    };

    const handleConfirmAmount = () => {
        if (parseFloat(amountStr) <= 0) return;

        if (preSelectedMethod) {
            handleSelectMethod(preSelectedMethod);
        } else {
            setStep('method');
        }
    };

    const handleSelectMethod = (method) => {
        setSelectedMethod(method);
        if (method === 'Dinheiro' || method === 'Transferência bancária' || method === 'Pagamento móvel') {
            processPayment(method);
        } else if (method === 'QR Code') {
            setStep('qr');
        } else if (method === 'Referência') {
            setStep('reference');
        }
    };

    const processPayment = async (methodName) => {
        setIsLoading(true);
        // Simulando delay de rede
        await new Promise(r => setTimeout(r, 1200));
        setIsLoading(false);
        setTransactionTime(new Date().toLocaleString('pt-PT', { 
            day: '2-digit', month: '2-digit', year: 'numeric', 
            hour: '2-digit', minute: '2-digit' 
        }));
        setGeneratedRef("#" + Math.floor(100000 + Math.random() * 900000));
        setStep('success');
    }

    const generateReferenceFinal = async () => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1200));
        setIsLoading(false);
        let ref = "";
        for(let i=0; i<3; i++) ref += Math.floor(100 + Math.random() * 900) + " ";
        setGeneratedRef(ref.trim());
        setStep('ref_generated');
    };

    // --- VIEW: AMOUNT INPUT ---
    if (step === 'amount') {
        return (
            <PageTransition className="min-h-full flex flex-col bg-[#F9FAF8]">
                <div className="bg-[#084C54] pt-8 pb-12 px-6 text-white text-left relative rounded-b-[40px]">
                    <button onClick={handleBack} className="flex items-center gap-2 text-white/90 text-sm font-bold mb-6">
                        <ArrowLeft size={18} strokeWidth={2.5} /> Voltar
                    </button>
                    <h1 className="text-2xl font-black mb-1">Vender</h1>
                    <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Insira o valor da venda</p>
                </div>

                <div className="flex-1 px-6 -mt-6 flex flex-col">
                    <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/60 border border-slate-100 mb-6 transition-all">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Valor a receber</p>
                        <div className="flex items-center justify-between">
                            <input 
                                type="tel"
                                inputMode="numeric"
                                value={amountStr === '0' ? '' : amountStr}
                                onChange={(e) => setAmountStr(e.target.value.replace(/\D/g, '') || '0')}
                                placeholder="0"
                                className="text-5xl font-black text-slate-800 bg-transparent w-full outline-none placeholder:text-slate-200"
                            />
                            <span className="text-2xl font-black text-[#084C54] ml-4">Kz</span>
                        </div>
                    </div>

                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100 flex-1 flex flex-col">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Valores rápidos</p>
                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {[500, 1000, 2000, 5000, 10000, 20000].map(val => (
                                <button 
                                    key={val}
                                    onClick={() => handleQuickValue(val)}
                                    className="h-14 rounded-2xl border border-slate-100 flex items-center justify-center text-base font-black text-slate-700 active:bg-slate-50 transition-all shadow-sm"
                                >
                                    {val}
                                </button>
                            ))}
                        </div>

                        <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 mb-8 flex items-start gap-3">
                            <Info size={18} className="text-[#084C54] shrink-0 mt-0.5" />
                            <p className="text-[13px] font-bold text-slate-600 leading-tight">
                                <span className="text-[#084C54]">Dica:</span> Confirme o valor com o cliente antes de avançar.
                            </p>
                        </div>
                        
                        <button 
                            onClick={handleConfirmAmount}
                            disabled={parseFloat(amountStr) <= 0}
                            className={cn(
                                "w-full h-16 rounded-2xl font-black text-lg shadow-lg flex items-center justify-center transition-all mt-auto",
                                parseFloat(amountStr) > 0 
                                    ? "bg-[#084C54] text-white shadow-[#084C54]/10" 
                                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                            )}
                        >
                            {preSelectedMethod ? 'Continuar' : 'Escolher método'}
                        </button>
                    </div>
                </div>
                <div className="h-6" />
            </PageTransition>
        );
    }

    // --- VIEW: CHOOSE METHOD ---
    if (step === 'method') {
        const methods = [
            { id: 'Dinheiro', title: 'Dinheiro', desc: 'Receber em mãos', icon: Banknote },
            { id: 'Transferência bancária', title: 'Transferência', desc: 'Via Multicaixa/App', icon: CreditCard },
            { id: 'Pagamento móvel', title: 'Pagamento Móvel', desc: 'Unitel Money / Aki', icon: Smartphone },
            { id: 'QR Code', title: 'QR Code', desc: 'Escanear na tela', icon: QrCode },
            { id: 'Referência', title: 'Referência', desc: 'Pagar via ATM', icon: Hash },
        ];

        return (
            <PageTransition className="min-h-full flex flex-col bg-[#F9FAF8]">
                <div className="bg-[#084C54] pt-8 pb-12 px-6 text-white text-left relative rounded-b-[40px]">
                    <button onClick={handleBack} className="flex items-center gap-2 text-white/90 text-sm font-bold mb-6">
                        <ArrowLeft size={18} strokeWidth={2.5} /> Voltar
                    </button>
                    <h1 className="text-2xl font-black mb-1">Método de pagamento</h1>
                    <p className="text-white/80 text-xs font-bold uppercase tracking-widest">Selecione como deseja receber</p>
                </div>

                <div className="flex-1 px-6 -mt-6 flex flex-col">
                    <div className="bg-white rounded-[32px] p-6 shadow-xl shadow-slate-200/60 border border-slate-100 flex-1">
                        <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between mb-6">
                            <span className="text-xs font-black text-slate-400 uppercase">Valor Total</span>
                            <span className="text-xl font-black text-[#084C54]">{formatKz(parseFloat(amountStr))}</span>
                        </div>

                        <div className="space-y-3">
                            {methods.map(m => (
                                <button
                                    key={m.id}
                                    onClick={() => handleSelectMethod(m.id)}
                                    className={cn(
                                        "w-full h-20 rounded-2xl px-4 flex items-center gap-4 border transition-all active:scale-[0.98]",
                                        selectedMethod === m.id 
                                            ? "bg-[#CCF030]/20 border-[#084C54] text-[#084C54]" 
                                            : "bg-white border-slate-100 text-slate-700 hover:border-slate-200"
                                    )}
                                >
                                    <div className={cn(
                                        "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                                        selectedMethod === m.id ? "bg-[#084C54] text-white" : "bg-slate-50 text-slate-400"
                                    )}>
                                        <m.icon size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-base font-black leading-tight">{m.title}</p>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{m.desc}</p>
                                    </div>
                                    <ChevronRight size={18} className="ml-auto opacity-30" />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="h-6" />
                </div>
            </PageTransition>
        );
    }

    // --- VIEW: QR CODE ---
    if (step === 'qr') {
        return (
            <PageTransition className="min-h-full flex flex-col bg-[#F9FAF8]">
                <div className="bg-[#084C54] pt-8 pb-12 px-6 text-white text-left relative rounded-b-[40px]">
                    <button onClick={handleBack} className="flex items-center gap-2 text-white/90 text-sm font-bold mb-6">
                        <ArrowLeft size={18} strokeWidth={2.5} /> Voltar
                    </button>
                    <h1 className="text-2xl font-black mb-1">QR Code</h1>
                </div>

                <div className="flex-1 px-6 -mt-6 flex flex-col items-center">
                    <div className="bg-white rounded-[32px] p-8 shadow-xl shadow-slate-200/60 border border-slate-100 w-full flex flex-col items-center">
                        <div className="bg-slate-50 rounded-2xl p-4 w-full flex items-center justify-between mb-8">
                            <span className="text-xs font-black text-slate-400 uppercase">Valor</span>
                            <span className="text-xl font-black text-[#084C54]">{formatKz(parseFloat(amountStr))}</span>
                        </div>

                        <div className="w-48 h-48 bg-white rounded-3xl shadow-lg border border-slate-100 p-6 mb-8 flex items-center justify-center">
                            <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=PayService" alt="QR" className="w-full h-full" />
                        </div>

                        <div className="text-center space-y-4 mb-4">
                            <p className="text-xs font-bold text-slate-500 max-w-[200px]">Aguardando o cliente escanear o código para pagar</p>
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-[#084C54] animate-ping" />
                                <span className="text-[10px] font-black text-[#084C54] uppercase tracking-widest">Sinalizando...</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full space-y-3 mt-auto mb-6">
                        <button onClick={() => processPayment('QR Code')} className="w-full h-16 bg-[#084C54] text-white rounded-2xl font-black shadow-lg">
                            Confirmar recebimento
                        </button>
                    </div>
                </div>
            </PageTransition>
        );
    }

    // --- VIEW: GENERATE REFERENCE (INPUT) ---
    if (step === 'reference') {
        return (
            <PageTransition className="min-h-full flex flex-col bg-[#F9FAF8]">
                <div className="bg-[#084C54] pt-8 pb-12 px-6 text-white rounded-b-[40px]">
                    <button onClick={handleBack} className="flex items-center gap-2 text-white/90 text-sm font-bold mb-6">
                        <ArrowLeft size={18} strokeWidth={2.5} /> Voltar
                    </button>
                    <h1 className="text-2xl font-black">Referência</h1>
                </div>

                <div className="px-6 -mt-6 flex-1 flex flex-col">
                    <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100 flex-1 flex flex-col">
                        <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between mb-8">
                            <span className="text-xs font-black text-slate-400 uppercase">Valor</span>
                            <span className="text-xl font-black text-[#084C54]">{formatKz(parseFloat(amountStr))}</span>
                        </div>

                        <div className="space-y-6 flex-1">
                            <div>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block">Data de Expiração</label>
                                <div className="h-14 bg-slate-50 rounded-xl flex items-center px-4 font-black text-slate-700">24 Horas (Padrão)</div>
                            </div>
                        </div>

                        <button 
                            onClick={generateReferenceFinal}
                            className="w-full h-16 bg-[#084C54] text-white rounded-2xl font-black shadow-lg shadow-[#084C54]/10 mt-auto"
                        >
                            {isLoading ? "Gerando..." : "Gerar Referência"}
                        </button>
                    </div>
                </div>
                <div className="h-6" />
            </PageTransition>
        );
    }

    // --- VIEW: REFERENCE GENERATED ---
    if (step === 'ref_generated') {
        return (
            <PageTransition className="min-h-full flex flex-col bg-[#F9FAF8]">
                <div className="bg-[#084C54] pt-8 pb-12 px-6 text-white rounded-b-[40px]">
                    <button onClick={handleBack} className="flex items-center gap-2 text-white/90 text-sm font-bold mb-6">
                        <ArrowLeft size={18} strokeWidth={2.5} /> Voltar
                    </button>
                    <h1 className="text-2xl font-black">Referência Gerada</h1>
                </div>

                <div className="px-6 -mt-6 flex-1 flex flex-col">
                    <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100 flex-1 flex flex-col items-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                            <Hash size={32} />
                        </div>

                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Código de Pagamento</p>
                        <h3 className="text-4xl font-black text-slate-800 tracking-tighter mb-8">{generatedRef}</h3>
                        
                        <button className="flex items-center gap-2 bg-[#084C54]/10 px-8 py-4 rounded-xl font-black text-sm text-[#084C54] active:scale-95 transition-all">
                            <Copy size={18} /> COPIAR CÓDIGO
                        </button>

                        <div className="w-full border-t border-slate-100 my-8" />

                        <div className="space-y-4 w-full">
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400">Entidade</span>
                                <span className="text-xs font-black text-slate-700 uppercase">PayService-AO</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs font-bold text-slate-400">Validade</span>
                                <span className="text-xs font-black text-slate-700 uppercase">Amanhã, 12:00</span>
                            </div>
                        </div>

                        <button 
                            onClick={() => processPayment('Referência')}
                            className="w-full h-16 bg-[#084C54] text-white rounded-2xl font-black shadow-lg mt-auto"
                        >
                            Concluir
                        </button>
                    </div>
                </div>
                <div className="h-6" />
            </PageTransition>
        );
    }

    // --- VIEW: SUCCESS ---
    if (step === 'success') {
        const details = [
            { label: 'Valor Recebido', value: formatKz(parseFloat(amountStr)) },
            { label: 'Método', value: selectedMethod },
            { label: 'Transação', value: generatedRef },
        ];

        return (
            <PageTransition className="min-h-full flex flex-col bg-white px-6 pt-16 pb-10">
                <div className="flex-1 flex flex-col items-center">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl shadow-emerald-100">
                        <CheckCircle2 size={40} strokeWidth={3} />
                    </div>

                    <h1 className="text-xl font-black text-slate-800 mb-1">Pagamento Confirmado</h1>
                    <p className="text-xs font-bold text-slate-400 mb-10">Venda realizada com sucesso</p>

                    <div className="w-full space-y-3 mb-10">
                        {details.map((d, i) => (
                            <div key={i} className="bg-slate-50 rounded-2xl p-5 flex justify-between items-center">
                                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{d.label}</span>
                                <span className="text-sm font-black text-slate-800">{d.value}</span>
                            </div>
                        ))}
                    </div>

                    <div className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full flex items-center gap-2 mb-12">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Sincronizado na Nuvem</span>
                    </div>

                    <div className="w-full space-y-3 mt-auto">
                        <button onClick={() => navigate('/app/home')} className="w-full h-16 bg-[#084C54] text-white rounded-2xl font-black shadow-lg active:scale-[0.98] transition-all">
                            Voltar ao Início
                        </button>
                        <button onClick={() => { setStep('amount'); setAmountStr('0'); }} className="w-full h-16 bg-white border border-slate-200 text-slate-800 font-black rounded-2xl active:bg-slate-50 transition-all">
                            Nova Venda
                        </button>
                    </div>
                </div>
            </PageTransition>
        );
    }

    return null;
};

export default POS;
