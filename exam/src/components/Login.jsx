import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (email === 'admin@example.com' && password === 'admin123') {
        localStorage.setItem('role', 'admin');
        localStorage.setItem('user', JSON.stringify({
          name: 'Администратор',
          email,
        }));
        navigate('/news-admin');
        return;
      }

      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Ошибка входа');
        return;
      }

      localStorage.setItem('role', 'user');
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/news');

    } catch (error) {
      console.error('Ошибка входа:', error);
      alert('Ошибка при входе');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Добро пожаловать</h2>
        <input
          type="email"
          placeholder="Введите e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
        <p>Нет аккаунта? <Link to="/register">Зарегистрироваться</Link></p>
      </form>
    </div>
  );
};

export default Login;
