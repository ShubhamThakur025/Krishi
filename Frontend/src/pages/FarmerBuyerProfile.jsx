import React from 'react';
import { useParams } from 'react-router-dom';
import './FarmerBuyerProfile.css';

// Dummy data for farmers and buyers (replace this with actual API data)
const users = [
  {
    id: 'farmer1',
    name: 'Farmer 1',
    role: 'Farmer',
    crops: ['Wheat', 'Rice'],
    certificates: ['Organic Certification', 'Sustainable Farming Award'],
    history: 'Farmer 1 has been working in agriculture for 15 years, focusing on organic and sustainable farming practices.',
    photo: '/path/to/farmer1-photo.jpg',
    cropImages: ['/path/to/crop1.jpg', '/path/to/crop2.jpg'],
  },
  {
    id: 'buyer1',
    name: 'Buyer 1',
    role: 'Buyer',
    crops: ['Corn', 'Barley'],
    certificates: ['Quality Buyer Certification'],
    history: 'Buyer 1 has been purchasing high-quality crops for over 10 years, working with small and medium farms.',
    photo: '/path/to/buyer1-photo.jpg',
    cropImages: ['/path/to/crop3.jpg', '/path/to/crop4.jpg'],
  },
  // Add more users
];

const FarmerBuyerProfile = () => {
  const { id } = useParams();
  const user = users.find(u => u.id === id);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="profile-details">
      <div className="profile-container">
        <div className="profile-header">
          <img src={user.photo} alt={user.name} className="profile-photo" />
          <div className="profile-info">
            <h1>{user.name}</h1>
            <h3>{user.role}</h3>
            <p>{user.history}</p>
          </div>
        </div>

        {user.crops && (
          <div className="profile-crops">
            <h4 className="centered-heading">Crops</h4>
            <ul>
              {user.crops.map((crop, index) => (
                <li key={index}>{crop}</li>
              ))}
            </ul>
          </div>
        )}

        {user.certificates && (
          <div className="profile-certificates">
            <h4 className="centered-heading">Certificates</h4>
            <ul>
              {user.certificates.map((certificate, index) => (
                <li key={index}>{certificate}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="profile-images">
          <h4 className="centered-heading">Crop Images</h4>
          <div className="crop-gallery">
            {user.cropImages.map((img, index) => (
              <img key={index} src={img} alt={`Crop ${index + 1}`} className="crop-image" />
            ))}
          </div>
        </div>

        <button 
          className="start-chat-button" 
          onClick={() => alert('Start Chat')}
        >
          Start Chat
        </button>
      </div>
    </div>
  );
};

export default FarmerBuyerProfile;
