<template>
  <div>
    <header>
      <van-sticky>
        <van-nav-bar :title="$route.meta.title" left-text="返回" left-arrow v-show="isShowNavBar"
          @click-left="$router.back()" />
      </van-sticky>
    </header>
    <router-view></router-view>
    <BackTop :distanceTop="600" />
  </div>
</template>

<script>
import BackTop from './components/BackTop.vue'
export default {

  data() {
    return {
      isShowNavBar: false
    }
  },
  watch: {
    $route: {
      handler(newRoute, oldRoute) {
        let { levelOnePage } = newRoute.meta;
        levelOnePage ? (this.isShowNavBar = false) : (this.isShowNavBar = true);
      },
      immediate: true
    }
  },
  components: {
    BackTop,
  },
}
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

</style>