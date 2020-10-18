import React, { useState } from 'react';

import './styles/global.css';
import 'leaflet/dist/leaflet.css';

import Routes from './routes';

interface Theme {
  theme: string;
  changeTheme: () => void;
}

export const ThemeContext = React.createContext<Theme>({
  theme: 'light',
  changeTheme: () => {},
});

function App() {
  const [theme, setTheme] = useState('light');

  const changeTheme = () => {
    console.log('hai');
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <Routes />
    </ThemeContext.Provider>
  );
}

export default App;
