import AppLayout from '@/layout/AppLayout.vue';
import Clientes from '@/views/pages/clientes/clientesPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

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
                    component: Clientes
                }
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        }
    ]
});

export default router;
