import React from 'react';
import { TriggerPhrase } from '../types';

interface HeatmapProps {
  content: string;
  triggerPhrases: TriggerPhrase[];
}

const getCategoryStyle = (category: TriggerPhrase['category']): { base: string; text: string; border: string; label: string; } => {
    const styles = {
        'Value Proposition': { base: 'bg-sky-500/10', text: 'text-sky-300', border: 'border-sky-500/70', label: 'text-sky-400' },
        'Call to Action': { base: 'bg-emerald-500/10', text: 'text-emerald-300 font-medium', border: 'border-emerald-500/70', label: 'text-emerald-400' },
        'Urgency': { base: 'bg-amber-500/10', text: 'text-amber-300', border: 'border-amber-500/70', label: 'text-amber-400' },
        'Social Proof': { base: 'bg-indigo-500/10', text: 'text-indigo-300', border: 'border-indigo-500/70', label: 'text-indigo-400' },
        'Benefit': { base: 'bg-green-500/10', text: 'text-green-300', border: 'border-green-500/70', label: 'text-green-400' },
        'Pain Point': { base: 'bg-red-500/10', text: 'text-red-300', border: 'border-red-500/70', label: 'text-red-400' },
    };
    return styles[category] || { base: 'bg-slate-700/20', text: 'text-slate-300', border: 'border-slate-500/70', label: 'text-slate-400' };
};


const Heatmap: React.FC<HeatmapProps> = ({ content, triggerPhrases }) => {
  if (!triggerPhrases || triggerPhrases.length === 0) {
    return (
      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Credibility Heatmap</h3>
        <div className="bg-slate-800 p-6 rounded-lg border border-slate-700 whitespace-pre-wrap text-slate-300">
          {content}
        </div>
        <p className="text-center text-sm text-slate-400 mt-4">No specific psychological triggers were identified in this text.</p>
      </div>
    );
  }

  // Sort phrases by length descending to match longer phrases first
  const sortedPhrases = [...triggerPhrases].sort((a, b) => b.phrase.length - a.phrase.length);
  
  let parts: (string | React.ReactNode)[] = [content];

  sortedPhrases.forEach(trigger => {
    let newParts: (string | React.ReactNode)[] = [];
    parts.forEach(part => {
      if (typeof part === 'string') {
        if (!part.includes(trigger.phrase)) {
          newParts.push(part);
          return;
        }
        
        const style = getCategoryStyle(trigger.category);
        const splitByPhrase = part.split(trigger.phrase);
        splitByPhrase.forEach((subPart, index) => {
          if (subPart) newParts.push(subPart);
          if (index < splitByPhrase.length - 1) {
            newParts.push(
              <span key={`${trigger.phrase}-${index}`} className={`relative group px-1 rounded-sm transition-colors duration-300 ${style.base} ${style.text} border-b-[3px] ${style.border}`}>
                {trigger.phrase}
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-slate-700 ring-1 ring-black/10">
                  <strong className={`block text-sm mb-1 font-bold ${style.label}`}>{trigger.category}</strong>
                  <strong className="text-slate-300">Impact Strength: {trigger.strength}/5</strong><br/>
                  <span className="text-slate-400 mt-1 block">{trigger.explanation}</span>
                </span>
              </span>
            );
          }
        });
      } else {
        newParts.push(part);
      }
    });
    parts = newParts;
  });

  return (
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Credibility Heatmap</h3>
      <p className="text-sm text-slate-400 mb-4">Hover over highlighted phrases to see a professional analysis of their psychological impact.</p>
      <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700 whitespace-pre-wrap text-slate-300 leading-relaxed">
        {parts.map((part, index) => <React.Fragment key={index}>{part}</React.Fragment>)}
      </div>
    </div>
  );
};

export default Heatmap;