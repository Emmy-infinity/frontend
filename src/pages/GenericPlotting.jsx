import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

import api from '../api';

const ChartComponent = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('api/chart-data/');
        // Data mapping (adjust based on your API response)
        const dataMapping = {
          x: response.data.x,
          y: response.data.y,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'blue' },
        };
        setChartData([dataMapping]);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array: run only once on mount

  if (loading) return <div>Loading chart...</div>;
  if (error) return <div>Error loading data: {error.message}</div>;

  return (
    <Plot
      data={chartData}
      layout={{
        width: 800,
        height: 500,
        title: 'Live Data from DRF API',
      }}
    />
  );
};

export default ChartComponent;