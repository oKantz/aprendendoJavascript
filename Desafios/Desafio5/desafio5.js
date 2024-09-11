let km, hm, dam, dm, cm, mm;

        function medidas() {
            const metros = prompt('Digite um valor em metros: ');
            

        
            km = metros / 1000;
            hm = metros * 0.01;
            dam = metros * 0.1;
            dm = metros * 10;
            cm = metros * 100;
            mm = metros * 1000;


            mostrarValor();
        }

        function mostrarValor() {

            
            
            const valores = `O valor convertido para KM é: ${km} km<br>`+
                            `O valor convertido para HM é: ${hm} hm<br>`+
                            `O valor convertido para DAM é: ${dam} dam<br>`+
                            `O valor convertido para DM é: ${dm} dm<br>`+
                            `O valor convertido para CM é: ${cm} cm<br>`+
                            `O valor convertido para MM é: ${mm} mm`;

            document.getElementById("valores").innerHTML = valores;
        }