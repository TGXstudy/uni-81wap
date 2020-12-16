<template>
	<view class="container pd-lr-30">
		<census-box :type="'point'" :amount="amount"></census-box>
		<view class="flex-column flex-1">
			<tab-list :tabsList="tabsList" :currentTab="currentTab" @change="changeTab"></tab-list>
			<view class="flex-column" v-if="billList.length>0">
				<detail-list :list="billList"></detail-list>
				<loadmore :visible="loading"></loadmore>
				<nomore :visible="nomore"></nomore>
			</view>
			<defaultView v-else class="flex-1"></defaultView>
		</view>

	</view>
</template>

<script>
	import censusBox from "@/components/mine/CensusBox.vue"
	import tabList from "@/components/mine/TabList.vue"
	import detailList from "@/components/mine/DetailList.vue"
	import defaultView from "@/components/common/Default.vue"
	import loadmore from "@/components/common/loadmore.vue";
	import nomore from "@/components/common/nomore.vue"
	export default {
		components: {
			tabList,
			detailList,
			censusBox,
			defaultView,
			loadmore,
			nomore,
		},
		onNavigationBarButtonTap(e) {
			if (e.index == 0) {
				this.goPage("richText", {
					title: '积分规则',
					type: 4
				})
			}
		},
		data() {
			return {
				currentTab: 'in',
				tabsList: [{
						key: "in",
						name: '收入明细'
					},
					{
						key: "out",
						name: '支出明细'
					},
				],
				page: 1,
				pageSize: 12,
				amount: 0, //余额
				billList: [],
				loading: false,
				nomore: false
			}
		},
		onLoad() {
			//我的钱包
			this.getMyPoint();

		},
		onPullDownRefresh() {
			this.page = 1;
			this.getMyPoint("refresh");
		},
		onReachBottom() {
			if(this.nomore) return;
			this.page++;
			this.getMyPoint();
		},
		methods: {
			changeTab(key) {
				this.currentTab = key;
				this.page=1;
				this.getMyPoint();
			},
			//我的积分
			getMyPoint(status = "") {
				this.loading = true;
				this.$api.getPointWallet({
					type: 'score',
					ioe: this.currentTab,
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					// console.log("我的积分", res);
					if (res.code == 200) {
						this.amount = res.data.has;

						this.nomore = this.page >= res.data.bill.total_page;
						if (this.page == 1) {
							this.billList = res.data.bill.lists
						} else {
							this.billList = this.billList.concat(res.data.bill.lists);
						}

					} else {
						console.log("我的积分", res);
					}
				}).finally(() => {
					this.loading = false;
					this.stopPull(status);
				})
			}
			//
		},

	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: calc(100vh - var(--window-top));

	}
</style>
