import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '../../src/layout/AppLayout.vue';
import Login from '../views/pages/auth/Login.vue';
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    path: '/pessoas',
                    name: 'pessoas',
                    component: () => import('../../src/views/pages/clientes/ClientesPage.vue')
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        }
    ]
});

export default router;
