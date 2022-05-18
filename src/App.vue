<template>
  <div>
    <header>
      <van-nav-bar :title="$route.meta.title" left-text="返回" right-text="按钮" left-arrow v-if="!$route.meta.levelOnePage"
        @click-left="$router.back()" />
    </header>
    <router-view></router-view>
    <BackTop :distanceTop="600" />
  </div>
</template>

<script>
import BackTop from './components/BackTop.vue'
export default {
  components: {
    BackTop
  }
}
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}
</style>