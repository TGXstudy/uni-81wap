<template>
	<!-- 分类商品列表 -->
	<view class="container">
		<view v-if="pCateId != 0" class="tab-wrapper align-items-center">
			<view class="tab-item" @tap="tapScreenItem('cate')">
				<text class=" fn-sz-28 fn-cl-333 one-line-txt">{{cateName}}</text>
				<image class="image-sz-32" :src="showScreenPopup ? require('../../static/images/index/icon-screen4.png') :require('../../static/images/index/icon-screen3.png')"
				 mode=""></image>
			</view>
			<view class="tab-item" @tap="tapScreenItem('price')">
				<text class=" fn-sz-28 fn-cl-333">价格</text>
				<image v-if="priceSort == 'ASC'" class="image-sz-32" :src="require('../../static/images/index/icon-screen1.png')" mode=""></image>
				<image v-else-if="priceSort == 'DESC'" class="image-sz-32" :src="require('../../static/images/index/icon-screen2.png')" mode=""></image>
				<image v-else class="image-sz-32" :src="require('../../static/images/index/icon-screen5.png')" mode=""></image>
			</view>
		</view>
		<screen-popup :show="showScreenPopup" :top="80" :height="500" @close="showScreenPopup=false">
			<scroll-view scroll-y="true" class="screen-wrapper bg-cl-f5f5f5">
				<view v-for="(item,idx) in secdCateList" :key="idx" class="screen-item" @tap.stop="tapCate(item.cate_id)">
					<text class="fn-sz-24  one-line-txt" :class="cateId == item.cate_id ? 'fn-cl-theme': 'fn-cl-333'">{{item.cate_name}}</text>
				</view>
			</scroll-view>
		</screen-popup>
		<view class="goods-list-wrapper pd-lr-30 flex-column" v-if="goodList.length > 0">
			<goods-list :list="goodList"></goods-list>
			<loadmore :visible="loading"></loadmore>
			<nomore :visible="nomore"></nomore>
		</view>
		<default-view v-else class="flex-1"></default-view>
	</view>
</template>

<script>
	import screenPopup from "@/components/index/ScreenPopup.vue"
	import goodsList from "@/components/index/GoodsList.vue"
	import defaultView from "@/components/common/Default.vue"
	import loadmore from "@/components/common/loadmore.vue";
	import nomore from "@/components/common/nomore.vue"
	export default {
		components: {
			goodsList,
			screenPopup,
			loadmore,
			defaultView,
			nomore
		},
		data() {
			return {
				loading: false,
				nomore: false,
				goodList: [],
				curScreen: "",
				showScreenPopup: false, //控制筛选弹窗
				priceSort: '', //价格升序 降序
				cateName: '',
				params: {
					page: 1,
					pageSize: 10,
					p_cate_id: '', // 一级分类id
					cate_id: '', //分类id
					order: ''
				},
				pCateId:'',
				cateId:'',
				secdCateList:[], //二级分类
			}
		},
		onLoad(options) {
			this.cateId = options.cateId || '';
			this.pCateId=options.pCateId || ''
			
			this.barTitle = options.title || "分类商品列表"
			this.cateName = options.title || "分类"
			uni.setNavigationBarTitle({
				title: this.barTitle
			})
			//获取商品
			this.params.p_cate_id = this.pCateId;
			this.params.cate_id=this.cateId;
			this.getGoodsList();
			
			//有一级分类
			if(this.pCateId){
				//获取对应的二级分类
				this.getSecdCates()
			}
		},
		methods: {
			
			//获取对应的二级分类
			getSecdCates(){
				this.$api.getCates({
					p_cate_id:this.pCateId
				}).then(res=>{
					console.log("获取对应的二级分类",res);
					if(res.code == 200){
						this.secdCateList=res.data;
					}else{
						console.log("获取对应的二级分类",res);
					}
				})
			},
			
			getGoodsList(status='') {
				this.loading = true;
				this.nomore = false;
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
					this.stopPull(status)
				})
			},
			onReachBottom() {
				if (this.nomore) return;
				this.params.page++;
				this.getGoodsList();
			},
			onPullDownRefresh() {
				this.params.page= 1;
				this.getGoodsList("refresh");
			},
			tapScreenItem(screenType) {
				this.curScreen = screenType;
				if (this.curScreen == 'cate') {
					this.showScreenPopup = !this.showScreenPopup;
				} else {
					this.showScreenPopup = false;
					this.priceSort = this.priceSort == 'DESC' ? 'ASC' : 'DESC';
					this.params.page = 1;
					this.params.order = this.priceSort;
					this.getGoodsList();
					// console.log(this.priceSort);
				}

			},
			tapCate(id) {
				this.cateId=id;
				this.params.cate_id=this.cateId;
				this.showScreenPopup=false;
				this.getGoodsList();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		background-color: #f9f9f9;
		min-height: calc(100vh - var(--window-top));
		width: 100%;
		padding-top: 80upx ;
		.tab-wrapper {
			width: 100%;
			height: 80upx;
			background-color: #fff;
			justify-content: space-around;
			position: fixed;
			top:var(--window-top);
			left: 0;
			right: 0;
			z-index: 666;
			.tab-item {
				width: 50%;
				padding: 0 20upx;
				justify-content: center;
				align-items: center;
			}
		}

		.screen-wrapper {
			height: 500upx;
			padding: 40upx;

			.screen-item {
				display: inline-block;
				width: 40%;
				height: 80upx;
				line-height: 80upx;

			}

			.screen-item:nth-child(2n+1) {
				margin-right: 10%;
			}
		}

	}
</style>
