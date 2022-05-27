<template>
    <div class="address">
        <van-icon name="location-o" @click="$router.push(`/address`)" />
        <div>
            <p>
                <span>{{ $store.state.address.name }}</span>&nbsp;&nbsp;<span>{{ $store.state.address.tel }}</span>
            </p>
            <p>{{ $store.state.address.address }}</p>
        </div>
        <van-icon name="edit" class="edit" @click="$router.push(`/editAddress/${$store.state.address.id}`)" />
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.address {
    @include flex_sb_c;
    width: 100%;
    font-size: 16px;
    background-color: #fff;
    padding: 5px 10px;
    color: #666;
    margin-bottom: 10px;

    .van-icon {
        display: block;
        flex: 1;
        text-align: center;
        font-size: 24px;
    }

    .edit {
        padding-left: 10px;
    }

    div {
        flex: 9;
        border-right: 1px solid #ccc;
        padding: 0 10px;

        p {
            margin: 10px 0;
        }
    }
}
</style>