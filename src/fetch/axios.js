import Vue from 'vue'
import axios from 'axios';
import store from '../store/store';

import {
    Toast
} from 'vant'
import router from '@/router/router';

Vue.use({
    install(Vue) {
        Vue.prototype.$axios = axios;
    }
})


// 取消圆圈
NProgress.configure({
    showSpinner: false
});

axios.interceptors.request.use(function (config) {
    Toast.loading({
        message: "加载中",
        forbidClick: true
    });
    NProgress.start();
    // 添加请求头token给服务器校验
    store.state.token && (config.headers['token'] = store.state.token);
    //设置请求头，告诉服务端不要缓存，获取最新数据
    config.headers['If-Modified-Since'] = 0;
    return config;

}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    Toast.clear()
    NProgress.done();
    if (response.data.status === 40001) {
        store.commit('clearUserInfo')
        Toast(response.data.message)
        router.replace({
            path: '/login',
            query: {
                redirect: router.currentRoute.fullPath
            }
        })
    }
    return response.data;
}, function (error) {
    Toast.clear();
    return Promise.reject(error);
});