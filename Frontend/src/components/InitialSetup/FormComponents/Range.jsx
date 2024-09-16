import React from 'react';
import { TextField, Typography, InputAdornment } from '@mui/material';

function Range({ lowerVal, setLowerVal, upperVal, setUpperVal }) {
    return (
        <>
            <TextField
                fullWidth
                variant="outlined"
                label="Upper Price"
                value={upperVal}
                onChange={(e) => setUpperVal(parseInt(e.target.value, 10) || 0)}
                sx={{ mb: 2 }}
                type="number"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                    ),
                }}
            />

            <Typography variant="body2" component="p" gutterBottom>
                to
            </Typography>

            <TextField
                fullWidth
                variant="outlined"
                label="Lower Price"
                value={lowerVal}
                onChange={(e) => setLowerVal(parseInt(e.target.value, 10) || 0)}
                sx={{ mb: 2 }}
                type="number"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">₹</InputAdornment>
                    ),
                }}
            />
        </>
    );
}

export default Range;
