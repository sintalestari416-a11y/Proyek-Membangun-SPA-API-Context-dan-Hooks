import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, Link } from 'react-router-dom'; 
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DetailPage from './pages/DetailPage';
import ArchivesPage from './pages/ArchivesPage';
import AddPage from './pages/AddPage';
import { getUserLogged, putAccessToken } from './utils/network-data';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import LoadingIndicator from './components/LoadingIndicator';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'id');

  useEffect(() => {
    async function fetchUser() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }
    fetchUser();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const onLoginSuccess = async ({ accessToken }) => {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  };

  const onLogout = () => {
    setAuthedUser(null);
    putAccessToken('');
  };

  const themeContextValue = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }), [theme]);

  const languageContextValue = useMemo(() => ({
    language,
    toggleLanguage: () => setLanguage((prev) => (prev === 'id' ? 'en' : 'id'))
  }), [language]);

  if (initializing) {
    return (
      <div className="app-container">
        <LoadingIndicator />
      </div>
    );
  }

  return (
    <ThemeProvider value={themeContextValue}>
      <LanguageProvider value={languageContextValue}>
        <div className="app-container">
          {}
          <header>
            <h1>
              <Link to="/">{language === 'id' ? 'Aplikasi Catatan' : 'Notes App'}</Link>
            </h1>
            <Navigation logout={onLogout} name={authedUser?.name} />
          </header>
          {}

          <main>
            {authedUser === null ? (
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            ) : (
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/notes/:id" element={<DetailPage />} />
                <Route path="/archives" element={<ArchivesPage />} />
                <Route path="/notes/new" element={<AddPage />} />
              </Routes>
            )}
          </main>
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;