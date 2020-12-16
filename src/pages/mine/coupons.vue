<template>
	<view class="container" :style="{'padding-top': fromPage == 'pay' ? 0 : '120upx'}">
		<view class="fiexd-top-tab" v-if="fromPage != 'pay'">
			<tab-list :tabsList="tabList" :currentTab="currentTab" @change="changeTab"></tab-list>
		</view>
		<view class="flex-column" v-if="couponList.length>0">
			<coupon-list :type="currentTab" :list="couponList" @click="chooseCoupon"></coupon-list>
			<loadmore :visible="loading"></loadmore>
			<nomore :visible="nomore"></nomore>
		</view>
		<default-view v-else class="flex-1"></default-view>
		
	</view>
</template>

<script>
	import tabList from "@/components/mine/TabList.vue"
	import couponList from "@/components/mine/CouponList.vue"
	import loadmore from "@/components/common/loadmore.vue";
	import nomore from "@/components/common/nomore.vue"
	import defaultView from "@/components/common/Default.vue"
	export default {
		components: {
			tabList,
			couponList,loadmore,nomore,defaultView
		},
		data() {
			return {
				currentTab: 'canuse',
				tabList: [{
						key: "canuse",
						name: '未使用'
					},
					{
						key: "hasuse",
						name: '已使用'
					},
					{
						key: "outdate",
						name: '已过期'
					},

				],
				status: 0,
				page: 1,
				pageSize: 10,
				loading:false,
				nomore:false,
				couponList:[]
			}
		},
		
		methods: {
			chooseCoupon(e){
				if(this.fromPage == 'pay'){
					console.log("-----------",e);
					this.$store.commit("SET_COUPON",e);
					this.$mRouter.back();
					// chooseCoupon
				}
			},
			
			changeTab(key) {
				let keys = ['canuse', 'hasuse', 'outdate'];
				console.log(key);
				this.currentTab = key;
				this.status = keys.indexOf(key);
				this.getMyCoupon();
			},
			// 我的优惠券  
			getMyCoupon(status='') {
				this.loading=true;
				this.$api.getMyCoupon({
					status: this.status, //未使用0，已使用1，已过期2
					page: this.page,
					pageSize: this.pageSize
				}).then(res => {
					console.log("我的优惠券TODO", res);
					if(res.code == 200){
						this.page = res.data.current_page;
						this.nomore = this.page >= res.data.last_page;
						if (this.page == 1) {
						    this.couponList=res.data.data
						} else {
						    this.couponList = this.couponList.concat(res.data.data);
						}
					}else{
						console.log("我的优惠券TODO", res);
					}
				}).finally(()=>{
					this.loading=false;
					this.stopPull(status)
				})
			},
			//获取可使用积分和可使用优惠券
			getScoreCoupon(){
				this.$api.getScoreCoupon({
					order_ids:this.orderIds
				}).then(res=>{
					console.log('获取可使用积分和可使用优惠券',res);
					if(res.code == 200){
						this.couponList=res.data.my_coupon;
					
					}else{
						console.log('获取可使用积分和可使用优惠券',res);
					}
				})
			}
		},
		onLoad(options) {
			this.fromPage = options.fromPage || ''
			
			if(this.fromPage == 'pay'){ //支付订单可用优惠券
				this.orderIds= options.orderIds && JSON.parse(options.orderIds)  || [];
				//获取可使用积分和可使用优惠券
				this.getScoreCoupon();
				
			}else{
				// 我的优惠券
				this.getMyCoupon();
			}
			
			
		},
		onPullDownRefresh() {
			this.page = 1;
			this.getMyCoupon("refresh");
		},
		onReachBottom() {
			if(this.nomore) return;
			this.page++;
			this.getMyCoupon();
		},

	}
</script>

<style lang="scss" scoped>
	.container {
		
		min-height: calc(100vh - var(--window-top));
	}

	.fiexd-top-tab {
		position: fixed;
		top: var(--window-top);
		left: 0;
		right: 0;
	}
</style>
