import { Box, Typography, TextField, Button, Card, CardContent, CardMedia, Grid, List, ListItem } from '@mui/material';
import React, { useState, useEffect } from 'react';  // Import useState and useEffect
import banner from '../../assets/dashboard-bg.jpg';
import avatar from '../../assets/avatar.jpg';
import SearchIcon from '@mui/icons-material/Search';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Footer from '../Footer';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Use for navigation
import axios from 'axios';  // Import axios to fetch data from backend

function UserDashboard() {
    const role = useSelector(state => state.user.choices.role);
    const currentUserId = useSelector(state => state.user.id);  // Assuming user ID is stored in Redux
    const navigate = useNavigate();  // Use for navigation

    const [farmers, setFarmers] = useState([]);  // State for storing fetched farmers
    const [buyers, setBuyers] = useState([]);  // State for storing fetched buyers
    const [searchTerm, setSearchTerm] = useState('');  // State for search term
    const [isSearchTriggered, setIsSearchTriggered] = useState(false);  // State to control when search happens

    // Fetch farmers and buyers from the backend when the component mounts
    useEffect(() => {
        axios.get('http://localhost:8080/farmer/list')
            .then(response => {
                setFarmers(response.data);
            })
            .catch(err => console.error("Error fetching farmers: ", err));

        axios.get('http://localhost:8080/buyer/list')
            .then(response => {
                setBuyers(response.data);
            })
            .catch(err => console.error("Error fetching buyers: ", err));
    }, []);

    // Handle search input
    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    // Function to trigger the search
    const triggerSearch = () => {
        setIsSearchTriggered(true);
    };

    // Function to filter farmers and buyers based on the search term
    const filteredFarmers = farmers.filter(farmer => farmer.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredBuyers = buyers.filter(buyer => buyer.name.toLowerCase().includes(searchTerm.toLowerCase()));

    // Function to start the chat
    const startChat = (userId) => {
        navigate(`/chat/${currentUserId}/${userId}`);
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

                {/* Search Bar with Button */}
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <TextField 
                            color="primary" 
                            label="Search by Name" 
                            value={searchTerm} 
                            onChange={handleSearch}  // Add search handler
                            sx={{ width: "70%", my: 3, backgroundColor: "grey.100" }} 
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={triggerSearch}  // Trigger the search manually when the button is clicked
                            sx={{ ml: 2 }}
                        >
                            <SearchIcon />
                        </Button>
                    </Box>

                    {/* Search Results */}
                    {isSearchTriggered && searchTerm && (
                        <Box sx={{ width: "90%", display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 2 }}>
                            {filteredFarmers.length > 0 && (
                                <Typography variant="h5" sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
                                    Farmers
                                </Typography>
                            )}
                            {filteredFarmers.map(farmer => (
                                <Card sx={{ backgroundColor: "grey.100", mx: 2, p: 3, width: 250 }} key={farmer.farmerId}>
                                    <CardMedia
                                        component="img"
                                        image={avatar}
                                        alt={farmer.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="h3">
                                            {farmer.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Best in the region, trusted by thousands.
                                        </Typography>
                                    </CardContent>
                                    <Button
                                        variant="contained"
                                        sx={{ width: 200, mx: 'auto', my: 3 }}
                                        onClick={() => startChat(farmer.farmerId)}  // Start a chat with the farmer's ID
                                    >
                                        Start Chat
                                    </Button>
                                </Card>
                            ))}

                            {filteredBuyers.length > 0 && (
                                <Typography variant="h5" sx={{ width: '100%', textAlign: 'center', mt: 4, mb: 2 }}>
                                    Buyers
                                </Typography>
                            )}
                            {filteredBuyers.map(buyer => (
                                <Card sx={{ backgroundColor: "grey.100", mx: 2, p: 3, width: 250 }} key={buyer.buyerId}>
                                    <CardMedia
                                        component="img"
                                        image={avatar}
                                        alt={buyer.name}
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="h3">
                                            {buyer.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Best in the region, trusted by thousands.
                                        </Typography>
                                    </CardContent>
                                    <Button
                                        variant="contained"
                                        sx={{ width: 200, mx: 'auto', my: 3 }}
                                        onClick={() => startChat(buyer.buyerId)}  // Start a chat with the buyer's ID
                                    >
                                        Start Chat
                                    </Button>
                                </Card>
                            ))}
                        </Box>
                    )}
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

                {/* List of Farmers and Buyers */}
                <Box sx={{ display: 'flex', justifyContent: "center", mt: 4 }}>
                    {farmers.map((farmer) => (
                        <Card sx={{ backgroundColor: "grey.100", mx: 3, p: 3, width: 250 }} key={farmer.farmerId}>
                            <CardMedia
                                component="img"
                                image={avatar}
                                alt={farmer.name}
                            />
                            <CardContent>
                                <Typography variant="h6" component="h3">
                                    {farmer.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Best in the region, trusted by thousands.
                                </Typography>
                            </CardContent>
                            <Button
                                variant="contained"
                                sx={{ width: 200, mx: 'auto', my: 3 }}
                                onClick={() => startChat(farmer.farmerId)}  // Start a chat with the farmer's ID
                            >
                                Start Chat
                            </Button>
                        </Card>
                    ))}
                </Box>

                {/* List of Buyers */}
                <Box sx={{ display: 'flex', justifyContent: "center", mt: 4 }}>
                    {buyers.map((buyer) => (
                        <Card sx={{ backgroundColor: "grey.100", mx: 3, p: 3, width: 250 }} key={buyer.buyerId}>
                            <CardMedia
                                component="img"
                                image={avatar}
                                alt={buyer.name}
                            />
                            <CardContent>
                                <Typography variant="h6" component="h3">
                                    {buyer.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Best in the region, trusted by thousands.
                                </Typography>
                            </CardContent>
                            <Button
                                variant="contained"
                                sx={{ width: 200, mx: 'auto', my: 3 }}
                                onClick={() => startChat(buyer.buyerId)}  // Start a chat with the buyer's ID
                            >
                                Start Chat
                            </Button>
                        </Card>
                    ))}
                </Box>
            </Box>
            <Footer />
        </>
    );
}

export default UserDashboard;
