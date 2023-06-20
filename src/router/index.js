import { createRouter,createWebHashHistory } from 'vue-router'

//将路由与组件进行映射
const routes = [
    {
        //主路由
        path: '/',
        component: () => import('../views/Main.vue'),
        name: 'homeroute',
        redirect: '/home',
        // children: [
        //     {
        //         path: '/home',
        //         name: 'home',
        //         component: () => import('../views/home/Home.vue')
        //     },
        //     {
        //         path: '/user',
        //         name: 'user',
        //         component: () => import('../views/User/User.vue')
        //     },
        //     {
        //         path: '/page1',
        //         name: 'page1',
        //         component: () => import('../views/Page1.vue')
        //     },
        //     {
        //         path: '/page2',
        //         name: 'page2',
        //         component: () => import('../views/Page2.vue')
        //     },
        // ],
        children: [],

    },
    {
        //登录界面
        path: '/login',
        name: 'login',
        component: () => import('../views/Login.vue')
    },
    {
        //添加404界面
        path: '/404',
        name: '404',
        component: () => import('../views/404/404.vue')
    },
    {
        //自定义其他路由皆访问不了，完美解决跨权限访问题，就是导致刷新也会变成404比较头疼
        //这个*匹配必须放在最后，将改路由配置放到所有路由的配置信息的最后，否则会其他路由path匹配造成影响。
        //匹配所有路径 vue2使用*  vue3使用/:pathMatch(.*)*或/:pathMatch(.*)或/:catchAll(.*)
        path: '/:pathMatch(.*)*',
        redirect: '/404',
    },
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

