function reajuste() {
    var nome = prompt("Qual é o nome do funcionário: ");
    var salario = parseFloat(prompt("Qual é o salário do funcionário: "));
    var porcentagem = parseFloat(prompt("Qual será a porcentagem de reajuste: "));

    if (isNaN(salario) || isNaN(porcentagem) || salario < 0 || porcentagem < 0) {
        document.getElementById("reajuste").innerHTML = "Por favor, insira valores válidos para salário e porcentagem.";
        return;
    }

    var aumento = salario * (porcentagem / 100);
    var novoSalario = salario + aumento;

    document.getElementById("reajuste").innerHTML =
        `<p> Nome do Funcionário: ${nome} <br>
        Salário Atual: R$ ${salario}  <br>
        Porcentagem de Reajuste:  ${porcentagem} % <br> 
        Aumento: R$  ${aumento} <br> 
        Novo Salário: R$  ${novoSalario}</p>`;
}