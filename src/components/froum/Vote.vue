<template>
	<view class="flex-column">
		<view v-for="(item,idx) in list" :key="idx" class="vote-wrapper flex-column margin-bottom-20">
			<text class="fn-cl-333 fn-sz-28 margin-bottom-20 fn-bold">{{item.theme}}</text>
			<view class=" flex-column">
				<view v-for="(opt,idx) in item.option" :key="idx" class="vote-option" @tap="doSelect(item,opt)">
					<view class="">
						<image class="image-sz-32 " :src="voteOpiton.includes(opt.option_id) || item.selected == opt.option_id ? require('../../static/images/index/icon-circle-theme.png') : require('../../static/images/index/icon-circle-gray.png')"
						 mode=""></image>
						<text class="fn-sz-24 fn-cl-666 margin-left-20">{{opt.option_name}}</text>
					</view>
					<!-- <text class="fn-sz-24 fn-cl-666 ">{{opt.num}}人选择</text> -->
				</view>

			</view>
		</view>
		<view class="width-100-percent flex-end vote-btn" v-if="!isShowVote">
			<solid-btn :txt="'投票'" @click="doVote"></solid-btn>
		</view>

	</view>
</template>

<script>
	import solidBtn from "@/components/common/SolidBtn.vue"
	export default {
		components: {
			solidBtn
		},
		props: {
			list: {
				type: Array
			}
		},
		data() {
			return {
				voteResult: [],
				voteOpiton: []
			}
		},
		computed:{
			isShowVote(){
				return this.list.every(item=> item.selected);
			}
		},
		methods: {
			doSelect(vote, opt) {
				console.log(vote, opt);
				if (vote.selected) return; //用户已投票选项ID,为空表示用户未投票

				//遍历投票结果
				this.voteResult.forEach((item, idx) => {
					if (item.vote_id == vote.vote_id) { //用户已选择
						this.voteResult.splice(idx, 1)
						this.voteOpiton.splice(idx, 1)
					}
				})
				this.voteResult.push({
					vote_id: vote.vote_id,
					option_id: opt.option_id
				})
				this.voteOpiton.push(opt.option_id);


				console.log("投票结果", this.voteResult);
			},
			//点击 投票
			doVote() {
				
				
				
				if (this.list.length > this.voteResult.length) {
					this.$mUtils.toast("请先选择");
					return;
				}
				this.$api.vote(
					[
						...this.voteResult
					]
				).then(res => {
					if (res.code == 200) {
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.$emit("update")
						})
					} else {
						this.$mUtils.toast(res.msg);
						console.log("投票结果", res);
					}

				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.vote-wrapper {
		background-color: #f9f9f9;
		padding: 40upx 40upx 0 40upx;
		border-radius: 8upx;

		.vote-option {
			padding: 20upx 0;
			justify-content: space-between;
		}
	}

	.vote-btn {
		height: 140upx;
		align-items: center;

		/deep/.solid-btn {
			width: 220upx;
			height: 64upx;
		}
	}
</style>
