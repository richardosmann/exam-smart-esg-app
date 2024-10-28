import React from 'react';

interface CardProps {
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div
      tabIndex={0}
      className="max-w-[1040px] w-full min-h-[259px] h-auto py-6 rounded-lg bg-gray-50 shadow-sm shadow-gray-400
      focus:outline-none focus:min-h-[313px] focus:h-auto focus:border-none focus:ring-1 focus:ring-emerald-700 focus:shadow-md focus:shadow-gray-500
      focus-within:outline-none focus-within:min-h-[313px] focus-within:h-auto focus-within:border-none focus-within:ring-1 focus-within:ring-emerald-700 focus-within:shadow-lg 
      transition-all group"
    >
      <div className="">
        <div className="pl-6 pb-6 border-b border-gray-400 hidden group-focus:block group-focus-within:block transition-all">
          <a href="#" target="_blank">
            <div className="flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-[18px] text-emerald-700 font-bold"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
                />
              </svg>
              <p className="pl-2 font-bold text-sm text-emerald-700">
                共有リンクを発行
              </p>
            </div>
          </a>
        </div>
        <div className="mx-6 focus-within:mt-6 group-focus:mt-6 group-focus-within:mt-6">
          {children}
        </div>
      </div>
    </div>
  );
};
