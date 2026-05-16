import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Wifi, Battery, Signal } from 'lucide-react';

const DeviceFrame = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-[#E9ECEF] flex items-center justify-center relative overflow-hidden">
      
      {/* --- BACKGROUND DESKTOP (ESTÚDIO PROFISSIONAL) --- */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <div className="absolute inset-0 bg-grid-pattern opacity-50" />
        <div className="absolute inset-0 studio-spotlight" />
      </div>

      {/* --- CONTAINER DO DISPOSITIVO (ANDROID PREMIUM POS STYLE) --- */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 w-full max-w-[430px] h-screen md:h-[880px] transition-all duration-500"
      >
        <div className="relative w-full h-full md:rounded-[48px] md:border-[10px] border-[#0f172a] bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden">
          
          {/* BEZEL / FRAME DETAILS (ANDROID BUTTONS - RIGHT SIDE) */}
          <div className="hidden md:block absolute top-32 -right-[12px] w-1 h-12 bg-[#1e293b] rounded-r-md border-l border-white/10" />
          <div className="hidden md:block absolute top-48 -right-[12px] w-1 h-24 bg-[#1e293b] rounded-r-md border-l border-white/10" />

          {/* Android Status Bar */}
          <div className="z-50 px-6 pt-3 pb-2 flex justify-between items-center bg-transparent absolute top-0 left-0 right-0 text-white pointer-events-none hidden md:flex">
            <div className="flex gap-2 items-center drop-shadow-md">
              <span className="text-[12px] font-bold tracking-tight">12:45</span>
            </div>
            
            {/* Camera Punch-hole (Modern Minimalist) */}
            <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-4 w-4 h-4 bg-[#020617] rounded-full z-50 shadow-inner ring-1 ring-white/5">
               <div className="absolute top-1 left-1 w-1 h-1 bg-blue-400/20 rounded-full blur-[0.5px]"></div>
            </div>

            <div className="flex gap-1.5 items-center drop-shadow-md">
              <Signal size={12} strokeWidth={2.5} />
              <Wifi size={13} strokeWidth={2.5} />
              <Battery size={16} strokeWidth={2.5} className="rotate-90" />
            </div>
          </div>

          {/* CONTEÚDO DA APP */}
          <div className="flex-1 w-full h-full relative overflow-hidden bg-white">
             {children}
          </div>

          {/* Android Gesture Indicator (Bottom) */}
          <div className="absolute bottom-1.5 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-black/10 rounded-full z-50 hidden md:block" />
        
        </div>
      </motion.div>

    </div>
  );
};

export default DeviceFrame;
