import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database'; // Import Firebase methods
import { useNavigate, useParams } from 'react-router-dom';
import { database } from '../../firebaseConfig';
import './MyChats.css'; // Custom CSS for styling

const MyChats = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const { currentUserId } = useParams(); // Get currentUserId from URL
  const navigate = useNavigate();

  useEffect(() => {
    const chatRoomsRef = ref(database, `users/${currentUserId}/chats`);
    onValue(chatRoomsRef, (snapshot) => {
      const data = snapshot.val();
      const chatList = data ? Object.entries(data).map(([id, info]) => ({ id, ...info })) : [];
      setChatRooms(chatList);
    });
  }, [currentUserId]);

  // Navigate to a specific chat room
  const openChat = (chatRoomId) => {
    navigate(`/chat/${currentUserId}/${chatRoomId}`);
  };

  return (
    <div className="my-chats-container">
      <h2>My Chats</h2>
      {chatRooms.length ? (
        <ul>
          {chatRooms.map((chat) => (
            <li key={chat.id} onClick={() => openChat(chat.id)}>
              Chat with {chat.receiverId} - Last Message: {chat.messages[chat.messages.length - 1].content}
            </li>
          ))}
        </ul>
      ) : (
        <p>No chats found.</p>
      )}
    </div>
  );
};

export default MyChats;
