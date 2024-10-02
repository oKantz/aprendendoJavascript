const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Definição do tamanho do canvas
canvas.width = 320;
canvas.height = 480;

// Variáveis de jogo
const bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.6,
    lift: -8,  // Ajuste do pulo para ser mais fraco
    velocity: 0
};

const pipes = [];
const pipeWidth = 50;
const pipeGap = 120;
let pipeTimer = 0;
let score = 0;
let isGameOver = false;

// Evento para fazer o pássaro "voar"
document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        bird.velocity = bird.lift;
    }
});

// Função para gerar novos canos
function generatePipes() {
    const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
    pipes.push({
        x: canvas.width,
        top: pipeHeight,
        bottom: pipeHeight + pipeGap
    });
}

// Função de atualização do jogo
function updateGame() {
    if (isGameOver) return;

    // Atualização do pássaro
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Limitar o pássaro a não sair dos limites
    if (bird.y + bird.height > canvas.height) {
        isGameOver = true;
    }
    if (bird.y < 0) {
        bird.y = 0;
        bird.velocity = 0;
    }

    // Atualização dos canos
    pipeTimer++;
    if (pipeTimer > 90) {
        generatePipes();
        pipeTimer = 0;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= 2;

        // Verifica se o pássaro colidiu com o cano
        if (bird.x + bird.width > pipes[i].x && bird.x < pipes[i].x + pipeWidth) {
            if (bird.y < pipes[i].top || bird.y + bird.height > pipes[i].bottom) {
                isGameOver = true;
            }
        }

        // Remove canos fora da tela e incrementa o placar
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
            score++;
        }
    }

    // Verifica se o jogo acabou
    if (isGameOver) {
        alert(`Game Over! Score: ${score}`);
        document.location.reload();
    }
}

// Função para desenhar o jogo
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o pássaro
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Desenha os canos
    ctx.fillStyle = '#008000';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);  // Parte de cima
        ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);  // Parte de baixo
    });

    // Desenha o placar
    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

// Função principal do jogo
function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

// Inicia o jogo
gameLoop();
