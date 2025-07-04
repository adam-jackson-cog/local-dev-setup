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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Search,
  FilterList,
  ExpandMore,
  Business,
  CalendarToday,
  Group,
  Assignment,
} from '@mui/icons-material';
import { mockCaseStudies } from '../data/mockData';
import { CaseStudy } from '../types';

const SearchCaseStudies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [diseaseFilter, setDiseaseFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [filteredCases, setFilteredCases] = useState<CaseStudy[]>(mockCaseStudies);

  const diseases = ['ITP', 'Thrombocytopenia', 'Autoimmune disorders'];
  const companies = ['Novartis', 'Roche', 'Rigel Pharmaceuticals', 'Amgen', 'Pfizer'];

  const handleSearch = () => {
    let results = mockCaseStudies;

    // Filter by search term
    if (searchTerm) {
      results = results.filter(case_ => 
        case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.treatmentProtocol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        case_.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by disease
    if (diseaseFilter) {
      results = results.filter(case_ => case_.disease === diseaseFilter);
    }

    // Filter by company
    if (companyFilter) {
      results = results.filter(case_ => case_.company === companyFilter);
    }

    setFilteredCases(results);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDiseaseFilter('');
    setCompanyFilter('');
    setFilteredCases(mockCaseStudies);
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Case Studies Database
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Search and analyze published case studies, clinical trials, and research data
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
        {/* Search and Filters */}
        <Card sx={{ flex: '1 1 300px', maxWidth: 400 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Search & Filters
            </Typography>

            {/* Search Bar */}
            <TextField
              fullWidth
              label="Search case studies"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
              }}
              placeholder="Search by title, treatment, or keywords..."
            />

            {/* Filters */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <FilterList />
                  <Typography>Filters</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {/* Disease Filter */}
                  <FormControl fullWidth>
                    <InputLabel>Disease</InputLabel>
                    <Select
                      value={diseaseFilter}
                      onChange={(e) => setDiseaseFilter(e.target.value)}
                    >
                      <MenuItem value="">All Diseases</MenuItem>
                      {diseases.map((disease) => (
                        <MenuItem key={disease} value={disease}>
                          {disease}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Company Filter */}
                  <FormControl fullWidth>
                    <InputLabel>Company</InputLabel>
                    <Select
                      value={companyFilter}
                      onChange={(e) => setCompanyFilter(e.target.value)}
                    >
                      <MenuItem value="">All Companies</MenuItem>
                      {companies.map((company) => (
                        <MenuItem key={company} value={company}>
                          {company}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
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
                Case Studies
              </Typography>
              <Chip 
                label={`${filteredCases.length} studies found`}
                color="primary"
              />
            </Box>

            <List>
              {filteredCases.map((case_, index) => (
                <React.Fragment key={case_.id}>
                  <ListItem sx={{ px: 0, py: 2 }}>
                    <ListItemText
                      primary={
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                            {case_.title}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                            <Chip 
                              icon={<Assignment />}
                              label={case_.disease} 
                              size="small" 
                              color="primary"
                            />
                            <Chip 
                              icon={<Business />}
                              label={case_.company} 
                              size="small" 
                              variant="outlined"
                            />
                            <Chip 
                              icon={<CalendarToday />}
                              label={new Date(case_.publicationDate).toLocaleDateString()} 
                              size="small" 
                              variant="outlined"
                            />
                          </Box>
                        </Box>
                      }
                      secondary={
                        <Box>
                          {/* Patient Demographics */}
                          <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                              Patient Demographics
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                              <Chip 
                                icon={<Group />}
                                label={`Age: ${case_.patientDemographics.ageRange}`} 
                                size="small"
                              />
                              <Chip 
                                label={case_.patientDemographics.gender} 
                                size="small"
                              />
                              <Chip 
                                label={case_.patientDemographics.ethnicity} 
                                size="small"
                              />
                              <Chip 
                                label={case_.patientDemographics.region} 
                                size="small"
                              />
                            </Box>
                            {case_.patientDemographics.comorbidities.length > 0 && (
                              <Box>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                  Comorbidities:
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 0.5 }}>
                                  {case_.patientDemographics.comorbidities.map((comorbidity, idx) => (
                                    <Chip 
                                      key={idx}
                                      label={comorbidity} 
                                      size="small" 
                                      variant="outlined"
                                      color="warning"
                                    />
                                  ))}
                                </Box>
                              </Box>
                            )}
                          </Card>

                          {/* Treatment Protocol */}
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                              Treatment Protocol
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {case_.treatmentProtocol}
                            </Typography>
                          </Box>

                          {/* Outcome */}
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                              Outcome
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {case_.outcome}
                            </Typography>
                          </Box>

                          {/* Study Duration */}
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                              Study Duration
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {case_.duration}
                            </Typography>
                          </Box>

                          {/* Tags */}
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                              Keywords
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                              {case_.tags.map((tag, idx) => (
                                <Chip 
                                  key={idx}
                                  label={tag} 
                                  size="small" 
                                  variant="outlined"
                                  color="info"
                                />
                              ))}
                            </Box>
                          </Box>

                          {/* DOI */}
                          {case_.doi && (
                            <Box>
                              <Typography variant="caption" color="text.secondary">
                                DOI: {case_.doi}
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < filteredCases.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>

            {filteredCases.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No case studies found matching your search criteria.
                </Typography>
                <Button onClick={clearFilters} sx={{ mt: 2 }}>
                  Clear filters to see all case studies
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default SearchCaseStudies;
