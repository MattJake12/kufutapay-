import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, BellOff, CheckCircle2, Info, Zap, Package } from 'lucide-react';

import PageTransition from '../components/ui/PageTransition';
import { cn } from '../utils/cn';

const Notifications = () => {
    const navigate = useNavigate();

    const notifications = [
        {
            id: 1,
            title: "Pagamento Recebido",
            desc: "Recebeu 5.200 Kz via QR Code (Multicaixa Express).",
            time: "10 min atrás",
            type: "success",
            icon: CheckCircle2,
            color: "text-emerald-500",
            bg: "bg-emerald-50"
        },
        {
            id: 2,
            title: "Oportunidade Stock+",
            desc: "O seu score atingiu 800! Tem um crédito de 250.000 Kz pré-aprovado.",
            time: "2 horas atrás",
            type: "info",
            icon: Zap,
            color: "text-brand-primary",
            bg: "bg-brand-light"
        },
        {
            id: 3,
            title: "Atualização de Segurança",
            desc: "Versão 2.1.4 instalada. Proteção anti-burla reforçada no painel principal.",
            time: "1 dia atrás",
            type: "system",
            icon: Package,
            color: "text-blue-500",
            bg: "bg-blue-50"
        }
    ];

    return (
        <PageTransition className="pt-6 px-5 pb-32 bg-brand-light">
            
            {/* HEADER */}
            <div className="flex items-center gap-4 mb-8">
                <button 
                    onClick={() => navigate(-1)} 
                    className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-600 active:scale-90 transition-all border border-slate-100"
                >
                    <ArrowLeft size={20} />
                </button>
                <div>
                    <h1 className="text-xl font-black text-slate-800 tracking-tight">Notificações</h1>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Centro de Mensagens</p>
                </div>
            </div>

            {notifications.length > 0 ? (
                <div className="space-y-4">
                    {notifications.map((notif, index) => (
                        <motion.div
                            key={notif.id}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <div className="bg-white rounded-[28px] p-5 shadow-sm border border-slate-100 flex items-start gap-4 active:scale-[0.98] transition-all cursor-pointer">
                                <div className={cn(
                                    "w-11 h-11 rounded-2xl shrink-0 flex items-center justify-center shadow-xs", 
                                    notif.bg, notif.color
                                )}>
                                    <notif.icon size={20} strokeWidth={2.5} />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-black text-sm text-slate-800 uppercase tracking-tight">{notif.title}</h3>
                                        <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{notif.time}</span>
                                    </div>
                                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{notif.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 opacity-20 text-center">
                    <div className="w-20 h-20 rounded-[30px] bg-slate-200 flex items-center justify-center mb-6">
                        <BellOff size={40} className="text-slate-500" />
                    </div>
                    <p className="font-black text-xs uppercase tracking-[0.2em] text-slate-600">Silêncio Absoluto</p>
                </div>
            )}

            {/* CLEAR ALL */}
            {notifications.length > 0 && (
                <div className="mt-8 flex justify-center">
                    <button className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em] hover:text-brand-primary transition-colors py-2 px-4">
                        Limpar tudo
                    </button>
                </div>
            )}

        </PageTransition>
    );
};

export default Notifications;
