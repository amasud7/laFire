import React, { useEffect, useState } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import Plot from 'react-plotly.js';
import axios from 'axios';

const PlotPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with dummy data
    const dummyData = {
      locations: ['06037', '06059', '06111', '06071', '06065'],
      costs: [50000000, 10000000, 7500000, 30000000, 15000000],
      counties: ['Los Angeles', 'Orange', 'Ventura', 'San Bernardino', 'Riverside']
    };

    setTimeout(() => {
      setData(dummyData);
      setLoading(false);
    }, 1000); // Simulate network delay
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Fire Damage Costs for Counties in Los Angeles
      </Typography>
      <Plot
        data={[
          {
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: data.locations,
            z: data.costs,
            text: data.counties,
            colorscale: 'Reds',
            colorbar: {
              title: 'Cost in USD',
            },
          },
        ]}
        layout={{
          title: 'Fire Damage Costs for Counties in Los Angeles',
          geo: {
            scope: 'usa',
            projection: {
              type: 'albers usa',
            },
          },
        }}
        config={{
          scrollZoom: false, // Disable scroll zoom to avoid the error
        }}
      />
    </Container>
  );
};

export default PlotPage;