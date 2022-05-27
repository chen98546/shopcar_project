<template>
    <div>
        <div class="status">
            <div class="text">{{ trading }}</div>
            <img :src="car2Png" alt width="80px">
        </div>

        <div class="addressWrap">
            <div class="address">
                <div class="location flex_c_c">
                    <van-icon name="location-o" />
                </div>

                <div class="info" v-if="orderData.address_info">
                    <div>{{ orderData.address_info.name }} {{ orderData.address_info.tel }}</div>
                    <div>
                        {{ orderData.address_info.province }}{{ orderData.address_info.city }}{{
                                orderData.address_info.country
                        }}{{ orderData.address_info.addressDetail }}
                    </div>
                </div>
                <van-divider />
            </div>
        </div>

        <div class="checkboxGroup" v-for="(item, index) in orderDetail.message" :key="item.id">
            <van-swipe-cell>
                <van-card tag="标签" :desc="item.zhaiyao" :title="item.title" :thumb="item.thumb_path"
                    :origin-price="item.market_price">
                    <span slot="price" style=" color: red;">
                        ￥<b style="font-size:16px;">{{ item.sell_price }}</b>
                    </span>
                </van-card>
            </van-swipe-cell>
        </div>

        <div class="orderInfo">
            <div class="item">
                <span>下单时间</span>
                <span>{{ orderData.add_time }}</span>
            </div>
            <div class="item">
                <span>商品总价</span>
                <span>&yen; {{ orderData.total_price }}</span>
            </div>
            <div class="item">
                <span>商品总数</span>
                <span>{{ orderData.number }}</span>
            </div>
            <div class="item">
                <span>实付款</span>
                <span>&yen; {{ orderData.actual_price }}</span>
                <!-- <span>&yen; {{ orderData.total_price }}</span> -->
            </div>
            <div class="item">
                <span>付款方式</span>
                <span>{{ orderData.pay_way }}</span>
            </div>
            <div class="item">
                <span>运费险</span>
                <span>&yen; 0.00</span>
            </div>
            <div class="item">
                <span>订单号</span>
                <span>{{ orderData.order_id }}</span>
            </div>
        </div>

        <div class="btns">
            <van-button size="mini" type="danger" v-clipboard:copy="orderData.order_id"
                v-clipboard:success="copyOrderNum">复制订单号
            </van-button>
            <van-button v-if="orderData.status != 0" size="mini" type="primary" @click="_fetchLogisticsData">物流信息
            </van-button>
            <van-button v-if="orderData.status == 0" size="mini" type="danger" @click="_fetchPayorderData">立即付款
            </van-button>
            <van-button v-if="orderData.status == 1 && orderData.is_out == 0" size="mini" type="danger">提醒发货
            </van-button>
            <template v-if="orderData.is_take == 1 && orderData.is_out == 1 && orderData.status == 2">
                <van-button size="mini" type="info">已完成</van-button>
                <van-button size="mini" type="warning">去评价</van-button>
            </template>
        </div>

        <van-popup v-model="isShowPopup" closeable position="bottom" :style="{ height: '80%' }">
            <div class="addressWrap">
                <div class="address">
                    <div class="location flex_c_c">
                        <van-icon name="location-o" />
                    </div>

                    <div class="info" v-if="orderData.address_info">
                        <div>{{ orderData.address_info.name }} {{ orderData.address_info.tel }}</div>
                        <div>
                            {{ orderData.address_info.province }}{{ orderData.address_info.city }}{{
                                    orderData.address_info.country
                            }}{{ orderData.address_info.addressDetail }}
                        </div>
                    </div>
                    <van-divider />
                </div>
            </div>
            <van-steps direction="vertical" :active="0">
                <van-step v-for="item in logisticsData">
                    <h3>{{ item.location }}</h3>
                    <p>{{ item.time }}</p>
                </van-step>

            </van-steps>
        </van-popup>

    </div>

</template>

<script>
import { fetchOrderIdData, fetchCartGoods, fetchPayorderData, fetchLogisticsData } from '../fetch/fetch.js';
import car2Png from "../assets/images/car2.png";

export default {
    data() {
        return {
            car2Png,
            orderDetail: [],
            orderData: {},
            isShowPopup: false,
            logisticsData: []
        }
    },
    created() {
        this._fetchOrderIdData();

    },
    methods: {
        // 复制订单号
        copyOrderNum() {
            event.stopPropagation();
            this.$toast('复制成功')
        },
        // 商品详情
        async _fetchOrderIdData() {
            this.orderData = await fetchOrderIdData(this.$route.params.id)
            this.orderDetail = await fetchCartGoods(this.orderData.goods_ids)
        },
        // 模拟支付
        _fetchPayorderData() {
            this.$dialog.confirm({ title: '付款', message: '确认支付' }).then(async () => {
                try {
                    let { status, message } = await fetchPayorderData(this.$route.params.id);
                    this.$toast(message);
                    if (status == 0) {
                        this.orderData.is_take = 1;
                        this.orderData.is_out = 1;
                        this.orderData.status = 2;
                    }
                } catch (err) {
                    this.$toast('支付异常')
                }

            }).catch(() => {
                this.$toast('取消支付');
            });
        },
        // 模拟物流信息
        async _fetchLogisticsData() {
            this.logisticsData = await fetchLogisticsData();
            this.isShowPopup = true;

        }

    },
    computed: {
        trading() {
            let { status, is_take, is_out } = this.orderData
            if (status == 0) { return '待支付' }
            if (is_take == 0 && is_out == 0 && status == 2) { return '您的包裹正在打包中' }
            if (is_take == 0 && is_out == 1 && status == 2) { return '您的包裹正在路上' }
            if (is_take == 1 && is_out == 1 && status == 2) { return '交易完成' }
        }
    }

}
</script>

<style lang="scss" scoped>
.status {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 120px;
    background-color: #fe5102;
    color: #f4d9be;
    font-size: 16px;
}

.addressWrap {
    .address {
        display: flex;
        align-items: center;
        padding: 10px 10px;
        background-color: #fff;
        border-radius: 6px;
        margin: 10px 0;
        font-size: 16px;
        line-height: 1.5;

        .location {
            @include flex_c_c;
            width: 30px;
            height: 30px;
            background: #f34a09;
            border-radius: 50%;
            padding-left: 20px;
            margin-right: 20px;
        }

        .van-icon {
            margin-right: 20px;
            color: #fff;
            font-size: 20px;
        }
    }
}

.checkboxGroup {
    display: flex;
    overflow: hidden;
    padding-left: 10px;
    margin-bottom: 15px;
    background-color: #fff;
    border-radius: 10px;
    transition: all 0.5s linear;

    .van-card {
        background-color: #fff;
        width: 100%;

        .van-card__content {
            padding: 0 10px;

            .van-card__title {
                font-weight: 700;
                margin-bottom: 5px;
            }

            .orderNum {
                margin: 5px 0;
                color: #999;
            }
        }
    }

}

.orderInfo {
    padding: 10px 15px;
    background-color: #fff;
    border-radius: 10px;

    .item {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
        color: #787373;
        margin: 5px 0;

        .copy {
            color: orangered;
        }
    }
}


.btns {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 60px;
    padding: 0 10px;
    box-shadow: 0 0 10px #ccc;
}

.van-popup {
    padding: 40px 0 20px;

    .van-step {
        margin: 10px 0;
    }
}
</style>