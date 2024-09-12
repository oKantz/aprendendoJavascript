function botao(){
    var dolar, carteira, dolarcotacao;

        dolarcotacao = 5.65;
        carteira = Number(prompt("Quantos R$ você tem na carteira ?"));
       
       dolar = dolarcotacao / carteira;
       
        document.getElementById("dolar").innerHTML =
        `<p>
            Você tem ${dolar} US$
        </p>`;
       
        }