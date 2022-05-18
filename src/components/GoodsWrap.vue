<template>
    <!-- 商品列表 -->
    <div class="goodsWrap">
        <a href="javascript:;" class="goodsItem" v-for="item in goodsData" :key="item.id">
            <div class="goodsImgWrap">
                <img class="goodsImg" v-lazy="item.img_url" alt="">
            </div>
            <div class="goodsPadding">
                <p class="goodsText">{{ item.zhaiyao }}</p>
                <div class="goodsPrice">
                    <span style="font-size:14px">￥</span>
                    <span>{{ item.sell_price }}</span>
                    <span style="font-size:14px">.00</span>
                </div>
                <div class="goodsComments">
                    {{ item.buy }}条评论
                </div>
            </div>
        </a>
    </div>
</template>

<script>
export default {
    data() {
        return {
            goodsData: [],
            page: 1,
            limit: 10
        }
    },
    created() {
        this.getGoodsData();
    },
    methods: {
        async getGoodsData() {
            let { data } = await this.$axios.get(`http://api.w0824.com/api/recommend?page=${this.page}&limit=${this.limit}`)
            this.goodsData = data.message
        },
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/common.scss';
.goodsWrap {
    padding: 0 5px;
    @include flex_sa_c;
    flex-wrap: wrap;

    .goodsItem {
        width: 180px;
        height: 290px;
        font-size: 14px;
        color: #333;
        background-color: #fff;
        border-radius: 10px;
        overflow: hidden;
        margin: 5px 0;

        .goodsImgWrap {
            height: 180px;

            .goodsImg {
                width: 100%;
                height: 100%;
            }
        }

        .goodsPadding {
            padding: 0 10px;

            .goodsText {
                @include ellipsis-line-2;
                margin: 5px 0 10px;
                line-height: 1.5;
            }

            .goodsPrice {
                color: red;
                font-size: 20px;
            }

            .goodsComments {
                margin-top: 5px;
                color: #999;
                font-size: 12px;
            }
        }


    }
}
</style>