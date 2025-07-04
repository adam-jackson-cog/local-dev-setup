export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  ethnicity: string;
  region: string;
  diagnosisDate: string;
  plateletCount: number;
  medicalHistory: MedicalHistoryEntry[];
  currentTreatment: Treatment[];
  symptoms: Symptom[];
  labResults: LabResult[];
  status: 'Active' | 'Completed' | 'On Hold';
}

export interface MedicalHistoryEntry {
  id: string;
  date: string;
  condition: string;
  severity: 'Mild' | 'Moderate' | 'Severe';
  notes: string;
  physician: string;
}

export interface Treatment {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  dosage: string;
  frequency: string;
  response: 'Excellent' | 'Good' | 'Moderate' | 'Poor' | 'Unknown';
  sideEffects: string[];
}

export interface Symptom {
  id: string;
  name: string;
  severity: number; // 1-10 scale
  onset: string;
  duration: string;
  frequency: 'Daily' | 'Weekly' | 'Monthly' | 'Occasional';
}

export interface LabResult {
  id: string;
  testName: string;
  value: number;
  unit: string;
  referenceRange: string;
  date: string;
  status: 'Normal' | 'Abnormal' | 'Critical';
}

export interface CaseStudy {
  id: string;
  title: string;
  disease: string;
  company: string;
  patientDemographics: PatientDemographics;
  treatmentProtocol: string;
  outcome: string;
  duration: string;
  publicationDate: string;
  doi?: string;
  tags: string[];
}

export interface PatientDemographics {
  ageRange: string;
  gender: string;
  ethnicity: string;
  region: string;
  comorbidities: string[];
}

export interface TreatmentPrediction {
  patientId: string;
  recommendedTreatments: RecommendedTreatment[];
  confidenceScore: number;
  similarCases: SimilarCase[];
  riskFactors: string[];
}

export interface RecommendedTreatment {
  treatment: string;
  successProbability: number;
  timeToResponse: string;
  potentialSideEffects: string[];
  reasoning: string;
}

export interface SimilarCase {
  patientId: string;
  similarity: number;
  outcome: string;
  treatmentUsed: string;
  keyFactors: string[];
}

export interface ResearchProject {
  id: string;
  title: string;
  description: string;
  createdDate: string;
  lastModified: string;
  status: 'In Progress' | 'Completed' | 'Paused';
  patientIds: string[];
  findings: string[];
  collaborators: string[];
}

export interface TrendAnalysis {
  id: string;
  title: string;
  timeframe: string;
  patientCount: number;
  keyInsights: string[];
  chartData: ChartDataPoint[];
  generatedDate: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  category?: string;
  date?: string;
}

export interface SearchFilters {
  symptoms?: string[];
  region?: string[];
  ethnicity?: string[];
  ageRange?: {
    min: number;
    max: number;
  };
  gender?: string[];
  plateletRange?: {
    min: number;
    max: number;
  };
  treatmentResponse?: string[];
}
