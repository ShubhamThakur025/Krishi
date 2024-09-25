


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
import UserDashboard from './pages/Dashboard/UserDashboard.jsx'
import GetInfo from './pages/Dashboard/GetInfo.jsx';
import FilterBuyer from './pages/Dashboard/FilterBuyer.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import KnowledgeHub from "./pages/KnowledgeHub";

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
            <Route path='/dashboard' element={<UserDashboard />} />
            <Route path='/getInfo' element={<GetInfo />} />
            <Route path='/filterBuyer' element={<FilterBuyer/>}/>
            < Route path ="/KnowledgeHub" element={<KnowledgeHub/>}/>
          </Routes>
          <ToastContainer />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App

