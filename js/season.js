document.addEventListener('DOMContentLoaded', function() {
  // Переключение между месяцами в табах
  const monthTabs = document.querySelectorAll('.month-tab');
  monthTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Удаляем активный класс у всех табов
      monthTabs.forEach(t => t.classList.remove('active'));
      // Добавляем активный класс текущему табу
      this.classList.add('active');
      
      // Здесь можно добавить логику для фильтрации продуктов по месяцам
      // Например, отправлять запрос на сервер или показывать/скрывать элементы
    });
  });

  // Добавление товаров в корзину
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', function() {
      const productCard = this.closest('.product-card');
      const productName = productCard.querySelector('.product-title').textContent;
      const productPrice = productCard.querySelector('.current-price').textContent;
      
      // Здесь можно добавить логику добавления в корзину
      // Например, сохранять в localStorage или отправлять на сервер
      alert(`Товар "${productName}" за ${productPrice} добавлен в корзину!`);
      
      // Анимация кнопки
      this.innerHTML = '<i class="fas fa-check"></i> Добавлено';
      this.style.backgroundColor = '#4CAF50';
      
      // Возвращаем исходное состояние через 2 секунды
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-shopping-basket"></i> В корзину';
        this.style.backgroundColor = '';
      }, 2000);
    });
  });

  // Подсветка месяцев в календаре сезонности
  const activeMonthTab = document.querySelector('.month-tab.active');
  if (activeMonthTab) {
    const activeMonthText = activeMonthTab.textContent.trim();
    highlightCalendarMonths(activeMonthText);
  }

  // Обработчик для табов месяцев
  monthTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const monthText = this.textContent.trim();
      highlightCalendarMonths(monthText);
    });
  });

  // Функция для подсветки месяцев в календаре
  function highlightCalendarMonths(monthText) {
    const monthAbbreviations = {
      'Январь': 'Янв',
      'Февраль': 'Фев',
      'Март': 'Мар',
      'Апрель': 'Апр',
      'Май': 'Май',
      'Июнь': 'Июн',
      'Июль': 'Июл',
      'Август': 'Авг',
      'Сентябрь': 'Сен',
      'Октябрь': 'Окт',
      'Ноябрь': 'Ноя',
      'Декабрь': 'Дек'
    };
    
    const currentMonthAbbr = monthAbbreviations[monthText];
    
    // Убираем подсветку у всех месяцев
    document.querySelectorAll('.season-month').forEach(month => {
      month.classList.remove('highlight');
    });
    
    // Подсвечиваем текущий месяц
    document.querySelectorAll(`.season-month[data-month="${currentMonthAbbr}"]`).forEach(month => {
      month.classList.add('highlight');
    });
  }

  // Имитация загрузки данных при смене месяца
  monthTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Показываем индикатор загрузки
      const seasonProducts = document.querySelector('.season-products');
      seasonProducts.innerHTML = '<div class="loading">Загрузка данных...</div>';
      
      // Имитируем задержку загрузки
      setTimeout(() => {
        // Здесь можно загружать реальные данные через AJAX
        seasonProducts.innerHTML = `
          <div class="product-card">
            <div class="product-badge">Сезонный</div>
            <div class="product-image-container">
              <img src="img/carrot.jpg" alt="Морковь" class="product-image">
            </div>
            <div class="product-info">
              <h3 class="product-title">Морковь молодая</h3>
              <div class="product-meta">
                <span class="product-weight">500 г</span>
                <span class="product-origin">Московская обл.</span>
              </div>
              <div class="product-price">
                <span class="current-price">89 ₽</span>
              </div>
              <button class="add-to-cart"><i class="fas fa-shopping-basket"></i> В корзину</button>
            </div>
          </div>
          
          <div class="product-card">
            <div class="product-badge">Сезонный</div>
            <div class="product-image-container">
              <img src="img/apple.jpg" alt="Яблоки" class="product-image">
            </div>
            <div class="product-info">
              <h3 class="product-title">Яблоки Гала</h3>
              <div class="product-meta">
                <span class="product-weight">1 кг</span>
                <span class="product-origin">Крым</span>
              </div>
              <div class="product-price">
                <span class="current-price">229 ₽</span>
              </div>
              <button class="add-to-cart"><i class="fas fa-shopping-basket"></i> В корзину</button>
            </div>
          </div>
           <!-- Продукт 2 -->
        <div class="product-card">
          <div class="product-badge">Сезонный</div>
          <div class="product-image-container">
            <img src="https://images.unsplash.com/photo-1582284540020-8acbe03f4924?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="Помидоры" class="product-image">
          </div>
          <div class="product-info">
            <h3 class="product-title">Помидоры черри</h3>
            <div class="product-meta">
              <span class="product-weight">250 г</span>
              <span class="product-origin">Астрахань</span>
            </div>
            <div class="product-price">
              <span class="current-price">189 ₽</span>
              <span class="old-price">229 ₽</span>
            </div>
            <button class="add-to-cart"><i class="fas fa-shopping-basket"></i> В корзину</button>
          </div>
        </div>
        `;
        
        // Перепривязываем обработчики событий к новым кнопкам
        bindAddToCartEvents();
      }, 800);
    });
  });

  // Функция для перепривязки обработчиков событий к кнопкам "В корзину"
  function bindAddToCartEvents() {
    const newAddToCartButtons = document.querySelectorAll('.add-to-cart');
    newAddToCartButtons.forEach(button => {
      button.addEventListener('click', function() {
        const productCard = this.closest('.product-card');
        const productName = productCard.querySelector('.product-title').textContent;
        const productPrice = productCard.querySelector('.current-price').textContent;
        
        alert(`Товар "${productName}" за ${productPrice} добавлен в корзину!`);
        
        this.innerHTML = '<i class="fas fa-check"></i> Добавлено';
        this.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
          this.innerHTML = '<i class="fas fa-shopping-basket"></i> В корзину';
          this.style.backgroundColor = '';
        }, 2000);
      });
    });
  }
});