import React from 'react';
import Header from '../../components/Header'; // Ajusta la ruta si es necesario
import './Home.css'; // Asegúrate de ajustar y tener este CSS para el estilo del contenido principal

const Home = () => {
  return (
    <div className="home-container">
      <Header />  {/* Incluye el Header en la página */}
      <main className="main-content">
        <section id="home">
          <h1>Explore the 3D Web of Environmental Conservation</h1>
          <p>Dive into the interactive world of environmental issues and solutions.</p>
          <button className="get-involved-btn">Get Involved</button>
        </section>
        <section id="about">
          <h2>About Us</h2>
          <p>Learn more about our mission and vision.</p>
        </section>
        <section id="team">
          <h2>Our Team</h2>
          <p>Meet the people making it all happen.</p>
        </section>
      </main>
    </div>
  );
};

export default Home;
