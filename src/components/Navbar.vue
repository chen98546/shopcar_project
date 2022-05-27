<template>
    <div>
        <van-sticky>
            <van-nav-bar :title="$route.meta.title" left-text="返回" left-arrow @click-left="$router.back()" />
        </van-sticky>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
</style>