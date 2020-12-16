<template>
	<view class="amount-box">
		<view class="flex-column">
			<view class="title">
				<text v-if="type == 'rechange'" class="fn-sz-28 fn-cl-333"> 充值金额</text>
				<text v-else-if=" type == 'cashout'" class="fn-sz-28 fn-cl-333"> 提现金额</text>

			</view>
			<view class="input-box">
				<text class="fn-cl-333 fn-bold">￥</text>
				<input class="flex-1" type="digit" v-model.trim="amount" />
				<view v-if=" type == 'cashout'" class="cash-all" @tap="cashAll">
					<text class="fn-sz-28 fn-cl-theme">全部</text>
				</view>
			</view>
			<view v-if=" type == 'cashout' && amount" class="">
				<text class=" fn-sz-28 fn-cl-999">提现手续费：</text>
				<text class=" fn-sz-28 fn-cl-theme">￥{{service}}</text>
			</view>
		</view>

		<solid-btn class="margin-bottom-20" :txt="'下一步'" @click="nextStep"></solid-btn>


		<uni-popup ref="popup" :type="'bottom'" class="popup">
			<view class="way-popup flex-column pd-lr-30">
				<image class="icon-close image-sz-48" :src="require('../../static/images/index/icon-close.png')" @tap="closePopup"></image>
				<view class="amount-title">
					<text class="fn-sz-36">￥</text>
					<text class="fn-sz-72">{{amount}}</text>
				</view>
				<view class="width-100-percent line-height-80">
					<text v-if="type == 'rechange'" class="fn-sz-32 fn-cl-333 fn-bold"> 充值方式</text>
					<text v-else-if=" type == 'cashout'" class="fn-sz-32 fn-cl-333 fn-bold"> 提现至 </text>

				</view>
				
				<view class="flex-between discount-item align-items-center" v-if="type == 'cashout' && $mUtils.checkIsWx() || type=='rechange'" @tap="getAmountType('wxpay')">
					<view class="align-items-center">
						<image class="image-sz-48 margin-right-20" :src="require('../../static/images/index/icon-wxpay.png')" mode=""></image>
						<text class="fn-sz-28 fn-cl-333 fn-bold ">微信支付</text>
					</view>
					<image v-if="amountType == 'wxpay'" class="image-sz-32" :src="require('../../static/images/index/icon-circle-theme.png')"
					 mode=""></image>
					<image v-else class="image-sz-32" :src="require('../../static/images/index/icon-circle-gray.png')" mode=""></image>
				</view>
				<view class="flex-between discount-item align-items-center " v-if="!$mUtils.checkIsWx()"  @tap="getAmountType('alipay')">
					<view class="align-items-center">
						<image class="image-sz-48 margin-right-20" :src="require('../../static/images/index/icon-alipay.png')" mode=""></image>
						<text class="fn-sz-28 fn-cl-333 fn-bold ">支付宝支付</text>
					</view>
					<image v-if="amountType == 'alipay'" class="image-sz-32" :src="require('../../static/images/index/icon-circle-theme.png')"
					 mode=""></image>
					<image v-else class="image-sz-32" :src="require('../../static/images/index/icon-circle-gray.png')" mode=""></image>
				</view>
				<!-- 空白样式 -->
				<view style="width: 100%; height: 200upx;"> </view>
				<!-- 空白样式 -->
				<solid-btn class="margin-bottom-20" :txt="'确定'" @click="confirm"></solid-btn>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import solidBtn from "@/components/common/SolidBtn.vue"
	import uniPopup from "@/components/common/uni-popup.vue"
	export default {
		components: {
			solidBtn,
			uniPopup
		},
		props: {
			type: {
				type: String
			},
			percent: {
				type: [Number, String]
			}
		},
		data() {
			return {
				amountType: 'alipay', //提现方式 或 充值方式
				amount: '', //提现或充值 金额
				service: 0, //手续费
			}
		},
		watch: {
			amount(val) {
				console.log("this.precent", this.percent);

				this.service = (val * (this.percent - 0) / 100).toFixed(2);
				return val;
			}
		},
		methods: {
			nextStep() {
				if (!this.amount) {
					this.$mUtils.toast("请输入金额");
					return;
				}
				
				if (this.amount == 0) {
					this.$mUtils.toast("输入金额不能为0");
					return;
				}

				if (this.type == 'cashout') {
					//判断余额是否充足
					this.checkBalance().then(res => {
						this.$refs.popup.open();
					}, res => {

					});

				} else {
					this.$refs.popup.open();
				}


			},
			//全部提现
			cashAll() {

				this.$api.getPointWallet({
					type: 'balance',
					ioe: 'in'
				}).then(res => {
					if (res.code == 200) {
						this.amount = res.data.has - 0;
					} else {
						console.log("全部提现", res);
					}
				})

			},
			//判断余额是否充足
			checkBalance() {

				return new Promise((resolve, reject) => {
					this.$api.checkInfo({
						key: 'balance',
						compare_val: this.amount - 0
					}).then(res => {
						if (res.code == 200) {
							resolve();
						} else {
							this.$mUtils.toast(res.msg);
							console.log("判断余额是否充足", res);
							reject();
						}
					})
				})

			},

			closePopup() {
				this.$refs.popup.close();
			},
			//
			getAmountType(type) { //提现方式 或 充值方式
				this.amountType = type;
			},
			//点击 弹窗 确定
			confirm() {
				if (this.type == 'cashout') {

					if (this.amountType == 'alipay') { //提现到支付宝, 跳转填写支付宝信息
						this.$mRouter.redirectTo({
							route: this.$mRoutesConfig.aliInfo,
							query: {
								amount: this.amount
							}
						})
					}else{  //公众号 微信提现
						console.log("公众号 微信提现");
					}

				} else if (this.type == 'rechange') {
					//充值
					this.doRechange();

				}



			},
			//充值
			doRechange() {
				this.$api.recharge({
					pay_type: this.amountType, //支付类型，alipay，wxpay
					total_fee: this.amount, //			充值金额
					openid: '', //				openid微信支付必填
				}).then(res => {
					console.log("充值", res);
					if (res.code == 200) {
						if (this.amountType == "alipay") {
							this.aliPay(res.data);
							this.$refs.popup.close();
						} else if (this.amountType == 'wxpay') {
							console.log('微信支付');
							if (this.$mUtils.checkIsWx()) {
								console.log("公众号支付");
								this.$mUtils.toast("该功能暂未开放,请选择其他支付方式");
							} else {
								//H5 微信支付
								window.location.href=res.data.mweb_url;
							}

						}
					} else {
						console.log("充值 !200", res);
					}
				})
			},

			aliPay(data) {
				const form = data;
				// deleteExisting('#alipay'); // 判断之前是否插入过#alipay
				console.log("判断之前是否插入过#alipay");
				let alipayDom = document.querySelector('#alipay');
				if (alipayDom) {
					document.body.removeChild(alipayDom)
				}
				const div = document.createElement('div');
				div.id = 'alipay';
				div.innerHTML = form;
				document.body.appendChild(div);
				document.querySelector('#alipay').children[0].submit(); // 执行后会唤起支付宝
			}

			// deleteExisting('#alipay'); // 判断之前是否插入过#alipay
		}
	}
</script>

<style lang="scss" scoped>
	.amount-box {
		width: 100%;
		height: 450upx;
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

		.input-box {
			width: 100%;
			height: 140upx;
			align-items: baseline;

			&>text {
				font-size: 72upx;
				margin-right: 20upx;
			}

			&>input {
				display: block;
				width: 100%;
				height: 100%;
			}

			.cash-all {
				width: 120upx;
				height: 100%;
				align-items: center;
				justify-content: flex-end;

				&>text {
					text-align: center;
					line-height: 50upx;
					width: 100upx;
					height: 50upx;
					border-radius: 24upx;
					background-color: #FAEEEE;
				}
			}
		}

		.popup {
			/deep/.uni-popup__wrapper-box {
				border-radius: 20upx 20upx 0 0;
			}
		}

		.way-popup {
			position: relative;

			.icon-close {
				position: absolute;
				right: 30upx;
				top: 30upx;
			}

			.amount-title {
				margin-top: 100upx;
				width: 100%;
				height: 100upx;
				justify-content: center;
				align-items: baseline;

			}

			.discount-item {
				width: 100%;
				height: 100upx;
				align-items: center;
				box-sizing: border-box;
			}

		}
	}
</style>
