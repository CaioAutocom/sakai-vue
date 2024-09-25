import AppLayout from '@/layout/AppLayout.vue';
import PessoaPage from '@/views/pages/pessoas/PessoaPage.vue';
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
            path: '/app',
            component: AppLayout,
            children: [
                {
                    path: 'pessoas',
                    name: 'pessoas',
                    component: PessoaPage
                }
            ]
        }
    ]
});

export default router;
