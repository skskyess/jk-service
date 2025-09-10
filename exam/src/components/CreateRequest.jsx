import '../styles/CreateRequest.css';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import React, { useRef, useState } from "react";
import img from "../assets/image.svg";

export default function CreateRequest() {
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [comment, setComment] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSend = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user')) || { email: 'unknown@example.com' };
    const imageBase64 = selectedFile ? await toBase64(selectedFile) : null;

    const formData = {
      id: Date.now(),
      title: description || 'Без описания',
      comment,
      image: imageBase64,
      date: new Date().toLocaleString(),
      status: 'Подана',
      userEmail: user.email, 
    };

    try {
      const response = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowModal(true);
      } else {
        alert('Ошибка при отправке');
      }
    } catch (err) {
      console.error('Ошибка:', err);
      alert('Ошибка при отправке');
    }
  };

  const closeModal = () => {
    setShowModal(false);
    navigate(-1);
  };

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

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  return (
    <>
      <div className="custom-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>&larr;</span>
        <h1 className="page-title">Заявка</h1>
      </div>
      <form className="form-container" onSubmit={handleSend}>
        <div className="create-request-page">
          <div className="form-block">
            <label className="label">Описание услуги</label>
            <textarea
              className="textarea"
              placeholder="Укажите больше подробностей по вашей услуге"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-block">
            <label className="label">Медиа</label>
            <div className="media-upload" onClick={handleMediaClick}>
              <input
                type="file"
                accept="image/*,video/*"
                ref={inputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <span className="media-icon">
                <img
                  src={selectedFile ? URL.createObjectURL(selectedFile) : img}
                  alt="Выбранный файл"
                  style={{ width: 80, height: 80, objectFit: "cover" }}
                />
              </span>
              <span className="media-text">Добавить фото/видео</span>
            </div>
          </div>

          <div className="form-block">
            <label className="label">Комментарий</label>
            <textarea
              className="textarea"
              placeholder="Можете добавить комментарий к вашей заявке"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          <button className="send-button">Отправить</button>
        </div>
      </form>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>Заявка отправлена!</p>
            <button className="close-modal" onClick={closeModal}>Закрыть</button>
          </div>
        </div>
      )}

      <Footer active="Меню" />
    </>
  );
}
