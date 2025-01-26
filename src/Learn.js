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

function Learn() {
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
            Learn About Fires
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { handleMenuClose(); window.location.href = '/port'; }}>Damages Report</MenuItem>
            <MenuItem onClick={handleMenuClose}>Learn About Fires</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div className="content">
        <Typography variant="h5" gutterBottom>
          What Causes Wildfires?
        </Typography>
        <Typography variant="body1" paragraph>
          The common causes of wildfires include the following:<br></br> 
            - unattended campfires <br></br>
            - machinery malfunctions and vehicle fires<br></br> 
            - lightning strikes <br></br>
            - cigarette butts <br></br>
            - burning of debris <br></br>
            - and occasionally, arson<br></br> 
          As seen in the list above, sometimes the smallest sparks can set off devastatingly large fires.
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

export default Learn;