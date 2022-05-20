<template>
    <div class="goodsDetailWrap">
        <div class="goodsDetailImg">
            <van-swipe>
                <van-swipe-item v-for="(item, index) in detailDataImg" :key="item.src">
                    <img :src="item.src" alt="" @click="previewImage(index)" />
                </van-swipe-item>
            </van-swipe>
            <!-- <van-image-preview v-model="isShow" :images="images" /> -->
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
import { ImagePreview } from 'vant';
export default {
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
    },
    methods: {
        // previewImgFn() {
        //     this.isShow = true;
        //     // this.index = index;
        // },
        async _getGoodsDetail() {
            let { message } = await getGoodsDetail(this.$route.params.id);
            this.detailData = message;
        },
        async _getGoodsDetailImg() {
            let { message } = await getGoodsDetailImg(this.$route.params.id);
            this.detailDataImg = message;
            message.map(item => this.images.push(item.src))
        },
        previewImage(index) {
            ImagePreview({
                images: this.images,
                startPosition: index,
            });
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
