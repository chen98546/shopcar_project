import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
const store = new Vuex.Store({
    strict: true,
    state: {
        cartData: []
    },
    mutations: {
        // 商品数量
        skuAddCartNum(state, goods) {
            let index = state.cartData.findIndex(item => item.id === goods.id)
            index === -1 && state.cartData.unshift(goods) || (state.cartData[index].count += goods.count)
        },
        // 设置单选
        setRadioFn(state, {
            checked,
            index
        }) {
            state.cartData[index].checked = checked
        },
        // 全选
        isCheckedAll(state, res) {
            state.cartData.forEach(item => item.checked = !res.data)
        },
        // 数量
        stepCount(state, res) {
            res.data.count = res.val
        },
        //删除
        delGoodsData(state, id) {
            let index = state.cartData.findIndex(item => item.id === id);
            state.cartData.splice(index, 1);
        }

    },
    getters: {
        // 单选
        checkedFn(state) {
            let checkedObj = {}
            state.cartData.forEach(item => checkedObj[item.id] = item.checked)
            return checkedObj;
        },
        // 全选
        checkedAllFn(state) {
            return state.cartData.every(item => item.checked)
        },
        // 总数
        totalFn(state) {
            return state.cartData.filter(item => item.checked).map(item => item.count).reduce((total, num) => total + num, 0)
        },
        // 总价
        totalPriceFn(state) {
            let totalPrice = 0;
            state.cartData.filter(item => item.checked == true).map(itemPrice => totalPrice += (itemPrice.sell_price * itemPrice.count));
            return totalPrice * 100;
        },
    },
    // 缓存
    plugins: [createPersistedState()]
})

export default store;