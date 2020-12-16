<template>
	<view class="container pd-lr-30 have-fixed-bottom">
		<view class="width-100-percent addr-wrapper flex-column">
			<view class=" width-100-percent flex-between flex-1 align-items-center">
				<view class="flex-1 flex-column margin-left-20">
					<text class="fn-sz-28 fn-cl-333">{{address.fullname}} {{address && address.phone | hideTel}}</text>
					<text class="fn-sz-28 fn-cl-333">{{address.province+address.city+address.county+address.address}}</text>
				</view>
				<!-- <image class="image-sz-32 margin-right-20" src="../../static/images/index/icon-narraw.png" mode=""></image> -->
			</view>
			<image class="image-bot" :src="require('../../static/images/index/image-bot.png')" mode=""></image>
		</view>

		<view class="title-box align-items-center">
			<text class=" fn-cl-333 fn-sz-24 margin-left-20"> {{ orderInfo.shop_name}}</text>
		</view>
		<!-- 商品列表 -->
		<view class="flex-column  goods-list-box">
			<submit-item v-for="(item,idx) in goodList" :key="idx" :item="item"></submit-item>
		</view>
		<!-- 订单信息 -->
		<view class="flex-column  pd-lr-30 info-wrapper">
			<view class=" fn-sz-28 fn-cl-333 fn-bold title">
				订单信息
			</view>
			<view class="flex-between row-item">
				<text class="fn-cl-333 fn-sz-28 margin-right-20">订单编号</text>
				<view class=" flex-1 break-all flex-end">
					<text class="fn-cl-666 fn-sz-28">{{orderInfo.order_sn}}</text>
				</view>
			</view>
			<view class="flex-between row-item">
				<text class="fn-cl-333 fn-sz-28 margin-right-20">订单变更时间</text>
				<view class=" flex-1 break-all flex-end">
					<text class="fn-cl-666 fn-sz-28">{{orderInfo.update_time}}</text>
				</view>
			</view>
			<view class="flex-between row-item">
				<text class="fn-cl-333 fn-sz-28 margin-right-20">订单金额</text>
				<view class=" flex-1 break-all flex-end">
					<text class="fn-cl-666 fn-sz-28">￥{{orderInfo.total_fee}}</text>
				</view>
			</view>
			<view class="flex-end row-item"  v-if="orderInfo.coupon_dec_money >0">
					<text class="fn-cl-666 fn-sz-28 margin-right-20">优惠券抵扣</text>
					<text class="fn-cl-666 fn-sz-28">￥{{orderInfo.coupon_dec_money}}</text>
			</view>
			<view class="flex-end row-item" v-if="orderInfo.score_dec_money  >0">
					<text class="fn-cl-666 fn-sz-28 margin-right-20">积分抵扣</text>
					<text class="fn-cl-666 fn-sz-28">￥{{orderInfo.score_dec_money}}</text>
			</view>
			<view class="flex-between row-item" v-if="orderInfo.real_pay">
				<text class="fn-cl-333 fn-sz-28 margin-right-20">实际支付金额</text>
				<view class=" flex-1 break-all flex-end">
					<text class="fn-cl-666 fn-sz-28">￥{{orderInfo.real_pay}}</text>
				</view>
			</view>
			<view class="flex-between row-item">
				<text class="fn-cl-333 fn-sz-28 margin-right-20">订单状态</text>
				<view class=" flex-1 break-all flex-end">
					<text class="fn-cl-666 fn-sz-28">{{orderInfo.status_cn}}</text>
				</view>
			</view>

		</view>
		<!--  -->
		<view class="flex-column pd-lr-30 info-wrapper" v-if=" orderInfo.express_company && orderInfo.express_sn">
			<view class="fn-sz-28 fn-cl-333 fn-bold title">
				物流信息
			</view>
			<view class="flex-between row-item" v-if="orderInfo.express_company">
				<text class="fn-cl-333 fn-sz-28 margin-right-20">快递公司</text>
				<view class=" flex-1 break-all flex-end">
					<text class="fn-cl-666 fn-sz-28">{{orderInfo.express_company}}</text>
				</view>
			</view>
			<view class="flex-between row-item" v-if="orderInfo.express_sn">
				<text class="fn-cl-333 fn-sz-28 margin-right-20">快递单号</text>
				<view class=" flex-1 break-all flex-end">
					<text class="fn-sz-orange fn-sz-28 margin-right-20" @tap="doCopy(orderInfo.express_sn)">复制</text>
					<text class="fn-cl-666 fn-sz-28">{{orderInfo.express_sn}}</text>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import solidBtn from "@/components/common/SolidBtn.vue"
	import submitItem from "@/components/market/SubmitItem.vue"
	export default {
		components: {
			solidBtn,
			submitItem
		},
		methods: {
			//订单详情
			getOrderInfo() {
				this.$api.orderInfo({
					order_id: this.orderId
				}).then(res => {
					console.log("订单详情", res);
					if (res.code == 200) {
						this.orderInfo = res.data;
						this.address = res.data.address;
						this.goodList = res.data.options;
					}
				})
			},
			//复制
			doCopy(data) {
				this.$copyText(data).then(	res => {
						this.$mUtils.toast("复制成功")
					},	err => {
						this.$mUtils.toast("复制失败")
					}
				);
			}

		},
		data() {
			return {
				orderId: 0,
				address: {},
				goodList: [],
				orderInfo: {}
			}
		},
		onLoad(options) {
			this.orderId = options.orderId || 0;
			//订单详情
			this.getOrderInfo()
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #f9f9f9;
		min-height: calc(100vh - var(--window-top));
		padding-top: 20upx;

		.addr-wrapper {
			background-color: #fff;
			height: 160upx;

			.image-bot {
				width: 100%;
				height: 8upx;
			}
		}

		.title-box {
			width: 100%;
			height: 80upx;
			background-color: #fff;
			margin-top: 20upx;
			border-radius: 12upx 12upx 0 0;

		}

		.goods-list-box {
			background-color: #fff;

			.sum-item {
				height: 60upx;
				line-height: 60upx;
				padding: 0 20upx;
			}
		}

		.info-wrapper {
			margin-top: 20upx;
			background-color: #fff;

			&>.title {
				height: 100upx;
				align-items: center;
			}

			&>.row-item {
				min-height: 100upx;
				align-items: center;

				& text {
					text-align: right;
				}

				.fn-sz-orange {
					color: #FF7800;
				}
			}
		}

	}
</style>
