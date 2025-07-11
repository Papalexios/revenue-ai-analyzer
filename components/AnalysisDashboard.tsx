import React from 'react';
import { AnalysisResult } from '../types';
import MetricsCard from './MetricsCard';
import Heatmap from './Heatmap';
import Loader from './Loader';
import ErrorDisplay from './ErrorDisplay';

interface AnalysisDashboardProps {
  result: AnalysisResult | null;
  originalContent: string;
  isLoading: boolean;
  error: string | null;
}

const WelcomeState: React.FC = () => (
    <div className="text-center py-16 animate-fade-in">
        <div className="inline-block p-4 bg-slate-700/50 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-sky-400">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L4 5v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V5l-8-3z" />
            </svg>
        </div>
        <h3 className="mt-4 text-xl font-semibold text-white">Professional Analysis Engine</h3>
        <p className="mt-2 text-slate-400">Your content's trust and credibility audit will appear here.</p>
        <p className="mt-1 text-sm text-slate-500">Provide your content and click "Analyze Potential" to begin.</p>
    </div>
);

const TrustScoreGauge: React.FC<{ score: number, summary: string }> = ({ score, summary }) => {
    const circumference = 2 * Math.PI * 52;
    const [offset, setOffset] = React.useState(circumference);

    React.useEffect(() => {
        const timer = setTimeout(() => setOffset(circumference - (score / 100) * circumference), 100);
        return () => clearTimeout(timer);
    }, [score, circumference]);

    const getScoreColor = (s: number) => {
        if (s >= 80) return 'text-emerald-400';
        if (s >= 50) return 'text-yellow-400';
        return 'text-red-400';
    };

    return (
        <div className="flex flex-col items-center justify-center bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-700 h-full">
            <div className="relative w-40 h-40">
                <svg className="w-full h-full" viewBox="0 0 120 120">
                    <circle className="text-slate-700" strokeWidth="10" stroke="currentColor" fill="transparent" r="52" cx="60" cy="60" />
                    <circle
                        className={`${getScoreColor(score)} transition-all duration-1000 ease-in-out`}
                        strokeWidth="10" strokeDasharray={circumference} strokeDashoffset={offset}
                        strokeLinecap="round" stroke="currentColor" fill="transparent"
                        r="52" cx="60" cy="60" transform="rotate(-90 60 60)"
                    />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className={`text-5xl font-bold ${getScoreColor(score)}`}>{score}</span>
                    <span className="text-sm text-slate-400 font-medium">Trust Score</span>
                </div>
            </div>
            <p className="text-center text-sm text-slate-300 mt-4 max-w-xs">{summary}</p>
        </div>
    );
};

const ActionableRecommendations: React.FC<{ recommendations: string[] }> = ({ recommendations }) => (
    <div>
        <h3 className="text-lg font-semibold text-white mb-3">Actionable Recommendations</h3>
        <ul className="space-y-3">
            {recommendations.map((rec, index) => (
                <li key={index} className="flex items-start space-x-4 bg-slate-800/80 p-4 rounded-lg border border-slate-700 hover:bg-slate-700/50 transition-colors">
                    <svg className="w-6 h-6 text-sky-400 mt-0.5 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-.75-4.75a.75.75 0 001.5 0v-2.5a.75.75 0 00-1.5 0v2.5zM10 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                    <p className="text-slate-300 text-sm">{rec}</p>
                </li>
            ))}
        </ul>
    </div>
);

const AnalysisDashboard: React.FC<AnalysisDashboardProps> = ({ result, originalContent, isLoading, error }) => {
  if (isLoading) {
    return <Loader message="Executing professional content audit..." />;
  }
  if (error) {
    return <ErrorDisplay message={error} />;
  }
  if (!result) {
    return <WelcomeState />;
  }
  
  const readabilityScorePercent = Math.max(0, 100 - (result.readabilityScore - 5) * 10);

  return (
    <div className="space-y-8 animate-slide-in">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
                 <TrustScoreGauge score={result.trustScore} summary={result.overallSummary} />
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MetricsCard title="Clarity" displayValue={`${result.clarityScore}`} scorePercent={result.clarityScore} description="How clear and easy to understand the content is." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>} />
                <MetricsCard title="Credibility" displayValue={`${result.credibilityScore}`} scorePercent={result.credibilityScore} description="How believable and authoritative the content appears." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                <MetricsCard title="Engagement" displayValue={`${result.engagementScore}`} scorePercent={result.engagementScore} description="Likelihood of holding a reader's attention." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                <MetricsCard title="Readability" displayValue={`Grade ${result.readabilityScore}`} scorePercent={readabilityScorePercent} description="Grade Level. Lower is easier for broader audiences." icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /></svg>} />
            </div>
        </div>
      {result.actionableRecommendations && result.actionableRecommendations.length > 0 && <ActionableRecommendations recommendations={result.actionableRecommendations} />}
      <Heatmap content={originalContent} triggerPhrases={result.triggerPhrases} />
    </div>
  );
};

export default AnalysisDashboard;