<template>
	<view class="container have-fixed-bottom">
		<view class="video-wrapper pd-lr-30">
			<video src="" ></video>
			<image class="image-sz-120 icon-play" :src="require('../../static/images/query/icon-play.png')"></image>
		</view>
		
		<view class="flex-column pd-lr-30 width-100-percent">
			<view class="star-title ">
				<text class=" fn-sz-32 fn-cl-333 fn-bold">参军服务短视频</text>
				<image class="icon-star" :src="require('../../static/images/index/icon-star.png')" ></image>
			</view>
			<view class="videos-wrapper flex-column">
				<video-list :list="videoList"></video-list>
				<loadmore :visible="loadding"></loadmore>
				<nomore :visible="nomore"></nomore>
			</view>
		</view>
		
		<view class="fixed-wrapper pd-lr-30 align-items-center">
			<solid-btn class="submit-btn" :txt="'文字咨询'" @click="goPage('doQuery')"></solid-btn>
		</view>
	</view>
</template>

<script>
	import solidBtn from "@/components/common/SolidBtn.vue"
	import videoList from "@/components/query/VideoList.vue"
	import loadmore from "@/components/common/loadmore.vue"
	import nomore from "@/components/common/nomore.vue"
	export default{
		components:{solidBtn,videoList,loadmore,nomore},
		onLoad() {
			
		},
		onShow(){
			//短视频列表
			this.getShortVideo()
		},
		data(){
			return {
				page:1,
				pageSize:12,
				loadding:false,
				nomore:false,
				videoList:[],
			}
		},
		onPullDownRefresh() {
			this.page=1;
			this.getShortVideo('refresh');
		},
		methods:{
			//短视频列表
			getShortVideo(status=""){
				this.loadding=true;
				this.$api.getShortVideo({
					page:this.page,
					pageSize:this.pageSize
				}).then(res=>{
					
					console.log("短视频列表",res);
					if(res.code == 200){
						this.page=res.data.current_page;
						this.nomore=this.page>=res.data.last_page;
						if(this.page == 1){
							this.videoList=res.data.data;
						}else{
							this.videoList=this.videoList.concat(res.data.data);
						}
						
						
					}else{
						console.log("短视频列表",res);
					}
				}).finally(()=>{
					this.loadding= false;
					this.stopPull(status);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding-top: 20upx;
		.video-wrapper{
			width: 100%;
			height: 390upx;
			position: relative;
			video{
				width: 100%;
				height: 100%;
			}
			.icon-play{
				position: absolute;
				top: calc(50% - 60upx);
				left: calc(50% - 60upx);
				z-index: 99999;
			}
		}
	}
</style>
