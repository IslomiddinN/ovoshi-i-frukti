// Здесь можно разместить общие скрипты для сайта
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация корзины
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify([]));
    }
    
    // Обновление счетчика корзины
    updateCartCount();
  });
  
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    document.querySelectorAll('.cart-count').forEach(el => {
      el.textContent = cart.length;
    });
  }