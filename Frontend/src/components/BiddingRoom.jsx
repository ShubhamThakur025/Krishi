import React, { useState, useEffect } from 'react';
import { ref, push, onValue, remove } from "firebase/database";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import { database } from '../../firebaseConfig';
import avatar from '../assets/avatar.jpg';

const BiddingPage = () => {
  const [bidAmount, setBidAmount] = useState('');
  const [bids, setBids] = useState([]);
  const { currentUserId, targetUserId, targetUserName } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const bidsRef = ref(database, 'bidding');  
    onValue(bidsRef, (snapshot) => {
      const data = snapshot.val();
      const bidMessages = [];
      for (let id in data) {
        bidMessages.push(data[id]);
      }
      setBids(bidMessages);
    });
  }, []);

  const putBid = () => {
    if (isNaN(bidAmount) || bidAmount.trim() === '') {
      alert('Please input a valid amount');
      return;
    }
    const bidsRef = ref(database, 'bidding');  
    push(bidsRef, {
      bidAmount,
      sender: currentUserId,
      timestamp: new Date().toLocaleString()
    });
    setBidAmount('');
  };

  const closeBid = () => {
    const lastBid = bids[bids.length - 1]?.bidAmount || 'No bid';
    if (window.confirm(`The ${currentUserId} has closed on this price: ${lastBid}. Do you agree?`)) {
      navigate('/confirm');
    }
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat?')) {
      const chatRef = ref(database, 'bidding');
      remove(chatRef);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        padding: '16px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box component="img" src={avatar} alt="User Avatar" sx={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', ml: 2, color: 'grey.800' }}>{targetUserName}</Typography>
        </Box>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'grey.800' }}>{currentUserId}</Typography>
      </Box>

      <Paper
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        {bids.map((bid, index) => (
          <Box
            key={index}
            sx={{
              p: 2,
              width: 'fit-content',
              borderRadius: '8px',
              textAlign: bid.sender === currentUserId ? 'right' : 'left',
              backgroundColor: bid.sender === currentUserId ? 'tertiary.main' : 'grey.200',
              marginLeft: bid.sender === currentUserId ? 'auto' : '0',
              marginRight: bid.sender === currentUserId ? '0' : 'auto',
              px: 4,
              py: 1.5
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {bid.bidAmount}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
              {bid.timestamp}
            </Typography>
          </Box>
        ))}
      </Paper>

      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          marginTop: '16px',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Input your bid"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={putBid}
        >
          Put
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={closeBid}
        >
          Close
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={clearChat}
        >
          Clear Chat
        </Button>
      </Box>
    </Box>
  );
};

export default BiddingPage;
