import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  Alert,
  Divider,
} from '@mui/material';
import {
  PsychologyAlt,
  Person,
  CheckCircle,
} from '@mui/icons-material';
import { mockPatients } from '../data/mockData';
import { TreatmentPrediction } from '../types';

const TreatmentPredictor: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [prediction, setPrediction] = useState<TreatmentPrediction | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Mock prediction data - in real app this would come from ML model
  const mockPrediction: TreatmentPrediction = {
    patientId: 'PAT001',
    confidenceScore: 85,
    recommendedTreatments: [
      {
        treatment: 'Eltrombopag',
        successProbability: 78,
        timeToResponse: '2-4 weeks',
        potentialSideEffects: ['Mild nausea', 'Headache', 'Fatigue'],
        reasoning: 'Based on similar cases with moderate ITP and patient demographics. High success rate in Caucasian females aged 30-40.'
      },
      {
        treatment: 'Rituximab',
        successProbability: 65,
        timeToResponse: '4-8 weeks',
        potentialSideEffects: ['Infusion reactions', 'Increased infection risk', 'Fatigue'],
        reasoning: 'Good alternative option with sustained response potential. Effective in patients with chronic ITP.'
      },
      {
        treatment: 'Prednisone (continued)',
        successProbability: 45,
        timeToResponse: '1-2 weeks',
        potentialSideEffects: ['Weight gain', 'Mood changes', 'Bone density loss'],
        reasoning: 'Current treatment showing partial response. May need dose adjustment or combination therapy.'
      }
    ],
    similarCases: [
      {
        patientId: 'PAT002',
        similarity: 92,
        outcome: 'Excellent response to Eltrombopag',
        treatmentUsed: 'Eltrombopag 50mg daily',
        keyFactors: ['Similar age', 'Geographic region', 'Platelet count range']
      },
      {
        patientId: 'PAT003',
        similarity: 78,
        outcome: 'Good response to combination therapy',
        treatmentUsed: 'Prednisone + IVIG',
        keyFactors: ['Similar symptoms', 'Gender', 'Disease severity']
      }
    ],
    riskFactors: [
      'Low platelet count (<30,000/μL)',
      'Recent bleeding episodes',
      'Age factor may affect treatment response',
      'Consider pregnancy planning if applicable'
    ]
  };

  const handleAnalyze = async () => {
    if (!selectedPatient) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      setPrediction({
        ...mockPrediction,
        patientId: selectedPatient
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSuccessColor = (probability: number) => {
    if (probability >= 70) return 'success';
    if (probability >= 50) return 'warning';
    return 'error';
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header Section */}
      <Box sx={{ 
        backgroundColor: 'grey.50',
        borderRadius: '1rem',
        p: { xs: 3, md: 4 },
        mb: 4,
        textAlign: 'center'
      }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 700,
            color: 'grey.900',
            fontSize: { xs: '1.875rem', md: '2.25rem' }
          }}
        >
          Let's <Box component="span" sx={{ color: 'primary.main' }}>predict</Box> treatment outcomes
        </Typography>
        <Typography 
          variant="body1" 
          color="grey.600" 
          sx={{ 
            maxWidth: '600px',
            mx: 'auto',
            fontSize: '1.125rem',
            lineHeight: 1.625
          }}
        >
          AI-powered treatment recommendations based on similar patient cases and clinical outcomes
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Patient Selection */}
        <Card sx={{ 
          flex: '1 1 300px', 
          maxWidth: 400,
          p: 0,
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 'lg'
          }
        }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'grey.900', mb: 3 }}>
              Select Patient
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Choose Patient</InputLabel>
              <Select
                value={selectedPatient}
                onChange={(e) => setSelectedPatient(e.target.value)}
                sx={{
                  borderRadius: '0.5rem',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: 2,
                  }
                }}
              >
                {mockPatients.map((patient) => (
                  <MenuItem key={patient.id} value={patient.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Avatar sx={{ width: 24, height: 24, bgcolor: 'primary.main' }}>
                        <Person sx={{ fontSize: 14 }} />
                      </Avatar>
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>{patient.name}</Typography>
                        <Typography variant="caption" color="grey.600">
                          {patient.age}y • {patient.plateletCount.toLocaleString()}/μL
                        </Typography>
                      </Box>
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {selectedPatient && (
              <Box sx={{ mb: 3 }}>
                {(() => {
                  const patient = mockPatients.find(p => p.id === selectedPatient);
                  return patient ? (
                    <Card variant="outlined">
                      <CardContent sx={{ py: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>Patient Summary</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {patient.name} • {patient.age} years • {patient.gender}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Current platelet count: {patient.plateletCount.toLocaleString()}/μL
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          {patient.currentTreatment.slice(0, 2).map((treatment) => (
                            <Chip 
                              key={treatment.id}
                              label={treatment.name} 
                              size="small" 
                              sx={{ mr: 1, mb: 1 }}
                            />
                          ))}
                        </Box>
                      </CardContent>
                    </Card>
                  ) : null;
                })()}
              </Box>
            )}

            <Button
              variant="contained"
              onClick={handleAnalyze}
              disabled={!selectedPatient || isAnalyzing}
              startIcon={<PsychologyAlt />}
              fullWidth
              size="large"
              sx={{
                backgroundColor: 'primary.main',
                color: 'white',
                py: 1.5,
                fontSize: '0.875rem',
                fontWeight: 500,
                '&:hover': {
                  backgroundColor: 'primary.dark',
                  transform: 'scale(1.02)',
                },
                '&:disabled': {
                  backgroundColor: 'grey.300',
                  color: 'grey.500'
                }
              }}
            >
              {isAnalyzing ? 'Analyzing...' : 'Analyze Treatment Options'}
            </Button>

            {isAnalyzing && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="grey.600" gutterBottom sx={{ fontSize: '0.875rem' }}>
                  AI is analyzing patient data and comparing with similar cases...
                </Typography>
                <LinearProgress 
                  sx={{
                    height: 6,
                    borderRadius: '9999px',
                    backgroundColor: 'grey.200',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: 'primary.main'
                    }
                  }}
                />
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Prediction Results */}
        {prediction && !isAnalyzing && (
          <Card sx={{ flex: '2 1 600px' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Treatment Recommendations
                </Typography>
                <Chip 
                  label={`${prediction.confidenceScore}% Confidence`}
                  color="primary"
                  icon={<CheckCircle />}
                />
              </Box>

              {/* Recommended Treatments */}
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mt: 3 }}>
                Recommended Treatments (Ranked by Success Probability)
              </Typography>
              
              <List>
                {prediction.recommendedTreatments.map((treatment, index) => (
                  <ListItem key={index} divider>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {index + 1}. {treatment.treatment}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <Chip 
                              label={`${treatment.successProbability}% success`}
                              size="small"
                              color={getSuccessColor(treatment.successProbability) as any}
                            />
                            <Chip 
                              label={treatment.timeToResponse}
                              size="small"
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {treatment.reasoning}
                          </Typography>
                          
                          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                            Potential Side Effects:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                            {treatment.potentialSideEffects.map((effect, idx) => (
                              <Chip 
                                key={idx}
                                label={effect} 
                                size="small" 
                                variant="outlined"
                                color="warning"
                              />
                            ))}
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 3 }} />

              {/* Similar Cases */}
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Similar Patient Cases
              </Typography>
              
              <List>
                {prediction.similarCases.map((case_, index) => (
                  <ListItem key={index} divider>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="subtitle2">
                            Patient {case_.patientId}
                          </Typography>
                          <Chip 
                            label={`${case_.similarity}% similar`}
                            size="small"
                            color="info"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <strong>Treatment:</strong> {case_.treatmentUsed}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            <strong>Outcome:</strong> {case_.outcome}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {case_.keyFactors.map((factor, idx) => (
                              <Chip 
                                key={idx}
                                label={factor} 
                                size="small" 
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                ))}
              </List>

              <Divider sx={{ my: 3 }} />

              {/* Risk Factors */}
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Risk Factors & Considerations
              </Typography>
              
              <Alert severity="warning" sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                  Important Considerations:
                </Typography>
                <List dense>
                  {prediction.riskFactors.map((factor, index) => (
                    <ListItem key={index} sx={{ py: 0 }}>
                      <ListItemText 
                        primary={
                          <Typography variant="body2">
                            • {factor}
                          </Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Alert>

              <Alert severity="info">
                <Typography variant="body2">
                  <strong>Disclaimer:</strong> These recommendations are based on AI analysis of similar cases 
                  and should be used as a clinical decision support tool. Always consider individual patient 
                  factors and consult current treatment guidelines.
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  );
};

export default TreatmentPredictor;
