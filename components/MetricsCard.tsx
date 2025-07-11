import React from 'react';

interface MetricsCardProps {
  title: string;
  displayValue: string;
  scorePercent: number; // A value from 0-100 for the progress bar
  description: string;
  icon: React.ReactNode;
}

const getScoreBarColor = (percentage: number) => {
  if (percentage >= 80) return 'bg-emerald-500';
  if (percentage >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
};

const getScoreTextColor = (percentage: number) => {
    if (percentage >= 80) return 'text-emerald-400';
    if (percentage >= 50) return 'text-yellow-400';
    return 'text-red-400';
};

const MetricsCard: React.FC<MetricsCardProps> = ({ title, displayValue, scorePercent, description, icon }) => {
  const barColor = getScoreBarColor(scorePercent);
  const textColor = getScoreTextColor(scorePercent);

  return (
    <div className="bg-slate-800 p-5 rounded-xl shadow-lg border border-slate-700 flex flex-col justify-between h-full transform transition-transform duration-300 hover:-translate-y-1">
      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-slate-300">{title}</p>
          <div className="text-slate-400">{icon}</div>
        </div>
        <p className={`text-3xl font-bold ${textColor} mt-2`}>{displayValue}</p>
        <div className="w-full bg-slate-700 rounded-full h-2 mt-3">
          <div
            className={`h-2 rounded-full ${barColor} transition-all duration-700 ease-out`}
            style={{ width: `${Math.max(0, Math.min(100, scorePercent))}%` }}
          ></div>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-4">{description}</p>
    </div>
  );
};

export default MetricsCard;