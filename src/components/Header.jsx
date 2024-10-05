import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">🌍 Tierra Santa</div>
            <nav className="navbar">
                <a href="#home" className="nav-link">Home</a>
                <a href="#about" className="nav-link">About Us</a>
                <a href="#team" className="nav-link">Our Team</a>
                <a href="#" className="nav-link join-btn">Join the Movement</a>
            </nav>
        </header>
    );
};

export default Header;
