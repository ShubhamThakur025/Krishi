import { Box, Typography, TextField, Button, Card, CardContent, CardMedia, Grid } from '@mui/material'
import React, { useState, useEffect } from 'react'
import banner from '../../assets/dashboard-bg.jpg'
import avatar from '../../assets/avatar.jpg'
import SearchIcon from '@mui/icons-material/Search'
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents'
import Footer from '../Footer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserDashboard() {
    const role = useSelector(state => state.user.choices.role)
    const currentUserId = useSelector(state => state.user.id)
    const navigate = useNavigate()

    const [farmers, setFarmers] = useState([])
    const [buyers, setBuyers] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    const [isSearchTriggered, setIsSearchTriggered] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8080/farmer')
            .then(response => setFarmers(response.data.farmers))
            .catch(err => console.error("Error fetching farmers: ", err))

        axios.get('http://localhost:8080/buyer')
            .then(response => setBuyers(response.data.buyers))
            .catch(err => console.error("Error fetching buyers: ", err))
    }, [])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const viewUserProfile = (userId, role) => {
        navigate(`/user-profile/${userId}/${role}`)
    }

    const triggerSearch = () => {
        setIsSearchTriggered(true)
        navigate('/search-results', {
            state: {
                searchTerm,
                farmers: filteredFarmers,
                buyers: filteredBuyers,
                currentUserId
            }
        })
    }

    const filteredFarmers = farmers.filter(farmer => farmer.name.toLowerCase().includes(searchTerm.toLowerCase()))
    const filteredBuyers = buyers.filter(buyer => buyer.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const viewChats = () => {
        navigate(`/my-chats/${currentUserId}`)
    }

    return (
        <>
            <Box>
                <Box sx={{ display: 'flex', mt: 3, justifyContent: 'center', alignItems: 'center' }}>
                    <Typography variant="h3" color='primary' sx={{ fontWeight: 'bold' }}>
                        Krishi
                    </Typography>
                    <Typography variant="h3" color='primary' sx={{ fontWeight: 'bold', ml: 3 }}>
                        कृषि
                    </Typography>
                    <Button variant="outlined" sx={{ position: 'absolute', right: '20px', top: '20px' }} onClick={viewChats}>
                        My Chats
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', px: 3 }}>
                        <TextField
                            color="primary"
                            label="Search by Name"
                            value={searchTerm}
                            onChange={handleSearch}
                            sx={{ width: '70vw', my: 3, backgroundColor: "grey.100" }}
                        />
                        <Button variant="contained" color="primary" onClick={triggerSearch} sx={{ ml: 2 }}>
                            <SearchIcon />
                        </Button>
                    </Box>
                </Box>

                <Grid container sx={{ width: "90vw" }}>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <Box component="img" src={banner} alt="Background" sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ p: 3, mt: 3 }}>
                        <Typography variant="h2" sx={{ textAlign: 'left', fontWeight: 'bold' }}>
                            {role === 'farmer' ? 'Sell Your' : 'Buy'}
                        </Typography>
                        <Typography variant="h2" color="primary" sx={{ textAlign: 'left', fontWeight: 'bold' }}>
                            Crops Here!
                        </Typography>
                        <Box sx={{ backgroundColor: "grey.800", color: "white", p: 3, my: 1, borderRadius: 2, width: '30vw' }}>
                            <Typography variant="body2" color='grey.100'>
                                Bid and negotiate your crops through here. A tailored list of buyers is ready!
                            </Typography>
                        </Box>
                        <Button variant="contained" sx={{ width: 200, mx: 'auto', my: 3 }}>
                            {role === 'farmer' ? 'Sell Your' : 'Buy'} Crops
                        </Button>
                    </Grid>
                </Grid>

                <Box sx={{ color: '#fcb603', width: "100px", height: "100px", mx: 'auto' }}>
                    <EmojiEventsIcon sx={{ color: '#fcb603', width: "100px", height: "100px" }} />
                </Box>
                <Typography variant="h2" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 3 }}>
                    Our Best Users
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: "center", mt: 4 }}>
                    {farmers.map(farmer => (
                        <Card sx={{ backgroundColor: "grey.100", mx: 2, p: 3, width: 250, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} key={farmer.farmerId}>
                            <CardMedia component="img" image={avatar} alt={farmer.name} />
                            <CardContent>
                                <Typography variant="h6">{farmer.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Best in the region, trusted by thousands.
                                </Typography>
                            </CardContent>
                            <Button variant="contained" sx={{ width: 200, mx: 'auto', my: 3 }} onClick={() => viewUserProfile(farmer.farmerId, 'farmer')}>
                                Visit
                            </Button>
                        </Card>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', justifyContent: "center", mt: 4 }}>
                    {buyers.map(buyer => (
                        <Card sx={{ backgroundColor: "grey.100", mx: 3, p: 3, width: 250 }} key={buyer.buyerId}>
                            <CardMedia component="img" image={avatar} alt={buyer.name} />
                            <CardContent>
                                <Typography variant="h6">{buyer.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Best in the region, trusted by thousands.
                                </Typography>
                            </CardContent>
                            <Button variant="contained" sx={{ width: 200, mx: 'auto', my: 3 }} onClick={() => startChat(buyer.buyerId)}>
                                Start Chat
                            </Button>
                        </Card>
                    ))}
                </Box>
            </Box >
            <Footer />
        </>
    )
}

export default UserDashboard
