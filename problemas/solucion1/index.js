main();
function multiplicacion(x, y) {
    resultado = 0;
    signo = 1;

    if(x == 0 || y == 0){
        resultado = 0;
        return 0;
    }

    x=parseInt(x);
    y=parseInt(y);
    
    if (x < 0) {
        x *= -1;
        signo *= -1;
    }
    
    if (y < 0) {
        y *= -1;
        signo *= -1;
    }

    for (let i = 0; i < y; i++)resultado += x;

    if (signo < 0) {
        resultado *= -1;
    }
    return resultado;
    
}
function main (){
    process.stdout.write("Ingrese el primer numero: ");
    process.stdin.on('data', (data) => {
        const x = data.toString().trim()
        if(isNaN(x)){
            console.log("Por favor ingrese un numero valido")
            process.exit();
        }
        process.stdout.write("Ingrese el segundo numero: ");
        process.stdin.on('data', (data) => {
            const y = data.toString().trim()
            if(isNaN(y)){
                console.log("Por favor ingrese un numero valido")
                process.exit();
            }
            const resultado = multiplicacion(x,y)
            console.log("El resultado es: " + resultado)
            process.exit();
        })
    })
}