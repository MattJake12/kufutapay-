import React from 'react';
import { motion } from 'framer-motion';
import { Delete } from 'lucide-react';

const KeypadButton = ({ children, onClick, className = "" }) => (
  <motion.button
    whileTap={{ scale: 0.9, backgroundColor: "#F8F9FA", borderColor: "#D9480F" }}
    onClick={onClick}
    className="w-16 h-16 rounded-2xl text-xl font-black text-slate-700 bg-white border-2 border-slate-50 flex items-center justify-center mx-auto outline-none select-none shadow-sm transition-all active:text-brand-primary"
  >
    {children}
  </motion.button>
);

const NumericKeypad = ({ onNumberClick, onDelete, leftAction }) => {
  return (
    <div className="w-full grid grid-cols-3 gap-x-2 gap-y-4 px-8 max-w-[280px] mx-auto">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <KeypadButton key={num} onClick={() => onNumberClick(num)}>
          {num}
        </KeypadButton>
      ))}
      
      <div className="flex items-center justify-center">
        {leftAction || <div />}
      </div>
      
      <KeypadButton onClick={() => onNumberClick(0)}>0</KeypadButton>
      
      <button 
        onClick={onDelete}
        className="flex items-center justify-center w-14 h-14 rounded-2xl text-slate-400 hover:text-slate-600 active:scale-75 transition-all mx-auto"
      >
        <Delete size={24} strokeWidth={2.5} />
      </button>
    </div>
  );
};

export default NumericKeypad;
