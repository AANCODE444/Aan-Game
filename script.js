const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 60,
    width: 50,
    height: 50,
    color: "blue",
    speed: 5,
    dx: 0
};

const bullets = [];
const enemies = [];

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.arc(player.x, player.y, player.width / 2, 0, Math.PI * 2);
    ctx.fill();
}

function drawBullets() {
    ctx.fillStyle = "yellow";
    bullets.forEach((bullet, index) => {
        ctx.fillRect(bullet.x, bullet.y, bullet.width, bullet.height);
        bullet.y -= bullet.speed;

        if (bullet.y < 0) {
            bullets.splice(index, 1);
        }
    });
}

function drawEnemies() {
    ctx.fillStyle = "green";
    enemies.forEach((enemy, index) => {
        ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
        enemy.y += enemy.speed;

        if (enemy.y > canvas.height) {
            enemies.splice(index, 1);
        }
    });
}

function detectCollisions() {
    bullets.forEach((bullet, bIndex) => {
        enemies.forEach((enemy, eIndex) => {
            if (
                bullet.x < enemy.x + enemy.width &&
                bullet.x + bullet.width > enemy.x &&
                bullet.y < enemy.y + enemy.height &&
                bullet.y + bullet.height > enemy.y
            ) {
                bullets.splice(bIndex, 1);
                enemies.splice(eIndex, 1);
            }
        });
    });
}

function updateGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    player.x += player.dx;

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    drawPlayer();
    drawBullets();
    drawEnemies();
    detectCollisions();
    requestAnimationFrame(updateGame);
}

// 🎮 Kontrol Analog Virtual
const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");

joystick.addEventListener("touchstart", () => {
    player.dx = -player.speed;
});
joystick.addEventListener("touchend", () => {
    player.dx = 0;
});

// 🔫 Tombol Tembak
document.getElementById("shootButton").addEventListener("click", () => {
    bullets.push({
        x: player.x - 5,
        y: player.y - 10,
        width: 10,
        height: 20,
        speed: 7
    });
});

// ⏳ Spawning Enemies
setInterval(() => {
    enemies.push({
        x: Math.random() * (canvas.width - 50),
        y: 0,
        width: 50,
        height: 50,
        speed: 2
    });
}, 1000);

updateGame();
