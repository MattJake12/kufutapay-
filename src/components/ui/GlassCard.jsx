import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const GlassCard = ({ 
  children, 
  className, 
  variant = 'default', // default | featured | dark
  onClick,
  ...props 
}) => {
  
  const variants = {
    default: "bg-white border-slate-200/60 shadow-sm",
    featured: "bg-gradient-to-br from-brand-primary to-brand-accent border-none text-white shadow-xl shadow-brand-primary/20",
    dark: "bg-slate-900 border-white/10 text-white",
  };

  return (
    <motion.div
      whileTap={onClick ? { scale: 0.98 } : {}}
      className={cn(
        "relative overflow-hidden rounded-[32px] border p-5",
        "transition-all duration-300",
        variants[variant],
        className
      )}
      onClick={onClick}
      {...props}
    >
      {/* Efeito de brilho/ruído subtil no fundo */}
      <div className="absolute inset-0 bg-white/5 opacity-0 hover:opacity-10 transition-opacity duration-500 pointer-events-none" />
      
      {/* Conteúdo */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;