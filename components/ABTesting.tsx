
import React from 'react';
import { ABTestVariation } from '../types';
import Loader from './Loader';
import ErrorDisplay from './ErrorDisplay';

interface ABTestingProps {
  variations: ABTestVariation[] | null;
  onGenerate: () => void;
  isLoading: boolean;
  error: string | null;
}

const ABTesting: React.FC<ABTestingProps> = ({ variations, onGenerate, isLoading, error }) => {
  if (isLoading) return <Loader message="Generating A/B test variations..." />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h3 className="text-xl font-semibold text-white">Dynamic A/B Test Simulator</h3>
        <p className="mt-1 text-slate-400">
          Generate and compare different versions of your content optimized for conversion.
        </p>
      </div>

      {!variations && (
        <div className="text-center py-10">
          <p className="text-slate-300">Enter your original content and click the button below to generate variations.</p>
        </div>
      )}

      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-500 disabled:bg-slate-600 disabled:cursor-not-allowed transition-colors duration-300 transform hover:scale-105 disabled:scale-100 shadow-lg shadow-indigo-600/20 disabled:shadow-none"
      >
        {isLoading ? 'Generating...' : 'Generate New Variations'}
      </button>

      {variations && (
        <div className="space-y-6 pt-4">
          {variations.map((variation, index) => (
            <div key={index} className="bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-700">
              <h4 className="text-md font-semibold text-sky-400 mb-3">Variation {index + 1}</h4>
              <p className="whitespace-pre-wrap text-slate-300 leading-relaxed">{variation.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ABTesting;
