import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Plot from 'react-plotly.js';
import { Container, Typography, CircularProgress } from '@mui/material';

const DamagesGraph = () => {
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

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <h2>Estimated Fire Damage by County in California</h2>
      {graphData && (
        <Plot
          data={graphData.data}   // Data for the choropleth map
          layout={graphData.layout}  // Layout configuration for the map
          style={{ width: '60%', height: '100%' }}
        />
      )}
    </div>
  );
};

export default DamagesGraph;
