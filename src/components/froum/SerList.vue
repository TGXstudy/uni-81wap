<template>
	<!-- 热搜 列表 -->
	<view class="width-100-percent flex-column">
		<view class="post-item width-100-percent" v-for="(item,idx) in list" :key="idx" @tap="goPage('froumDetail',{postId:item.id})">
			<image v-if="idx+1 == 1" class="image-sz-48" :src="require('../../static/images/froum/icon-no1.png')" mode=""></image>
			<image v-else-if="idx+1 == 2" class="image-sz-48" :src="require('../../static/images/froum/icon-no2.png')" mode=""></image>
			<image v-else-if="idx+1 == 3" class="image-sz-48" :src="require('../../static/images/froum/icon-no3.png')" mode=""></image>
			<view v-else class="image-sz-48 no-txt"> <text class=" fn-sz-28 fn-cl-999">{{idx+1}}</text> </view>
			<view class="flex-1 margin-left-20 post-title">
				<text class="fn-cl-333 fn-sz-32 fn-bold">{{item.title}}</text>
			</view>
			<image class="post-image margin-left-20" :src="item.images" mode=""></image>
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
	.post-item{
		width: 100%;
		height: 250upx;
		padding: 40upx 0 16upx 0;
		box-sizing: border-box;
		
		border-bottom: 2upx solid #f5f5f5;
		.no-txt{
			align-items: center;
			justify-content: center;
		}
		.post-title{
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 4;
			-webkit-box-orient: vertical;
			word-wrap: break-word;
			word-break: break-all;
		}
		.post-image {
			width: 220upx;
			height: 150upx;
		}
	}
</style>
