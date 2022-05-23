<template>
    <div class="goodsDetailWrap">
        <div class="goodsDetailImg">
            <van-swipe>
                <van-swipe-item v-for="(item, index) in detailDataImg" :key="item.src">
                    <img :src="item.src" alt="" @click="previewImage(index)" />
                </van-swipe-item>
            </van-swipe>
            <!-- <van-image-preview v-model="isShowSku" :images="images" /> -->
        </div>
        <div class="goodsDetailCountdown">
            <div class="goodsDetailPrice">
                ￥<span class="price">{{ detailData.sell_price }}</span>
            </div>
            <span class="order">库存量：{{ detailData.stock_quantity }}</span>
            <div class="countdown">
                <div>距离抢购结束还剩</div>
                <span>00:00:00</span>
            </div>
        </div>
        <div class="goodsContent">
            <div class="content" v-html="detailData.content"></div>
        </div>

        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" />
            <van-goods-action-icon icon="shop-o" text="店铺" />
            <van-goods-action-icon :icon="!collect ? 'star-o' : 'star'" :color="!collect ? '' : '#ff5000'"
                :text="!collect ? '未收藏' : '已收藏'" @click="collect = !collect" />
            <van-goods-action-button type="warning" text="加入购物车" @click="addCartBtn" />
            <van-goods-action-button type="danger" text="立即购买" @click="buyNowBtn" />
        </van-goods-action>
        <van-sku v-model="isShowSku" :sku="sku" :goods="goods" :goods-id="detailData.id" :hide-stock="sku.hide_stock"
            :reset-stepper-on-hide="true" :show-add-cart-btn="isShowCartBtn" @buy-clicked="skuBuyNowBtn"
            @add-cart="skuAddCartBtn">
            <div slot="sku-messages" class="card">
                <van-divider>商品信息</van-divider>
                <div>商品货号：{{ detailData.goods_no }}</div>
                <div>库存：{{ detailData.stock_quantity }}件</div>
                <div>上架时间：{{ detailData.add_time | formatDate('YYYY-MM-DD') }}</div>
            </div>
        </van-sku>

    </div>
</template>

<script>
import { getGoodsDetail, getGoodsDetailImg } from "../fetch/fetch.js";
import { ImagePreview } from 'vant';
export default {
    data() {
        return {
            collect: false,
            isShowSku: false,
            isShowCartBtn: true,
            images: [],
            detailData: [],
            detailDataImg: [],
            goods: { picture: "" },
            sku: { tree: [], price: '99999.00', stock_num: 0 }
        };
    },
    created() {
        this._getGoodsDetail();
        this._getGoodsDetailImg();
    },
    methods: {
        // 请求详情页数据
        async _getGoodsDetail() {
            let { message } = await getGoodsDetail(this.$route.params.id);
            this.detailData = message;
            this.sku.price = message.sell_price;
            this.sku.stock_num = message.stock_quantity;
        },
        // 请求详情页图片数据
        async _getGoodsDetailImg() {
            let { message } = await getGoodsDetailImg(this.$route.params.id);
            this.detailDataImg = message;
            message.map(item => this.images.push(item.src));
            this.goods.picture = message[0].src;
        },
        // 预览图片
        previewImage(index) {
            ImagePreview({ images: this.images, startPosition: index });
        },
        // 添加购物车按钮
        addCartBtn() {
            this.isShowSku = this.isShowCartBtn = true;
        },
        // 立即购买按钮
        buyNowBtn() {
            this.isShowSku = true;
            this.isShowCartBtn = false;
        },
        // sku立即购买
        skuBuyNowBtn() {
            this.isShowSku = false;
        },
        // sku添加购物车
        skuAddCartBtn(skyData) {
            let { sell_price, id, title, zhaiyao } = this.detailData;
            let skuObj = { id, sell_price, title, zhaiyao, count: skyData.selectedNum, picture: this.goods.picture, checked: true };
            this.$store.commit('skuAddCartNum', skuObj);
            this.isShowSku = false;
        },
    },
};
</script>
<style lang="scss" scoped>
.goodsDetailWrap {
    font-size: 16px;

    .goodsDetailImg {
        .van-swipe-item {
            height: 393px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .goodsDetailCountdown {
        @include flex_sa_c;
        font-size: 14px;
        color: #fff;
        height: 52px;
        background-color: red;

        .goodsDetailPrice {
            font-weight: 700;

            .price {
                font-size: 26px;
            }
        }

        .order {
            @include flex_c_c;
            display: inline-block;
            position: relative;
            left: -24px;
            padding: 5px 10px;
            border-radius: 8px;
            background-color: #00000030;
        }

        .countdown {
            font-size: 12px;
            text-align: center;
            line-height: 1.5;
        }
    }

    .content {
        padding: 10px;

        td {
            height: 100%;
        }

        ::v-deep img {
            width: 100%;
            height: 100%;
        }

        ::v-deep table {
            width: 100%;
            height: 100%;
        }

        ::v-deep p {
            margin: 0;
        }
    }

}
</style>
