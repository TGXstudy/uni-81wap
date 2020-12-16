<template>
	<view class="container">
		<search-bar :have="['search','check']"></search-bar>
		<view class="carousel-wrapper pd-lr-30">
			<carousel :list="bannerList"></carousel>
		</view>
		<view class="width-100-percent">
			<icon-link class="width-100-percent" :linksList="linksList"></icon-link>
		</view>
		<!-- 参军服务咨询 -->

		<view class="query-wrapper pd-lr-30" @tap="goPage('query')">
			<image :src="'/static/images/index/img-query.png' | imgUrl"  mode=""></image>
		</view>
		<!-- <view class="query-wrapper pd-lr-30" @tap="goPage('query')">
			<image src="/static/images/index/img-query.png" mode=""></image>
		</view> -->
		<!-- 推荐块 -->
		<view class="blocks-wrapper flex-column width-100-percent pd-lr-30">
			<view class="width-100-percent flex-between">
				<image class="block-1" :src="pics[0]" @tap="goPage('recommend',{type:'recommend',recId:1,title:'推荐'})"></image>
				<image class="block-2" :src="pics[1]" @tap="goPage('recommend',{type:'recommend',recId:2,title:'推荐'})"></image>
			</view>
			<view class="width-100-percent">
				<image class="block-3" :src="pics[2]" @tap="goPage('recommend',{type:'recommend',recId:3,title:'推荐'})"></image>
			</view>
		</view>
		<!-- 推荐块 -->

		<view class="flex-column pd-lr-30 width-100-percent">
			<view class="star-title ">
				<text class=" fn-sz-32 fn-cl-333 fn-bold">精选商品</text>
				<image class="icon-star" :src="require('../../static/images/index/icon-star.png')"></image>
			</view>
			<view class="goods-wrapper">
				<goods-list :list="selectedGoods"></goods-list>
			</view>
		</view>
		<view class="flex-column pd-lr-30 width-100-percent">
			<view class="star-title ">
				<text class=" fn-sz-32 fn-cl-333 fn-bold">推荐商品</text>
				<image class="icon-star" src="../../static/images/index/icon-star.png"></image>
			</view>
			<view class="goods-wrapper">
				<goods-list :list="recommendGoods"></goods-list>
			</view>
		</view>


	</view>
</template>

<script>
	import searchBar from "@/components/index/SearchBar.vue"
	import carousel from "@/components/index/Carousel.vue"
	import iconLink from "@/components/index/IconLink.vue"
	import goodsList from "@/components/index/GoodsList.vue"
	export default {
		components: {
			searchBar,
			carousel,
			iconLink,
			goodsList
		},
		data() {
			return {
				title: 'Hello',
				bannerList: [],
				linksList: [], //分类图标
				pics: [], //推荐块图片
				recommendGoods: [], //推荐商品
				selectedGoods: [], //精选商品
			}
		},
		onLoad() {
			if (!uni.getStorageInfoSync("hasLogin")) {
				vue.$mRouter.reLaunch({
					route: vue.$mRoutesConfig.login
				})
			} else {
				//获取首页全部数据
				this.getAllData();
			}
		},
		onPullDownRefresh() {
			//获取首页全部数据
			this.getAllData('refresh');
		},
		onShow() {
			//获取首页全部数据
			this.getAllData();

		},
		methods: {

			//获取首页全部数据
			getAllData(status = '') {

				//设置默认icon
				// this.linksList=[
				// 	{
				// 		id:5,
				// 		thumb:'../../static/images/index/icon-leader.png',
				// 		cate_name:'全部分类'
				// 	},
				// 	{
				// 		id:6,
				// 		thumb:'../../static/images/index/icon-link6.png',
				// 		cate_name:'军人专区'
				// 	},
				// 	{
				// 		id:7,
				// 		thumb:'../../static/images/index/icon-link7.png',
				// 		cate_name:'平台直播'
				// 	},
				// 	{
				// 		id:8,
				// 		thumb:'../../static/images/index/icon-link8.png',
				// 		cate_name:'每日签到'
				// 	},

				// 	{
				// 		id:9,
				// 		thumb:'../../static/images/index/icon-link9.png',
				// 		cate_name:'会员活动'
				// 	},
				// 	{
				// 		id:10,
				// 		thumb:'../../static/images/index/icon-link10.png',
				// 		cate_name:'积分抽奖'
				// 	}
				// ]
				Promise.all([
					//获取banner
					this.getBanner(),
					//获取推荐和分类
					this.getIndex1(),

					//获取精选商品
					this.getGoodsList('selected'),
					//获取推荐商品
					this.getGoodsList('recommend'),

				]).then(results => {

				}).finally(() => {
					this.stopPull(status)
				})

			},

			//获取推荐和分类
			getIndex1() {
				this.$api.getIndex1().then(res => {
					console.log('获取推荐和分类', res);
					if (res.code == 200) {
						// this.linksList=res.data.cates.splice(0,4).concat(this.linksList) ;
						//整理 数据
						// let menu

						this.linksList = res.data.cates.concat(res.data.menu);
						this.pics = res.data.pics;
					} else {
						console.log('获取推荐和分类', res);
					}
				})
			},
			//获取banner
			getBanner() {
				this.$api.getBanner({
					type: 1
				}).then(res => {
					if (res.code == 200) {
						this.bannerList = res.data;
					} else {
						console.log(res);
					}
				})
			},

			//获取商品 'selected' recommend
			getGoodsList(type) {
				let param = {
					page: 1,
					pageSize: 100,
				}

				if (type == 'selected') {
					param.selected = 'yes';
				} else if (type == 'recommend') {
					param.recommend = 'yes'
				}

				this.$api.getProduct({
					...param
				}).then(res => {

					if (res.code == 200) {
						if (type == 'selected') {

							this.selectedGoods = res.data.data;
						} else if (type == 'recommend') {
							this.recommendGoods = res.data.data;
						}
					} else {
						console.log("获取商品", res);
					}
				})
			}


		}
	}
</script>

<style scoped lang="scss">
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #fff;
		padding-bottom: var(--safe-area-inset-bottom);
	}

	.carousel-wrapper {
		width: 100%;
		height: 300upx;
	}

	.query-wrapper {
		width: 100%;
		height: 120upx;
		margin: 60upx auto;

		&>image {
			width: 100%;
			height: 100%;
		}
	}

	.blocks-wrapper {

		.block-1 {
			width: 430upx;
			height: 220upx;
		}

		.block-2 {
			width: 250upx;
			height: 220upx;
		}

		.block-3 {
			width: 100%;
			height: 220upx;
			margin-top: 12upx;
		}
	}

	// .logo {
	// 	height: 200rpx;
	// 	width: 200rpx;
	// 	margin-top: 200rpx;
	// 	margin-left: auto;
	// 	margin-right: auto;
	// 	margin-bottom: 50rpx;
	// }

	// .text-area {
	// 	display: flex;
	// 	justify-content: center;
	// }

	// .title {
	// 	font-size: 36rpx;
	// 	color: #8f8f94;
	// }
</style>
