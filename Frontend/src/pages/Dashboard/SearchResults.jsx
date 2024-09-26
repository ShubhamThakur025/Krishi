import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SearchIcon from '@mui/icons-material/Search'
import { Card, CardContent, CardMedia, Typography, TextField, Button, Box } from '@mui/material'
import avatar from '../../assets/avatar.jpg'

function SearchResults() {
    const location = useLocation()
    const navigate = useNavigate()
    const { farmers, buyers, searchTerm: initialSearchTerm = '', currentUserId } = location.state || {}

    const [searchTerm, setSearchTerm] = useState(initialSearchTerm)
    const [filteredFarmers, setFilteredFarmers] = useState(farmers || [])
    const [filteredBuyers, setFilteredBuyers] = useState(buyers || [])

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const triggerSearch = () => {
        const lowercasedSearchTerm = searchTerm.toLowerCase()

        const newFilteredFarmers = farmers?.filter(farmer => farmer.name.toLowerCase().includes(lowercasedSearchTerm)) || []
        const newFilteredBuyers = buyers?.filter(buyer => buyer.name.toLowerCase().includes(lowercasedSearchTerm)) || []

        setFilteredFarmers(newFilteredFarmers)
        setFilteredBuyers(newFilteredBuyers)
    }

    const startChat = (userId) => {
        navigate(`/chat/${currentUserId}/${userId}`)
    }
    
    const viewUserProfile = (userId, role) => {
        navigate(`/user-profile/${userId}/${role}`)
    }

    return (
        <Box>
            <Box sx={{ display: 'flex', mt: 3, justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h3" color='primary' sx={{ fontWeight: 'bold' }}>
                    Krishi
                </Typography>
                <Typography variant="h3" color='primary' sx={{ fontWeight: 'bold', ml: 3 }}>
                    कृषि
                </Typography>
            </Box>
            <Typography variant="h4" sx={{ textAlign: 'center', mt: 3, fontWeight: 'bold' }}>
                Search Results for "{initialSearchTerm}"
            </Typography>

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

            <Box sx={{ width: "90%", display: 'flex', flexWrap: 'wrap', justifyContent: 'center', mt: 2 }}>
                {filteredFarmers.length > 0 && (
                    <>
                        <Typography variant="h5" sx={{ width: '100%', textAlign: 'center', mb: 2 }}>
                            Farmers
                        </Typography>
                        {filteredFarmers.map(farmer => (
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
                    </>
                )}
                {filteredBuyers.length > 0 && (
                    <>
                        <Typography variant="h5" sx={{ width: '100%', textAlign: 'center', mt: 4, mb: 2 }}>
                            Buyers
                        </Typography>
                        {filteredBuyers.map(buyer => (
                            <Card sx={{ backgroundColor: "grey.100", mx: 2, p: 3, width: 250 }} key={buyer.buyerId}>
                                <CardMedia component="img" image={avatar} alt={buyer.name} />
                                <CardContent>
                                    <Typography variant="h6">{buyer.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Best in the region, trusted by thousands.
                                    </Typography>
                                </CardContent>
                                <Button variant="contained" sx={{ width: 200, mx: 'auto', my: 3 }} onClick={() => viewUserProfile(buyer.buyerId, 'buyer')}>
                                    Visit
                                </Button>
                            </Card>
                        ))}
                    </>
                )}
            </Box>
        </Box>
    )
}

export default SearchResults
