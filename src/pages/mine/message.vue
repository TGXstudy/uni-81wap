<template>
	<view class="container">
		<view v-if="msgList && msgList.length>0" class="flex-column pd-lr-30 message-box">

			<view class="flex-column" v-if="type == 'system' ">
				<slide-delete v-for="(item,idx) in msgList" :key="idx" :item="item" class="margin-bottom-20" @delete="deleteMsg">
					<view class="flex-column message-item width-100-percent">
						<text class=" fn-cl-333 fn-sz-32 fn-bold one-line-txt line-height-80">系统消息</text>
						<text class="fn-sz-24 fn-cl-666">{{item.content}}</text>
						<view class="date-box width-100-percent">
							<text class="fn-cl-999 fn-sz-24">{{item.create_time}}</text>
						</view>
					</view>
				</slide-delete>
			</view>

			<view class="flex-column" v-else-if="type == 'froum' ">
				<view class="flex-column message-item width-100-percent" v-for="(item,idx) in msgList" :key="idx" @tap="goPage('froumDetail',{postId:item.forum_id})">
					<text class=" fn-cl-333 fn-sz-32 fn-bold one-line-txt line-height-80">{{ item.title }}</text>
					<view class="froum-txt width-100-percent">
						<text class="fn-sz-24 fn-cl-blue">{{item.user_nickname}}</text>
						<text class="fn-sz-24 fn-cl-333"> @我：</text>
						<text class="fn-sz-24 fn-cl-666">{{item.content}}</text>
					</view>
					<view class="date-box width-100-percent flex-end">
						<text class="fn-cl-999 fn-sz-24">{{item.create_time}}</text>
					</view>
				</view>
			</view>

			<loadmore :visible="loading"></loadmore>
			<nomore :visible="nomore"></nomore>
		</view>

		<default-page v-else :height="'calc(100vh - var(--window-top))'"></default-page>
	</view>
</template>

<script>
	import defaultPage from "@/components/common/Default.vue"
	import loadmore from "@/components/common/loadmore.vue";
	import nomore from "@/components/common/nomore.vue"
	import slideDelete from "@/components/common/SlideDelete.vue"
	export default {
		components: {
			defaultPage,
			loadmore,
			nomore,
			slideDelete
		},
		data() {
			return {
				msgList: [],
				page: 1,
				pageSize: 12,
				loading: false,
				nomore: false
			}
		},
		onLoad(options) {
			this.type = options.type || '';
			// if (this.type == 'system') {
			// 	this.getMsgLists()
			// } else if (this.type == 'froum') {
			// 	// 论坛消息  
			// 	this.myComment();
			// }
			this.type == 'system' ? this.getMsgLists() : this.myComment();
		},
		onPullDownRefresh() {
			this.page = 1;
			this.type == 'system' ? this.getMsgLists("refresh") : this.myComment("refresh");
		},
		onReachBottom() {
			if (this.nomore) return;
			this.page++;
			this.type == 'system' ? this.getMsgLists() : this.myComment();
		},
		methods: {
			// 论坛消息
			myComment() {
				this.$api.myComment({
					page: this.page,
					per_page: this.pageSize
				}).then(res => {
					console.log("论坛消息", res);
					if (res.code == 200) {
						this.nomore = this.page >= res.data.total_page;
						if (this.page == 1) {
							this.msgList = res.data.data;
						} else {
							this.msgList = this.msgList.concat(res.data.data);
						}
					}
				}).finally(() => {
					this.loading = false;
					this.stopPull(status)
				})
			},
			// 我的消息列表 
			getMsgLists(status = '') {
				this.loading = true;
				this.$api.getMsgLists({
					page: this.page,
					per_page: this.pageSize
				}).then(res => {
					console.log("我的消息列表", res);
					if (res.code == 200) {
						this.nomore = this.page >= res.data.total_page;
						if (this.page == 1) {
							this.msgList = res.data.lists;
						} else {
							this.msgList = this.msgList.concat(res.data.lists);
						}


					}
				}).finally(() => {
					this.loading = false;
					this.stopPull(status)
				})
			},
			//删除
			deleteMsg(id) {

				if (this.type == 'system') {
					this.$api.delMsg({
						id
					}).then(res => {
						console.log("删除消息", res);
						if (res.code == 200) {
							this.$mUtils.toast(res.msg, true).then(() => {
								this.page = 1;
								this.getMsgLists();
							})
						} else {
							this.$mUtils.toast(res.msg);
							console.log("删除消息", res);
						}
					})
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.container {

		.message-box {
			padding-top: 20upx;
			min-height: 100vh;
			background-color: #F9F9F9;

			.message-item {
				background-color: #fff;
				padding: 0 20upx;
				margin-bottom: 20upx;
			}
		}

		.froum-txt {
			// display: block;
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			word-wrap: break-word;
			word-break: break-all;
		}

		.date-box {
			width: 100%;
			height: 100upx;
			align-items: center;

		}
	}
</style>
