<template>
    <div>
        <van-tabs @click="tabsClick">
            <van-tab v-for="item in orderTabList" :key="item.status" :title="item.title">
                <div class="checkboxGroup" v-for="order in findStatusOrderComputed" :key="order.order_id"
                    @click="$router.push(`/orderDetail/${order.order_id}`)">
                    <van-card :num="order.number" :desc="order.pay_way" :title="order.goodsInfo.message[0].title"
                        :thumb="order.goodsInfo.message[0].thumb_path" :origin-price="order.market_price">
                        <span slot="price" style="color: red;">&yen;<b>{{ order.total_price }}</b></span>
                        <div slot="bottom" class="orderNum">
                            <van-button size="mini" type="danger" v-clipboard:copy="order.order_id"
                                v-clipboard:success="copyOrderNum">复制订单号
                            </van-button>
                        </div>
                    </van-card>
                </div>
            </van-tab>
        </van-tabs>
    </div>
</template>

<script>
import { fetchUserOrdersData, fetchCartGoods } from '../fetch/fetch.js';
export default {
    data() {
        return {
            orderTabList: [
                { status: 'all', title: '全部订单' },
                { status: '0', title: '未付款' },
                { status: '1', title: '待收货' },
                { status: '2', title: '已完成' }
            ],
            allOrderGoods: [],
            status: "all"
        }
    },
    created() {
        this._fetchUserOrdersData();
    },
    methods: {
        // 复制订单号
        copyOrderNum() {
            event.stopPropagation();
            this.$toast('复制成功')
        },
        // 请求订单数据
        async _fetchUserOrdersData() {
            let user_id = this.$store.state.userInfo.id;
            let orderGoodsRes = await fetchUserOrdersData(user_id);
            let allOrder = [];
            orderGoodsRes.forEach(item => allOrder.push(fetchCartGoods(item.goods_ids)))
            let promiseAll = await Promise.all(allOrder);
            this.allOrderGoods = orderGoodsRes.map((item, index) => {
                item.goodsInfo = promiseAll[index]
                return item
            })

        },
        // 切换状态
        tabsClick(index, text) {
            let statusMap = {
                '全部订单': "all",
                '未付款': "0",
                '待收货': "1",
                '已完成': "2",
            }
            this.status = statusMap[text];
        },
        // ordersDetailData() {
        //     console.log(123);
        // }
    },
    computed: {
        // 切换状态响应数据
        findStatusOrderComputed() {
            if (this.status == 'all') {
                return this.allOrderGoods;
            }
            return this.allOrderGoods.filter(item => item.status == this.status);
        }
    }
}
</script>

<style lang="scss" scoped>
.checkboxGroup {
    display: flex;
    overflow: hidden;
    padding-left: 10px;
    margin: 15px 0;
    background-color: #fff;
    border-radius: 10px;
    transition: all 0.5s linear;

    .van-card {
        padding: 15px 10px 10px;
        background-color: #fff;
        width: 100%;

        .van-card__content {
            padding: 0 10px;

            .van-card__title {
                font-weight: 700;
                margin-bottom: 5px;
            }

            .van-card__price,
            .van-card__num {
                margin-top: 5px;

                b {
                    font-size: 20px;
                }
            }

            .orderNum {
                display: flex;
                justify-content: flex-end;
                margin: 5px 0;
                color: #999;
            }
        }
    }
}
</style>