import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Box, Typography, Button, Card } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function UserInfo() {
    const userData = useSelector(state => state.user.choices)
    const { role, Name, Phone, Crops, City, State, Category } = userData
    const navigate = useNavigate()

    const registerUser = (e) => {
        e.preventDefault()
        const commonData = { name: Name, mobile: Phone, generalCrops: Crops, location: `${City}, ${State}` }
        const uri = role === 'Farmer' ? 'http://localhost:8080/farmer/register' : 'http://localhost:8080/buyer/register';
        const requestData = role == 'Farmer' ? commonData : { ...commonData, category: Category }
        axios.post(uri, requestData)
            .then(response => {
                console.log(response)
                toast.success('Registration successfull!')
                navigate('/dashboard')
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        console.log(userData)
    }, [userData])

    const choices = useSelector(state => state.user.choices)
    return (
        <Box component="section" sx={{ p: 2, display: 'flex', flexDirection: 'column', textAlign: 'center', justifyContent: 'center', gap: 2, height: '100vh' }}>
            <Card component="div" sx={{ mx: 'auto', px: 5, py: 5, minWidth: 'fit', display: 'flex', flexDirection: 'column', borderRadius: 2, backgroundColor: 'grey.100' }}>
                <AccountCircleIcon sx={{ width: 110, height: 110, mx: 'auto', mb: 0 }} />
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 0 }}>
                    {choices.Name}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    {choices.role} <br />
                    {choices.Category && choices.Category} <br />
                    {choices.City}, {choices.State}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', mx: 'auto' }}>
                    {choices.Crops && choices.Crops.map((crop, index) => (
                        <Typography key={crop} variant="body1" sx={{ color: 'text.secondary', mr: 0.6 }}>
                            {crop}
                        </Typography>
                    ))}
                </Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', width: 300, my: 2 }}>
                    We shall be proceeding towards setting up an account for you. Thus, you agree to the terms and conditions that are listed below
                </Typography>
                <Button variant="contained" onClick={registerUser} sx={{ width: 200, mx: 'auto', mt: 3 }}>Submit <NavigateNextIcon /></Button>
            </Card>
        </Box >
    )
}

export default UserInfo
