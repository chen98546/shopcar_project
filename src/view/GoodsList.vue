<template>
    <div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="goodsWrap">
                    <GoodsWrap v-for="item in goodsData" :key="item.id" :data="item" @goodsClick="goodsDetailFn" />
                </div>
            </van-list>
        </van-pull-refresh>
    </div>
</template>

<script>
import GoodsWrap from '../components/GoodsWrap';
import { fetchGoodsList } from '../fetch/fetch.js'

export default {
    components: {
        GoodsWrap,
    },
    data() {
        return {
            goodsData: [],
            page: 0,
            pagesize: 6,
            loading: false, // 加载状态结束
            finished: false, // 加载完毕
            refreshing: false // 刷新中
        }
    },
    methods: {
        // 商品详情
        goodsDetailFn(data) {
            this.$router.push('/goodsDetail/' + data.id)
        },
        // 商品数据
        async _fetchGoodsList() {
            if (this.refreshing) {
                this.goodsData = [];
                // this.goodsData.map((item, index) => {
                //     let i = Math.floor(Math.random() * this.goodsData.length)
                //     this.goodsData[index] = [this.goodsData[i], this.goodsData[i] = this.goodsData[index]][0];
                // })
                this.refreshing = false;
            }

            let { message } = await fetchGoodsList(this.page, this.pagesize);
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
            this._fetchGoodsList();
        },
        // 刷新
        onRefresh() {
            this.page = 0;
            this.finished = false;
            this.loading = true;
            this.onLoad();
        },
    }
}
</script>

<style lang="scss" scoped>
.goodsWrap {
    @include flex_sa_c;
    padding: 0 5px;
    flex-wrap: wrap;
}
</style>