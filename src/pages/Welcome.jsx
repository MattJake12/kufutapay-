import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Smartphone, BarChart3, ShieldCheck } from 'lucide-react';

import img1 from '../assets/1.jpg';
import img2 from '../assets/2.jpg';
import img3 from '../assets/3.jpg';

import { useApp } from '../context/AppContext';
import PageTransition from '../components/ui/PageTransition';
import GlassButton from '../components/ui/GlassButton';
import { cn } from '../utils/cn';

// Dados dos Slides (Copywriting exato do cliente)
const ONBOARDING_STEPS = [
  {
    id: 1,
    title: "Receba pagamentos com facilidade",
    description: "Aceite pagamentos por telefone, cartão ou dinheiro móvel. Tudo num só lugar.",
    icon: Smartphone,
    iconColor: "bg-[#084C54]",
    image: img1,
  },
  {
    id: 2,
    title: "Acompanhe suas vendas em tempo real",
    description: "Veja quanto vendeu hoje, esta semana e este mês. Dados claros e simples.",
    icon: BarChart3,
    iconColor: "bg-[#2D8A39]", // Verde do Figma
    image: img2,
  },
  {
    id: 3,
    title: "Seguro e funciona offline",
    description: "Seus dados estão protegidos. Funciona mesmo sem internet e sincroniza depois.",
    icon: ShieldCheck,
    iconColor: "bg-[#1E74D5]", // Azul do Figma
    image: img3,
  }
];

const Welcome = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (user) navigate('/app/home');
  }, [user, navigate]);

  const step = ONBOARDING_STEPS[currentStep];

  const handleNext = () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      if (user) {
        navigate('/login');
      } else {
        navigate('/register');
      }
    }
  };

  const IconComponent = step.icon;

  return (
    <PageTransition className="min-h-full flex flex-col bg-white overflow-hidden">
      
      {/* IMAGEM SUPERIOR (60% DA TELA) */}
      <div className="relative h-[55vh] w-full">
        <AnimatePresence mode="wait">
          <motion.img
            key={step.image}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            src={step.image}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Onboarding"
          />
        </AnimatePresence>
        
        {/* Overlay do Gradiente */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-black/20" />

        {/* Link "Já tenho conta" */}
        <button 
          onClick={() => navigate('/login')}
          className="absolute top-6 right-6 text-white text-sm font-bold drop-shadow-md z-20"
        >
          Já tenho conta
        </button>

        {/* ÍCONE FLUTUANTE CENTRAL */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 z-10">
          <motion.div 
            key={step.id}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={cn(
              "w-20 h-20 rounded-3xl flex items-center justify-center text-white shadow-2xl",
              step.iconColor
            )}
          >
            <IconComponent size={36} strokeWidth={2.5} />
          </motion.div>
        </div>
      </div>

      {/* --- ÁREA DE TEXTO (PARTE INFERIOR) --- */}
      <div className="flex-1 flex flex-col pt-16 px-8 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-4 flex-1"
          >
            <h2 className="text-3xl font-bold text-slate-900 leading-tight">
              {step.title}
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed px-2 font-medium">
              {step.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* INDICADORES (DOTS) */}
        <div className="flex gap-2 mb-8 justify-center">
          {ONBOARDING_STEPS.map((s, idx) => (
            <div 
              key={s.id}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                idx === currentStep ? "w-10 bg-[#084C54]" : "w-1.5 bg-slate-200"
              )}
            />
          ))}
        </div>

        {/* BOTÃO PRINCIPAL */}
        <button 
          onClick={handleNext}
          className="w-full h-16 bg-[#084C54] text-white font-bold rounded-2xl shadow-lg shadow-[#084C54]/20 flex items-center justify-center gap-2 active:scale-95 transition-all text-lg"
        >
          {currentStep === ONBOARDING_STEPS.length - 1 ? 'Começar' : 'Continuar'}
          <ArrowRight size={20} />
        </button>
      </div>
    </PageTransition>
  );
};

export default Welcome;