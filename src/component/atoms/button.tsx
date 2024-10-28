import React from 'react';

interface ButtonProps {
  buttonText: string;
  type: 'submit' | 'button';
}

const Button: React.FC<ButtonProps> = ({ buttonText, type = 'button' }) => {
  return (
    <div className="w-28 h-10">
      <button
        type={type}
        className="w-full h-full px-4 py-2 rounded-md text-white font-bold text-sm bg-emerald-700 hover:bg-emerald-800 transition-colors duration-300"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
