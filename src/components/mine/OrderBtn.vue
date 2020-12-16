<template>
	<view class="btn-wrapper" :class="[isGray ? 'gray-btn' : 'theme-btn']" @tap="clickBtn">
		<text class=" fn-sz-24">{{txt}}</text>
	</view>
</template>

<script>
	export default{
		props:{
			txt:{
				type:String
			},
			isGray:{
				type:Boolean,
				default:false
			}
		},
		methods:{
			clickBtn(){
				this.$emit("click");
			}
		}
	}
</script>

<style lang="scss" scoped>
	.btn-wrapper{
		width: 140upx;
		height: 50upx;
		border-radius: 26upx;
		align-items: center;
		justify-content: center;
		margin-left: 20upx;
	}
	.gray-btn{
		border:1px solid #CCCCCC;
		color: #666;
	}
	
	.theme-btn{
		border:1px solid var(--theme-color);
		border:1px solid $theme-color;
		
		color: var(--theme-color);
		color: $theme-color;
	}
</style>
