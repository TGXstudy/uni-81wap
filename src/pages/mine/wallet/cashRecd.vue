<template>
	<view class="container pd-lr-30">
		<detail-list :list="recdList"></detail-list>
		<loadmore :visible="loading"></loadmore>
		<nomore :visible="nomore"></nomore>
	</view>
</template>

<script>
	import detailList from "@/components/mine/DetailList.vue"
	import loadmore from "@/components/common/loadmore.vue";
	import nomore from "@/components/common/nomore.vue"
	export default {
		components: {
			detailList,
			loadmore,
			nomore
		},
		onLoad() {
			//提现记录 
			this.getDepositList();
		},
		data() {
			return {
				page: 1,
				pageSize: 10,
				recdList: [],
				loading: false,
				nomore: false
			}
		},
		onReachBottom() {
			if (this.nomore) return;
			this.page++;
			this.queryRecord()
		},
		methods: {
			//提现记录
			getDepositList() {
				this.$api.depositList({
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					console.log("提现记录", res);
					if (res.code == 200) {
						this.nomore = this.page >= res.data.total_page;
						if (this.page == 1) {
							this.recdList = res.data.lists
						} else {
							this.recdList = this.recdList.concat(res.data.lists);
						}
					} else {
						console.log("提现记录", res);
					}
				}).finally(() => {
					this.loading = false;
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>
