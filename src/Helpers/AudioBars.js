import React from 'react';
import { Box } from '@mui/material';
import './AudioBars.css';

const AudioBars = () => {
  return (
    <Box display="flex" alignItems="center">
      <Box className="bar" />
      <Box className="bar" />
      <Box className="bar" />
    </Box>
  );
};

export default AudioBars;
