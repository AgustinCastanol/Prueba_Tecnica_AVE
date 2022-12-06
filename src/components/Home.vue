<template>
    <h1>Home</h1>
    <div v-for=" route in routes">
        <li>
            <router-link :to="route.path">
                {{ route.name }}
            </router-link>
        </li>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const routes = ref([
    {
        path: '/problemaN1',
        name: 'Problema N°1',
    },
    {
        path: '/problemaN2',
        name: 'Problema N°2',
    },
    {
        path: '/problemaN3',
        name: 'Problema N°3',
    },
    {
        path: '/problemaN4',
        name: 'Problema N°4',
    },
    {
        path: '/problemaN5',
        name: 'Problema N°5',
    },
    {
        path: '/problemaN6',
        name: 'Problema N°6',
    },
    {
        path: '/problemaN7',
        name: 'Problema N°7',
    },
    {
        path: '/problemaN8',
        name: 'Problema N°8',
    }
])
</script>