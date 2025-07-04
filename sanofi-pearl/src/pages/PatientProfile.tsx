import React from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Avatar,
  Divider,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  Alert,
} from '@mui/material';
import {
  Person,
  LocalHospital,
  Science,
  Assessment,
} from '@mui/icons-material';
import { mockPatients } from '../data/mockData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`patient-tabpanel-${index}`}
      aria-labelledby={`patient-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const PatientProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [tabValue, setTabValue] = React.useState(0);
  
  const patient = mockPatients.find(p => p.id === id);

  if (!patient) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">Patient not found</Alert>
      </Container>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getPlateletStatus = (count: number) => {
    if (count < 20000) return { label: 'Critical', color: 'error' as const };
    if (count < 50000) return { label: 'Severe', color: 'warning' as const };
    if (count < 100000) return { label: 'Moderate', color: 'info' as const };
    return { label: 'Mild', color: 'success' as const };
  };

  const plateletStatus = getPlateletStatus(patient.plateletCount);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Patient Header */}
      <Card sx={{ 
        mb: 3,
        p: 0,
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: 'xl'
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar sx={{ 
              width: 80, 
              height: 80, 
              bgcolor: 'primary.main',
              boxShadow: 'md'
            }}>
              <Person sx={{ fontSize: 40 }} />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography variant="h4" component="h1" sx={{ 
                fontWeight: 700, 
                mb: 1, 
                color: 'grey.900',
                fontSize: { xs: '1.5rem', md: '2.25rem' }
              }}>
                {patient.name}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, mb: 2, flexWrap: 'wrap' }}>
                <Chip 
                  label={`${patient.age} years old`} 
                  sx={{ 
                    backgroundColor: 'grey.100', 
                    color: 'grey.700',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                />
                <Chip 
                  label={patient.gender} 
                  sx={{ 
                    backgroundColor: 'grey.100', 
                    color: 'grey.700',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                />
                <Chip 
                  label={patient.ethnicity} 
                  sx={{ 
                    backgroundColor: 'grey.100', 
                    color: 'grey.700',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                />
                <Chip 
                  label={patient.region} 
                  sx={{ 
                    backgroundColor: 'grey.100', 
                    color: 'grey.700',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                />
                <Chip 
                  label={patient.status} 
                  sx={{
                    backgroundColor: 'primary.light',
                    color: 'primary.dark',
                    fontWeight: 500,
                    fontSize: '0.75rem'
                  }}
                />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Typography variant="body1" color="grey.600" sx={{ fontSize: '0.875rem' }}>
                  Diagnosed: {new Date(patient.diagnosisDate).toLocaleDateString()}
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ borderColor: 'grey.300' }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="body1" color="grey.600" sx={{ fontSize: '0.875rem' }}>
                    Current Platelet Count:
                  </Typography>
                  <Chip 
                    label={`${patient.plateletCount.toLocaleString()}/μL`}
                    sx={{
                      backgroundColor: plateletStatus.color === 'error' ? '#FEE2E2' : 
                                     plateletStatus.color === 'warning' ? '#FEF3C7' :
                                     plateletStatus.color === 'info' ? '#DBEAFE' : '#D1FAE5',
                      color: plateletStatus.color === 'error' ? '#DC2626' : 
                             plateletStatus.color === 'warning' ? '#D97706' :
                             plateletStatus.color === 'info' ? '#2563EB' : '#059669',
                      fontWeight: 500,
                      fontSize: '0.75rem'
                    }}
                    size="small"
                  />
                  <Chip 
                    label={plateletStatus.label}
                    sx={{
                      backgroundColor: 'transparent',
                      color: plateletStatus.color === 'error' ? '#DC2626' : 
                             plateletStatus.color === 'warning' ? '#D97706' :
                             plateletStatus.color === 'info' ? '#2563EB' : '#059669',
                      border: '1px solid',
                      borderColor: plateletStatus.color === 'error' ? '#DC2626' : 
                                  plateletStatus.color === 'warning' ? '#D97706' :
                                  plateletStatus.color === 'info' ? '#2563EB' : '#059669',
                      fontWeight: 500,
                      fontSize: '0.75rem'
                    }}
                    size="small"
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Patient Details Tabs */}
      <Card sx={{ 
        p: 0,
        '&:hover': {
          transform: 'scale(1.005)',
          boxShadow: 'xl'
        }
      }}>
        <Box sx={{ borderBottom: 1, borderColor: 'grey.200', px: 3, pt: 2 }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            aria-label="patient details tabs"
            sx={{
              '& .MuiTab-root': {
                fontWeight: 500,
                fontSize: '0.875rem',
                color: 'grey.600',
                '&.Mui-selected': {
                  color: 'primary.main',
                  fontWeight: 600
                }
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'primary.main',
                height: 3,
                borderRadius: '9999px'
              }
            }}
          >
            <Tab label="Medical History" icon={<LocalHospital />} iconPosition="start" />
            <Tab label="Current Treatment" icon={<Science />} iconPosition="start" />
            <Tab label="Symptoms" icon={<Assessment />} iconPosition="start" />
            <Tab label="Lab Results" icon={<Assessment />} iconPosition="start" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'grey.900', mb: 3 }}>
            Medical History
          </Typography>
          <List sx={{ p: 0 }}>
            {patient.medicalHistory.map((entry, index) => (
              <ListItem 
                key={entry.id} 
                divider={index < patient.medicalHistory.length - 1}
                sx={{ 
                  px: 0,
                  py: 2,
                  '&:hover': {
                    backgroundColor: 'grey.50',
                    borderRadius: '0.5rem',
                    px: 2
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'grey.900' }}>
                        {entry.condition}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip 
                          label={entry.severity} 
                          size="small"
                          sx={{
                            backgroundColor: entry.severity === 'Severe' ? '#FEE2E2' : 
                                           entry.severity === 'Moderate' ? '#FEF3C7' : '#D1FAE5',
                            color: entry.severity === 'Severe' ? '#DC2626' : 
                                   entry.severity === 'Moderate' ? '#D97706' : '#059669',
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }}
                        />
                        <Chip 
                          label={new Date(entry.date).toLocaleDateString()} 
                          size="small" 
                          sx={{
                            backgroundColor: 'transparent',
                            color: 'grey.600',
                            border: '1px solid',
                            borderColor: 'grey.300',
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }}
                        />
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="grey.600" sx={{ mb: 1, lineHeight: 1.625 }}>
                        {entry.notes}
                      </Typography>
                      <Typography variant="caption" color="grey.500" sx={{ fontSize: '0.75rem' }}>
                        Physician: {entry.physician}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: 'grey.900', mb: 3 }}>
            Current Treatment
          </Typography>
          <List sx={{ p: 0 }}>
            {patient.currentTreatment.map((treatment, index) => (
              <ListItem 
                key={treatment.id} 
                divider={index < patient.currentTreatment.length - 1}
                sx={{ 
                  px: 0,
                  py: 2,
                  '&:hover': {
                    backgroundColor: 'grey.50',
                    borderRadius: '0.5rem',
                    px: 2
                  },
                  transition: 'all 0.2s ease-in-out'
                }}
              >
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'grey.900' }}>
                        {treatment.name}
                      </Typography>
                      <Chip 
                        label={treatment.response} 
                        size="small"
                        color={
                          treatment.response === 'Excellent' ? 'success' :
                          treatment.response === 'Good' ? 'primary' :
                          treatment.response === 'Moderate' ? 'warning' : 'error'
                        }
                      />
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>Dosage:</strong> {treatment.dosage} • <strong>Frequency:</strong> {treatment.frequency}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        <strong>Started:</strong> {new Date(treatment.startDate).toLocaleDateString()}
                        {treatment.endDate && ` • Ended: ${new Date(treatment.endDate).toLocaleDateString()}`}
                      </Typography>
                      {treatment.sideEffects.length > 0 && (
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
                          <Typography variant="caption" color="text.secondary">Side Effects:</Typography>
                          {treatment.sideEffects.map((effect, index) => (
                            <Chip key={index} label={effect} size="small" variant="outlined" color="warning" />
                          ))}
                        </Box>
                      )}
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Symptoms
          </Typography>
          <List>
            {patient.symptoms.map((symptom) => (
              <ListItem key={symptom.id} divider>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {symptom.name}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip 
                          label={`Severity: ${symptom.severity}/10`} 
                          size="small"
                          color={symptom.severity >= 7 ? 'error' : symptom.severity >= 4 ? 'warning' : 'success'}
                        />
                        <Chip label={symptom.frequency} size="small" variant="outlined" />
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Onset:</strong> {new Date(symptom.onset).toLocaleDateString()} • 
                        <strong> Duration:</strong> {symptom.duration}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Lab Results
          </Typography>
          <List>
            {patient.labResults.map((result) => (
              <ListItem key={result.id} divider>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {result.testName}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip 
                          label={result.status} 
                          size="small"
                          color={result.status === 'Normal' ? 'success' : result.status === 'Critical' ? 'error' : 'warning'}
                        />
                        <Chip label={new Date(result.date).toLocaleDateString()} size="small" variant="outlined" />
                      </Box>
                    </Box>
                  }
                  secondary={
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Value:</strong> {result.value.toLocaleString()} {result.unit} • 
                        <strong> Reference Range:</strong> {result.referenceRange}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            ))}
          </List>
        </TabPanel>
      </Card>
    </Container>
  );
};

export default PatientProfile;
