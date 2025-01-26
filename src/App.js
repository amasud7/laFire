import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Ember
          </Typography>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Home
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
            <MenuItem onClick={handleMenuClose}>Learn About Fires</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div className="content">
        <Typography variant="h4" gutterBottom>
          Information about Fires
        </Typography>
        <Typography variant="body1" paragraph>
          Fire is a rapid oxidation of a material in the exothermic chemical process of combustion, releasing heat, light, and various reaction products. Fires can cause physical damage through burning.
        </Typography>
        <Typography variant="body1" paragraph>
          Wildfires are uncontrolled fires that spread quickly and can cause significant damage to forests, wildlife, and human structures. They are often caused by lightning strikes or human activities.
        </Typography>
        <Typography variant="body1" paragraph>
          Fire safety measures include having fire extinguishers, smoke detectors, and creating firebreaks in areas prone to wildfires. It's important to have an evacuation plan in case of a fire emergency.
        </Typography>
        <Typography variant="body1" paragraph>
          Firefighters are trained professionals who respond to fire emergencies and work to extinguish fires, rescue people, and protect property. They use various tools and techniques to control and put out fires.
        </Typography>
      </div>
    </div>
  );
}

export default App;