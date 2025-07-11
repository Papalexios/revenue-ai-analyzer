
import React, { useState, useCallback } from 'react';
import { AnalysisResult, ABTestVariation } from './types';
import { analyzeContent, generateABTests } from './services/geminiService';
import Header from './components/Header';
import ContentInput from './components/ContentInput';
import AnalysisDashboard from './components/AnalysisDashboard';
import CompetitorAnalysis from './components/CompetitorAnalysis';
import ABTesting from './components/ABTesting';
import Resources from './components/Resources';

enum AppView {
  MAIN_ANALYSIS,
  COMPETITOR_ANALYSIS,
  AB_TESTING,
  RESOURCES
}

export default function App() {
  const [content, setContent] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [abTestVariations, setAbTestVariations] = useState<ABTestVariation[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<AppView>(AppView.MAIN_ANALYSIS);

  const handleAnalysis = useCallback(async (textToAnalyze: string) => {
    if (!textToAnalyze.trim()) {
      setError('Content cannot be empty.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setAbTestVariations(null);

    try {
      const result = await analyzeContent(textToAnalyze);
      setAnalysisResult(result);
      setCurrentView(AppView.MAIN_ANALYSIS);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred during analysis.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleGenerateABTests = useCallback(async () => {
    if (!content) return;
    setIsLoading(true);
    setError(null);
    setAbTestVariations(null);
    try {
      const variations = await generateABTests(content);
      setAbTestVariations(variations.map(v => ({ text: v })));
      setCurrentView(AppView.AB_TESTING);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred while generating A/B tests.');
    } finally {
      setIsLoading(false);
    }
  }, [content]);

  const renderCurrentView = () => {
    switch (currentView) {
      case AppView.COMPETITOR_ANALYSIS:
        return <CompetitorAnalysis onAnalyze={handleAnalysis} isLoading={isLoading} error={error} />;
      case AppView.AB_TESTING:
        return <ABTesting variations={abTestVariations} onGenerate={handleGenerateABTests} isLoading={isLoading} error={error} />;
      case AppView.RESOURCES:
        return <Resources />;
      default:
        return <AnalysisDashboard result={analysisResult} originalContent={content} isLoading={isLoading} error={error} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="lg:sticky lg:top-8">
            <ContentInput
              content={content}
              setContent={setContent}
              onAnalyze={() => handleAnalysis(content)}
              isLoading={isLoading}
            />
          </div>

          <div className="bg-slate-800/50 rounded-2xl shadow-2xl ring-1 ring-white/10 min-h-[600px] p-2">
            <nav className="flex items-center space-x-2 bg-slate-900/70 p-2 rounded-t-xl overflow-x-auto">
              <button onClick={() => setCurrentView(AppView.MAIN_ANALYSIS)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${currentView === AppView.MAIN_ANALYSIS ? 'bg-sky-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>Revenue Analysis</button>
              <button onClick={() => setCurrentView(AppView.COMPETITOR_ANALYSIS)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${currentView === AppView.COMPETITOR_ANALYSIS ? 'bg-sky-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>Competitor Intel</button>
              <button onClick={() => setCurrentView(AppView.AB_TESTING)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${currentView === AppView.AB_TESTING ? 'bg-sky-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>A/B Simulator</button>
              <button onClick={() => setCurrentView(AppView.RESOURCES)} className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap ${currentView === AppView.RESOURCES ? 'bg-sky-600 text-white' : 'text-slate-300 hover:bg-slate-700'}`}>Resources</button>
            </nav>
            <div className="p-6">
              {renderCurrentView()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
