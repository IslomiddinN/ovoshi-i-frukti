// script.js

// Пример списка товаров (можно потом вынести в отдельный JSON)
const products = [
    {
      id: 1,
      name: "Смартфон",
      price: 14990,
      image: "https://via.placeholder.com/200x150?text=Смартфон"
    },
    {
      id: 2,
      name: "Ноутбук",
      price: 49990,
      image: "https://via.placeholder.com/200x150?text=Ноутбук"
    },
    {
      id: 3,
      name: "Наушники",
      price: 2990,
      image: "https://via.placeholder.com/200x150?text=Наушники"
    }
  ];
  
  // Отображение товаров на странице
  function showProducts(filtered = products) {
    const container = document.getElementById("product-list");
    container.innerHTML = "";
  
    filtered.forEach(product => {
      const card = document.createElement("div");
      card.className = "product-card";
  
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>${product.price} ₽</p>
        <button onclick="addToCart(${product.id})">Добавить в корзину</button>
      `;
  
      container.appendChild(card);
    });
  }
  
  // Поиск
  document.getElementById("search").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(query));
    showProducts(filtered);
  });
  
  // Добавление в корзину
  function addToCart(id) {
    const product = products.find(p => p.id === id);
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`Товар "${product.name}" добавлен в корзину`);
  }
  
  // Инициализация
  showProducts();
  