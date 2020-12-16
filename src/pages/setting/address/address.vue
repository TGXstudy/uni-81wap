<template>
	<view class="container pd-lr-30">
		<view class="flex-column width-100-percent" v-if="addrList.length>0">
		<view v-for="(item,idx) in addrList" class="width-100-percent" :key="idx" @tap="chooseAddr(item)">
			<addr-item class="width-100-percent" :item="item" @update="getAddressList" ></addr-item>
		</view>
		</view>
		<default-view v-else class="flex-1"></default-view>

		<view class="fixed-wrapper pd-lr-30 align-items-center">
			<solid-btn class="width-100-percent" :txt="'添加收货地址'" @click="goPage('updateAddr',{type:'add'})"></solid-btn>
		</view>
	</view>
</template>

<script>
	import addrItem from "@/components/mine/AddrItem.vue"
	import solidBtn from "@/components/common/SolidBtn.vue"
	import defaultView from "@/components/common/Default.vue"
	export default {
		components: {
			addrItem,
			solidBtn,
			defaultView
		},
		onLoad(options) {
			this.fromPage=options.fromPage || ''; //submit
			
			this.giftId=options.id || 0;
		},
		onShow() {
			//收货地址列表
			this.getAddressList()
		},
		data() {
			return {
				addrList: [],
				giftId: 0 ,//奖品id
			}
		},
		methods: {
			
			chooseAddr(item){
				if(this.fromPage == 'submit'){
					
					this.$store.commit('SET_ADDRESS',item);
					this.$mRouter.back();
				}else if(this.fromPage == 'gift'){
					this.$api.setLotteryAddr({
						id:this.giftId,
						address_id:item.id
					}).then(res=>{
						console.log("完善收货地址",res);
						if(res.code == 200){
							this.$mUtils.toast(res.msg+"请等待平台发货",true).then(res=>{
								this.$mRouter.back();
							})
						}else{
							this.$mUtils.toast(res.msg);
						}
					})
				}
			},
			//收货地址列表  
			getAddressList() {
				this.$api.getAddressList().then(res => {
					console.log('收货地址列表', res);
					if(res.code == 200){
						this.addrList=res.data.lists;
					}else{
						console.log('收货地址列表', res);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #f9f9f9;
		padding-top: 20upx;
		min-height: calc(100vh - var(--window-top));
	}
</style>
