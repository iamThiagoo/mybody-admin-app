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
        component: () => import('@/views/Alunos.vue'),
        meta: { title: 'Alunos' },
    },
    {
        path: '/exercicios',
        name: 'Exercicios',
        component: () => import('@/views/Exercicios.vue'),
        meta: { title: 'Exercícios' },
    },
    {
        path: '/avaliacoes-fisicas',
        name: 'Avaliacoes Fisicas',
        component: () => import('@/views/AvaliacoesFisicas.vue'),
        meta: { title: 'Avaliações Físicas' },
    },
    {
        path: '/instrutores',
        name: 'Instrutores',
        component: () => import('@/views/Instrutores.vue'),
        meta: { title: 'Instrutores' },
    },
    {
        path: '/planos',
        name: 'Planos',
        component: () => import('@/views/Planos.vue'),
        meta: { title: 'Planos' },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, _from, next) => {
    document.title = `${to.meta.title} - MyBody Admin`
    next()
  })

export default router