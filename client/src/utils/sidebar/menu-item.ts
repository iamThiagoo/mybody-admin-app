export type TMenu = {
    route: string
    label: string
    icon: string
}

export const menuItems: TMenu[] = [
    {
        route: '/dashboard',
        label: 'Dashboard',
        icon: 'https://cdn.lordicon.com/upjgggre.json',
    },
    {
        route: '/alunos',
        label: 'Alunos',
        icon: 'https://cdn.lordicon.com/cniwvohj.json',
    },
    {
        route: '/exercicios',
        label: 'Exercícios',
        icon: 'https://cdn.lordicon.com/apgkpdeb.json',
    },
    {
        route: '/instrutores',
        label: 'Instrutores',
        icon: 'https://cdn.lordicon.com/wwcdwkaf.json',
    },
    {
        route: '/planos',
        label: 'Planos',
        icon: 'https://cdn.lordicon.com/gzqofmcx.json',
    },
]
