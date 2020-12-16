<template>
	<view class="container pd-lr-40">
		<view v-if="role == 'user' || role == 'soldier'" class="flex-column">
			<view class="margin-bottom-70 margin-top-40">
				<text class="fn-sz-48 fn-cl-333 fn-bold margin-right-20">{{loginTitle[loginInfo.type].title}}</text>
			</view>
			<view class="input-wrapper">
				<input class="input-item" type="number" v-model.trim="loginInfo.username" maxlength="11" placeholder="输入手机号">
			</view>
			<view class="input-wrapper" v-if="loginInfo.type == 'code'">
				<input class="input-item" type="number" maxlength="6" v-model.trim="loginInfo.code" placeholder="输入验证码">
				<valid-code :phone="loginInfo.username" :type="'login'"></valid-code>
			</view>
			<view class="input-wrapper" v-else>
				<input class="input-item" type="text" password v-model.trim="loginInfo.password" maxlength="18" placeholder="输入密码，6-18位">
			</view>
			<view class="input-wrapper margin-bottom-70" @tap="changeLoginType">
				<image class="image-sz-32 margin-right-20" :src="loginTitle[loginInfo.type].image"></image>
				<text class="fn-cl-666 fn-sz-28">{{loginTitle[loginInfo.type].tabTxt}}</text>
			</view>
		</view>
		<view v-else-if="role == 'supplier' || role == 'channeler'" class="flex-column">
			<view class="margin-bottom-70 margin-top-40">
				<text class="fn-sz-48 fn-cl-333 fn-bold margin-right-20"> {{role == 'supplier' ? '供应商登录' : '渠道商登录'}}</text>
			</view>
			<view class="input-wrapper">
				<input class="input-item" type="text" v-model.trim="loginInfo.username" placeholder="请输入公司名称">
			</view>
			
			<view class="input-wrapper margin-bottom-70" >
				<input class="input-item" type="text" password v-model.trim="loginInfo.password" placeholder="输入密码，6-18位">
			</view>
			
		</view>
		
		<view class="flex-column">
			<solid-btn :txt="'立即登录'" @click="confirmLogin"></solid-btn>
			<view v-if="role == 'user' || role == 'soldier'"  class="other-role flex-between align-items-center">
				<text class="fn-cl-666 fn-sz-28" @tap="changeRole('channeler')">渠道商登录</text>
				<text class="fn-cl-666 fn-sz-28" @tap="changeRole('supplier')">供应商登录</text>
			</view>
			<view v-else  class="other-role justify-content-center align-items-center">
				<text class="fn-cl-666 fn-sz-28" @tap="changeRole('user')">用户登录</text>
			</view>
		</view>
	</view>
</template>

<script>
	import validCode from "@/components/register/ValidCode.vue";
	import solidBtn from "@/components/common/SolidBtn.vue";
	export default{
		components:{
			validCode,solidBtn
		},
		//点击顶部导航菜单按钮
		onNavigationBarButtonTap(e){
			console.log("点击顶部导航菜单按钮",e.text);
			if(e.index == 0){ //点击注册
				this.goPage('role')
			}
		},
		data(){
			return {
				role:'user',
				loginTitle:{
					pass:{
						title:"密码登录",
						image:require("../../static/images/login/icon-key.png"),
						tabTxt:"验证码登录",
					},
					code:{
						title:"验证码登录",
						image:require("../../static/images/login/icon-lock.png"),
						tabTxt:"密码登录",
					}
				},
				loginInfo:{
					username:'', //手机号 用户名
					role_type:'', //，2普通用户，3军人，4渠道商，5供应商
					password:'', //	密码
					code:'', //验证码
					type:'pass', //验证码登录code，密码登录pass
				}
			}
		},
		onLoad(options) {
			this.role=options.role || 'user',
			this.loginInfo.role_type = this.roleToCode(this.role);
		
		},
		methods:{
			//改变登录方式
			changeLoginType(){
				this.loginInfo.type = this.loginInfo.type  == 'pass' ? 'code' : 'pass';
				console.log("登录方式",this.loginInfo.type);
			},
			//切换登录 角色
			changeRole(role){
				this.role=role
			},
			//点击立即登录
			confirmLogin(){
				let info=this.loginInfo;
				console.log("点击立即登录",info);
				
				//验证数据
				// 手机号
				if (!info.username) {
					
					if(this.role == 'supplier' || this.role == 'channeler'){
						this.$mUtils.toast('请输入公司名称');
					}else{
						this.$mUtils.toast('请输入手机号');
					}
					
					return;
				} else if ( (this.role == 'user' || this.role == 'soldier') &&!this.$regs.isPhone.test(info.username)) {
					this.$mUtils.toast('请输入正确的手机号');
					return;
				}
				
				if(info.type == 'code'){
					//验证码
					if (!info.code) {
						this.$mUtils.toast('请输入验证码');
						return;
					} 
				}else{
					//密码
					if (!info.password) {
						this.$mUtils.toast('请输入密码');
						return;
					} else if (info.password.length<6) {
						this.$mUtils.toast('密码长度必须大于等于6位');
						return;
					} 
				}
				
				//登录
				this.doLogin();
				
			},
			
			//登录
			doLogin(){
				this.$api.login({
					...this.loginInfo
				}).then(res=>{
					console.log("登录结果",res);
					if(res.code == 200){
						
						this.$store.commit("SET_MEMBER",res.data)
						this.$store.commit("SET_HASLOGIN",true);
						this.$store.commit("SET_TOKEN",res.data.token);
						
						this.$mUtils.toast(res.msg,true).then(()=>{
							//跳转首页
							this.$mRouter.switchTab({
								route:this.$mRoutesConfig.index
							})
							// this.$mRouter.back();
						})
						
						
					}else if(res.code == 210){
						//用户状态;0:禁用,1:正常,2:未验证,3审核拒绝',
						let userStatus=res.data.user_status;
						
						if(userStatus == 3){
							this.$mUtils.toast("注册被拒绝，请重新填写资料",true).then(()=>{
								let role= this.roleToStr(res.data.role_type);
								let id=res.data.id;
								console.log(role,id);
								this.goPage("register",{role,id})
							})
						}else if(userStatus == 2){
							this.$mUtils.toast("账号审核中")
						}else{
							this.$mUtils.toast(res.msg)
						}
						
						
						
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.other-role{
		height: 100upx;
		width: 350upx;
		margin:  0 auto;
	}
</style>
