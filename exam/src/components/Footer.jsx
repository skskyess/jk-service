import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <NavLink to="/news" className="nav" activeclassname="active">
        <span>Главная</span>
      </NavLink>
      
      <NavLink to="/messages" className="nav" activeclassname="active">
        <span>Сообщения</span>
      </NavLink>
      
      <NavLink to="/home" className="nav" activeclassname="active">
        <span>Мой дом</span>
      </NavLink>
      
      <NavLink to="/menu" className="nav" activeclassname="active">
        <span>Меню</span>
      </NavLink>
    </footer>
  );
};

export default Footer;
