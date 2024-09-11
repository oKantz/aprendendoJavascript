var fahrenheit, kelvin;

function temperatura() {

    var graus, fahrenheit, kelvin, valores;

    graus = prompt('Digite um valor em Celsius: ');
    
    fahrenheit = (graus * 9/5) + 32;
    kelvin = graus + 273.15;

    valores = `O valor convertido para Fahrenheit é: ${fahrenheit} °F<br>` +
                    `O valor convertido para Kelvin é: ${kelvin} K`;
    
    document.getElementById("valores").innerHTML = `${valores}`;

}



    
