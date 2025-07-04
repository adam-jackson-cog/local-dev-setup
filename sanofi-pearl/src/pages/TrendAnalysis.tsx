import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  Timeline,
  BarChart,
  CalendarToday,
  Group,
} from '@mui/icons-material';
import { 
  BarChart as RechartsBarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { mockTrendAnalysis } from '../data/mockData';
import { TrendAnalysis as TrendAnalysisType } from '../types';

const TrendAnalysis: React.FC = () => {
  const [selectedAnalysis, setSelectedAnalysis] = useState<string>(mockTrendAnalysis[0].id);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');

  const currentAnalysis = mockTrendAnalysis.find(analysis => analysis.id === selectedAnalysis);

  // Additional mock data for different chart types
  const responseRateData = [
    { month: 'Jan', rate: 75 },
    { month: 'Feb', rate: 82 },
    { month: 'Mar', rate: 78 },
    { month: 'Apr', rate: 85 },
    { month: 'May', rate: 88 },
    { month: 'Jun', rate: 90 },
  ];

  const treatmentDistribution = [
    { name: 'Corticosteroids', value: 35, color: '#2563eb' },
    { name: 'TPO Agonists', value: 28, color: '#7c3aed' },
    { name: 'Rituximab', value: 18, color: '#059669' },
    { name: 'IVIG', value: 12, color: '#dc2626' },
    { name: 'Other', value: 7, color: '#6b7280' },
  ];

  const severityTrends = [
    { severity: 'Mild', count: 45, percentage: 30 },
    { severity: 'Moderate', count: 75, percentage: 50 },
    { severity: 'Severe', count: 30, percentage: 20 },
  ];

  const generateReport = () => {
    // In a real app, this would generate and download a comprehensive report
    alert('Generating comprehensive trend analysis report...');
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Trend Analysis Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Analyze patient trends, treatment outcomes, and epidemiological patterns
        </Typography>
      </Box>

      {/* Analysis Selection */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center', flexWrap: 'wrap' }}>
            <FormControl sx={{ minWidth: 250 }}>
              <InputLabel>Select Analysis</InputLabel>
              <Select
                value={selectedAnalysis}
                onChange={(e) => setSelectedAnalysis(e.target.value)}
              >
                {mockTrendAnalysis.map((analysis) => (
                  <MenuItem key={analysis.id} value={analysis.id}>
                    {analysis.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 150 }}>
              <InputLabel>Chart Type</InputLabel>
              <Select
                value={chartType}
                onChange={(e) => setChartType(e.target.value as any)}
              >
                <MenuItem value="bar">Bar Chart</MenuItem>
                <MenuItem value="line">Line Chart</MenuItem>
                <MenuItem value="pie">Pie Chart</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              startIcon={<Assessment />}
              onClick={generateReport}
            >
              Generate Report
            </Button>
          </Box>
        </CardContent>
      </Card>

      {currentAnalysis && (
        <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
          {/* Analysis Details */}
          <Card sx={{ flex: '1 1 300px', maxWidth: 400 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Analysis Details
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                  {currentAnalysis.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  <Chip 
                    icon={<CalendarToday />}
                    label={currentAnalysis.timeframe} 
                    size="small" 
                    color="primary"
                  />
                  <Chip 
                    icon={<Group />}
                    label={`${currentAnalysis.patientCount} patients`} 
                    size="small" 
                    variant="outlined"
                  />
                  <Chip 
                    label={`Generated: ${new Date(currentAnalysis.generatedDate).toLocaleDateString()}`} 
                    size="small" 
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                Key Insights
              </Typography>
              <List>
                {currentAnalysis.keyInsights.map((insight, index) => (
                  <ListItem key={index} sx={{ px: 0, py: 1 }}>
                    <ListItemText 
                      primary={
                        <Typography variant="body2">
                          • {insight}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Main Chart */}
          <Card sx={{ flex: '2 1 500px' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {currentAnalysis.title}
                </Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Chip 
                    icon={chartType === 'bar' ? <BarChart /> : chartType === 'line' ? <Timeline /> : <TrendingUp />}
                    label={chartType.charAt(0).toUpperCase() + chartType.slice(1) + ' Chart'} 
                    size="small"
                  />
                </Box>
              </Box>

              <Box sx={{ height: 400, width: '100%' }}>
                <ResponsiveContainer>
                  {chartType === 'bar' ? (
                    <RechartsBarChart data={currentAnalysis.chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#2563eb" />
                    </RechartsBarChart>
                  ) : chartType === 'line' ? (
                    <LineChart data={responseRateData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="rate" stroke="#2563eb" strokeWidth={3} />
                    </LineChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={treatmentDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent || 0 * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {treatmentDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      {/* Additional Analytics Cards */}
      <Box sx={{ display: 'flex', gap: 3, mt: 3, flexWrap: 'wrap' }}>
        {/* Treatment Response Trends */}
        <Card sx={{ flex: '1 1 300px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Treatment Response Over Time
            </Typography>
            <Box sx={{ height: 200, width: '100%' }}>
              <ResponsiveContainer>
                <LineChart data={responseRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="rate" 
                    stroke="#059669" 
                    strokeWidth={2}
                    dot={{ fill: '#059669', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>

        {/* Treatment Distribution */}
        <Card sx={{ flex: '1 1 300px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Treatment Distribution
            </Typography>
            <List>
              {treatmentDistribution.map((treatment, index) => (
                <ListItem key={index} sx={{ px: 0, py: 1 }}>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">{treatment.name}</Typography>
                        <Chip 
                          label={`${treatment.value}%`} 
                          size="small"
                          sx={{ bgcolor: treatment.color, color: 'white' }}
                        />
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>

        {/* Disease Severity Breakdown */}
        <Card sx={{ flex: '1 1 300px' }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Disease Severity Breakdown
            </Typography>
            <List>
              {severityTrends.map((severity, index) => (
                <ListItem key={index} sx={{ px: 0, py: 1 }}>
                  <ListItemText
                    primary={
                      <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                          <Typography variant="body2">{severity.severity}</Typography>
                          <Chip 
                            label={`${severity.count} patients`} 
                            size="small"
                            color={
                              severity.severity === 'Severe' ? 'error' :
                              severity.severity === 'Moderate' ? 'warning' : 'success'
                            }
                          />
                        </Box>
                        <Box sx={{ 
                          width: '100%', 
                          height: 6, 
                          bgcolor: 'grey.200', 
                          borderRadius: 3,
                          overflow: 'hidden'
                        }}>
                          <Box sx={{ 
                            width: `${severity.percentage}%`, 
                            height: '100%',
                            bgcolor: severity.severity === 'Severe' ? 'error.main' :
                                     severity.severity === 'Moderate' ? 'warning.main' : 'success.main',
                            transition: 'width 0.3s ease'
                          }} />
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default TrendAnalysis;
