import React from 'react'
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import Farmer from '../../assets/Farmer.jpg'
import Buyer from '../../assets/Buyer.jpg'

function RoleSelCard({ engName, hindiName }) {
    return (
        <Card sx={{width: 320, height: 290, display: 'flex', flexDirection: 'column', textAlign: 'left', backgroundColor: 'grey.100', justifyContent: 'center', alignItems: 'center' }}>
            <CardMedia
                component="img"
                sx={{ width: '100%', height: '200px', objectFit: 'cover' }}
                image={engName == 'Farmer' ? Farmer : Buyer}
                alt={engName}
            />
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                    {engName}
                </Typography>
                <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                    {hindiName}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default RoleSelCard
