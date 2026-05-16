import React, { useState } from 'react';
import { cn } from '../../utils/cn';

const GlassInput = ({ 
  label, 
  icon: Icon, 
  rightElement,
  className, 
  error,
  type = "text",
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      {label && (
        <label className="text-xs font-semibold text-slate-500 ml-1 uppercase tracking-wider">
          {label}
        </label>
      )}
      
      <div className={cn(
        "relative flex items-center w-full rounded-2xl transition-all duration-300 border bg-white shadow-sm",
        isFocused ? "border-brand-primary ring-4 ring-brand-primary/5" : "border-slate-200 hover:border-slate-300",
        error ? "border-red-500" : ""
      )}>
        
        {/* Ícone à Esquerda */}
        {Icon && (
          <div className="pl-4 text-slate-600">
            <Icon size={18} />
          </div>
        )}

        <input
          type={type}
          className="w-full bg-transparent border-none px-4 py-3.5 text-slate-800 placeholder:text-slate-500 focus:ring-0 text-base font-medium outline-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {/* Elemento à Direita (ex: Botão 'Ver' password ou Texto 'Kz') */}
        {rightElement && (
          <div className="pr-4">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-red-400 ml-1 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  );
};

export default GlassInput;
