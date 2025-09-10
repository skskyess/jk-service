const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const PORT = 5000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Загрузка файлов для новостей
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({
  storage
});

// Новости

// Получение всех новостей
app.get('/api/news', (req, res) => {
  try {
    const data = fs.existsSync('news.json') ? fs.readFileSync('news.json', 'utf8') : '[]';
    const news = JSON.parse(data);
    res.json(news);
  } catch (err) {
    console.error('Ошибка чтения новостей:', err.message);
    res.status(500).json({
      error: 'Ошибка чтения новостей'
    });
  }
});

// Добавление новости
app.post('/api/news', upload.fields([{
  name: 'cover'
}, {
  name: 'media'
}]), (req, res) => {
  try {
    const {
      title,
      subtitle,
      text
    } = req.body;
    const cover = req.files['cover']?. [0]?.path || '';
    const media = req.files['media']?. [0]?.path || '';

    const newItem = {
      id: Date.now(),
      title,
      subtitle,
      text,
      cover: cover ? `http://localhost:${PORT}/${cover}` : '',
      media: media ? `http://localhost:${PORT}/${media}` : ''
    };

    let news = [];
    if (fs.existsSync('news.json')) {
      const data = fs.readFileSync('news.json', 'utf8');
      news = JSON.parse(data);
    }

    news.unshift(newItem);
    fs.writeFileSync('news.json', JSON.stringify(news, null, 2));

    res.json({
      success: true,
      item: newItem
    });
  } catch (err) {
    console.error('Ошибка сохранения новости:', err.message);
    res.status(500).json({
      error: 'Ошибка сохранения новости'
    });
  }
});

// Удаление новости по ID
app.delete('/api/news/:id', (req, res) => {
  try {
    const { id } = req.params;
    let news = [];

    if (fs.existsSync('news.json')) {
      const data = fs.readFileSync('news.json', 'utf8');
      news = JSON.parse(data);
    }

    const filtered = news.filter(item => String(item.id) !== id);
    fs.writeFileSync('news.json', JSON.stringify(filtered, null, 2));

    res.json({ success: true });
  } catch (err) {
    console.error('Ошибка при удалении новости:', err.message);
    res.status(500).json({ error: 'Ошибка при удалении новости' });
  }
});


//Регистрация пользователя
app.post('/api/register', (req, res) => {
  console.log('POST /api/register вызван');
  try {
    const user = req.body;

    if (!user.email || !user.name || !user.phone) {
      return res.status(400).json({
        error: 'Заполните все поля'
      });
    }

    const filePath = path.join(__dirname, 'users.json');
    let users = [];

    if (fs.existsSync(filePath)) {
      users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    const exists = users.find(u => u.email === user.email);
    if (exists) {
      return res.status(409).json({
        error: 'Пользователь уже зарегистрирован'
      });
    }

    users.push(user);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.json({
      success: true,
      user
    });
  } catch (err) {
    console.error('Ошибка при регистрации пользователя:', err.message);
    res.status(500).json({
      error: 'Ошибка регистрации пользователя'
    });
  }
});

// Вход пользователя
app.post('/api/login', (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;
    const filePath = path.join(__dirname, 'users.json');

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        error: 'Нет зарегистрированных пользователей'
      });
    }

    const users = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const user = users.find(u => u.email === email && u.password === password);

    if (!user) {
      return res.status(401).json({
        error: 'Неверный email или пароль'
      });
    }

    res.json({
      success: true,
      user
    });
  } catch (err) {
    console.error('Ошибка при входе пользователя:', err.message);
    res.status(500).json({
      error: 'Ошибка при входе'
    });
  }
});
// POST /api/requests — создание новой заявки
app.post('/api/requests', (req, res) => {
  try {
    const newRequest = {
      id: Date.now(),
      title: req.body.title || 'Новая заявка',
      description: req.body.description || '',
      comment: req.body.comment || '',
      image: req.body.image || null,
      date: req.body.date || new Date().toLocaleString(),
      status: req.body.status || 'Подана',
      userEmail: req.body.userEmail || 'unknown@example.com', // сохраняем email
    };

    const filePath = path.join(__dirname, 'requests.json');
    let requests = [];

    if (fs.existsSync(filePath)) {
      requests = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    requests.unshift(newRequest);
    fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));

    res.json({
      success: true,
      request: newRequest,
    });
  } catch (err) {
    console.error('Ошибка при сохранении заявки:', err.message);
    res.status(500).json({
      error: 'Ошибка при сохранении заявки',
    });
  }
});


// GET /api/requests — получить все заявки
app.get('/api/requests', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'requests.json');
    const email = req.query.email; // Получаем email из запроса
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '[]';
    const requests = JSON.parse(data);

    // Фильтруем заявки по email пользователя
    const userRequests = email ? requests.filter(req => req.userEmail === email) : requests;

    res.json(userRequests);
  } catch (err) {
    console.error('Ошибка чтения заявок:', err.message);
    res.status(500).json({ error: 'Ошибка при чтении заявок' });
  }
});


// получение заявки
app.get('/api/requests/:id', (req, res) => {
  const filePath = path.join(__dirname, 'requests.json');
  const id = req.params.id; // оставить как строку
  const requests = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const request = requests.find(r => String(r.id) === id);
 
  if (!request) return res.status(404).json({
    error: 'Заявка не найдена'
  });
  res.json(request);
});


//Обновление статуса заявок 
app.put('/api/requests/:id', (req, res) => {
  const id = req.params.id;
  const updatedStatus = req.body.status;
  const filePath = path.join(__dirname, 'requests.json');
  const requests = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  const index = requests.findIndex(r => String(r.id) === id);
  if (index === -1) return res.status(404).json({ error: 'Заявка не найдена' });

  requests[index].status = updatedStatus;
  fs.writeFileSync(filePath, JSON.stringify(requests, null, 2));

  res.json({ message: 'Статус обновлен' });
});

// POST /api/complaints — создание жалобы
app.post('/api/complaints', upload.single('image'), (req, res) => {
  try {
    // Проверяем, что поля действительно пришли
    const { name, email, description } = req.body;

    // Если хотя бы одно поле отсутствует, возвращаем ошибку
    if (!name || !email || !description) {
      return res.status(400).json({ error: 'Заполните все поля (name, email, description)' });
    }

    const newComplaint = {
      id: Date.now(),
      name,
      email,
      description,
      date: req.body.date || new Date().toLocaleString(),
      image: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : '',
    };

    const filePath = path.join(__dirname, 'complaints.json');
    let complaints = [];

    if (fs.existsSync(filePath)) {
      complaints = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    complaints.unshift(newComplaint);
    fs.writeFileSync(filePath, JSON.stringify(complaints, null, 2));

    res.json({ success: true, complaint: newComplaint });
  } catch (err) {
    console.error('Ошибка при сохранении жалобы:', err.message);
    res.status(500).json({ error: 'Ошибка при сохранении жалобы' });
  }
});


// GET /api/complaints — получение всех жалоб
app.get('/api/complaints', (req, res) => {
  const filePath = path.join(__dirname, 'complaints.json');
  try {
    const complaints = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
      : [];
    res.json(complaints);
  } catch (err) {
    console.error('Ошибка чтения жалоб:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// POST /api/support — создание нового обращения в поддержку
app.post('/api/support', upload.single('image'), (req, res) => {
  try {
    const newSupport = {
      id: Date.now(),
      name: req.body.name || 'Аноним',
      email: req.body.email || 'unknown@example.com',
      topic: req.body.topic || 'Без темы', 
      description: req.body.description || 'Без описания', 
      date: req.body.date || new Date().toLocaleString(),
      image: req.file ? `http://localhost:${PORT}/uploads/${req.file.filename}` : '',
    };

    const filePath = path.join(__dirname, 'support.json');
    let supports = [];

    if (fs.existsSync(filePath)) {
      supports = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    supports.unshift(newSupport);
    fs.writeFileSync(filePath, JSON.stringify(supports, null, 2));

    res.json({ success: true, support: newSupport });
  } catch (err) {
    console.error('Ошибка при сохранении обращения:', err.message);
    res.status(500).json({ error: 'Ошибка при сохранении обращения' });
  }
});



// GET /api/support — получение всех обращений в поддержку
app.get('/api/support', (req, res) => {
  const filePath = path.join(__dirname, 'support.json');
  try {
    const supports = fs.existsSync(filePath)
      ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
      : [];
    res.json(supports);
  } catch (err) {
    console.error('Ошибка чтения обращений в поддержку:', err.message);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// POST /api/support/:id/reply — отправка комментария к поддержке
app.post('/api/support/:id/reply', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'support.json');
    const supportId = req.params.id;
    const { text, userEmail } = req.body;
    
    const supportRequests = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const supportItem = supportRequests.find(item => String(item.id) === supportId);
    
    if (!supportItem) {
      return res.status(404).json({ error: 'Сообщение не найдено' });
    }

    const message = {
      id: Date.now(),
      topic: supportItem.description || 'Без темы',
      text,
      date: new Date().toLocaleString(),
      userEmail: supportItem.email || 'unknown@example.com', // Добавляем email получателя
    };

    const messagesFilePath = path.join(__dirname, 'messages.json');
    const messages = fs.existsSync(messagesFilePath) ? JSON.parse(fs.readFileSync(messagesFilePath, 'utf8')) : [];
    messages.push(message);
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));

    res.json({ message: 'Комментарий отправлен' });
  } catch (err) {
    console.error('Ошибка при сохранении комментария:', err.message);
    res.status(500).json({ error: 'Ошибка при сохранении комментария' });
  }
});


// GET /api/messages — получение всех сообщений пользователя
app.get('/api/messages', (req, res) => {
  const filePath = path.join(__dirname, 'messages.json');
  const userEmail = req.query.email; // Получаем email пользователя из запроса

  const messages = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : [];

  // Фильтруем сообщения только для текущего пользователя
  const userMessages = messages.filter(msg => msg.userEmail === userEmail);
  
  res.json(userMessages);
});

/// POST /api/messages — отправка нового сообщения
app.post('/api/messages', (req, res) => {
  const filePath = path.join(__dirname, 'messages.json');
  const messages = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : [];

  const newMessage = {
      id: Date.now(),
      user: req.body.user || 'Аноним',
      userEmail: req.body.userEmail || 'unknown@example.com',
      topic: req.body.topic || 'Без темы',
      type: req.body.type || 'Поддержка',
      text: req.body.text,
      date: new Date().toLocaleString(),
  };

  messages.unshift(newMessage);
  fs.writeFileSync(filePath, JSON.stringify(messages, null, 2));
  res.json({ success: true });
});


// GET /api/support — получение всех обращений
app.get('/api/support', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'support.json');
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf8') : '[]';
    const supports = JSON.parse(data);
    res.json(supports);
  } catch (err) {
    console.error('Ошибка чтения обращений:', err.message);
    res.status(500).json({ error: 'Ошибка при чтении обращений' });
  }
});


// Запуск сервера
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));