export interface Lead {
  id: string;
  companyName: string;
  industry: string;
  employeeCount: number;
  budget: number;
  timeline: 'immediate' | '1-3months' | '3-6months' | '6+months';
  decisionMaker: boolean;
  engagement: {
    websiteVisits: number;
    downloadedResources: number;
    emailInteractions: number;
  };
  createdAt: Date;
  score: number;
  aiScore?: number;
  conversionProbability?: number;
  nextActionRecommendation?: string;
  sentimentScore?: number;
}

export interface ScoringCriteria {
  name: string;
  weight: number;
  score: (lead: Lead) => number;
}

export interface AIRecommendation {
  nextBestAction: string;
  optimalContactTime: string;
  personalizedTemplate: string;
  confidenceScore: number;
}