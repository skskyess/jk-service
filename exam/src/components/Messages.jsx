import React, { useEffect, useState } from 'react';
import '../styles/Messages.css';
import Footer from '../components/Footer';

const Messages = () => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')) || {};
        const userEmail = user.email || 'unknown@example.com';

        fetch(`http://localhost:5000/api/messages?email=${userEmail}`)
            .then(res => res.json())
            .then(setMessages)
            .catch(err => console.error('Ошибка загрузки сообщений:', err));
    }, []);

    return (
        <div className="messages-page">
            <h2>Сообщения</h2>
            {messages.length === 0 ? (
                <p>Пока нет новых сообщений</p>
            ) : (
                messages.map((msg) => (
                    <div key={msg.id} className="message-card">
                        <p><strong>{msg.date}</strong></p>
                        <p><strong>Тип:</strong> {msg.type}</p>
                        <p><strong>Тема:</strong> {msg.topic}</p>
                        <p>{msg.text}</p>
                    </div>
                ))
            )}
            <Footer currentPage="menu" />
        </div>
    );
};

export default Messages;
