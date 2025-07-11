
import React from 'react';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 animate-fade-in">
      <svg className="w-16 h-16 text-sky-500 animate-pulse-fast" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: '#38bdf8', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor: '#0ea5e9', stopOpacity:1}} />
              </linearGradient>
          </defs>
          <path stroke="url(#grad1)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3a9 9 0 100 18 9 9 0 000-18z" />
          <path stroke="currentColor" className="text-sky-800" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.364 8.636l-1.414-1.414M8.636 15.364l-1.414-1.414m0-5.656l1.414-1.414m5.657 7.07l1.414-1.414" />
      </svg>
      <p className="mt-4 text-lg font-semibold text-white">{message}</p>
      <p className="text-slate-400 text-sm">Our AI is working its magic...</p>
    </div>
  );
};

export default Loader;
