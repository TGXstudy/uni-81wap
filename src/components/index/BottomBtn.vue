<template>
	<view class="fixed-bottom pd-lr-30">
		<view class="icon-btn-box">
			<view class="icon-btn-item flex-column" @tap="doCollect">
				<image :src="isCollect ? require('../../static/images/index/icon-liked.png') : require('../../static/images/index/icon-like.png')" ></image>
				<text class=" fn-sz-22 fn-cl-333">收藏</text>
			</view>
			<view class="icon-btn-item flex-column" @tap="tabToCart">
				<image :src="require('../../static/images/index/icon-cart.png')"  ></image>
				<text class="fn-sz-22 fn-cl-333">购物车</text>
			</view>
			
		</view>
		<view class="buy-btn-box">
			<view class="buy-btn-item left-bg-img " @tap="doPurchse('cart')">
				加入购物车
			</view>
			<view class="buy-btn-item right-bg-img" @tap="doPurchse('buy')">
				立即购买
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			isCollect:{
				type:Boolean,
				default:false
			},
			goodsId:{
				type:Number
			}
		},
		data(){
			return {
				
			}
		},
		watch:{
			isCollect(newVal){
				this.is_collect=newVal
			}
		},
		methods:{
			doPurchse(buyway){
				this.$emit("doPurchse",buyway)
			},
			tabToCart(){
				this.$mRouter.switchTab({
					route:this.$mRoutesConfig.cart
				})
			},
			// 收藏、取消收藏
			doCollect(){
				this.$api.collect({
					type:'product',//product,shop,article
					id:this.goodsId
				}).then(res=>{
					
					if(res.code == 200){
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.$emit('collect')
						})
						
					}else{
						
						console.log(" 收藏、取消收藏",res);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.fixed-bottom {
		width: 100%;
		height: 100upx;
		background-color: #fff;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		
		.icon-btn-box {
			
			justify-content: space-between;
			align-items: center;

			.icon-btn-item {
				margin-right: 60upx;

				image {
					width: 50upx;
					height: 50upx;
				}
			}

		}

		.buy-btn-box {
			flex: 1;
			flex-shrink: 1;
			align-items: center;

			.buy-btn-item {
				justify-content: center;
				height: 80upx;
				width: 50%;
				color: #fff;
				font-size: 28upx;
				align-items: center;
			}

			.left-bg-img {
				background-color: var(--theme-color-yellow);
				background-color: $theme-color-yellow;
				border-radius: 40upx 0 0 40upx;
			}

			.right-bg-img {
				background-color: var(--theme-color);
				background-color: $theme-color;
				border-radius:  0 40upx 40upx 0 ;
			}
		}
	}
</style>
