import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, Store, Smartphone, ArrowLeft, Lock, CheckCircle
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import PageTransition from '../components/ui/PageTransition';
import { cn } from '../utils/cn';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useApp();
    
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        businessName: '',
        phone: '',
        pin: '',
        confirmPin: ''
    });

    const stepsInfo = [
        { title: 'Criar conta', subtitle: 'Informações básicas' },
        { title: 'Verificar telefone', subtitle: 'Confirme o seu número' },
        { title: 'PIN de segurança', subtitle: 'Proteja a sua conta' }
    ];

    const handleChange = (field, value) => {
        // Apenas números para os PINs e Telefone
        if ((field === 'pin' || field === 'confirmPin' || field === 'phone') && value !== '') {
            if (!/^\d+$/.test(value)) return;
        }
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (step < 3) setStep(prev => prev + 1);
    };

    const prevStep = () => {
        if (step > 1) {
            setStep(prev => prev - 1);
        } else {
            navigate('/');
        }
    };

    const handleFinish = async () => {
        if (formData.pin !== formData.confirmPin) {
            alert("Os PINs não coincidem!");
            return;
        }

        setIsLoading(true);
        setTimeout(async () => {
            await register({
                name: formData.name,
                businessName: formData.businessName,
                phone: formData.phone,
                pin: formData.pin
            });
            navigate('/app/home');
        }, 2000);
    };

    return (
        <PageTransition className="min-h-full flex flex-col bg-white overflow-hidden">
            
            {/* HEADER VERDE TEAL */}
            <div className="bg-[#084C54] pt-12 pb-8 px-6 text-white relative rounded-b-[40px]">
                <button 
                  onClick={prevStep}
                  className="flex items-center gap-2 text-white/90 mb-4 font-medium"
                >
                  <ArrowLeft size={20} />
                  <span>Voltar</span>
                </button>
                
                <h1 className="text-3xl font-bold mb-1">{stepsInfo[step-1].title}</h1>
                <p className="text-white/80 font-medium mb-8 text-lg">{stepsInfo[step-1].subtitle}</p>
                
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <motion.div 
                        initial={false}
                        animate={{ width: `${(step / 3) * 100}%` }}
                        className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-all duration-500"
                    />
                </div>
            </div>

            {/* FORM CONTENT */}
            <div className="flex-1 px-6 py-8 flex flex-col">
                <AnimatePresence mode="wait">
                    
                    {/* --- STEP 1: IDENTITY --- */}
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="flex-1 flex flex-col"
                        >
                            <div className="space-y-6 flex-1">
                                <div className="space-y-2">
                                    <label className="text-base font-bold text-slate-800 block">Nome Completo</label>
                                    <div className="relative">
                                        <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input 
                                            placeholder="Ex: João Silva"
                                            className="w-full h-14 bg-[#F8F9FA] border border-slate-200 rounded-xl pl-12 pr-6 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#D9480F]/30"
                                            value={formData.name}
                                            onChange={(e) => handleChange('name', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-base font-bold text-slate-800 block">Nome do Negócio</label>
                                    <div className="relative">
                                        <Store size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input 
                                            placeholder="Ex: Mercearia Central"
                                            className="w-full h-14 bg-[#F8F9FA] border border-slate-200 rounded-xl pl-12 pr-6 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#D9480F]/30"
                                            value={formData.businessName}
                                            onChange={(e) => handleChange('businessName', e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="bg-[#FEF2F2] p-4 rounded-xl flex items-center gap-3">
                                    <span className="text-lg"></span>
                                    <p className="text-sm font-medium text-slate-700">Dica: Use o nome que seus clientes conhecem</p>
                                </div>
                            </div>

                            <div className="mt-auto pt-6">
                                <button 
                                    onClick={nextStep}
                                    disabled={!formData.name || !formData.businessName}
                                    className="w-full h-16 bg-[#084C54] text-white font-bold rounded-2xl shadow-lg shadow-[#084C54]/20 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    Continuar
                                </button>
                                <button 
                                    onClick={() => navigate('/login')}
                                    className="w-full h-14 mt-2 text-sm font-bold text-[#084C54] hover:underline"
                                >
                                    Já tenho conta
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* --- STEP 2: PHONE --- */}
                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="flex-1 flex flex-col"
                        >
                            <div className="space-y-6 flex-1">
                                <div className="space-y-2">
                                    <label className="text-base font-bold text-slate-800 block">Número de Telefone</label>
                                    <div className="relative">
                                        <Smartphone size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input 
                                            placeholder="9XXXXXXXX"
                                            type="tel"
                                            maxLength={9}
                                            autoComplete="username"
                                            className="w-full h-14 bg-[#F8F9FA] border border-slate-200 rounded-xl pl-12 pr-6 text-lg font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#084C54]/30"
                                            value={formData.phone}
                                            onChange={(e) => handleChange('phone', e.target.value)}
                                        />
                                    </div>
                                    <p className="text-sm text-slate-500 font-medium">9 dígitos  Receberá um código SMS</p>
                                </div>

                                <div className="bg-[#FEF2F2] p-4 rounded-xl flex items-start gap-4">
                                    <span className="text-lg"></span>
                                    <p className="text-sm font-medium text-slate-700 leading-tight">
                                        O seu número será usado para acessar a conta e receber notificações importantes
                                    </p>
                                </div>
                            </div>

                            <div className="mt-auto pt-6">
                                <button 
                                    onClick={nextStep}
                                    disabled={formData.phone.length < 9}
                                    className="w-full h-16 bg-[#084C54] text-white font-bold rounded-2xl shadow-lg shadow-[#084C54]/20 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    Continuar
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {/* --- STEP 3: PIN SETUP (RETIRADO TECLADO NA TELA) --- */}
                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="flex-1 flex flex-col"
                        >
                            <div className="space-y-6 flex-1">
                                <div className="space-y-2">
                                    <label className="text-base font-bold text-slate-800 block">Criar PIN</label>
                                    <div className="relative">
                                        <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input 
                                            type="password"
                                            inputMode="numeric"
                                            maxLength={4}
                                            placeholder="****"
                                            autoComplete="new-password"
                                            className="w-full h-14 bg-[#F8F9FA] border border-slate-200 rounded-xl pl-12 pr-6 text-2xl tracking-[1em] text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#D9480F]/30"
                                            value={formData.pin}
                                            onChange={(e) => handleChange('pin', e.target.value)}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500">4 dígitos numéricos</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-base font-bold text-slate-800 block">Confirmar PIN</label>
                                    <div className="relative">
                                        <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                        <input 
                                            type="password"
                                            inputMode="numeric"
                                            maxLength={4}
                                            placeholder="****"
                                            autoComplete="new-password"
                                            className="w-full h-14 bg-[#F8F9FA] border border-slate-200 rounded-xl pl-12 pr-6 text-2xl tracking-[1em] text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#D9480F]/30"
                                            value={formData.confirmPin}
                                            onChange={(e) => handleChange('confirmPin', e.target.value)}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500">Repita o mesmo PIN</p>
                                </div>

                                <div className="bg-[#FEF2F2] p-4 rounded-xl flex items-start gap-4">
                                    <span className="text-lg"></span>
                                    <p className="text-sm font-medium text-slate-700 leading-tight">
                                        <span className="font-bold">Importante:</span> Memorize o seu PIN. Será necessário para acessar a conta
                                    </p>
                                </div>
                            </div>
                            
                            <div className="mt-auto pt-6">
                                <button 
                                    onClick={handleFinish}
                                    disabled={formData.pin.length < 4 || formData.confirmPin.length < 4}
                                    className="w-full h-16 bg-[#084C54] text-white font-bold rounded-2xl shadow-lg shadow-[#084C54]/20 active:scale-95 transition-all disabled:opacity-50"
                                >
                                    Criar conta
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* FINISH SUCCESS OVERLAY */}
            {isLoading && (
                <div className="absolute inset-0 bg-white z-[100] flex flex-col items-center justify-center">
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex flex-col items-center"
                    >
                        <div className="w-24 h-24 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mb-6 shadow-xl shadow-emerald-100">
                             <CheckCircle size={56} strokeWidth={3} className="animate-bounce" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 text-center tracking-tight">Registo Concluído!</h2>
                        <p className="text-xs font-bold text-slate-600 uppercase tracking-widest mt-2">Ativando o seu terminal...</p>
                        
                        <div className="mt-12 w-48 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                             <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1.5 }}
                                className="h-full bg-emerald-500"
                             />
                        </div>
                    </motion.div>
                </div>
            )}

        </PageTransition>
    );
};

export default Register;
