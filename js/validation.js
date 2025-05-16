// Валидация формы регистрации
document.querySelector('.auth-form').addEventListener('submit', function(e) {
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    
    if (password !== passwordConfirm) {
      e.preventDefault();
      alert('Пароли не совпадают!');
      return false;
    }
    
    if (password.length < 6) {
      e.preventDefault();
      alert('Пароль должен содержать не менее 6 символов');
      return false;
    }
    // Временная проверка - добавьте в validation.js
console.log('Script loaded'); // Проверка загрузки файла

document.querySelector('.auth-form button').addEventListener('click', function(e) {
  e.preventDefault();
  console.log('Button clicked'); // Проверка срабатывания клика
  alert('Форма работает!');
});
    // Дополнительные проверки можно добавить здесь
  });