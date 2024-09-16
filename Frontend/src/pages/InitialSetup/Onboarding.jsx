import Question from '../../components/InitialSetup/Question'
import { useState } from 'react'
import questionsArray from '../../data/onboardingQna.json'
import { Box } from '@mui/material'
import { Container } from '@mui/material'
import krishiLogo from "../../assets/krishi-logo.png"

function Onboarding() {
    const [questionIndex, setQuestionIndex] = useState(0)

    return (
        <Container component="section" sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
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
            <Question questionItem={questionsArray[questionIndex]} setQuestionIndex={setQuestionIndex} questionIndex={questionIndex} />
        </Container>
    )
}

export default Onboarding
