var nome, nota1, nota2, media;
function CalculaMedia() {
    nome = prompt("Qual é o nome do aluno?");
    nota1 = Number(prompt("Primeira nota de " + nome + ":"));
    nota2 = Number(prompt("Segunda nota de " + nome + ":"));

    media = (nota1 + nota2) / 2;

    document.getAnimations("substitulo").innerText = `<h2>Analisando a situação de ${nome}</h2>`

    if (media > 6) {
        document.getElementById("aprovado").innerHTML = `<p>
        Com as notas ${nota1} e ${nota2}, a média é ${media} <br>
        Com média acima de 6,0, o aluno está <p style="background-color: green; width: max-content;">APROVADO</p>
        </p>`;
    }
    else {
        if (media > 3 && media <= 6) {
            document.getElementById("recuperacao").innerHTML = `<p>
            Com as notas ${nota1} e ${nota2}, a média é ${media} <br>
            Com média entre 3,0 e 6,0, o aluno está em <p style="background-color: yellow; width: max-content;">RECUPERAÇÃO</p> 
        </p>`;
        }
        else {
            document.getElementById("recuperacao").innerHTML = `<p>
            Com as notas ${nota1} e ${nota2}, a média é ${media} <br>
            Com média abaixo de 3,0, o aluno está <p style="background-color: red; width: max-content;">REPROVADO</p>
        </p>`;
        }
    }

}