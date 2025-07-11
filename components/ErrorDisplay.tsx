
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center p-8 animate-fade-in bg-red-500/10 border border-red-500/30 rounded-lg">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h3 className="mt-4 text-xl font-semibold text-white">An Error Occurred</h3>
      <p className="mt-2 text-red-300 max-w-md">{message}</p>
    </div>
  );
};

export default ErrorDisplay;
