<template>
	<!-- 抽奖 -->
	<view class="container align-items-center">
		<view class="navigator-bar flex-between">
			<image class="image-sz-36 margin-left-20" :src="require('../../static/images/sign/icon-back.png')" @tap="goBack"></image>
			<view class="sign-intro" @tap="goPage('lotteryRecord')">
				<text class="fn-cl-fff fn-sz-28">中奖记录</text>
			</view>
		</view>
		<view class="lottery-warpper">
			<!-- :animation='animationData' -->
			<view class="turntable-wrapper" :style="rotateAnimate">
				<view class="lottery-item" v-for="(item,idx) in giftList" :key="idx" :class="['lottery-item-'+(idx+1)]">{{item.gift_name}}</view>
			</view>
			<image @tap="doLottery" class="image-narraw" :src="'/static/images/sign/image-narraw.png' | imgUrl " mode=""></image>
		</view>
		<view class="rule-wrapper flex-column">
			<text class="fn-sz-24  fn-cl-fff line-height-80">活动规则</text>
			<text class="fn-sz-24  fn-cl-fff">{{rule}}</text>
		</view>
		<!-- bg-suctop.png -->

		<uni-popup ref="lottery" class="popup">
			<view class="success-box flex-column">
				<view class="tips-box">
					<text class="fn-sz-28 fn-cl-theme">
						中奖提示
					</text>
				</view>
				<view class="flex-column align-items-center content-box">
					<view class="flex-column align-items-center">
						<view class="margin-bottom-20">
							<text class="fn-sz-32 fn-cl-333">恭喜获得 </text>
							<text class="fn-sz-32 fn-cl-theme">
								{{gift.gift_type == '1' ? gift.gift_score + '积分': gift.gift_name }}
								<!-- 商品xxx -->
							</text>
						</view>
						<text class=" fn-cl-999 fn-sz-24">
							{{gift.gift_type == '1' ? '积分已发放至您的积分账户' : '请选择收货地址后等待平台发放'}}

						</text>
						<!--  xxx积分 我知道了 -->
					</view>

					<view class="btn-box">
						<solid-btn :txt="gift.gift_type == '1'?'我知道了':'选择收货地址'" @click="tapBtn"></solid-btn>
					</view>
				</view>


			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/common/uni-popup.vue"
	import solidBtn from "@/components/common/SolidBtn.vue"
	export default {
		components: {
			uniPopup,
			solidBtn
		},
		data() {
			return {
				animationData: {},
				lotteryIdx: 1, //抽中的奖品
				rotateAnimate: '',
				initDeg: 0,
				giftList: [], //奖品
				rule: '', //活动规则
				gift: {}, //得到的奖品
				canTap: true, //防止多次点击
			}
		},
		onLoad() {
			// 获取抽奖的奖品 
			this.getGift()

		},
		methods: {
			// 获取抽奖的奖品 
			getGift() {
				this.$api.getGift().then(res => {
					console.log("获取抽奖的奖品", res);
					if (res.code == 200) {
						this.giftList = res.data.gift;
						this.rule = res.data.lottery_describe;
					} else {
						console.log("获取抽奖的奖品", res);
					}
				})
			},
			goBack() {
				console.log("返回");
				this.$mRouter.back();
			},
			// 点击 我知道了 或 选择收货地址
			tapBtn() {
				
				if (this.gift.gift_type == '1') {

				} else {
					this.goPage("address", {
						fromPage: 'gift',
						id:this.gift.id
					})
				}
				this.$refs.lottery.close()
			},
			//点击抽奖
			doLottery() {
				
				// // 0 6
				// let index= Math.floor(Math.random()*6) 
				// console.log(index,this.giftList[index].gift_name);
				// this.rotateTable(index)
				// return;
				
				if (!this.canTap) return;
				this.canTap = false;
				
				this.$api.doLottery().then(res => {
					console.log("点击抽奖", res);
					if (res.code == 200) {
						let id = res.data.gift_id;
						this.gift = res.data; //得到的奖品
						//根据id 得到对应数组索引
						this.giftList.forEach((item, index) => {
							// console.log('//根据id 得到对应数组索引');
							if (item.id == id) {
								console.log('//根据id 得到对应数组索引', index);
								this.rotateTable(index).then(() => {
									this.$refs.lottery.open();
								});

							}
						})
						
						
					} else if (res.code == 210) {
						
						if(res.data.score == -1){
							this.$mUtils.toast(res.msg);
						}else{
							this.rotateTable(5).then(() => {
								this.$mUtils.toast(res.msg);
							});
						}
						
						
					} else {
						this.$mUtils.toast(res.msg);
					}

				}).finally(() => {
					this.canTap = true;
				})


			},
			rotateTable(index) {
				return new Promise((resolve)=>{
					let deg = 0;  
					deg = deg + (360 - this.initDeg % 360) + (360 * 8 - index * (360 / 6)) + 1;
					console.log("this.initDeg+deg----", this.initDeg + deg,  this.initDeg);
					this.rotateAnimate = `transform:rotate(${this.initDeg+deg}deg); transition: all 4s ease;`
					this.initDeg += deg;
					var tid=setTimeout(()=>{
						resolve();
						clearTimeout(tid);
					},5000)
					
					// console.log("this.initDeg", this.initDeg);
				});
				

			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: 100vh;
		background-size: contain;
		background-image: url(../../static/images/sign/bg-lottery.png);

		.navigator-bar {
			width: 100%;
			height: 80upx;
			align-items: center;

			.image-sz-36 {
				width: 36upx;
				height: 36upx;
			}

			.sign-intro {
				background-color: rgba(0, 0, 0, 0.2);
				width: 170upx;
				height: 60upx;
				justify-content: center;
				align-items: center;
				border-radius: 30upx 0px 0px 30px;
			}
		}




		.lottery-warpper {
			width: 800upx;
			height: 800upx;
			justify-content: center;
			align-items: center;
			position: relative;

			.image-narraw {
				width: 120upx;
				height: 132upx;
				position: absolute;
				top: calc(50% - 60upx);
				left: calc(50% - 66upx);
			}

			.turntable-wrapper {
				width: 600upx;
				height: 600upx;
				background-size: 100% 100%;
				background-image: url(../../static/images/sign/bg-turntable.png);
				position: relative;
				display: block;

				.lottery-item {
					position: absolute;
					top: 0;
					left: 0;
					color: #C8983C;
					font-size: 24upx;
					width: 600upx !important;
					height: 600upx;
					transform-origin: 50% 50%;
					padding-top: 130upx;
					box-sizing: border-box;
					justify-content: center;
				}

				.lottery-item-1 {
					transform: rotate(0);
				}

				.lottery-item-2 {
					transform: rotate(60deg);
				}

				.lottery-item-3 {
					transform: rotate(120deg);
				}

				.lottery-item-4 {
					transform: rotate(180deg);
				}

				.lottery-item-5 {
					transform: rotate(240deg);
				}

				.lottery-item-6 {
					transform: rotate(300deg);
				}

			}
		}

		.rule-wrapper {
			padding: 0 60upx;
			justify-content: center;
			align-items: center;
		}

		.popup {
			/deep/.uni-popup__wrapper-box {
				background-color: transparent;
			}
		}

		.success-box {
			width: 100%;
			height: 500upx;
			background-size: 100%;
			justify-content: space-around;
			align-items: center;

			.tips-box {
				width: 309upx;
				height: 100upx;
				background-color: transparent;
				position: relative;

				&>text {
					display: block;
					position: absolute;
					top: 60upx;
					width: 100%;
					height: 100%;
					text-align: center;
					padding-top: 15upx;
					box-sizing: border-box;
					background-size: cover;
					background-image: url(../../static/images/sign/bg-suctop.png);
				}
			}

			.content-box {
				width: 100%;
				height: 440upx;
				background-color: #fff;
				border-radius: 8upx;
				padding-top: 60upx;
				justify-content: space-around;
			}

			.btn-box {
				width: 400upx;
				height: 80upx;
				margin-bottom: 60upx;

				/deep/.border-btn {
					height: 100%;
				}
			}
		}
	}
</style>
