import React from "react";

interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  icon?: React.ReactNode; // Para receber o ícone como um ReactNode
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder,
  value,
  onChange,
  className,
  icon,
}) => {
  return (
    <div className="flex items-center border-2 p-4 rounded-lg border-[#7F00B2] shadow-md h-[65px] w-[346px] mb-4">
      {icon && <div className="text-[#7F00B2] mr-2">{icon}</div>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-transparent placeholder-[#7F00B2] placeholder:font-extrabold text-violet-900 focus:outline-none hover:border-transparent ${className}`}
      />
    </div>
  );
};

export default Input;
