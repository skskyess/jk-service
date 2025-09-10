import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import '../styles/CreateRequest.css';
import img from "../assets/image.svg";

const Complaint = () => {
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const inputRef = useRef(null);

    const handleMediaClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleSend = async (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('user')) || { name: 'Аноним', email: 'unknown@example.com' };

        const formData = new FormData();
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('description', description);
        formData.append('date', new Date().toLocaleString());

        if (selectedFile) {
            formData.append('image', selectedFile);
        }

        try {
            const response = await fetch('http://localhost:5000/api/complaints', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Ошибка сервера:', errorData);
                alert('Ошибка при отправке жалобы');
            } else {
                setShowModal(true);
            }
        } catch (err) {
            console.error('Ошибка отправки:', err);
            alert('Ошибка при отправке');
        }
    };

    const closeModal = () => {
        setShowModal(false);
        navigate(-1);
    };

    return (
        <>
            <div className="custom-header">
                <span className="back-arrow" onClick={() => navigate(-1)}>&larr;</span>
                <h1 className="page-title">Жалоба/Предложение</h1>
            </div>

            <form className="form-container" onSubmit={handleSend}>
                <div className="form-block">
                    <label className="label">Описание</label>
                    <textarea
                        className="textarea"
                        placeholder="Опишите вашу жалобу или предложение"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className="form-block">
                    <label className="label">Прикрепите фото/видео</label>
                    <div className="media-upload" onClick={handleMediaClick}>
                        <input
                            type="file"
                            accept="image/*,video/*"
                            ref={inputRef}
                            onChange={handleFileChange}
                            style={{ display: 'none' }}
                        />
                        <span className="media-icon">
                            {selectedFile ? (
                                <img
                                    src={URL.createObjectURL(selectedFile)}
                                    alt="preview"
                                    style={{ width: 80, height: 80, objectFit: "cover" }}
                                />
                            ) : (
                                <img src={img} alt="иконка" />
                            )}
                        </span>
                        <span className="media-text">Добавить фото/видео</span>
                    </div>
                </div>

                <button className="send-button">Отправить</button>
            </form>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>Жалоба/предложение отправлено!</p>
                        <button className="close-modal" onClick={closeModal}>Закрыть</button>
                    </div>
                </div>
            )}

            <Footer currentPage="menu" />
        </>
    );
};

export default Complaint;
