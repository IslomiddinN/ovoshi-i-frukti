<?php
header('Content-Type: text/plain');

session_start();
$db = new PDO('mysql:host=localhost;dbname=your_db;charset=utf8', 'username', 'password');

$code = $_POST['code'] ?? '';

// Проверка кода в базе
$stmt = $db->prepare("SELECT phone FROM sms_codes WHERE code = ? AND expires_at > NOW() LIMIT 1");
$stmt->execute([$code]);
$record = $stmt->fetch(PDO::FETCH_ASSOC);

if ($record) {
    // Находим или создаем пользователя
    $stmt = $db->prepare("SELECT id FROM users WHERE phone = ?");
    $stmt->execute([$record['phone']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        // Авторегистрация нового пользователя
        $stmt = $db->prepare("INSERT INTO users (phone) VALUES (?)");
        $stmt->execute([$record['phone']]);
        $user_id = $db->lastInsertId();
    } else {
        $user_id = $user['id'];
    }
    
    // Удаляем использованный код
    $db->prepare("DELETE FROM sms_codes WHERE code = ?")->execute([$code]);
    
    // Устанавливаем сессию
    $_SESSION['user_id'] = $user_id;
    echo "OK";
} else {
    die("Неверный или устаревший код");
}
?>