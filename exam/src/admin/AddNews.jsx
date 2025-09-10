import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CreateRequest.css';
import coverIcon from '../assets/image.svg';
import mediaIcon from '../assets/ic_add_circle_outline_48px.png';

const AddNews = () => {
  const navigate = useNavigate();

  const [coverImage, setCoverImage] = useState(null);         
  const [coverImageFile, setCoverImageFile] = useState(null); 

  const [media, setMedia] = useState(null);                  
  const [mediaFile, setMediaFile] = useState(null);           

  const [title, setTitle] = useState('');           
  const [subtitle, setSubtitle] = useState('');               
  const [text, setText] = useState('');                     

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
      setCoverImageFile(file);
    }
  };

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMedia(URL.createObjectURL(file));
      setMediaFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('subtitle', subtitle);
    formData.append('text', text);
    if (coverImageFile) formData.append('cover', coverImageFile);
    if (mediaFile) formData.append('media', mediaFile);

    try {
      await fetch('http://localhost:5000/api/news', {
        method: 'POST',
        body: formData,
      });
      alert("Новость успешно опубликована!");
      navigate('/news-admin');
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert("Произошла ошибка при публикации.");
    }
  };

  return (
    <div className="form-container">
      <div className="custom-header">
        <span className="back-arrow" onClick={() => navigate(-1)}>&larr;</span>
        <h1 className="page-title">Новости</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <label className="label">Заголовок статьи</label>
        <textarea
          className="textarea"
          placeholder="Введите заголовок статьи"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="label">Добавить обложку</label>
        <label className="media-upload">
          <input type="file" accept="image/*" hidden onChange={handleCoverChange} />
          <span className="media-icon">
            {coverImage ? (
              <img src={coverImage} alt="Обложка" style={{ width: 80, height: 80, objectFit: 'cover' }} />
            ) : (
              <img src={coverIcon} alt="Иконка обложки" />
            )}
          </span>
          <span className="media-text">Добавить обложку</span>
        </label>

        <label className="label">Подзаголовок</label>
        <textarea
          className="textarea"
          placeholder="Введите подзаголовок"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />

        <label className="label">Основной текст</label>
        <textarea
          className="textarea"
          placeholder="Введите текст новости"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label className="label">Добавить фото/видео</label>
        <label className="media-upload">
          <input type="file" accept="image/*,video/*" hidden onChange={handleMediaChange} />
          <span className="media-icon">
            {media ? (
              <img src={media} alt="Медиа" style={{ width: 80, height: 80, objectFit: 'cover' }} />
            ) : (
              <img src={mediaIcon} alt="Иконка медиа" />
            )}
          </span>
          <span className="media-text">Добавить фото/видео</span>
        </label>

        <button type="submit" className="send-button" style={{ marginTop: 20 }}>
          Опубликовать
        </button>
      </form>
    </div>
  );
};

export default AddNews;
