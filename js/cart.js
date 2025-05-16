document.addEventListener('DOMContentLoaded', function() {
  // Получаем корзину из localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  let discount = 0;
  const discountCodes = {
    'FRESH10': 10,
    'VEGETABLE20': 20,
    'SUMMER15': 15
  };

  // Элементы DOM
  const cartItemsEl = document.getElementById('cart-items');
  const itemsCountEl = document.getElementById('items-count');
  const subtotalEl = document.getElementById('subtotal');
  const discountEl = document.getElementById('discount');
  const totalEl = document.getElementById('total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const promoCodeInput = document.getElementById('promo-code');
  const applyPromoBtn = document.getElementById('apply-promo');

  // Отображаем корзину
  function renderCart() {
    cartItemsEl.innerHTML = '';
    
    if (cart.length === 0) {
      cartItemsEl.innerHTML = `
        <div class="empty-cart">
          <i class="fas fa-shopping-cart"></i>
          <h3>Ваша корзина пуста</h3>
          <p>Добавьте товары из каталога</p>
        </div>
      `;
      checkoutBtn.disabled = true;
      updateSummary();
      return;
    }
    
    checkoutBtn.disabled = false;
    
    cart.forEach(item => {
      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <div class="item-info">
          <img src="${item.image || 'images/default-product.jpg'}" alt="${item.name}" class="item-image">
          <div>
            <h3>${item.name}</h3>
            <p>${item.price} ₽/шт</p>
          </div>
        </div>
        <div class="item-controls">
          <div class="quantity-control">
            <button class="quantity-btn minus" data-id="${item.id}">-</button>
            <span>${item.quantity}</span>
            <button class="quantity-btn plus" data-id="${item.id}">+</button>
          </div>
          <div style="min-width: 80px; text-align: right;">
            <p>${item.price * item.quantity} ₽</p>
          </div>
          <button class="remove-btn" data-id="${item.id}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      `;
      cartItemsEl.appendChild(itemEl);
    });
    
    updateSummary();
  }

  // Обновляем итоговую информацию
  function updateSummary() {
    const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const total = subtotal - discount;
    
    itemsCountEl.textContent = itemsCount;
    subtotalEl.textContent = subtotal + ' ₽';
    discountEl.textContent = '-' + discount + ' ₽';
    totalEl.textContent = total + ' ₽';
    
    // Сохраняем корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // Обработчики событий
  cartItemsEl.addEventListener('click', function(e) {
    const target = e.target.closest('button');
    if (!target) return;
    
    const id = target.dataset.id;
    const itemIndex = cart.findIndex(item => item.id === id);
    
    if (target.classList.contains('minus')) {
      if (cart[itemIndex].quantity > 1) {
        cart[itemIndex].quantity--;
      } else {
        cart.splice(itemIndex, 1);
      }
    } else if (target.classList.contains('plus')) {
      cart[itemIndex].quantity++;
    } else if (target.classList.contains('remove-btn')) {
      cart.splice(itemIndex, 1);
    }
    
    renderCart();
  });

  // Применение промокода
  applyPromoBtn.addEventListener('click', function() {
    const code = promoCodeInput.value.trim().toUpperCase();
    if (discountCodes[code]) {
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      discount = Math.round(subtotal * discountCodes[code] / 100);
      discountEl.textContent = '-' + discount + ' ₽';
      updateSummary();
      promoCodeInput.style.borderColor = 'var(--primary)';
      setTimeout(() => {
        promoCodeInput.style.borderColor = '#ddd';
      }, 2000);
    } else {
      discount = 0;
      discountEl.textContent = '-0 ₽';
      promoCodeInput.style.borderColor = 'var(--error)';
      setTimeout(() => {
        promoCodeInput.style.borderColor = '#ddd';
      }, 2000);
      updateSummary();
    }
  });

  // Оформление заказа
  checkoutBtn.addEventListener('click', function() {
    if (cart.length === 0) return;
    
    alert('Заказ оформлен! Спасибо за покупку!');
    cart = [];
    discount = 0;
    promoCodeInput.value = '';
    localStorage.removeItem('cart');
    renderCart();
  });
  

  // Инициализация
  renderCart();
});

