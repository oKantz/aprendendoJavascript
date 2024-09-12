function aplicarDesconto() {
    const produto = prompt("Qual o nome do produto: ");
    const valorString = prompt("Digite o valor do produto: ");
    
    const valor = parseFloat(valorString);
    
   
        const valorComDesconto = valor * 0.90;
    
    document.getElementById("desconto").innerHTML =
    `<p>
        Você vai pagar R$ ${valorComDesconto} com 10% de desconto
    </p>
    
    <p>
        Comprando o produto ${produto}
    </p>`;
}
