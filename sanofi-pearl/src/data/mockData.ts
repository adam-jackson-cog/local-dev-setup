import { Patient, CaseStudy, ResearchProject, TrendAnalysis } from '../types';

export const mockPatients: Patient[] = [
  {
    id: 'PAT001',
    name: 'Sarah Johnson',
    age: 34,
    gender: 'Female',
    ethnicity: 'Caucasian',
    region: 'North America',
    diagnosisDate: '2024-01-15',
    plateletCount: 25000,
    status: 'Active',
    medicalHistory: [
      {
        id: 'MH001',
        date: '2024-01-15',
        condition: 'ITP Diagnosis',
        severity: 'Severe',
        notes: 'Significant bleeding during menstrual cycle, petechiae on arms and legs',
        physician: 'Dr. Emily Chen'
      },
      {
        id: 'MH002',
        date: '2023-06-20',
        condition: 'Viral Infection',
        severity: 'Mild',
        notes: 'Upper respiratory infection, resolved with supportive care',
        physician: 'Dr. Michael Ross'
      }
    ],
    currentTreatment: [
      {
        id: 'T001',
        name: 'Prednisone',
        startDate: '2024-01-16',
        dosage: '60mg',
        frequency: 'Daily',
        response: 'Good',
        sideEffects: ['Weight gain', 'Mood changes']
      }
    ],
    symptoms: [
      {
        id: 'S001',
        name: 'Petechiae',
        severity: 7,
        onset: '2024-01-10',
        duration: 'Ongoing',
        frequency: 'Daily'
      },
      {
        id: 'S002',
        name: 'Easy bruising',
        severity: 6,
        onset: '2024-01-05',
        duration: 'Ongoing',
        frequency: 'Daily'
      }
    ],
    labResults: [
      {
        id: 'L001',
        testName: 'Platelet Count',
        value: 25000,
        unit: '/μL',
        referenceRange: '150,000-400,000',
        date: '2024-01-15',
        status: 'Critical'
      },
      {
        id: 'L002',
        testName: 'Hemoglobin',
        value: 10.2,
        unit: 'g/dL',
        referenceRange: '12.0-15.5',
        date: '2024-01-15',
        status: 'Abnormal'
      }
    ]
  },
  {
    id: 'PAT002',
    name: 'Michael Chang',
    age: 42,
    gender: 'Male',
    ethnicity: 'Asian',
    region: 'Asia Pacific',
    diagnosisDate: '2023-08-20',
    plateletCount: 85000,
    status: 'Active',
    medicalHistory: [
      {
        id: 'MH003',
        date: '2023-08-20',
        condition: 'ITP Diagnosis',
        severity: 'Moderate',
        notes: 'Chronic ITP, stable platelet count with treatment',
        physician: 'Dr. Yuki Tanaka'
      }
    ],
    currentTreatment: [
      {
        id: 'T002',
        name: 'Eltrombopag',
        startDate: '2023-09-01',
        dosage: '50mg',
        frequency: 'Daily',
        response: 'Excellent',
        sideEffects: ['Mild nausea']
      }
    ],
    symptoms: [
      {
        id: 'S003',
        name: 'Fatigue',
        severity: 4,
        onset: '2023-08-15',
        duration: 'Intermittent',
        frequency: 'Weekly'
      }
    ],
    labResults: [
      {
        id: 'L003',
        testName: 'Platelet Count',
        value: 85000,
        unit: '/μL',
        referenceRange: '150,000-400,000',
        date: '2024-06-20',
        status: 'Abnormal'
      }
    ]
  },
  {
    id: 'PAT003',
    name: 'Emma Rodriguez',
    age: 28,
    gender: 'Female',
    ethnicity: 'Hispanic',
    region: 'South America',
    diagnosisDate: '2024-03-10',
    plateletCount: 45000,
    status: 'Active',
    medicalHistory: [
      {
        id: 'MH004',
        date: '2024-03-10',
        condition: 'ITP Diagnosis',
        severity: 'Moderate',
        notes: 'Pregnancy-related ITP, requires careful monitoring',
        physician: 'Dr. Carlos Mendez'
      }
    ],
    currentTreatment: [
      {
        id: 'T003',
        name: 'IVIG',
        startDate: '2024-03-12',
        dosage: '1g/kg',
        frequency: 'Monthly',
        response: 'Moderate',
        sideEffects: ['Headache', 'Fatigue']
      }
    ],
    symptoms: [
      {
        id: 'S004',
        name: 'Bleeding gums',
        severity: 5,
        onset: '2024-03-05',
        duration: 'Intermittent',
        frequency: 'Daily'
      }
    ],
    labResults: [
      {
        id: 'L004',
        testName: 'Platelet Count',
        value: 45000,
        unit: '/μL',
        referenceRange: '150,000-400,000',
        date: '2024-06-15',
        status: 'Critical'
      }
    ]
  }
];

export const mockCaseStudies: CaseStudy[] = [
  {
    id: 'CS001',
    title: 'Efficacy of Eltrombopag in Chronic ITP: 5-Year Follow-up',
    disease: 'ITP',
    company: 'Novartis',
    patientDemographics: {
      ageRange: '18-65',
      gender: 'Mixed',
      ethnicity: 'Mixed',
      region: 'Global',
      comorbidities: ['Diabetes', 'Hypertension']
    },
    treatmentProtocol: 'Eltrombopag 25-75mg daily, dose adjusted based on platelet response',
    outcome: '78% of patients achieved platelet count >50,000/μL',
    duration: '5 years',
    publicationDate: '2024-05-15',
    doi: '10.1001/jama.2024.001',
    tags: ['Eltrombopag', 'Chronic ITP', 'Long-term follow-up']
  },
  {
    id: 'CS002',
    title: 'Rituximab as Second-line Therapy in ITP',
    disease: 'ITP',
    company: 'Roche',
    patientDemographics: {
      ageRange: '25-70',
      gender: 'Mixed',
      ethnicity: 'Caucasian, Asian',
      region: 'Europe, Asia',
      comorbidities: ['Autoimmune conditions']
    },
    treatmentProtocol: 'Rituximab 375mg/m² weekly for 4 weeks',
    outcome: '65% sustained response at 12 months',
    duration: '2 years',
    publicationDate: '2024-03-20',
    doi: '10.1182/blood.2024.002',
    tags: ['Rituximab', 'Second-line', 'Sustained response']
  },
  {
    id: 'CS003',
    title: 'Fostamatinib in Refractory ITP Patients',
    disease: 'ITP',
    company: 'Rigel Pharmaceuticals',
    patientDemographics: {
      ageRange: '30-75',
      gender: 'Mixed',
      ethnicity: 'Mixed',
      region: 'North America',
      comorbidities: ['Previous treatment failures']
    },
    treatmentProtocol: 'Fostamatinib 100mg twice daily, increased to 150mg if needed',
    outcome: '43% achieved stable platelet response',
    duration: '18 months',
    publicationDate: '2024-01-10',
    doi: '10.1056/nejm.2024.003',
    tags: ['Fostamatinib', 'Refractory ITP', 'Novel mechanism']
  }
];

export const mockResearchProjects: ResearchProject[] = [
  {
    id: 'RP001',
    title: 'Predictive Factors for Treatment Response in Newly Diagnosed ITP',
    description: 'Analyzing patient characteristics and biomarkers that predict response to first-line corticosteroid therapy',
    createdDate: '2024-04-01',
    lastModified: '2024-06-20',
    status: 'In Progress',
    patientIds: ['PAT001', 'PAT003'],
    findings: [
      'Younger patients show better initial response to corticosteroids',
      'Platelet count below 20,000/μL associated with slower response',
      'Presence of anti-platelet antibodies correlates with treatment resistance'
    ],
    collaborators: ['Dr. Emily Chen', 'Dr. Sarah Mitchell', 'Dr. James Wilson']
  },
  {
    id: 'RP002',
    title: 'Long-term Outcomes of TPO Receptor Agonists',
    description: 'Multi-center study tracking long-term safety and efficacy of TPO receptor agonists in chronic ITP',
    createdDate: '2024-02-15',
    lastModified: '2024-06-18',
    status: 'In Progress',
    patientIds: ['PAT002'],
    findings: [
      'Sustained platelet response maintained in 70% of patients at 3 years',
      'Quality of life improvements sustained long-term',
      'Low incidence of bone marrow fibrosis with prolonged use'
    ],
    collaborators: ['Dr. Yuki Tanaka', 'Dr. Maria Santos', 'Dr. Robert Kim']
  }
];

export const mockTrendAnalysis: TrendAnalysis[] = [
  {
    id: 'TA001',
    title: 'Treatment Response Patterns by Age Group',
    timeframe: 'Last 2 Years',
    patientCount: 150,
    keyInsights: [
      'Patients under 40 show 85% response rate to first-line therapy',
      'Response rates decrease with age, particularly after 60',
      'TPO receptor agonists show consistent efficacy across all age groups'
    ],
    chartData: [
      { label: '18-30', value: 89, category: 'response_rate' },
      { label: '31-40', value: 82, category: 'response_rate' },
      { label: '41-50', value: 75, category: 'response_rate' },
      { label: '51-60', value: 68, category: 'response_rate' },
      { label: '60+', value: 58, category: 'response_rate' }
    ],
    generatedDate: '2024-06-20'
  },
  {
    id: 'TA002',
    title: 'Regional Treatment Preferences',
    timeframe: 'Current Year',
    patientCount: 200,
    keyInsights: [
      'North America favors TPO receptor agonists as second-line therapy',
      'Europe shows higher use of rituximab',
      'Asia-Pacific regions show preference for combination therapies'
    ],
    chartData: [
      { label: 'North America', value: 45, category: 'tpo_agonists' },
      { label: 'Europe', value: 32, category: 'tpo_agonists' },
      { label: 'Asia-Pacific', value: 28, category: 'tpo_agonists' },
      { label: 'North America', value: 25, category: 'rituximab' },
      { label: 'Europe', value: 42, category: 'rituximab' },
      { label: 'Asia-Pacific', value: 18, category: 'rituximab' }
    ],
    generatedDate: '2024-06-22'
  }
];
