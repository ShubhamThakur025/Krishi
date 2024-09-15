import './App.css'
import LangPref from './pages/InitialSetup/LangPref'
import { Container } from '@mui/material'
import RoleSelection from './pages/InitialSetup/RoleSelection'
import WelcomePage from './pages/WelcomePage'
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme.js'
import { Route, Routes } from 'react-router-dom';
import Onboarding from './pages/InitialSetup/Onboarding.jsx'
import UserInfo from './pages/InitialSetup/UserInfo.jsx'

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" disableGutters >
          <Routes>
            <Route path='/' element={<LangPref />} />
            <Route path='/role-selection' element={<RoleSelection />} />
            <Route path='/welcome' element={<WelcomePage />} />
            <Route path='/onboarding' element={<Onboarding />} />
            <Route path='/finish' element={<UserInfo />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
