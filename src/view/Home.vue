<template>
    <div>
        <form action="/">
            <van-search v-model="value" show-action placeholder="请输入搜索关键词" />
        </form>
        <router-link to="/test">Test</router-link>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            value: ''
        }
    }
}
</script>

<style>
</style>