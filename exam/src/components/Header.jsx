import React from 'react';
import '../styles/Header.css';
import { useLocation } from 'react-router-dom';
import logo from "../assets/logo.png";

const Header = () => {
  const location = useLocation();
  const role = localStorage.getItem('role');

  const hiddenPaths = ['/login', '/register', '/add'];
  if (hiddenPaths.includes(location.pathname)) return null;

  const getTitle = () => {
    switch (location.pathname) {
      case '/news':
        return role === 'admin' ? 'Новости' : 'Новости';
      case '/news-admin':
        return 'Новости';
      case '/home':
        return 'Мой дом';
      case '/messages':
        return 'Сообщения';
      case '/menu':
        return 'Меню';
      default:
        return '';
    }
  };

  return (
    <header className="header">
      <img src={logo} alt="logo" className="logo" />
      <h5 className='header-h2'>{getTitle()}</h5>
    </header>
  );
};

export default Header;
