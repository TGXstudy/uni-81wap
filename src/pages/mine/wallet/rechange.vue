<template>
	<view class="container pd-lr-30">
		<amount-input :type="'rechange'"></amount-input>
	</view>
</template>

<script>
	import amountInput from "@/components/mine/AmountInput.vue"
	export default{
		components:{amountInput}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding-top: 30upx;
		background-color: #f9f9f9;
		min-height: calc(100vh - var(--window-top));
		width: 100%;
	}
</style>
