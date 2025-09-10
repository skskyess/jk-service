import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/RequestDetails.css';

const statusOptions = [
  'Подана',
  'Ответственный назначен',
  'Ответственный переназначен',
  'В процессе',
  'Завершена',
  'Отклонена',
];

const RequestDetailsAdmin = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/requests/${id}`)
      .then(res => res.json())
      .then(data => {
        setRequest(data);
        setStatus(data.status);
      })
      .catch(err => {
        console.error('Ошибка загрузки:', err);
        alert('Заявка не найдена');
      });
  }, [id]);

  const handleSave = async () => {
    try {
      await fetch(`http://localhost:5000/api/requests/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      alert(`Статус обновлен: ${status}`);
    } catch (err) {
      alert('Ошибка при обновлении статуса');
      console.error(err);
    }
  };


  if (!request) return <p>Загрузка...</p>;

  return (
    <div className="details-container">
      <button className="back-button" onClick={() => navigate(-1)}>←</button>
      <h2>Детали заявки</h2>

      <h3>{request.title}</h3>
      {request.image && (
        request.image.includes('video') ? (
          <video controls className="request-media">
            <source src={request.image} type="video/mp4" />
            Ваш браузер не поддерживает видео.
          </video>
        ) : (
          <img src={request.image} alt="Медиа" className="request-image" />
        )
      )}


      <div className="field">
        <strong>Комментарий</strong>
        <p>{request.comment}</p>
      </div>

      <div className="field">
        <strong>Когда подано</strong>
        <p>{request.date}</p>
      </div>

      <div className="field">
        <strong>Статус</strong>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          {statusOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      <div className="buttons">
        <button className="save-btn" onClick={handleSave}>Сохранить</button>
        <button className="cancel-btn" onClick={() => navigate(-1)}>Отменить</button>
      </div>
    </div>
  );
};

export default RequestDetailsAdmin;
