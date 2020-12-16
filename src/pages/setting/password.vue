<template>
	<view class="container pd-lr-30">
		<view class="input-wrapper">
			<input class="input-item" type="number" maxlength="11" v-model.trim="mobile" placeholder="输入手机号">
		</view>
		<view class="input-wrapper margin-bottom-70 ">
			<input class="input-item" type="number" maxlength="6" v-model.trim="code" placeholder="输入验证码">
			<valid-code :phone="mobile" :type="'pay'"></valid-code>
		</view>
		<solid-btn class="margin-top-40" :txt="'下一步'" @click="nextStep"></solid-btn>
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
		data() {
			return {
				mobile: '',
				code: ''
			}
		},
		methods: {
			nextStep() {
				if (!this.mobile) {
					this.$mUtils.toast("请输入手机号");
					return;
				} else if (!this.$regs.isPhone.test(this.mobile)) {
					this.$mUtils.toast('请输入正确的手机号');
					return;
				}

				if (!this.code) {
					this.$mUtils.toast("请输入验证码");
					return;
				}

				this.$mRouter.redirectTo({
					route: this.$mRoutesConfig.savePwd,
					query:{
						mobile:this.mobile,
						code:this.code
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
