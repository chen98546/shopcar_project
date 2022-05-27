<template>
  <div>
    <header>
      <Navbar @click-left="$router.back()" v-show="isShowNavbar" />
    </header>
    <router-view></router-view>
    <BackTop :distanceTop="600" />
  </div>
</template>

<script>
import BackTop from './components/BackTop.vue'
import Navbar from './components/Navbar.vue'
export default {

  data() {
    return {
      isShowNavbar: false
    }
  },
  watch: {
    $route: {
      handler(newRoute, oldRoute) {
        let { showNavbar } = newRoute.meta;
        showNavbar ? (this.isShowNavbar = false) : (this.isShowNavbar = true);
      },
      immediate: true
    }
  },
  components: { BackTop, Navbar },
}
</script>

<style lang="scss">
html {
  scroll-behavior: smooth;
}

body {
  background-color: #f2f2f2;
}
</style>