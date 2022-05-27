<template>
    <div class="LoginContainer">
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]" />
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { fetchLoginData } from '../fetch/fetch.js'
export default {
    data() {
        return {
            username: '',
            password: ''
        }
    },

    methods: {
        // 登录
        async onSubmit(value) {
            let { username, password } = value;
            let { message, token, userInfo, status } = await fetchLoginData(username, password);
            this.$toast(message);
            status == 0 && this.$store.commit('tokenAndUserInfo', { token, userInfo });
            let { redirect } = this.$route.query;
            redirect ? this.$router.push(redirect) : this.$router.push('/home/index');
        }
    },
}
</script>

<style lang="scss" scoped>
</style>