<template>
	<view class="type-tabs">
		<view class="" v-for="item in tabsList" :key="item.key" @tap="changeTab(item.key)">
			<text :class="['fn-sz-32',currentTab== item.key ? 'fn-cl-theme':'fn-cl-333']">{{item.name}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			tabsList:{
				type:Array,
			},
			currentTab:{
				type:String
			}
		},
		methods:{
			changeTab(key){
				this.$emit("change",key)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.type-tabs {
		width: 100%;
		height: 100upx;
		align-items: center;
		justify-content: space-around;
		background-color: #fff;
	}
</style>
