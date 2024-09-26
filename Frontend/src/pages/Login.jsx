import { useState } from 'react'
import { Box, Container, TextField, Button } from '@mui/material'
import krishiLogo from "../assets/krishi-logo.png"
import { toast } from 'react-toastify'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { updateChoices } from '../redux/slices/userSlice'
import { useNavigate } from 'react-router-dom'
import setCookie from '../utils/setCookie'

function Login() {
    const [mobile, setmobile] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:8080/general/login', { mobile })
            console.log(response.data)
            dispatch(updateChoices(response.data))
            setCookie('userToken', response.data.token, 1)
            toast.success("Login successfull")
            navigate('/dashboard')
            
        } catch (err) {
            console.log("Error:", err)
            toast.error("Login Failed")
        }
    }

    return (
        <Container component="section" sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: "40vw",
            mx: "auto",
            p: 2,
        }}>
            <Box
                sx={{
                    mb: 3,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                }}
            >
                <Box
                    component="img"
                    src={krishiLogo}
                    alt="Krishi Logo"
                    sx={{ width: 110, height: 110 }}
                />
            </Box>

            <TextField
                label="Enter your phone number"
                color="primary"
                value={mobile}
                onChange={(e) => setmobile(e.target.value)}
                sx={{ mb: 2, width: '100%' }}
                inputProps={{ maxLength: 10 }}
            />

            <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                sx={{ width: '100%' }}
            >
                Submit
            </Button>
        </Container>
    )
}

export default Login
