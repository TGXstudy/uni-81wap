<template>
	<view class="container ">
		<view class="flex-between avatar-wrapper">
			<text class="fn-cl-333 fn-sz-36">头像</text>
			<insert-media :isSlot="true" @getImage="getAvatar">
				<image class="image-sz-140 circle-image margin-left-20 " :src="previewAvatar"></image>
			</insert-media>
		</view>
		<view class="name-wrapper flex-column">
			<text class="fn-cl-666 fn-sz-24 margin-bottom-20">姓名</text>
			<input type="text" class="fn-sz-36 fn-cl-333" v-model.trim="nickname" />
		</view>
		<solid-btn :txt="'保存'" @click="saveInfo"></solid-btn>
	</view>
</template>

<script>
	import solidBtn from "@/components/common/SolidBtn.vue"
	import insertMedia from "@/components/froum/InsertMedia.vue"
	
	export default{
		components:{
			solidBtn,insertMedia
		},
		onLoad() {
			// 获取用户信息
			this.getUserInfo();
		},
		data(){
			return {
				avatar:'',
				nickname:'',
				previewAvatar:'../../static/images/mine/img-avatar.png'
			}
		},
		methods:{
			// 获取用户信息
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
			
					if (res.code == 200) {
						this.avatar=res.data.avatar;
						this.previewAvatar=res.data.avatar;
						this.nickname=res.data.user_nickname;
					} else {
						console.log("获取用户信息", res);
					}
				})
			},
			
			getAvatar(e){
				// console.log("getAvatar",e);
				this.previewAvatar=e[0].preview_url;
				this.avatar=e[0].url;
			},
			saveInfo(){
				//保存个人信息
				this.$api.setUserInfo({
					avatar:this.avatar,
					
					user_nickname:this.nickname
				}).then(res=>{
					
					if(res.code == 200){
						this.$mUtils.toast("保存成功",true).then(()=>{
							this.$mRouter.back();
						})
						
					}else{
						this.$mUtils.toast(res.msg)
						console.log("保存个人信息",res);
					}
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.container{
		padding: 0 40upx;
		box-sizing:border-box;
		.avatar-wrapper{
			width: 100%;
			height: 200upx;
			align-items: center;
			border-bottom: 2upx solid #f9f9f9;
		}
		.name-wrapper{
			width: 100%;
			height: 160upx;
			// align-items: center;
			border-bottom: 2upx solid #f9f9f9;
			margin-bottom: 80upx;
		}
	}
</style>
