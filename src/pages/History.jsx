import React, { useState, useMemo, useRef } from 'react';
import { Search, ArrowLeft, ArrowUpRight, ArrowDownLeft, Clock, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { useApp } from '../context/AppContext';
import PageTransition from '../components/ui/PageTransition';
import { cn } from '../utils/cn';

const History = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [activePeriod, setActivePeriod] = useState('Tudo');
    const [activeType, setActiveType] = useState('Todas');
    
    const periods = ['Hoje', 'Semana', 'Mês', 'Tudo'];
    const types = ['Todas', 'Vendas', 'Recargas', 'Internet', 'Energia', 'Água', 'TV'];

    // Lógica de Arrastar para Scroll Horizontal (Mouse)
    const scrollRefType = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - scrollRefType.current.offsetLeft);
        setScrollLeft(scrollRefType.current.scrollLeft);
    };

    const handleMouseLeave = () => setIsDragging(false);
    const handleMouseUp = () => setIsDragging(false);
    const handleMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - scrollRefType.current.offsetLeft;
        const walk = (x - startX) * 2;
        scrollRefType.current.scrollLeft = scrollLeft - walk;
    };

    const { formatKz } = useApp();

    const mockTransactions = [
        { id: 1, title: 'Água (EPAL) - 92428051', time: '12/01, 01:00', amount: -10000, type: 'Água', status: 'completed' },
        { id: 2, title: 'TV (Zap) - 4552190', time: '12/01, 00:59', amount: -12500, type: 'TV', status: 'completed' },
        { id: 3, title: 'Energia (ENDE) - 4421092', time: '12/01, 00:58', amount: -5000, type: 'Energia', status: 'completed' },
        { id: 4, title: 'Internet (Movicel) - 912000', time: '12/01, 00:58', amount: -2500, type: 'Internet', status: 'completed' },
        { id: 5, title: 'Venda #436627', time: '12/01, 00:58', amount: 10000, type: 'Vendas', status: 'completed' },
        { id: 6, title: 'Venda #326766', time: '12/01, 00:58', amount: 10000, type: 'Vendas', status: 'completed' },
        { id: 7, title: 'Venda #271695', time: '12/01, 00:58', amount: 10000, type: 'Vendas', status: 'completed' },
        { id: 8, title: 'Venda #337455', time: '12/01, 00:33', amount: 10000, type: 'Vendas', status: 'completed' },
        { id: 9, title: 'Venda #144259', time: '12/01, 00:32', amount: 10000, type: 'Vendas', status: 'completed' },
        { id: 10, title: 'Venda #532936', time: '12/01, 00:32', amount: 10000, type: 'Vendas', status: 'completed' },
        { id: 11, title: 'Venda #601171', time: '12/01, 00:32', amount: 10000, type: 'Vendas', status: 'completed' },
        { id: 12, title: 'Venda #551326', time: '12/01, 00:31', amount: 10000, type: 'Vendas', status: 'completed' },
        { id: 13, title: 'Venda #479373', time: '12/01, 00:31', amount: 10000, type: 'Vendas', status: 'completed' },
        { id: 14, title: 'Venda #181065', time: '12/01, 00:30', amount: 10000, type: 'Vendas', status: 'completed' },
        { id: 15, title: 'Recarga Unitel - 923456789', time: '11/01, 11:20', amount: -1000, type: 'Recargas', status: 'completed' },
    ];

    const filteredTransactions = useMemo(() => {
        return mockTransactions.filter(tx => {
            const matchesSearch = tx.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = activeType === 'Todas' || tx.type === activeType;
            return matchesSearch && matchesType;
        });
    }, [searchTerm, activeType]);

    const totalAmount = useMemo(() => {
        return filteredTransactions.reduce((acc, tx) => acc + tx.amount, 0);
    }, [filteredTransactions]);

    return (
        <PageTransition className="min-h-full flex flex-col bg-[#F9FAF8] overflow-hidden">
            
            {/* HEADER METADE SUPERIOR (VERDE LIMA) */}
            <div className="bg-[#CCF030] pt-12 pb-24 px-6 text-[#084C54] rounded-b-[48px] relative z-0">
                <div className="flex justify-between items-center mb-8">
                    <button 
                        onClick={() => navigate('/app/home')}
                        className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center text-[#084C54]"
                    >
                        <ArrowLeft size={20} strokeWidth={3} />
                    </button>
                    <h1 className="text-[17px] font-black tracking-tight">Transações</h1>
                    <button className="w-10 h-10 bg-white/40 rounded-full flex items-center justify-center text-[#084C54]">
                        <Search size={20} strokeWidth={3} />
                    </button>
                </div>

                {/* Resumo do Período */}
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-[#084C54]/60 text-[12px] font-bold mb-1">Rendimento (Mensal)</p>
                        <h2 className="text-[40px] leading-none font-black tracking-tighter">{formatKz(Math.abs(totalAmount))}</h2>
                    </div>
                    <div className="bg-white/40 px-4 py-2 rounded-full">
                        <span className="text-[12px] font-black text-[#084C54]">{filteredTransactions.length} transações</span>
                    </div>
                </div>

                {/* Mini Gráfico Visual (Estético) */}
                <div className="flex items-end justify-between gap-2 mt-8 h-16 opacity-80">
                    {[40, 20, 60, 30, 80, 50, 90].map((h, i) => (
                        <div 
                            key={i} 
                            className="w-full bg-[#084C54] rounded-t-md transition-all" 
                            style={{ height: `${h}%` }} 
                        />
                    ))}
                </div>
            </div>

            {/* ÁREA BRANCA SOBREPOSTA */}
            <div className="flex-1 px-6 -mt-10 relative z-10 overflow-y-auto no-scrollbar pb-32">
                
                {/* FILTROS SECTION */}
                <div className="pt-6 pb-4 space-y-6">
                    {/* Período */}
                    <div className="space-y-2.5">
                        <div className="flex justify-between items-center">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Período</h3>
                        </div>
                        <div 
                            className="flex overflow-x-auto gap-2 scroll-smooth touch-pan-x list-none no-scrollbar"
                            style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                            {periods.map(p => (
                                <button
                                    key={p}
                                    onClick={() => setActivePeriod(p)}
                                    className={cn(
                                        "px-5 py-2.5 rounded-xl text-[12px] font-black transition-all flex-shrink-0 border whitespace-nowrap",
                                        activePeriod === p 
                                            ? "bg-[#084C54] border-[#084C54] text-white shadow-md shadow-[#084C54]/10" 
                                            : "bg-white border-slate-100 text-slate-500 hover:bg-slate-50"
                                    )}
                                >
                                    {p}
                                </button>
                            ))}
                            <div className="flex-shrink-0 w-6" />
                        </div>
                    </div>

                    {/* Tipo */}
                    <div className="space-y-2.5">
                        <div className="flex justify-between items-center">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Tipo</h3>
                        </div>
                        <div 
                            ref={scrollRefType}
                            onMouseDown={handleMouseDown}
                            onMouseLeave={handleMouseLeave}
                            onMouseUp={handleMouseUp}
                            onMouseMove={handleMouseMove}
                            className={cn(
                                "flex overflow-x-auto gap-2 scroll-smooth touch-pan-x list-none no-scrollbar select-none",
                                isDragging ? "cursor-grabbing" : "cursor-grab"
                            )}
                            style={{ WebkitOverflowScrolling: 'touch' }}
                        >
                            {types.map(t => (
                                <button
                                    key={t}
                                    onClick={() => !isDragging && setActiveType(t)}
                                    className={cn(
                                        "px-5 py-2.5 rounded-xl text-[12px] font-black transition-all flex-shrink-0 border whitespace-nowrap shadow-sm pointer-events-auto",
                                        activeType === t 
                                            ? "bg-[#084C54] border-[#084C54] text-white shadow-md shadow-[#084C54]/10" 
                                            : "bg-white border-slate-100 text-slate-500 hover:bg-slate-50"
                                    )}
                                >
                                    {t}
                                </button>
                            ))}
                            <div className="flex-shrink-0 w-10" />
                        </div>
                    </div>

                    {/* SUMMARY CARD */}
                    <div className="pt-2">
                        <div className="bg-white rounded-[32px] p-7 border border-slate-100 flex justify-between items-center shadow-sm">
                            <div>
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1.5 opacity-80">Total</p>
                                <h2 className="text-[26px] font-black text-slate-800 tracking-tighter leading-none">{formatKz(Math.abs(totalAmount))}</h2>
                            </div>
                            <div className="text-right">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.25em] mb-1.5 opacity-80">Transações</p>
                                <h2 className="text-[26px] font-black text-slate-800 tracking-tighter leading-none">{filteredTransactions.length}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                {/* TRANSACTIONS LIST */}
                <div className="space-y-1.5 mt-2">
                    {filteredTransactions.map((tx) => {
                        const isPositive = tx.amount > 0;
                        const isPending = tx.status === 'A confirmar';
                        return (
                            <motion.div
                                key={tx.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-white rounded-[24px] p-4.5 flex items-center justify-between border border-slate-100 hover:border-slate-200 transition-all shadow-sm"
                            >
                                <div className="flex items-center gap-3.5">
                                    <div className={cn(
                                        "w-11 h-11 rounded-full flex items-center justify-center",
                                        isPositive ? "bg-[#CCF030]/20 text-[#084C54] border border-[#CCF030]/30" : "bg-red-50 text-red-500 border border-red-100/50"
                                    )}>
                                        {isPositive ? <ArrowDownLeft size={20} strokeWidth={3} /> : <ArrowUpRight size={20} strokeWidth={3} />}
                                    </div>
                                    <div className="space-y-0.5">
                                        <h4 className="text-[14.5px] font-black text-slate-800 tracking-tight leading-none text-left">{tx.title}</h4>
                                        <div className="flex items-center gap-2">
                                            <p className="text-[11px] font-bold text-slate-400 font-primary">{tx.time}</p>
                                            {isPending && (
                                                <span className="flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 rounded-full text-[9px] font-black uppercase tracking-wider border border-amber-100">
                                                    <Clock size={10} />
                                                    A confirmar
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-[16px] font-black text-slate-800 tracking-tighter font-primary">
                                        {isPositive ? '+' : '-'}{Math.abs(tx.amount).toLocaleString('pt-AO')} Kz
                                    </p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

        </PageTransition>
    );
};

export default History;
