<template>
  <div>
    <header>
      <van-nav-bar :title="$route.meta.title" left-text="返回" right-text="按钮" left-arrow v-if="!$route.meta.levelOnePage"
        @click-left="$router.back()" />
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>