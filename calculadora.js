
document.addEventListener("DOMContentLoaded", function() {

    //Variables del html
    const numeros = document.querySelectorAll(".btn:not(.backspace)");
    const operadores = document.querySelectorAll(".operator");
    const pantalla = document.querySelector(".screen");
    let memoria = 0; // Variable para almacenar el valor en la memoria de los operadores M+, MC, MR

       // Función de los botones de los números
        numeros.forEach(function(numero) {
            numero.addEventListener("click", function() {
               if (pantalla.value === "0" || pantalla.value === "Expresión no válida" || pantalla.value === "Error: divisor 0") {
                pantalla.value = this.value;
                } else {
                pantalla.value += this.value;
            }
        });
    });


        //Función de los botones de los operadores
        operadores.forEach(function(operador) {
            operador.addEventListener("click", function() {
                const ultimoCaracter = pantalla.value.slice(-1);
                if (/\d/.test(ultimoCaracter)) { 
                    pantalla.value += " " + this.value + " ";
                    }
                }
            );
        });

   

        // Función del botón de igual
        document.querySelector(".btn[value='=']").addEventListener("click", function() {
        
        // Nos da por pantalla la expresión matemática
        const expresion = pantalla.value.trim();

        // Dividir la expresión en partes separadas por espacios
        const partes = expresion.split(" ");

        // Verificar si hay suficientes partes para realizar la operación
        if (partes.length !== 3) {
            pantalla.value = "Expresión no válida";
            return;
        }

        // Obtener los operandos y el operador
        const operando1 = parseFloat(partes[0]);
        const operador = partes[1];
        const operando2 = parseFloat(partes[2]);

        // Realiza la operación
        const resultado = operacion(operando1, operando2, operador);

        // Mostrar el resultado en la pantalla
        pantalla.value = resultado;
    });

        // Función para realizar las operaciones matemáticas
        function operacion(operando1, operando2, operador) {
            switch (operador) {
                case "+":
                    return operando1 + operando2;
                 case "-":
                    return operando1 - operando2;
                case "*":
                    return operando1 * operando2;
                case "/":

                // Verifica la división por cero
                    if (operando2 === 0) {
                     return "Error: divisor 0";
                    }
                    return operando1 / operando2;
                case "%":
                    return operando1 * (operando2 / 100);
                case "√":
                    return Math.sqrt(operando1);    
                default:
                    return "Operador no válido";
            }
        }


        // Función del botón de borrar pantalla y poner 0
        document.querySelector(".btn[value='CE']").addEventListener("click", function() {
        pantalla.value = "0";
    });

        // Función del botón de eliminar el último dígito
        document.querySelector(".btn.backspace").addEventListener("click", function() {
        console.log("Botón ← clicado"); // Añadir un log para depurar
            if (pantalla.value.length === 1) {
                pantalla.value = "0";
            } else {
                pantalla.value = pantalla.value.slice(0, -1);
            }
    });


    /* TO DO: Terminar los botones M+, MC, MR*/

        // Función del botón M+ (Suma lo que hay en la pantalla a la memoria)
        document.querySelector(".operator[value='M+']").addEventListener("click", function() {
        memoria += parseFloat(pantalla.value); // Suma el valor actual en pantalla a la memoria
    });

        // Función del botón MC (Borra la memoria)
        document.querySelector(".operator[value='MC']").addEventListener("click", function() {
        memoria = 0; // Reinicia la memoria a cero
    });

        // Función del botón MR (Recupera el valor de la memoria)
        document.querySelector(".operator[value='MR']").addEventListener("click", function() {
            pantalla.value = memoria.toString(); // Muestra el valor de la memoria en la pantalla
    });
});