import * as tf from '@tensorflow/tfjs-layers';
import { LayersModel, sequential } from '@tensorflow/tfjs-layers';
import { Lead } from '../types';

let model: tf.LayersModel | null = null;

export async function initializeModel() {
  model = sequential({
    layers: [
      tf.layers.dense({ inputShape: [7], units: 32, activation: 'relu' }),
      tf.layers.dense({ units: 16, activation: 'relu' }),
      tf.layers.dense({ units: 1, activation: 'sigmoid' })
    ]
  });

  model.compile({
    optimizer: tf.train.adam(0.001),
    loss: 'binaryCrossentropy',
    metrics: ['accuracy']
  });

  return model;
}

export function preprocessLead(lead: Lead) {
  return tf.tensor2d([[
    lead.employeeCount / 1000, // Normalize employee count
    lead.budget / 100000, // Normalize budget
    lead.timeline === 'immediate' ? 1 : 
      lead.timeline === '1-3months' ? 0.75 :
      lead.timeline === '3-6months' ? 0.5 : 0.25,
    lead.decisionMaker ? 1 : 0,
    lead.engagement.websiteVisits / 20, // Normalize visits
    lead.engagement.downloadedResources / 10, // Normalize downloads
    lead.engagement.emailInteractions / 15 // Normalize email interactions
  ]]);
}

export async function predictLeadScore(lead: Lead): Promise<number> {
  if (!model) {
    await initializeModel();
  }

  const inputTensor = preprocessLead(lead);
  const prediction = model!.predict(inputTensor) as tf.Tensor;
  const score = (await prediction.data())[0] * 100;
  
  // Cleanup tensors
  inputTensor.dispose();
  prediction.dispose();

  return Math.round(score);
}

export async function trainModel(historicalLeads: Lead[]) {
  if (!model) {
    await initializeModel();
  }

  const trainingData = historicalLeads.map(lead => preprocessLead(lead));
  const trainingLabels = historicalLeads.map(lead => 
    tf.tensor2d([[lead.score / 100]])
  );

  const xs = tf.concat(trainingData);
  const ys = tf.concat(trainingLabels);

  await model!.fit(xs, ys, {
    epochs: 50,
    batchSize: 32,
    validationSplit: 0.2
  });

  // Cleanup tensors
  xs.dispose();
  ys.dispose();
  trainingData.forEach(t => t.dispose());
  trainingLabels.forEach(t => t.dispose());
}