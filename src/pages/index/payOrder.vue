<template>
	<view class="container pd-lr-30 have-fixed-bottom">

		<!-- 支付金额 -->
		<view class="census-box flex-column justify-content-center align-items-center">
			<text class="fn-sz-28 fn-cl-333 fn-bold margin-bottom-20">支付金额</text>
			<view class=" align-items-baseline">
				<text class="fn-sz-28 fn-cl-theme">￥</text>
				<text class="fn-sz-48 fn-cl-theme">{{totalFee}}</text>
			</view>
		</view>
		<!-- 支付金额 -->

		<!-- 优惠券 积分抵扣-->
		<view class="discount-box flex-column" v-if="orderType== 1">
			<view class="flex-between discount-item align-items-center" @tap="showCoupon">
				<view>
					<image class="image-sz-32 margin-right-20" :src="require('../../static/images/index/icon-coupon.png')" mode=""></image>
					<text class="fn-sz-24 fn-cl-333">优惠券</text>
				</view>
				<view>
					<text class=" fn-cl-999 fn-sz-24" v-if="couponList.length == 0">暂无可用优惠券</text>
					<image class="image-sz-32" :src="require('../../static/images/index/icon-narraw.png')" mode=""></image>
				</view>
			</view>
			<view class="flex-between discount-item align-items-center " @tap="useScore">
				<view>
					<image class="image-sz-32 margin-right-20" :src="require('../../static/images/index/icon-point.png')" mode=""></image>
					<text class="fn-sz-24 fn-cl-333">积分抵扣</text>
				</view>
				<view>
					<text class=" fn-cl-999 fn-sz-24 margin-right-20">可使用{{canUseScore}}积分 抵扣{{canDisPrice}}元</text>
					<image v-if="canUseScore > 0" class="image-sz-32" :src="isUseScore? require('../../static/images/index/icon-circle-theme.png'):require('../../static/images/index/icon-circle-gray.png')"
					 mode=""></image>
				</view>
			</view>
		</view>
		<!-- 优惠券 积分抵扣-->

		<!-- 支付方式 -->
		<view class="discount-box flex-column">
			<view class="flex-between discount-item align-items-center " @tap="setPayWay('balance')">
				<view>
					<image class="image-sz-32 margin-right-20" :src="require('../../static/images/index/icon-balance.png')" mode=""></image>
					<view class="">
						<text class="fn-sz-28 fn-cl-333 fn-bold ">余额支付</text>
						<text class="fn-sz-28 fn-cl-333 fn-bold " v-if="!isEnough">（账户余额不足）</text>
					</view>
				</view>
				<image class="image-sz-32" :src=" payWay == 'balance' ? require('../../static/images/index/icon-circle-theme.png') : require('../../static/images/index/icon-circle-gray.png')"
				 mode=""></image>
			</view>
			<view class="flex-between discount-item align-items-center " @tap="setPayWay('wxpay')">
				<view>
					<image class="image-sz-32 margin-right-20" :src="require('../../static/images/index/icon-wxpay.png')" mode=""></image>
					<text class="fn-sz-28 fn-cl-333 fn-bold ">微信支付</text>
				</view>
				<image class="image-sz-32" :src=" payWay == 'wxpay' ? require('../../static/images/index/icon-circle-theme.png') : require('../../static/images/index/icon-circle-gray.png')"
				 mode=""></image>
			</view>
			<view class="flex-between discount-item align-items-center " v-if=" ! $mUtils.checkIsWx()"  @tap="setPayWay('alipay')">
				<view>
					<image class="image-sz-32 margin-right-20" :src="require('../../static/images/index/icon-alipay.png')" mode=""></image>
					<text class="fn-sz-28 fn-cl-333 fn-bold ">支付宝支付</text>
				</view>
				<image class="image-sz-32" :src=" payWay == 'alipay' ? require('../../static/images/index/icon-circle-theme.png') : require('../../static/images/index/icon-circle-gray.png')"
				 mode=""></image>
			</view>
		</view>
		<!-- 支付方式 -->

		<view class="fixed-wrapper pd-lr-30 align-items-center">
			<solid-btn class="submit-btn" :txt="'确定'" @click="confirmPay"></solid-btn>
		</view>

		<uni-popup ref="coupon" :type="'bottom'" class="popup">
			<view class="flex-column margin-top-40 margin-bottom-20">

				<coupon-list :list="couponList" :current="coupon" @click="chooseCoupon"></coupon-list>
				<view class="pd-lr-30 align-items-center">
					<solid-btn class="submit-btn" :txt="'不使用优惠券'" @click="noCoupon"></solid-btn>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="pwd">
			<view class="flex-column margin-top-40 margin-bottom-20">
				<view class="pd-lr-30 input-pwd margin-bottom-70">
					<input type="number" maxlength="6" password v-model.trim="payPwd" placeholder="请输入支付密码" />
				</view>
				<view class="pd-lr-30 align-items-center">
					<solid-btn class="submit-btn" :txt="'确定'" @click="balancePay"></solid-btn>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import solidBtn from "@/components/common/SolidBtn.vue"
	import uniPopup from "@/components/common/uni-popup.vue"
	import couponList from "@/components/mine/CouponList.vue"
	export default {
		components: {
			solidBtn,
			uniPopup,
			couponList
		},
		data() {
			return {
				payWay: '', //支付方式
				orderType: 1, //1普通订单，2批发订单不能使用优惠券和积分
				totalFee: 0,
				feeBack:0,  //支付金额备份
				orderId: [],
				couponList: [], //可用优惠券
				canUseScore: 0, //可用积分
				canDisPrice: 0, //可抵金额
				isUseScore: false, //是否 使用积分抵扣
				coupon: {}, //选中的优惠券
				isEnough: false, // 余额是否充足
				isPwd: false, //是否设置支付密码
				payPwd: '', //支付密码
				
			}
		},
		onLoad(options) {
			this.orderType = options.orderType || 1; //1普通订单，2批发订单不能使用优惠券和积分
			this.orderId = options.orderId && JSON.parse(options.orderId) || [];
			this.feeBack = options.totalFee || 0;
			this.totalFee = this.feeBack;
			
			if(this.orderType == 1){
				//获取可使用积分和可使用优惠券
				this.getScoreCoupon();
			}
			

			//判断余额是否充足&查询是否绑定手机号&是否设置支付密码
			this.checkInfo('balance');
			this.checkInfo('pay_pwd');
		},
		onShow() {
			//获取可使用积分和可使用优惠券
			// this.getScoreCoupon();
			//获取选中的优惠券
			// this.coupon=this.$store.getters.getCoupon;
			// console.log("获取选中的优惠券",this.coupon);



		},
		methods: {
			//选择支付方式
			setPayWay(payWay) {
				if (payWay == 'balance' && this.totalFee > this.balance) {
					this.$mUtils.toast("账户余额不足");
					return;
				} else if (!this.isPwd && payWay == 'balance' ) {
					this.$mUtils.toast("请先设置支付密码");
					return;
				}
				this.payWay = payWay;
			},
			//判断余额是否充足&查询是否绑定手机号&是否设置支付密码 
			checkInfo(type) {
				this.$api.checkInfo({
					key: type, //查询余额‘balance’,查询是否绑定手机号‘mobile’，是否设置支付密码pay_pwd
					compare_val: this.totalFee
				}).then(res => {
					if (res.code == 200) {
						if (type == 'balance') {
							this.isEnough = res.data.check;
						} else if (type == 'pay_pwd') {
							this.isPwd = res.data.check;
						}

					} else {
					console.log("判断余额是否充足&是否设置支付密码", res);
					}
				})
			},
		
			//显示 优惠券 列表
			showCoupon() {
				this.$refs.coupon.open();
			},
			//不使用优惠券
			noCoupon() {
				console.log("不使用优惠券");
				this.totalFee -=0;
				if(this.coupon && this.coupon.coupon_money){
					console.log("不使用优惠券", this.coupon.coupon_money);
					this.totalFee += (this.coupon.coupon_money - 0);
				}
				this.coupon = {};
				// this.computeSum();
				this.$refs.coupon.close();
			},
			//选择 优惠券
			chooseCoupon(item) {
				console.log("item 选择 优惠券", item.coupon_money);
				if(item.id == this.coupon.id) return ;  //被点击的优惠券 是使用状态
				this.coupon = item;
				// this.totalFee = this.fee;
				// if (item && item.coupon_money) {
				// 	//计算金额
				// 	let fee = this.totalFee - 0;
				// 	fee -= (item.coupon_money - 0)
				// 	// this.summary(this.coupon.coupon_money)
				// 	this.totalFee = (fee - 0).toFixed(2);
				// }
				if(this.coupon && this.coupon.coupon_money){
					this.totalFee -= this.coupon.coupon_money;
				}
				this.computeSum();
				this.$refs.coupon.close();
			},
			
			computeSum(){
				if( !this.coupon && !this.isUseScore){
					this.totalFee = this.feeBack;
				}
				this.totalFee = (this.totalFee - 0).toFixed(2)
			},
			
			useScore() {
				if(this.canUseScore <= 0) return;
				
				this.isUseScore = !this.isUseScore;
				// let fee = this.totalFee - 0;
				// if (this.isUseScore) {
				// 	fee -= (this.canDisPrice - 0);
				// } else {
				// 	fee += (this.canDisPrice - 0);
				// }
				
				// this.fee = (fee - 0).toFixed(2)
				this.totalFee -= 0;
				if(this.isUseScore){
					this.totalFee -= this.canDisPrice
				}else {
					this.totalFee += (this.canDisPrice - 0) ; //(- 0);
				}
				this.computeSum();
			},



			//获取可使用积分和可使用优惠券
			getScoreCoupon() {
				this.$api.getScoreCoupon({
					order_ids: this.orderId
				}).then(res => {
					console.log('获取可使用积分和可使用优惠券', res);
					if (res.code == 200) {
						this.couponList = res.data.my_coupon;

						this.canUseScore = res.data.score.total_use_gold_beans
						this.canDisPrice = res.data.score.score_dec_money;
						this.useScoreList = res.data.score.result; //订单号对应可用 积分
					} else {

					}
				})
			},
			//点击确定
			confirmPay() {
				this.payArr = [];

				if (this.isUseScore) { //使用积分
					this.useScoreList.forEach(item=>{
						this.payArr.push({
							order_id: item.order_id,
							can_use_score: item.can_use_score
						})
					})
					
				} else {
					this.orderId.forEach(id => {
						this.payArr.push({
							order_id: id,
							use_score: 0
						})
					})
				}
				console.log("”-----“",this.payArr);
				



				// [{"order_id": "1","use_score": 15},{"order_id": "2","use_score": 15}]
				if (!this.payWay) {
					this.$mUtils.toast("请选择支付方式");
					return;
				}

				if (this.payWay == 'balance') { //余额支付
					this.$refs.pwd.open()
				}else if(this.payWay == 'alipay' ){
					this.doPay();
				}else if(this.payWay == 'wxpay'){
					if(this.$mUtils.checkIsWx()){
						console.log("公众号支付");
						this.$mUtils.toast("该功能暂未开放,请选择其他支付方式");
					}else{
						this.doPay();  //H5 微信支付
					}
					
				}
			},
			//余额支付
			balancePay() {
				if (!this.payPwd) {
					this.$mUtils.toast("请输入支付密码");
					return;
				}
				
				
				this.$api.payByBalance({
					pay_arr: this.payArr, //商品信息，例如：[{"order_id": "1","use_score": 15},{"order_id": "2","use_score": 15}]
					pay_pwd: this.payPwd, //					支付密码
					coupon_id: this.coupon.id, //优惠券id

				}).then(res => {
					console.log("余额支付", res);
					if (res.code == 200) {
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.$mRouter.redirectTo({
								route: this.$mRoutesConfig.order
							})
						})
						
					} else {
						this.$mUtils.toast(res.msg);
					}
				})
			},
		
			//微信支付宝支付  pay
			doPay(){
				this.$api.pay({
					pay_arr: this.payArr, //商品信息，例如：[{"order_id": "1","use_score": 15},{"order_id": "2","use_score": 15}]
					coupon_id: this.coupon.id, //优惠券id
					pay_type:this.payWay, //	wxpay,alipay
					client: 'wap', //app,pc,xcx,wap
				}).then(res=>{
					console.log("微信支付宝支付",res);
					if(res.code == 200){
						if(this.payWay == 'alipay'){
							console.log("res.data.str------",res.data.str);
							this.aliPay(res.data);
							//https://openapi.alipay.com/gateway.do?
							// window.location.href = 'https://m.alipay.com/Gk8NF23?'+res.data.str;
						}else if(this.payWay == 'wxpay'){
							console.log("微信----支付",res);
							window.location.href=res.data.mweb_url;
				
						}
						
						
					}else{
						this.$mUtils.toast(res.code)
					}
				})
			},
			aliPay(data) {
			    const form = data;
			    // deleteExisting('#alipay'); // 判断之前是否插入过#alipay
			    const div = document.createElement('div');
			    div.id = 'alipay';
			    div.innerHTML = form;
			    document.body.appendChild(div);
			    document.querySelector('#alipay').children[0].submit(); // 执行后会唤起支付宝
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		min-height: 100vh;
		background-color: #F9F9F9;
		padding-top: 20upx;
		width: 100%;

		.census-box {
			width: 100%;
			height: 200upx;
			background-color: #fff;

		}

		.discount-box {
			width: 100%;
			background-color: #fff;
			margin: 20upx auto;

			.discount-item {
				width: 100%;
				height: 100upx;
				padding: 0 20upx;
				box-sizing: border-box;
			}
		}

		.popup {
			/deep/.uni-popup__wrapper-box {
				border-radius: 20upx 20upx 0 0;
			}
			
		}

		.input-pwd {
			height: 100upx;
			align-items: center;

			input {
				display: block;
				width: 100%;
				height: 100upx;
				line-height: 100upx;
				border-bottom: 2upx solid #000000;
			}
		}

	}
</style>
