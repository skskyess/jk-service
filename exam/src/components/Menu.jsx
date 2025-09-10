import React from 'react';
import Footer from '../components/Footer';
import '../styles/Menu.css';
import img from "../assets/profile-circle.png";
import img2 from "../assets/message-edit.png";
import img3 from "../assets/lamp-on.png";
import img4 from "../assets/help_circle.png";
import { useNavigate } from 'react-router-dom';

const Menu = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="page-container">

      <div className="menu-content">
        <div className="user-info">
          <div className="icon"> <img src={img} alt="" /> </div>
          <div className="info">
            <h4>{user?.name || 'Имя не найдено'}</h4>
            <p>{user?.phone || 'Телефон не найден'}</p>

          </div>
        </div>

        <div className="menu-blocks">
          <div className="menu-block" onClick={() => navigate('/requests')} >
            <img src={img2} alt="" className='menu-img' />
            <h3>Заявки</h3>
          </div>
          <div className="menu-block" onClick={() => navigate('/complaints')}>
            <img src={img3} alt="" className='menu-img' />
            <h3>Жалобы/Предложения</h3>
          </div>
          <div className="menu-block" onClick={() => navigate('/support')}>
            <img src={img4} alt="" className='menu-img' />
            <h3>Поддержка</h3>
          </div>
        </div>
      </div>

      <Footer currentPage="menu" />
    </div>
  );
};

export default Menu;
