<template>
	<view class="container pd-lr-30">

		<text class="fn-sz-36 fn-cl-333 fn-bold line-height-80">请输入新的支付密码</text>
		<view class="input-wrapper margin-bottom-70">
			<input class="input-item" type="text" password v-model.trim="payPwd" maxlength="6" placeholder="请输入新密码">
		</view>

		<solid-btn class="margin-top-40" :txt="'确认修改'" @click="confirmEdit"></solid-btn>
	</view>
</template>

<script>
	import validCode from "@/components/register/ValidCode.vue";
	import solidBtn from "@/components/common/SolidBtn.vue";
	export default {
		components: {
			validCode,
			solidBtn
		},
		onLoad(options) {
			this.mobile = options.mobile;
			this.code = options.code;
			/* if( !this.mobile || !this.code){
				this.goPage('index');
			} */
		},
		data() {
			return {
				mobile: "",
				code: "",
				payPwd: ''
			}
		},
		methods: {
			confirmEdit() {


				if (!this.payPwd) {
					this.$mUtils.toast("请输入密码");
					return;
				}
				//设置支付密码 
				this.$api.setPaypwd({
					mobile: this.mobile,
					code: this.code,
					pay_pwd: this.payPwd
				}).then(res => {
					if(res.code == 200){
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.$mRouter.back()
						})
						
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
				
					}
		}
	}
</script>

<style lang="scss" scoped>
	.input-wrapper {
		height: 120upx;
	}
</style>
