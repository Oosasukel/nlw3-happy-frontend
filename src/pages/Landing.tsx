import React, { useContext } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';

import logoImg from '../images/Logo.svg';
import logoDarkImg from '../images/LogoDark.svg';

import { ThemeContext } from '../App';

function Landing() {
  const themeContext = useContext(ThemeContext);

  return (
    <div
      id='page-landing'
      className={themeContext.theme === 'dark' ? 'dark' : ''}
    >
      <div className='content-wrapper'>
        <div className='info'>
          <img
            src={themeContext.theme === 'light' ? logoImg : logoDarkImg}
            alt='Happy'
          />

          <main>
            <h1>Leve felicidade para o mundo</h1>
            <p>Visite orfanatos e mude o dia de muitas crianças.</p>
          </main>
        </div>

        <div className='enter'>
          <div className='location'>
            <strong>Capela do Alto</strong>
            <span>São Paulo</span>
          </div>

          <Link to='/app' className='enter-app'>
            <FiArrowRight
              size={26}
              color={
                themeContext.theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.6)'
                  : 'rgba(0, 0, 0, 0.6)'
              }
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Landing;
