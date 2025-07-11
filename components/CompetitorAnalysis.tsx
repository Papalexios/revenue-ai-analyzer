
import React, { useState } from 'react';
import Loader from './Loader';
import ErrorDisplay from './ErrorDisplay';

interface CompetitorAnalysisProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
  error: string | null;
}

const CompetitorAnalysis: React.FC<CompetitorAnalysisProps> = ({ onAnalyze, isLoading, error }) => {
  const [competitorContent, setCompetitorContent] = useState('');

  // This component will re-use the parent's loading and error state,
  // but it needs to manage its own text input.
  // The results will be displayed in the main dashboard after analysis.

  if (isLoading) return <Loader message="Analyzing competitor content..." />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h3 className="text-xl font-semibold text-white">Competitor Intelligence</h3>
        <p className="mt-1 text-slate-400">
          Paste a competitor's content to reverse-engineer their strategy. The analysis will appear in the main dashboard.
        </p>
      </div>

      <textarea
        value={competitorContent}
        onChange={(e) => setCompetitorContent(e.target.value)}
        placeholder="Paste your competitor's blog post or sales page here..."
        className="w-full h-80 bg-slate-900/80 border border-slate-700 rounded-lg p-4 text-slate-300 placeholder-slate-500 focus:ring-2 focus:ring-sky-500 focus:outline-none transition-colors duration-300 resize-y"
        disabled={isLoading}
      />

      <button
        onClick={() => onAnalyze(competitorContent)}
        disabled={isLoading || !competitorContent.trim()}
        className="w-full flex justify-center items-center bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-emerald-600/20 disabled:shadow-none"
      >
        Analyze Competitor
      </button>
      <p className="text-xs text-slate-500 text-center">Note: After analysis, the results will be shown in the "Revenue Analysis" tab. This tool does not scrape websites directly; you must provide the content.</p>
    </div>
  );
};

export default CompetitorAnalysis;
