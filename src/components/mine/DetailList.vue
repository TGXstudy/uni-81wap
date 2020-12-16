<template>
	<view class="flex-column">
		<view v-for="(item,index) in list" :key="index" class="point-item flex-between">
			<view class="flex-column">
				<text class="fn-sz-28 fn-cl-333 fn-bold margin-bottom-20">{{item.bill_source || item.type}}</text>
				<text class="fn-sz-24 fn-cl-999">{{item.create_time}}</text>
			</view>
			<text class=" fn-sz-32 fn-cl-theme" v-if="item.bill_amt">{{item.bill_type == 'out' ? '-' : '+'}}{{item.bill_amt }}	</text>
			<text class=" fn-sz-32 fn-cl-theme" v-if="item.wit_money">￥{{item.wit_money}}	</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			list:{
				type:Array,
				default:function(){
					return []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.point-item{
		width: 100%;
		height: 140upx;
		align-items: center;
	}
</style>
