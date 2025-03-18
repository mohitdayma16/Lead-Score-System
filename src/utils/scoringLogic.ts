import { Lead, ScoringCriteria } from '../types';
import { predictLeadScore } from './aiScoring';

export const scoringCriteria: ScoringCriteria[] = [
  {
    name: 'Company Size',
    weight: 0.2,
    score: (lead: Lead) => {
      if (lead.employeeCount >= 1000) return 100;
      if (lead.employeeCount >= 500) return 80;
      if (lead.employeeCount >= 100) return 60;
      if (lead.employeeCount >= 50) return 40;
      return 20;
    },
  },
  {
    name: 'Budget',
    weight: 0.25,
    score: (lead: Lead) => {
      if (lead.budget >= 100000) return 100;
      if (lead.budget >= 50000) return 80;
      if (lead.budget >= 25000) return 60;
      if (lead.budget >= 10000) return 40;
      return 20;
    },
  },
  {
    name: 'Timeline',
    weight: 0.15,
    score: (lead: Lead) => {
      switch (lead.timeline) {
        case 'immediate': return 100;
        case '1-3months': return 80;
        case '3-6months': return 60;
        case '6+months': return 40;
        default: return 0;
      }
    },
  },
  {
    name: 'Decision Maker',
    weight: 0.15,
    score: (lead: Lead) => lead.decisionMaker ? 100 : 50,
  },
  {
    name: 'Engagement',
    weight: 0.25,
    score: (lead: Lead) => {
      const engagementScore = 
        (lead.engagement.websiteVisits * 5) +
        (lead.engagement.downloadedResources * 15) +
        (lead.engagement.emailInteractions * 10);
      return Math.min(engagementScore, 100);
    },
  },
];

export const calculateLeadScore = async (lead: Lead): Promise<number> => {
  // Traditional scoring
  const traditionalScore = scoringCriteria.reduce((acc, criteria) => {
    return acc + (criteria.score(lead) * criteria.weight);
  }, 0);
  
  // AI-powered scoring
  const aiScore = await predictLeadScore(lead);
  
  // Combine traditional and AI scores (weighted average)
  const finalScore = Math.round((traditionalScore * 0.6) + (aiScore * 0.4));
  
  return finalScore;
};