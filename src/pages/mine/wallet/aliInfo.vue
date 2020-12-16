<template>
	<view class="container">
		<view class="info-box">
			<view class="title">
				<text class="fn-sz-28 fn-cl-333"> 提现金额</text>
			</view>
			<view class="">
				<text class="fn-sz-72 fn-cl-333 fn-bold">￥{{params.wit_money}}</text>
			</view>
			<view class="title">
				<text class="fn-sz-28 fn-cl-theme">	*	</text>
				<text class="fn-sz-28 fn-cl-333">填写支付宝信息</text>
			</view>
			<view class="input-wrapper">
				<text class="fn-sz-28 fn-cl-333 margin-right-20">姓名</text>
				<input class="input-item" type="text" v-model.trim="params.alipay_name" placeholder="请输入支付宝真实姓名">
			</view>
			<view class="input-wrapper">
				<text class="fn-sz-28 fn-cl-333 margin-right-20">账户</text>
				<input class="input-item" type="text" v-model.trim="params.ali_account" placeholder="请输入支付宝账户">
			</view>
			<!-- 空白样式 -->
			<view style="width: 100%; height: 80upx;"> </view>
			<!-- 空白样式 -->
			<solid-btn class="margin-bottom-20" :txt="'确认'" @click="confirm"></solid-btn>
		</view>
	</view>
</template>

<script>
	import solidBtn from "@/components/common/SolidBtn.vue"
	export default{
		components: {
			solidBtn,
		},
		// onNavigationBarButtonTap(e) {
		// 	if(e.index == 0){
		// 		this.goPage('cashRecd')
		// 	}
		// },
		data(){
			return {
				params:{
					openid:'' , //微信openid
					wit_money:'',// 提现金额
					device:'wap', //设备id，pc,app,wap
					type:'alipay', //alipay,wxpay
					ali_account:'',//支付宝账号
					alipay_name:'',//支付宝账号名称
				}
			}
		},
		onLoad(options) {
			this.params.wit_money = options.amount || 0
		},
		methods:{
			//提现 deposit
			doDeposit(){
				this.$api.deposit({
					...this.params
				}).then(res=>{
					console.log("提现",res);
					if(res.code == 200){
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.$mRouter.redirectTo({
								route:this.$mRoutesConfig.wallet
							});
						})
					}else{
						console.log("提现",res);
						this.$mUtils.toast(res.msg);
					}
				})
			},
			confirm(){
				if(!this.params.alipay_name){
					this.$mUtils.toast("请输入支付宝真实姓名");
					return;
				}
				if(!this.params.ali_account){
					this.$mUtils.toast("请输入支付宝账户");
					return;
				}
				
				//提现
				this.doDeposit()
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding: 30upx;
		background-color: #F9F9F9;
		width: 100%;
		min-height: calc(100vh - var(--window-top));
		.info-box{
			width: 100%;
			height: 780upx;
			background-color: #fff;
			border-radius: 12upx;
			padding: 0 40upx;
			box-sizing: border-box;
			flex-direction: column;
			justify-content: space-between;
			
			.title {
				height: 100upx;
				width: 100%;
				align-items: center;
			}
		}
	}
</style>
