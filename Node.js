app.post('/php/register', (req, res) => {
  // Обработка данных регистрации
  console.log(req.body);
  res.json({ success: true });
});
