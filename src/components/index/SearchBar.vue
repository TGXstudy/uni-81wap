<template>
	<view class="search-bar-wrapper pd-lr-30">
		<view class="search-input-box " @tap="goPage('recommend',{type:'search',title:'搜索'})">
			<image :src="require('../../static/images/index/icon-search.png')" class="image-sz-32 margin-left-20"></image>
			<text class="fn-sz-28 fn-cl-999 margin-left-20">搜索内容</text>
		</view>
		<view v-if="have.includes('check')" class="margin-left-20"  @tap="goPage('sign')">
			<image :src="require('@/static/images/index/icon-check.png')" class="image-sz-48"></image>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			//组件里包含的 功能元件
			have:{
				type:Array,
				default:function(){
					return ['search']
				}
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="scss" scoped>
	.search-bar-wrapper{
		width: 100%;
		height: 100upx;
		background-color: var(--theme-color-white);
		display: flex;
		align-items: center;
		.search-input-box{
			flex: 1;
			flex-shrink: 1;
			height: 72upx;
			background-color: var(--theme-color-f9f9f9);
			border-radius: 36upx;
			display: flex;
			align-items: center;
		}
	}
</style>
