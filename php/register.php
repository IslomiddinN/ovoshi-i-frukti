<?php
header('Content-Type: application/json');
$data = json_decode(file_get_contents('php://input'), true);
// Обработка данных
echo json_encode(['success' => true]);
