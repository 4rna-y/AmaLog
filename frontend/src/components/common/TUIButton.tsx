'use client';

import React from 'react';

interface ButtonProps 
{
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    variant?: "bordered" | "underlined";
}

const TUIButton: React.FC<ButtonProps> = (
{
    children,
    onClick,
    className = "",
    disabled = false,
    variant = "bordered"
}) => 
{
  const baseDecos= "bg-transparent transition-colors";
  const variantDecos = variant === "bordered" 
    ? "border-2 border-solid border-white px-2 py-1"
    : "border-none no-underline hover:underline";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseDecos} ${variantDecos} ${className}`}
      style={{ cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.6 : 1 }}>
      {children}
    </button>
  );
};

export default TUIButton;