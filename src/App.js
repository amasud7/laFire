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
    <div className="App" class="home">
      <AppBar position="static" className="App-header" style={{ backgroundColor: 'rgba(32, 36, 50, 0.78)' }}>
        <Toolbar>
          <Typography  onClick={() => { handleMenuClose(); window.location.href = '/'; }} variant="h6" edge="start" class="Ember" >
            Ember
          </Typography>
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { handleMenuClose(); window.location.href = '/Plot'; }}>Damages Report</MenuItem>
            <MenuItem onClick={() => { handleMenuClose(); window.location.href = '/Learn'; }}>Learn About Fires</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <div className="content">
        <Typography variant="h1" gutterBottom>
          Our Mission
        </Typography>
        <Typography variant="h4" paragraph>
          To educate the public about natural disasters and to assess the damages from specific incidents.
        </Typography>
      </div>
    </div>
  );
}

export default App;