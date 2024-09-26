


import './App.css'
import LangPref from './pages/InitialSetup/LangPref'
import { Container } from '@mui/material'
import RoleSelection from './pages/InitialSetup/RoleSelection'
import WelcomePage from './pages/WelcomePage'
import { ThemeProvider } from '@mui/material/styles'
import theme from './Theme.js'
import { Route, Routes, Navigate } from 'react-router-dom'
import Onboarding from './pages/InitialSetup/Onboarding.jsx'
import UserInfo from './pages/InitialSetup/UserInfo.jsx'
import UserDashboard from './pages/Dashboard/UserDashboard.jsx'
import GetInfo from './pages/Dashboard/GetInfo.jsx'
import Chat from './pages/Chats/Chat.jsx'
import Login from './pages/Login.jsx'
import BiddingPage from './pages/BiddingRoom/BiddingRoom.jsx'
import FilterBuyer from './pages/Dashboard/FilterBuyer.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserAuth from './pages/UserAuth.jsx'
import SearchResults from './pages/Dashboard/SearchResults.jsx'
import UserProfile from './pages/UserProfile/UserProfile.jsx'
import { useDispatch } from 'react-redux'
import { updateChoices } from './redux/slices/userSlice'
import getUser from './utils/getUser.js'
import KnowledgeHub from "./pages/KnowledgeHub";

function App() {
  const token = getUser()
  const dispatch = useDispatch()
  if (token) {
    dispatch(updateChoices({ ...token }))
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" disableGutters>
          <Routes>
            <Route path='/' element={token ? <Navigate to="/dashboard" replace /> : <UserAuth />} />
            <Route path='/lang-pref' element={<LangPref />} />
            <Route path='/role-selection' element={<RoleSelection />} />
            <Route path='/welcome' element={<WelcomePage />} />
            <Route path='/onboarding' element={<Onboarding />} />
            <Route path='/finish' element={<UserInfo />} />
            <Route path='/dashboard' element={token ? <UserDashboard /> : <Navigate to="/" replace />} />
            <Route path='/getInfo' element={token ? <GetInfo /> : <Navigate to="/" replace />} />
            <Route path='/chat/:currentUserId/:targetUserId/:targetUserName' element={token ? <Chat /> : <Navigate to="/" replace />} />
            <Route path="/bidding/:currentUserId/:targetUserId/:targetUserName" element={token ? <BiddingPage /> : <Navigate to="/" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search-results" element={token ? <SearchResults /> : <Navigate to="/" replace />} />
            <Route path="/user-profile/:userId/:role" element={token ? <UserProfile /> : <Navigate to="/" replace />} />
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

