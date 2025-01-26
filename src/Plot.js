import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { Container, Typography, CircularProgress } from '@mui/material';

// for menu
import logo from './logo.svg';
import './App.css';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

const PlotPage = () => {
  const [graphData, setGraphData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch the graph data from the API
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/damages_graph')
      .then((response) => {
        setGraphData(response.data);  // No need to parse, it's already in JSON format
      })
      .catch((error) => {
        console.error('Error fetching graph data:', error);
      });

    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Ember
          </Typography>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Damage Report
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Damages Report</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); window.location.href = '/learn'; }}>Learn About Fires</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '60%' }}>
          <h2>Estimated Fire Damage by County in California</h2>
          {graphData && (
            <Plot
              data={graphData.data}   // Data for the choropleth map
              layout={graphData.layout}  // Layout configuration for the map
              style={{ width: '100%', height: '100%' }}
            />
          )}
        </div>
        <div style={{ width: '35%', padding: '20px' }}>
          <h2>Predicted Damage Report</h2>
          <p>Number of buildings in the dataset: 797</p>
          <p>Percentage of buildings with damage:</p>
          <ul>
            <li>No Damage: 49.4%</li>
            <li>Affected (1-9%): 8.4%</li>
            <li>Minor (10-25%): 4.6%</li>
            <li>Major (26-50%): 1.1%</li>
            <li>Destroyed (greater than 50%): 26.2%</li>
            <li>Inaccessible: 10.3%</li>
          </ul>
          <p>Drought Levels:</p>
          <ul>
            <li>D0: 26 counties</li>
            <li>D1: 12 counties</li>
            <li>D2: 6 counties</li>
            <li>D3: 5 counties</li>
            <li>D4: 0 counties</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlotPage;
