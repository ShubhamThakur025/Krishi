import React, { useState } from 'react';
import { Box, Typography, Button, Checkbox, FormControlLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = ({ bidDetails }) => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    if (confirmed) {
      navigate('/contract');  // Redirect to Contract page
    } else {
      alert('Please confirm the details by checking the box.');
    }
  };

  const goBack = () => {
    navigate(-1);  // Go back to the previous page
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Confirm Your Bid Details</Typography>
      <Typography variant="h6">Please review the following details:</Typography>
      <ul>
        <li><Typography variant="body1">Bid Amount: {bidDetails.amount}</Typography></li>
        <li><Typography variant="body1">Crop: {bidDetails.crop}</Typography></li>
        <li><Typography variant="body1">Farmer: {bidDetails.farmer}</Typography></li>
        <li><Typography variant="body1">Buyer: {bidDetails.buyer}</Typography></li>
        <li><Typography variant="body1">Date: {bidDetails.date}</Typography></li>
        <li><Typography variant="body1">Location: {bidDetails.location}</Typography></li>
      </ul>

      <FormControlLabel
        control={<Checkbox checked={confirmed} onChange={() => setConfirmed(!confirmed)} />}
        label="I confirm that the details are correct"
      />

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="outlined" onClick={goBack}>Go Back</Button>
        <Button variant="contained" color="primary" onClick={handleConfirm}>Everything is correct</Button>
      </Box>
    </Box>
  );
};

export default ConfirmationPage;
