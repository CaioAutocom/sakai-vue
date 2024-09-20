import AppLayout from '@/layout/AppLayout.vue';
import Clientes from '@/views/pages/clientes/clientesPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/pages/auth/Login.vue')
        },
        {
            path: '/empresas',
            name: 'empresas',
            component: () => import('@/views/pages/auth/SelecionarEmpresa.vue')
        },
        {
            path: '/app',
            component: AppLayout,
            children: [
                {
                    path: 'pessoas',
                    name: 'pessoas',
                    component: Clientes
                }
            ]
        }
    ]
});

export default router;
