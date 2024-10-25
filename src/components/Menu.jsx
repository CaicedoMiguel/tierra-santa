import React from 'react';
import { Link } from 'react-router-dom'; // Importa Link

function Menu() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      color: 'white',
      fontSize: '24px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
    }}>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>Menú</h1>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/sobre-nosotros" style={{ color: 'white', textDecoration: 'none' }}>Sobre nosotros</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/impacto-ambiental" style={{ color: 'white', textDecoration: 'none' }}>Impacto ambiental</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/participa" style={{ color: 'white', textDecoration: 'none' }}>Participa</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/contactenos" style={{ color: 'white', textDecoration: 'none' }}>Contáctenos</Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/unete" style={{ color: 'white', textDecoration: 'none' }}>Únete</Link>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
