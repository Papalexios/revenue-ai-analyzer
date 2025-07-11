export interface TriggerPhrase {
  phrase: string;
  strength: number; // 1 to 5
  explanation: string;
  category: 'Urgency' | 'Social Proof' | 'Value Proposition' | 'Call to Action' | 'Pain Point' | 'Benefit';
}

export interface AnalysisResult {
  trustScore: number; // 0-100, overall score
  sentiment: string;
  readabilityScore: number; // Flesch-Kincaid
  clarityScore: number; // 0-100
  credibilityScore: number; // 0-100
  engagementScore: number; // 0-100
  overallSummary: string;
  actionableRecommendations: string[];
  triggerPhrases: TriggerPhrase[];
}

export interface ABTestVariation {
  text: string;
}

export interface ResourceLink {
  title: string;
  url: string;
  category: string;
}
