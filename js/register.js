document.addEventListener('DOMContentLoaded', function() {
  // Маска для телефона
  Inputmask({ 
    mask: '+7 (999) 999-99-99',
    showMaskOnHover: false 
  }).mask(document.getElementById('phoneNumber'));
  
  Inputmask({ 
    mask: '+7 (999) 999-99-99',
    showMaskOnHover: false 
  }).mask(document.getElementById('phoneForPassword'));

  // Переключение между формами
  document.getElementById('toggleAuthBtn').addEventListener('click', function() {
    const phoneFields = document.querySelector('.phone-fields');
    const passwordFields = document.querySelector('.password-fields');
    const title = document.getElementById('auth-title');
    
    if (phoneFields.style.display !== 'none') {
      phoneFields.style.display = 'none';
      passwordFields.style.display = 'block';
      title.textContent = 'Вход по паролю';
      this.textContent = 'Войти по SMS';
    } else {
      phoneFields.style.display = 'block';
      passwordFields.style.display = 'none';
      title.textContent = 'Вход по номеру телефона';
      this.textContent = 'У меня есть пароль';
    }
  });

  // Отправка SMS кода
  document.getElementById('sendCodeBtn').addEventListener('click', function() {
    const phone = document.getElementById('phoneNumber').value.replace(/\D/g, '');
    const errorElement = document.getElementById('phone-error');
    
    if (phone.length !== 11) {
      errorElement.textContent = 'Введите корректный номер телефона';
      return;
    }
    
    fetch('/api/send_code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phone })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        document.querySelector('.verification-code').style.display = 'block';
        document.getElementById('sendCodeBtn').style.display = 'none';
        document.getElementById('verifyCodeBtn').style.display = 'block';
        document.getElementById('success-message').textContent = 'Код отправлен!';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  // Проверка кода
  document.getElementById('verifyCodeBtn').addEventListener('click', function() {
    const phone = document.getElementById('phoneNumber').value.replace(/\D/g, '');
    const code = document.getElementById('verificationCode').value;
    
    fetch('/api/verify_code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phone, code: code })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        // Сохраняем данные пользователя
        localStorage.setItem('userData', JSON.stringify({
          phone: phone,
          token: data.token // если используется JWT
        }));
        window.location.href = 'profile.html';
      } else {
        document.getElementById('code-error').textContent = data.message;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  });

  // Вход по паролю
  document.getElementById('loginWithPasswordBtn').addEventListener('click', function() {
    const phone = document.getElementById('phoneForPassword').value.replace(/\D/g, '');
    const password = document.getElementById('password').value;
    
    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: phone, password: password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        // Сохраняем данные пользователя
        localStorage.setItem('userData', JSON.stringify({
          phone: phone,
          name: data.name, // если сервер возвращает имя
          token: data.token // если используется JWT
        }));
        window.location.href = 'profile.html';
      } else {
        document.getElementById('password-error').textContent = data.message;
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
    // После успешной авторизации
if (data.status === 'success') {
  // Сохраняем данные
  localStorage.setItem('userData', JSON.stringify({
    name: data.name,
    phone: phone,
    email: data.email
  }));
  
  // Проверяем доступность profile.html
  fetch('./profile.html')
    .then(() => {
      window.location.href = './profile.html';
    })
    .catch(() => {
      console.error('Файл profile.html не найден');
      alert('Профиль будет доступен после регистрации');
    });
}
  });
  // После успешной регистрации/входа
const userData = {
  name: "Иван Иванов", // Получите эти данные с сервера или из формы
  phone: document.getElementById('phoneNumber').value.replace(/\D/g, ''),
  email: "user@example.com" // Получите с сервера
};

// Сохраняем данные в localStorage и sessionStorage для надежности
localStorage.setItem('userData', JSON.stringify(userData));
sessionStorage.setItem('userData', JSON.stringify(userData));

// Перенаправляем на профиль с параметром
window.location.href = 'profile.html?fromAuth=true';
});
