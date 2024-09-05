const lampada = document.getElementById('lampada');
// Const: Uma varíavel cujo o valor não pode ser alterado após já ter sido atribuido.
//Document: É um objeto global em JavaScript que representa o documento HTML carregado no navegador
//getElementById('lampada'): É um método do objeto document que retorna o elemento HTML com o id especificado. 
//Neste caso, getElementById está buscando um elemento com o id de "lampada".
//'lampada': É o valor do id que você atribuiu ao elemento <img> no HTML. Isso deve corresponder ao valor usado no atributo id do elemento HTML que você deseja selecionar.

function controlarLampada(event) {
    if (lampada.src.includes('multimidia/lampada-quebrada.jpg')) {
        
        return;
    }

    switch (event.type) {
        case 'mouseover':
            if (lampada.src.includes('multimidia/lampada-apagada.jpg')) {
                lampada.src = 'multimidia/lampada-acesa.jpg';
            }
            break;
        case 'mouseout':
            if (lampada.src.includes('multimidia/lampada-acesa.jpg')) {
                lampada.src = 'multimidia/lampada-apagada.jpg';
            }
            break;
        case 'click':
            lampada.src = 'multimidia/lampada-quebrada.jpg';
            break;
    }
}


lampada.addEventListener('mouseover', controlarLampada);
lampada.addEventListener('mouseout', controlarLampada);
lampada.addEventListener('click', controlarLampada);