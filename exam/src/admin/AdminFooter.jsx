import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Footer.css'; 

const AdminFooter = () => {
  return (
    <footer className="bottom-nav">
      <NavLink to="/news-admin" className="nav-item">Главная</NavLink>
      <NavLink to="/home-admin" className="nav-item">Мой дом</NavLink>
      <NavLink to="/menu-admin" className="nav-item">Меню</NavLink>
    </footer>
  );
};

export default AdminFooter;
