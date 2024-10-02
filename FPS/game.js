const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Definição do tamanho do canvas
canvas.width = 800;
canvas.height = 400;

const map = [
    [1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 1],
    [1, 0, 0, 0, 1, 0, 0, 1],
    [1, 0, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1]
];

const tileSize = 64;
const player = {
    x: 96,
    y: 96,
    angle: 0,
    speed: 3
};

const enemies = [
    { x: 320, y: 320, alive: true },
    { x: 400, y: 200, alive: true }
];

const fov = Math.PI / 3;  // Campo de visão (FOV)
const numRays = 100;  // Número de raios lançados para renderizar o cenário
const maxDepth = 300;  // Distância máxima que os raios podem atingir

// Controle de movimento
let keys = {
    w: false,
    a: false,
    s: false,
    d: false
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') keys.w = true;
    if (e.key === 'a') keys.a = true;
    if (e.key === 's') keys.s = true;
    if (e.key === 'd') keys.d = true;
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w') keys.w = false;
    if (e.key === 'a') keys.a = false;
    if (e.key === 's') keys.s = false;
    if (e.key === 'd') keys.d = false;
});

// Função para verificar colisões com paredes
function isWall(x, y) {
    const gridX = Math.floor(x / tileSize);
    const gridY = Math.floor(y / tileSize);
    return map[gridY][gridX] === 1;
}

// Função para movimentar o jogador
function movePlayer() {
    let moveX = 0;
    let moveY = 0;

    if (keys.w) {
        moveX = Math.cos(player.angle) * player.speed;
        moveY = Math.sin(player.angle) * player.speed;
    }
    if (keys.s) {
        moveX = -Math.cos(player.angle) * player.speed;
        moveY = -Math.sin(player.angle) * player.speed;
    }
    if (keys.a) player.angle -= 0.03;
    if (keys.d) player.angle += 0.03;

    const newX = player.x + moveX;
    const newY = player.y + moveY;

    if (!isWall(newX, newY)) {
        player.x = newX;
        player.y = newY;
    }
}

// Função para movimentar os inimigos em direção ao jogador
function moveEnemies() {
    enemies.forEach(enemy => {
        if (enemy.alive) {
            const dx = player.x - enemy.x;
            const dy = player.y - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Movimento do inimigo em direção ao jogador
            if (distance > 20) {
                enemy.x += (dx / distance) * 1.5;
                enemy.y += (dy / distance) * 1.5;
            }
        }
    });
}

// Função para lançar raios e renderizar o cenário
function castRays() {
    for (let i = 0; i < numRays; i++) {
        const rayAngle = player.angle - fov / 2 + (i / numRays) * fov;
        let hitWall = false;

        for (let depth = 0; depth < maxDepth; depth++) {
            const rayX = player.x + Math.cos(rayAngle) * depth;
            const rayY = player.y + Math.sin(rayAngle) * depth;

            if (isWall(rayX, rayY)) {
                const wallHeight = (tileSize * 10) / (depth * Math.cos(rayAngle - player.angle));

                ctx.fillStyle = `rgba(255, 255, 255, ${1 - depth / maxDepth})`;
                ctx.fillRect(i * (canvas.width / numRays), (canvas.height / 2) - wallHeight / 2, canvas.width / numRays, wallHeight);
                hitWall = true;
                break;
            }
        }

        // Se nenhum muro foi atingido, verificar se atingimos um inimigo
        if (!hitWall) {
            enemies.forEach(enemy => {
                if (enemy.alive) {
                    const distToEnemy = Math.sqrt(Math.pow(enemy.x - player.x, 2) + Math.pow(enemy.y - player.y, 2));

                    if (distToEnemy < depth) {
                        const enemyHeight = (tileSize * 10) / (distToEnemy * Math.cos(rayAngle - player.angle));
                        ctx.fillStyle = 'red';
                        ctx.fillRect(i * (canvas.width / numRays), (canvas.height / 2) - enemyHeight / 2, canvas.width / numRays, enemyHeight);
                    }
                }
            });
        }
    }
}

// Função para detectar se o jogador foi atingido
function checkEnemyCollision() {
    enemies.forEach(enemy => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20 && enemy.alive) {
            alert('Game Over! Você foi pego por um inimigo!');
            document.location.reload();
        }
    });
}

// Função para atualizar e renderizar o jogo
function gameLoop() {
    movePlayer();
    moveEnemies();
    checkEnemyCollision();

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    castRays();

    requestAnimationFrame(gameLoop);
}

// Inicia o jogo
gameLoop();
