import Question from '../../components/InitialSetup/Question'
import { useState } from 'react'
import questionsArray from '../../data/onboardingQna.json'
import { Box } from '@mui/material'
import krishiLogo from "../../assets/krishi-logo.png"

function Onboarding() {
    const [questionIndex, setQuestionIndex] = useState(0)

    return (
        <Box component="section" sx={{ p: 2, display: 'flex', flexDirection: 'column', textAlign: 'center', gap: 2 }}>
            <Box component="img"
                src={krishiLogo}
                alt="Krishi-Logo"
                sx={{ width: 110, height: 110, mx: 'auto' }}
            />
            <Question questionItem={questionsArray[questionIndex]} setQuestionIndex={setQuestionIndex} questionIndex={questionIndex} />
        </Box>
    )
}

export default Onboarding
