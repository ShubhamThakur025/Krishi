import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ContractPage = ({ contractDetails }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" sx={{ mb: 2 }}>Contract Agreement</Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>Parties Involved</Typography>
      <Typography variant="body1">Farmer: {contractDetails.farmer}</Typography>
      <Typography variant="body1">Buyer: {contractDetails.buyer}</Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>Contract Date</Typography>
      <Typography variant="body1">{contractDetails.date}</Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>Contract Details</Typography>
      <Typography variant="body1" component="div">
        <ul>
          <li>Crop: {contractDetails.crop}</li>
          <li>Amount Agreed: {contractDetails.amount}</li>
          <li>Delivery Location: {contractDetails.location}</li>
          <li>Delivery Date: {contractDetails.deliveryDate}</li>
          <li>Terms and Conditions: 
            <ul>
              <li>Both parties agree to the terms of the transaction.</li>
              <li>Payment will be made within 7 days after delivery.</li>
              <li>If the delivery is delayed, the buyer has the right to cancel the contract.</li>
              <li>The farmer is responsible for ensuring the quality of the crop.</li>
              <li>Any disputes will be resolved through arbitration in the state of {contractDetails.location}.</li>
            </ul>
          </li>
        </ul>
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Farmer Signature: ___________________</Typography>
        <Typography variant="h6">Buyer Signature: ___________________</Typography>
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button variant="contained" onClick={() => navigate('/')}>Complete</Button>
      </Box>
    </Box>
  );
};

export default ContractPage;
