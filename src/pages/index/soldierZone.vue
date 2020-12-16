<template>
	<!-- 军人专区 -->
	<view class="container">
		<view class="poster-wrapper pd-lr-30">
			<image :src="poster"></image>
		</view>
		<!-- 优享81折 -->
		<view class="flex-column pd-lr-30 width-100-percent" v-if="disList.length">
			<view class="star-title ">
				<text class=" fn-sz-32 fn-cl-333 fn-bold">优享81折</text>
				<image class="icon-star" :src="require('../../static/images/index/icon-star.png')"></image>
			</view>
			<scroll-view scroll-x="true" class="scroll-x-box">
				<view class="scroll-x-item zone-item flex-column" v-for="(item,idx) in disList" :key="idx" @tap="goPage('goodsDetail',{goodsId:item.id})">
					<image class="zone-image" :src="item.thumb" mode=""></image>
					<view class="flex-column zone-info">
						<text class="fn-sz-24 fn-cl-333 zone-title ">{{item.product_name}}</text>
						<view class="width-100-percent">
							<text class="fn-sz-22 fn-cl-theme margin-right-10">￥{{item.now_price}}</text>
							<text class="fn-sz-22 fn-cl-999 delete-line">￥{{item.price}}</text>
						</view>
					</view>
				</view>
			</scroll-view>


		</view>

		<!-- 军人专享 -->
		<view class="flex-column pd-lr-30 width-100-percent flex-1">
			<view class="star-title ">
				<text class=" fn-sz-32 fn-cl-333 fn-bold">军人专享</text>
				<image class="icon-star" :src="require('../../static/images/index/icon-star.png')"></image>
			</view>
			<view class="goods-wrapper flex-column" v-if="goodList.length > 0">
				<goods-list :list="goodList"></goods-list>
				<loadmore :visible="loading"></loadmore>
				<nomore :visible="nomore"></nomore>
			</view>
			<default-view v-else class="flex-1"></default-view>
		</view>
	</view>
</template>

<script>
	import carousel from "@/components/index/Carousel.vue"
	import goodsList from "@/components/index/GoodsList.vue"
	import loadmore from "@/components/common/loadmore.vue";
	import nomore from "@/components/common/nomore.vue"
	import defaultView from "@/components/common/Default.vue"
	export default {
		components: {
			carousel,
			goodsList,
			loadmore,
			nomore,
			defaultView
		},
		data() {
			return {
				loading: false,
				nomore: false,
				goodList: [], //商品列表
				disList: [], //81折  商品列表
				page: 1,
				pageSize: 10,
				soldier_recommend: '', // 军人专享，传yes
				enjoy81: '', //优享81折，传yes
				poster: '' //广告图 单图
			}
		},
		onLoad() {
			//获取商品
			this.getGoodsList('soldier_recommend');
			//获取商品
			this.getGoodsList('enjoy81');
			//获取广告图 单图
			this.getPicture();
		},
		onReachBottom() {
			if (this.nomore) return;
			this.page++;
			this.getGoodsList('soldier_recommend');
		},
		methods: {
			//获取广告图 单图
			getPicture() {
				this.$api.getPicture({
					type: 4
				}).then(res => {

					if (res.code == 200) {
						this.poster = res.data.img;
					} else {
						console.log("//获取广告图 单图", res);
					}
				})
			},
			//获取商品
			getGoodsList(type) {
				this.loading = true;
				this.nomore = false;
				this.pageSize = type == 'enjoy81' ? 100 : this.pageSize;
				this.$api.getProduct({
					page: this.page,
					pageSize: this.pageSize,
					soldier_recommend: type == 'soldier_recommend' ? 'yes' : '',
					enjoy81: type == 'enjoy81' ? 'yes' : '',
				}).then(res => {
					console.log("获取商品", res);
					if (res.code == 200) {
						if (type == "enjoy81") {
							this.disList = res.data.data
						} else {
							this.page = res.data.current_page;
							this.nomore = this.page >= res.data.last_page;
							if (this.page == 1) {
								this.goodList = res.data.data
							} else {
								this.goodList = this.goodList.concat(res.data.data);
							}
						}

					} else {
						console.log("获取商品", res);
					}
				}).finally(() => {
					this.loading = false;
					// this.stopPull(status)
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #fff;
		min-height: calc(100vh - var(--window-top));

		.poster-wrapper {
			width: 100%;
			height: 300upx;
		}

		.zone-item {
			width: 200upx;
			height: 300upx;
			background-color: #FFF1F1;
			margin-right: 20upx;
			border-radius: 8upx;

			.zone-image {
				width: 200upx;
				height: 200upx;
			}

			.zone-info {
				height: 100upx;
				width: 100%;
				padding: 0 10upx;
				box-sizing: border-box;

				.margin-right-10 {
					margin-right: 10upx;
				}

				.zone-title {
					overflow: hidden;
					text-overflow: ellipsis;
					-webkit-line-clamp: 1;
					margin-bottom: 20upx;
				}
			}
		}
	}
</style>
