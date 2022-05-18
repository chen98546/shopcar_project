<template>
    <div>
        <div class="backTop" v-show="flag" @click="backTopFn">
            <slot>top</slot>
        </div>
    </div>
</template>

<script>
import { throttle } from '../assets/js/common.js'

export default {
    props: {
        distanceTop: {
            type: Number,
            default: 500,
        }
    },
    data() {
        return {
            flag: false,
        }
    },
    methods: {
        scrollFn() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            scrollTop >= this.distanceTop && (this.flag = true) || (this.flag = false);
        },
        backTopFn() {
            document.documentElement.scrollTop = document.body.scrollTop = 0;
        }
    },
    mounted() {
        document.addEventListener('scroll', throttle(this.scrollFn, 500));
    },
    destroyed() {
        document.removeEventListener('scroll', this.scrollFn);
    },
}


</script>

<style lang="scss" scoped>
.backTop {
    position: fixed;
    bottom: 80px;
    right: 10px;
    z-index: 999999;
    width: 40px;
    line-height: 40px;
    border-radius: 50%;
    text-align: center;
    background-color: #ccc;
}
</style>