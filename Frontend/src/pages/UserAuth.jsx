import krishiLogo from "../assets/krishi-logo.png"
import Typography from '@mui/material/Typography'
import { Box } from '@mui/material'
import AccData from '../data/accountsData.json'
import { useDispatch } from 'react-redux'
import { useNavigate } from "react-router-dom"
import AccountSelCard from '../components/AccountSelCard'
import { updateChoices } from '../redux/slices/userSlice'

function UserAuth() {
    const navigate = useNavigate()
    const handleChoice = (choice) => {
        if (choice === "Login") {
            navigate('/login')
        } else {
            navigate('/lang-pref')
        }
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
                    Choose an account
                </Typography>
                <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
                    खाते का चयन करें
                </Typography>
            </Box>
            <Box component="div" sx={{ px: 18, py: 5, display: 'flex', gap: 2, justifyContent: "space-between" }}>
                {AccData.map(item => {
                    return <AccountSelCard name={item.Name} descEng={item.Description} descHindi={item.Description2} handleChoice={handleChoice} />
                })}
            </Box>
        </Box>
    )
}

export default UserAuth
