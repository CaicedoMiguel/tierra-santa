// eslint-disable-next-line no-unused-vars
import React from "react";
import './Home.css';
import Navbar from "../../components/Navbar";
import ModelViewer from "../../components/ModelViewer";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

const Home = () => {
    return (
        <>
        <div className="container">
            <Navbar />
            <div className="modelo3D">
            <ModelViewer />
            </div>
            <div className="titulo">
                <h1>TIERRA SANTA</h1>
            </div>
            <div className="introducion">
                <p className="descripcion">TIERRA SANTA es una aplicacion web informativa sobre el medio ambiente mediante modelos y objetos en 3D. Nuestra mision es birndarle al usuario el conocimiento adecuado que se necesita para cuidar y proteger nuestro medio ambiente. Y hacer de nuestro planeta siga siendo esa TIERRA maravillosa </p>
            </div>
        </div>
        </>
    );
};

export default Home;
