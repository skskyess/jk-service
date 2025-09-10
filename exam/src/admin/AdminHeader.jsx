import React from 'react';
import '../styles/Header.css';
import { useLocation } from 'react-router-dom';
import logo from "../assets/logo.png";

const AdminHeader = () => {
  const location = useLocation();
  const role = localStorage.getItem('role');

  const hiddenPaths = ['/login', '/register', '/add'];
  if (hiddenPaths.includes(location.pathname)) return null;

  const getTitle = () => {
    switch (location.pathname) {
      case '/news':
        return 'Новости';
      case '/news-admin':
        return 'Новости';
      case '/home':
        return 'Мой дом';
      case '/home-admin':
        return 'Мой дом';
      case '/menu':
        return 'Меню';
      case '/menu-admin':
        return 'Меню';
      case '/support-admin':
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

export default AdminHeader;
