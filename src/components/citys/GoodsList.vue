<template>
	<view class="flex-column pd-lr-30">
		<view class="goods-item-box" v-for="(item,idx) in list" :key='idx' @tap="goPage('goodsDetail',{goodsId:item.id})">
			<image class="image-sz-120 border-radius-8 margin-right-20" :src="item.thumb" mode=""></image>
			<view class="flex-column flex-1 flex-between">
				<text class="two-line-txt fn-sz-28 fn-cl-333 margin-bottom-20">{{item.product_name}}</text>
				<text class="fn-sz-28 fn-cl-theme">¥{{item.now_price}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-item-box{
		width: 100%;
		height: 200upx;
		align-items: center;
	}
</style>
