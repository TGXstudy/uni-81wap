<template>
	<view class="container">
		<view class="type-tabs" >
			<view class="" v-for="item in tabsList" :key="item.key" @tap="changeTab(item.key)">
				<text :class="['fn-sz-32',currentTab== item.key ? 'fn-bold fn-cl-theme':'fn-cl-333']">{{item.name}}</text>
			</view>
		</view>
		<view class="tab-content pd-lr-30">
			<view class="flex-column width-100-percent" v-if="currentTab == 'goods'">
				<goods-list :list="list"></goods-list>
				<loadmore :visible="loading"></loadmore>
				<nomore :visible="nomore"></nomore>
			</view>
			<view class="flex-column width-100-percent" v-else-if="currentTab == 'shop'">
				<shop-list :list="list" :isCollect="true"></shop-list>
				<loadmore :visible="loading"></loadmore>
				<nomore :visible="nomore"></nomore>
			</view>
			<view class="flex-column width-100-percent" v-else>
				<bot-list :list="list" :isCollect="true"></bot-list>
				<loadmore :visible="loading"></loadmore>
				<nomore :visible="nomore"></nomore>
			</view>
		</view>


	</view>
</template>

<script>
	import goodsList from "@/components/index/GoodsList.vue";
	import shopList from "@/components/citys/ShopList.vue";
	import botList from "@/components/froum/BotList.vue"
	import loadmore from "@/components/common/loadmore.vue";
	import nomore from "@/components/common/nomore.vue"
	export default {
		components: {
			goodsList,
			shopList,
			botList,loadmore,nomore
			
		},
		data() {
			return {
				list:[],
				currentTab: 'goods',
				tabsList: [{
						key: "goods",
						name: '商品'
					},
					{
						key: "shop",
						name: '店铺'
					},
					{
						key: "post",
						name: '帖子'
					}
				],
				page:1,
				pageSize:10,
				loading:false,
				nomore:false
			}
		},
		onShow() {
			this.getList(this.currentTab);
		},
		methods: {
			changeTab(key) {
				this.currentTab = key;
				this.getList(this.currentTab)
			},
			getList(type){
				this.page = 1;
				this.loading=true;
				this.nomore=false;
				this[type]();
			},
			//收藏的商品
			goods(){
				
				this.$api.myGoods({
					page:this.page,
					pageSize:this.pageSize
				}).then(res=>{
					console.log("收藏的商品");
					if(res.code == 200){
						this.handleData(res.data);
					}else{
						console.log("收藏的商品");
					}
					
					
				}).finally(()=>{
                    this.loading=false;
					this.stopPull(status)
                })
			},
			//收藏的店铺
			shop(){
				this.$api.myShop({
					page:this.page,
					pageSize:this.pageSize
				}).then(res=>{
					console.log("收藏的店铺");
					if(res.code == 200){
						this.handleData(res.data);
					}else{
						console.log("收藏的店铺");
					}
				}).finally(()=>{
                    this.loading=false;
					this.stopPull(status)
                })
			},
			
			//收藏的帖子
			post(){
				this.$api.myPost({
					page:this.page,
					pageSize:this.pageSize
				}).then(res=>{
					console.log("收藏的帖子");
					if(res.code == 200){
						this.handleData(res.data);
					}else{
						console.log("收藏的帖子");
					}
				}).finally(()=>{
                    this.loading=false;
					this.stopPull(status)
                })
			},
			handleData(data){
				this.page = data.current_page;
				this.nomore = this.page >=data.last_page;
				if (this.page == 1) {
				    this.list=data.data
				} else {
				    this.list = this.list.concat(data.data);
				}
			}
			
			
			
		}

	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #f9f9f9;
		min-height: calc(100vh - var(--window-top));
		.type-tabs {
			width: 100%;
			height: 100upx;
			align-items: center;
			justify-content: space-around;
			background-color: #fff;
		}
		
		.tab-content{
			padding-top: 20upx;
		}
	}
</style>
