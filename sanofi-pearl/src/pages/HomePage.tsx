import React from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  LinearProgress,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  TrendingUp,
  Person,
  Assignment,
  AccessTime,
  PlayArrow,
  MoreVert,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { mockPatients, mockResearchProjects } from '../data/mockData';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const quickStats = [
    { label: 'Active Patients', value: '156', trend: '+12', color: 'primary' },
    { label: 'Ongoing Research', value: '8', trend: '+2', color: 'secondary' },
    { label: 'Case Studies', value: '234', trend: '+18', color: 'success' },
    { label: 'Treatment Responses', value: '89%', trend: '+5%', color: 'info' },
  ];

  const recentPatients = mockPatients.slice(0, 3);
  const activeResearch = mockResearchProjects.filter(p => p.status === 'In Progress');

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Hero Section following design system */}
      <Box sx={{ 
        backgroundColor: 'grey.50',
        borderRadius: '1rem',
        p: { xs: 3, md: 4 },
        mb: 4,
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
        gap: 4,
        alignItems: 'center'
      }}>
        <Box>
          <Typography 
            variant="h1" 
            component="h1" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '2.25rem' },
              lineHeight: 1.25,
              color: 'grey.900'
            }}
          >
            Let's <Box component="span" sx={{ color: 'primary.main' }}>analyze</Box> ITP data
          </Typography>
          <Typography 
            variant="body1" 
            color="grey.600" 
            sx={{ 
              mb: 3,
              maxWidth: '500px',
              fontSize: '1.125rem',
              lineHeight: 1.625
            }}
          >
            Your comprehensive platform for ITP patient case analysis and research insights. 
            Discover patterns, predict treatments, and advance healthcare outcomes.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/search-patients')}
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              px: 3,
              py: 1.5,
              fontSize: '0.875rem',
              fontWeight: 500,
              '&:hover': {
                backgroundColor: 'primary.dark',
                transform: 'scale(1.02)',
              }
            }}
          >
            Start Analyzing
          </Button>
        </Box>
        
        {/* Illustration placeholder - following design system style */}
        <Box sx={{
          height: { xs: 200, md: 300 },
          backgroundColor: 'white',
          borderRadius: '1rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px solid',
          borderColor: 'grey.200',
          background: 'linear-gradient(135deg, #A78BFA 0%, #8B5CF6 50%, #6366F1 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <Box sx={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: '#FCD34D',
            opacity: 0.8
          }} />
          <Box sx={{
            position: 'absolute',
            bottom: '30%',
            right: '25%',
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: '#10B981',
            opacity: 0.8
          }} />
          <Box sx={{
            position: 'absolute',
            top: '40%',
            right: '15%',
            width: 30,
            height: 30,
            borderRadius: '50%',
            backgroundColor: '#3B82F6',
            opacity: 0.8
          }} />
          <Typography variant="h6" sx={{ color: 'white', fontWeight: 600, textAlign: 'center' }}>
            Advanced Analytics
          </Typography>
        </Box>
      </Box>

      {/* Quick Stats */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        {quickStats.map((stat, index) => (
          <Card key={index} sx={{ 
            flex: '1 1 250px', 
            minWidth: 200,
            p: 0, // Remove default padding since we set it in theme
            '&:hover': {
              transform: 'scale(1.02)',
              boxShadow: 'lg'
            }
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography variant="h4" component="div" sx={{ fontWeight: 700, mb: 1, color: 'grey.900' }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="body2" color="grey.600">
                    {stat.label}
                  </Typography>
                </Box>
                <Chip 
                  label={stat.trend} 
                  size="small" 
                  sx={{
                    backgroundColor: stat.color === 'primary' ? 'primary.main' : 
                                   stat.color === 'secondary' ? 'secondary.main' :
                                   stat.color === 'success' ? '#10B981' : '#3B82F6',
                    color: 'white',
                    fontWeight: 500
                  }}
                  icon={<TrendingUp sx={{ fontSize: 16, color: 'white' }} />}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
        {/* Recent Patients */}
        <Card sx={{ 
          flex: '1 1 400px',
          p: 0,
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 'xl'
          }
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: 'grey.900' }}>
                Recent Patients
              </Typography>
              <Button
                size="small"
                onClick={() => navigate('/search-patients')}
                endIcon={<PlayArrow />}
                sx={{
                  color: 'primary.main',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'primary.dark'
                  }
                }}
              >
                View All
              </Button>
            </Box>
            
            <List>
              {recentPatients.map((patient, index) => (
                <React.Fragment key={patient.id}>
                  <ListItem 
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'grey.50' },
                      borderRadius: '0.5rem',
                      transition: 'all 0.2s ease-in-out'
                    }}
                    onClick={() => navigate(`/patient/${patient.id}`)}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body1" sx={{ fontWeight: 600, color: 'grey.900' }}>
                          {patient.name}
                        </Typography>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="grey.600" sx={{ mb: 1 }}>
                            Age: {patient.age} • {patient.gender} • {patient.region}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Chip 
                              label={`${patient.plateletCount.toLocaleString()}/μL`} 
                              size="small" 
                              sx={{
                                backgroundColor: patient.plateletCount < 50000 ? '#FEE2E2' : '#FEF3C7',
                                color: patient.plateletCount < 50000 ? '#DC2626' : '#D97706',
                                fontWeight: 500,
                                fontSize: '0.75rem'
                              }}
                            />
                            <Chip 
                              label={patient.status} 
                              size="small" 
                              sx={{
                                backgroundColor: 'primary.light',
                                color: 'primary.dark',
                                fontWeight: 500,
                                fontSize: '0.75rem'
                              }}
                            />
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentPatients.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Active Research Projects */}
        <Card sx={{ 
          flex: '1 1 400px',
          p: 0,
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 'xl'
          }
        }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 600, color: 'grey.900' }}>
                Active Research Projects
              </Typography>
              <Button
                size="small"
                onClick={() => navigate('/trends')}
                endIcon={<PlayArrow />}
                sx={{
                  color: 'primary.main',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  '&:hover': {
                    backgroundColor: 'transparent',
                    color: 'primary.dark'
                  }
                }}
              >
                View All
              </Button>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {activeResearch.map((project) => (
                <Card key={project.id} variant="outlined" sx={{
                  p: 0,
                  backgroundColor: 'grey.50',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  borderRadius: '0.75rem',
                  '&:hover': {
                    backgroundColor: 'white',
                    borderColor: 'primary.light',
                    transform: 'translateY(-2px)',
                    boxShadow: 'md'
                  },
                  transition: 'all 0.2s ease-in-out'
                }}>
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'grey.900' }}>
                        {project.title}
                      </Typography>
                      <MoreVert sx={{ color: 'grey.500', cursor: 'pointer', fontSize: 20 }} />
                    </Box>
                    
                    <Typography variant="body2" color="grey.600" sx={{ mb: 2, lineHeight: 1.625 }}>
                      {project.description}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <AccessTime sx={{ fontSize: 16, color: 'grey.500' }} />
                      <Typography variant="caption" color="grey.500" sx={{ fontSize: '0.75rem' }}>
                        Last updated: {new Date(project.lastModified).toLocaleDateString()}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="caption" color="grey.600" sx={{ mb: 1, display: 'block', fontSize: '0.75rem', fontWeight: 500 }}>
                        Progress
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={75} 
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
                    
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <Chip 
                        label={`${project.patientIds.length} patients`} 
                        size="small" 
                        icon={<Assignment sx={{ fontSize: 14 }} />}
                        sx={{
                          backgroundColor: 'grey.100',
                          color: 'grey.700',
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      />
                      <Chip 
                        label={project.status} 
                        size="small" 
                        sx={{
                          backgroundColor: 'primary.light',
                          color: 'primary.dark',
                          fontSize: '0.75rem',
                          fontWeight: 500
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Quick Actions */}
      <Card sx={{ 
        mt: 4,
        p: 0,
        '&:hover': {
          transform: 'scale(1.01)',
          boxShadow: 'xl'
        }
      }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 600, mb: 3, color: 'grey.900' }}>
            Quick Actions
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 2 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/search-patients')}
              sx={{ 
                py: 3, 
                px: 2, 
                flexDirection: 'column', 
                gap: 1,
                minHeight: 120,
                borderColor: 'grey.200',
                color: 'grey.700',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  backgroundColor: 'primary.light',
                  transform: 'scale(1.02)',
                  boxShadow: 'md'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <Person sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'center' }}>
                Search Patients
              </Typography>
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/treatment-predictor')}
              sx={{ 
                py: 3, 
                px: 2, 
                flexDirection: 'column', 
                gap: 1,
                minHeight: 120,
                borderColor: 'grey.200',
                color: 'grey.700',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  backgroundColor: 'primary.light',
                  transform: 'scale(1.02)',
                  boxShadow: 'md'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <TrendingUp sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'center' }}>
                Treatment Predictor
              </Typography>
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/search-cases')}
              sx={{ 
                py: 3, 
                px: 2, 
                flexDirection: 'column', 
                gap: 1,
                minHeight: 120,
                borderColor: 'grey.200',
                color: 'grey.700',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  backgroundColor: 'primary.light',
                  transform: 'scale(1.02)',
                  boxShadow: 'md'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <Assignment sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'center' }}>
                Case Studies
              </Typography>
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/trends')}
              sx={{ 
                py: 3, 
                px: 2, 
                flexDirection: 'column', 
                gap: 1,
                minHeight: 120,
                borderColor: 'grey.200',
                color: 'grey.700',
                '&:hover': {
                  borderColor: 'primary.main',
                  color: 'primary.main',
                  backgroundColor: 'primary.light',
                  transform: 'scale(1.02)',
                  boxShadow: 'md'
                },
                transition: 'all 0.2s ease-in-out'
              }}
            >
              <TrendingUp sx={{ fontSize: 32, color: 'primary.main' }} />
              <Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'center' }}>
                Trend Analysis
              </Typography>
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default HomePage;
