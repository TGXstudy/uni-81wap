<template>
	<view class="container" :style="{'padding-top': isShowFixed ? '180upx':0,}">
		<view v-if="!isShowFixed" class="title-bar flex-between pd-lr-30 align-items-center">
			<text class="fn-sz-36 fn-cl-fff fn-bold">兵站论坛</text>
			<view class="align-items-center" @tap="goPage('publish')">
				<image class="image-sz-48" :src="require('../../static/images/froum/icon-post.png')"></image>
				<text class="fn-sz-28 fn-cl-fff">发帖</text>
			</view>
		</view>
		<view v-else class="navigator-bar ">
			<text class="fn-sz-32 fn-cl-333 fn-bold">兵站论坛</text>
			<view class="post-btn" @tap="goPage('publish')">
				<image class="image-sz-48 " :src="require('../../static/images/froum/icon-post-fixed.png')"></image>
				<text class="fn-sz-28 fn-cl-333">发帖</text>
			</view>
		</view>

		<view class="type-tabs" :class="[isShowFixed? 'isFixed':'']">
			<view class="" v-for="item in tabsList" :key="item.key" @tap="changeTab(item.key)">
				<text :class="['fn-sz-32',currentTab== item.key ? 'fn-bold fn-cl-theme':'fn-cl-333']">{{item.name}}</text>
			</view>
		</view>

		<view class="tabs-content pd-lr-30 width-100-percent">
			<view v-if="currentTab == 'recommend'" class="flex-column width-100-percent">
				<!-- 置顶 -->
				<view class="flex-column">
					<view v-for="(item,idx) in topList" :key="idx" class="top-item" @tap="goPage('froumDetail',{postId:item.id})">
						<image :src="require('../../static/images/froum/icon-top.png')" mode=""></image>
						<text class="fn-cl-333 fn-sz-28 fn-bold one-line-txt flex-1">{{item.title}}</text>
					</view>
					<!-- <view class="top-item" @tap="goPage('froumDetail',{froumId:666})">
						<image src="../../static/images/froum/icon-top.png" mode=""></image>
						<text class="fn-cl-333 fn-sz-28 fn-bold one-line-txt flex-1">拆分腾讯是不是已经迫在眉睫？拆分腾讯是不是已经迫在眉睫？</text>
					</view> -->
				</view>
				<!-- 置顶 -->

				<!-- 看帖顺序 -->
				<view class="flex-between sorts-box width-100-percent">
					<text class="fn-sz-24 fn-cl-666">看帖顺序</text>
					<switch-tab :value="[{key:'reply',name:'回复'},{ key:'post',name:'发布'}]" :current="curSortType" @click="changeSortType"></switch-tab>
				</view>
				<!-- 看帖顺序 -->

				<view class="flex-column width-100-percent">
					<rec-list :list="postList"></rec-list>
					<loadmore :visible="loading"></loadmore>
					<nomore :visible="nomore"></nomore>
				</view>
			</view>
			<view v-else-if="currentTab == 'boutique'" class="flex-column width-100-percent">
				<bot-list :list="postList"></bot-list>
				<loadmore :visible="loading"></loadmore>
				<nomore :visible="nomore"></nomore>
			</view>
			<view v-else class="flex-column width-100-percent">
				<ser-list :list="postList"></ser-list>
				<loadmore :visible="loading"></loadmore>
				<nomore :visible="nomore"></nomore>
			</view>
		</view>
	</view>
</template>

<script>
	import recList from "@/components/froum/RecList.vue"
	import botList from "@/components/froum/BotList.vue"
	import serList from "@/components/froum/SerList.vue"
	import switchTab from "@/components/froum/SwitchTab.vue"
	import loadmore from "@/components/common/loadmore.vue";
	import nomore from "@/components/common/nomore.vue"
	export default {
		components: {
			recList,
			botList,
			serList,
			switchTab,
			loadmore,
			nomore,
		},

		//设置页面滚动 顶部导航的样式
		onPageScroll(e) {
			//滚动前顶部导航的高度
			this.barHeight = 250 + 100;

			//顶部导航滚完切换样式
			if (e.scrollTop >= uni.upx2px(this.barHeight)) {
				this.isShowFixed = true;
				// e.scrollTop=uni.upx2px(180) ;
			} else if (e.scrollTop <= 0) {
				this.isShowFixed = false;
			}
			// console.log("ddddd",e.scrollTop,uni.upx2px(250));
		},
		data() {
			return {
				isShowFixed: false, //控制顶部导航样式的切换
				barHeight: 0, //滚动前顶部导航的高度
				currentTab: 'recommend',
				tabsList: [{
						key: "recommend",
						name: '推荐'
					},
					{
						key: "boutique",
						name: '精品'
					},
					{
						key: "search",
						name: '热搜'
					}
				],
				curSortType: 'post', //推荐的排序方式
				page: 1,
				pageSize: 10,
				loading: false,
				nomore: false,
				postList: [],
				topList: [], //置顶
			}
		},

		onPullDownRefresh() {
			this.page = 1;
			this.getPostList(this.currentTab, "refresh");
		},
		onReachBottom() {
			if (this.nomore) return;
			this.page++;
			this.getPostList(this.currentTab);
		},
		onLoad() {
			// 帖子列表 
			this.getPostList(this.currentTab);

		},
		methods: {
			changeTab(key) {
				this.page=1;
				this.currentTab = key;
				if (this.isShowFixed) {
					uni.pageScrollTo({
						scrollTop: this.barHeight,
						duration: 300
					});
				}
				this.getPostList(this.currentTab)
			},
			changeSortType(key) {
				this.curSortType = key;
				this.getPostList(this.curSortType)
			},
			//帖子列表
			getPostList(param = "",status="") {

				//'recommend', boutique search
				if (param == "boutique") { //精品
					this.type = "elite";
					this.order = "";
				} else if (param == "top") {
					this.type = 'top';
					this.order = "";
				} else if (param == "search") { //热搜
					this.type = "";
					this.order = 3;
				} else {
					this.order = this.curSortType == 'reply' ? 2 : 1;
					this.type = "";
				}

				this.$api.getPostList({
					page: this.page,
					per_page: this.pageSize,
					order: this.order, //  选传,1=>发帖时间(默认),2=>回复时间,3=>点击数(热榜)
					type: this.type, // 选传,elite=>精华,top=>置顶
				}).then(res => {
					console.log("帖子列表" + this.type, res);
					if (this.type == "top") {
						this.topList = res.data.data;
					} else {
						// this.postList = res.data.data;
						if (this.currentTab == "recommend") {
							this.getPostList('top');
						}

						this.nomore = this.page >= res.data.total_page;
						if (this.page == 1) {
							this.postList = res.data.data
						} else {
							this.postList = this.postList.concat(res.data.data);
						}
					}
				}).finally(()=>{
					this.loading=false;
					this.stopPull(status);
				})
			}


		},


	}
</script>

<style lang="scss" scoped>
	.container {
		transition: all 1s;

		.title-bar {
			width: 100%;
			height: 250upx;
			background-size: cover;
			background-image: url(../../static/images/froum/bg-top.png);
		}

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

			.post-btn {
				position: absolute;
				top: 0;
				right: 30upx;
				height: 80upx;
				align-items: center;
			}

		}

		.isFixed {
			position: fixed;
			top: 80upx;
			left: 0;
			right: 0;
			z-index: 999;
		}

		.type-tabs {
			width: 100%;
			height: 100upx;
			align-items: center;
			justify-content: space-around;
			background-color: #fff;
		}

		.tabs-content {

			.top-item {
				height: 60upx;
				width: 100%;
				align-items: center;

				image {
					width: 60upx;
					height: 32upx;
					margin-right: 20upx;
				}
			}

			.sorts-box {
				width: 100%;
				height: 90upx;
				align-items: center;


			}

		}
	}
</style>
