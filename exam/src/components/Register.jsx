import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Auth.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    complex: 'Arman City',
    apartment: '',
    agree: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.agree) {
      return alert('Пожалуйста, согласитесь на обработку данных');
    }

    try {
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Ошибка регистрации');
      } else {
        alert('Успешная регистрация!');
        navigate('/login');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert('Ошибка при отправке формы');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Регистрация</h2>
        <input type="text" name="name" placeholder="Введите ФИО" value={form.name} onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="+7(" value={form.phone} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Введите e-mail" value={form.email} onChange={handleChange} required />
        <input
          type="password"
          name="password"
          placeholder="Придумайте пароль"
          value={form.password}
          onChange={handleChange}
          required
        />

        <select name="complex" value={form.complex} onChange={handleChange}>
          <option value="Arman City">Arman City</option>
          <option value="Green Valley">Green Valley</option>
        </select>

        <input type="text" name="apartment" placeholder="Квартира/Этаж" value={form.apartment} onChange={handleChange} required />

        <label className="checkbox">
          <input type="checkbox" name="agree" checked={form.agree} onChange={handleChange} /> Я согласен на <a href="#">обработку персональных данных</a>
        </label>

        <button type="submit">Зарегистрироваться</button>
        <p>Уже есть аккаунт? <Link to="/login">Войти</Link></p>
      </form>
    </div>
  );
};

export default Register;