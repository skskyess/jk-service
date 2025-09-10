import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../styles/News.css';

const NewsAdmin = () => {
  const navigate = useNavigate();
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => setNewsList(data))
      .catch(error => console.error('Ошибка загрузки новостей:', error));
  }, []);

  const handleOpenNews = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div className="news-page">
      <div className="news-header-container">
        <h2 className="news">Новости</h2>
      </div>

      <div className="news-list">
        {newsList.length > 0 ? (
          newsList.map((item) => (
            <div
              className="news-card"
              key={item.id}
              onClick={() => handleOpenNews(item.id)}
              style={{ cursor: 'pointer' }}
            >
              <img src={item.cover} alt={item.title} />
              <div className="overlay">
                <h3 className="overlay-h3">{item.title}</h3>
                <p>Подробнее</p>
              </div>
            </div>
          ))
        ) : (
          <p>Нет опубликованных новостей</p>
        )}
      </div>

      <footer className="bottom-nav">
        <NavLink to="/news-admin" className="nav-item active">Главная</NavLink>
        <NavLink to="/home-admin" className="nav-item">Мой дом</NavLink>
        <NavLink to="/menu-admin" className="nav-item">Меню</NavLink>
      </footer>
    </div>
  );
};

export default NewsAdmin;
