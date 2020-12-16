<template>
	<!-- 推荐块 -->
	<view class="container">
		<view class="poster-wrapper pd-lr-30" v-if=" type == 'recommend'">
			<image :src="poster"></image>
		</view>
		<view class="search-bar-wrapper pd-lr-30 align-items-center" v-if=" type == 'search'">
			<view class="search-input-box margin-right-20 flex-1">
				<image :src="require('../../static/images/index/icon-search.png')" class="image-sz-32 margin-left-20"></image>
				<input type="text" v-model.trim="params.keyword" placeholder="请输入搜索内容" class="margin-left-20" @confirm="doSearch" />
			</view>
			<text class="fn-sz-32 fn-cl-theme" @tap="doSearch" >搜索</text>
		</view>
		<view v-if="goodList.length > 0" class="goods-list-wrapper pd-lr-30 flex-column">
			<goods-list :list="goodList"></goods-list>
			<loadmore :visible="loading"></loadmore>
			<nomore :visible="nomore"></nomore>
		</view>
		<default-view v-else class="flex-1"></default-view>
	</view>
</template>

<script>
	import goodsList from "@/components/index/GoodsList.vue";
	import defaultView from "@/components/common/Default.vue"
	import loadmore from "@/components/common/loadmore.vue";
	import nomore from "@/components/common/nomore.vue"
	export default {
		components: {
			goodsList,
			defaultView,
			loadmore,
			nomore
		},
		data() {
			return {
				loading: false,
				nomore: false,
				goodList: [], //商品列表
				params: { //获取商品列表的参数
					page: 1,
					pageSize: 10,
					keyword:'',
					recommend_1: '', //推荐专区1商品，传yes
					recommend_2: '', //推荐专区2商品，传yes
					recommend_3: '', //推荐专区3商品，传yes
					type:'', //1普通商品，2活动商品，不传获取全部类型，
				},
				poster:"", //广告图 单图，
				type:'', //页面类型， activity表示会员活动页
			}
		},
		onLoad(options) {
			this.cateId = options.cateId || 0;
			this.barTitle = options.title || "推荐";
			this.type = options.type || '';
			if(this.type == 'activity' ){
				this.params.type=2;
				//获取商品
				this.getGoodsList();
			}else if(this.type == 'search'){
				
			}else{
				this.recId = options.recId || 0; //推荐专区 编号
				this.params['recommend_' + this.recId] = 'yes';
				//获取广告图 单图
				this.getPicture(this.recId);
				//获取商品
				this.getGoodsList();
			}
			
			uni.setNavigationBarTitle({
				title: this.barTitle
			})
			
		},
		onReachBottom() {
			if (this.nomore) return;
			this.params.page++;
			this.getGoodsList()
		},
		methods: {
			getPicture(type) {
				this.$api.getPicture({
					type
				}).then(res => {
			
					if (res.code == 200) {
						this.poster = res.data.img;
					} else {
						console.log("//获取广告图 单图", res);
					}
				})
			},
			//获取商品
			getGoodsList() {
				this.loading=true;
				this.nomore=false;
				this.$api.getProduct({
					...this.params
				}).then(res => {
					console.log("获取商品", res);
					if (res.code == 200) {
						this.params.page = res.data.current_page;
						this.nomore = this.params.page >= res.data.last_page;
						if (this.params.page == 1) {
							this.goodList = res.data.data
						} else {
							this.goodList = this.goodList.concat(res.data.data);
						}
					} else {
						console.log("获取商品", res);
					}
				}).finally(() => {
					this.loading = false;
					// this.stopPull(status)
				})
			},
			//点击搜索
			doSearch(){
				if(!this.params.keyword){
					this.$mUtils.toast("请输入搜索内容");
					return;
				}
				//获取商品
				this.getGoodsList();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #fff;
		min-height: calc(100vh - var(--window-top));
		width: 100%;
		padding-top: 20upx;

		.poster-wrapper {
			height: 300upx;
		}
		
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
				input{
					width: 100%;
					height: 100%;
					display: block;
				}
			}
		}

	}
</style>
