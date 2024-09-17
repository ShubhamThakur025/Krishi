import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Card, CardContent, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useDispatch } from 'react-redux';
import { updateChoices } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';
import krishiLogo from "../../assets/krishi-logo.png";
import questionsData from '../../data/CropInfo.json';
import TimeSlider from '../../components/InitialSetup/FormComponents/TimeSlider';
import Range from '../../components/InitialSetup/FormComponents/Range';

const GetInfo = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [inputValue, setInputValue] = useState('');
    const [upperVal, setUpperVal] = useState(null);
    const [lowerVal, setLowerVal] = useState(null);
    const [productionTime, setProductionTime] = useState(1);
    const [unit, setUnit] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const handleNext = () => {
        if (currentQuestionIndex === 0 && inputValue.trim()) {
            dispatch(updateChoices({ cropName: inputValue }));
        } else if (currentQuestionIndex === 1 && inputValue.trim() && unit) {
            dispatch(updateChoices({ quantity: inputValue, unit }));
        } else if (currentQuestionIndex === 2 && upperVal !== null && lowerVal !== null) {
            dispatch(updateChoices({ upperPrice: upperVal, lowerPrice: lowerVal }));
        } else if (currentQuestionIndex === 3) {
            dispatch(updateChoices({ productionTime }));
        }
        
        if (currentQuestionIndex < questionsData.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            navigate('/filterBuyer');
        }
    };

    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const isLastQuestion = currentQuestionIndex === questionsData.length - 1;
    const showNextButton = (
        (currentQuestionIndex === 0 && inputValue.trim() !== '') ||
        (currentQuestionIndex === 1 && inputValue.trim() !== '' && unit) ||
        (currentQuestionIndex === 2 && upperVal !== null && lowerVal !== null) ||
        (currentQuestionIndex === 3)
    );

    return (
        <Container maxWidth="sm" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', p: 2 }}>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <Box component="img" src={krishiLogo} alt="Krishi Logo" sx={{ width: 110, height: 110 }} />
            </Box>
            <Card sx={{ width: '100%', maxWidth: 600, textAlign: 'center', backgroundColor: '#f5f5f5', boxShadow: 3 }}>
                <CardContent>
                    <Box sx={{ p: 4 }}>
                        <Typography variant="h5" component="h2" gutterBottom>{questionsData[currentQuestionIndex].Question}</Typography>

                        {currentQuestionIndex === 0 && (
                            <TextField fullWidth variant="outlined" label={questionsData[currentQuestionIndex].fieldName} value={inputValue} onChange={handleChange} sx={{ mb: 2 }} />
                        )}
                        {currentQuestionIndex === 1 && (
                            <>
                                <TextField fullWidth variant="outlined" label={questionsData[currentQuestionIndex].fieldName} value={inputValue} onChange={handleChange} sx={{ mb: 2 }} />
                                <RadioGroup row aria-labelledby="unit-select" name="unit-select" onChange={(e) => setUnit(e.target.value)}>
                                    <FormControlLabel value="Kilograms" control={<Radio />} label="Kilograms" />
                                    <FormControlLabel value="Tons" control={<Radio />} label="Tons" />
                                </RadioGroup>
                            </>
                        )}
                        {currentQuestionIndex === 2 && (
                            <Range lowerVal={lowerVal} setLowerVal={setLowerVal} upperVal={upperVal} setUpperVal={setUpperVal} />
                        )}  
                        {currentQuestionIndex === 3 && (
                            <TimeSlider setProductionTime={setProductionTime} productionTime={productionTime} />
                        )}

                        {showNextButton && (
                            <Box sx={{ mt: 2 }}>
                                <Button variant="contained" color="primary" onClick={handleNext}>
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
