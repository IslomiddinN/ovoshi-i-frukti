// Данные товаров (обновленный список с новыми товарами)
const products = [
  { id: 1, name: "Яблоки Гренни Смит", price: 120, image: "img/apple.jpg", category: "фрукты" },
  { id: 2, name: "Морковь свежая", price: 45, image: "img/carrot.jpg", category: "овощи" },
  { id: 3, name: "Бананы", price: 85, image: "img/banana.jpg", category: "фрукты" },
  { id: 4, name: "Картофель молодой", price: 60, image: "img/potato.jpg", category: "овощи" },
  { id: 5, name: "Клубника", price: 200, image: "img/strawberry.jpg", category: "ягоды" },
  { id: 6, name: "Помидоры черри", price: 150, image: "img/tomato.jpg", category: "овощи" },
  { id: 7, name: "Огурцы", price: 90, image: "img/cucumber.jpg", category: "овощи" },
  { id: 8, name: "Груши", price: 110, image: "img/pear.jpg", category: "фрукты" },
  // Новые добавленные товары
  { id: 9, name: "Апельсины", price: 130, image: "img/orange.jpg", category: "фрукты" },
  { id: 10, name: "Лимон", price: 70, image: "img/lemon.jpg", category: "фрукты" },
  { id: 11, name: "Виноград", price: 180, image: "img/grape.jpg", category: "ягоды" },
  { id: 12, name: "Персики", price: 160, image: "img/peach.jpg", category: "фрукты" },
  { id: 13, name: "Свекла", price: 40, image: "img/beetroot.jpg", category: "овощи" },
  { id: 14, name: "Капуста", price: 55, image: "img/cabbage.jpg", category: "овощи" },
  { id: 15, name: "Брокколи", price: 120, image: "img/broccoli.jpg", category: "овощи" },
  { id: 16, name: "Авокадо", price: 200, image: "img/avocado.jpg", category: "фрукты" }
];

// Корзина
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Инициализация страницы
document.addEventListener('DOMContentLoaded', function() {
  if (document.getElementById('product-list')) {
    renderProducts();
    updateCartCount();
    setupFilters();
    setupSearch();
  }
  
  if (document.getElementById('cart-items')) {
    renderCartItems();
    updateCartSummary();
    setupCartEvents();
    setupCheckoutModal();
  }
});

// Отрисовка товаров на главной странице
function renderProducts(productsToRender = products) {
  const productGrid = document.getElementById('product-list');
  productGrid.innerHTML = productsToRender.map(product => `
    <div class="product-card" data-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${product.price} ₽/кг</p>
        <button class="add-to-cart" onclick="addToCart(${product.id})">
          <i class="fas fa-shopping-basket"></i> В корзину
        </button>
      </div>
    </div>
  `).join('');
}

// Отрисовка товаров в корзине
function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items');
  
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <p>Ваша корзина пуста</p>
        <a href="index.html" class="continue-shopping">Продолжить покупки</a>
      </div>
    `;
    document.getElementById('checkout-btn').disabled = true;
    return;
  }
  
  cartItemsContainer.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h3 class="cart-item-name">${item.name}</h3>
        <p class="cart-item-price">${item.price} ₽/кг</p>
        <div class="cart-item-controls">
          <button class="quantity-btn minus" onclick="changeQuantity(${item.id}, -1)">-</button>
          <span class="quantity">${item.quantity}</span>
          <button class="quantity-btn plus" onclick="changeQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
      <div class="cart-item-total">
        <span>${item.price * item.quantity} ₽</span>
        <button class="remove-item" onclick="removeFromCart(${item.id})">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  `).join('');
}

// Обновление итоговой информации в корзине
function updateCartSummary() {
  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discount = 0; // Здесь можно добавить логику скидок
  const total = subtotal - discount;
  
  document.getElementById('items-count').textContent = itemsCount;
  document.getElementById('subtotal').textContent = `${subtotal} ₽`;
  document.getElementById('discount').textContent = `-${discount} ₽`;
  document.getElementById('total').textContent = `${total} ₽`;
  
  // Активируем кнопку оформления заказа, если в корзине есть товары
  document.getElementById('checkout-btn').disabled = cart.length === 0;
}

// Добавление товара в корзину
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  
  updateCart();
  showAlert(`Товар "${product.name}" добавлен в корзину!`);
}

// Изменение количества товара
function changeQuantity(productId, change) {
  const item = cart.find(item => item.id === productId);
  
  if (item) {
    item.quantity += change;
    
    // Удаляем товар, если количество стало 0 или меньше
    if (item.quantity <= 0) {
      cart = cart.filter(item => item.id !== productId);
      showAlert(`Товар "${item.name}" удален из корзины`);
    }
    
    updateCart();
  }
}

// Удаление товара из корзины
function removeFromCart(productId) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
    showAlert(`Товар "${item.name}" удален из корзины`);
  }
}

// Обновление корзины (сохранение в localStorage и обновление UI)
function updateCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  
  if (document.getElementById('product-list')) {
    updateCartCount();
  }
  
  if (document.getElementById('cart-items')) {
    renderCartItems();
    updateCartSummary();
  }
}

// Обновление счетчика товаров в корзине (в шапке сайта)
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.querySelector('.cart-count');
  if (cartCountElement) {
    cartCountElement.textContent = count;
  }
}

// Настройка обработчиков событий для корзины
function setupCartEvents() {
  // Обработчик для промокода
  document.getElementById('apply-promo').addEventListener('click', function() {
    const promoCode = document.getElementById('promo-code').value;
    if (promoCode === 'FRESH10') {
      // Пример скидки 10%
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const discount = Math.round(subtotal * 0.1);
      const total = subtotal - discount;
      
      document.getElementById('discount').textContent = `-${discount} ₽`;
      document.getElementById('total').textContent = `${total} ₽`;
      showAlert('Промокод применен! Скидка 10%');
    } else if (promoCode) {
      showAlert('Неверный промокод', 'error');
    }
  });
}

// Настройка модального окна оформления заказа
function setupCheckoutModal() {
  const modal = document.getElementById("checkout-modal");
  const btn = document.getElementById("checkout-btn");
  const span = document.getElementsByClassName("close")[0];
  
  if (btn) {
    btn.onclick = function() {
      if (cart.length > 0) {
        modal.style.display = "block";
      }
    }
  }
  
  if (span) {
    span.onclick = function() {
      modal.style.display = "none";
    }
  }
  
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  
  const deliveryForm = document.getElementById("delivery-form");
  if (deliveryForm) {
    deliveryForm.onsubmit = function(e) {
      e.preventDefault();
      
      // Здесь можно добавить отправку данных на сервер
      const formData = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        deliveryDate: document.getElementById('delivery-date').value,
        deliveryTime: document.getElementById('delivery-time').value,
        comments: document.getElementById('comments').value,
        cart: cart,
        total: document.getElementById('total').textContent
      };
      
      console.log('Данные заказа:', formData); // Для отладки
      
      // Очищаем корзину после оформления
      cart = [];
      updateCart();
      
      // Показываем сообщение об успехе
      showAlert('Заказ успешно оформлен! Спасибо за покупку!');
      
      // Закрываем модальное окно
      modal.style.display = "none";
      
      // Перенаправляем на страницу благодарности (можно раскомментировать)
      // window.location.href = 'thank-you.html';
    }
  }
}

// Всплывающее уведомление
function showAlert(message, type = 'success') {
  const alert = document.createElement('div');
  alert.className = `alert-message ${type}`;
  alert.innerHTML = `
    <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
    <span>${message}</span>
  `;
  
  document.body.appendChild(alert);
  
  setTimeout(() => {
    alert.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    alert.classList.remove('show');
    setTimeout(() => alert.remove(), 300);
  }, 3000);
}

// Фильтрация по категориям
function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const category = this.dataset.category;
      if (category === 'all') {
        renderProducts();
      } else {
        const filteredProducts = products.filter(p => p.category === category);
        renderProducts(filteredProducts);
      }
    });
  });
}

// Поиск товаров
function setupSearch() {
  const searchInput = document.getElementById('search-input');
  const searchBtn = document.getElementById('search-btn');
  
  function performSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm.length > 0) {
      const results = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) || 
        p.category.toLowerCase().includes(searchTerm)
      );
      renderProducts(results);
    } else {
      renderProducts();
    }
  }
  
  searchBtn.addEventListener('click', performSearch);
  searchInput.addEventListener('keyup', function(e) {
    if (e.key === 'Enter') performSearch();
  });
}