import React, { useEffect, useState } from 'react';
import '../styles/Support.css';
import img from '../assets/profile-circle.png';
import { useNavigate } from 'react-router-dom';

const SupportAdmin = () => {
    const navigate = useNavigate();
    const [supportMessages, setSupportMessages] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/support')
            .then(res => res.json())
            .then(setSupportMessages)
            .catch(err => console.error('Ошибка загрузки сообщений:', err));
    }, []);

    return (
        <div className="support-container">
            <button className="back-btn" onClick={() => navigate(-1)}>&lt;</button>

            <div className="support-list">
                {supportMessages.map((msg) => (
                    <div
                        key={msg.id}
                        className="support-item"
                        onClick={() => navigate(`/support-admin/${msg.id}`, { state: msg })}
                    >
                        <img src={img} alt="avatar" className="support-avatar" />
                        <div className="support-info">
                            <h4>{msg.name || 'Аноним'}</h4>
                            <p>{msg.description || 'Без текста'}</p> 
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SupportAdmin;
