import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../view/Index.vue'
import store from '../store/store.js'
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
                showNavbar: true,
            },
            children: [{
                    path: 'index',
                    component: () => import('../view/Home.vue'),
                    meta: {
                        title: '首页',
                        showNavbar: true,
                    },
                },
                {
                    path: 'category',
                    component: () => import('../view/Category.vue'),
                    meta: {
                        title: '商品分类',
                        showNavbar: true,
                    }
                },
                {
                    path: 'shopcar',
                    component: () => import('../view/Shopcar.vue'),
                    meta: {
                        title: '购物车',
                        requireAuth: true,
                        // showNavbar: true,
                    }
                },
                {
                    path: 'personal',
                    component: () => import('../view/Personal.vue'),
                    meta: {
                        title: '个人中心',
                        showNavbar: true,
                        requireAuth: true,
                    }
                },
            ]
        },
        {
            path: '/supermarket/:id',
            component: () => import('../view/GoodsList.vue'),
            meta: {
                title: '商品列表',
            }
        },
        {
            path: '/goodsDetail/:id',
            component: () => import('../view/GoodsDetail.vue'),
            meta: {
                title: '商品详情',
            }
        },
        {
            path: '/login',
            component: () => import('../view/Login.vue'),
            meta: {
                title: '登录',
            }
        },
        {
            path: '/address',
            component: () => import('../view/Address.vue'),
            meta: {
                title: '地址管理',
            }
        },
        {
            path: '/addAddress',
            component: () => import('../view/AddAddress.vue'),
            meta: {
                title: '添加地址',
            }
        },
        {
            path: '/editAddress/:id',
            component: () => import('../view/EditAddress.vue'),
            meta: {
                title: '编辑地址',
            }
        },
        {
            path: '/submitOrders',
            component: () => import('../view/SubmitOrders.vue'),
            meta: {
                title: '提交订单',
            }
        },
        {
            path: '/orderList',
            component: () => import('../view/OrderList.vue'),
            meta: {
                title: '订单列表',
            }
        },
        {
            path: '/orderDetail/:id',
            component: () => import('../view/OrderDetail.vue'),
            meta: {
                title: '订单详情',
            }
        },


    ],
})


router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.token) {
            next();
        } else {
            next({
                path: "/login",
                query: {
                    redirect: to.fullPath
                }
            })
        }
    } else {
        next();
    }

})

export default router