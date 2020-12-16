<template>
	<view class="container pd-lr-30">
		<view class="txtarea-wrapper">
			<textarea v-model.trim="content" placeholder="请输入您想要咨询的问题" />
		</view>
		<view class="">
			<solid-btn :txt="'提交'" @click="submitQuery"></solid-btn>
		</view>
	</view>
</template>

<script>
	import solidBtn from "@/components/common/SolidBtn.vue"
	export default{
		components:{solidBtn},
		onNavigationBarButtonTap(e){
			if(e.index == 0){
				this.goPage('queryRecord')
			}
		},
		data(){
			return {
				content:''
			}
		},
		methods:{
			submitQuery(){
				if(this.content.length<=0){
					this.$mUtils.toast("请输入您想要咨询的问题");
					return;
				}
				this.$api.sendQuery({
					content:this.content
				}).then(res=>{
					
					if(res.code == 200){
						this.$mUtils.toast(res.msg);
						//提交成功,TODO
						
						
					}else{
						console.log("咨询提交",res);
					}
				})
			}
			
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
				width: 100%;
				height: 100%;
				background-color: #f9f9f9;
				padding: 40upx 20upx;
				box-sizing: border-box;
			}
		}
	}
	
</style>
