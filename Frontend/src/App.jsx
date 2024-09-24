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
import ConfirmationPage from './pages/ConfirmationPage.jsx';
import ContractPage from './pages/ContractPage';
import UserDashboard from './pages/Dashboard/UserDashboard.jsx';
import GetInfo from './pages/Dashboard/GetInfo.jsx';
import Chat from './components/Chat.jsx';
import MyChats from './pages/MyChats.jsx';
import Login from './pages/Login.jsx'
import BiddingPage from './components/BiddingRoom.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserAuth from './pages/UserAuth.jsx'
import SearchResults from './pages/Dashboard/SearchResults.jsx'
import UserProfile from './pages/UserProfile/UserProfile.jsx'

function App() {
  const dummyBidDetails = {
    amount: '5000 USD',
    crop: 'Wheat',
    farmer: 'Farmer 1',
    buyer: 'Buyer 1',
    date: '2024-10-01',
    location: 'City, State',
    deliveryDate: '2024-11-10',
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container maxWidth="xl" disableGutters >
          <Routes>
            <Route path='/lang-pref' element={<LangPref />} />
            <Route path='/' element={<UserAuth />} />
            <Route path='/role-selection' element={<RoleSelection />} />
            <Route path='/welcome' element={<WelcomePage />} />
            <Route path='/onboarding' element={<Onboarding />} />
            <Route path='/finish' element={<UserInfo />} />
            <Route path='/dashboard' element={<UserDashboard />} />
            <Route path='/GetInfo' element={<GetInfo />} />
            <Route path='/chat/:currentUserId/:targetUserId' element={<Chat />} />
            <Route path="/confirm" element={<ConfirmationPage bidDetails={dummyBidDetails} />} />
            <Route path="/contract" element={<ContractPage contractDetails={dummyBidDetails} />} />            
            <Route path="/my-chats/:userId" element={<MyChats />} />
            <Route path="/bidding" element={<BiddingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search-results" element={<SearchResults />} />
            <Route path="/user-profile/:userId/:role" element={<UserProfile />} />
          </Routes>
          <ToastContainer />
        </Container>
      </ThemeProvider>
    </>
  )
}

export default App;
