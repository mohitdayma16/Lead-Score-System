import React, { useState } from 'react';
import { Lead } from './types';
import LeadForm from './components/LeadForm';
import ScoreCard from './components/ScoreCard';
import { calculateLeadScore } from './utils/scoringLogic';
import { GaugeCircle } from 'lucide-react';

function App() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const handleLeadSubmit = async (lead: Lead) => {
    const score = await calculateLeadScore(lead);
    const scoredLead = {
      ...lead,
      score
    };
    setLeads(prev => [...prev, scoredLead]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <GaugeCircle className="h-8 w-8 text-blue-600" />
            <h1 className="ml-3 text-2xl font-bold text-gray-900">Lead Scoring System</h1>
          </div>
          <div className="text-sm text-gray-500">
            {leads.length} Lead{leads.length !== 1 ? 's' : ''} Scored
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Lead</h2>
            <LeadForm onSubmit={handleLeadSubmit} />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Leads</h2>
            <div className="space-y-6">
              {leads.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <p className="text-gray-500">No leads scored yet. Add your first lead to get started!</p>
                </div>
              ) : (
                leads
                  .sort((a, b) => b.score - a.score)
                  .map(lead => (
                    <ScoreCard key={lead.id} lead={lead} />
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;