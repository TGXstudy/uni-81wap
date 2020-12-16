<template>
	<!-- 李钟恒 -->
	<view class="conbox">
		<view class="container">
			<!-- 背景 -->
			<image class="cont" :src="'/static/imgs/own/luckdraw/bestlucky.png' | imgUrl"></image>
			<view class="main">
				<view class="canvas-container">
					<view
						:animation="animationData"
						class="canvas-content"
						id="turntable"
					>
						<image class="canvas-content_bg" :src="'/static/imgs/own/luckdraw/bg_circle.png' | imgUrl"></image>
						<view class="canvas-list">
							<view class="canvas-item" :style="[{zIndex:index2}]" v-for="(iteml,index2) in awardsList" :key="index2">
								<view class="canvas-item-text" :style="[{transform:'rotate('+iteml.turn+')'}]">
									<text>{{iteml.award}}</text>
								</view>
							</view>
						</view>
					</view>
					<!-- 抽奖按钮 -->
					<view class="canvas-btn" :class="btnDisabled">
						<image class="canvas-btn-pic" :src="'/static/imgs/own/luckdraw/pointer.png' | imgUrl"></image>
						<view class="canvas-btn-handle" @tap="handleReward"></view>
					</view>
				</view>
			</view>
			<view class="winning-list">
				<image class="bg-list" :src="'/static/imgs/own/luckdraw/bg_list.png' | imgUrl"></image>
				<swiper class="winning-list-swiper" autoplay :interval="3000" circular vertical>
					<swiper-item class="list-swiper-item" v-for="(item,index) in winList" :key="index">
						<view class="winning-item" v-for="(val,_index) in item" :key="_index">
							<view class="winning-item-l">
								<text>恭喜</text>
								<text class="item-text">{{val.member_nick_name}}</text>
								<text class="item-text">{{val.member_mobile}}</text>
							</view>
							<view class="winning-item-r">
								<text class="winning-item-r-text">获得{{val.prize_name}}</text>
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<uni-popup type="center" ref="popup" @close="clearAnimation">
			<view class="popup-win">
				<image class="popup-win-bg" :src="'/static/imgs/own/luckdraw/bg_winning.png' | imgUrl"></image>
				<image class="popup-win-close" @tap="$refs.popup.close()" :src="'/static/imgs/own/luckdraw/icon_close.png' | imgUrl"></image>
				<view class="popup-win-body" v-if="winName == ''">
					<view class="popup-win-body-title">很遗憾</view>
					<view class="popup-win-body-content">
						谢谢参与，再接再厉
					</view>
				</view>
				<view class="popup-win-body" v-else>
					<view class="popup-win-body-title">恭喜您获得</view>
					<view class="popup-win-body-content">
						{{winName}}
					</view>
				</view>
			</view>
		</uni-popup>
		<image class="win-bg" :src="'/static/imgs/own/luckdraw/bg_winning.png' | imgUrl"></image>
	</view>
</template>

<script>
	import UniPopup from "@/components/tui/uni-popup/uni-popup";
	export default {
		data() {
			return {
				awardsConfig: {
					prize_set: [
						{
							"id": 4,
							"prize_type": 1,        //1积分  2经验   3现金
							"name": "积分1点",        //名称
						},
						{
							"id": 5,
							"prize_type": 1,        //1积分  2经验   3现金
							"name": "积分2点",        //名称
						},
						{
							"id": 6,
							"prize_type": 1,        //1积分  2经验   3现金
							"name": "积分1点",        //名称
						},
					], //奖品列表 
				},
				awardsList: {},		//奖品列表
				animationData: {},	//动画数据
				btnDisabled: '',	//按钮是否禁用
				thanksarr: [], //存储谢谢参与的索引
				chance: 0,		//免费抽奖次数
				winName: "",	//中间产品名
				winList: [],	//中奖名单
			}
		},
		components: {
			UniPopup
		},
		onLoad() {
			// 获取奖品列表
			this.initdata()
			this.getWinningList()
		},
		methods: {
			// 初始化抽奖数据
			initdata(){
				this.$api.getDrawSet()
				.then(res=>{
					console.log(res,"积分抽奖配置");
					if(res.code === 1) {
						// 设置data及次数
						this.awardsConfig = res.data;
						//设置免费次数
						this.chance = res.data.user_free_draw.have_time - res.data.user_free_draw.used_time;
						
						// this.chance = 9;
						// // 获取奖品的个数
						let awarrlength = this.awardsConfig.prize_set.length
						// push 谢谢参与奖项
						for (let i = 0; i <= 15-(awarrlength*3); i++) {
							if (i % 3 == 0) {
								console.log(i,"iiii");
								this.thanksarr.push(i)
								this.awardsConfig.prize_set.splice(i, 0, {
									name: '谢谢参与',
									prize_type: 0
								});
							}
						}
						 // 为每一项追加index属性
						this.awardsConfig.prize_set.forEach(function(element, index) {
							element.index = index
						})
										
						// // 画转盘
						this.drawAwardRoundel();
					}
				})
			},
			//画抽奖圆盘  
			drawAwardRoundel() {
				// 拿到奖品列表
				let awards = this.awardsConfig.prize_set;
				let awardsList = [];
				// 每份奖品所占角度
				let turnNum = 1 / awards.length * 360; // 文字旋转 turn 值  
				// 奖项列表  
				for (let i = 0; i < awards.length; i++) {
					awardsList.push({
						turn: i * turnNum + 'deg', //每个奖品块旋转的角度
						lineTurn: i * turnNum + turnNum / 2 + 'deg', //奖品分割线的旋转角度
						award: awards[i].name, //奖品的名字,
						prize_type: awards[i].prize_type,
						id:awards[i].prize_type,
					});
				}
				// this.btnDisabled = this.chance ? '' : 'disabled';
				this.awardsList = awardsList;
			},
			// 点击抽奖按钮
			handleReward() {
				console.log(this.chance);
				// 是否拥有免费抽奖次数
				if (this.chance <= 0) {
					uni.showModal({
						title: `本次抽奖消耗${this.awardsConfig.draw_use_score}积分`,
						confirmColor: "#FF540C",
						success:(res)=>{
							if (res.confirm) this.playReward();
						}
					})
				} else {
					uni.showModal({
						title: `您有${this.chance}次免费抽奖机会!`,
						confirmColor: "#FF540C",
						success:(res)=>{
							if (res.confirm) this.playReward();
						}
					})
				}
			},
			//发起抽奖  
			playReward() {
				// this.runDeg = 60*Math.random()
				// 抽奖接口
				this.$api.scoreDraw()
				.then(res=>{
					console.log(res,"中奖消息");
					if(res.code === 1) {
						let data = res.data;
						let awardIndex = 0;	//中奖index，0为谢谢参与
						this.awardsList.forEach((element, index)=>{
							if (element.award == data.name) {
								awardIndex = index
							}
						})
						
						//设置旋转时长及周数
						let awardsNum = this.awardsConfig.prize_set;
						let runNum = 4; //旋转8周 
						let duration = 4000; //时长
					
						// 旋转角度  
						this.runDeg = this.runDeg || 0;
						let preDeg = this.runDeg;
						this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - awardIndex * (360 / awardsNum.length)) +1;
						
						//创建动画  
						if(process.env.VUE_APP_PLATFORM == 'h5'){
							// document.styleSheets[0]
							document.getElementById('turntable').style='animation:rotate_before 4s 0ms ease forwards;'
							if(document.styleSheets[0].cssRules.length>0){
								Array.from(document.styleSheets[0].cssRules).forEach(function(element,index){
									if(element.name == 'rotate_before'){
										// 删除上次插入的动画
										document.styleSheets[0].deleteRule(index)
									}
								})
							}
							
							// 插入定义的动画
							document.styleSheets[0].insertRule("@keyframes rotate_before{from{ transform: rotate("+preDeg+"deg); }to{ transform: rotate("+this.runDeg+"deg);}}",8);
							
						}else{
							let animationRun = uni.createAnimation({
								duration: duration,
								timingFunction: 'ease'
							})
							animationRun.rotate(this.runDeg).step();
							this.animationData = animationRun.export();
						}
						this.btnDisabled = 'disabled';

						// 中奖提示  
						let awardsConfig = this.awardsConfig;
						let awardType = awardsConfig.prize_set[awardIndex].prize_type;
						this.chance = this.chance - 1;
						if (awardType != 0) {
							setTimeout(()=>{
								this.winName = awardsConfig.prize_set[awardIndex].name;
								this.$refs.popup.open();
								this.btnDisabled = '';
								// 中奖实体商品
								if(awardType == 2) {
									this.$mUtils.toast("恭喜您抽中实体商品！请保持手机畅通，等待工作人员与您联系。",4000)
								}
							}, duration);
						} else {
							setTimeout(()=>{
								this.winName = '';
								this.$refs.popup.open();
								this.btnDisabled = '';
							}, duration);
						}
					}
				})
			},
			// 获取获奖列表
			getWinningList() {
				this.$api.getPrizeList({
					page: 1,
					page_size: 20
				})
				.then(res=> {
					console.log(res,"获奖列表");
					if(res.code === 1) {
						let arr = [];
						for (var i = 0; i < res.data.data.length; i+=5) {
							arr.push(res.data.data.slice(i,i+5));
						}
						arr = arr.map(item=> {
							if(item.length<5) {
								item = item.concat(arr[0]);
								item = item.slice(0,5)
								return item
							} else {
								return item;
							}
						})
						this.winList = arr;
					}
				})
			},
			// 清除动画
			clearAnimation() {
				document.getElementById('turntable').style='';
			}
		}

	}
</script>
<style scoped lang="scss">
	.win-bg {
		position: fixed;
		left: -2000upx;
	}
	.conbox {
		width: 750upx;
		background:linear-gradient(146deg,rgba(247,165,59,1),rgba(255,78,9,1));
		flex: 1;
		overflow-x: hidden;
		overflow-y: scroll;
	}

	.container {
		width: 100%;
		height: 100%;
		padding-top: 260upx;
		padding-bottom: 28upx;
		align-items: center;
		position: relative;
	}

	image.cont {
		width: 100%;
		height: 1218upx;
		position: absolute;
		top: 0;
		z-index: 0;
	}

	/* 转盘 */
	.canvas-container {
		margin: 0 auto;
		position: relative;
		width: 667upx;
		height: 667upx;
		// background: url(../../static/imgs/own/luckdraw/circle.png) no-repeat;
		border-radius: 50%;
	}

	.canvas {
		width: 100%;
		height: 100%;
		display: block !important;
		border-radius: 50%;
	}

	.canvas-content {
		position: absolute;
		left: 0;
		top: 0;
		z-index: 1;
		display: block;
		width: 100%;
		height: 100%;
		border-radius: inherit;
		/* background-clip: padding-box; */
		/* background-color: #ffcb3f; */
		.canvas-content_bg {
			margin-top: 3upx;
			width: 100%;
			height: 100%;
			position: absolute;
			left: 0;
			top: 0;
		}
	}

	.canvas-element {
		position: relative;
		z-index: 1;
		width: inherit;
		height: inherit;
		border-radius: 50%;
	}

	.canvas-list {
		position: absolute;
		left: 0;
		top: 0;
		width: inherit;
		height: inherit;
		z-index: 9999;
	}

	.canvas-item {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		color: #e4370e;
		/* text-shadow: 0 1upx 1upx rgba(255, 255, 255, 0.6); */
	}

	.canvas-item-text {
		max-width: 146upx;
		position: relative;
		display: block;
		padding-top: 100upx;
		// margin: 0 auto;
		text-align: center;
		// -webkit-transform-origin: 50% 300upx;
		// transform-origin: 50% 300upx;
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 0 auto;
		color: #724700;
	}

	.canvas-item-text text {
		font-size: 33upx;
		color: #FF6600;
	}

	/**  
* 抽奖按钮  
*/
	.canvas-btn {
		position: absolute;
		display: block;
		// border-radius: 50%;
		overflow: hidden;
		left: 230upx;
		top: 90upx;
		z-index: 400;
		width: 216upx;
		height: 359upx;
		.canvas-btn-pic{
			width: 100%;
			height: 100%;
		}
		.canvas-btn-handle {
			position: absolute;
			left: 0;
			bottom: 0;
			border-radius: 50%;
			width: 100%;
			height: 60%;
		}
	}

	.canvas-btn.disabled {
		pointer-events: none;
		color: #ccc;
	}

	.canvas-btn-table {
		color: #A83FDB;
		width: 120upx;
		text-align: center;
		position: absolute;
		left: 240upx;
		top: 360upx;
		font-size: 26upx;
		background-color: #FFFFFF;
		opacity: 0.9;
	}
	
	// 中奖名单
	.winning-list{
		padding-top: 110upx;
		padding: 100upx 45upx 40upx 45upx;
		position: relative;
		width: 628upx;
		margin-top: 43upx;
		height: 421upx;
		z-index: 20;
		image.bg-list {
			position: absolute;
			left: 0;
			top: 0;
		}
		.winning-list-swiper {
			width: 100%;
			height: 100%;
			flex-direction: column;
			.list-swiper-item {
				font-size: 24upx;
				color: #BB5917;
				.winning-item {
					margin-bottom: 25upx;
					justify-content: space-between;
					.item-text {
						margin-left: 8upx;
					}
					.winning-item-l {
						flex-shrink: 0;
					}
					.winning-item-r {
						margin-left: 8upx;
						flex: 1;
						justify-content: flex-end;
						overflow: hidden;
						.winning-item-r-text {
							text-align: right;
							// width: 110%;
							overflow:hidden;
							text-overflow:ellipsis;
							white-space:nowrap;
						}
					}
				}
			}
		}
	}
	
	// 中奖弹窗
	.uni-popup {
		.popup-win {
			position: relative;
			width: 584upx;
			// height: 518upx;
			flex-direction: column;
			align-items: center;
			.popup-win-bg {
				width: 100%;
				height: 518upx;
			}
			.popup-win-close {
				margin-top: 20upx;
				width: 60upx;
				height: 60upx;
			}
			.popup-win-body {
				width: 100%;
				height: 518upx;
				padding-top: 165upx;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				position: absolute;
				left: 0;
				top: 0;
				.popup-win-body-title {
					letter-spacing: 3upx;
					font-size: 48upx;
					font-weight: bold;
				}
				.popup-win-body-content {
					margin-top: 24upx;
					font-size: 30upx;
					color: #999999;
				}
			}
		}
	}
</style>