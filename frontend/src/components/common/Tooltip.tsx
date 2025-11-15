"use client";

import React, { useRef } from "react";

interface TooltipProps {
    text: string;
    children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (!ref.current) return;
        ref.current.style.opacity = "1";
        ref.current.style.visibility = "visible";
    };

    const handleMouseLeave = () => {
        if (!ref.current) return;
        ref.current.style.opacity = "0";
        ref.current.style.visibility = "hidden";
    };

    return (
        <div className="flex relative items-center">
            <div 
                className="flex before:block absolute before:absolute top-full before:-top-1 left-1/2 before:left-1/2 invisible z-10 before:z-0 items-center py-[2px] px-2 mx-auto mt-2 before:w-2 before:h-2 text-sm text-white whitespace-nowrap before:bg-black bg-black rounded transition-all duration-150 transform before:transform before:rotate-45 -translate-x-1/2 before:-translate-x-1/2"
                ref={ref}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                {text}
            </div>
            <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                {children}
            </div>
        </div>
    )
}