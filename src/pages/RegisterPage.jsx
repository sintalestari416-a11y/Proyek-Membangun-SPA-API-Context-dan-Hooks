import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../hooks/useInput';
import { register } from '../utils/network-data';
import LanguageContext from '../contexts/LanguageContext'; 

function RegisterPage() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const [confirmPassword, onConfirmPasswordChange] = useInput('');
  
  const { language } = useContext(LanguageContext); 
  const navigate = useNavigate();

  async function onSubmitHandler(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      return alert(language === 'id' ? 'Password dan Confirm Password harus sama!' : 'Passwords do not match!');
    }
    
    const { error } = await register({ name, email, password });
    if (!error) navigate('/');
  }

  return (
    <section className="register-page">
      <h2>{language === 'id' ? 'Isi form untuk mendaftar akun.' : 'Fill the form to register an account.'}</h2>
      <form onSubmit={onSubmitHandler} className="input-register">
        <label>{language === 'id' ? 'Nama' : 'Name'}</label>
        <input type="text" value={name} onChange={onNameChange} />
        
        <label>Email</label>
        <input type="email" value={email} onChange={onEmailChange} />
        
        <label>Password</label>
        <input type="password" value={password} onChange={onPasswordChange} />
        
        <label>{language === 'id' ? 'Konfirmasi Password' : 'Confirm Password'}</label>
        <input type="password" value={confirmPassword} onChange={onConfirmPasswordChange} />
        
        <button type="submit">{language === 'id' ? 'Daftar' : 'Register'}</button>
      </form>
      <p>
        {language === 'id' ? 'Sudah punya akun? ' : 'Already have an account? '}
        <Link to="/">{language === 'id' ? 'Login di sini' : 'Login here'}</Link>
      </p>
    </section>
  );
}

export default RegisterPage;