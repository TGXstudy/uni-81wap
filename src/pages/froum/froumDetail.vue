<template>
	<view class="container pd-lr-30 flex-column have-fixed-bottom">
		<!-- 发帖人 -->
		<view class="post-man align-items-center">
			<image class="image-sz-60 margin-right-20" :src="postDetail.avatar || require('../../static/images/mine/img-avatar.png')"
			 mode=""></image>
			<view class="flex-column flex-1">
				<text class="fn-sz-24 fn-cl-333">{{postDetail.user_nickname}}</text>
				<text class="fn-sz-22 fn-cl-999">发布于{{postDetail.time}}</text>
			</view>
		</view>
		<!-- 发帖人 -->


		<!-- 帖子内容 -->
		<view class="flex-column width-100-percent">
			<text class="one-line-txt fn-sz-32 fn-cl-333 fn-bold margin-bottom-20">{{postDetail.title}}</text>
			<text class="fn-sz-28 fn-cl-666 margin-bottom-20 ">{{postDetail.content}}</text>
			<image v-for="(item,idx) in postDetail.images" :key="idx" class="width-100-percent margin-bottom-20" :src="item"
			 mode="widthFix"></image>
			<view class="flex-column width-100-percent" v-if="postDetail.video">
				<view class="video-box" v-for="(item,idx) in postDetail.video" :key="idx">
					<video :src="item" controls></video>
				</view>
			</view>


			<vote v-if="postDetail.vote && postDetail.vote.length>0" :list="postDetail.vote" @update="getPostDetail"></vote>
		</view>
		<!-- 帖子内容 -->

		<!-- 帖子评论-->
		<view class="flex-column comment-wrapper">
			<view class="screen-box align-items-center">
				<view class="flex-1 align-items-baseline">
					<text :class="[curPostType == 'all' ? 'fn-cl-333 fn-sz-28 fn-blod':' fn-cl-666 fn-sz-24','margin-right-20']" @tap="changePostType('all')">全部回复</text>
					<text :class="[curPostType == 'own' ? 'fn-cl-333 fn-sz-28 fn-blod':' fn-cl-666 fn-sz-24']" @tap="changePostType('own') ">只看楼主
					</text>
				</view>
				<switch-tab :value="[{key:'asc',name:'正序'},{ key:'desc',name:'倒序'}]" :current="curOrderType" @click="changeOrderType"></switch-tab>
			</view>
			<comment-list :list="comList" :postId="postId" @update="updateCommentList"></comment-list>
			<loadmore :visible="loading"></loadmore>
			<nomore :visible="nomore"></nomore>
		</view>
		<!-- 帖子评论-->

		<view class="fixed-wrapper align-items-center pd-lr-30">
			<view class="flex-1 margin-right-20 input-btn" @tap="goPage('doComment',{type:'comment',postId})">
				<text class="fn-sz-28 fn-cl-999">输入评论内容</text>
			</view>
			<image class="image-sz-60 margin-left-20 margin-right-20" :src=" postDetail.is_like == 1 ? require('../../static/images/froum/icon-zan-red.png') : require('../../static/images/froum/icon-zan.png')"
			 @tap="doCollectOrLike(postDetail.id,'forum_like')"></image>
			<image class="image-sz-60 margin-right-20" :src=" postDetail.is_collect == 1 ?require('../../static/images/froum/icon-collect-red.png') : require('../../static/images/froum/icon-collect.png')"
			 @tap="doCollectOrLike(postDetail.id,'article')"></image>
		</view>

	</view>
</template>

<script>
	import vote from "@/components/froum/Vote.vue"
	import switchTab from "@/components/froum/SwitchTab.vue"
	import commentList from "@/components/froum/CommentList.vue"
	import loadmore from "@/components/common/loadmore.vue";
	import nomore from "@/components/common/nomore.vue"
	export default {
		components: {
			vote,
			switchTab,
			commentList,
			loadmore,
			nomore
		},
		data() {
			return {
				curOrderType: 'asc', // 帖子评论排序方式 desc=>倒序,asc=>正序
				curPostType: 'all', //own只看楼主  all全部回复
				postId: 0,
				postDetail: {},
				comList: [], //帖子评论列表 
				page: 1,
				pageSize: 10,
				loading: false,
				nomore: false,
			}
		},
		onLoad(options) {
			this.postId = options.postId || 0;
			//帖子详情 
			this.getPostDetail();

		},
		onShow() {
			//帖子评论列表
			this.getPostComment();
		},
		onPullDownRefresh() {
			//帖子详情
			this.getPostDetail();
			this.page = 1;
			this.getPostComment("refresh");
		},
		onReachBottom() {
			if (this.nomore) return;
			this.page++;
			this.getPostComment()
		},
		methods: {
			//改变帖子评论排序方式
			changeOrderType(key) {
				this.curOrderType = key;
				this.page=1;
				//帖子评论列表
				this.getPostComment();
			},
			//是否只看楼主
			changePostType(type) {
				this.curPostType = type;
				this.page=1;
				//帖子评论列表
				this.getPostComment();
			},
			//帖子详情 
			getPostDetail() {
				this.$api.getPostDetail({
					forum_id: this.postId
				}).then(res => {
					console.log("帖子详情", res);
					if (res.code == 200) {
						this.postDetail = res.data;
					} else {
						console.log("帖子详情", res);
					}
				})
			},
			//帖子评论列表
			getPostComment(status="") {
				this.loading=true;
				this.nomore=false;
				this.$api.getPostComment({
					forum_id: this.postId,
					page: this.page,
					per_page: this.pageSize,
					order: this.curOrderType, //desc=>倒序,asc=>正序
					is_landlord: this.curPostType == 'all' ? 0 : 1, //是否只看楼主 选传,0=>否,1=>是,默认否
				}).then(res => {
					console.log("帖子评论列表", res);
					if (res.code == 200) {
						this.nomore = this.page >= res.data.total_page;
						if (this.page == 1) {
						    this.comList=res.data.data
						} else {
						    this.comList = this.comList.concat(res.data.data);
						}
						
					} else {
						console.log("帖子评论列表", res);
					}
				}).finally(()=>{
                    this.loading=false;
                    this.stopPull(status)
                })
			},
			updateCommentList(){
				this.page=1;
				this.getPostComment();
			},
			//点赞 或者 收藏
			doCollectOrLike(id,type){
				this.$api.collect({
					id,type
				}).then(res=>{
					if(res.code == 200){
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.getPostDetail();
						})
					}else{
						console.log("点赞 或者 收藏",res);
						this.$mUtils.toast(res.msg);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		background-color: #FFF;

		.post-man {
			width: 100%;
			height: 140upx;
		}

		.video-box {
			width: 100%;
			min-height: 400upx;
			margin-bottom: 20upx;

			video {
				width: 100%;
				// height: 100%;

			}
			
		}

		.comment-wrapper {
			.screen-box {
				width: 100%;
				height: 128upx;
			}
		}

		.input-btn {
			width: 100%;
			height: 80upx;
			background-color: #F8F8F8;
			border-radius: 40upx;
			align-items: center;
			padding-left: 40upx;
		}
	}
</style>
