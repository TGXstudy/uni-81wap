<template>
	<view class="info-item-box" @tap="goPage('infoDetail')">
		<view class="flex-1 info-brief flex-column flex-between">
			<view class="two-line-txt fn-cl-333 fn-sz-28">
				打开千亿级市场空间 强力发电华丽蜕变打开千亿丽蜕变打开千亿级市场空间 强力发电华丽蜕变
			</view>
			<view class="flex-between ">
				<view class="">
					<image :src="require('../../static/images/info/icon-eye.png')" class="image-sz-32" mode=""></image>
					<text class="fn-cl-999 fn-sz-24">1112</text>
				</view>
				<text class="fn-cl-999 fn-sz-24">2019-03-15</text>
			</view>
		</view>
		<image  class="info-image margin-left-20" :src="require('../../static/images/card/image-recruit.png')" mode=""></image>
	</view>
</template>

<script>
	export default{
		
	}
</script>

<style lang="scss" scoped>
	.info-item-box{
		width: 100%;
		height: 220upx;
		
		.info-brief{
			height: 160upx;
		
		}
		.info-image{
			width: 220upx;
			height: 160upx;
		}
	}
</style>
