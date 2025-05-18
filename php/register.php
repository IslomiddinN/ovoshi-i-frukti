<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Content-Type: application/json');

$data = json_decode(file_get_contents('php://input'), true);

// Обработка данных
file_put_contents('register.log', print_r($data, true));

echo json_encode(['success' => true]);
