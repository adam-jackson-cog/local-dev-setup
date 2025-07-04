import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PatientProfile from './pages/PatientProfile';
import TreatmentPredictor from './pages/TreatmentPredictor';
import SearchPatients from './pages/SearchPatients';
import SearchCaseStudies from './pages/SearchCaseStudies';
import TrendAnalysis from './pages/TrendAnalysis';
import './App.css';

// Sanofi Pearl theme based on design system
const theme = createTheme({
  palette: {
    primary: {
      main: '#8B5CF6', // Primary purple from design system
      light: '#A78BFA',
      dark: '#7C3AED',
    },
    secondary: {
      main: '#6366F1', // Sanofi brand purple
      light: '#A78BFA',
      dark: '#5B21B6',
    },
    background: {
      default: '#F9FAFB', // Gray 50 from design system
      paper: '#FFFFFF',
    },
    text: {
      primary: '#111827', // Gray 900
      secondary: '#6B7280', // Gray 500
    },
    grey: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827',
    },
  },
  typography: {
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '2.25rem', // 4xl
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h2: {
      fontSize: '1.875rem', // 3xl
      fontWeight: 700,
      lineHeight: 1.25,
    },
    h3: {
      fontSize: '1.5rem', // 2xl
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h4: {
      fontSize: '1.25rem', // xl
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: '1.125rem', // lg
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1rem', // base
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.625,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.625,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)', // md shadow
          borderRadius: '1rem', // xl border radius
          border: '1px solid #E5E7EB',
          padding: '2rem',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '0.5rem', // lg border radius
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          padding: '0.75rem 1.5rem',
          transition: 'all 0.2s ease-in-out',
        },
        contained: {
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          },
        },
        outlined: {
          '&:hover': {
            transform: 'scale(1.02)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          height: '64px',
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
          boxShadow: 'none',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/patient/:id" element={<PatientProfile />} />
            <Route path="/treatment-predictor" element={<TreatmentPredictor />} />
            <Route path="/search-patients" element={<SearchPatients />} />
            <Route path="/search-cases" element={<SearchCaseStudies />} />
            <Route path="/trends" element={<TrendAnalysis />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
