import React from 'react';
import Button from '../atoms/button';

interface NavBarProps {
  buttonText: string;
}

export const NavBar: React.FC<NavBarProps> = ({ buttonText }) => {
  return (
    <div className="w-full max-w-[1280px] h-[72px] bg-white shadow-lg shadow-gray-400 sticky z-10 top-0 left-0 right-0">
      <div className="p-4 flex justify-end">
        <Button buttonText={buttonText} />
      </div>
    </div>
  );
};
