<template>
    <div class="goodsDetailWrap">
        <div class="goodsDetailImg" @click="previewImgFn">
            <van-swipe>
                <van-swipe-item v-for="item in images" :key="item">
                    <img :src="item" alt="" />
                </van-swipe-item>
            </van-swipe>

            <van-image-preview v-model="isShow" :images="images" />
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
    </div>
</template>

<script>
import { getGoodsDetail, getGoodsDetailImg } from "../fetch/fetch.js";
export default {
    props: ['data'],
    data() {
        return {
            isShow: false,
            detailData: [],
            detailDataImg: [],
            images: [],
        };
    },
    created() {
        this._getGoodsDetail();
        this._getGoodsDetailImg();
        console.log(this.data);
    },
    methods: {
        previewImgFn() {
            this.isShow = true;
            // this.index = index;
        },
        async _getGoodsDetail() {
            let { message } = await getGoodsDetail(this.$route.params.id);
            console.log(message);
            this.detailData = message;
        },
        async _getGoodsDetailImg() {
            let { message } = await getGoodsDetailImg(this.$route.params.id);
            this.images.push(message[0].src, 'https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/49950/9/18324/143277/62846c23E62c9ae6a/e936e98f3b1988e6.jpg!q80.dpg');
            this.detailDataImg = message[0];
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
