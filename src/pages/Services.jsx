import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Smartphone, Wifi, Zap, Droplets, Tv, ChevronRight, CheckCircle2, Info
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import PageTransition from '../components/ui/PageTransition';
import { cn } from '../utils/cn';

const Services = () => {
    const navigate = useNavigate();
    const { formatKz } = useApp();
    
    const [view, setView] = useState('menu'); // menu | recharge | internet | energy | water | tv | confirmation
    const [selectedOperator, setSelectedOperator] = useState(null);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [targetNumber, setTargetNumber] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [confirmationView, setConfirmationView] = useState(false);
    const [success, setSuccess] = useState(false);

    const menuItems = [
        { id: 'recharge', title: 'Recarga de Telefone', icon: Smartphone, color: 'bg-[#CCF030]', iconColor: 'text-[#084C54]' },
        { id: 'internet', title: 'Pacotes de Internet', icon: Wifi, color: 'bg-[#084C54]', iconColor: 'text-[#CCF030]' },
        { id: 'energy', title: 'Energia (ENDE)', icon: Zap, color: 'bg-[#CCF030]', iconColor: 'text-[#084C54]' },
        { id: 'water', title: 'Água (EPAL)', icon: Droplets, color: 'bg-[#084C54]', iconColor: 'text-[#CCF030]' },
        { id: 'tv', title: 'TV por Assinatura', icon: Tv, color: 'bg-[#CCF030]', iconColor: 'text-[#084C54]' },
    ];

    const getOperators = () => {
        if (view === 'recharge') return ['Unitel', 'Movicel', 'Africell'];
        if (view === 'internet') return ['Unitel', 'Movicel', 'Angola Telecom'];
        if (view === 'tv') return ['DStv', 'ZAP', 'StarTimes'];
        return [];
    };

    const getPackages = () => {
        if (view === 'recharge') return ['500 Kz', '1 000 Kz', '2 000 Kz', '5 000 Kz'];
        if (view === 'internet') return [
            { l: '1GB - 7 dias', p: '1 500 Kz' },
            { l: '3GB - 15 dias', p: '3 500 Kz' },
            { l: '5GB - 30 dias', p: '5 000 Kz' },
            { l: '10GB - 30 dias', p: '8 500 Kz' }
        ];
        if (view === 'tv') return [
            { l: 'Básico', p: '3 500 Kz' },
            { l: 'Família', p: '6 500 Kz' },
            { l: 'Premium', p: '12 000 Kz' }
        ];
        if (view === 'energy') return ['2 000 Kz', '5 000 Kz', '10 000 Kz', '15 000 Kz'];
        if (view === 'water') return ['1 000 Kz', '3 000 Kz', '5 000 Kz', '10 000 Kz'];
        return [];
    };

    const handleBack = () => {
        if (success) {
            setSuccess(false);
            setView('menu');
            setSelectedOperator(null);
            setSelectedPackage(null);
            setTargetNumber('');
            setConfirmationView(false);
            return;
        }
        if (confirmationView) {
            setConfirmationView(false);
            return;
        }
        if (view !== 'menu') {
            setView('menu');
            setSelectedOperator(null);
            setSelectedPackage(null);
            setTargetNumber('');
        } else {
            navigate('/app/home');
        }
    };

    const handleConfirmAction = () => {
        setConfirmationView(true);
    };

    const processFinalPayment = async () => {
        setIsLoading(true);
        await new Promise(r => setTimeout(r, 1500));
        setIsLoading(false);
        setConfirmationView(false);
        setSuccess(true);
    };

    if (success) {
        return (
            <PageTransition className="min-h-full flex flex-col bg-white p-6">
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-[#EDF7ED] rounded-full flex items-center justify-center text-[#2E7D32] mb-6">
                        <CheckCircle2 size={56} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-800 mb-2">Sucesso!</h1>
                    <p className="text-slate-500 font-bold mb-8">O seu pagamento foi processado</p>
                    <button 
                        onClick={handleBack}
                        className="w-full h-18 bg-[#084C54] text-white rounded-[32px] font-black text-lg shadow-lg"
                    >
                        Continuar
                    </button>
                </div>
            </PageTransition>
        );
    }

    if (confirmationView) {
        const serviceTitle = menuItems.find(i => i.id === view)?.title || "Serviço";
        const totalAmount = selectedPackage.includes('Kz') 
            ? selectedPackage 
            : getPackages().find(p => p.l === selectedPackage)?.p || "0 Kz";

        return (
            <PageTransition className="min-h-full flex flex-col bg-[#F8F9FA]">
                {/* HEADER VERDE TEAL */}
                <div className="bg-[#084C54] pt-8 pb-10 px-6 text-white text-left relative rounded-b-[40px]">
                    <button onClick={handleBack} className="flex items-center gap-2 text-white text-sm font-bold mb-6">
                        <ArrowLeft size={18} strokeWidth={2.5} /> Voltar
                    </button>
                    <h1 className="text-3xl font-black mb-1">Confirmar pagamento</h1>
                    <p className="text-white/90 text-base font-medium">Verifique os dados</p>
                </div>

                <div className="flex-1 px-6 pt-8 space-y-6">
                    {/* CARD DETALHES */}
                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
                        <h3 className="text-lg font-black text-slate-800 mb-6 px-1">Detalhes do pagamento</h3>
                        
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-sm py-1">
                                <span className="font-bold text-slate-400">Serviço</span>
                                <span className="font-black text-slate-800">{serviceTitle}</span>
                            </div>
                            
                            {selectedOperator && (
                                <div className="flex justify-between items-center text-sm py-1">
                                    <span className="font-bold text-slate-400">Operadora</span>
                                    <span className="font-black text-slate-800">{selectedOperator}</span>
                                </div>
                            )}

                            <div className="flex justify-between items-center text-sm py-1">
                                <span className="font-bold text-slate-400">Número</span>
                                <span className="font-black text-slate-800">{targetNumber}</span>
                            </div>

                            <div className="pt-4 mt-2 border-t border-slate-50 flex justify-between items-center">
                                <span className="font-bold text-slate-400">Total a pagar</span>
                                <span className="text-2xl font-black text-[#084C54] tracking-tighter">{totalAmount}</span>
                            </div>
                        </div>
                    </div>

                    {/* BANNER INFO */}
                    <div className="bg-[#CCF030]/10 p-4 rounded-2xl flex items-center gap-3 border border-[#CCF030]/20">
                        <div className="bg-[#084C54]/10 p-1.5 rounded-lg text-[#084C54]">
                            <Info size={18} strokeWidth={3} />
                        </div>
                        <p className="text-[13px] font-bold text-slate-600">
                            O pagamento será processado imediatamente
                        </p>
                    </div>
                </div>

                {/* BOTÃO FINAL */}
                <div className="px-6 pb-12">
                    <button 
                        onClick={processFinalPayment}
                        disabled={isLoading}
                        className="w-full h-18 bg-[#084C54] text-white rounded-[32px] font-black text-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center"
                    >
                        {isLoading ? "A processar..." : "Confirmar e pagar"}
                    </button>
                </div>
            </PageTransition>
        );
    }

    return (
        <PageTransition className="min-h-full flex flex-col bg-[#F9FAF8] overflow-hidden">
            
            {/* HEADER DINAMICO */}
            <div className={cn(
                "pt-8 pb-10 px-6 text-white text-left relative transition-colors duration-300 rounded-b-[40px]",
                view === 'menu' && "bg-[#084C54]",
                view === 'recharge' && "bg-[#084C54]",
                view === 'internet' && "bg-[#084C54]",
                view === 'energy' && "bg-[#084C54]",
                view === 'water' && "bg-[#084C54]",
                view === 'tv' && "bg-[#084C54]"
            )}>
                <button 
                    onClick={handleBack}
                    className="flex items-center gap-2 text-white text-sm font-bold mb-6"
                >
                    <ArrowLeft size={18} strokeWidth={2.5} />
                    Voltar
                </button>
                
                <div className="flex items-center gap-4">
                    {view !== 'menu' && (
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
                            {view === 'recharge' && <Smartphone size={32} />}
                            {view === 'internet' && <Wifi size={32} />}
                            {view === 'energy' && <Zap size={32} />}
                            {view === 'water' && <Droplets size={32} />}
                            {view === 'tv' && <Tv size={32} />}
                        </div>
                    )}
                    <div>
                        <h1 className="text-3xl font-black mb-1">
                            {view === 'menu' ? "Pagamentos Especiais" : menuItems.find(i => i.id === view).title}
                        </h1>
                        <p className="text-white/90 text-[13px] font-medium">
                            {view === 'menu' ? "Recargas e serviços essenciais" : (view === 'recharge' || view === 'internet' || view === 'tv' ? "Preencha os dados abaixo" : "Insira os dados do contrato")}
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 px-6 pt-8 flex flex-col overflow-y-auto pb-10">
                
                {/* MENU PRINCIPAL */}
                {view === 'menu' && (
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setView(item.id)}
                                    className="h-44 bg-white border border-slate-100 rounded-[32px] p-6 flex flex-col items-start text-left shadow-sm active:scale-95 transition-all"
                                >
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-auto shadow-sm", item.color, item.iconColor)}>
                                        <item.icon size={28} strokeWidth={2.5} />
                                    </div>
                                    <h3 className="font-black text-slate-800 text-[15px] leading-tight pr-4">{item.title}</h3>
                                </button>
                            ))}
                        </div>
                        
                        <div className="bg-[#CCF030]/10 p-6 rounded-[32px] border border-[#CCF030]/20 mt-4">
                            <p className="text-[14px] font-medium text-slate-700 leading-relaxed">
                                <span className="mr-2"></span>
                                <span className="font-bold text-slate-800">Dica</span> <br/>
                                Todos os pagamentos são processados instantaneamente e você receberá uma confirmação
                            </p>
                        </div>
                    </div>
                )}

                {/* FLOWS ESPECIFICOS */}
                {view !== 'menu' && (
                    <div className="space-y-8">
                        {/* OPERADORA (se aplicável) */}
                        {getOperators().length > 0 && (
                            <div>
                                <p className="text-sm font-bold text-slate-500 mb-4 px-1">Selecione a operadora</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {getOperators().map(op => (
                                        <button 
                                            key={op}
                                            onClick={() => setSelectedOperator(op)}
                                            className={cn(
                                                "h-16 rounded-[24px] border flex items-center justify-center text-base font-black transition-all",
                                                selectedOperator === op ? "border-[#084C54] bg-[#CCF030]/20 text-[#084C54]" : "border-slate-200 text-slate-800"
                                            )}
                                        >
                                            {op}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* INPUT NUMERO */}
                        <div>
                            <p className="text-sm font-bold text-slate-500 mb-4 px-1">
                                {view === 'recharge' || view === 'internet' ? 'Número de telefone' : 'Número da conta'}
                            </p>
                            <input 
                                type="tel"
                                maxLength={view === 'recharge' || view === 'internet' ? 9 : 15}
                                placeholder={view === 'recharge' || view === 'internet' ? "9XXXXXXXX" : "Insira o número da conta"}
                                className="w-full h-16 bg-white border border-slate-200 rounded-[24px] px-6 text-lg font-bold text-slate-800 placeholder:text-slate-300 focus:ring-2 focus:ring-[#084C54]/10 outline-none"
                                value={targetNumber}
                                onChange={(e) => setTargetNumber(e.target.value.replace(/\D/g, ''))}
                            />
                        </div>

                        {/* PACOTES / VALORES */}
                        <div>
                            <p className="text-sm font-bold text-slate-500 mb-4 px-1">
                                {view === 'internet' || view === 'tv' ? 'Selecione o pacote' : 'Selecione o valor'}
                            </p>
                            {typeof getPackages()[0] === 'string' ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {getPackages().map((val, idx) => (
                                        <button 
                                            key={idx} 
                                            onClick={() => setSelectedPackage(val)}
                                            className={cn(
                                                "h-16 rounded-[24px] border flex items-center justify-center text-base font-black transition-all",
                                                selectedPackage === val ? "border-[#084C54] bg-[#CCF030]/20 text-[#084C54]" : "border-slate-200 text-slate-800"
                                            )}
                                        >
                                            {val}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {getPackages().map((pkg, idx) => (
                                        <button 
                                            key={idx} 
                                            onClick={() => setSelectedPackage(pkg.l)}
                                            className={cn(
                                                "w-full h-16 rounded-[24px] border px-6 flex items-center justify-between text-base font-black transition-all",
                                                selectedPackage === pkg.l ? "border-[#084C54] bg-[#CCF030]/20 text-slate-800" : "border-slate-200 text-slate-800"
                                            )}
                                        >
                                            <span>{pkg.l}</span>
                                            <span className="text-[#084C54]">{pkg.p}</span>
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        <button 
                            onClick={handleConfirmAction}
                            disabled={
                                isLoading || 
                                !selectedPackage || 
                                (!selectedOperator && view !== 'energy' && view !== 'water') ||
                                ((view === 'recharge' || view === 'internet') && targetNumber.length < 9) ||
                                ((view === 'energy' || view === 'water' || view === 'tv') && targetNumber.length < 5)
                            }
                            className={cn(
                                "w-full h-18 rounded-[32px] font-black text-lg transition-all shadow-sm flex items-center justify-center translate-y-2",
                                (selectedPackage && (selectedOperator || view === 'energy' || view === 'water') && (
                                    ((view === 'recharge' || view === 'internet') && targetNumber.length >= 9) ||
                                    ((view === 'energy' || view === 'water' || view === 'tv') && targetNumber.length >= 5)
                                ))
                                    ? "bg-[#084C54] text-white shadow-lg shadow-[#084C54]/20" 
                                    : "bg-[#F1F3F5] text-slate-400 cursor-not-allowed"
                            )}
                        >
                            {isLoading ? "A processar..." : "Confirmar Pagamento"}
                        </button>
                    </div>
                )}

            </div>

        </PageTransition>
    );
};

export default Services;
