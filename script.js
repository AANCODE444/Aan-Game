const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 40,
    height: 40,
    color: "blue",
    speed: 5
};

const bullets = [];
const enemies = [];

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawBullets() {
    ctx.fillStyle = "red";
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
    drawPlayer();
    drawBullets();
    drawEnemies();
    detectCollisions();
    requestAnimationFrame(updateGame);
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    }
    if (e.key === "ArrowRight" && player.x + player.width < canvas.width) {
        player.x += player.speed;
    }
    if (e.key === " ") {
        bullets.push({ x: player.x + 15, y: player.y, width: 10, height: 20, speed: 7 });
    }
});

setInterval(() => {
    enemies.push({
        x: Math.random() * (canvas.width - 40),
        y: 0,
        width: 40,
        height: 40,
        speed: 2
    });
}, 1000);

updateGame();
