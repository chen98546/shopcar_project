<template>
    <div>
        <van-address-edit :area-list="areaList" show-postal show-set-default show-search-result
            :search-result="searchResult" :area-columns-placeholder="['请选择', '请选择', '请选择']" @save="onAddSave"
            @change-area="changeAreaFn" />
    </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import { fetchAddAddressData } from '../fetch/fetch.js';

export default {
    data() {
        return {
            areaList,
            areaCode: '',
            searchResult: [],
        };
    },
    methods: {
        //  保存新增地址
        async onAddSave(addressInfo) {
            let userId = this.$store.state.userInfo.id;
            addressInfo.isDefault = addressInfo.isDefault ? 1 : 0;
            addressInfo.country = addressInfo.county;
            let formData = { ...addressInfo, areaCode: this.areaCode }
            let { status, message } = await fetchAddAddressData(userId, formData);
            this.$toast(message)
            status == 0 && this.$router.back();
        },
        // 省市区改变触发
        changeAreaFn(addressData) {
            this.areaCode = addressData.map(item => item.code).join('-');
        },
    },
};
</script>

<style lang="scss" scoped>
</style>