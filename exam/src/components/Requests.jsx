import '../styles/Requests.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

export default function Requests() {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('active');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userEmail = user?.email;

    if (userEmail) {
      fetch(`http://localhost:5000/api/requests?email=${userEmail}`)
        .then(res => res.json())
        .then(data => setRequests(data))
        .catch(err => console.error('Ошибка загрузки заявок:', err));
    }
  }, []);

  const filteredRequests = requests.filter(req =>
    activeTab === 'active'
      ? req.status !== 'Завершена' && req.status !== 'Отклонена'
      : req.status === 'Завершена' || req.status === 'Отклонена'
  );

  return (
    <>
      <div className="custom-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>&larr;</span>
        <h1 className="page-title">Заявки</h1>
      </div>

      <div className="request-page">
        <div className="tabs">
          <button
            className={activeTab === 'active' ? 'tab-active' : 'tab'}
            onClick={() => setActiveTab('active')}
          >
            Активные
          </button>
          <button
            className={activeTab === 'history' ? 'tab-active' : 'tab'}
            onClick={() => setActiveTab('history')}
          >
            История
          </button>
        </div>

        {filteredRequests.length === 0 ? (
          <p className="empty-text">Заявок нет</p>
        ) : (
          <div className="request-list">
            {filteredRequests.map(req => (
              <div key={req.id} className="request-card">
                <div className="request-title">{req.title}</div>
                <div className="request-info">
                  <span>{req.date}</span>
                  <span className="request-status">{req.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={() => navigate('/create-request')}
          className="request-button"
        >
          Создать заявку
        </button>
      </div>

      <Footer active="Меню" />
    </>
  );
}
