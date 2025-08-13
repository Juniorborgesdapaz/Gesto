// -------------------------
// Fundo aleatório (use suas fotos locais)
// -------------------------
const backgrounds = [
  "fotos/tay1.jpg",
  "fotos/tay3.jpg",
  "fotos/tay4.PNG",
  "fotos/tay5.PNG",
  "fotos/tay6.PNG",
  "fotos/tay7.PNG",
  "fotos/tay8.PNG",


];
document.body.style.backgroundImage =
  `url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]})`;

// -------------------------
// Estado + LocalStorage
// -------------------------
let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let gestures = JSON.parse(localStorage.getItem("gestures")) || [];

const scoreElement = document.getElementById("score");
const listElement  = document.getElementById("gesture-list");

const addGestureBtn = document.getElementById("add-gesture-btn");
const addPointBtn   = document.getElementById("add-point-btn");
const removePointBtn= document.getElementById("remove-point-btn");

// Overlay de animação
const overlay  = document.getElementById("animOverlay");
const animIcon = document.getElementById("animEmoji");
const animText = document.getElementById("animText");

// -------------------------
// Render
// -------------------------
function renderGestures() {
  listElement.innerHTML = "";
  gestures.forEach((g) => {
    const li = document.createElement("li");
    li.textContent = `${g.gesture} — ${g.description}`;
    listElement.appendChild(li);
  });
}
function updateScore() {
  scoreElement.textContent = score;
  localStorage.setItem("score", String(score));
}

// -------------------------
// Ações
// -------------------------
addGestureBtn.addEventListener("click", () => {
  const gesture = document.getElementById("gesture").value.trim();
  const description = document.getElementById("description").value.trim();
  if (!gesture || !description) {
    alert("Preencha o gesto e a descrição.");
    return;
  }
  gestures.push({ gesture, description });
  localStorage.setItem("gestures", JSON.stringify(gestures));
  renderGestures();
  document.getElementById("gesture").value = "";
  document.getElementById("description").value = "";
});

addPointBtn.addEventListener("click", () => {
  if (score >= 10) return;    // não passa de 10
  score++;
  updateScore();
  playAnimation("add");        // coração normal + mensagem depois
  if (score === 10) {
    // extra: alerta quando chega a 10
    setTimeout(() => {
      alert("🎉 Você atingiu 10 pontos! Pode pedir em namoro! 💍");
    }, 900);
  }
});

removePointBtn.addEventListener("click", () => {
  if (score <= 0) return;     // não vai abaixo de 0
  score--;
  updateScore();
  playAnimation("remove");     // coração partido + 'Relacionamento tóxico'
});

// -------------------------
// Animações
// -------------------------
/**
 * type: "add" | "remove"
 * - add: mostra ❤️ pulsando; após ~1.2s, mostra "Falta pouco para namorarmos ❤️"
 * - remove: mostra 💔 e o texto "Relacionamento tóxico" imediatamente
 */
function playAnimation(type) {
  // reset conteúdo
  animText.textContent = "";
  animIcon.textContent = type === "remove" ? "💔" : "❤️";
  overlay.classList.remove("hidden");
  overlay.setAttribute("aria-hidden", "false");

  if (type === "add") {
    // Primeiro só o coração pulsando
    const msgTimer = setTimeout(() => {
      animText.textContent = "Falta pouco para namorarmos ❤️";
    }, 1200);

    // Some tudo
    const hideTimer = setTimeout(() => {
      overlay.classList.add("hidden");
      overlay.setAttribute("aria-hidden", "true");
      animText.textContent = "";
      clearTimeout(msgTimer);
      clearTimeout(hideTimer);
    }, 2600);
  } else {
    // Remover ponto: coração partido + mensagem imediata
    animText.textContent = "Relacionamento tóxico";
    const hideTimer = setTimeout(() => {
      overlay.classList.add("hidden");
      overlay.setAttribute("aria-hidden", "true");
      animText.textContent = "";
      clearTimeout(hideTimer);
    }, 1800);
  }
}

// -------------------------
// Inicialização
// -------------------------
updateScore();
renderGestures();
