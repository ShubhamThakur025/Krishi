import React from 'react'
import { Box, Typography, Chip, Stack, LinearProgress } from '@mui/material'

function Rating() {
    return (
        <Box sx={{ p: 3, mx: 3, backgroundColor: 'grey.200', width: '40vw', boxShadow: 3, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, width: '60%' }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Ratings</Typography>
                <Typography variant="h5" color='primary' sx={{ fontWeight: 'bold' }}>3.9</Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={(3.9 / 5) * 100}
                sx={{ width: '80%', height: 10, my: 2, borderRadius: 5, backgroundColor: 'grey.400' }}
            />
            <Stack direction="column" spacing={2}>
                <Chip label="Professional" sx={{ backgroundColor: 'lightgreen', color: 'black' }} />
                <Chip label="Reliable" sx={{ backgroundColor: 'lightblue', color: 'black' }} />
                <Chip label="Efficient" sx={{ backgroundColor: 'lightcoral', color: 'black' }} />
            </Stack>
        </Box>
    )
}

export default Rating
