import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  User, Store, Lock, Bell, HelpCircle, 
  LogOut, ChevronRight, Smartphone, ArrowLeft,
  Package, LayoutDashboard, Info, RefreshCcw, 
  ShieldCheck, SmartphoneIcon, AlertCircle, ShoppingBag, MapPin
} from 'lucide-react';

import { useApp } from '../context/AppContext';
import PageTransition from '../components/ui/PageTransition';
import { cn } from '../utils/cn';

const Settings = () => {
    const navigate = useNavigate();
    const { user, logout } = useApp();

    const SectionHeader = ({ children }) => (
        <h2 className="text-[13px] font-bold text-slate-400 mb-3 px-1">{children}</h2>
    );

    const MenuItem = ({ icon: Icon, label, value, subtext, showDropdown = true }) => (
        <button className="w-full flex items-center justify-between p-4 bg-white border-b border-slate-50 last:border-0 first:rounded-t-[20px] last:rounded-b-[20px] active:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
                <div className="w-6 h-6 flex items-center justify-center text-slate-400">
                    <Icon size={18} />
                </div>
                <div className="text-left">
                    <p className="text-[14.5px] font-bold text-slate-800">{label}</p>
                    {subtext && <p className="text-[11px] font-medium text-slate-400">{subtext}</p>}
                </div>
            </div>
            <div className="flex items-center gap-2">
                {value && (
                    <div className={cn(
                        "flex items-center gap-1.5 px-2 py-0.5 rounded-full",
                        value === 'Sincronizado' ? "bg-emerald-50" : "bg-slate-50"
                    )}>
                        {value === 'Sincronizado' && <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                        <span className={cn(
                            "text-[11px] font-bold",
                            value === 'Sincronizado' ? "text-emerald-600" : "text-slate-500"
                        )}>{value}</span>
                    </div>
                )}
                {showDropdown && <ChevronRight size={16} className="text-slate-300" />}
            </div>
        </button>
    );

    return (
        <PageTransition className="min-h-full bg-[#F9FAF8] pb-10">
            
            {/* COMPONENT: HEADER VERDE TEAL */}
            <div className="bg-[#084C54] pt-8 pb-10 px-6 rounded-b-[40px] shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-xl font-black text-white mb-6">Perfil</h1>
                    
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                            <ShoppingBag className="text-white" size={28} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h2 className="text-[19px] font-black text-white leading-tight">{user?.name || 'Comerciante'}</h2>
                            <div className="flex items-center gap-1.5 text-white/80">
                                <span className="text-[12px] font-bold text-white/90">{user?.businessName || 'Luanda'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/10 rounded-full text-white mb-2">
                        <Store size={16} strokeWidth={2.5} />
                        <span className="text-[13px] font-bold">{user?.tier || 'Vendedor'}</span>
                    </div>
                </div>
            </div>

            <div className="px-5 mt-6 space-y-7">
                
                {/* ESPECIFICO DO PERFIL */}
                <div>
                    <SectionHeader>Específico do perfil</SectionHeader>
                    <div className="shadow-sm rounded-[20px] overflow-hidden border border-slate-100">
                        <MenuItem icon={ShoppingBag} label="Minha loja" subtext="Gerir informações da loja" />
                        <MenuItem icon={Package} label="Stock" subtext="Controlo de inventário" />
                    </div>
                </div>

                {/* ESTADO DO SISTEMA CARD */}
                <div>
                    <SectionHeader>Sistema</SectionHeader>
                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-[16px] font-black text-slate-800">Estado do sistema</h3>
                            <div className="px-2.5 py-1 bg-emerald-50 rounded-full flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                                <span className="text-[10px] font-black text-emerald-600 uppercase">Sincronizado</span>
                            </div>
                        </div>

                        <div className="space-y-4 mb-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-emerald-500">
                                    <ShieldCheck size={18} />
                                    <span className="text-[13px] font-bold text-slate-500">Última sincronização</span>
                                </div>
                                <span className="text-[12px] font-black text-slate-400">12/01, 01:14</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-orange-400">
                                    <RefreshCcw size={18} />
                                    <span className="text-[13px] font-bold text-slate-500">Transações offline</span>
                                </div>
                                <span className="text-[12px] font-black text-slate-400">1</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 text-slate-400">
                                    <SmartphoneIcon size={18} />
                                    <span className="text-[13px] font-bold text-slate-500">Espaço usado</span>
                                </div>
                                <span className="text-[12px] font-black text-slate-400">142 MB</span>
                            </div>
                        </div>

                        <button className="w-full py-3.5 bg-slate-50 text-slate-600 font-black text-[14px] rounded-2xl active:bg-slate-100 transition-colors">
                            Sincronizar agora
                        </button>
                    </div>
                </div>

                {/* CONTA */}
                <div>
                    <SectionHeader>Conta</SectionHeader>
                    <div className="shadow-sm rounded-[20px] overflow-hidden border border-slate-100">
                        <MenuItem icon={User} label="Dados pessoais" />
                        <MenuItem icon={Bell} label="Notificações" />
                        <MenuItem icon={ShieldCheck} label="Segurança" />
                    </div>
                </div>

                {/* SISTEMA SECAO LISTA */}
                <div>
                    <SectionHeader>Sistema</SectionHeader>
                    <div className="shadow-sm rounded-[20px] overflow-hidden border border-slate-100">
                        <MenuItem icon={Smartphone} label="Dispositivo" />
                        <MenuItem icon={RefreshCcw} label="Sincronização" value="Sincronizado" />
                    </div>
                </div>

                {/* SUPORTE */}
                <div>
                    <SectionHeader>Suporte</SectionHeader>
                    <div className="shadow-sm rounded-[20px] overflow-hidden border border-slate-100">
                        <MenuItem icon={HelpCircle} label="Ajuda e tutoriais" />
                        <MenuItem icon={AlertCircle} label="Reportar problema" />
                    </div>
                </div>

                {/* VERSAO FOOTER */}
                <div className="bg-[#CCF030]/10 rounded-[32px] p-6 border border-[#CCF030]/20 text-center space-y-1">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Versão do aplicativo</p>
                    <p className="text-[16px] font-black text-slate-800">2.1.4</p>
                    <p className="text-[11px] font-bold text-slate-400 leading-tight pt-1">
                        PayService+  2024  Feito para comerciantes de Angola
                    </p>
                </div>

                {/* SAIR BUTTON */}
                <button 
                    onClick={() => {
                        logout();
                        navigate('/login');
                    }}
                    className="w-full py-4 bg-white border border-slate-100 rounded-[32px] flex items-center justify-center gap-2 text-rose-500 font-black text-[15px] shadow-sm active:bg-rose-50 transition-colors"
                >
                    <LogOut size={18} strokeWidth={2.5} />
                    Sair
                </button>

                {/* SUPORTE EMAIL */}
                <div className="text-center pt-2 pb-8">
                    <p className="text-[11px] font-bold text-slate-400">Precisa de ajuda? Entre em contacto com o suporte</p>
                    <p className="text-[13px] font-black text-[#084C54] mt-0.5">suporte@payservice.ao</p>
                </div>

            </div>
        </PageTransition>
    );
};

export default Settings;
