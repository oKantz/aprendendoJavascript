var preco_ant, preco_atual, preco, porcen;

function MudouPreco() {

    preco_ant = Number(prompt("Qual era o preço anterior do Produto?"));
    preco_atual = Number(prompt("Qual é o preço atual do Produto?"));

    document.getElementById("substitulo").innerHTML = `Analisando os valores informados...`;
    document.getElementById("preco").innerHTML = `O produto custava R$ ${preco_ant},00 e agora custa R$ ${preco_atual},00.`;

    if (preco_ant < preco_atual) {
        preco = preco_atual - preco_ant;
        porcen = ((preco_ant - preco_atual) / preco_ant) * 100;
        porcen = Math.abs(porcen.toFixed(2));

        document.getElementById("aviso").innerHTML = `Hoje o produto está mais caro.`;
        document.getElementById("precoatual").innerHTML = `O preço subiu R$ ${preco},00 em relação ao preço anterior.`;
        document.getElementById("porcen").innerHTML = `Uma variação de ${porcen}% pra cima.`;

    }
    else if (preco_ant == preco_atual) {

        document.getElementById("aviso").innerHTML = `Não ocorreu nenhuma mudança no valor do produto.`;

    }
    else {
        preco = preco_ant - preco_atual;
        porcen = ((preco_ant - preco_atual) / preco_ant) * 100;
        porcen = Math.abs(porcen.toFixed(2));

        document.getElementById("aviso").innerHTML = `Hoje o produto está mais barato.`;
        document.getElementById("precoatual").innerHTML = `O preço caiu R$ ${preco},00 em relação ao preço anterior.`;
        document.getElementById("porcent").innerHTML = `Uma variação de ${porcen}% pra baixo.`;
    }
}