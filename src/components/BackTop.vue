<template>
    <div>
        <div class="backTop" v-show="flag" @click="backTopFn">
            <slot>
                <van-icon name="back-top" color="#ccc" />
            </slot>
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
@import '../assets/scss/common.scss';

.backTop {
    @include flex_c_c;

    position: fixed;
    bottom: 80px;
    right: 10px;
    z-index: 999999;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    background-color: #fff;
    border: 1px solid #ccc;

    .van-icon {
        font-size: 26px;
    }
}
</style>