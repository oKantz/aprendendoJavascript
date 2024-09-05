

const lampada = document.getElementById('lampada'); 
// Const: Uma varíavel cujo o valor não pode ser alterado após já ter sido atribuido.
//Document: É um objeto global em JavaScript que representa o documento HTML carregado no navegador
//getElementById('lampada'): É um método do objeto document que retorna o elemento HTML com o id especificado. 
//Neste caso, getElementById está buscando um elemento com o id de "lampada".
//'lampada': É o valor do id que você atribuiu ao elemento <img> no HTML. Isso deve corresponder ao valor usado no atributo id do elemento HTML que você deseja selecionar.

function lampada{



lampada.addEventListener('mouseover', () => {
    if (lampada.src.includes('lampada_apagada.png')) {
    lampada.src = 'lampada_acesa.jpg';
}
});

lampada.addEventListener('mouseout', () => {
if (lampada.src.includes('lampada_acendida.png')) {
    lampada.src = 'lampada_apagada.jpg';
}
});

lampada.addEventListener('click', () => {
lampada.src = 'lampada_quebrada.jpg';
});

// A lâmpada resetará sua condição caso recarregue a página
window.addEventListener('load', () => {
lampada.src = 'lampada_apagada.jpg';
});
}