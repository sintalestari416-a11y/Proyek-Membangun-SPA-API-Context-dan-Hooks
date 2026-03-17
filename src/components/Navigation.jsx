import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut, FiSun, FiMoon } from 'react-icons/fi';
import { MdTranslate } from 'react-icons/md';
import PropTypes from 'prop-types';
import ThemeContext from '../contexts/ThemeContext';
import LanguageContext from '../contexts/LanguageContext';

function Navigation({ logout, name }) {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { language, toggleLanguage } = useContext(LanguageContext);

  return (
    <nav className="navigation">
      <ul>
        {/* PINDAHKAN TERARSIP KE DALAM KONDISI name */}
        {name && (
          <li>
            <Link to="/archives">
              {language === 'id' ? 'Terarsip' : 'Archived'}
            </Link>
          </li>
        )}
        
        <li>
          <button onClick={toggleLanguage} title="Ganti Bahasa">
            <MdTranslate /> {language === 'id' ? 'id' : 'en'}
          </button>
        </li>
        <li>
          <button onClick={toggleTheme} title="Ganti Tema">
            {theme === 'light' ? <FiMoon /> : <FiSun />}
          </button>
        </li>

        {name && (
          <li>
            <button onClick={logout} className="button-logout" title="Logout">
              <FiLogOut /> {name}
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string,
};

export default Navigation;