<template>
	<view class="video-list-wrapper">
		<view class="flex-column video-item" v-for="(item,idx) in list" :key="idx">
			<view class="video-box">
				<video :src="item.video_url || item.upload_url" controls :poster="item.thumb" :id="'video'+idx" ></video>
			</view>
			
			<!-- <image class="video-poster" src="../../static/images/index/image-block3.png" mode=""></image> -->
			<view class="video-title">
				<text class="fn-sz-28 fn-cl-333 two-line-txt">{{item.title}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
			}
		},
		methods:{
			
			}
	}
</script>

<style lang="scss" scoped>
	.video-list-wrapper{
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-between;
		
		.video-item{
			width: 49%;
			margin-bottom: 20upx;
			.video-poster{
				width: 100%;
				height: 180upx;
				border-radius: 8upx;
			}
			.video-box{
				width: 100%;
				height: 180upx;
				border-radius: 8upx;
				video{
					width: 100%;
					height: 100%;
					border-radius: 8upx;
				}
			}
			.video-title{
				padding: 30upx 10upx;
			}
		}
		
	}
</style>
