import React from 'react';
import { Box, Typography, Container, Avatar, Divider, Button } from '@mui/material';
import theme from '../../Theme';
import avatar from '../../assets/avatar.jpg'

const Profile = () => {
    const userInfo = {
        name: "John Doe",
        email: "johndoe@gmail.com",
        bio: "Passionate farmer and agricultural expert with 10+ years of experience.",
        avatarUrl: "https://via.placeholder.com/150",
        location: "Haryana, India",
    };

    return (
        <Container
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            textAlign: 'center',
        }}
    >
        <Avatar
            src={avatar}
            alt="Profile Picture"
            sx={{
                width: 120,
                height: 120,
                mb: 2,
                border: `4px solid ${theme.palette.primary.main}`,
            }}
        />
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
            John Doe
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 2 }}>
            johndoe@example.com
        </Typography>
        <Divider sx={{ width: '80%', mb: 2 }} />
        <Box sx={{ textAlign: 'left', width: '100%', maxWidth: 400 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                Location: New York, USA
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                Role: Farmer
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Joined: January 2022
            </Typography>
        </Box>
        <Button 
            variant="contained"
            color="primary"
            sx={{
                mt: 2,
                backgroundColor: theme.palette.primary.main,
                '&:hover': { backgroundColor: theme.palette.primary.dark },
            }}
        >
            Edit Profile
        </Button>
    </Container>
    );
};

export default Profile;

