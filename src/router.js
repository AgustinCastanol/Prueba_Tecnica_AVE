
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        name: 'Home',
        path: '/',
        component: ()=>import('./components/Home.vue')
    },
    {   
        name: 'Problema 1',
        path:'/problemaN1',
        component: ()=>import('./components/ProblemaN1.vue'),
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes,
  })
  export default router;