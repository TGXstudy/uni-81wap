<template>
	<view class="container">
		<view class="records-wrapper flex-column">
			<view class="flex-column" v-for="(item,idx) in recdList" :key="idx">
				<view class="record-date pd-lr-30 align-items-center">
					<image class="image-sz-32 margin-right-20" :src="require('../../static/images/query/icon-query.png')" mode=""></image>
					<text class="fn-sz-28 fn-cl-333 fn-bold">{{item.update_time || item.create_time}}</text>
				</view>
				<view class="flex-column pd-lr-30">
					<!-- <view class="flex-column " v-for="item in 2" :key="item"> -->
						<text class=" fn-sz-28 fn-cl-333 fn-bold line-height-80">咨询内容</text>
						<text class="fn-sz-28 fn-cl-666 margin-bottom-20">{{item.content}}</text>
						<view class="reply-box flex-column margin-bottom-20" v-if="item.callback">
							<text class="fn-sz-24 fn-cl-666 " >
								平台回复：{{item.callback}}
							</text>
							<view class="imgs-box" v-if="item.callback_imgs.length>0">
								<view class="margin-right-20 margin-bottom-20" v-for="(img,idx) in item.callback_imgs" :key="idx" >
									<image class="image-sz-140 border-radius-8" :src="img" mode=""></image>
								</view>
							</view>
							
						</view>
					<!-- </view> -->
					
				</view>
			</view>
			<loadmore :visible="loading"></loadmore>
			<nomore :visible="nomore"></nomore>
		</view>
	</view>
</template>

<script>
	import loadmore from "@/components/common/loadmore.vue";
	import nomore from "@/components/common/nomore.vue"
	export default{
		components: {
			loadmore,
			nomore,
		},
		onLoad() {
			//文字咨询记录
			this.queryRecord();
		},
		data(){
			return {
				page:1,
				pageSize:10,
				recdList:[],
				loading:false,
				nomore:false
			}
		},
		onPullDownRefresh() {
			this.page=1;
			this.queryRecord("refresh");
		},
		onReachBottom() {
			if(this.nomore) return;
			this.page++;
			this.queryRecord()
		},
		methods:{
			//文字咨询记录
			queryRecord(status=""){
				this.loading=true;
				this.$api.queryRecord({
					page:this.page,
					pageSize:this.pageSize
				}).then(res=>{
					if(res.code == 200){
						this.page = res.data.current_page;
						this.nomore = this.page >= res.data.last_page;
						if (this.page == 1) {
							this.recdList=res.data.data
						} else {
							this.recdList = this.recdList.concat(res.data.data);
						}
						
						
					}else{
						console.log("文字咨询记录",res);
					}
				}).finally(()=>{
					this.loading=false;
					this.stopPull(status);
				})
			}
		}
		
	}
</script>

<style lang="scss" scoped>
	.container{
		.records-wrapper{
			.record-date{
				width: 100%;
				height: 60upx;
				background-color: #F9F9F9;
			}
			
			.reply-box{
				background-color: #F9F9F9;
				padding: 20upx;
				.imgs-box{
					flex-wrap: wrap;
					margin-top: 20upx;
				}
			}
		}
	}
</style>
