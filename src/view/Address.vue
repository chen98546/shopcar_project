<template>
    <div>
        <van-address-list v-model="chosenAddressId" :list="list" default-tag-text="默认"
            @add="$router.push(`/addAddress`)" @edit="editAddressFn" @select="selectAddress" />

        <van-empty class="custom-image" description="请先收货添加地址" v-show="list.length == 0"></van-empty>
    </div>
</template>

<script>
import { fetchGetAddressData } from '../fetch/fetch.js'
export default {
    data() {
        return {
            chosenAddressId: this.$store.state.chosenAddressId,
            list: [],
        }
    },
    created() {
        this._fetchGetAddressData();
    },
    methods: {
        // 地址切换
        selectAddress(item) {
            this.$store.commit('selectAddress', item);
        },
        // 地址编辑
        editAddressFn(item, index) {
            // setTimeout(() => {
            //     this.$bus.$emit('editAddressFn', item)
            // }, 20)
            // // this.$router.push(`/editAddress/${JSON.stringify(this.list[index])}`);
            this.$router.push(`/editAddress/${item.id}`);
            this.$store.commit('editAddressFn', item);
        },
        // 获取地址信息
        async _fetchGetAddressData() {
            let userId = this.$store.state.userInfo.id;
            let res = await fetchGetAddressData(userId);
            this.list = res.map(item => {
                item.address = item.province + item.city + item.country + item.addressDetail;
                return item;
            })
            this.list.filter(item => item.isDefault).map(item => this.chosenAddressId = item.id);
            this.list.filter(item => !item.isDefault).map(item => {
                if (this.list.length == 1 || !item.isDefault) {
                    this.chosenAddressId = this.list[0].id;
                    this.list[0].isDefault = 1;
                }
            })
        },
    }
}
</script>

<style lang="scss" scoped>
.van-empty {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    ::v-deep.van-empty__description {
        padding: 0;
    }
}
</style>