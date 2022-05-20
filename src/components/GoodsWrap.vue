<template>
    <!-- 商品列表 -->
    <a href="javascript:;" class="goodsItem" @click="goodsHandle(data)">
        <slot name="goodsImg">
            <div class="goodsImgWrap">
                <img class="goodsImg" v-lazy="data.img_url" alt="">
            </div>
        </slot>
        <div class="goodsPadding">
            <slot name="goodsText">
                <p class="goodsText">{{ data.zhaiyao }}</p>
            </slot>
            <slot name="goodsPrice">
                <div class="goodsPrice">
                    ￥<span class="sellPrice">{{ data.sell_price }}</span>{{ getFloatFn(data.sell_price) }}
                </div>
            </slot>
            <slot name="goodsComments">
                <div class=" goodsComments">
                    {{ data.buy > 999 ? '999+' : data.buy }}条评论
                </div>
            </slot>
        </div>
    </a>
</template>

<script>

export default {
    props: ['data'],
    methods: {
        getFloatFn(price) {
            let newFloatStr = '';
            price = price.toString();
            let floatStr = price.substring(price.lastIndexOf('.'));
            // 价格后面是否有小数点 有则保留 无则添加
            !floatStr.indexOf('.') && (newFloatStr = floatStr) || (newFloatStr = '.00')
            // 小数点后只有一位则在后面拼接0
            newFloatStr.length == 2 && (newFloatStr += '0')
            return newFloatStr
        },
        goodsHandle(data) {
            this.$emit('goodsClick',data);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/common.scss';

.goodsItem {
    width: 180px;
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
            margin: 8px 0;
            line-height: 1.5;
        }

        .goodsPrice {
            color: red;
            font-size: 14px;

            .sellPrice {
                font-size: 20px;
            }
        }

        .goodsComments {
            margin: 5px 0 10px;
            color: #999;
            font-size: 12px;
        }
    }


}
</style>