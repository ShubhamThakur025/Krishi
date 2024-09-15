import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button, TextField, Checkbox, FormGroup, FormControlLabel } from '@mui/material'
import { updateChoices } from '../../redux/slices/userSlice'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function Question({ questionItem, questionIndex, setQuestionIndex }) {
    const [textInput, setTextInput] = useState("")
    const [selectedCrops, setSelectedCrops] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChoice = () => {
        if (questionIndex == 4) {
            navigate('/finish')
        }
        if (questionItem.id == 5) {
            dispatch(updateChoices({ [questionItem.fieldName]: selectedCrops }))
        }
        else {
            dispatch(updateChoices({ [questionItem.fieldName]: textInput }))
        }
        setTextInput("")
        setQuestionIndex(prev => prev + 1)
    }

    const handleCropSelection = (e) => {
        const cropName = e.target.name
        if (e.target.checked) {
            setSelectedCrops(prev => [...prev, cropName])
        } else {
            setSelectedCrops(prev => prev.filter(item => item !== cropName))
        }
    }

    return (
        <Box component="div" sx={{ p: 2, width: "40vw", mx: "auto", display: 'flex', flexDirection: 'column', textAlign: 'center', gap: 2 }}>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                {questionItem.Question}
            </Typography>
            {questionItem.id === 5 ? (
                <FormGroup>
                    {["Potato", "Tomato", "Wheat"].map(crop => (
                        <FormControlLabel
                            key={crop}
                            control={
                                <Checkbox onChange={handleCropSelection} name={crop} />
                            }
                            label={crop}
                        />
                    ))}
                </FormGroup>)
                :
                <TextField label={[questionItem.fieldName]} color="primary" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
            }
            <Button variant="contained" sx={{ width: 200, mx: 'auto' }} onClick={handleChoice}>Next <NavigateNextIcon /></Button>
        </Box>
    )
}

export default Question
