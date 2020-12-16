<template>
	<!-- 精品列表 -->
	<view class="width-100-percent flex-column">
		<view class="width-100-percent flex-column post-item" :class="[isCollect ? 'border-radius-8 margin-bottom-20 pd-lr-30':'']" v-for="(item,idx) in list" :key="idx" @tap="goPage('froumDetail',{postId:item.id})">
			<text class="two-line-txt fn-sz-32 fn-cl-333 fn-bold margin-bottom-20">{{item.title}}</text>
			<text v-if="isCollect" class=" fn-cl-999 fn-sz-22">{{item.create_time}}</text>
			<text v-else class=" fn-cl-999 fn-sz-22">发布于{{item.time}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			isCollect:{ //是否显示在收藏页
				type:Boolean,
				default:false,
			},
			list:{
				type:Array
			}
		}
	}
</script>

<style lang="scss" scoped>
	.post-item{
		height: 220upx;
		justify-content: center;
		border-bottom: 2upx solid #f5f5f5;
		background-color: #fff;

	}
</style>
