
import React from 'react';

interface RevenueForecastProps {
  score: number; // Conversion potential score 1-10
}

const RevenueForecast: React.FC<RevenueForecastProps> = ({ score }) => {
  // Simple placeholder formula for demonstration
  const calculateRevenue = (s: number) => {
    const baseRevenue = 50;
    const scaledRevenue = Math.pow(s, 2.5) * 15;
    return Math.round(baseRevenue + scaledRevenue);
  };

  const potentialRevenue = calculateRevenue(score);
  const confidence = score > 7 ? 'High' : score > 4 ? 'Medium' : 'Low';
  const confidenceColor = score > 7 ? 'text-emerald-400' : score > 4 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="bg-gradient-to-br from-sky-900 to-slate-800 p-6 rounded-xl shadow-lg border border-slate-700">
      <h3 className="text-lg font-semibold text-white">Revenue Forecast</h3>
      <div className="flex items-end space-x-4 mt-4">
        <p className="text-5xl font-bold text-brand-accent">
          ${potentialRevenue}
        </p>
        <p className="text-slate-400 mb-1">/ month (estimated)</p>
      </div>
       <p className="text-sm text-slate-300 mt-2">
        Confidence Level: <span className={`font-bold ${confidenceColor}`}>{confidence}</span>
      </p>
    </div>
  );
};

export default RevenueForecast;
