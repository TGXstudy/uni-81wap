<template>
	<view class="census-box flex-column">

		<text v-if="type == 'point'" class="fn-sz-24 fn-cl-fff">积分账户余额（分）</text>
		<text v-else-if="type == 'wallet'" class="fn-sz-24 fn-cl-fff">账户余额（元）</text>
	
		<view class="flex-1 align-items-center justify-content-center">
			<text class="fn-sz-48 fn-cl-fff fn-bold">{{amount}}</text>
		</view>
		
		<view v-if="type == 'wallet'" class="wallet-btns" >
			<text class="left-btn fn-sz-24 fn-cl-fff" @tap="goPage('rechange')">充值</text>
			<text class="right-btn fn-sz-24 fn-cl-fff" 	 @tap="goPage('cashout')">提现</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			type:{
			 type:String
			},
			amount:{
				type:[String,Number]
			}
		}
	}
</script>

<style lang="scss" scoped>
	.census-box {
		width: 100%;
		height: 300upx;
		padding: 40upx;
		box-sizing: border-box;
		background-size: cover;
		background-image: url(../../static/images/mine/bg-point.png);
		margin: 20upx auto;
		position: relative;
		
		.wallet-btns{
			width: 100%;
			height: 80upx;
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			justify-content: space-around;
			align-items: center;
			&>text{
				display: inline-block;
				width: 100%;
				height: 100%;
				text-align: center;
				line-height: 80upx;
			}
			.left-btn{
				background-color:rgba(98,9,0,0.49);
				border-radius: 0 0 0 8upx;
			}
			.right-btn{
				background-color:rgba(98,9,0,0.67);
				border-radius: 0 0 8upx 0;
			}
		}
	}
</style>
