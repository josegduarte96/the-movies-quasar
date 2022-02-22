export default {
    name: 'auth',
    component: () => import('../../auth/layouts/Login.vue'),
    children: [
        {
            path: '/sign-ip',
            name: 'login',
            component: () => import('../../auth/views/Signip.vue')
        },
        {
            path: '/sign-up',
            name: 'register',
            component: () => import('../../auth/views/Signup.vue')
        }
    ]
}