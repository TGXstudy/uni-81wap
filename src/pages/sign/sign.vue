<template>
	<!-- 签到 -->
	<view class="container align-items-center">
		<view class="navigator-bar flex-between">
			<image class="image-sz-36 margin-left-20" :src="require('../../static/images/sign/icon-back.png')" @tap="goBack"></image>
			<view class="sign-intro" @tap="goPage('richText',{title:'签到说明',type:3})">
				<text class="fn-cl-fff fn-sz-28">签到说明</text>
			</view>
		</view>
		<view class="calendar-warpper">
			<uni-calendar class="sign-calender" :insert="true" :selected="signList"></uni-calendar>


		</view>
		<view class="sign-btn" @tap="doSign">
			<image :src="'/static/images/sign/icon-sign.png' | imgUrl"></image>
		</view>
		<uni-popup ref="signSuccess" class="popup">
			<view class="success-box flex-column">
				<view class="flex-column align-items-center">
					<text class="fn-sz-40 fn-cl-fff margin-bottom-20">签到成功</text>
					<text class="fn-sz-40 fn-cl-fff">获得 {{score}}积分</text>
				</view>
				
				<view class="btn-box" @tap="closeSuccess">
					<border-btn :txt="'我知道了'"></border-btn>
				</view>
			</view>
		</uni-popup>

	</view>
</template>

<script>
	import uniPopup from "@/components/common/uni-popup.vue"
	import borderBtn from "@/components/common/BorderBtn.vue"
	import uniCalendar from "@/components/common/uni-calendar/uni-calendar.vue"
	export default {
		components: {
			uniPopup,
			borderBtn,
			uniCalendar
		},
		data() {
			return {
				signList: [],
				score:0, //签到获得的积分
			}
		},
		onLoad() {
			
			//本月签到列表 
			this.getSign();
			
		},
		methods: {
			goBack() {
				this.$mRouter.back();
			},
			
			closeSuccess() {
				this.$refs.signSuccess.close();
				//本月签到列表
				this.getSign();
			},
			
			//点击签到
			doSign(){
				this.$api.sign().then(res=>{
					if(res.code == 200){
						this.score=res.data.score;
						this.$refs.signSuccess.open();
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			},
			//本月签到列表
			getSign(){
				this.$api.getSign().then(res=>{
					console.log("本月签到列表",res);
					if(res.code == 200){
						let _date=new Date();
						let _dateStr=_date.getFullYear() + '-' + (_date.getMonth()+1) + '-';
						res.data.forEach(item=>{
							if(item.score>0){
								this.signList.push({
									date: _dateStr+item.time,
									info: "+"+item.score,
								})
							}
							
						})
						console.log(this.signList);
					}else{
						console.log("本月签到列表",res);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		min-height: calc(100vh - var(--window-top)) ;
		background-size: cover;
		background-image: url(../../static/images/sign/bg-sign.png);
		background-repeat: no-repeat;

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

		.calendar-warpper {
			width: 100%;
			height: 1000upx;
			padding: 100upx 30upx;

			// box-sizing: border-box;
			.sign-calender {
				width: 100%;
				/deep/.uni-calendar__header-btn-box{
					display: none;
				}
				/deep/ .uni-calendar__content {
					width: 100%;
					flex-direction: column;
				}

				/deep/ .uni-calendar__box {
					width: 100%;
					flex-direction: column;
				}

				/deep/ .uni-calendar-item--isDay {
					background-color: var(--theme-color);

					.uni-calendar-item--isDay-text {
						color: #fff;
					}

				}

				/deep/ .uni-calendar-item--isDay-text {
					color: var(--theme-color);
				}

				/deep/ .uni-calendar-item--checked {
					background-color: var(--theme-color);
				}
			}



		}

		.sign-btn {
			width: 200upx;
			height: 200upx;
			image{
				width: 200upx;
				height: 200upx;
			}

		}

		.popup {
			/deep/.uni-popup__wrapper-box {
				background-color: transparent;
				width: 520upx;
			}
		}

		.success-box {
			width: 100%;
			height: 400upx;
			background-size: 100%;

			background-image: url(../../static/images/sign/bg-success.png);
			justify-content: space-around;
			align-items: center;

			.btn-box {
				width: 400upx;
				height: 80upx;
				margin-top: 60upx;

				/deep/.border-btn {
					height: 100%;
				}
			}
		}
	}
</style>
