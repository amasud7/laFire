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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
            <AppBar position="static" className="App-header" style={{ backgroundColor: 'rgb(248 225 215)' }}>
                <Toolbar>
                    <Typography onClick={() => { handleMenuClose(); window.location.href = '/'; }} variant="h6" edge="start" className="Ember" style={{fontWeight: 'bold'}}>
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
            <div className="plot-content" style={{ textAlign: 'left', padding: '30px', fontSize: '1.2em' }}>
                <Card class='cards' style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                            What Causes Wildfires?
                        </Typography>
                        <Typography variant="body1" style={{ lineHeight: '1.7' }} paragraph>
                            The common causes of wildfires include the following:<br />
                            - unattended campfires <br />
                            - machinery malfunctions and vehicle fires<br />
                            - lightning strikes <br />
                            - cigarette butts <br />
                            - burning of debris <br />
                            - and occasionally, arson<br />
                            As seen in the list above, sometimes the smallest sparks can set off devastatingly large fires.
                        </Typography>
                    </CardContent>
                </Card>
                <Card class='cards' style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                            Why do wildfires grow so quickly?
                        </Typography>
                        <Typography variant="body1" style={{ lineHeight: '1.7' }} paragraph>
                            Wildfires spread quickly due to a combination of factors including dry vegetation, strong winds, and high temperatures. Dry vegetation acts as fuel for the fire, while strong winds can carry embers to new locations, igniting additional fires. High temperatures can also dry out vegetation further, making it more susceptible to burning.
                        </Typography>
                    </CardContent>
                </Card>
                <Card class='cards' style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="h5" align="center" fontWeight="bold" gutterBottom>
                            How can you prepare for a wildfire?
                        </Typography>
                        <Typography variant="body1" style={{ lineHeight: '1.7' }} paragraph>
                            Preparing adequately for a wildfire can ensure your safety and minimize damage:
                        </Typography>
                        <Typography variant="body1" paragraph>
                            1. Create a Defensible Space: Clear away flammable vegetation and other materials around your home to create a buffer zone that can slow the spread of a wildfire.<br />
                        </Typography>
                        <Typography variant="body1" paragraph>
                            2. Prepare an Emergency Kit: Assemble an emergency kit with essentials such as water, food, medications, important documents, and other necessities that you can quickly grab in case of an evacuation.<br />
                        </Typography>
                        <Typography variant="body1" paragraph>
                            3. Develop an Evacuation Plan: Plan and practice multiple evacuation routes from your home and community. Make sure all family members know the plan and have a designated meeting place.<br />
                        </Typography>
                        <Typography variant="body1" paragraph>
                            4. Stay Informed: Sign up for local alerts and stay informed about wildfire risks and evacuation orders in your area.<br />
                        </Typography>
                        <Typography variant="body1" paragraph>
                            5. Maintain Your Property: Regularly clean gutters, roofs, and chimneys to remove debris that could catch fire. Keep your lawn hydrated and well-maintained to reduce flammable materials.<br />
                        </Typography>
                        <Typography variant="body1" paragraph>
                            6. Install Smoke Alarms and Fire Extinguishers: Ensure your home is equipped with working smoke alarms and fire extinguishers, and that everyone knows how to use them.<br />
                        </Typography>
                        <Typography variant="body1" paragraph>
                            By taking these steps, you can help protect your home and family from the dangers of wildfires.<br />
                        </Typography>
                    </CardContent>
                </Card>
                <Card class='cards' style={{ marginBottom: '20px' }}>
                    <CardContent>
                        <Typography variant="body1" paragraph style={{ fontWeight: 'bold' }}>
                            Fun Fact: Did you know that Rhinoceroses are nature's firefighters? Rhinos in the wild will stomp out small wildfires before they spread.
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default Learn;
