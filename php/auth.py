from flask import Flask, request, jsonify, session
import sqlite3
import secrets
from datetime import datetime, timedelta
import bcrypt

app = Flask(__name__)
app.secret_key = 'your-secret-key-here'

# Инициализация БД (используйте ваш код из предыдущих шагов)
def init_db():
    conn = sqlite3.connect('auth.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS users
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 phone TEXT UNIQUE,
                 password_hash TEXT,
                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    c.execute('''CREATE TABLE IF NOT EXISTS sms_codes
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 phone TEXT,
                 code TEXT,
                 expires_at TIMESTAMP,
                 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP)''')
    conn.commit()
    conn.close()

init_db()

# API endpoints
@app.route('/api/send_code', methods=['POST'])
def send_code():
    data = request.get_json()
    phone = data.get('phone')
    
    # Генерация и сохранение кода (ваш код)
    code = f"{secrets.randbelow(9000) + 1000:04d}"
    expires_at = datetime.now() + timedelta(minutes=10)
    
    conn = sqlite3.connect('auth.db')
    c = conn.cursor()
    c.execute('INSERT INTO sms_codes (phone, code, expires_at) VALUES (?, ?, ?)',
              (phone, code, expires_at))
    conn.commit()
    conn.close()
    
    # В реальном приложении здесь должна быть отправка SMS
    print(f"Код для {phone}: {code}")
    
    return jsonify({'status': 'success'})

@app.route('/api/verify_code', methods=['POST'])
def verify_code():
    data = request.get_json()
    phone = data.get('phone')
    code = data.get('code')
    
    # Проверка кода (ваш код)
    conn = sqlite3.connect('auth.db')
    c = conn.cursor()
    c.execute('''SELECT * FROM sms_codes 
                 WHERE phone = ? AND code = ? AND expires_at > datetime('now')''',
              (phone, code))
    result = c.fetchone()
    
    if not result:
        return jsonify({'status': 'error', 'message': 'Неверный код'}), 400
    
    # Создание/поиск пользователя
    c.execute('SELECT id FROM users WHERE phone = ?', (phone,))
    user = c.fetchone()
    
    if not user:
        c.execute('INSERT INTO users (phone) VALUES (?)', (phone,))
        conn.commit()
        user_id = c.lastrowid
    else:
        user_id = user[0]
    
    # Удаление использованного кода
    c.execute('DELETE FROM sms_codes WHERE code = ?', (code,))
    conn.commit()
    conn.close()
    
    # Установка сессии
    session['user_id'] = user_id
    return jsonify({'status': 'success', 'user_id': user_id})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    phone = data.get('phone')
    password = data.get('password')
    
    conn = sqlite3.connect('auth.db')
    c = conn.cursor()
    c.execute('SELECT id, password_hash FROM users WHERE phone = ?', (phone,))
    user = c.fetchone()
    
    if not user:
        return jsonify({'status': 'error', 'message': 'Пользователь не найден'}), 404
    
    user_id, password_hash = user
    
    if not bcrypt.checkpw(password.encode(), password_hash.encode()):
        return jsonify({'status': 'error', 'message': 'Неверный пароль'}), 401
    
    session['user_id'] = user_id
    return jsonify({'status': 'success', 'user_id': user_id})

@app.route('/')
def index():
    return app.send_static_file('index.html')

if __name__ == '__main__':
    app.run(debug=True)