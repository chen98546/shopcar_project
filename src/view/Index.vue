<template>
    <div>
        <footer>
            <van-tabbar v-model="active">
                <van-tabbar-item icon="home-o" to="/home/index">首页</van-tabbar-item>
                <van-tabbar-item icon="apps-o" to="/home/category" dot>分类</van-tabbar-item>
                <van-tabbar-item icon="shopping-cart-o" to="/home/shopcar" badge="20">购物车</van-tabbar-item>
                <van-tabbar-item icon="friends-o" to="/home/personal" badge="5">我的</van-tabbar-item>
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
                    'Home': 0,
                    'Category': 1,
                    'Shopcar': 2,
                    'Personal': 3,
                }
                this.active = titleMap[newRoute.meta.title];
            },
            immediate: true
        }
    }
}
</script>

<style>
footer {
    margin-bottom: 50px;
}
</style>