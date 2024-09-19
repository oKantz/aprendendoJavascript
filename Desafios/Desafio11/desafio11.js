var ano;
function VerificarAno() {
    ano = Number(prompt("Qual é o ano você quer verificar?"));

    document.getElementById("substitulo").innerHTML = `Analisando o ano de ${ano}...`;

    if (ano % 4 == 0) {
        document.getElementById("ano").innerHTML = `O ano de ${ano} É BISSEXTO ✔`;
    }
    else {
        document.getElementById("ano").innerHTML = `O ano de ${ano} NÃO É BISSEXTO ✖`;
    }
}