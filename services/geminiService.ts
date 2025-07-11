import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema = {
  type: Type.OBJECT,
  properties: {
    trustScore: { type: Type.NUMBER, description: "A holistic score from 0-100 representing the content's overall trustworthiness and conversion credibility. This is the primary metric." },
    sentiment: { type: Type.STRING, description: "Overall sentiment (e.g., 'Authoritative & Positive', 'Neutral', 'Speculative')." },
    readabilityScore: { type: Type.NUMBER, description: "Flesch-Kincaid Grade Level score. Lower is generally better for broad audiences." },
    clarityScore: { type: Type.NUMBER, description: "A score from 0-100 on how clear, concise, and easy to understand the content is." },
    credibilityScore: { type: Type.NUMBER, description: "A score from 0-100 assessing the believability, citing of evidence, and authority of the content." },
    engagementScore: { type: Type.NUMBER, description: "A score from 0-100 predicting how well the content will hold a reader's attention and encourage interaction." },
    overallSummary: { type: Type.STRING, description: "A professional, 2-3 sentence summary of the content's strengths and weaknesses regarding affiliate conversion." },
    actionableRecommendations: {
      type: Type.ARRAY,
      description: "A list of specific, actionable steps the user can take to improve the content's scores and conversion potential.",
      items: { type: Type.STRING }
    },
    triggerPhrases: {
      type: Type.ARRAY,
      description: "Key phrases in the text that act as conversion triggers, categorized for analysis.",
      items: {
        type: Type.OBJECT,
        properties: {
          phrase: { type: Type.STRING, description: "The exact trigger phrase from the text." },
          strength: { type: Type.NUMBER, description: "Strength of the trigger, from 1 (subtle) to 5 (powerful)." },
          explanation: { type: Type.STRING, description: "A concise, professional explanation of why this phrase is effective and how it impacts the reader." },
          category: { type: Type.STRING, enum: ['Urgency', 'Social Proof', 'Value Proposition', 'Call to Action', 'Pain Point', 'Benefit'], description: "The psychological category of the trigger." }
        },
        required: ["phrase", "strength", "explanation", "category"]
      }
    }
  },
  required: ["trustScore", "sentiment", "readabilityScore", "clarityScore", "credibilityScore", "engagementScore", "overallSummary", "actionableRecommendations", "triggerPhrases"]
};

export const analyzeContent = async (content: string): Promise<AnalysisResult> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following content for its affiliate marketing trustworthiness. Here is the content: \n\n---\n${content}\n---`,
      config: {
        systemInstruction: `You are a world-class digital content strategist and ethical persuasion analyst. Your reputation is built on providing brutally honest, data-driven, and highly credible audits. Your clients are top-tier publications that value reader trust above all else. Your task is to analyze user-submitted content for its affiliate marketing *trustworthiness*.

Core Principles of Your Analysis:
1.  **Trust & Credibility (Primary Focus):** Scrutinize every claim. Is it backed by evidence or does it sound like unsubstantiated hype? Is the tone authoritative and helpful, or a desperate sales pitch? High scores here are paramount.
2.  **Clarity & Simplicity:** Is the message unambiguous and instantly understandable? Complexity and jargon erode trust.
3.  **Reader Engagement:** Does the content connect with the reader through genuine empathy for their pain points and a clear presentation of benefits? Avoid manipulative tactics.
4.  **Ethical Conversion:** Are Calls to Action (CTAs) transparent and compelling? Does the content build value before asking for the click?

Your output must be in the provided JSON schema. Be exacting with your scores (0-100). Your 'actionableRecommendations' must be concrete, strategic, and aimed at building long-term reader trust, not just short-term clicks. Your 'triggerPhrases' must only contain phrases found *exactly* within the provided text. The authenticity and credibility of your analysis is non-negotiable.`,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });

    const jsonString = response.text;
    const result = JSON.parse(jsonString);
    return result as AnalysisResult;
  } catch (error) {
    console.error("Error analyzing content:", error);
    throw new Error("Failed to get analysis from AI. The model may be unable to process the request. Please try again with different content.");
  }
};

export const generateABTests = async (content: string): Promise<string[]> => {
    const abTestSchema = {
        type: Type.OBJECT,
        properties: {
            variations: {
                type: Type.ARRAY,
                description: "An array of 3 improved text variations.",
                items: {
                    type: Type.STRING
                }
            }
        },
        required: ["variations"]
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Based on this content, generate 3 improved variations for affiliate marketing. Focus on stronger calls-to-action, more persuasive language, and increased credibility. \n\n---\n${content}\n---`,
            config: {
                systemInstruction: "You are an expert copywriter specializing in high-conversion, high-trust affiliate content. Generate 3 distinct variations of the user's text. Respond in JSON format according to the schema.",
                responseMimeType: "application/json",
                responseSchema: abTestSchema,
            },
        });

        const jsonString = response.text;
        const result = JSON.parse(jsonString);
        return result.variations as string[];
    } catch (error) {
        console.error("Error generating A/B tests:", error);
        throw new Error("Failed to generate A/B tests from AI.");
    }
};