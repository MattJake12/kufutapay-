import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, Award, Target, ArrowLeft, CheckCircle2, 
  Lightbulb, ChevronRight, Info, Clock, BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageTransition from '../components/ui/PageTransition';
import { cn } from '../utils/cn';

const Growth = () => {
    const navigate = useNavigate();
    const [poupanca, setPoupanca] = useState('50000');

    // Cálculos dinâmicos
    const calculations = useMemo(() => {
        const value = parseFloat(poupanca) || 0;
        return {
            metaDiaria: Math.round(value / 7).toLocaleString('pt-AO'),
            impactoMensal: Math.round(value * 4.3).toLocaleString('pt-AO')
        };
    }, [poupanca]);
    
    return (
        <PageTransition className="min-h-full bg-white pb-32">
            
             {/* HEADER */}
             <div className="bg-[#084C54] pt-12 pb-14 px-6 relative text-white rounded-b-[40px] shadow-lg">
                <button onClick={() => navigate('/app/home')} className="flex items-center gap-2 text-white/90 text-[12px] font-black mb-8 tracking-wide">
                    <ArrowLeft size={16} strokeWidth={3} /> VOLTAR
                </button>
                <h1 className="text-3xl font-black mb-1 tracking-tighter">Crescer</h1>
                <p className="text-white/80 text-[13px] font-bold">Simule seu progresso e veja oportunidades</p>
            </div>

            <div className="px-6 -mt-8 space-y-8 relative z-10">
                
                {/* ACESSO A STOCK CRÉDITO */}
                <div className="bg-white rounded-[32px] p-7 shadow-xl shadow-slate-200/50 border border-slate-100">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-[17px] font-black text-slate-800 tracking-tight">Acesso a Stock Crédito</h3>
                        <span className="text-[18px] font-black text-[#084C54]">75%</span>
                    </div>
                    
                    <div className="h-2.5 w-full bg-slate-50 rounded-full overflow-hidden mb-8">
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '75%' }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-[#CCF030] rounded-full"
                        />
                    </div>

                    <div className="space-y-6 mb-8">
                        {[
                            { title: "Vendas consistentes", desc: "30+ dias de vendas", done: true },
                            { title: "Valor mínimo mensal", desc: "Atingiu 500.000 Kz", done: true },
                            { title: "Sincronização regular", desc: "Dados atualizados", done: true },
                            { title: "Histórico completo", desc: "Faltam 15 dias", done: false },
                        ].map((item, i) => (
                            <div key={i} className="flex gap-4">
                                <div className={cn(
                                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5",
                                    item.done ? "bg-emerald-100 text-emerald-600" : "bg-slate-50 text-slate-200"
                                )}>
                                    <CheckCircle2 size={16} strokeWidth={3} />
                                </div>
                                <div>
                                    <p className={cn("text-[14.5px] font-black mb-0.5", item.done ? "text-slate-800" : "text-slate-400")}>
                                        {item.title}
                                    </p>
                                    <p className="text-[11px] font-bold text-slate-400 tracking-tight">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-4 bg-[#084C54] text-white rounded-2xl font-black text-[15px] shadow-lg shadow-[#084C54]/10 active:scale-[0.98] transition-all">
                        Ver detalhes
                    </button>
                </div>

                {/* SIMULAR META DE POUPANÇA */}
                <div className="space-y-4">
                    <h3 className="text-[17px] font-black text-slate-800 tracking-tight pl-1">Simular meta de poupança</h3>
                    <div className="bg-white rounded-[32px] p-7 shadow-sm border border-slate-100">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Quanto quer poupar?</p>
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-baseline gap-1">
                                <input 
                                    type="tel"
                                    value={poupanca}
                                    onChange={(e) => setPoupanca(e.target.value.replace(/\D/g, ''))}
                                    className="text-4xl font-black text-slate-800 bg-transparent w-full outline-none"
                                />
                                <span className="text-xl font-black text-slate-400">Kz</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {['25k', '50k', '100k'].map((val) => (
                                <button 
                                    key={val}
                                    onClick={() => setPoupanca(val === '25k' ? '25000' : val === '50k' ? '50000' : '100000')}
                                    className={cn(
                                        "py-3 rounded-xl text-[13px] font-black transition-all border",
                                        (poupanca === '25000' && val === '25k') || (poupanca === '50000' && val === '50k') || (poupanca === '100000' && val === '100k')
                                            ? "bg-[#084C54] border-[#084C54] text-white shadow-md shadow-[#084C54]/10"
                                            : "bg-slate-50 border-slate-100 text-slate-500"
                                    )}
                                >
                                    {val}
                                </button>
                            ))}
                        </div>

                        {/* PROJEÇÃO DINÂMICA */}
                        <div className="bg-[#FFF1F0] rounded-[24px] p-6 border border-orange-100/50">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#084C54] shadow-sm">
                                    <BarChart3 size={16} />
                                </div>
                                <p className="text-[13.5px] font-black text-slate-800 tracking-tight">Projeção baseada nas suas vendas</p>
                            </div>

                            <div className="grid grid-cols-2 gap-8 mb-6 border-b border-orange-200/30 pb-6">
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 leading-none">Tempo estimado</p>
                                    <p className="text-[19px] font-black text-slate-800 leading-none">1 sem</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 leading-none">Meta diária</p>
                                    <p className="text-[19px] font-black text-slate-800 leading-none">{calculations.metaDiaria} Kz</p>
                                </div>
                            </div>

                            <div className="pt-1">
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Impacto mensal</p>
                                <p className="text-[19px] font-black text-emerald-600">+{calculations.impactoMensal} Kz/mês</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* INSIGHTS */}
                <div className="space-y-4">
                    <h3 className="text-[17px] font-black text-slate-800 tracking-tight pl-1">Insights do seu negócio</h3>
                    
                    <div className="bg-white rounded-[28px] p-5 border border-slate-100 flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                            <TrendingUp size={24} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-[15px] font-black text-slate-800 mb-0.5">Vendas em crescimento</h4>
                            <p className="text-[11.5px] font-bold text-slate-400 leading-tight">Suas vendas cresceram 12% esta semana vs anterior</p>
                            <p className="text-[14px] font-black text-emerald-600 mt-1">+12%</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[28px] p-5 border border-slate-100 flex items-center gap-4 shadow-sm">
                        <div className="w-12 h-12 rounded-full bg-[#CCF030]/20 text-[#084C54] flex items-center justify-center shrink-0">
                            <Clock size={24} />
                        </div>
                        <div className="flex-1">
                            <h4 className="text-[15px] font-black text-slate-800 mb-0.5">Melhor horário</h4>
                            <p className="text-[11.5px] font-bold text-slate-400 leading-tight">Suas vendas são maiores entre 14h-18h</p>
                            <p className="text-[14px] font-black text-[#084C54] mt-1">14h-16h</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-[28px] p-6 border border-slate-100 shadow-sm space-y-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Target size={22} className="text-[#084C54]" />
                                <h4 className="text-[16px] font-black text-slate-800">Meta da semana</h4>
                            </div>
                            <ChevronRight size={18} className="text-slate-300" />
                        </div>
                        <div className="flex justify-between items-end">
                            <p className="text-[12px] font-bold text-slate-400 tracking-tight">150.000 Kz</p>
                            <p className="text-[15px] font-black text-slate-800 tracking-tighter">142.600 Kz</p>
                        </div>
                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500 w-[95%]" />
                        </div>
                        <p className="text-[11px] font-bold text-slate-400">Faltam 7.400 Kz para atingir sua meta</p>
                    </div>

                    {/* DICA FINAL */}
                    <div className="bg-[#FFF1F0] rounded-[24px] p-6 border border-orange-100/50 flex gap-4">
                        <Lightbulb size={24} className="text-[#084C54] shrink-0" />
                        <div>
                            <h4 className="text-[14px] font-black text-[#084C54] uppercase tracking-widest mb-2">Dica</h4>
                            <p className="text-[13px] font-bold text-slate-600 leading-relaxed">
                                Baseado no seu histórico, você pode atingir sua meta de poupança mais rápido aumentando suas vendas nos horários de pico.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </PageTransition>
    );
};

export default Growth;
