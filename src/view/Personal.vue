<template>
    <div class="user-container">
        <div class="userBg">
            <div class="userInfo">
                <div class="avatarImg">
                    <van-image round width="80px" height="80px" :src="avatar" @click="touchOffFileClick" />
                    <input v-show="false" @change="replaceAvatar" type="file" ref="avatar" />
                </div>
                <div class="username">登录名：{{ $store.state.userInfo.username }}</div>
                <van-icon class="setting" name="setting-o" size="24" />
            </div>
        </div>

        <div class="flex_c_c">
            <div class="info">
                <van-cell-group>
                    <van-cell title="我的订单" value="全部订单" to="/orderList" is-link />
                    <van-cell title="收货地址" to="/address" is-link />
                    <van-cell title="设置" is-link />
                    <van-cell title="关于乐淘" value="v1.0.0" />
                    <van-button type="danger" block @click="logoutFn">退出登录</van-button>
                </van-cell-group>
            </div>
        </div>
    </div>
</template>

<script>
import { upload } from '../fetch/fetch.js'
export default {
    methods: {
        // 登出
        logoutFn() {
            this.$dialog.confirm({ message: '确认退出登录吗' }).then(() => {
                this.$store.commit('clearUserInfo');
                this.$router.replace('/home/index')
            }).catch(() => { });
        },
        // 点击头像执行上传文件事件
        touchOffFileClick() {
            this.$refs.avatar.click();
        },
        // 头像更换
        async replaceAvatar() {
            let user_id = this.$store.state.userInfo.id
            let file = this.$refs.avatar.files[0]
            if (file) {
                let formData = new FormData();
                formData.set('user_id', user_id);
                formData.set('file', file)
                let { status, message, src } = await upload(formData);
                this.$toast(message)
                status === 0 && this.$store.commit('replaceAvatar', src);
            }
        }
    },
    computed: {
        // 拼接头像路径
        avatar() {
            return 'http://api.w0824.com/' + this.$store.state.userInfo.avatar;
        }
    },
}
</script>

<style lang="scss" scoped>
.user-container {
    height: 100vh;
    background: #eee;

    .userBg {
        padding: 10px;
        height: 180px;
        background: rgb(55, 59, 138);
    }

    .userInfo {
        position: relative;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 10px 16px;
        color: #eee;
        margin: 0 10px;
        font-size: 14px;

        .avatarImg {
            position: relative;
            margin-top: 20px;


            img {
                width: 100%;
            }
        }

        .setting {
            position: absolute;
            right: 0;
            top: 0;
        }

        .username {
            margin-top: 20px;
        }

    }

    .flex_c_c {
        @include flex_c_c;

        .info {
            width: 90vw;
            padding: 10px;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            background: #fff;
            margin-top: -40px;
        }
    }

}
</style>
