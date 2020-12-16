<template>
	<view class="default-box flex-column align-items-center justify-content-center" :style="{'height':height}">
			<image class="image-default" :src="'/static/images/mine/image-default.png' | imgUrl" mode=""></image>
			<text class=" fn-cl-666 fn-sz-28">暂无内容</text>
	</view>
</template>

<script>
	export default{
		props:{
			height:{
				type:String,
				default:'calc(100vh - var(--window-top))'
			}
		},
		data(){
			return {
			}
		}
	}
</script>

<style lang="scss" scoped>
	.default-box{
		width: 100%;
		background-color: #fff;
		height: 100%;
	}
	.image-default{
		width: 200upx;
		height: 200upx;
	}
</style>
