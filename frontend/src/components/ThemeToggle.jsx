import { useState } from 'react';
import './ThemeToggle.css';
import sunIcon from '../assets/images/sol.png';
import moonIcon from '../assets/images/lua-crescente.png';

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    document.body.classList.toggle('dark');
    setDarkMode(!darkMode);
  };

  return (
    <div className="theme-toggle-container no-fade">
      <label className="switch">
        <input
          type="checkbox"
          onChange={toggleTheme}
          checked={darkMode}
        />
        <span className="slider">
          <img
            src={darkMode ? moonIcon : sunIcon}
            alt="Ícone do tema"
            className="theme-icon"
          />
        </span>
      </label>
    </div>
  );
}
