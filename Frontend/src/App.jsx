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
import ConfirmationPage from './pages/ConfirmationPage.jsx'
import ContractPage from './pages/ContractPage'
import UserDashboard from './pages/Dashboard/UserDashboard.jsx'
import GetInfo from './pages/Dashboard/GetInfo.jsx'
import Chat from './components/Chat.jsx'
import MyChats from './pages/MyChats.jsx'
import Login from './pages/Login.jsx'
import BiddingPage from './components/BiddingRoom.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import UserAuth from './pages/UserAuth.jsx'
import SearchResults from './pages/Dashboard/SearchResults.jsx'
import UserProfile from './pages/UserProfile/UserProfile.jsx'
import getCookie from './utils/getCookie'
import { useDispatch } from 'react-redux'
import { updateChoices } from './redux/slices/userSlice'
import getUser from './utils/getUser.js'

function App() {
  const dummyBidDetails = {
    amount: '5000 USD',
    crop: 'Wheat',
    farmer: 'Farmer 1',
    buyer: 'Buyer 1',
    date: '2024-10-01',
    location: 'City, State',
    deliveryDate: '2024-11-10',
  }

  const token = getUser()
  const dispatch = useDispatch()
  if (token) {
    dispatch(updateChoices({ token }))
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
            <Route path='/GetInfo' element={token ? <GetInfo /> : <Navigate to="/" replace />} />
            <Route path='/chat/:currentUserId/:targetUserId' element={token ? <Chat /> : <Navigate to="/" replace />} />
            <Route path="/confirm" element={token ? <ConfirmationPage bidDetails={dummyBidDetails} /> : <Navigate to="/" replace />} />
            <Route path="/contract" element={token ? <ContractPage contractDetails={dummyBidDetails} /> : <Navigate to="/" replace />} />
            <Route path="/my-chats/:userId" element={token ? <MyChats /> : <Navigate to="/" replace />} />
            <Route path="/bidding" element={token ? <BiddingPage /> : <Navigate to="/" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search-results" element={token ? <SearchResults /> : <Navigate to="/" replace />} />
            <Route path="/user-profile/:userId/:role" element={token ? <UserProfile /> : <Navigate to="/" replace />} />
          </Routes>
          <ToastContainer />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App
