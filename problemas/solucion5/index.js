const input = document.getElementById('password')
const button = document.getElementById('btn')
const listaValidadores = document.getElementById('results')
const values = {
    characters:document.getElementById('characters_li'),
    upperCase:document.getElementById('upperCase_li'),
    lowerCase:document.getElementById('lowerCase_li'),
    numbers:document.getElementById('numbers_li'),
    specialCharacters:document.getElementById('specialCharacters_li'),
    zeros:document.getElementById('zeros_li'),
    spaces:document.getElementById('spaces_li'),
    consecutiveCharacters:document.getElementById('consecutiveCharacters_li'),
    consecutiveSpecialCharacters:document.getElementById('consecutiveSpecialCharacters_li'),
}

input.addEventListener('input', () => {
    let validar = validatePassword(input.value)
    validationInputs(validar)
    
})
button.addEventListener('click', () => {
    let validar = validatePassword(input.value)
    validationInputs(validar)
})

function validationInputs(validar){
    values.characters.style.color = validar.length ? 'green' : 'red'
    values.upperCase.style.color = validar.upperCase ? 'green' : 'red'
    values.lowerCase.style.color = validar.lowerCase ? 'green' : 'red'
    values.numbers.style.color = validar.numbers ? 'green' : 'red'
    values.specialCharacters.style.color = validar.specialCharacters ? 'green' : 'red'
    values.zeros.style.color = validar.zeros ? 'green' : 'red'
    values.spaces.style.color = validar.spaces ? 'green' : 'red'
    values.consecutiveCharacters.style.color = validar.consecutiveCharacters ? 'green' : 'red'
    values.consecutiveSpecialCharacters.style.color = validar.consecutiveSpecialCharacters ? 'green' : 'red'
  
}
function validatePassword(password) {
    var letters = password.split("");
    var validations = {
        length: true,
        upperCase: true,
        lowerCase: true,
        numbers: true,
        specialCharacters: true,
        zeros: true,
        spaces: true,
        consecutiveCharacters: true,
        consecutiveSpecialCharacters: true,
    }
    var especialCharacters = ["!","@","#","$","%","ˆ","&","*","-","_","+","=","?"]
    if(password.length < 16) {
        console.log("la contraseña es muy corta\n")
        validations.length = false;
    }
    if(letters.filter(letter => letter === letter.toUpperCase()).length < 1) {
        console.log("no hay mayusculas\n")
        validations.upperCase = false;
    }
    if(letters.filter(letter => letter === letter.toLowerCase()).length < 1) {
        console.log("no hay minusculas\n")
        validations.lowerCase = false;
    }
    if(letters.filter(letter => !isNaN(letter)).length < 4) {
        console.log("no hay numeros suficientes\n")
        validations.numbers = false;
    }
    if(letters.filter(letter => isNaN(letter)).length < 1) {
        console.log("no hay letras\n")
        validations.specialCharacters = false;
    }
    if(letters.filter(letter => especialCharacters.includes(letter)).length < 2) {
        console.log("no hay caracteres especiales suficientes\n")
        validations.specialCharacters = false;
    }
    if(letters.filter(letter => letter === "0").length > 0) {
        console.log("hay ceros\n")
        validations.zeros = false;
    }
    if(letters.filter(letter => letter === " ").length > 0) {
        console.log("hay espacios\n")
        validations.spaces = false;
    }
    for(let i = 0; i < letters.length; i++) {
        if(letters[i] === letters[i+1]) {
            console.log("hay dos caracteres iguales consecutivos\n")
            validations.consecutiveCharacters = false;
        }
    }
    for(let i = 0; i < letters.length; i++) {
        if(especialCharacters.includes(letters[i]) && especialCharacters.includes(letters[i+1])) {
            console.log("hay dos caracteres especiales consecutivos\n")
            validations.consecutiveSpecialCharacters = false;
        }
    }
    for(let i = 0; i < especialCharacters.length; i++) {
        if(letters.filter(letter => letter === especialCharacters[i]).length > 1) {
            console.log("hay dos caracteres especiales iguales\n")
            validations.consecutiveSpecialCharacters = false;
        }
    }
    return validations
}