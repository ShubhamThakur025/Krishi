import { Box, Typography, TextField, Button, Card, CardContent, CardMedia, Grid, List, ListItem } from '@mui/material';
import React from 'react';
import banner from '../../assets/dashboard-bg.jpg';
import avatar from '../../assets/avatar.jpg';
import SearchIcon from '@mui/icons-material/Search';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Footer from '../Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Use for navigation

function UserDashboard() {
    const role = useSelector(state => state.user.choices.role);
    const currentUserId = useSelector(state => state.user.id); // Assuming user ID is stored in Redux
    const navigate = useNavigate(); // Use for navigation

    // Dummy list of dealers (can be replaced with actual dealer data)
    const dealers = [
        { id: 'farmer1', name: 'Farmer 1' },
        { id: 'farmer2', name: 'Farmer 2' },
        { id: 'farmer3', name: 'Farmer 3' }
    ];

    // Function to start the chat
    const startChat = (dealerId) => {
        // Navigate to the chat page with currentUserId and dealerId (targetUserId)
        navigate(`/chat/${currentUserId}/${dealerId}`);
    };

    // Function to view all chats
    const viewChats = () => {
        navigate(`/my-chats/${currentUserId}`);
    };

    return (
        <>
            <Box>
                {/* Header Section */}
                <Box sx={{ display: 'flex', mt: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" component="h3" color='primary' sx={{ fontWeight: 'bold' }}>
                        Krishi
                    </Typography>
                    <Typography variant="h3" component="h3" color='primary' sx={{ fontWeight: 'bold', ml: 3 }}>
                        कृषि
                    </Typography>

                    {/* My Chats Button */}
                    <Button 
                        variant="outlined" 
                        sx={{ position: 'absolute', right: '20px', top: '20px' }} 
                        onClick={viewChats}
                    >
                        My Chats
                    </Button>
                </Box>

                {/* Search Bar */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <TextField color="primary" label="Search Something" sx={{ width: "70%", my: 3, backgroundColor: "grey.100" }} />
                    <SearchIcon sx={{ width: 50, height: 50, color: 'grey.700', ml: 3 }} />
                </Box>

                {/* Main Section */}
                <Grid container sx={{ width: "90vw" }}>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box component="img"
                            src={banner}
                            alt="Background"
                            sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ p: 3, mt: 3 }}>
                        <Typography variant="h2" component="h2" sx={{ textAlign: 'left', fontWeight: 'bold' }} >
                            {role === 'Farmer' ? 'Sell Your' : 'Buy'}
                        </Typography>
                        <Typography variant="h2" color="primary" component="h2" sx={{ textAlign: 'left', fontWeight: 'bold' }}>
                            Crops Here!
                        </Typography>
                        <Box sx={{ backgroundColor: "grey.800", color: "white", p: 3, my: 1, borderRadius: 2, width: ['30vw'] }}>
                            <Typography variant="body2" component="body1" color='grey.100'>
                                Bid and negotiate your crops through here. Give a questionnaire and a tailored list of buyers is ready!
                            </Typography>
                        </Box>
                        <Button variant="contained" sx={{ width: 200, mx: 'auto', my: 3 }}>
                            {role === 'Farmer' ? 'Sell Your' : 'Buy'} Crops
                        </Button>
                    </Grid>
                </Grid>

                {/* Best Users Section */}
                <Box sx={{ color: '#fcb603', width: "100px", height: "100px", mx: 'auto' }}>
                    <EmojiEventsIcon sx={{ color: '#fcb603', width: "100px", height: "100px" }} />
                </Box>
                <Typography variant="h2" component="h2" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
                    Our Best Users
                </Typography>

                {/* List of Dealers */}
                <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "center" }}>
                    {dealers.map((dealer) => (
                        <Card sx={{ backgroundColor: "grey.100", mx: 3, p: 3, width: 250 }} key={dealer.id}>
                            <CardMedia
                                component="img"
                                image={avatar}
                                alt={dealer.name}
                            />
                            <CardContent>
                                <Typography variant="h6" component="h3">
                                    {dealer.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Best in the region, trusted by thousands.
                                </Typography>
                            </CardContent>
                            <Button
                                variant="contained"
                                sx={{ width: 200, mx: 'auto', my: 3 }}
                                onClick={() => startChat(dealer.id)} // Start a chat when "Visit" is clicked
                            >
                                Start Chat
                            </Button>
                        </Card>
                    ))}
                </Box>

                {/* Top Ten Users Section */}
                <Box sx={{ display: 'flex', mt: 4, gap: 2 }}>
                    <Box sx={{ width: '30%', pr: 2 }}>
                        <MilitaryTechIcon sx={{ color: '#fcb603', width: "100px", height: "100px", mx: 3 }} />
                        <Typography variant="h3" component="h3" sx={{ textAlign: 'left', fontWeight: 'bold', mx: 5 }}>
                            Our <br />Top <br /> Ten Users
                        </Typography>
                    </Box>
                    <Box sx={{ width: '70%' }}>
                        <List>
                            {["Dealer A", "Dealer B", "Dealer C", "Dealer D", "Dealer E"].map((person, index) => (
                                <ListItem key={index}>
                                    <Card sx={{ display: 'flex', width: '100%', backgroundColor: "grey.100" }}>
                                        <CardMedia
                                            component="img"
                                            sx={{ width: 100 }}
                                            image={avatar}
                                            alt={person}
                                        />
                                        <CardContent>
                                            <Typography variant="h6">{person}</Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Trusted by hundreds for quality and service.
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </ListItem>
                            ))}
                        </List>
                    </Box>
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default UserDashboard;
