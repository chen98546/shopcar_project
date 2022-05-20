import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../view/Index.vue'
Vue.use(VueRouter)

let router = new VueRouter({
    routes: [{
            path: '/',
            redirect: '/home/index',
        },
        {
            path: '/home',
            component: Index,
            meta: {
                levelOnePage: true,
            },
            children: [{
                    path: 'index',
                    component: () => import('../view/Home.vue'),
                    meta: {
                        title: 'Home',
                        levelOnePage: true,
                    },
                },
                {
                    path: 'category',
                    component: () => import('../view/Category.vue'),
                    meta: {
                        title: 'Category',
                        levelOnePage: true,
                    }
                },
                {
                    path: 'shopcar',
                    component: () => import('../view/Shopcar.vue'),
                    meta: {
                        title: 'Shopcar',
                        levelOnePage: true,
                    }
                },
                {
                    path: 'personal',
                    component: () => import('../view/Personal.vue'),
                    meta: {
                        title: 'Personal',
                        levelOnePage: true,
                    }
                },
            ]
        },
        {
            path: '/supermarket/:id',
            component: () => import('../view/GoodsList.vue'),
        },
        {
            path: '/goodsDetail/:id',
            component: () => import('../view/GoodsDetail.vue'),
        },
        // {
        //     path: '/test',
        //     component: () => import('../view/Test.vue'),
        //     meta: {
        //         title: 'Test'
        //     }
        // },


    ],
})

export default router