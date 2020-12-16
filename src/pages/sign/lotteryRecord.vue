<template>
	<view class="container">
		<view class="flex-column pd-lr-30" v-if="recdList.length>0">
			<view class="flex-between record-item align-items-center" v-for="(item,idx) in recdList" :key="idx">
				<view class="">
					<text class=" fn-sz-28 fn-cl-333 margin-right-20">获得 </text>
					<text class=" fn-sz-28 fn-cl-theme">{{item.gift_name}}</text>
				</view>
				<text class="fn-sz-24 fn-cl-999">{{item.create_time}}</text>
			</view>
			<loadmore :visible="loading"></loadmore>
			<nomore :visible="nomore"></nomore>
		</view>
		<default-view v-else class="flex-1"></default-view>
		
	</view>
</template>

<script>
	import loadmore from "@/components/common/loadmore.vue";
	import nomore from "@/components/common/nomore.vue"
	import defaultView from "@/components/common/Default.vue"
	export default {
		components: {
			loadmore,
			nomore,
			defaultView
		},
		data() {
			return {
				recdList: [],
				page: 1,
				pageSize: 20,
				loading: false,
				nomore: false
			}
		},
		onLoad() {
			// 中奖纪录 
			this.getLotteryRecd();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getLotteryRecd("refresh");
		},
		onReachBottom() {
			if(this.nomore) return;
			this.page++;
			this.getLotteryRecd();
		},
		methods: {
			// 中奖纪录 
			getLotteryRecd(status = "") {
				this.loading = true;
				this.$api.getLotteryRecd({
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					console.log('中奖纪录', res);
					if (res.code == 200) {
						this.page = res.data.current_page;
						this.nomore = this.page >= res.data.last_page;
						if (this.page == 1) {
							this.recdList = res.data.data
						} else {
							this.recdList = this.recdList.concat(res.data.data);
						}
					} else {
						console.log('中奖纪录', res);
					}
				}).finally(() => {
					this.loading = false;
					this.stopPull(status)
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container {
		min-height: calc(100vh - var(--window-top));
		background-color: #fff;

		.record-item {
			width: 100%;
			height: 100upx;
			border: 2upx solid #F5F5F5;
		}
	}
</style>
