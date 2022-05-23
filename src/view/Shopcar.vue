<template>
    <div class="shopCart">
        <div class="checkboxGroup" v-for="(item, index) in $store.state.cartData" :key="item.id">
            <van-swipe-cell>
                <van-checkbox name="item.id" v-model="$store.getters.checkedFn[item.id]"
                    @click="setRadioFn($store.getters.checkedFn[item.id], index)" />
                <van-card tag="标签" :price="item.sell_price" :desc="item.zhaiyao" :title="item.title"
                    :thumb="item.picture" :origin-price="item.market_price">
                    <div slot="num">
                        <van-stepper :value="item.count" @change="(val) => stepCount(val, item)" theme="round"
                            button-size="22" disable-input />
                    </div>
                </van-card>
                <van-button slot="right" square text="删除" type="danger" class="delete-button"
                    @click="delGoodsData(item.id)" />
            </van-swipe-cell>
        </div>

        <van-submit-bar :price="$store.getters.totalPriceFn" button-text="提交订单">
            <van-checkbox :value="$store.getters.checkedAllFn" @click="isCheckedAll($store.getters.checkedAllFn)">全选
            </van-checkbox>
            <span style="margin-left:10px">总数：{{ $store.getters.totalFn }}</span>
            <div slot="tip">你的收货地址不支持同城送, <span>修改地址</span></div>
        </van-submit-bar>
    </div>
</template>

<script>
export default {
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
            this.$store.commit('delGoodsData', id)
        }
    },
}
</script>

<style lang="scss" scoped>
.shopCart {
    padding: 10px 0;
    height: 100vh;
    background-color: #f2f2f2;

    .checkboxGroup {
        display: flex;
        overflow: hidden;
        padding-left: 10px;
        margin-bottom: 10px;
        background-color: #fff;
        border-radius: 10px;

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
}
</style>