<template>
	<view class="border-btn" :style="styleTxt" @tap="click">
		<text >{{txt}}</text>
	</view>
</template>

<script>
	export default{
		props:{
			txt:{
				type:String,
				default:'确定'
			},
			styleTxt:{
				type:String,
				default:''
			}
		},
		methods:{
			click(){
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.border-btn{
		border:2upx solid var(--theme-color);
		border-radius: 40upx;
		width: 100%;
		height: 90upx;
		color:var(--theme-color);
		font-size: 28upx;
		justify-content: center;
		align-items: center;
		
	}
</style>
