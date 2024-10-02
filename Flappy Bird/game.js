const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 320;
canvas.height = 480;

const bird = {
    x: 50,
    y: 150,
    width: 20,
    height: 20,
    gravity: 0.6,
    lift: -8,  
    velocity: 0
};

const pipes = [];
const pipeWidth = 50;
const pipeGap = 120;
let pipeTimer = 0;
let score = 0;
let isGameOver = false;

document.addEventListener('keydown', function (event) {
    if (event.code === 'Space') {
        bird.velocity = bird.lift;
    }
});

function generatePipes() {
    const pipeHeight = Math.floor(Math.random() * (canvas.height - pipeGap));
    pipes.push({
        x: canvas.width,
        top: pipeHeight,
        bottom: pipeHeight + pipeGap
    });
}

function updateGame() {
    if (isGameOver) return;

    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    if (bird.y + bird.height > canvas.height) {
        isGameOver = true;
    }
    if (bird.y < 0) {
        bird.y = 0;
        bird.velocity = 0;
    }

    pipeTimer++;
    if (pipeTimer > 90) {
        generatePipes();
        pipeTimer = 0;
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= 2;

        if (bird.x + bird.width > pipes[i].x && bird.x < pipes[i].x + pipeWidth) {
            if (bird.y < pipes[i].top || bird.y + bird.height > pipes[i].bottom) {
                isGameOver = true;
            }
        }

        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
            score++;
        }
    }

    if (isGameOver) {
        alert(`Game Over! Score: ${score}`);
        document.location.reload();
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#FFD700';
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    ctx.fillStyle = '#008000';
    pipes.forEach(pipe => {
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.top);  
        ctx.fillRect(pipe.x, pipe.bottom, pipeWidth, canvas.height - pipe.bottom);  
    });

    ctx.fillStyle = '#000';
    ctx.font = '16px Arial';
    ctx.fillText(`Score: ${score}`, 10, 20);
}

function gameLoop() {
    updateGame();
    drawGame();
    requestAnimationFrame(gameLoop);
}

gameLoop();
