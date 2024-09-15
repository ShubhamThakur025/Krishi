import React, { useEffect } from 'react'
import frontBg from '../assets/front-bg.jpg'
import { Grid, Box, Typography, Button } from '@mui/material'
import krishiLogo from "../assets/krishi-logo.png"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function WelcomePage() {
    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Box component="img"
                    src={frontBg}
                    alt="Background"
                    sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </Grid>
            <Grid item xs={12} sm={6} sx={{ backgroundColor: 'grey.100', pr: 8, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flexDirection: 'column' }}>
                <Box component="img"
                    src={krishiLogo}
                    alt="Background"
                    sx={{ width: 110, height: 110, mb: 3, mr: 3 }}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Typography variant="h2" component="h2" color='primary' sx={{ mb: 1, fontWeight: 'bold' }}>
                            Krishi
                        </Typography>
                        <Typography variant="h2" component="h2" color='primary' sx={{ mb: 1, fontWeight: 'bold', ml: 3 }}>
                            कृषि
                        </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ textAlign: "right", width: 500 }}>
                        Welcome to <b>Krishi</b>, a trusted platform connecting farmers and buyers through contract farming. A mission to empower farmers with guaranteed markets and stable incomes!
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Link to={'/onboarding'}>
                            <Button variant="contained" sx={{ alignSelf: 'flex-end', mt: 3 }}>
                                Get Started
                            </Button>
                        </Link>
                        <Button variant="outlined" sx={{ alignSelf: 'flex-end', ml: 3 }}>
                            Learn More
                        </Button>
                    </Box>
                </Box>


            </Grid>
        </Grid>
    )
}

export default WelcomePage
