import React, { useEffect, useState } from "react"
import { Box, Typography, Button, Card, CardContent, CardMedia } from "@mui/material"
import { Chat, Mail, Phone } from "@mui/icons-material"
import axios from "axios" 
import { useParams } from "react-router-dom"
import avatar from '../../assets/avatar.jpg'
import Rating from "./Rating"

function UserProfile() {
    const { userId, role } = useParams()   
    const [user, setUser] = useState(null) 
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchUserData = async() => {
        try {
            const uri = role === 'farmer' 
                ? `http://localhost:8080/farmer/${userId}` 
                : `http://localhost:8080/buyer/${userId}`
            const response = await axios.get(uri)
            setUser(response.data) 
        } catch (err) {
            setError("Error fetching user data")
            console.error("Error:", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUserData()
    }, [userId, role])

    if (loading) {
        return <Typography variant="h6">Loading...</Typography>
    }

    if (error) {
        return <Typography variant="h6" color="error">{error}</Typography>
    }

    return (
        <>
            <Box sx={{ display: 'flex', mt: 3, justifyContent: 'center', alignItems: 'center' }}>
                <Typography variant="h3" color='primary' sx={{ fontWeight: 'bold' }}>
                    Krishi
                </Typography>
                <Typography variant="h3" color='primary' sx={{ fontWeight: 'bold', ml: 3 }}>
                    कृषि
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'between', my: 5 }}>
                <Card sx={{ backgroundColor: "grey.100", mx: 3, p: 3, width: 250 }}>
                    <CardMedia component="img" image={avatar} alt="User Avatar" />
                    <CardContent>
                        <Typography variant="h6">{user.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {user.description || "Best in the region, trusted by thousands."}
                        </Typography>
                    </CardContent>
                </Card>
                <Rating />
            </Box>
            <hr style={{ margin: "35px" }} />
            <Typography variant="h5" sx={{ fontWeight: 'bold', mx: 5 }}>
                Connect
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'flex-start', mx: 5, my: 4 }}>
                <Card sx={{ width: 180, backgroundColor: 'grey.100', textAlign: 'center', p: 3, mr: 3 }}>
                    <Chat sx={{ fontSize: 40, color: 'black' }} />
                    <Typography variant="h6" sx={{ mt: 1 }}>Chat</Typography>
                </Card>
                <Card sx={{ width: 180, backgroundColor: 'grey.100', textAlign: 'center', p: 3, mr: 3 }}>
                    <Mail sx={{ fontSize: 40, color: 'black' }} />
                    <Typography variant="h6" sx={{ mt: 1 }}>Mail</Typography>
                </Card>
                <Card sx={{ width: 180, backgroundColor: 'grey.100', textAlign: 'center', p: 3, mr: 3 }}>
                    <Phone sx={{ fontSize: 40, color: 'black' }} />
                    <Typography variant="h6" sx={{ mt: 1 }}>Phone</Typography>
                </Card>
            </Box>
        </>
    )
}

export default UserProfile
