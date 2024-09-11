
function troco(){
    const nome = prompt("por favor, insira o nome do produto: ");

    
    const num1 = Number(prompt('Insira o preço do ' + nome));
    const num2 = Number(prompt('Quanto você irá pagar pelo ' + nome + '?'));
    
    let troco = num1 - num2;
    
    
        
    
        alert('O troco que você receberá no seu ' + nome + ' que custa ' + num1 + ' e você pagará ' + num2 + ' é: ' + troco);
       
    
    }