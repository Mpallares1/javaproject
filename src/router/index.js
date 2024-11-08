import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Usuaris from '../views/Usuaris.vue'
import Comentaris from '../views/Comentaris.vue'
import Calculadora from '../views/Calculadora.vue'

const routes = [
    { path: '/', name: 'Home', component: Home },
    { path: '/usuaris', name: 'Usuaris', component: Usuaris },
    { path: '/comentaris', name: 'Comentaris', component: Comentaris },
    { path: '/calculadora', name: 'Calculadora', component: Calculadora }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router