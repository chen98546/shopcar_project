<template>
    <div class="shopCart">
        <Area v-show="$store.state.cartData.length !== 0" />

        <transition-group name="cell">
            <div class="checkboxGroup" v-for="(item, index) in $store.state.cartData" :key="item.id">
                <van-swipe-cell>
                    <van-checkbox name="item.id" v-model="$store.getters.checkedFn[item.id]"
                        @click="setRadioFn($store.getters.checkedFn[item.id], index)" />
                    <van-card tag="标签" :desc="item.zhaiyao" :title="item.title" :thumb="item.picture"
                        :origin-price="item.market_price">
                        <span slot="price" style=" color: red;">
                            ￥<b style="font-size:16px;">{{ item.sell_price }}</b>
                        </span>
                        <div slot="num">
                            <van-stepper :value="item.count" @change="(val) => stepCount(val, item)" theme="round"
                                button-size="22" disable-input />
                        </div>
                    </van-card>
                    <van-button slot="right" square text="删除" type="danger" class="delete-button"
                        @click="delGoodsData(item.id)" />
                </van-swipe-cell>
            </div>
        </transition-group>
        <van-submit-bar :price="$store.getters.totalPriceFn" button-text="提交订单" :disabled="$store.state.cartBtnState"
            v-show="$store.state.cartData.length !== 0" @submit="onSubmitOrders">
            <van-checkbox :value="$store.getters.checkedAllFn" @click="isCheckedAll($store.getters.checkedAllFn)">
                全选
            </van-checkbox>
            <span style="margin-left:10px">总数：{{ $store.getters.totalFn }}</span>
            <!-- <div slot="tip">你的收货地址不支持同城送, <span>修改地址</span></div> -->
        </van-submit-bar>

        <van-empty class="custom-image" :image="emptyCartImg" description="购物车空空如也"
            v-show="$store.state.cartData.length == 0">
            <van-button @click="$router.replace('/home/index')" type="danger" class="bottom-button">去首页逛逛</van-button>
        </van-empty>
    </div>
</template>

<script>
import emptyCartImg from '../assets/images/car.png'
import Area from '../components/Area'
// import { randomOrderNum } from '../utils/randomOrderNum'
export default {
    components: { Area },
    data() {
        return {
            emptyCartImg,
            checkbox: [],
            checkedGoodsData: []
        }
    },
    created() {

    },
    methods: {
        // 单选
        setRadioFn(checked, index) {
            this.$store.commit('setRadioFn', { checked, index })
        },
        // 全选
        isCheckedAll(data) {
            this.$store.commit('isCheckedAll', { data })
        },
        // 数量
        stepCount(val, data) {
            this.$store.commit('stepCount', { val, data })
        },
        // 删除
        delGoodsData(id) {
            this.$store.commit('delGoodsData', id);
        },
        // 购物车提交订单
        onSubmitOrders() {
            let goodsData = this.$store.state.cartData.filter(item => item.checked)
            // goodsData.forEach(item => item.orderNum = randomOrderNum())
            let id = goodsData.map(item => item.id);

            this.$store.commit('onSubmitOrders', { goodsData, id });
            this.$router.push('/submitOrders');

        }
    },
}
</script>

<style lang="scss" scoped>
.shopCart {
    margin-bottom: 90px;
    // padding: 15px 0;
    padding-bottom: 15px;
    background-color: #f2f2f2;

    .cell-leave-to {
        transform: translateX(-100vw);
    }

    .checkboxGroup {
        display: flex;
        overflow: hidden;
        padding-left: 10px;
        margin-bottom: 15px;
        background-color: #fff;
        border-radius: 10px;
        transition: all 0.5s linear;


        ::v-deep.van-swipe-cell__wrapper {
            display: flex;

            .van-checkbox {
                overflow: visible;
            }

            .van-card {
                background-color: #fff;
                width: 100%;

                .van-card__content {
                    padding: 0 10px;

                    .van-card__title {
                        font-weight: 700;
                        margin-bottom: 5px;
                    }
                }
            }

            .delete-button {
                height: 100%;
            }
        }
    }

    .van-submit-bar {
        margin-bottom: 50px;
    }

    .van-empty {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        ::v-deep.van-empty__description {
            padding: 0;
        }
    }
}
</style>