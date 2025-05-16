// chat.js

function sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (message === "") return;
  
    addMessage("Вы", message);
    input.value = "";
  
    // Имитация ответа бота
    setTimeout(() => {
      const reply = getBotReply(message);
      addMessage("Бот", reply);
    }, 500);
  }
  
  function addMessage(sender, text) {
    const box = document.getElementById("chat-box");
    const msg = document.createElement("p");
    msg.innerHTML = `<strong>${sender}:</strong> ${text}`;
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
  }
  
  function getBotReply(userMessage) {
    const lower = userMessage.toLowerCase();
    if (lower.includes("привет")) return "Здравствуйте! Чем могу помочь?";
    if (lower.includes("цена")) return "Уточните, какого товара вас интересует цена.";
    if (lower.includes("доставка")) return "Мы доставляем товары в течение 1-3 дней.";
    return "Извините, я пока не понимаю это сообщение.";
  }
  