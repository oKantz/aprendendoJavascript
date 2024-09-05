
function troco(){
    const nome = prompt("por favor, insira o nome do produto:");

    
    const num1 = Number(prompt('Insira o preço do ' + nome));
    const num2 = Number(prompt('Quanto você irá pagar pelo' + nome '?'));
    
    let troco = num2 - num1;
    
    
        
    
        alert('O troco que você recerberá no seu ' + nome + ' que custa' + num1 + ' e você pagará' + num2 + ' é: ' + troco);
       
    
    }