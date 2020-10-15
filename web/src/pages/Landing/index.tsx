import React from "react";
import "./landing.css";
import logoImg from "../../images/logo.svg";
import { FiArrowRight } from 'react-icons/fi'
import { Link } from "react-router-dom";

export const LandingPage: React.FC = () => {
  return (
    <div id="page-lading">
      <div className="content-wrapper">
        <Link to="/">
          <img src={logoImg} alt="Happy" />
        </Link>
        <main>
          <h1>Leve felicidade para o mundo</h1>
          <p>Visite orfanatos e mude o dia de muitas crianças.</p>
        </main>

        <div className="location">
          <strong>Taquarivaí</strong>
          <span>São Paulo</span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0,0,0, 0.6)" />
        </Link>
      </div>
    </div>
  );
};
