"use client"; // 🚀 Isso torna o componente um Client Component

import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
    className={`px-8 mb-2 mt-2 py-2 bg-[#5ED85B] text-white rounded font-bold text-2xl h-[65px] w-[240px] shadow-md pt-2 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
