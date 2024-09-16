import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Card, CardContent } from '@mui/material';
import krishiLogo from "../../assets/krishi-logo.png";
import questionsData from '../../data/CropInfo.json';
import theme from '../../Theme';


const GetInfo = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [responses, setResponses] = useState(Array(questionsData.length).fill(''));

    const handleNext = () => {
        if (inputValue.trim()) {
            setResponses(responses.map((response, index) =>
                index === currentQuestionIndex ? inputValue : response
            ));
            setInputValue('');
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const isLastQuestion = currentQuestionIndex === questionsData.length - 1;
    const showNextButton = inputValue.trim() !== '';

    return (
        <Container
            maxWidth="sm"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                p: 2,
                // backgroundColor: theme.palette.secondary.main,
            }}
        >
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
            <Card
                sx={{
                    width: '100%',
                    maxWidth: 600,
                    textAlign: 'center',
                    backgroundColor: '#f5f5f5', 
                    boxShadow: 3,
                }}
            >
                <CardContent>
                    <Box
                        sx={{
                            p: 4,
                        }}
                    >
                        <Typography variant="h5" component="h2" gutterBottom>
                            {questionsData[currentQuestionIndex].Question}
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            label={questionsData[currentQuestionIndex].fieldName}
                            value={inputValue}
                            onChange={handleChange}
                            sx={{ mb: 2 }}
                        />
                        {showNextButton && (
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    sx={{
                                        backgroundColor: theme.palette.primary.main,
                                        '&:hover': { backgroundColor: theme.palette.primary.dark }
                                    }}
                                >
                                    {isLastQuestion ? 'Submit' : 'Next Question'}
                                </Button>
                            </Box>
                        )}
                    </Box>
                </CardContent>
            </Card>
        </Container>
    );
};

export default GetInfo;
