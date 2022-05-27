import axios from 'axios';
axios.defaults.baseURL = 'http://api.w0824.com/api';

// 轮播图
export async function getSwipeData() {
    await axios.get('/getlunbo')
}

// 首页商品列表
export function getGoodsData(page = 1, limit = 10) {
    return axios.get(`/recommend?pageindex=${page}&limit=${limit}`)
}

// 京东超市商品列表
export function fetchGoodsList(page = 1, pagesize = 10) {
    return axios.get(`/getgoods?pageindex=${page}&pagesize=${pagesize}`)
}

// 商品详情
export function getGoodsDetail(id) {
    return axios.get(`/getgoodsinfo/${id}`)
}

// 商品详情图片
export function getGoodsDetailImg(id) {
    return axios.get(`/getthumbimages/${id}`)
}

// 登录
export function fetchLoginData(username, password) {
    return axios.post('/login', {
        username,
        password
    })
}
export function fetchRegisterData(username, password) {
    return axios.post('/register', {
        username,
        password
    })
}

// 获取地址信息
export function fetchGetAddressData(user_id) {
    return axios.get(`/getaddress/${user_id}`)
}

// 添加地址
export function fetchAddAddressData(user_id, formData) {
    return axios.post(`/addaddress/${user_id}`, formData)
}

// 编辑地址
export function fetchEditAddressData(address_id, addressInfo) {
    return axios.post(`/updateaddress/${address_id}`, addressInfo)
}

// 删除地址
export function fetchDelAddressData(address_id, addressInfo) {
    return axios.post(`/deladdress/${address_id}`, addressInfo)
}

// 头像上传
export function upload(formData) {
    return axios.post('/upload', formData)
}

// 提交订单
export function fetchCommitorderData(orderData) {
    return axios.post('/commitorder', orderData);
}

// 用户订单数据
export function fetchUserOrdersData(user_id) {
    return axios.post(`/userorder/${user_id}`);
}

// 获取购物车商品列表
export function fetchCartGoods(ids) {
    return axios.get(`/getshopcarlist/${ids}`);
}

// 订单号获取对应数据
export function fetchOrderIdData(orderId) {
    return axios.post(`/getorder/${orderId}`);
}

// 模拟成功支付
export function fetchPayorderData(orderId) {
    return axios.post(`/payorder/${orderId}`);
}

// 物流信息
export function fetchLogisticsData() {
    return axios.get('/kuaidi100');
}