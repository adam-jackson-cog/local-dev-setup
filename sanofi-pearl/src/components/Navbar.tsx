import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import {
  Home,
  Person,
  TrendingUp,
  Search,
  Assessment,
  LocalHospital,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    { label: 'Home', path: '/', icon: <Home /> },
    { label: 'Search Patients', path: '/search-patients', icon: <Person /> },
    { label: 'Treatment Predictor', path: '/treatment-predictor', icon: <LocalHospital /> },
    { label: 'Case Studies', path: '/search-cases', icon: <Search /> },
    { label: 'Trend Analysis', path: '/trends', icon: <TrendingUp /> },
  ];

  return (
    <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'white', color: 'text.primary' }}>
      <Toolbar sx={{ justifyContent: 'space-between', padding: '0 2rem', height: '64px' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Assessment sx={{ color: 'primary.main', fontSize: 32 }} />
          <Typography variant="h5" component="div" sx={{ 
            color: 'text.primary', 
            fontWeight: 700,
            fontSize: '1.25rem' // xl from design system
          }}>
            Sanofi Pearl
          </Typography>
          <Chip 
            label="ITP Research Platform" 
            size="small" 
            sx={{ 
              backgroundColor: 'primary.main', 
              color: 'white',
              fontWeight: 500,
              fontSize: '0.875rem'
            }} 
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: '2rem' }}>
          {navigationItems.map((item) => (
            <Button
              key={item.path}
              startIcon={item.icon}
              onClick={() => navigate(item.path)}
              sx={{
                color: location.pathname === item.path ? 'primary.main' : 'grey.700',
                backgroundColor: 'transparent',
                fontSize: '0.875rem', // sm from design system
                fontWeight: 500, // medium
                '&:hover': {
                  color: 'primary.main',
                  backgroundColor: 'transparent',
                },
                borderRadius: 1,
                px: 2,
                py: 1,
                minWidth: 'auto',
                textTransform: 'none',
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
