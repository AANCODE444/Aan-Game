const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playerImg = document.getElementById("playerImg");
const enemyImg = document.getElementById("enemyImg");
const bgImg = document.getElementById("backgroundImg");
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
    ctx.drawImage(playerImg, player.x - 25, player.y - 25, 50, 50);
}

function drawEnemies() {
    enemies.forEach((enemy) => {
        ctx.drawImage(enemyImg, enemy.x, enemy.y, enemy.width, enemy.height);
    });
}
let bgY = 0;
function drawBackground() {
    ctx.drawImage(bgImg, 0, bgY, canvas.width, canvas.height);
    ctx.drawImage(bgImg, 0, bgY - canvas.height, canvas.width, canvas.height);
    bgY += 2;
    if (bgY >= canvas.height) {
        bgY = 0;
    }
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
    drawBackground();
    player.x += player.dx;

    if (player.x < 0) player.x = 0;
    if (player.x + player.width > canvas.width) player.x = canvas.width - player.width;

    drawPlayer();
    drawBullets();
    drawEnemies();
    detectCollisions();
    requestAnimationFrame(updateGame);
}
// 🎮 Analog Virtual (Fix agar bisa ke kiri & kanan)
const joystick = document.getElementById("joystick");
const stick = document.getElementById("stick");

let joystickActive = false;
let startX = 0;

joystick.addEventListener("touchstart", (e) => {
    joystickActive = true;
    startX = e.touches[0].clientX;
});

joystick.addEventListener("touchmove", (e) => {
    if (!joystickActive) return;

    let moveX = e.touches[0].clientX - startX;

    if (moveX < -20) {
        player.dx = -player.speed;
    } else if (moveX > 20) {
        player.dx = player.speed;
    } else {
        player.dx = 0;
    }
});

joystick.addEventListener("touchend", () => {
    joystickActive = false;
    player.dx = 0;
});

// 🔫 Tombol Tembak (Fix agar berfungsi)
document.getElementById("shootButton").addEventListener("touchstart", () => {
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
