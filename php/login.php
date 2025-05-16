<?php
header('Content-Type: text/plain');

// Подключение к базе данных (замените параметры на свои)
$db = new PDO('mysql:host=localhost;dbname=your_db;charset=utf8', 'username', 'password');

$phone = $_POST['phone'] ?? '';
$password = $_POST['password'] ?? '';

// Нормализация номера телефона
$normalizedPhone = normalizePhone($phone);

// Поиск пользователя в базе
$stmt = $db->prepare("SELECT id, password_hash FROM users WHERE phone = ?");
$stmt->execute([$normalizedPhone]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$user) {
    die("Пользователь с таким номером не найден");
}

// Проверка пароля
if (password_verify($password, $user['password_hash'])) {
    // Старт сессии и сохранение данных пользователя
    session_start();
    $_SESSION['user_id'] = $user['id'];
    echo "OK";
} else {
    die("Неверный пароль");
}

function normalizePhone($phone) {
    return preg_replace('/[^0-9]/', '', $phone);
}
?>