<template>
	<view class="submit-item-box align-items-center">
		<image :src="item.thumb"  class="image-sz-120" mode=""></image>
		<view class="height-120 flex-1 flex-column margin-left-20 margin-right-20 flex-between ">
			<text class="two-line-txt fn-sz-24 fn-cl-333">{{item.product_name}}</text>
			<text  class=" fn-sz-24 fn-cl-666">{{item.option_name}}</text>
		</view>
		<view class="height-120 flex-column txt-align-right">
			<text class="fn-cl-333 fn-sz-28 margin-bottom-20">¥{{item.price || item.option_price}}</text>
			<text class="fn-cl-999 fn-sz-28">x{{item.num}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			item:{
				type:Object
			}
		}
	}
</script>

<style lang="scss" scoped>
	.submit-item-box{
		width: 100%;
		height: 200upx;
		padding: 0 20upx;
		box-sizing: border-box;
		.height-120{
			height: 120upx;
		}
	}
</style>
