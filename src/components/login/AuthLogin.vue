<template>
	<view class="btn-box ">
		<view class="flex-column justify-content-center align-items-center margin-bottom-70">
			<view class="margin-bottom-20 justify-content-center ">
				<image class="image-sz-120 "  :src="require('../../static/images/index/icon-leader.png')" mode=""></image>
			</view>
			
			<view class="pd-lr-30 flex-column margin-bottom-20">
				<text class="fn-cl-333 fn-sz-36 margin-bottom-20">81兵站申请获得以下权限</text>
				<text class="fn-cl-999 fn-sz-30">获得你的公开信息（昵称、头像、地区及性别）</text>
			</view>
		</view>
		<button class="auth-btn"  openType="getUserInfo" @getUserInfo="doLogin">授权登录</button>
	</view>
</template>

<script>
	export default{
		methods:{
			doLogin(){
				console.log("000000000000000");
				let _this=this;
				console.log("11111111111111");
				uni.getSetting({
					success(res){
						if(res.authSetting['scope.userInfo'] === undefined){
							_this.wxLogin()
						}else if(res.authSetting['scope.userInfo'] === false){
							uni.showModal({
								title:"提示",
								content:"99供货申请获得你的公开信息",
								showCancel:false,
								success(res) {
									if(res.confirm){
										_this.openAuthSetting()
									}
								}
							})
						}else if(res.authSetting['scope.userInfo'] === true){
							_this.wxLogin()
						}
					},
					fail(res) {
						console.log("res",res);
					}
					
				})
			},
			openAuthSetting(){
				let _this=this;
				
				uni.openSetting({
					success(res) {
						console.log("success",res);
						_this.doLogin()
					},
					fail(res) {
						console.log("fail",res);
					}
				})
			},
			//
			wxLogin(){
				let _this=this;
				uni.login({
					provider: 'weixin',
					success(res) {
						console.log("授权登录",res);
						let code = res.code
						uni.getUserInfo({
							provider: "weixin",
							success(res) {
								console.log("授权登录接口",res);
								//授权登录接口 TODO
							},
							fail(res) {
								console.log("获取用户信息拒绝fail");
							}
						})
				
					}
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.btn-box{
		align-items: center;
		padding: 0 30upx;
		box-sizing: border-box;
		flex-direction: column;
		min-height: 100vh;
		width: 100%;
		justify-content: center;

		
		.auth-btn{
			width: 100%;
			height: 90upx;
			line-height: 90upx;
			background-color: var(--theme-color);
			background-color: $theme-color;
			color: #fff;
			font-size: 32upx;
			padding: 0;
			border-radius: 40upx;
		}
	}
</style>
