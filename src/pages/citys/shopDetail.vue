<template>
	<view class="container">
		<view class="flex-column" id="topPart">
			
			<view class="title-bar pd-lr-30 flex-column ">
				<view class="navigator-bar flex-between">
					<image class="image-sz-36 " :src="require('../../static/images/sign/icon-back.png')" @tap="goBack"></image>
					<text class="fn-cl-fff fn-sz-32 fn-bold">店铺详情</text>
				</view>
				<view class="align-items-center flex-1">
					<image :src="shopInfo.shop_image" class="border-radius-8 image-sz-140 margin-right-20"></image>
					<text class="fn-sz-28 fn-cl-fff fn-bold flex-1">{{shopInfo.shop_name}}</text>
				</view>
				
			</view>
			<view class="shop-intro flex-column">
				<view class="intro-box" :style="{height:isOpen?'auto':'100upx'}">
					<text class="fn-sz-24 fn-cl-666">{{shopInfo.describe}}</text>
				</view>

				<view class="width-100-percent flex-between lign-items-center margin-top-40 margin-bottom-20">

					<view @tap="doCollect('shop',shopInfo.shop_id)">
						<image class="image-sz-32" :src=" shopInfo.is_collect ? require('../../static/images/citys/icon-collect-theme.png') :require('../../static/images/citys/icon-collect-black.png') "></image>
						<text class=" fn-sz-24" :class="[shopInfo.is_collect ? 'fn-cl-theme':'fn-cl-666']">{{shopInfo.is_collect ? '取消收藏':'收藏店铺'}}
						</text>
					</view>

					<view @tap="open" class="align-items-center">
						<text class="fn-cl-666 fn-sz-24">{{isOpen ? '收起':'展开'}}</text>
						<image class="image-sz-24" :style="{'tranform':isOpen ? 'rotate(180deg)':'rotate(0)'}" :src="'/static/images/citys/icon-down.png'| imgUrl"
						 mode=""></image>
					</view>

				</view>
			</view>

			<view class="search-wrapper align-items-center pd-lr-30" >
				<view class="search-box flex-1 margin-right-20 align-items-center pd-lr-30">
					<image class="image-sz-32 margin-right-20 " :src="'/static/images/index/icon-search.png' | imgUrl" mode=""></image>
					<input type="text" v-model.trim="keyword" class="fn-sz-28" placeholder="店内搜索" confirm-type="done" @confirm="doSearch"/>
				</view>
				<text class="fn-cl-333 fn-sz-28" @tap="doSearch">搜索</text>
			</view>

			<view>
			</view>
		</view>

		<view class="flex-column" v-if="firstCateList.length>0">
			<scroll-view scroll-x="true" class="scroll-x-box">
				<view class="scroll-x-item" v-for="(item,idx) in firstCateList" :key="idx" @tap="setFirstCate(item.cate_id,idx)">
					<text :class="['fn-sz-28',item.cate_id== curFirstCate ? 'fn-cl-theme':'fn-cl-999']">{{item.cate_name}}</text>
				</view>
			</scroll-view>
			<view>
				<scroll-view scroll-y="true" class="left-cate-box" :style="{height:leftHeight}">
					<view class="left-cate-item" :class="curSecdCate == item.cate_id ?'current-cate' : '' " v-for="(item,idx) in secdCateList"
					 :key="idx" @tap="setSecdCate(item.cate_id)">
						<view class="left-cate-name one-line-txt ">{{item.cate_name}}</view>
					</view>
				</scroll-view>

				<scroll-view scroll-y="true" class="right-goods-box" :style="{height:leftHeight}">
					<goods-list :list="goodList"></goods-list>
					<loadmore :visible="loading"></loadmore>
					<nomore :visible="nomore"></nomore>
				</scroll-view>
			</view>
		</view>
		<default-view v-else :height="'calc(100vh - '+topHeight+'px)'"></default-view>
	</view>
</template>

<script>
	import goodsList from "@/components/citys/GoodsList.vue"
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
				isOpen: false, //控制简介的 展开 收起
				topHeight: 0, //上半部分的高度
				curFirstCate: 0, //一级分类,
				leftHeight: 0, //左侧二级分类的高度
				curSecdCate: 1, //二级分类
				shopId: 0, //店铺id
				shopInfo: {},
				firstCateList: [],
				secdCateList: [],
				page: 1,
				paegSize: 10,
				goodList: [], //商品列表
				loading: false,
				nomore: false,
				keyword:"",
			}
		},
		onLoad(options) {
			console.log("-----", options);
			this.shopId = options.shopId || 0;
			//左侧二级分类的高度
			this.getLeftHeight();
			//店铺详情
			this.getShopInfo();
		},
		onReachBottom() {
			if (this.nomore) return;
			this.page++;
			this.queryRecord()
		},
		onShow() {

		},
		methods: {
			goBack(){
				this.$mRouter.back();
			},
			//选择一级分类
			setFirstCate(cateId,idx) {
				// console.log("TODO");
				this.curFirstCate = cateId;
				this.secdCateList=this.firstCateList[idx].child;
				
				this.setSecdCate(this.secdCateList[0].cate_id)
				// this.curSecdCate=this.secdCateList[0].cate_id;
				// this.page=1;
				// this.getShopGoods();
			},
			//单击左侧分类
			setSecdCate(id){
				this.keyword="";
				this.curSecdCate=id;
				this.page=1;
				this.getShopGoods();
			},
			//店铺详情 
			getShopInfo() {
				this.$api.getShopInfo({
					shop_id: this.shopId,
					p_cate_id: this.curFirstCate
				}).then(res => {
					console.log("店铺详情", res);
					if (res.code == 200) {
						this.shopInfo = res.data.shop_info;
						this.firstCateList = res.data.cate_info;
						this.curFirstCate = this.firstCateList && this.firstCateList[0] && this.firstCateList[0].cate_id;
						this.secdCateList = this.firstCateList[0].child;
						this.curSecdCate = this.secdCateList && this.secdCateList[0] && this.secdCateList[0].cate_id;

						//获取商品
						this.getShopGoods();

					} else if (res.code == 210) {
						this.$mUtils.toast(res.msg, true).then(() => {
							this.$mRouter.switchTab({
								route: this.$mRoutesConfig.index
							})
						})
					} else {
						console.log("店铺详情", res);
					}
				})
			},
			
			//获取商品
			getShopGoods() {
				this.loading=true;
				this.nomore=false;
				this.$api.getProduct({
					page: this.page,
					page: this.pageSize,
					keyword:this.keyword,
					cate_id: this.curSecdCate,
					shop_id: this.shopId,
				}).then(res => {
					console.log("//获取商品", res);
					if (res.code == 200) {
						this.page = res.data.current_page;
						this.nomore = this.page >= res.data.last_page;
						if (this.page == 1) {
						    this.goodList=res.data.data
						} else {
						    this.goodList = this.goodList.concat(res.data.data);
						}
					} else {
						console.log("//获取商品", res);
					}
				}).finally(()=>{
                    this.loading=false;
                    // this.stopPull(status)
                })
			},
			open() {
				this.isOpen = !this.isOpen;
				//左侧二级分类的高度
				this.getLeftHeight()


			},
			getLeftHeight() {
				this.$nextTick(function() {
					//计算上半部分的高度
					const query = uni.createSelectorQuery().in(this);
					query.select('#topPart').boundingClientRect(data => {
						console.log("计算上半部分的高度", data.height);
						this.topHeight = data.height;
						this.leftHeight = 'calc(100vh - ' + (this.topHeight + uni.upx2px(100)) + 'px)'
					}).exec();
				})
			},
			//收藏店铺
			doCollect(type, id) {
				this.$api.collect({
					id,
					type
				}).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg, true).then(() => {
							this.getShopInfo();
						})
					} else {
						console.log("点赞 或者 收藏", res);
						this.$mUtils.toast(res.msg);
					}
				})
			},
			//搜索
			doSearch(){
				if(!this.keyword){
					this.$mUtils.toast("请输入搜索内容");
					return;
				}
				this.page=1;
				this.getShopGoods();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #f9f9f9;

		.title-bar {
			width: 100%;
			height:384upx;
			background-size: contain;
			background-image: url(../../static/images/citys/bg-top.png);
			background-color: #fff;
			.navigator-bar {
				width: 100%;
				height: 80upx;
				align-items: center;
				position: relative;
				justify-content: center;
				.image-sz-36 {
					position: absolute;
					top:calc(50% - 18upx);
					left: 0;
					width: 36upx;
					height: 36upx;
				}
			
			}
		}

		.shop-intro {
			background-color: #fff;
			padding: 0 44upx;

			.intro-box {
				overflow: hidden;
			}
		}

		.search-wrapper {
			width: 100%;
			height: 120upx;

			.search-box {
				height: 80upx;
				background-color: #fff;
				border-radius: 40upx;
			}

		}

		.scroll-x-box {
			display: flex;
			align-items: center;
			height: 100upx;
			background-color: #fff;

			.scroll-x-item {
				height: 100upx;
				line-height: 100upx;
				margin: 0 30upx;
			}
		}

		.left-cate-box {
			width: 200upx;
			background-color: #F5F6F7;

			.current-cate {
				background-color: #fff;
			}

			.left-cate-item {
				font-size: 26upx;
				color: #333;
				height: 100upx;
				width: 100%;
				align-items: center;



				.left-cate-name {
					flex: 1;
					justify-content: center;
					align-items: center;
					padding: 0 10upx;
					box-sizing: border-box;
				}
			}

		}

		.right-goods-box {
			background-color: #fff;
		}
	}
</style>
