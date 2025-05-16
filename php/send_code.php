<?php
header('Content-Type: text/plain');

// Подключение к базе данных
$db = new PDO('mysql:host=localhost;dbname=your_db;charset=utf8', 'username', 'password');

$phone = $_POST['phone'] ?? '';
$normalizedPhone = normalizePhone($phone);

// Генерация 4-значного кода
$code = str_pad(rand(0, 9999), 4, '0', STR_PAD_LEFT);

// Сохранение кода в базу (с expiry time 10 минут)
$stmt = $db->prepare("INSERT INTO sms_codes (phone, code, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 10 MINUTE))");
$stmt->execute([$normalizedPhone, $code]);

// Здесь должна быть реальная отправка SMS (это mock)
// sendSms($normalizedPhone, "Ваш код подтверждения: $code");
error_log("SMS code for $normalizedPhone: $code"); // Для отладки

echo "OK";

function normalizePhone($phone) {
    return preg_replace('/[^0-9]/', '', $phone);
}
?>