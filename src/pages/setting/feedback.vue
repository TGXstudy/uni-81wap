<template>
	<view class="container pd-lr-30">
		<view class="txtarea-wrapper">
			<textarea v-model.trim="content" placeholder="最多输入30个字" maxlength="30" />
		</view>
		<view class="">
			<solid-btn :txt="'提交'" @click="doFeedback"></solid-btn>
		</view>
	</view>
</template>

<script>
	import solidBtn from "@/components/common/SolidBtn.vue"
	export default{
		components:{solidBtn},
		data(){
			return {
				content:''
			}
		},
		methods:{
			doFeedback(){
				if(!this.content){
					this.$mUtils.toast("请输入内容");
					return;
				}
				
				this.$api.feedback({
					serb_content:this.content
				}).then(res=>{
					if(res.code == 200){
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.$mRouter.back();
						})
						
					}else{
						this.$mUtils.toast(res.msg)
					}
				})
			}
			//feedback
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding-top: 20upx;
		.txtarea-wrapper{
			width: 100%;
			height: 380upx;
			margin-bottom: 120upx;
			textarea{
				font-size: 28upx;
				width: 100%;
				height: 100%;
				background-color: #f9f9f9;
				padding: 20upx;
				box-sizing: border-box;
			}
		}
	}
	
</style>
