<template>
	<view class="switch-wrapper">
		<view class="switch-item" :class="current == item.key ? 'current' :''" v-for="item in value" :key="item.key" @tap="changeTab(item.key)">
			<text>{{item.name}}</text>
		</view>
		
		
	</view>
</template>

<script>
	export default{
		props:{
			value:{
				type:Array,
				default:function(){
					return [{key:'reply',name:'回复'},{ key:'post',name:'发布'}]
				}
			},
			current:{
				type:String,
				default:'reply'
			}
		},
		data(){
			return {
			}
		},
		methods:{
			changeTab(key){
				this.$emit("click",key)
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.switch-wrapper{
		width:200upx;
		height:50upx;
		background:rgba(249,249,249,1);
		border-radius:30upx;
		border:1px solid rgba(238,238,238,1);
		font-size: 24upx;
	}
	
	.switch-item{
		width: 50%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}
	
	.current{
		background:rgba(255,255,255,1);
		border-radius:30upx;
		color: #333;
	}
	/* .sort-item{
					width: 100upx;
					height: 50upx;
					background-color: #F9F9F9;
					color: #999;
					border: 2upx solid #EEEEEE;
					line-height: 50upx;
					text-align: center;
				}
				.sort-item:first-child{
					border-radius: 30upx 0 0 30upx;
					border-right: none;
				}
				.sort-item:last-child{
					border-radius: 0 30upx 30upx 0;
				}
				.current-sort{
					background-color: #fff;
					color: #333;
				} */
</style>
