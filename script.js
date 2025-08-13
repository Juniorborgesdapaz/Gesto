let score = localStorage.getItem("score") ? parseInt(localStorage.getItem("score")) : 0;
let gestures = JSON.parse(localStorage.getItem("gestures")) || [];
const scoreElement = document.getElementById("score");
const listElement = document.getElementById("gesture-list");

const backgrounds = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBywc8SADD4IkBUF0aRyNPdxey7vmlnaGf4A&s",
    "https://revista.icasei.com.br/wp-content/uploads/2019/02/casais_marcantes_filmes_2.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRgjSCmnK2qqH8R9GG3QDjWuyrRV9lHpZAoD_yMHRZ6HzZoCxlCfljqKnEYkaaqCcUmzs&usqp=CAU"
];

document.body.style.backgroundImage = `url(${backgrounds[Math.floor(Math.random() * backgrounds.length)]})`;

function renderGestures() {
    listElement.innerHTML = "";
    gestures.forEach((g) => {
        const li = document.createElement("li");
        li.textContent = `${g.gesture} - ${g.description}`;
        listElement.appendChild(li);
    });
}

function updateScore() {
    scoreElement.textContent = score;
    localStorage.setItem("score", score);
}

function addGesture() {
    const gesture = document.getElementById("gesture").value.trim();
    const description = document.getElementById("description").value.trim();
    if (gesture && description) {
        gestures.push({ gesture, description });
        localStorage.setItem("gestures", JSON.stringify(gestures));
        renderGestures();
        document.getElementById("gesture").value = "";
        document.getElementById("description").value = "";
    }
}

function addPoint() {
    if (score < 10) {
        score++;
        updateScore();
        showHeartAnimation();
    }
}

function showHeartAnimation() {
    const anim = document.getElementById("heart-animation");
    anim.style.display = "flex";
    setTimeout(() => {
        anim.style.display = "none";
    }, 1500);
}

// Inicialização
updateScore();
renderGestures();
