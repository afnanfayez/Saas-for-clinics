import React from 'react'
// import {ButtonProps} from "../../.next/types/ButtonProps"
export interface ButtonProps {
  title: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  title,
  className = "",
  disabled = false,
  onClick,
}) => {
  return (
      <button
          type="submit"
      onClick={onClick}
      disabled={disabled}
      className={`w-full py-2 rounded-lg font-semibold transition bg-blue-600 hover:bg-blue-700 text-white disabled:bg-gray-400 disabled:cursor-not-allowed ${className}`}
    >
      {title}
    </button>
  );
};

export default Button;