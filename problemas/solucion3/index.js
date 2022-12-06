main();
function validatePassword(password) {
    var letters = password.split("");
    var especialCharacters = ["!","@","#","$","%","ˆ","&","*","-","_","+","=","?"]
    if(password.length < 16) {
        process.stdout.write("la contraseña es muy corta\n")
        return false
    }
    if(letters.filter(letter => letter === letter.toUpperCase()).length < 1) {
        process.stdout.write("no hay mayusculas\n")
        return false
    }
    if(letters.filter(letter => letter === letter.toLowerCase()).length < 1) {
        process.stdout.write("no hay minusculas\n")
        return false
    }
    if(letters.filter(letter => !isNaN(letter)).length < 4) {
        process.stdout.write("no hay numeros suficientes\n")
        return false
    }
    if(letters.filter(letter => isNaN(letter)).length < 1) {
        process.stdout.write("no hay letras\n")
        return false
    }
    if(letters.filter(letter => especialCharacters.includes(letter)).length < 2) {
        process.stdout.write("no hay caracteres especiales suficientes\n")
        return false
    }
    if(letters.filter(letter => letter === "0").length > 0) {
        process.stdout.write("hay ceros\n")
        return false
    }
    if(letters.filter(letter => letter === " ").length > 0) {
        process.stdout.write("hay espacios\n")
        return false
    }
    for(let i = 0; i < letters.length; i++) {
        if(letters[i] === letters[i+1]) {
            process.stdout.write("hay dos caracteres iguales consecutivos\n")
            return false
        }
    }
    for(let i = 0; i < letters.length; i++) {
        if(especialCharacters.includes(letters[i]) && especialCharacters.includes(letters[i+1])) {
            process.stdout.write("hay dos caracteres especiales consecutivos\n")
            return false
        }
    }
    for(let i = 0; i < especialCharacters.length; i++) {
        if(letters.filter(letter => letter === especialCharacters[i]).length > 1) {
            process.stdout.write("hay dos caracteres especiales iguales\n")
            return false
        }
    }
    return true
}

function main(){
    process.stdout.write("Ingrese la contraseña: ");
    process.stdin.on('data', function(data) {
        let result = validatePassword(data.toString().trim());
        if(!result) {
            process.stdout.write("Contraseña invalida\n");
            process.exit();
        }
        process.stdout.write("Contraseña valida\n");
        process.exit();
    });
    
}
