app.post('/api/register', (req, res) => {
  // Обработка данных регистрации
  console.log(req.body);
  res.json({ success: true });
});
