main();
function validateArrayOfNumbers (array) {
    let property = {
        length: 0,
        max: 0,
        min: 0,
        porcentage:{
            odd: 0,
            even: 0,
            max_1000: 0,
            min:0,
            average:0,
        },

        }
    if(!Array.isArray(array)){
        process.stdout.write('El valor ingresado no es un arreglo');
        return false;
    }
    if(array.length < 0){
        process.stdout.write('El arreglo esta vacio');
        return property;
    }
    property.length = array.length;
    property.max = Math.max(...array);
    property.min = Math.min(...array);
    property.porcentage.odd = (array.filter(number => number % 2 !== 0).length / array.length) * 100;
    property.porcentage.even = (array.filter(number => number % 2 === 0).length / array.length) * 100;
    property.porcentage.max_1000 = (array.filter(number => number > 1000).length / array.length) * 100;
    property.porcentage.min = (property.min / property.max) * 100;
    property.porcentage.average = (array.reduce((a,b) => a + b, 0) / array.length) / property.max * 100;
    
    return property;
}
function main(){
    process.stdout.write('Ingrese un arreglo de numeros separados por comas: ');
    process.stdin.on('data', function(data){
        let array = data.toString().trim().split(',');
        array = array.map(number => {
           let aux = parseInt(number)
              if(isNaN(aux)){
                process.stdout.write('El valor ingresado no es un numero');
                process.exit(0);
                }
                return aux;
        });
        let property = validateArrayOfNumbers(array);
        process.stdout.write(`Cantidad de elementos del arreglo: ${property.length}\nPorcentaje de numeros pares: ${property.porcentage.even}\nPorcentaje de numeros impares: ${property.porcentage.odd}\nMayor valor: ${property.max}\nMenor valor:${property.min}\nPorcentaje de numeros mayores a 1000: ${property.porcentage.max_1000}\nPorcentaje del menor valor respecto al mayor: ${property.porcentage.min}\nPorcentaje del promedio de los numeros respecto al mayor: ${property.porcentage.average}\n`)
        process.exit(0);
    });
}