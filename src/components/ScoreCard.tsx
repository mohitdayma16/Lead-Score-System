import React from 'react';
import { Lead } from '../types';
import { scoringCriteria } from '../utils/scoringLogic';

interface ScoreCardProps {
  lead: Lead;
}

export default function ScoreCard({ lead }: ScoreCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-100 text-green-800';
    if (score >= 60) return 'bg-yellow-100 text-yellow-800';
    return 'bg-red-100 text-red-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{lead.companyName}</h3>
          <p className="text-sm text-gray-500">{lead.industry}</p>
        </div>
        <div className={`px-4 py-2 rounded-full ${getScoreColor(lead.score)}`}>
          <span className="font-semibold">{lead.score}</span>
        </div>
      </div>

      <div className="space-y-4">
        {scoringCriteria.map((criteria) => {
          const criteriaScore = criteria.score(lead);
          return (
            <div key={criteria.name} className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">{criteria.name}</span>
              <div className="flex items-center">
                <div className="w-32 h-2 bg-gray-200 rounded-full mr-2">
                  <div
                    className="h-full bg-blue-600 rounded-full"
                    style={{ width: `${criteriaScore}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600">{criteriaScore}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm font-medium text-gray-500">Employees</dt>
            <dd className="mt-1 text-sm text-gray-900">{lead.employeeCount}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Budget</dt>
            <dd className="mt-1 text-sm text-gray-900">${lead.budget.toLocaleString()}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Timeline</dt>
            <dd className="mt-1 text-sm text-gray-900">{lead.timeline}</dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-gray-500">Decision Maker</dt>
            <dd className="mt-1 text-sm text-gray-900">{lead.decisionMaker ? 'Yes' : 'No'}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}