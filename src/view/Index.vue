<template>
    <div>
        <footer>
            <van-tabbar v-model="active">
                <van-tabbar-item icon="home-o" to="/home/index">首页</van-tabbar-item>
                <van-tabbar-item icon="apps-o" to="/home/category" dot>分类</van-tabbar-item>
                <van-tabbar-item icon="shopping-cart-o" to="/home/shopcar" :badge="$store.getters.cartTotalFn">购物车</van-tabbar-item>
                <van-tabbar-item icon="friends-o" to="/home/personal">我的</van-tabbar-item>
            </van-tabbar>
            <router-view></router-view>
        </footer>
    </div>
</template>

<script>
export default {
    watch: {
        $route: {
            handler: function (newRoute) {
                const titleMap = {
                    '首页': 0,
                    '商品分类': 1,
                    '购物车': 2,
                    '个人中心': 3,
                }
                this.active = titleMap[newRoute.meta.title];
            },
            immediate: true
        }
    }
}
</script>

<style scoped>
</style>