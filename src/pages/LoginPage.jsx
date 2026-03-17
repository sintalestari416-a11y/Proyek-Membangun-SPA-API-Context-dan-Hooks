import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { login } from '../utils/network-data';
import LanguageContext from '../contexts/LanguageContext'; 

function LoginPage({ loginSuccess }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const { language } = useContext(LanguageContext);

  async function onSubmitHandler(event) {
    event.preventDefault();
    const { error, data } = await login({ email, password });
    if (!error) loginSuccess(data);
  }

  return (
    <section className="login-page">
      {}
      <h2>
        {language === 'id' 
          ? 'Yuk, login untuk menggunakan aplikasi.' 
          : 'Login to use app, please.'}
      </h2>
      
      <form onSubmit={onSubmitHandler} className="input-login">
        <label htmlFor="email">Email</label>
        <input type="email" id="email" value={email} onChange={onEmailChange} />
        
        <label htmlFor="password">Password</label>
        <input type="password" id="password" value={password} onChange={onPasswordChange} />
        
        <button type="submit">Login</button>
      </form>
      
      <p>
        {language === 'id' ? 'Belum punya akun? ' : "Don't have an account? "}
        <Link to="/register">{language === 'id' ? 'Daftar di sini' : 'Register here'}</Link>
      </p>
    </section>
  );
}

export default LoginPage;