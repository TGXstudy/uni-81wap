<template>
	<view class="container pd-lr-30">
		<view class="flex-between width-100-percent menu-item" v-for="(item,idx) in menuList" :key="idx" @tap="goPage(item.pageName)">
			<text class="fn-sz-28 fn-cl-333">{{item.text}}</text>
			<image class="image-sz-32 margin-right-20" :src="require('../../static/images/index/icon-narraw.png')" mode=""></image>
		</view>
	<!-- 	<view class="flex-between width-100-percent menu-item margin-bottom-70" @tap="clearCache">
			<text class="fn-sz-28 fn-cl-333">清除缓存</text>
			<image class="image-sz-32 margin-right-20" :src="require('../../static/images/index/icon-narraw.png')" mode=""></image>
		</view> -->
		<view class="width-100-percent margin-bottom-70"></view>
		<border-btn :txt="'退出登录'" @tap="loginOut"  :styleTxt="'font-size:32upx;border-color:#EEEEEE;color:#999;'"></border-btn>
	</view>
</template>

<script>
	import borderBtn from "@/components/common/BorderBtn.vue"
	
	export default {
		components: {
			borderBtn
		},
		data(){
			return {
				menuList:[
					{
						pageName:'address',
						text:'收货地址'
					},
					{
						pageName:'password',
						text:'支付密码'
					},
					
					{
						pageName:'feedback',
						text:'意见反馈',
					}
				]
			}
		},
		methods:{
			// clearCache(){
			// 	console.log("清除缓存TODO");
			// }
			loginOut(){
				this.$store.commit("SET_MEMBER", {})
				this.$store.commit("SET_HASLOGIN", false);
				this.$store.commit("SET_TOKEN", "");
				this.$store.commit("SET_ADDRESS", {});
				
				this.$mRouter.reLaunch({
					route:this.$mRoutesConfig.login
				})
				
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.menu-item {
		height: 100upx;
		align-items: center;
	}
	
</style>
