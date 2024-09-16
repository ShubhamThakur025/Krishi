import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Container, Button } from '@mui/material';
import theme from '../../Theme'; 
import avatar from "../../assets/avatar.jpg"; 

const FilterBuyer = () => {
    const choices = useSelector((state) => state.user.choices);

    return (
        <Container sx={{ mt: 4, p: 2 }}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ color: theme.palette.primary.main, fontWeight: 'bold', p: 4 }}
            >
                Available Buyers for {choices.cropName}
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} sm={6} md={4}>
                    <Card 
                        sx={{
                            backgroundColor: "grey.100",
                            mx: 3,
                            p: 3,
                            width: 250,
                            boxShadow: 3,
                            textAlign: 'center',
                            transition: 'transform 0.3s',
                            '&:hover': {
                                transform: 'scale(1.05)',
                            },
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={avatar}
                            alt="Buyer Avatar"
                            sx={{
                                height: 220, 
                                objectFit: 'cover',
                                borderRadius: 1, 
                            }}
                        />
                        <CardContent>
                            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                                Buyer for {choices.cropName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Best price range: {choices.lowerPrice} - {choices.upperPrice} for {choices.quantity} {choices.unit}
                            </Typography>
                        </CardContent>

                        <Button 
                            variant="contained" 
                            sx={{
                                width: 200,
                                mx: 'auto',
                                my: 3,
                                backgroundColor: theme.palette.primary.main,
                                '&:hover': { backgroundColor: theme.palette.primary.dark },
                            }}
                        >
                            Visit
                        </Button>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default FilterBuyer;
