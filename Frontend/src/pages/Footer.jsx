import React from 'react';
import krishiLogo from "../assets/krishi-logo.png"
import { Link } from 'react-router-dom';
import { Container, Typography, Grid, Box, Divider , Button } from '@mui/material';

function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: 'grey.100'
            }}
        >
            <Container >
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid item xs={12} sm={6} >
                        <Grid container spacing={4}>
                            <Grid item xs={6} >
                                <Typography variant="h6">About us</Typography>
                                <Link href="#" variant="body2" color="inherit">About Us</Link><br />
                                <Link href="#" variant="body2" color="inherit">Story</Link><br />
                                <Link href="#" variant="body2" color="inherit">Contact</Link>
                            </Grid>
                            <Grid item xs={6} sm={3}>
                                <Typography variant="h6">Knowledge Hub</Typography>
                                <Link href="#" variant="body2" color="inherit">Blog</Link><br />
                                <Link href="#" variant="body2" color="inherit">Weather Forecast</Link><br />
                                <Link href="#" variant="body2" color="inherit">How to use the application?</Link>
                                <Link to='/KnowledgeHub'> 
                                <Button variant="contained" sx={{ width: 200, mx: 'auto', my: 3 }}>Knowledge Hub</Button>
                                </Link>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={6} sm={3} sx={{ display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
                        <Typography variant="h6" sx={{ textAlign: "center" }}>Krishi</Typography>
                        <Box component="img"
                            src={krishiLogo}
                            alt="Krishi-Logo"
                            sx={{ width: 110, height: 110, mx: 'auto' }}
                        />
                        <Typography variant="body1" sx={{ textAlign: "center" }}>A Mission of empowering the primary sector!</Typography>
                    </Grid>
                </Grid>
                <Box mt={3} textAlign="center">
                    <Typography variant="body2" color="textSecondary">
                        © {new Date().getFullYear()} Krishi. All rights reserved.
                        <Divider sx={{ my: 1 }} />
                        Image support by freepik
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
}

export default Footer;
