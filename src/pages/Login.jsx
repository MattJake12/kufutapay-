import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Smartphone, MessageSquare, Lock, Eye, EyeOff, ArrowLeft 
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import PageTransition from '../components/ui/PageTransition';
import { cn } from '../utils/cn';

const Login = () => {
    const navigate = useNavigate();
    const { login, user, isLoading } = useApp();
    
    const [step, setStep] = useState(1);
    const [showPin, setShowPin] = useState(false);
    const [error, setError] = useState(false);
    
    const [formData, setFormData] = useState({
        phone: '',
        smsCode: '',
        pin: ''
    });

    useEffect(() => {
        if (user) navigate('/app/home');
    }, [user, navigate]);

    const handleNext = () => {
        if (step < 3) setStep(prev => prev + 1);
        else handleFinalLogin();
    };

    const handleBack = () => {
        if (step > 1) setStep(prev => prev - 1);
        else navigate('/');
    };

    const handleFinalLogin = async () => {
        const success = await login(formData.phone, formData.pin);
        if (success) {
            navigate('/app/home');
        } else {
            setError(true);
            setFormData(prev => ({ ...prev, pin: '' }));
            if (navigator.vibrate) navigator.vibrate(200);
        }
    };

    const handleChange = (field, value) => {
        const cleanValue = value.replace(/\D/g, '');
        setFormData(prev => ({ ...prev, [field]: cleanValue }));
        setError(false);
    };

    return (
        <PageTransition className="min-h-full flex flex-col bg-white overflow-hidden">
            
            {/* HEADER DINÂMICO (FIGMA STYLE) */}
            <div className="bg-[#084C54] pt-8 pb-10 px-6 text-white text-center relative rounded-b-[40px]">
                {step > 1 && (
                    <button 
                        onClick={handleBack}
                        className="absolute left-6 top-8 flex items-center gap-2 text-white/90 text-sm font-bold"
                    >
                        <ArrowLeft size={18} />
                        Voltar
                    </button>
                )}
                
                <div className="flex justify-center mb-6 pt-4">
                    <div className="w-20 h-20 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm">
                        {step === 1 && <Smartphone size={40} className="text-white" strokeWidth={1.5} />}
                        {step === 2 && <MessageSquare size={40} className="text-white" strokeWidth={1.5} />}
                        {step === 3 && <Lock size={40} className="text-white" strokeWidth={1.5} />}
                    </div>
                </div>
                
                <h1 className="text-3xl font-bold mb-1">
                    {step === 1 && "Bem-vindo de volta"}
                    {step === 2 && "Código SMS"}
                    {step === 3 && "PIN de segurança"}
                </h1>
                <p className="text-white/90 text-base font-medium">
                    {step === 1 && "Insira o seu número de telefone"}
                    {step === 2 && `Enviamos um código para ${formData.phone || '923456789'}`}
                    {step === 3 && "Insira o seu PIN para acessar"}
                </p>
            </div>

            {/* PROGRESS INDICATOR (1---2---3) */}
            <div className="flex items-center justify-center gap-4 py-8">
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all",
                    step === 1 ? "bg-[#084C54] text-white" : "bg-[#22863a] text-white"
                )}>
                    1
                </div>
                <div className={cn("h-[2px] w-8", step >= 2 ? "bg-[#22863a]" : "bg-slate-200")} />
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all",
                    step === 2 ? "bg-[#084C54] text-white" : (step > 2 ? "bg-[#22863a] text-white" : "bg-slate-200 text-slate-400")
                )}>
                    2
                </div>
                <div className={cn("h-[2px] w-8", step >= 3 ? "bg-[#22863a]" : "bg-slate-200")} />
                <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all",
                    step === 3 ? "bg-[#084C54] text-white" : "bg-slate-200 text-slate-400")
                }>
                    3
                </div>
            </div>

            {/* FORM CONTENT */}
            <div className="flex-1 px-6 flex flex-col">
                <AnimatePresence mode="wait">
                    
                    {/* STEP 1: PHONE */}
                    {step === 1 && (
                        <motion.div
                            key="login-step1"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="flex-1 flex flex-col"
                        >
                            <label className="text-base font-bold text-slate-800 mb-4 px-1">Número de Telefone</label>
                            <div className="relative mb-2">
                                <Smartphone size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input 
                                    type="tel"
                                    maxLength={9}
                                    placeholder="9XXXXXXXX"
                                    autoComplete="username"
                                    className="w-full h-16 bg-white border border-slate-200 rounded-2xl pl-14 pr-6 text-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-[#D9480F]/30"
                                    value={formData.phone}
                                    onChange={(e) => handleChange('phone', e.target.value)}
                                />
                            </div>
                            <p className="text-sm text-slate-500 font-medium px-1 mb-8">9 dígitos</p>

                            <div className="bg-[#FEF2F2] p-6 rounded-3xl space-y-2">
                                <p className="text-slate-700 font-bold text-sm">Números de demonstração:</p>
                                <ul className="text-slate-600 text-[13px] space-y-1 font-medium">
                                    <li> 923456789 (João - Vendedor)</li>
                                    <li> 945678901 (Maria - Vendedora)</li>
                                    <li> 912345678 (Carlos - Agente)</li>
                                </ul>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 2: SMS CODE */}
                    {step === 2 && (
                        <motion.div
                            key="login-step2"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="flex-1 flex flex-col"
                        >
                            <label className="text-base font-bold text-slate-800 mb-4 px-1">Código SMS</label>
                            <div className="relative mb-2">
                                <MessageSquare size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                                <input 
                                    type="password"
                                    inputMode="numeric"
                                    maxLength={4}
                                    placeholder="0000"
                                    autoComplete="one-time-code"
                                    className="w-full h-16 bg-white border-2 border-[#D9480F]/40 rounded-3xl pl-14 pr-6 text-2xl tracking-[1em] text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#D9480F]"
                                    value={formData.smsCode}
                                    onChange={(e) => handleChange('smsCode', e.target.value)}
                                />
                            </div>
                            <p className="text-sm text-slate-500 font-medium px-1 mb-8">4 dígitos</p>

                            <div className="bg-[#FEF2F2] p-6 rounded-3xl space-y-1">
                                <p className="text-slate-700 font-bold text-sm">Código demo: <span className="font-medium">1234</span></p>
                                <button className="text-[#084C54] text-sm font-bold">Reenviar código</button>
                            </div>
                        </motion.div>
                    )}

                    {/* STEP 3: PIN ENTRY */}
                    {step === 3 && (
                        <motion.div
                            key="login-step3"
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            className="flex-1 flex flex-col"
                        >
                            <label className="text-base font-bold text-slate-800 mb-4 px-1">PIN de Segurança</label>
                            <div className="relative mb-2">
                                <Lock size={22} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                    type={showPin ? "text" : "password"}
                                    inputMode="numeric"
                                    maxLength={4}
                                    placeholder="0000"
                                    autoComplete="new-password"
                                    className={cn(
                                        "w-full h-16 bg-white border border-slate-200 rounded-3xl pl-14 pr-14 text-2xl tracking-[1em] text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#D9480F]/30",
                                        error && "border-red-500 ring-1 ring-red-500 animate-shake"
                                    )}
                                    value={formData.pin}
                                    onChange={(e) => handleChange('pin', e.target.value)}
                                />
                                <button 
                                    type="button"
                                    onClick={() => setShowPin(!showPin)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 p-2"
                                >
                                    {showPin ? <EyeOff size={22} /> : <Eye size={22} />}
                                </button>
                            </div>
                            <p className="text-sm text-slate-500 font-medium px-1 mb-8">4 dígitos</p>

                            <div className="bg-[#FEF2F2] p-6 rounded-3xl space-y-1">
                                <p className="text-slate-700 font-bold text-sm">PIN demo: <span className="font-medium">1234</span></p>
                                <button className="text-[#084C54] text-sm font-bold">Esqueci o meu PIN</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* BOTÃO CONTINUAR / ENTRAR */}
                <div className="mt-auto py-8">
                    <button 
                        onClick={handleNext}
                        disabled={
                            (step === 1 && formData.phone.length < 9) ||
                            (step === 2 && formData.smsCode.length < 4) ||
                            (step === 3 && formData.pin.length < 4) ||
                            isLoading
                        }
                        className={cn(
                            "w-full h-18 rounded-3xl font-bold text-lg transition-all active:scale-95 shadow-lg",
                            ((step === 1 && formData.phone.length < 9) || (step === 2 && formData.smsCode.length < 4) || (step === 3 && formData.pin.length < 4))
                                ? "bg-[#F1F3F5] text-slate-400 shadow-none"
                                : "bg-[#084C54] text-white shadow-[#084C54]/20"
                        )}
                    >
                        {isLoading ? "A carregar..." : (step === 3 ? "Entrar" : "Continuar")}
                    </button>
                    
                    {step === 1 && (
                        <div className="mt-6 text-center">
                            <p className="text-slate-600 font-bold text-base">
                                Não tem conta? <button onClick={() => navigate('/register')} className="text-[#084C54]">Registar-se</button>
                            </p>
                        </div>
                    )}
                </div>
            </div>

        </PageTransition>
    );
};

export default Login;
