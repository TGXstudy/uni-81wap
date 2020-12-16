<template>
	<view class="container">
		<view class="width-100-percent pd-lr-30">
			<scroll-view scroll-x="true" class="scroll-x-box status-box">
				<view class="scroll-x-item status-item" v-for="(item,idx) in statusList" :key="idx" @tap="changeStatus(item)">
					<text class="fn-sz-28" :class="[currenStatus == item.status ? 'fn-cl-theme fn-bold' : 'fn-cl-333'] ">{{item.text}}</text>
				</view>
			</scroll-view>
		</view>
		<view class="order-wrapper pd-lr-30 flex-column" v-if="orderList.length>0">
			<order-item v-for="(item,idx) in orderList" :key='idx' :item="item" @update="getOrderList"></order-item>
			<loadmore :visible="loading"></loadmore>
			<nomore :visible="nomore"></nomore>
		</view>
		<default-view v-else class="flex-1"></default-view>
	</view>
</template>

<script>
	import orderItem from "@/components/mine/OrderItem.vue";
	import loadmore from "@/components/common/loadmore.vue";
	import nomore from "@/components/common/nomore.vue";
	import defaultView from "@/components/common/Default.vue";
	export default {
		components: {
			orderItem,
			defaultView,
			loadmore,
			nomore,
		},
		data() {
			return {
				currenStatus: 'all',
				statusList: [

					{
						status: 'all',
						text: '全部'
					},
					{
						status: 'wait_pay',
						text: '待付款'
					},
					{
						status: 'wait_send',
						text: '待发货'
					},
					{
						status: 'wait_receive',
						text: '待收货'
					},
					{
						status: 'wait_commit',
						text: '待评论'
					},
					{
						status: 'done',
						text: '已完成'
					},
					{
						status: 'after_pay',
						text: '退款/售后'
					}
				],
				page: 1,
				pageSize: 10,
				orderList: [],
				loading: false,
				nomore: false
			}
		},
		onLoad(options) {
			this.currenStatus = options.status || 'all';
			//订单列表
			this.getOrderList();
		},
		onReachBottom() {
			if (this.nomore) return;
			this.page++;
			this.getOrderList();
		},
		methods: {
			//订单列表
			getOrderList() {
				this.loading = true;
				this.nomore = false;
				this.$api.orderList({
					status: this.currenStatus, //订单状态，全部all,待付款wait_pay,待发货wait_send,待收货wait_receive,待评论wait_commit,已完成done,售后after_pay
					page: this.page,
					pageSize: this.pageSize,
				}).then(res => {
					console.log('订单列表', res);
					if (res.code == 200) {
						this.page = res.data.current_page;
						this.nomore = this.page >= res.data.last_page;
						if (this.page == 1) {
							this.orderList = res.data.data
						} else {
							this.orderList = this.orderList.concat(res.data.data);
						}
					}
				}).finally(() => {
					this.loading = false;
				})
			},
			//切换订单状态
			changeStatus(item) {
				this.currenStatus = item.status;
				this.page = 1;
				this.getOrderList()
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: calc(100vh - var(--window-top));

		.status-box {
			background-color: #fff;
			height: 100upx;
			line-height: 100upx;

			.status-item {
				margin-right: 60upx;
			}
		}

		.order-wrapper {
			min-height: calc(100vh - 100upx);
			padding-top: 20upx;
			background-color: #f9f9f9;
		}
	}
</style>
