<template>
	<!-- 推荐列表 -->
	<view class="width-100-percent flex-column">
		<view class="width-100-percent flex-column" v-for="(item,idx) in list" :key="idx" @tap="goPage('froumDetail',{postId:item.id})">
			<!-- 发帖人 -->
			<view class="post-man align-items-center">
				<image class="image-sz-60 margin-right-20 circle-image" :src="item.avatar" mode=""></image>
				<view class="flex-column flex-1">
					<text class="fn-sz-24 fn-cl-333">{{item.user_nickname}} </text>
					<text class="fn-sz-22 fn-cl-999">发布于{{item.time}}</text>
				</view>
			</view>
			<!-- 发帖人 -->

			<!-- 帖子简要内容 -->
			<view class="post-content">
				<view class="flex-1 flex-column flex-between margin-right-20">
					<text class="one-line-txt fn-sz-32 fn-cl-333 fn-bold">{{item.title}}</text>
					<text class="fn-sz-28 fn-cl-666 two-line-txt">{{item.content}}</text>
				</view>
				<image class="post-image" :src="item.images" mode=""></image>
			</view>
			<!-- 帖子简要内容 -->
			<!-- 帖子 操作 -->
			<view class="post-operate align-items-center">
				<view class="margin-right-20">
					<image class="image-sz-32" :src="require('../../static/images/froum/icon-edit.png')" mode=""></image>
					<text class="fn-sz-22 fn-cl-999">{{item.reply}}</text>
				</view>
				<view class="margin-left-20 margin-right-20">
					<image class="image-sz-32" :src="require('../../static/images/froum/icon-like.png')" mode=""></image>
					<text class="fn-sz-22 fn-cl-999">{{item.likes}}</text>
				</view>
				<view class="margin-left-20">
					<image class="image-sz-32" :src="require('../../static/images/froum/icon-star.png')" mode=""></image>
					<text class="fn-sz-22 fn-cl-999">{{item.collect}}</text>
				</view>
			</view>
			<!-- 帖子 操作 -->

		</view>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type:Array,
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.post-man {
		width: 100%;
		height: 140upx;
		
		
	}

	.post-content {
		width: 100%;
		height: 150upx;

		.post-image {
			width: 220upx;
			height: 150upx;
		}
	}

	.post-operate {
		width: 100%;
		height: 100upx;
	}
</style>
