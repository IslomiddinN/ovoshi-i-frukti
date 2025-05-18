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
