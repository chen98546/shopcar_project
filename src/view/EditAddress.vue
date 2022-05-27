<template>
    <div>
        <van-address-edit :area-list="areaList" show-postal show-set-default show-delete @save="onEditSave"
            :addressInfo="editAddressData" @change-area="changeArea" @change-default="defaultBtn" @delete="onEditDelete"
            :area-columns-placeholder="['请选择', '请选择', '请选择']" />
    </div>
</template>

<script>
import { areaList } from '@vant/area-data';
import { fetchEditAddressData, fetchDelAddressData } from '../fetch/fetch.js';
export default {
    data() {
        return {
            areaList,
            areaCode: '',
            editAddressData: this.$store.state.address,
        };
    },
    // created() {
    //     this.$bus.$on('editAddressFn', (data) => {
    //         this.editAddressData = data;
    //         this.areaCode = data.areaCode;
    //         this.areaCode = this.editAddressData.areaCode.split('-')[2];
    //     })
    // },
    methods: {
        // 设置默认地址回调
        defaultBtn(value) {
            this.$store.commit('defaultBtn', value)
        },
        // 更改地址回调
        changeArea(areaData) {
            this.areaCode = areaData.map(item => item.code).join("-");
        },
        // 修改地址
        async onEditSave(addressInfo) {
            let addressData = {
                ...addressInfo,
                country: addressInfo.county,
                areaCode: this.areaCode,
                isDefault: this.editAddressData.isDefault
            }
            addressData.areaCode == '' && (addressData.areaCode = this.$store.state.addressCode)
            let { status, message } = await fetchEditAddressData(addressInfo.id, addressData);
            this.$toast(message);
            status == 0 && this.$router.back();
        },
        // 删除地址
        async onEditDelete(addressInfo) {
            let { status, message } = await fetchDelAddressData(addressInfo.id, addressInfo);
            this.$toast(message);
            status == 0 && this.$router.back();
        }
    },
};
</script>

<style lang="scss" scoped>
</style>