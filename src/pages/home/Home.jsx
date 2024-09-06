import React from "react";
import useAuthStore from '../../stores/use-auth-store';
import { useNavigate } from 'react-router-dom';
import ModelViewer from "../../components/ModelViewer";

export default function Component() {
  // Retrieve the `logout` function from the authentication store.
  const { logout } = useAuthStore();
  // Initialize the `navigate` function for navigation purposes.
  const navigate = useNavigate();

// Function to handle the logout process
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error("Error al hacer logout:", error);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <ModelViewer />
      <button 
        onClick={handleLogout} 
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '5px 10px',
          fontSize: '0.8rem',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        Logout
      </button>
    </div>
  );
}