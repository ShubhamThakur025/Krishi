import React, { useState, useEffect } from 'react'
import { ref, push, onValue, remove } from "firebase/database"
import { useParams, useNavigate } from 'react-router-dom'
import { Button, TextField, Box, Typography, Paper } from '@mui/material'
import { database } from '../../firebaseConfig'
import avatar from '../../assets/avatar.jpg'
import { useSelector } from 'react-redux'

const Chat = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const { currentUserId, targetUserId, targetUserName } = useParams()
  const currentUserName = useSelector(state => state.user.choices.name)
  const chatRoomId = [currentUserId, targetUserId].sort().join('_')
  const navigate = useNavigate()

  useEffect(() => {
    const messagesRef = ref(database, `chatRooms/${chatRoomId}`)
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val()
      const chatMessages = []
      for (let id in data) {
        chatMessages.push(data[id])
      }
      setMessages(chatMessages)
    })
  }, [chatRoomId])

  const sendMessage = () => {
    if (message.trim()) {
      const messagesRef = ref(database, `chatRooms/${chatRoomId}`)
      push(messagesRef, {
        message,
        sender: currentUserId,
        timestamp: new Date().toLocaleString(),
      })
      setMessage('')
    }
  }

  const sendBotMessage = (botMessage) => {
    if (botMessage.trim()) {
      const messagesRef = ref(database, `chatRooms/${chatRoomId}`)
      push(messagesRef, {
        message: botMessage,
        sender: "KRISHI_BOT",
        timestamp: new Date().toLocaleString(),
      })
    }
  }

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat?')) {
      const chatRef = ref(database, `chatRooms/${chatRoomId}`)
      remove(chatRef)
    }
  }

  const startBidding = () => {
    sendBotMessage(`${currentUserName} has started bidding. Click on start bidding.`)
    navigate(`/bidding/${currentUserId}/${targetUserId}/${targetUserName}`)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'space-between',
        padding: '16px',
        backgroundColor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box component="img" src={avatar} alt="User Avatar" sx={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover' }} />
          <Typography variant="h5" sx={{ fontWeight: 'bold', ml: 2, color: 'grey.800' }}>{targetUserName}</Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            color="primary"
            onClick={startBidding}
            sx={{ marginRight: '8px' }}
          >
            Start Bidding
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={clearChat}
          >
            Clear Chat
          </Button>
        </Box>
      </Box>

      <Paper
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 5,
          backgroundColor: '#fff',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        }}
      >
        {messages.map((msg, index) => (
          <Box
          key={index}
          sx={{
            p: 2,
            width: 'fit-content',
            borderRadius: '8px',
            textAlign: msg.sender === currentUserId ? 'right' : 'left',
            backgroundColor: msg.sender === 'KRISHI_BOT' 
              ? '#d1e7ff'
              : msg.sender === currentUserId 
              ? 'tertiary.main' 
              : 'grey.200',
            marginLeft: msg.sender === currentUserId ? 'auto' : '0',
            marginRight: msg.sender === currentUserId ? '0' : 'auto',
            px: 4,
            py: 1.5,
            mt: 2
          }}
        >
          <Typography variant="body1" sx={{fontWeight: 'bold'}}>
            {msg.message}
          </Typography>
          <Typography variant="caption" sx={{ display: 'block', mt: 1 }}>
            {msg.timestamp}
          </Typography>
        </Box>
        
        ))}
      </Paper>

      <Box
        sx={{
          display: 'flex',
          gap: '12px',
          marginTop: '16px',
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          label="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={sendMessage}
        >
          Send
        </Button>
      </Box>
    </Box>
  )
}

export default Chat
