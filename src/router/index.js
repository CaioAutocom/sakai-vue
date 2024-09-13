import { createRouter, createWebHistory } from 'vue-router';
import AppLayout from '../../src/layout/AppLayout.vue';

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
            component: () => import('../views/pages/auth/Login.vue')
        }
    ]
});

export default router;
