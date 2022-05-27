import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
const store = new Vuex.Store({
    strict: true,
    state: {
        cartBtnState: false, // 购物车按钮状态
        token: '', 
        address: '',
        userInfo: '',
        addressCode: '',
        cartData: [],
        submitGoodsData: []
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
            state.cartData[index].checked = checked;
            state.cartData.every(item => item.checked ? state.cartBtnState = false : state.cartBtnState = true);
        },
        // 全选
        isCheckedAll(state, res) {
            state.cartData.forEach(item => item.checked = !res.data);
            state.cartData.every(item => item.checked ? state.cartBtnState = false : state.cartBtnState = true);
        },
        // 数量
        stepCount(state, res) {
            res.data.count = res.val
        },
        //删除
        delGoodsData(state, id) {
            let index = state.cartData.findIndex(item => item.id === id);
            state.cartData.splice(index, 1);
            state.cartBtnState = false;
        },
        // 设置token和用户信息
        tokenAndUserInfo(state, res) {
            state.token = res.token
            state.userInfo = res.userInfo
        },
        // 清除token和用户信息
        clearUserInfo(state) {
            state.token = '';
            state.cartData = [];
            state.userInfo = '';
        },
        // 更换头像
        replaceAvatar(state, src) {
            state.userInfo.avatar = src
        },
        // 购物车提交订单
        onSubmitOrders(state, {
            goodsData,
            id
        }) {
            state.submitGoodsData = goodsData;
            for (let i = 0; i < id.length; i++) {
                let index = state.cartData.findIndex(item => item.id === id[i]);
                state.cartData.splice(index, 1);
            }
        },
        // 编辑地址
        editAddressFn(state, item) {
            item.isDefault = item.isDefault === 1 ? true : false
            state.address = item;
            state.addressCode = item.areaCode;
            state.address.areaCode = item.areaCode.split('-')[2];
        },
        // 默认地址
        defaultBtn(state, value) {
            state.address.isDefault = value
        },
        // 切换地址
        selectAddress(state, item) {
            state.chosenAddressId = item.id;
            state.address = item;
        },
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
        // 选中商品总数
        totalFn(state) {
            return state.cartData.filter(item => item.checked).map(item => item.count).reduce((total, num) => total + num, 0)
        },
        // 购物车商品总数
        cartTotalFn(state) {
            return state.cartData.map(item => item.count).reduce((total, num) => total + num, 0)
        },
        // 总价
        totalPriceFn(state) {
            let totalPrice = 0;
            state.cartData.filter(item => item.checked == true).map(itemPrice => totalPrice += (itemPrice.sell_price * itemPrice.count));
            return totalPrice * 100;
        },
        // 提交商品总价
        onSubmitOrdersPrice(state) {
            let totalPrice = 0;
            state.submitGoodsData.map(item => totalPrice += (item.sell_price * item.count));
            return totalPrice * 100;
        },
        // 提交商品总数
        onSubmitOrdersTotal(state) {
            return state.submitGoodsData.map(item => item.count).reduce((total, num) => total + num, 0)
        },
    },
    // 缓存
    plugins: [createPersistedState()]
})

export default store;