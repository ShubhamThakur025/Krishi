import krishiLogo from "../../assets/krishi-logo.png"
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import langData from '../../data/languages.json'
import { useDispatch } from 'react-redux';
import LanguageSelCard from "../../components/InitialSetup/LanguageSelCard";
import { useNavigate } from "react-router-dom";
import { updateChoices } from '../../redux/slices/userSlice'

function LangPref() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChoice = (choice) => {
        dispatch(updateChoices({ language: choice }))
        navigate('/role-selection')
    }

    return (
        <>
            <Box component="section" sx={{ p: 2, display: 'flex', flexDirection: 'column', textAlign: 'center', gap: 2 }}>
                <Box component="img"
                    src={krishiLogo}
                    alt="Krishi-Logo"
                    sx={{ width: 110, height: 110, mx: 'auto' }}
                />
                <Box component="div">
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                        Choose your language preference
                    </Typography>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                        अपनी भाषा का चयन करें
                    </Typography>
                </Box>
                <Box component="div" sx={{ px: 18, py: 5, display: 'flex', gap: 2, justifyContent: "space-between" }}>
                    {langData.map(lang => {
                        return <LanguageSelCard name={lang.Name} desc={lang.Description} desc2={lang.Description2} onClick={() => handleChoice(lang.Name)}/>
                    })}
                </Box>
            </Box>
        </>
    )
}

export default LangPref
