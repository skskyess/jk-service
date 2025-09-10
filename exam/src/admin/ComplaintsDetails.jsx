import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/SupportDetails.css';

const ComplaintsDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [comment, setComment] = useState('');

    const handleSendComment = async () => {
        const adminUser = JSON.parse(localStorage.getItem('user')) || { name: 'Администратор', email: 'admin@example.com' };

        await fetch('http://localhost:5000/api/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user: adminUser.name,
                userEmail: state.userEmail || 'unknown@example.com',
                topic: state.description || 'Жалоба/Предложение',
                type: 'Жалоба/Предложение',
                text: comment,
            }),
        });

        alert('Комментарий отправлен');
        setComment('');
        navigate(-1);
    };

    if (!state) return <div>Данные не найдены</div>;

    return (
        <div className="support-details">
            <button className="back-btn" onClick={() => navigate(-1)}>&lt;</button>
            <h2 className="title">Детали жалобы/предложения</h2>

            <h3>{state.name || 'Аноним'}</h3>
            <p><strong>Описание:</strong> {state.description || 'Без описания'}</p>
            <p><strong>Дата:</strong> {state.date}</p>

            {state.image && (
                state.image.includes('video') ? (
                    <video controls className="support-media">
                        <source src={state.image} type="video/mp4" />
                        Ваш браузер не поддерживает видео.
                    </video>
                ) : (
                    <img src={state.image} alt="Медиа" className="support-image" />
                )
            )}

            <div className="comment-block">
                <label>Комментарий</label>
                <textarea
                    placeholder="Напишите ответ..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
            </div>

            <button className="submit-btn" onClick={handleSendComment}>
                Отправить
            </button>
        </div>
    );
};

export default ComplaintsDetails;
