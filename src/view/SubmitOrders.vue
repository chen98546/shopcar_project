<template>
    <div>
        <Area />
        <div class="checkboxGroup" v-for="item in $store.state.submitGoodsData" :key="item.id">
            <van-card :num="item.count" :desc="item.zhaiyao" :title="item.title" :thumb="item.picture"
                :origin-price="item.market_price">
                <span slot="price" style=" color: red;">&yen;<b style="font-size:16px;">{{ item.sell_price }}</b></span>

                <div slot="price-top" class="orderNum">订单号：{{ item.orderNum }}</div>
            </van-card>
        </div>
        <van-submit-bar :price="$store.getters.onSubmitOrdersPrice" button-text="去付款" @submit="payment">
            <span style="margin-left:10px">总数：{{ $store.getters.onSubmitOrdersTotal }}件</span>
        </van-submit-bar>
    </div>
</template>

<script>
import Area from '../components/Area'
import { fetchCommitorderData } from '../fetch/fetch.js'
import { randomOrderNum } from '../utils/randomOrderNum'
export default {
    components: { Area },
    methods: {
        // 提交订单
        async payment() {
            let commitorderData = {
                user_id: this.$store.state.userInfo.id,
                // order_id: this.$store.state.submitGoodsData.filter(item => item.id).map(item => item.orderNum).join(','),
                order_id: randomOrderNum(),
                address_id: this.$store.state.address.id,
                total_price: this.$store.getters.onSubmitOrdersPrice / 100,
                number: this.$store.getters.onSubmitOrdersTotal,
                goods_ids: this.$store.state.submitGoodsData.map(item => item.id).join(',')
            }
            console.log(commitorderData);
            let { status, message } = await fetchCommitorderData(commitorderData);
            this.$toast(message);
            status == 0 && this.$router.push('/orderList');
        }
    },
}
</script>

<style lang="scss" scoped>
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
</style>