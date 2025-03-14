"use client"; // 🚀 Isso torna o componente um Client Component

import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
}

const ButtonOptions: React.FC<ButtonProps> = ({ label, onClick, className }) => {
  return (
    <button
    className={`border-2 p-2 rounded border-violet-900 text-violet-900 font-bold text-xl ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default ButtonOptions;
