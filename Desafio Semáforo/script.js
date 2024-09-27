let currentLight = 0;
let intervalId = null;

const semaforoImgs = [
    'imagens/semaforo_vermelho.png',  
    'imagens/semaforo_amarelo.png',   
    'imagens/semaforo_verde.png'      
];

function iniciarSemaforo() {
    if (intervalId) {
        return;
    }

    intervalId = setInterval(trocarLuz, 2000);
}

function pararSemaforo() {
    clearInterval(intervalId);
    intervalId = null;
}

function trocarLuz() {
    const semaforoImg = document.getElementById('semaforo-img');
    
    semaforoImg.src = semaforoImgs[currentLight];
    
    currentLight++;
    
    
    if (currentLight >= semaforoImgs.length) {
        currentLight = 0; 
    }
}
