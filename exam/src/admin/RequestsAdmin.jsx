import React, { useState, useEffect } from 'react';
import '../styles/RequestsAdmin.css';
import { useNavigate } from 'react-router-dom';

const RequestsAdmin = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Все заявки');

  const filters = ['Все заявки', 'В процессе', 'Завершенные']; 

  useEffect(() => {
    fetch('http://localhost:5000/api/requests')
      .then(res => res.json())
      .then(setRequests)
      .catch(err => console.error('Ошибка загрузки заявок:', err));
  }, []);

  const filteredRequests = requests.filter(req => {
    if (activeFilter === 'Все заявки') return true;
    if (activeFilter === 'В процессе') return !['Завершена', 'Отклонена', 'Подана'].includes(req.status);
    if (activeFilter === 'Завершенные') return ['Завершена', 'Отклонена'].includes(req.status);
    return false;
  });  
  

  const getStatusClass = (status) => {
    switch (status) {
      case 'Завершена':
        return 'status-complete';
      case 'В процессе':
        return 'status-inprogress';
      case 'Отклонена':
        return 'status-declined';
      default:
        return 'status-default';
    }
  };

  return (
    <div className="main">
      <button className="back-btn" onClick={() => navigate(-1)}>&lt;</button>
      <div className="requests-container">
        <h2>Заявка</h2>

        <div className="filters">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`filter-button ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="requests-list">
          {filteredRequests.length === 0 ? (
            <p className="empty-text">Нет заявок по выбранному фильтру.</p>
          ) : (
            filteredRequests.map((req) => (
              <div
                className="request-card"
                key={req.id}
                onClick={() => navigate(`/requests-admin/${req.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <div className="request-title">{req.title}</div>
                <div className="request-info">
                  <span>{req.date}</span>
                  <span className={`request-status ${getStatusClass(req.status)}`}>{req.status}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestsAdmin;
