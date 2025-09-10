import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/NewsDetail.css';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/news')
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => String(item.id) === id);
        setNews(found);
      })
      .catch((error) => {
        console.error('Ошибка загрузки новости:', error);
      });
  }, [id]);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Удалить новость?');
    if (!confirmDelete) return;

    try {
      await fetch(`http://localhost:5000/api/news/${id}`, {
        method: 'DELETE',
      });
      navigate('/news-admin');
    } catch (error) {
      console.error('Ошибка удаления:', error);
      alert('Ошибка при удалении новости');
    }
  };

  const isAdmin = localStorage.getItem('role') === 'admin';
  console.log('Текущая роль:', localStorage.getItem('role')); 

  if (!news) return <p className="not-found">Новость не найдена</p>;

  return (
    <div className="news-detail">
      <div className="header-row">
        <button className="back-btn" onClick={() => navigate(-1)}>←</button>
        
        {isAdmin && (
          <div className="actions">
            <span className="delete-icon" onClick={handleDelete}>🗑️ Удалить новость</span>
          </div>
        )}
      </div>

      <h2 className="news-detail-h2">Новости</h2>
      <h3 className="news-detail-title">{news.title}</h3>
      {news.subtitle && <p className="news-detail-subtitle">{news.subtitle}</p>}

      <div className="news-text">
        {news.text.split('\n').map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>
    </div>
  );
};

export default NewsDetail;
