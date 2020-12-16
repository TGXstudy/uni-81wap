<template>
	<view class="comment-wrapper flex-column">
		<view v-for="(item,idx) in list" :key="idx">
			<image class="image-sz-60 margin-right-20 circle-image" :src="item.avatar"></image>
			<view class="flex-1 flex-column ">
				<view class="flex-column flex-1 margin-bottom-20">
					<text class="fn-sz-24 fn-cl-333">{{item.user_nickname}}</text>
					<view>
						<text class="fn-sz-22 fn-cl-999 margin-right-20">{{item.floor}}楼</text>
						<text class="fn-sz-22 fn-cl-999">发布于{{item.time}}</text>
					</view>

				</view>
				<view class="margin-bottom-20"  @tap="goPage('doComment',{type:'reply',postId,parentId:item.id})">
					<text class=" fn-sz-28 fn-cl-666 text-wrap">{{item.content}}</text>
				</view>
				<view class="images-box ">
					<image :src="item" v-for="(item,idx) in item.images" :key="idx" class="image-sz-160 margin-right-20 margin-bottom-20"
					 mode=""></image>
				</view>
				<view class="videos-box flex-column">
					<view class="video-box margin-bottom-20" v-for="(item,idx) in item.video" :key="idx">
						<video :src="item" controls></video>
					</view>
				</view>
				<view class=" reply-box" :class="[item.list.length>0 ? 'flex-between':'flex-end']">
					<view @tap="showCommentPopup(item.floor,item.list,idx)" v-if="item.list.length>0">
						<text class="fn-cl-999 fn-sz-22">查看{{item.list.length}}条回复</text>
						<image class="image-sz-32" :src="'/static/images/froum/icon-narraw.png' | imgUrl" mode=""></image>
					</view>
					<view class="" @tap="doZan(item.id,'comment_like')">
						<image class="image-sz-32" :src="'/static/images/froum/icon-like.png' | imgUrl" mode=""></image>
						<text class="fn-sz-22 fn-cl-999">{{item.like_count}}</text>
					</view>
				</view>
			</view>

		</view>


		<uni-popup ref="moreComment" :type="'bottom'" class="popup">
			<view class="more-popup flex-column have-fixed-bottom">
				<view class="popup-title">
					<text class="fn-cl-333 fn-sz-32 fn-bold">{{floor}}楼的回复</text>
					<image class="icon-close image-sz-48" :src="require('../../static/images/index/icon-close.png')" @tap="closePopup('moreComment')"></image>
				</view>
				<view class="flex-1 pd-lr-30 have-fixed-bottom">
					<scroll-view scroll-y="true" class="flex-1">
						<view v-for="(item,idx) in replyList" :key="idx">
							<image class="image-sz-60 margin-right-20 circle-image" :src="item.avatar"></image>
							<view class="flex-1 flex-column ">
								<view class="flex-column flex-1 margin-bottom-20">
									<text class="fn-sz-24 fn-cl-333">{{item.user_nickname}}</text>
									<view>
										<text v-if="idx == 0" class="fn-sz-22 fn-cl-999 margin-right-20">{{floor}}楼</text>
										<text class="fn-sz-22 fn-cl-999">发布于{{item.time}}</text>
									</view>

								</view>
								<view class="margin-bottom-20 content-box" @tap="replyComment(idx,item.id)">
									<text class=" fn-sz-28 fn-cl-theme margin-right-20 ">回复 {{item.to_user_nickname}} </text>
									<text class=" fn-sz-28 fn-cl-666 text-wrap ">{{item.content}}</text>
								</view>
								<view class="images-box ">
									<image :src="item" v-for="(item,idx) in item.images" :key="idx" class="image-sz-160 margin-right-20 margin-bottom-20"
									 mode=""></image>
								</view>
								<view class="videos-box flex-column">
									<view class="video-box margin-bottom-20" v-for="(item,idx) in item.video" :key="idx">
										<video :src="item" controls></video>
									</view>
								</view>

								<view class="flex-end reply-box" @tap="doZan(item.id,'comment_like')">
									<image class="image-sz-32" :src="'/static/images/froum/icon-like.png' | imgUrl" mode=""></image>
									<text class="fn-sz-22 fn-cl-999">{{item.like_count}}</text>
								</view>
							</view>

						</view>
					</scroll-view>
				</view>

				<view class="fixed-wrapper align-items-center pd-lr-30 z-index-9999">
					<view class="flex-1 margin-right-20 input-btn" @tap="goPage('doComment',{type:'reply',postId,parentId:replyList[0].id})">
						<text class="fn-sz-28 fn-cl-999">输入评论内容</text>
					</view>
				</view>
			</view>
		</uni-popup>


	</view>
</template>

<script>
	import uniPopup from "@/components/common/uni-popup.vue"
	export default {
		components: {
			uniPopup,
		},
		props: {
			list: {
				type: Array
			},
			postId: {
				type: [Number, String]
			}
		},
		watch: {
			list: {
				immediate: true,
				deep: true,
				handler: function(val) {
					// console.log("watch----------",val);
					if(val[this.idx] && val[this.idx].list) this.replyList=val[this.idx].list; //更新弹窗 回复数据
					return val;
				}
			},
			replyList: {
				immediate: true,
				deep: true,
				handler: function(val) {
					// console.log("watch****",val);
					return val;
				}
			},
		},
		data() {
			return {
				floor: 1, //点击 查看* 条回复 的楼层
				replyList: [], //回复列表this.idx=idx;
				idx:0, //用于更新弹窗 回复数据
			}
		},
		methods: {
			//点击 查看* 条回复
			showCommentPopup(floor, replyList,idx) {
				this.floor = floor;
				this.replyList = replyList;
				this.idx=idx;    //用于更新弹窗 回复数据
				this.$refs.moreComment.open();

			},
			closePopup(type) {
				this.$refs[type].close();
			},

			//回复评论
			replyComment(idx, id) {
				if (idx == 0) return;
				this.$refs.moreComment.close();
				this.goPage('doComment', {
					type: 'reply',
					postId: this.postId,
					parentId: id
				});
				

			},
			//点赞 
			doZan(id,type){
				this.$api.collect({
					id,type
				}).then(res=>{
					if(res.code == 200){
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.$emit("update")
						})
					}else{
						console.log("点赞",res);
						this.$mUtils.toast(res.msg);
					}
				})
			}


		}
	}
</script>

<style lang="scss" scoped>
	.reply-box {
		height: 100upx;
	}

	.input-btn {
		width: 100%;
		height: 80upx;
		background-color: #F8F8F8;
		border-radius: 40upx;
		align-items: center;
		padding-left: 40upx;
	}

	.content-box {
		display: block;
	}

	.images-box {
		width: 100%;
		flex-wrap: wrap;
	}

	.videos-box {
		width: 100%;

		.video-box {
			width: 100%;
			min-height: 400upx;

			video {
				width: 100%;
				// height: 100%;
			}
		}

	}

	.popup {
		/deep/.uni-popup__wrapper-box {
			border-radius: 20upx 20upx 0 0;
			z-index: 9999;
		}
	}

	.more-popup {
		padding-top: 100upx;
		height: 1000upx;

		.popup-title {
			width: 100%;
			height: 100upx;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			right: 0;
			left: 0;
			z-index: 999;
			border-radius: 20upx 20upx 0 0;
			background-color: #fff;

			.icon-close {
				position: absolute;
				top: 40upx;
				right: 30upx;
			}
		}

		.z-index-9999 {
			z-index: 9999 !important;
		}

	}
</style>
