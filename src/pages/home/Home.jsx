import React from 'react';
import './Home.css'; // Asegúrate de ajustar el import de CSS

const Home = () => {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">🌍 Tierra Santa</div>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#about">About Us</a>
          <a href="#team">Our Team</a>
          <a href="#movement" className="join-btn">Join the Movement</a>
        </div>
      </nav>

      <div className="main-content">
        <div className="text-section">
          <h1>Explore the 3D Web of Environmental Conservation</h1>
          <p>Dive into the interactive world of environmental issues and solutions.</p>
          <button className="get-involved-btn">Get Involved</button>
        </div>

        <div className="image-section">
          <img src="/assets/team-image.png" alt="Our Team" /> {/* Ajusta la ruta si es necesario */}
        </div>
      </div>
    </div>
  );
};

export default Home;
