const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

// Разрешаем CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Обработчик регистрации
app.post('/php/register', (req, res) => {
  console.log('Получены данные:', req.body);
  // Здесь должна быть ваша логика регистрации
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
// server.js
const express = require('express');
const app = express();
app.use(express.json());

app.post('/php/register', (req, res) => {
  const { name, phone, email } = req.body;
  
  // Здесь должна быть реальная регистрация в БД
  console.log('Регистрация:', { name, phone, email });
  
  res.json({ 
    success: true,
    user: { name, phone, email }
  });
});
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');

app.post('/reset-password', (req, res) => {
    const { email } = req.body;
    
    // 1. Check if email exists in DB
    // 2. Generate a unique reset token (JWT or UUID)
    // 3. Send email with reset link (e.g., /reset-password?token=...)
    // 4. Handle errors (e.g., "Email not found")
    
    res.send("Password reset link sent!");
});

app.listen(3000, () => console.log('Server running on port 3000'));
app.listen(3000, () => console.log('Сервер запущен на порту 3000'));
