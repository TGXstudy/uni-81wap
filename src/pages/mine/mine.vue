<template>
	<view class="container">
		<view class="flex-column">
			<view class="user-info-wrapper flex-column">
				<view class="icon-btn">
					<view class="unread-box">
						<image class="image-sz-48" :src=" require('../../static/images/mine/icon-msg.png')" @tap="goPage('message',{type:'system'})"></image>
						<text class="unread" v-if="unRead>0"></text>
					</view>
					<image class="image-sz-48" :src="require('../../static/images/mine/icon-set.png')" @tap="goPage('setting')"></image>
				</view>
				<view class="align-items-center">
					<image class="image-sz-120 circle-image margin-left-20 " :src="userInfo.avatar || require('../../static/images/mine/img-avatar.png')"
					 @tap="goPage('personInfo')"></image>
					<text class="fn-cl-fff fn-sz-28 margin-left-20">{{userInfo.user_nickname}}</text>
				</view>
				<view class="acount-info">
					<view class="flex-column align-items-center" @tap="goPage('wallet')">
						<view class="margin-bottom-20 align-items-baseline" >
							<text class="fn-sz-24 fn-cl-fff">￥</text>
							<text class="fn-sz-32 fn-cl-fff">{{userInfo.balance}}</text>
						</view>
						<text class="fn-sz-24 fn-cl-fff">余额</text>
					</view>
					<view class="flex-column align-items-center" @tap="goPage('points')">
						<text class="fn-sz-32 fn-cl-fff  margin-bottom-20">{{userInfo.score}}</text>
						<text class="fn-sz-24 fn-cl-fff">我的积分</text>
					</view>
					<view class="flex-column align-items-center" @tap="goPage('coupons')">
						<text class="fn-sz-32 fn-cl-fff margin-bottom-20">{{userInfo.coupon_num}}</text>
						<text class="fn-sz-24 fn-cl-fff">优惠券</text>
					</view>
				</view>
			</view>
			<view class="order-wrapper pd-lr-30 flex-column">
				<view class="width-100-percent align-items-center flex-between">
					<text class="fn-cl-333 fn-sz-28">我的订单</text>
					<view class="" @tap="goPage('order',{status:'all'})">
						<text class="fn-cl-999 fn-sz-24">查看全部订单</text>
						<image class="image-sz-32 margin-right-20" :src="require('../../static/images/index/icon-narraw.png')" mode=""></image>
					</view>
				</view>
				<view class="status-box align-items-center flex-1">
					<view class="flex-column align-items-center " v-for="(item,idx) in statusList" :key="idx" @tap="goPage('order',{status:item.status})">
						<image class="image-sz-48 margin-bottom-20" :src="item.icon" mode=""></image>
						<text class="fn-sz-24 fn-cl-333">{{item.text}}</text>
					</view>
				</view>
			</view>
			<view class="menu-wrapper pd-lr-30 flex-column">
				<view class="flex-between width-100-percent menu-item" @tap="goPage('message',{type:'froum'})">
					<text class="fn-sz-28 fn-cl-333">论坛消息</text>
					<image class="image-sz-32 margin-right-20" :src="require('../../static/images/index/icon-narraw.png')" mode=""></image>
				</view>
				<view class="flex-between width-100-percent menu-item" @tap="goPage('collection')">
					<text class="fn-sz-28 fn-cl-333">我的收藏</text>
					<image class="image-sz-32 margin-right-20" :src="require('../../static/images/index/icon-narraw.png')" mode=""></image>
				</view>
				<!-- <view class="flex-between width-100-percent menu-item" @tap="$mUtils.toast('该功能暂未开放')" >
					<text class="fn-sz-28 fn-cl-333">直播开播入口</text>
					<image class="image-sz-32 margin-right-20" :src="require('../../static/images/index/icon-narraw.png')" mode=""></image>
				</view> -->
			</view>

			<!-- 签到 快捷入口 -->
			<view class="sign-entry" @tap="goPage('sign')" >
				<image :src="'/static/images/mine/icon-sign.png'|imgUrl" mode=""></image>
			</view>
		</view>


	</view>
</template>

<script>
	export default {

		data() {
			return {
				userInfo: {},
				
				statusList: [{
						status: 'wait_pay',
						icon: require('../../static/images/mine/icon-status1.png'),
						text: '待付款'
					},
					{
						status: 'wait_send',
						icon: require('../../static/images/mine/icon-status2.png'),
						text: '待发货'
					},
					{
						status: 'wait_receive',
						icon: require('../../static/images/mine/icon-status3.png'),
						text: '待收货'
					},
					{
						status: 'done',
						icon: require('../../static/images/mine/icon-status4.png'),
						text: '已完成'
					},
					{
						status: 'after_pay',
						icon: require('../../static/images/mine/icon-status5.png'),
						text: '退款/售后'
					}
				],
				unRead:0, //未读消息数量 
			}
		},
		onLoad() {
			
		},
		onShow() {
			//获取用户信息
			this.getUserInfo();
			//未读消息数量 
			this.getUnReadMsg();
		},
		methods: {
			//未读消息数量
			getUnReadMsg(){
				this.$api.getUnReadMsg().then(res=>{
					console.log("未读消息数量",res);
					if(res.code == 200){
						this.unRead=res.data.count;
					}else{
						console.log("未读消息数量",res);
					}
				})
			},
			// 获取用户信息 
			getUserInfo() {
				this.$api.getUserInfo().then(res => {

					if (res.code == 200) {
						this.userInfo = res.data;

					} else {
						console.log("获取用户信息", res);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #fff;

		.user-info-wrapper {
			width: 100%;
			height: 440upx;
			background-color: #fff;
			background-size: cover;
			background-image: url(../../static/images/mine/bg-top.png);

			.icon-btn {
				width: 100%;
				height: 80upx;
				align-items: center;
				justify-content: flex-end;
				padding-right: 30upx;
				
				.unread-box{
					position: relative;
					margin-right: 60upx;
					.unread{
						position: absolute;
						top:0;
						right: 0;
						display: block;
						width: 15upx;
						height: 15upx;
						border-radius: 50%;
						background-color: #fff;
						
					}
				}

			}

			.acount-info {
				width: 100%;
				height: 200upx;
				justify-content: space-around;
				align-items: center;
				&>view{
					width: 30%;
				}
			}
		}

		.order-wrapper {
			width: 100%;
			height: 300upx;
			padding: 0 50upx;
			box-sizing: border-box;

			.status-box {
				justify-content: space-between;
			}
		}

		.menu-wrapper {
			width: 100%;

			.menu-item {
				height: 100upx;
				align-items: center;
			}

		}

		.sign-entry {
			width: 104upx;
			height: 112upx;
			position: fixed;
			right: 30upx;
			bottom: 220upx;
		}
	}
</style>
