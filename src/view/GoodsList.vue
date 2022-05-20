<template>
    <div>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
            <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
                <div class="goodsWrap">
                    <GoodsWrap v-for="item in goodsData" :key="item.id" :data="item" />
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
        async _fetchGoodsList() {
            if (this.refreshing) {
                this.goodsData = [];
                this.refreshing = false;
            }

            let { message } = await fetchGoodsList(this.page, this.pagesize);
            this.loading = false;
            this.goodsData = [...this.goodsData, ...message];

            if (message.length == 0) {
                this.finished = true;
            }
        },
        onLoad() {
            this.page++;
            this._fetchGoodsList();
        },
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