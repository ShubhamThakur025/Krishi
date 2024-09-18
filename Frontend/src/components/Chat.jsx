import React, { useState, useEffect } from 'react';
import { ref, push, onValue, remove } from "firebase/database"; 
import { useParams, useNavigate } from 'react-router-dom';  // Import useParams to get userId from URL
import './Chat.css';
import { database } from '../../firebaseConfig';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const { currentUserId, targetUserId } = useParams();  // Get currentUserId and targetUserId from URL
  const chatRoomId = `${currentUserId}_${targetUserId}`;  // Create unique chat room ID
  const navigate = useNavigate(); 

  useEffect(() => {
    const messagesRef = ref(database, `chatRooms/${chatRoomId}`);  // Use unique chat room ID
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const chatMessages = [];
      for (let id in data) {
        chatMessages.push(data[id]);
      }
      setMessages(chatMessages);
    });
  }, [chatRoomId]);

  const sendMessage = () => {
    if (message.trim()) {
      const messagesRef = ref(database, `chatRooms/${chatRoomId}`);
      push(messagesRef, {
        message,
        sender: currentUserId,
        timestamp: new Date().toLocaleString()
      });
      setMessage('');
    }
  };

  const clearChat = () => {
    if (window.confirm('Are you sure you want to clear the chat?')) {
      const chatRef = ref(database, `chatRooms/${chatRoomId}`);
      remove(chatRef);
    }
  };

  const startBidding = () => {
    navigate(`/bidding?currentUserId=${currentUserId}&targetUserId=${targetUserId}`);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Buyer-Farmer Chat</h2>
        <button className="start-bidding" onClick={startBidding}>Start Bidding</button>
        <button className="clear-chat" onClick={clearChat}>Clear Chat</button>
      </div>
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div 
            key={index} 
            className={`chat-bubble ${msg.sender === currentUserId ? "my-message" : "other-message"}`}
          >
            <strong>{msg.sender}</strong>: {msg.message} <br />
            <small>{msg.timestamp}</small>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
