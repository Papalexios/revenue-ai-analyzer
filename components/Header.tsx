import React from 'react';

const LogoIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8 text-sky-400"
    >
        <path d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" />
    </svg>
);


const Header: React.FC = () => {
  return (
    <header className="bg-slate-900/60 backdrop-blur-md sticky top-0 z-50 border-b border-slate-700/50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
            <LogoIcon />
            <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              Affiliate Trust Architect
            </h1>
        </div>
        <span className="text-xs font-semibold bg-sky-500/20 text-sky-300 px-3 py-1 rounded-full border border-sky-500/30">PRO</span>
      </div>
    </header>
  );
};

export default Header;