import React, { useContext } from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from '../images/MapMarker.svg';
import mapMarkerDarkImg from '../images/MapMarkerDark.svg';

import '../styles/components/sidebar.css';

import { ThemeContext } from '../App';

export default function Sidebar() {
  const themeContext = useContext(ThemeContext);

  const { goBack } = useHistory();

  return (
    <aside
      className={
        themeContext.theme === 'light' ? 'app-sidebar' : 'app-sidebar dark'
      }
    >
      <img
        src={themeContext.theme === 'light' ? mapMarkerImg : mapMarkerDarkImg}
        alt='Happy'
      />

      <footer>
        <button type='button' onClick={goBack}>
          <FiArrowLeft size={24} color='#FFF' />
        </button>
      </footer>
    </aside>
  );
}
