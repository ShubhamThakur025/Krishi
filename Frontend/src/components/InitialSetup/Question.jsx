import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Box, Typography, Button, TextField, Checkbox, FormGroup, FormControlLabel, RadioGroup, Radio } from '@mui/material'
import { updateChoices } from '../../redux/slices/userSlice'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useSelector } from 'react-redux'

function Question({ questionItem, questionIndex, setQuestionIndex }) {
    const [textInput, setTextInput] = useState("")
    const [buyerCategory, setBuyerCategory] = useState("")
    const [selectedCrops, setSelectedCrops] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const role = useSelector(state => state.user.choices.role)

    const handleChoice = () => {
        if (role === 'Farmer' && questionIndex === 4 || role === 'Buyer' && questionIndex === 5) {
            navigate('/finish')
        }
        const updatePayload = questionItem.id === 5 ? { [questionItem.fieldName]: selectedCrops } : (questionItem.id === 6 ? { [questionItem.fieldName]: buyerCategory } : { [questionItem.fieldName]: textInput })
        dispatch(updateChoices(updatePayload))
        setQuestionIndex(prev => prev + 1)
        setTextInput("")
    }

    const handleCropSelection = (e) => {
        const cropName = e.target.name
        if (e.target.checked) {
            setSelectedCrops(prev => [...prev, cropName])
        } else {
            setSelectedCrops(prev => prev.filter(item => item !== cropName))
        }
    }

    const handleCategoryChange = (e) => {
        setBuyerCategory(e.target.value)
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
                : (questionItem.id === 6 ? (
                    <RadioGroup
                        row
                        aria-labelledby="select-category"
                        name="select-category"
                        onChange={handleCategoryChange}
                        value={buyerCategory}
                    >
                        <FormControlLabel value="Wholesale Buyer" control={<Radio />} label="Wholesale Buyer" />
                        <FormControlLabel value="Small-Scale Buyer" control={<Radio />} label="Small-Scale Buyer" />
                    </RadioGroup>
                ) :
                    < TextField label={[questionItem.fieldName]} color="primary" value={textInput} onChange={(e) => setTextInput(e.target.value)} />
                )
            }
            <Button variant="contained" sx={{ width: 200, mx: 'auto' }} onClick={handleChoice}>Next <NavigateNextIcon /></Button>
        </Box>
    )
}

export default Question
