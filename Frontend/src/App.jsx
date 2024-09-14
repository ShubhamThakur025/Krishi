import './App.css'
import LangPref from './pages/InitialSetup/LangPref'
import { Container } from '@mui/material'
import RoleSelection from './pages/InitialSetup/RoleSelection'
import WelcomePage from './pages/WelcomePage'
import { ThemeProvider } from '@mui/material/styles';
import theme from './Theme.js'
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" >
          <Routes>
            <Route path='/' element={<LangPref />} />
            <Route path='/role-selection' element={<RoleSelection />} />
            <Route path='/welcome' element={<WelcomePage />} />
          </Routes>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
