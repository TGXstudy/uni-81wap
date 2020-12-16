<template>
	<view class="container pd-lr-30">
		<amount-input :type="'cashout'" :percent="percent"></amount-input>
	</view>
</template>

<script>
	import amountInput from "@/components/mine/AmountInput.vue"
	export default{
		components:{amountInput},
		onNavigationBarButtonTap(e) {
			if(e.index == 0){
				this.goPage('cashRecd')
			}
		},
		data(){
			return {
				percent:'', //提现比例
			}
		},
		onLoad(){
			// 获取提现比例
			this.getPercent();
		},
		methods:{
			// 获取提现比例
			getPercent(){
				this.$api.getConfigInfo({
					type:'deposit_percent'
				}).then(res=>{
					console.log("获取提现比例",res);
					if(res.code == 200){
						this.percent=res.data.deposit_percent;
					}else{
						console.log("获取提现比例",res);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding-top: 30upx;
		background-color: #f9f9f9;
		min-height: calc(100vh - var(--window-top));
		width: 100%;
	}
</style>
