import React, { useRef, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import DeviceFrame from './DeviceFrame';
import BottomDock from '../ui/BottomDock';

const AppLayout = () => {
    const location = useLocation();
    const showDock = location.pathname.startsWith('/app');
    
    // Lógica da "Mãozinha" (Drag to scroll)
    const scrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startY, setStartY] = useState(0);
    const [scrollTop, setScrollTop] = useState(0);

    const handleMouseDown = (e) => {
        if (window.matchMedia('(pointer: coarse)').matches) return;
        setIsDragging(true);
        setStartY(e.pageY - (scrollRef.current?.offsetTop || 0));
        setScrollTop(scrollRef.current?.scrollTop || 0);
    };

    const handleMouseUp = () => setIsDragging(false);
    const handleMouseLeave = () => setIsDragging(false);

    const handleMouseMove = (e) => {
        if (!isDragging || !scrollRef.current) return;
        const y = e.pageY - (scrollRef.current?.offsetTop || 0);
        const walk = (y - startY) * 1.5; 
        if (Math.abs(y - startY) > 5) {
            e.preventDefault();
            scrollRef.current.scrollTop = scrollTop - walk;
        }
    };

    return (
        <DeviceFrame>
            <div className="w-full h-full flex flex-col bg-white overflow-hidden relative">
                {/* ÁREA DE CONTEÚDO SCROLLÁVEL COM MÃOZINHA */}
                <main 
                    ref={scrollRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    className={`flex-1 w-full overflow-y-auto no-scrollbar scroll-smooth outline-none ${isDragging ? 'cursor-grabbing select-none' : 'cursor-grab'}`}
                >
                    <div className="w-full min-h-full">
                        <Outlet />
                    </div>
                </main>
                
                {/* MENU FIXO NA BASE - NÃO ROLA COM A MÃOZINHA */}
                {showDock && (
                    <div className="shrink-0 w-full z-50 bg-white border-t border-slate-100">
                        <BottomDock />
                    </div>
                )}
            </div>
        </DeviceFrame>
    );
};

export default AppLayout;
