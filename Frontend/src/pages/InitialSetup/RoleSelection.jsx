import krishiLogo from "../../assets/krishi-logo.png"
import { Box, Typography } from '@mui/material';
import React from 'react'
import roleData from '../../data/roles.json'
import RoleSelCard from '../../components/InitialSetup/RoleSelCard'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { updateChoices } from '../../redux/slices/userSlice'

function RoleSelection() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChoice = (role) => {
        dispatch(updateChoices({ role }))
        navigate('/welcome')
    }

    return (
        <Box component="section" sx={{ p: 2, display: 'flex', flexDirection: 'column', textAlign: 'center', gap: 2 }}>
            <Box component="img"
                src={krishiLogo}
                alt="Krishi-Logo"
                sx={{ width: 110, height: 110, mx: 'auto' }}
            />
            <Box component="div">
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    I am a
                </Typography>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mt: 1 }}>
                    मैं हूँ एक
                </Typography>
            </Box>
            <Box sx={{ px: 18, py: 5, display: 'flex', gap: 2, justifyContent: "space-between" }}>
                {roleData.map(role => {
                    return < RoleSelCard engName={role.engTitle} hindiName={role.hindiTitle} handleChoice={handleChoice} />
                })}
            </Box>
            <Box component="div">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <u>Continue without any account</u>
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    <u>बिना किसी खाते के जारी रखें</u>
                </Typography>
            </Box>
        </Box>
    )
}

export default RoleSelection
