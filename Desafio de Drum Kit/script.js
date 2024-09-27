function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const button = document.querySelector(`button[data-key="${e.keyCode}"]`);
    
    if (!audio) return; 
    audio.currentTime = 0; 
    audio.play();
    
    button.classList.add('playing');
}

function removeTransition(e) {
    if (e.propertyName !== 'transform') return; 
    this.classList.remove('playing');
}

const drums = document.querySelectorAll('.drum');
drums.forEach(drum => drum.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);
