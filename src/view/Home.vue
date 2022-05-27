<template>
    <div class="home">
        <!-- 搜索 -->
        <van-sticky>
            <van-search show-action placeholder="请输入搜索关键词">
                <div class="logo" slot="left">
                    <img src="../assets/images/logo.gif" alt="">
                </div>
                <span slot="action" @click="$router.push('/login')">登录</span>
            </van-search>
        </van-sticky>
        <!-- 下拉刷新 -->
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
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
                <van-grid-item v-for="item in girdIcon" :key="item.url" :to="item.to + '/' + item.id">
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
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="goodsWrap">
                    <GoodsWrap v-for="(item, index) in goodsData" :key="index" :data="item"
                        @goodsClick="goodsDetailFn" />
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import GoodsWrap from '../components/GoodsWrap';
import { girdIcon } from '../virtualData/virtualData';
import { getGoodsData } from '../fetch/fetch';
export default {
    components: {
        GoodsWrap,
    },
    data() {
        return {
            girdIcon,
            swipeData: [],
            goodsData: [],
            page: 1,
            limit: 10,
            loading: false, // 加载状态结束
            finished: false, // 加载完毕
            refreshing: false // 刷新中
        }
    },
    async created() {
        this.getSwipeData();
    },
    methods: {
        // 商品轮播图
        async getSwipeData() {
            let data = await this.$axios.get('http://api.w0824.com/api/getlunbo')
            this.swipeData = data.message
        },
        // 商品详情
        goodsDetailFn(data) {
            this.$router.push('/goodsDetail/' + data.id)
        },
        // 商品数据
        async _getGoodsData() {
            if (this.refreshing) {
                this.goodsData = [];
                // this.goodsData.map((item, index) => {
                //     let i = Math.floor(Math.random() * this.goodsData.length)
                //     this.goodsData[index] = [this.goodsData[i], this.goodsData[i] = this.goodsData[index]][0];
                // })
                this.refreshing = false;
            }

            let { message } = await getGoodsData(this.page, this.limit);
            this.loading = false;
            this.goodsData = [...this.goodsData, ...message];

            if (message.length == 0) {
                this.goodsData.length % 2 === 1 && this.goodsData.pop();
                this.finished = true;
            }
        },
        // 下拉加载
        onLoad() {
            this.page++;
            this._getGoodsData();
        },
        // 刷新
        onRefresh() {
            this.page = 0;
            this.finished = false;
            this.loading = true;
            this.onLoad();
        },

    },
}
</script>

<style lang="scss" scoped>
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

.goodsWrap {
    @include flex_sa_c;
    padding: 0 5px;
    flex-wrap: wrap;
}
</style>