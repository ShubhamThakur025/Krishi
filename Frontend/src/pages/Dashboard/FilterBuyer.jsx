import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Container, Button } from '@mui/material';
import theme from '../../Theme'; 
import avatar from "../../assets/avatar.jpg"; 

const buyersData = [
    { id: 1, name: 'Buyer A', location: 'haryana', price:'1000-2000', description: 'Leader in agricultural products.' },
    { id: 2, name: 'Buyer B', description: 'High-quality crops buyer with reliable deals.' },
    { id: 3, name: 'Buyer C', description: 'Trusted by the farming community.' },
    { id: 4, name: 'Buyer D', description: 'Leader in agricultural products.' },
];

const FilterBuyer = () => {
    return (
        <Container
            sx={{
                mt: 4,
                p: 2,
            }}
        >
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    p: 4
                }}
            >
                Available Buyers
            </Typography>

            <Grid container spacing={3}>
                {buyersData.map((buyer) => (
                    <Grid item xs={12} sm={6} md={4} key={buyer.id}>
                        <Card 
                            sx={{
                                backgroundColor: "grey.100",
                                mx: 3,
                                p: 3,
                                width: 250,
                                boxShadow: 3,
                                align:"center",
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
                                    {buyer.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {buyer.description}
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
                ))}
            </Grid>
        </Container>
    );
};

export default FilterBuyer;
