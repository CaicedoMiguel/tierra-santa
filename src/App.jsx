import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Login from './pages/login/Login';
import Quiz from './pages/quiz/Quiz';
import GlobeScene from './components/GlobeScene'; 

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />  {}
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
        {}
        <div className="escenario-container">
          <h1>Mi Escenario 3D Personalizado</h1>
          <GlobeScene /> {}
        </div>
      </div>
    </Router>
  );
}

export default App;
