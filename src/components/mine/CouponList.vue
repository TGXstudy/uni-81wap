<template>
	<view class="flex-column pd-lr-30">
		<view v-for="(item,index) in list" :key="index" class="coupon-item" :class="[  current.id == item.id ? 'bg-current' : type == 'canuse'? 'bg-canuse':'bg-nouse']" @tap="chooseItem(item)" >
			<view class="coupon-value">
				<text class=" fn-sz-52">￥{{item.coupon_money}}</text>
			</view>
			<view class="coupon-condition">
				<text class="fn-sz-24 margin-bottom-20">满{{item.limit}}减{{item.coupon_money}}</text>
				<text class="fn-sz-24">{{item.coupon_name}}</text>
				<text class="fn-sz-24">{{item.start_time}}~{{item.end_time}}</text>
			</view>
			<image v-if="type == 'outdate'" :src="'/static/images/mine/icon-outdate.png' | imgUrl" class="image-sz-96 margin-right-10" mode=""></image>
			<image v-else-if="type == 'hasuse'" :src="'/static/images/mine/icon-hasuse.png' | imgUrl" class="image-sz-96 margin-right-10" mode=""></image>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			type:{
				type:String,
				default:'canuse'
			},
			list:{
				type:Array,
				default:function(){
					return [];
				}
			},
			current:{
				type:Object,
				default:function(){
					return {
						id:0
					}
				}
			}
		},
		methods:{
			chooseItem(item){
				this.$emit("click",item)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.coupon-item{
		width: 100%;
		height: 200upx;
		background-size:cover;
		margin-bottom: 40upx;
		align-items: center;
		
		.coupon-value{
			width: 216upx;
			height: 100%;
			justify-content: center;
			align-items: center;
		}
		.coupon-condition{
			flex-direction: column;
			flex: 1;
			flex-shrink: 1;
			height: 100%;
			justify-content: center;
			padding-left: 60upx;
			
		}
		.margin-right-10{
			margin-right: 10upx;
		}
	}
	.bg-canuse{
		background-image: url(../../static/images/mine/bg-canuse.png);
		color: #FFF;
	}
	.bg-current{
		background-color: #E95052;
		background-image: none;
		color: #FFF;
		border-radius: 8upx;
	}
	.bg-nouse{
		background-image: url(../../static/images/mine/bg-nouse.png);
		color: #ccc;
	}
</style>
