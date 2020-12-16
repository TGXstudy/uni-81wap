<template>
	<view class="goods-list-wrapper">
		<view class="goods-item flex-column" v-for="(item,idx) in list" :key="idx" @tap="goPage('goodsDetail',{goodsId:item.id})">
			<view class="goods-img">
				<image class="img-sz-100per" :src="item.thumb"></image>
			</view>
			<view class="goods-txt flex-column flex-1 flex-between ">
				<text class=" fn-sz-28 fn-cl-333 margin-bottom-20 two-line-txt ">{{item.product_name}}</text>
				<view class="align-items-baseline width-100-percent ">
					<text class=" fn-sz-32 fn-cl-theme margin-right-20 ">￥{{item.now_price}}</text>
					<text class=" fn-sz-24 fn-cl-999 delete-line ">￥{{item.price}}</text>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: function() {
					return [{
							id: 2,
							mid: 1,
							now_price: "18.00",
							postage: "6.00",
							price: "20.00",
							product_name: "小商品零售批发",
							thumb: "https://81.batmp.com/upload/default/20200615/9ecdf186cff9c1729035d4e24e71013b.png"
						}
					]
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.goods-list-wrapper {
		width: 100%;
		flex-wrap: wrap;
		justify-content: space-between;

		.goods-item {
			margin-top: 20upx;
			width: 340upx;
			border: 2upx solid #F8F8F8;
			background-color: #fff;
			border-radius: 12upx;
			.goods-img {
				width: 340upx;
				height: 265upx;
				border-radius: 12upx 12upx 0 0;
			}

			.goods-txt {
				width: 100%;
				padding: 16upx;
				

			}
		}
	}
</style>
