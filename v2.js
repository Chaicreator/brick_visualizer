// script.js

document.addEventListener("DOMContentLoaded", () => {
  // ================================
  // 1. СЛОВАРЬ АТРИБУТОВ
  // ================================
  // Представим, что это "овощи" :)
  // LC = Огурец
  // LP = Помидор
  // a  = Картошка
  // b  = Морковка

  const attributes = {
    LC: "Огурец",
    LP: "Помидор",
    a: "Картошка",
    b: "Морковка",
  };

  // ================================
  // 2. МАССИВ КАРТИНОК С АТРИБУТАМИ
  // ================================
  const images = [
    {
      url: "https://mzt-zavod.ru/wp-content/uploads/2025/02/Trevi-%D0%A3%D0%BC%D0%B1%D1%80%D0%B0-1-2048x2048.jpg",
      attrs: ["LP", "a"], // Помидор + Картошка
    },
    {
      url: "https://mzt-zavod.ru/wp-content/uploads/2025/06/Brickwall-%D0%A1%D0%B5%D1%80%D1%8B%D0%B9-2048x2048.jpg",
      attrs: ["LP", "b"], // Помидор + Морковка
    },
    {
      url: "https://mzt-zavod.ru/wp-content/uploads/2025/07/Cerrad-Loft-Brick-Cardamon.jpg",
      attrs: ["LC", "a"], // Огурец + Картошка
    },
    {
      url: "https://mzt-zavod.ru/wp-content/uploads/2025/07/Cerrad-Loft-Brick-Chili.jpg",
      attrs: ["LC", "b"], // Огурец + Морковка
    },
  ];

  // ================================
  // 3. ЛОГИКА ОТОБРАЖЕНИЯ
  // ================================
  const container = document.createElement("div");
  container.style.position = "relative";
  container.style.width = "100%";
  container.style.height = "800px";
  container.style.backgroundImage = `url(${images[0].url})`;
  container.style.backgroundPosition = "center";
  container.style.backgroundRepeat = "no-repeat";
  container.style.backgroundSize = "contain";
  container.style.backgroundColor = "#000";
  document.getElementById("my-gallery").appendChild(container);

  // Панель справа
  const panel = document.createElement("div");
  panel.style.position = "absolute";
  panel.style.top = "0";
  panel.style.right = "0";
  panel.style.width = "30%";
  panel.style.height = "100%";
  panel.style.backgroundColor = "rgba(0,0,0,0.3)";
  panel.style.display = "flex";
  panel.style.flexDirection = "column";
  panel.style.justifyContent = "center";
  panel.style.alignItems = "center";
  panel.style.gap = "20px";
  container.appendChild(panel);

  // Состояние выбранных кнопок
  const state = { group1: null, group2: null };

  // Функция создания кнопок
  function createToggleButton(label, color, group, row) {
    const btn = document.createElement("button");
    btn.textContent = label;
    btn.setAttribute("data-label", label);
    btn.style.padding = "10px 20px";
    btn.style.border = "none";
    btn.style.borderRadius = "8px";
    btn.style.backgroundColor = color;
    btn.style.color = "#fff";
    btn.style.fontSize = "16px";
    btn.style.cursor = "pointer";

    btn.addEventListener("click", () => {
      // снимаем отметку со всех кнопок ряда
      row.querySelectorAll("button").forEach((b) => {
        b.textContent = b.getAttribute("data-label");
      });
      // отмечаем выбранную
      btn.textContent = label + " ✔";
      state[group] = label;
    });

    return btn;
  }

  // Ряд 1 (LC, LP)
  const row1 = document.createElement("div");
  row1.style.display = "flex";
  row1.style.gap = "10px";
  row1.appendChild(createToggleButton("LC", "crimson", "group1", row1));
  row1.appendChild(createToggleButton("LP", "teal", "group1", row1));
  panel.appendChild(row1);

  // Ряд 2 (a, b)
  const row2 = document.createElement("div");
  row2.style.display = "flex";
  row2.style.gap = "10px";
  row2.appendChild(createToggleButton("a", "royalblue", "group2", row2));
  row2.appendChild(createToggleButton("b", "darkorange", "group2", row2));
  panel.appendChild(row2);

  // Ряд 3 ("посмотреть")
  const row3 = document.createElement("div");
  const checkBtn = document.createElement("button");
  checkBtn.textContent = "посмотреть";
  checkBtn.style.padding = "12px 25px";
  checkBtn.style.fontSize = "18px";
  checkBtn.style.border = "none";
  checkBtn.style.borderRadius = "8px";
  checkBtn.style.backgroundColor = "limegreen";
  checkBtn.style.color = "#fff";
  checkBtn.style.cursor = "pointer";

  checkBtn.addEventListener("click", () => {
    if (state.group1 && state.group2) {
      const found = images.find(
        (img) =>
          img.attrs.includes(state.group1) && img.attrs.includes(state.group2)
      );
      if (found) {
        container.style.backgroundImage = `url(${found.url})`;
      } else {
        alert("Нет изображения с такими параметрами");
      }
    } else {
      alert("Выберите по одной кнопке из каждого ряда");
    }
  });

  row3.appendChild(checkBtn);
  panel.appendChild(row3);

  // ================================
  // 4. СООТВЕТСТВИЕ КНОПОК АТРИБУТАМ
  // ================================
  console.log("Соответствие кнопок:");
  console.log("LC =", attributes.LC);
  console.log("LP =", attributes.LP);
  console.log("a  =", attributes.a);
  console.log("b  =", attributes.b);
});
