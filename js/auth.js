// auth.js

// Регистрация
document.getElementById("register-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("reg-username").value;
    const password = document.getElementById("reg-password").value;
  
    const user = { username, password };
    localStorage.setItem("user", JSON.stringify(user));
    alert("Регистрация успешна!");
  });
  
  // Вход
  document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
  
    const savedUser = JSON.parse(localStorage.getItem("user"));
  
    if (savedUser && savedUser.username === username && savedUser.password === password) {
      localStorage.setItem("loggedIn", "true");
      document.getElementById("status").textContent = `Привет, ${username}!`;
    } else {
      document.getElementById("status").textContent = "Неверные данные!";
    }
  });
  