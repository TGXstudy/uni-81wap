<template>
	<view class="container pd-lr-30">
		<rich-text :nodes="content"></rich-text>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				barTitle:'导航标题',
				type:0,// 文档类型 1关于渠道商，2关于供货商，3签到说明，4积分规则
				content:'', 
			}
		},
		onLoad(options) {
			this.barTitle=options.title || '导航标题';
			this.type=options.type || 0 ; //1关于渠道商，2关于供货商，3签到说明，4积分规则
			if(options.role){ //关于供应商 关于渠道商
				
				if(options.role == 'supplier'){
					this.barTitle="关于供应商";
					this.type=2;
				}else{
					this.barTitle="关于渠道商";
					this.type=1
				}
				this.pageType=options.role
			}
			//获取文档
			this.getDocument();
			uni.setNavigationBarTitle({
				title:this.barTitle
			})
		},
		methods:{
			//获取文档
			getDocument(){
				this.$api.getDocument({
					type:this.type
				}).then(res=>{
					console.log("//获取文档TODO",res);
					if(res.code == 200){
						this.content=this.$mUtils.formatRichText(res.data.content);
					}
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
</style>
