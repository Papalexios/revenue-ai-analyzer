
import React from 'react';

interface ContentInputProps {
  content: string;
  setContent: (content: string) => void;
  onAnalyze: () => void;
  isLoading: boolean;
}

const ContentInput: React.FC<ContentInputProps> = ({ content, setContent, onAnalyze, isLoading }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-2xl shadow-2xl ring-1 ring-white/10 flex flex-col space-y-4 animate-fade-in">
      <div>
        <h2 className="text-xl font-semibold text-white">Your Content</h2>
        <p className="text-sm text-slate-400 mt-1">Paste your article, blog post, or ad copy below.</p>
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="e.g., 'Discover the top 5 reasons why the new Quantum Processor is a game-changer for developers...'"
        className="w-full h-80 bg-slate-900/80 border border-slate-700 rounded-lg p-4 text-slate-300 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all duration-300 resize-y"
        disabled={isLoading}
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading || !content.trim()}
        className="w-full flex justify-center items-center bg-sky-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-sky-600/20 disabled:shadow-none"
      >
        {isLoading ? (
            <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
            </>
        ) : (
          'Analyze Potential'
        )}
      </button>
    </div>
  );
};

export default ContentInput;
