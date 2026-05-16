import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home as HomeIcon, LineChart, TrendingUp, User } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const BottomDock = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const navItems = [
        { to: '/app/home', icon: HomeIcon, label: 'Início' },
        { to: '/app/history', icon: LineChart, label: 'Movimentos' },
        { to: '/app/growth', icon: TrendingUp, label: 'Crescer' },
        { to: '/app/settings', icon: User, label: 'Perfil' },
    ];

    return (
        <div className="w-full bg-white border-t border-slate-100 flex justify-around items-center h-[75px] pb-2 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] rounded-t-[32px] relative z-50">
            {navItems.map((item) => {
                const isActive = currentPath === item.to || (item.to === '/app/home' && currentPath === '/app');
                const Icon = item.icon;

                return (
                    <NavLink 
                        key={item.to} 
                        to={item.to}
                        className="flex flex-col items-center gap-1.5 py-1 outline-none w-16"
                    >
                        <div className="relative">
                            {/* Bolha Verde Lima indicando ativo */}
                            {isActive && (
                                <motion.div 
                                    layoutId="activeNav"
                                    className="absolute -inset-3 bg-[#CCF030]/20 rounded-full z-0"
                                />
                            )}
                            <Icon 
                                size={24} 
                                strokeWidth={isActive ? 3 : 2.5}
                                className={cn(
                                    "relative z-10 transition-colors duration-300",
                                    isActive ? "text-[#084C54]" : "text-slate-400"
                                )}
                            />
                        </div>
                        <span className={cn(
                            "text-[10px] font-bold transition-colors duration-200",
                            isActive ? "text-[#084C54]" : "text-slate-400"
                        )}>
                            {item.label}
                        </span>
                    </NavLink>
                );
            })}
        </div>
    );
};

export default BottomDock;
