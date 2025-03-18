import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Lead } from '../types';

interface LeadFormProps {
  onSubmit: (lead: Lead) => void;
}

export default function LeadForm({ onSubmit }: LeadFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    employeeCount: 0,
    budget: 0,
    timeline: 'immediate' as const,
    decisionMaker: false,
    websiteVisits: 0,
    downloadedResources: 0,
    emailInteractions: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newLead: Lead = {
      id: crypto.randomUUID(),
      ...formData,
      engagement: {
        websiteVisits: formData.websiteVisits,
        downloadedResources: formData.downloadedResources,
        emailInteractions: formData.emailInteractions,
      },
      createdAt: new Date(),
      score: 0,
    };
    onSubmit(newLead);
    setFormData({
      companyName: '',
      industry: '',
      employeeCount: 0,
      budget: 0,
      timeline: 'immediate',
      decisionMaker: false,
      websiteVisits: 0,
      downloadedResources: 0,
      emailInteractions: 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700">Industry</label>
          <input
            type="text"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.industry}
            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Employee Count</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.employeeCount}
            onChange={(e) => setFormData({ ...formData, employeeCount: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Budget ($)</label>
          <input
            type="number"
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.budget}
            onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Timeline</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.timeline}
            onChange={(e) => setFormData({ ...formData, timeline: e.target.value as any })}
          >
            <option value="immediate">Immediate</option>
            <option value="1-3months">1-3 Months</option>
            <option value="3-6months">3-6 Months</option>
            <option value="6+months">6+ Months</option>
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            checked={formData.decisionMaker}
            onChange={(e) => setFormData({ ...formData, decisionMaker: e.target.checked })}
          />
          <label className="ml-2 block text-sm text-gray-700">Decision Maker</label>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <h3 className="text-lg font-medium text-gray-900">Engagement Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Website Visits</label>
            <input
              type="number"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.websiteVisits}
              onChange={(e) => setFormData({ ...formData, websiteVisits: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Downloaded Resources</label>
            <input
              type="number"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.downloadedResources}
              onChange={(e) => setFormData({ ...formData, downloadedResources: parseInt(e.target.value) })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email Interactions</label>
            <input
              type="number"
              min="0"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              value={formData.emailInteractions}
              onChange={(e) => setFormData({ ...formData, emailInteractions: parseInt(e.target.value) })}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Lead
        </button>
      </div>
    </form>
  );
}