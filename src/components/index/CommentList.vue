<template>
	<view class="comment-list-box flex-column ">
		<view class="comment-item-box " v-for="(item,idx) in list" :key="idx">
			<view class="avatar-box margin-right-20">
				<image class="circle-image"  :src="item.avatar" mode=""></image>
			</view>
			<view class="comment-detail-box flex-column">
				<view class="name-star-box margin-bottom-20 flex-between">
					<text class="fn-sz-28 fn-cl-333 ">{{item.nickname || item.user_nickname}}</text>
					<text class="fn-sz-22 fn-cl-ccc">{{item.create_time}}</text>

				</view>
				<view class="margin-bottom-20">
					<text class="fn-sz-28 fn-cl-222">{{item.content || item.comment_content}}</text>
				</view>
				
				<text v-if="item.replay || item.comment_back" class=" fn-sz-24 reply-box">
					<text class="fn-cl-333 margin-right-20">平台回复:</text>
					<text class="fn-cl-999">{{item.replay || item.comment_back}}</text>
				</text>
			</view>
		</view>
<!-- avatar: "https://81.batmp.com/upload/20200629/15934134578191.jpeg"
comment_back: "谢谢！"
comment_content: "物美价廉！"
comment_id: 3
create_time: "2020-06-18 15:27:57"
photos: Array(0)
user_nickname: "222" -->

	</view>
</template>

<script>
	import rate from "@/components/index/Rate.vue"
	export default {
		components: {
			rate
		},
		props: {
			list: {
				type: Array,
				default: function() {
					return []
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.comment-list-box {
		width: 100%;

		.comment-item-box {
			border-bottom: 1upx solid #F5F5F5;
			width: 100%;
			padding: 30upx;

			.avatar-box {
				width: 60upx;
				height: 60upx;
				margin-top: 20upx;
				border-radius: 50%;
			}

			.comment-detail-box {
				flex: 1;

				.name-star-box {
					height: 50upx;
					align-items: center;

					.comment-star-box {
						flex: 1;
						align-items: center;

						.comment-star {
							width: 30upx;
							height: 26upx;
							margin-right: 10upx;
						}
					}

				}

				.reply-box {
					display: inline-block;
					width: 100%;
					box-sizing: border-box;
					background-color: #F8F8F8;
					padding: 20upx ;
					border-radius: 10upx;

				}

			}
		}
	}
</style>
