import React from 'react';

import './../styles/Global.css'
import './../styles/Landing.css'
import LogoImg from './../images/logo.svg'
import LandingImg from './../images/landing.svg'

import { FiArrowRight } from 'react-icons/fi'
import { GiModernCity } from 'react-icons/gi'
import { FaGlobeAmericas } from 'react-icons/fa'

import { Link } from 'react-router-dom'


const Landing = () => {

  return (
    <div id="page-landing">
        <div className="content-wrapper">
          <img className="page-logo" src={LogoImg} alt="Where to Date"/>
          <main>
            <h1>Encontre o melhor lugar para o seu <span className="orange">Date</span>!</h1>
            <p>Lugares incrivéis para um encontro <span className="orange">inesquecível</span> !!!</p>
          </main>
          <img src={LandingImg} alt="" className="page-landing"/>
          <div className="location">
            <strong><GiModernCity size={26} color="rgba(255, 187, 0, 0.7)"/> Taboão da Serra <GiModernCity size={26} color="rgba(255, 187, 0, 0.7)"/></strong>
            <span><FaGlobeAmericas size={26} color="rgba(255, 187, 0, 0.7)"/> São Paulo - BR <FaGlobeAmericas size={26} color="rgba(255, 187, 0, 0.7)"/></span>
          </div>

          <Link to="/app" className="enter-app">
            <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)"/>
          </Link>
        </div>
    </div>

  );
}

export default Landing;
