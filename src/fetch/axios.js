import Vue from 'vue'
import axios from 'axios';
import {
    Toast
} from 'vant'

Vue.use({
    install(Vue) {
        Vue.prototype.$axios = axios;
    }
})


axios.interceptors.request.use(function (config) {
    Toast.loading({
        message: "加载中",
        forbidClick: true
    });
    NProgress.start();
    return config;
}, function (error) {
    return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
    Toast.clear()
    NProgress.done();
    return response.data;
}, function (error) {
    Toast.clear();
    return Promise.reject(error);
});