<template>
	<view class="container pd-lr-30 have-fixed-bottom">
		<view class="width-100-percent addr-wrapper flex-column">
			<view v-if="!address.id"  class=" width-100-percent flex-between flex-1 align-items-center" @tap="goPage('address',{fromPage:'submit'})">
				<image class="image-sz-32 margin-right-20 margin-left-20" :src="require('../../static/images/index/icon-edit.png')" mode=""></image>
				<text class="fn-cl-333 fn-sz-36 fn-bold flex-1">请填写地址</text>
				<image class="image-sz-32 margin-right-20" :src="require('../../static/images/index/icon-narraw.png')" mode=""></image>
			</view>
			<view v-else  class=" width-100-percent flex-between flex-1 align-items-center" @tap="goPage('address',{fromPage:'submit'})">
				<view class="flex-1 flex-column margin-left-20">
					<text class="fn-sz-28 fn-cl-333">{{address.fullname}} {{address.phone | hideTel}}</text>
					<text class="fn-sz-28 fn-cl-333">{{address.province+address.city+address.county+address.address}}</text>
				</view>
				<image class="image-sz-32 margin-right-20" :src="require('../../static/images/index/icon-narraw.png')" mode=""></image>
			</view>
			<image class="image-bot" :src="require('../../static/images/index/image-bot.png')" mode=""></image>
		</view>
		<view class="title-box align-items-center">
			<text class=" fn-cl-333 fn-sz-24 margin-left-20">购买商品</text>
		</view>
		<!-- 商品列表 -->
		<view class="flex-column goods-list-box margin-bottom-20" v-for="(item,idx) in info" :key='idx'>
			
			
			<submit-item v-for="(pro,idx) in item.products" :item="pro" :key="idx"></submit-item>
			<view class="sum-item flex-between">
				<text class="fn-cl-999 fn-sz-28">商品金额:</text>
				<text class="fn-cl-333 fn-sz-28">￥{{item.shop_total_price}}</text>
			</view>
			<view class=" sum-item flex-between">
				<text class="fn-cl-999 fn-sz-28">运费：</text>
				<text class="fn-cl-333 fn-sz-28">+￥{{item.postage}}</text>
			</view>
			<view class="sum-item flex-end">
				<text class=" fn-sz-32 fn-cl-333 fn-bold">小计：￥{{item.total_fee}}</text>
			</view>
		</view>
		
		
		<view class="fixed-wrapper pd-lr-30 flex-between">
			<view class="">
				<text class=" fn-sz-28 fn-cl-666">订单合计：</text>
				<text class=" fn-sz-28 fn-cl-theme">￥{{totalFee}}</text>
			</view>
			<solid-btn class="submit-btn" :txt="'提交订单'" @click="createOrder"></solid-btn>
		</view>
	</view>
</template>

<script>
	import solidBtn from "@/components/common/SolidBtn.vue"
	import submitItem from "@/components/market/SubmitItem.vue"
	export default{
		components:{solidBtn,submitItem},
		onLoad(options){
			let params= options.products && JSON.parse(options.products) || '';
			console.log("onLoad----",params);
			// 根据商品id获取预下单信息
			this.beforeSubmit(params);
			//获取地址
			this.getAddressList();
			
		},
		onShow() {
			this.address=this.$store.getters.getAddress
			console.log(this.address);
		},
		data(){
			return {
				info:{},
				totalFee:0,
				totalPostage:0,
				totalProPrice:0,
				address:{}
			}
		},
		methods:{
			//获取地址
			getAddressList(){
				this.$api.getAddressList().then(res=>{
					console.log("获取地址",res);
					if(res.code == 200){
						if(res.data.lists.length>0){
							// this.address=res.data.lists[0];
							this.$store.commit('SET_ADDRESS',res.data.lists[0])
						}
						
					}else{
						console.log("获取地址",res);
					}
				})
			},
			// 根据商品id获取预下单信息
			beforeSubmit(params){
				this.$api.beforeSubmit({
					products:params
				}).then(res=>{
					console.log('根据商品id获取预下单信息',res)
					if(res.code == 200){
						this.info=res.data.info;
						this.totalFee=res.data.total_fee;
						this.totalPostage=res.data.total_postage;
						this.totalProPrice=res.data.total_product_price;
						
						this.createInfo=res.data;
					}else if(res.code == 210){
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.$mRouter.back();
						})
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//单击提交订单
			createOrder(){
				console.log("单击提交订单");
				if(!this.address.id){
					this.$mUtils.toast("请选择收货地址");
					return;
				}
				
				
				this.$api.createOrder({
					product_str:JSON.stringify(this.createInfo),
					address_id:this.address.id
				}).then(res=>{
					
					if(res.code == 200){
						this.$mRouter.redirectTo({
							route:this.$mRoutesConfig.payOrder,
							query:{
								orderId: JSON.stringify(res.data.order_id) ,
								totalFee:res.data.total_fee,
								orderType:res.data.order_type
							}
						})
					}else{
						this.$mUtils.toast(res.msg)
						console.log("提交订单",res);
					}
				})
				//
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		background-color: #f9f9f9;
		min-height: calc(100vh - 120upx );
		.addr-wrapper{
			background-color: #fff;
			height: 160upx;
			.image-bot{
				width: 100%;
				height: 8upx;
			}
		}
		
		.title-box{
			width: 100%;
			height: 80upx;
			background-color: #fff;
			margin: 20upx 0;
			border-radius: 12upx;
			
		}
		.goods-list-box{
			background-color: #fff;
			.sum-item{
				height: 60upx;
				line-height: 60upx;
				padding: 0 20upx;
			}
		}
		.fixed-wrapper{
			box-shadow:0px 0px 6px 0px rgba(238,238,238,1);
			width: 100%;
			height: 100upx;
			align-items: center;
			.submit-btn{
				height: 80upx;
				width: 220upx;
			}
		}
		
	}
</style>
