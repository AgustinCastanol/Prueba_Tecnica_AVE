<template>
    <div>
        <h1>Problema N°1</h1>
        <p>Se debe crear una solución que dado 2 números X y Y cualesquiera, se obtenga la
multiplicación de los mismos SIN usar el operador de multiplicación *</p>
    </div>
    <div>
        <h1>Solución</h1>
        <h2>Ingrese 2 numeros</h2>
        <div>
            <label  for="x">X:</label>
            <input v-model="x" type="Number" name="x" id="x">
        </div>
        <div>
            <label for="y">Y:</label>
            <input v-model="y" type="Number" name="y" id="y">
        </div>
        <div>
            <button @click="multiplicacion(x, y)">
                Multiplicar
            </button>
            <button @click="clear()">
                Limpiar
            </button>
            </div>
            <div >
                <h3>Resultado: {{ resultado }}</h3>
            </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const x = ref(0)
const y = ref(0)
const resultado = ref(0)
const signo = ref(1)
function multiplicacion(x, y) {
    resultado.value = 0;
    signo.value = 1;

    if(x == 0 || y == 0){
        resultado.value = 0;
        return;
    }

    x=parseInt(x);
    y=parseInt(y);
    if (x < 0) {
        x *= -1;
        signo.value *= -1;
    }
    if (y < 0) {
        y *= -1;
        signo.value *= -1;
    }

    for (let i = 0; i < y; i++)resultado.value += x;

    if (signo.value < 0) {
        resultado.value *= -1;
    }
    
}
function clear() {
    x.value = 0
    y.value = 0
    resultado.value = 0
}
</script>