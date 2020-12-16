<template>
	<view  :class="['solid-btn',isGray? 'solid-btn-gray':'solid-btn-theme']" :style="styleTxt" @tap="click">
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
			},
			isGray:{
				type:Boolean,
				default:false
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
	.solid-btn{
		border-radius: 40upx;
		width: 100%;
		height: 90upx;
		font-size: 32upx;
		justify-content: center;
		align-items: center;
	}
	.solid-btn-theme{
		background-color: var(--theme-color);
		color:#fff;
		
	}
	
	.solid-btn-gray{
		background-color:rgba(245,245,245,1);
		color:#ccc;
	}
</style>
