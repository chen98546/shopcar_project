<template>
    <div class="home">
        <!-- 搜索 -->
        <van-search show-action placeholder="请输入搜索关键词">
            <div class="logo" slot="left">
                <img src="../assets/images/logo.gif" alt="">
            </div>
        </van-search>
        <!-- 轮播图 -->
        <div class="swipeWrap">
            <van-swipe :autoplay="3000">
                <van-swipe-item v-for="item  in swipeData" :key="item.img">
                    <img :src="item.img" />
                </van-swipe-item>
            </van-swipe>
        </div>
        <!-- 九宫格 -->
        <van-grid :column-num="5">
            <van-grid-item v-for="item in girdIcon" :key="item.url" to="www.baidu.com">
                <div class="gridWrap">
                    <img class="gridImg" :src="item.url" alt="">
                    <p class="gridText">
                        {{ item.text }}
                    </p>
                </div>
            </van-grid-item>
        </van-grid>
        <!-- 分割线 -->
        <van-divider :style="{ color: '#333', borderColor: '#333', padding: '0 16px' }">商品列表</van-divider>
        <!-- 商品列表 -->
        <GoodsWrap />
    </div>
</template>

<script>
import GoodsWrap from '../components/GoodsWrap';
import { girdIcon } from '../virtualData/virtualData';
export default {
    components: {
        GoodsWrap
    },
    data() {
        return {
            girdIcon,
            swipeData: [],
        }
    },
    created() {
        this.getSwipeData();
    },
    methods: {
        async getSwipeData() {
            let { data } = await this.$axios.get('http://api.w0824.com/api/getlunbo')
            this.swipeData = data.message
        },
    },
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/common.scss';

.home {
    background-color: #f6f6f6;
}

.van-search {
    .van-search__content {
        border-radius: 20px;
    }

    .logo {
        width: 30px;
        margin-right: 10px;

        img {
            width: 100%;
        }
    }
}

.swipeWrap {
    padding: 10px 20px;

    .van-swipe {
        height: 200px;
        border-radius: 10px;
        overflow: hidden;

        .van-swipe-item {
            img {
                width: 100%;
                height: 100%;
            }
        }
    }
}

.gridWrap {
    font-size: 12px;
    text-align: center;
    color: #666;

    .gridImg {
        width: 50%;
    }

    .gridText {
        margin: 5px 0 0;
    }
}
</style>