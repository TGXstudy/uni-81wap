<template>
	<!-- 城市站 -->
	<view class="container">
		<!-- 头部导航 -->
		<view class="navigator-bar">
			<view class="loction-box">
				<image class="image-sz-32" :src="'/static/images/citys/icon-location.png' | imgUrl" mode=""></image>
				<text class="fn-cl-333 fn-sz-28">{{cityName}}</text>
			</view>
			<text class="fn-sz-32 fn-cl-333 fn-bold">城市站</text>
		</view>

		<view class="carousel-wrapper pd-lr-30">
			<carousel :list="bannerList"></carousel>
		</view>

		<view class="flex-column">
			<shop-list :list="shopList"></shop-list>
			<loadmore :visible="loading"></loadmore>
			<nomore :visible="nomore"></nomore>
		</view>

		<uni-popup ref="load" class="popup">
			<view class="loading-box">
				定位中...
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import carousel from "@/components/index/Carousel.vue"
	import shopList from "@/components/citys/ShopList.vue"
	import loadmore from "@/components/common/loadmore.vue";
	import nomore from "@/components/common/nomore.vue"
	import uniPopup from "@/components/common/uni-popup.vue"
	//引入高德地图 H5
	import aMapH5 from "@/common/js/AMap.js"
	export default {
		components: {
			carousel,
			shopList,
			loadmore,
			nomore,
			uniPopup
		},
		onLoad() {
			// //获取店铺列表
			// this.getShopList();
			//获取banner
			this.getBanner();
			
			var tid=setTimeout(()=>{
				//获取当前定位
				this.getCurLocation()
			},1000)
			
		},
		onShow() {
			
		},
		onPullDownRefresh() {
			this.page = 1;
			//获取banner
			this.getBanner(),
			this.getShopList("refresh");
		},
		data() {
			return {
				page: 1,
				pageSize: 10,
				cityCode: 0,
				bannerList: [],
				shopList: [],
				loading: false,
				nomore: true,
				cityName:'', //定位城市
			}
		},
		methods: {
			//获取当前定位
			getCurLocation() {
				console.log(this.$refs.load);
				this.$refs.load.open();
				console.log("获取当前定位H5")

				let that = this;
				aMapH5().then(AMap => {
					AMap.plugin("AMap.Geolocation", function() {
						let geoloc = new AMap.Geolocation({
							// 是否使用高精度定位，默认：true
							enableHighAccuracy: true,
							// 设置定位超时时间，默认：无穷大
							timeout: 10000,

						})
						geoloc.getCurrentPosition()
						AMap.event.addListener(geoloc, 'complete', onComplete)
						AMap.event.addListener(geoloc, 'error', onError)

						function onComplete(data) {
							that.$refs.load.close();
							console.log("具体的定位信息", data.addressComponent,data.position);
							that.cityCode=data.addressComponent.adcode.slice(0, 4) + "00";
							that.cityName=data.addressComponent.city;
							that.getShopList();
						}

						function onError(data) {
							console.log("GPS定位失败");
							that.$refs.load.close();
							that.$mUtils.toast("GPS定位失败")
							that.cityCode="510100";
							that.cityName="成都市"
							that.getShopList();
							// 调用ip定位
							// that.getLocByIp();

						}
					})

				}, e => {
					console.log('地图加载失败', e)
				})




			},
			//获取店铺列表
			getShopList(status = '') {
				this.loading = true;
				this.$api.getShopList({
					city_code: this.cityCode,
					page: this.page,
					pageSize: this.pageSize,
				}).then(res => {
					console.log("获取店铺列表", res)
					if (res.code == 200) {
						this.page = res.data.current_page;
						this.nomore = this.page >= res.data.last_page;
						if (this.page == 1) {
							this.shopList = res.data.data;
						} else {
							this.shopList = this.shopList.concat(res.data.data);
						}
					} else {
						console.log("获取店铺列表", res)
					}

				}).finally(() => {
					this.loading = false;
					//刷新成功 下拉loading隐藏
					this.stopPull(status);
				})
			},
			//获取banner
			getBanner() {
				this.$api.getBanner({
					type: 2
				}).then(res => {
					if (res.code == 200) {
						this.bannerList = res.data;
					} else {
						console.log(res);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-top: 100upx;

		.navigator-bar {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			width: 100%;
			height: 80upx;
			justify-content: center;
			align-items: center;
			background-color: #fff;
			z-index: 999;

			.loction-box {
				position: fixed;
				top: 0;
				left: 30upx;
				height: 80upx;
				align-items: center;
			}
		}

		.carousel-wrapper {
			width: 100%;
			height: 300upx;
		}
		
		.popup{
			/deep/.uni-popup__wrapper-box{
				background-color: transparent;
			}
			
			.loading-box{
				height: 100upx;
				color: #fff;
				font-size: 32upx;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
