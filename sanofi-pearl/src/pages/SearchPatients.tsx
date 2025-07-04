import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  TextField,
  Button,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
} from '@mui/material';
import {
  Search,
  Person,
  FilterList,
  ExpandMore,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { mockPatients } from '../data/mockData';
import { Patient, SearchFilters } from '../types';

const SearchPatients: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<SearchFilters>({});
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>(mockPatients);

  const symptoms = ['Petechiae', 'Easy bruising', 'Bleeding gums', 'Fatigue', 'Nosebleeds'];
  const regions = ['North America', 'Europe', 'Asia Pacific', 'South America', 'Africa'];
  const ethnicities = ['Caucasian', 'Asian', 'Hispanic', 'African American', 'Middle Eastern'];
  const genders = ['Male', 'Female', 'Other'];

  const handleSearch = () => {
    let results = mockPatients;

    // Filter by search term (name)
    if (searchTerm) {
      results = results.filter(patient => 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by symptoms
    if (filters.symptoms && filters.symptoms.length > 0) {
      results = results.filter(patient =>
        patient.symptoms.some(symptom =>
          filters.symptoms?.includes(symptom.name)
        )
      );
    }

    // Filter by region
    if (filters.region && filters.region.length > 0) {
      results = results.filter(patient =>
        filters.region?.includes(patient.region)
      );
    }

    // Filter by ethnicity
    if (filters.ethnicity && filters.ethnicity.length > 0) {
      results = results.filter(patient =>
        filters.ethnicity?.includes(patient.ethnicity)
      );
    }

    // Filter by gender
    if (filters.gender && filters.gender.length > 0) {
      results = results.filter(patient =>
        filters.gender?.includes(patient.gender)
      );
    }

    // Filter by age range
    if (filters.ageRange) {
      results = results.filter(patient =>
        patient.age >= filters.ageRange!.min && patient.age <= filters.ageRange!.max
      );
    }

    // Filter by platelet range
    if (filters.plateletRange) {
      results = results.filter(patient =>
        patient.plateletCount >= filters.plateletRange!.min && 
        patient.plateletCount <= filters.plateletRange!.max
      );
    }

    setFilteredPatients(results);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({});
    setFilteredPatients(mockPatients);
  };

  const getPlateletStatus = (count: number) => {
    if (count < 20000) return { label: 'Critical', color: 'error' as const };
    if (count < 50000) return { label: 'Severe', color: 'warning' as const };
    if (count < 100000) return { label: 'Moderate', color: 'info' as const };
    return { label: 'Mild', color: 'success' as const };
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
          Let's <Box component="span" sx={{ color: 'primary.main' }}>search</Box> patient data
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
          Find and analyze patient cases based on symptoms, demographics, and clinical parameters
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Search and Filters */}
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
              Search & Filters
            </Typography>

            {/* Search Bar */}
            <TextField
              fullWidth
              label="Search by patient name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: '0.5rem',
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: 2,
                  }
                }
              }}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'grey.500' }} />,
              }}
            />

            {/* Advanced Filters */}
            <Accordion sx={{ 
              boxShadow: 'none',
              border: '1px solid',
              borderColor: 'grey.200',
              borderRadius: '0.5rem',
              '&:before': { display: 'none' }
            }}>
              <AccordionSummary 
                expandIcon={<ExpandMore />}
                sx={{
                  backgroundColor: 'grey.50',
                  borderRadius: '0.5rem',
                  '&.Mui-expanded': {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0
                  }
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FilterList />
                  <Typography>Advanced Filters</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Symptoms Filter */}
                  <FormControl fullWidth>
                    <InputLabel>Symptoms</InputLabel>
                    <Select
                      multiple
                      value={filters.symptoms || []}
                      onChange={(e) => setFilters({...filters, symptoms: e.target.value as string[]})}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {symptoms.map((symptom) => (
                        <MenuItem key={symptom} value={symptom}>
                          {symptom}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Region Filter */}
                  <FormControl fullWidth>
                    <InputLabel>Region</InputLabel>
                    <Select
                      multiple
                      value={filters.region || []}
                      onChange={(e) => setFilters({...filters, region: e.target.value as string[]})}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {regions.map((region) => (
                        <MenuItem key={region} value={region}>
                          {region}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Ethnicity Filter */}
                  <FormControl fullWidth>
                    <InputLabel>Ethnicity</InputLabel>
                    <Select
                      multiple
                      value={filters.ethnicity || []}
                      onChange={(e) => setFilters({...filters, ethnicity: e.target.value as string[]})}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {ethnicities.map((ethnicity) => (
                        <MenuItem key={ethnicity} value={ethnicity}>
                          {ethnicity}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Gender Filter */}
                  <FormControl fullWidth>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      multiple
                      value={filters.gender || []}
                      onChange={(e) => setFilters({...filters, gender: e.target.value as string[]})}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} size="small" />
                          ))}
                        </Box>
                      )}
                    >
                      {genders.map((gender) => (
                        <MenuItem key={gender} value={gender}>
                          {gender}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Age Range */}
                  <Box>
                    <Typography gutterBottom>Age Range</Typography>
                    <Slider
                      value={[filters.ageRange?.min || 0, filters.ageRange?.max || 100]}
                      onChange={(_, newValue) => 
                        setFilters({
                          ...filters, 
                          ageRange: { 
                            min: (newValue as number[])[0], 
                            max: (newValue as number[])[1] 
                          }
                        })
                      }
                      valueLabelDisplay="auto"
                      min={0}
                      max={100}
                    />
                  </Box>

                  {/* Platelet Count Range */}
                  <Box>
                    <Typography gutterBottom>Platelet Count Range (/μL)</Typography>
                    <Slider
                      value={[filters.plateletRange?.min || 0, filters.plateletRange?.max || 500000]}
                      onChange={(_, newValue) => 
                        setFilters({
                          ...filters, 
                          plateletRange: { 
                            min: (newValue as number[])[0], 
                            max: (newValue as number[])[1] 
                          }
                        })
                      }
                      valueLabelDisplay="auto"
                      min={0}
                      max={500000}
                      step={5000}
                    />
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                onClick={handleSearch}
                startIcon={<Search />}
                fullWidth
              >
                Search
              </Button>
              <Button
                variant="outlined"
                onClick={clearFilters}
                fullWidth
              >
                Clear
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Results */}
        <Card sx={{ flex: '2 1 500px' }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Search Results
              </Typography>
              <Chip 
                label={`${filteredPatients.length} patients found`}
                color="primary"
              />
            </Box>

            <List>
              {filteredPatients.map((patient) => {
                const plateletStatus = getPlateletStatus(patient.plateletCount);
                return (
                  <ListItem 
                    key={patient.id}
                    sx={{ 
                      cursor: 'pointer',
                      '&:hover': { backgroundColor: 'action.hover' },
                      borderRadius: 1,
                      mb: 1,
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                    onClick={() => navigate(`/patient/${patient.id}`)}
                  >
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        <Person />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                            {patient.name}
                          </Typography>
                          <Chip 
                            label={patient.status} 
                            size="small" 
                            color="primary"
                            variant="outlined"
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {patient.age} years • {patient.gender} • {patient.ethnicity} • {patient.region}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Diagnosed: {new Date(patient.diagnosisDate).toLocaleDateString()}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                            <Chip 
                              label={`${patient.plateletCount.toLocaleString()}/μL`} 
                              size="small" 
                              color={plateletStatus.color}
                            />
                            <Chip 
                              label={plateletStatus.label} 
                              size="small" 
                              color={plateletStatus.color}
                              variant="outlined"
                            />
                            {patient.symptoms.slice(0, 2).map((symptom) => (
                              <Chip 
                                key={symptom.id}
                                label={symptom.name} 
                                size="small" 
                                variant="outlined"
                              />
                            ))}
                            {patient.symptoms.length > 2 && (
                              <Chip 
                                label={`+${patient.symptoms.length - 2} more`} 
                                size="small" 
                                variant="outlined"
                                color="info"
                              />
                            )}
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                );
              })}
            </List>

            {filteredPatients.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No patients found matching your search criteria.
                </Typography>
                <Button onClick={clearFilters} sx={{ mt: 2 }}>
                  Clear filters to see all patients
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SearchPatients;
