import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        redirect: '/dashboard',
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: 'Dashboard' },
    },
    {
        path: '/alunos',
        name: 'Alunos',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: 'Alunos' },
    },
    {
        path: '/treinos',
        name: 'Treinos',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: 'Treinos' },
    },
    {
        path: '/exercicios',
        name: 'Exercicios',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: 'Exercícios' },
    },
    {
        path: '/instrutores',
        name: 'Instrutores',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: 'Instrutores' },
    },
    {
        path: '/planos',
        name: 'Planos',
        component: () => import('@/views/Dashboard.vue'),
        meta: { title: 'Planos' },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    document.title = `${to.meta.title} - MyBody Admin`
    next()
  })

export default router