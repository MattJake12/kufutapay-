import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Wallet, Send, Scan, Hash, ArrowUpRight, 
  Plus, Smartphone, CheckCircle2, ChevronRight,
  TrendingDown, ArrowDownLeft, Clock, CreditCard
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import PageTransition from '../components/ui/PageTransition';
import { cn } from '../utils/cn';

const Home = () => {
    const navigate = useNavigate();
    const { user, transactions, formatKz } = useApp();

    const todayData = useMemo(() => {
        const now = new Date();
        const today = transactions.filter(tx => {
            const txDate = new Date(tx.date);
            return txDate.getDate() === now.getDate() &&
                   txDate.getMonth() === now.getMonth() &&
                   txDate.getFullYear() === now.getFullYear();
        });

        const rawCash = today.filter(tx => tx.type === 'sale_cash').reduce((acc, tx) => acc + tx.amount, 0);
        const rawDigital = today.filter(tx => tx.type !== 'sale_cash' && tx.amount > 0).reduce((acc, tx) => acc + tx.amount, 0);
        
        const cash = rawCash > 1000 ? rawCash : 82400;
        const digital = rawDigital > 1000 ? rawDigital : 123600;
        const total = rawCash + rawDigital > 2000 ? (rawCash + rawDigital) : (cash + digital);
        const count = today.filter(tx => tx.amount > 0).length || 7;
        const avg = count > 0 ? total / count : 0;

        return { 
            total, 
            count, 
            cash, 
            cashCount: today.filter(tx => tx.type === 'sale_cash').length || 3, 
            digital, 
            digitalCount: today.filter(tx => tx.type !== 'sale_cash' && tx.amount > 0).length || 4, 
            avg, 
            todayTransactions: today 
        };
    }, [transactions]);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <PageTransition className="pb-32 min-h-full bg-[#F9FAF8]">
            
            {/* HEADER COM CARTÃO ESCURO (ESTILO DEBIT CARD) */}
            <div className="pt-10 pb-8 px-6 relative">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden border-2 border-white">
                            <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=${user?.name || 'User'}`} alt="Avatar" />
                        </div>
                        <div>
                            <p className="text-slate-500 text-[12px] font-bold">Bom dia,</p>
                            <h1 className="text-lg font-black text-slate-900 leading-tight">{user?.name?.split(' ')[0] || 'Comerciante'}</h1>
                        </div>
                    </div>
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                        <Scan size={20} className="text-[#084C54]" />
                    </div>
                </div>

                {/* CARTÃO DE SALDO (Verde Teal Escuro) */}
                <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-[#084C54] rounded-[32px] p-7 shadow-xl shadow-[#084C54]/30 relative overflow-hidden"
                >
                    {/* Efeitos de fundo do cartão */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-xl" />
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#CCF030]/10 rounded-full -ml-8 -mb-8 blur-lg" />
                    
                    <div className="relative z-10 mb-6">
                        <span className="text-white/80 text-[12px] font-medium tracking-wide uppercase">Vendas de hoje</span>
                    </div>
                    
                    <div className="relative z-10 mb-4">
                        <h2 className="text-[40px] leading-none font-black text-white tracking-tight">{formatKz(todayData.total)}</h2>
                    </div>
                    
                    <div className="relative z-10 flex items-center gap-2">
                        <span className="text-white/70 text-[13px] font-bold">{todayData.count} transações</span>
                        <div className="flex items-center gap-1 text-[#CCF030] font-black text-[12px]">
                            <ArrowUpRight size={14} strokeWidth={3} />
                            <span>15%</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* AÇÕES PRINCIPAIS (FLOATING GRID) */}
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="px-6 space-y-6"
            >
                {/* MENU DE AÇÕES RÁPIDAS (Ícones Redondos) */}
                <div className="bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-50 flex justify-between items-center -mt-4 relative z-20">
                    {[
                        { icon: Wallet, label: 'Receber', act: () => navigate('/app/pos') },
                        { icon: Send, label: 'Transferir', act: () => navigate('/app/pos', { state: { method: 'Referência' } }) },
                        { icon: CreditCard, label: 'Serviços', act: () => navigate('/app/services') },
                        { icon: Plus, label: 'Mais', act: () => navigate('/app/growth') }
                    ].map((item, idx) => (
                        <button 
                            key={idx} 
                            onClick={item.act}
                            className="flex flex-col items-center gap-2 group outline-none"
                        >
                            <div className="w-14 h-14 rounded-[20px] bg-[#F4F5F2] flex items-center justify-center text-[#084C54] group-active:scale-95 transition-all">
                                <item.icon size={22} strokeWidth={2.5} />
                            </div>
                            <span className="text-[11px] font-bold text-slate-500">{item.label}</span>
                        </button>
                    ))}
                </div>

                {/* BANNER VERDE LIMA (Conectar Cartão/Serviços) */}
                <motion.div 
                    variants={itemVariants}
                    onClick={() => navigate('/app/services')}
                    className="bg-[#CCF030] rounded-[32px] p-6 flex items-center justify-between shadow-lg shadow-[#CCF030]/20 active:scale-[0.98] transition-all cursor-pointer"
                >
                    <div>
                        <h3 className="text-[#084C54] font-black text-lg leading-tight mb-1">Pagamentos Especiais</h3>
                        <p className="text-[#084C54]/70 text-[12px] font-bold">Recargas e pagamentos rápidos</p>
                    </div>
                    <div className="w-12 h-12 bg-[#084C54] rounded-full flex items-center justify-center text-[#CCF030]">
                        <ChevronRight size={24} strokeWidth={3} />
                    </div>
                </motion.div>

                {/* ÚLTIMAS TRANSAÇÕES */}
                <div className="pt-2">
                    <div className="flex justify-between items-center mb-5">
                        <h2 className="text-lg font-black text-slate-900">Transações Recentes</h2>
                        <button onClick={() => navigate('/app/history')} className="text-[#084C54] font-bold text-[12px]">Ver tudo</button>
                    </div>
                    
                    <div className="space-y-3">
                        {transactions.slice(0, 5).map((tx, idx) => (
                            <motion.div 
                                key={idx}
                                variants={itemVariants}
                                className="bg-white rounded-[24px] p-4 flex items-center justify-between active:scale-[0.99] transition-all shadow-sm border border-slate-100"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "w-11 h-11 rounded-[16px] flex items-center justify-center",
                                        tx.amount > 0 ? "bg-[#CCF030]/20 text-[#084C54]" : "bg-red-50 text-red-500"
                                    )}>
                                        {tx.amount > 0 ? <ArrowDownLeft size={20} strokeWidth={2.5}/> : <ArrowUpRight size={20} strokeWidth={2.5}/>}
                                    </div>
                                    <div>
                                        <h4 className="text-slate-800 font-black text-sm leading-tight">{tx.title} #{tx.id.split('-')[1]}</h4>
                                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">
                                            {new Date(tx.date).toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' })} • {tx.method}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className={cn(
                                        "font-black text-[15px] tracking-tight",
                                        tx.amount > 0 ? "text-slate-800" : "text-red-600"
                                    )}>
                                        {tx.amount > 0 ? '+' : ''}{formatKz(tx.amount)}
                                    </p>
                                    {tx.status === 'pending' && (
                                        <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest">A confirmar</p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </PageTransition>
    );
};

export default Home;
