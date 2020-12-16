<template>
	<view class=" flex-column ">
		<view class="shop-item pd-lr-30" :class="[isCollect ? 'border-radius-8 margin-bottom-20':'']" v-for="(item,idx) in list" :key="idx" @tap="goPage('shopDetail',{shopId:item.shop_id})">
			<image class="image-sz-140 margin-right-20" :src="item.shop_image" mode=""></image>
			<view class="flex-1 flex-column">
				<text class=" fn-cl-333 fn-sz-28 one-line-txt margin-bottom-20">{{item.shop_name}}</text>
				<text class="fn-cl-999 fn-sz-24 two-line-txt">{{item.describe}}</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default:function(){
					return [{
						describe: "81专卖店81专卖店81专卖店81专卖店81专卖店81专卖店81专卖店81专卖店81专卖店81专卖店81专卖店81专卖店",
						mid: 7,
						shop_id: 2,
						shop_image: "https://81.batmp.com/upload/default/20200616/f39d5d9808278649bab6177bf959e397.png",
						shop_name: "81专卖店",
					}]
				}
			},
			isCollect:{ //是否 是 收藏页面
			type:Boolean,
			default:false
			}	
		}
	}
</script>

<style lang="scss" scoped>
	.shop-item{
		height: 220upx;
		width: 100%;
		align-items: center;
		background-color: #fff;
		image{
			border-radius: 8upx;
		}
	}
</style>
