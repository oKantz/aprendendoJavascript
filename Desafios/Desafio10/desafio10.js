var a, b, c, result;
function Bhaskara() {
    a = Number(prompt("Qual é o valor de a?"));
    b = Number(prompt("Qual é o valor de b?"));
    c = Number(prompt("Qual é o valor de c?"));

    result = b * b - 4 * a * c;

    document.getElementById("substitulo").innerHTML = `<h2>Resolvendo Bhaskara</h2>`;
    document.getElementById("informacao").innerHTML = `
    <p>
        A equação atual é ${a}x² + ${b}x + ${c} = 0. <br><br>
        O cálculo realizado será Δ = ${b} - 4 . ${a} . ${c} <br><br>
        O valor calculado foi Δ = ${result} <br><br>
    </p>`
}
