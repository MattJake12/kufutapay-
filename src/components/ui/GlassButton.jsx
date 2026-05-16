import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

const GlassButton = ({ 
  children, 
  variant = 'primary', // primary | secondary | ghost | danger
  size = 'md', // sm | md | lg | icon
  className,
  isLoading = false,
  disabled,
  ...props 
}) => {

  const baseStyles = "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-2xl outline-none disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden backdrop-blur-md";

  const variants = {
    primary: "bg-brand-primary text-white shadow-[0_10px_20px_rgba(217,72,15,0.2)] border-none",
    secondary: "bg-white text-brand-primary border border-brand-primary/20 shadow-sm hover:bg-slate-50",
    ghost: "bg-transparent text-slate-500 hover:text-brand-primary hover:bg-brand-primary/5",
    danger: "bg-red-500 text-white shadow-lg shadow-red-500/20",
  };

  const sizes = {
    sm: "text-xs px-3 py-1.5 h-8",
    md: "text-sm px-6 py-3.5 h-12",
    lg: "text-base px-8 py-4 h-14",
    icon: "p-3 h-12 w-12 rounded-full", // Botão circular
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {/* Brilho interno animado */}
      {variant === 'primary' && (
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full animate-[shimmer_2s_infinite]" />
      )}

      {isLoading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <span className="flex items-center gap-2 relative z-10">{children}</span>
      )}
    </motion.button>
  );
};

export default GlassButton;