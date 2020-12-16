<template>
	<view class="container pd-lr-30 have-fixed-bottom">
		<view class="width-100-percent">
			<textarea v-model.trim="comInfo.content" placeholder="输入评论内容" class=" fn-sz-28 width-100-percent" />
		</view>
		<view class="images-box margin-bottom-20">
			<view class="image-sz-160 image-box" v-for="(item,idx) in previewImages" :key="idx">
				<image class="image-sz-160" :src="item" ></image>
				<image class="image-sz-36 icon-del" :src="'/static/images/froum/icon-del.png' | imgUrl" @tap="delImg(idx)" ></image>
			</view>	
		</view>
		<view class="videos-box">
			<view class="video-box" v-for="(item,idx) in previewVideo" :key="idx">
				<video :src="item" controls></video>
				<image class="image-sz-36 icon-del" :src="'/static/images/froum/icon-del.png' | imgUrl" @tap="delVideo(idx)" ></image>
			</view>	
		</view>
		
		<view class="fixed-wrapper align-items-center pd-lr-30 flex-between">
			<!-- 插入视频 图片 -->
			<insert-media :maxImgNum="maxImgNum" :imgNum="previewImages.length" @getImage="getImages" @getVideo="getVideo"></insert-media>
			<view class="publish-btn" @tap="doComment">
				<text class="fn-cl-fff fn-sz-32">发表</text>
			</view>
		</view>
	</view>
</template>

<script>
	import insertMedia from "@/components/froum/InsertMedia.vue"
	export default{
		components:{
			insertMedia
		},
		data(){
			return {
				previewImages:[], //预览
				previewVideo:[],
				comInfo:{
					forum_id:'', //帖子ID
					parent_id:'', //父级评论ID
					images:[], //图片集
					video:[], //视频集
					content:""
				},
				maxImgNum:9 , //图片最大上传张数
			}
		},
		onLoad(options) {
			this.comInfo.forum_id=options.postId || 0;
			this.comInfo.parent_id=options.parentId || '';
			this.type=options.type || ''
			
			uni.setNavigationBarTitle({
				title: this.type == 'comment' ? '评论' : '回复'
			})
		},
		methods:{
			//上传图片
			getImages(imgs){
				
				imgs.forEach(item=>{
					this.comInfo.images.push(item.url)
					this.previewImages.push(item.preview_url)
				})
			},
			getVideo(video){
				this.comInfo.video.push(video.url);
				this.previewVideo.push(video.preview_url);
			},
			//删除图片
			delImg(idx){
				this.comInfo.images.splice(idx,1);
				this.previewImages.splice(idx,1);
			},
			//删除视频
			delVideo(idx){
				this.comInfo.video.splice(idx,1);
				this.previewVideo.splice(idx,1);
			},
			doComment(){
				//数据验证
				let info=this.comInfo;
				console.log('数据验证',info);
				if(!info.content){
					this.$mUtils.toast('输入评论内容')
					return ;
				}
				
				this.addComment()
			},
			
			addComment(){
				
				this.$api.addComment({
					...this.comInfo
				}).then(res=>{
					console.log("发表评论",res);
					if(res.code == 200){
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.$mRouter.back();
						})
					}else{
						console.log("发表评论",res);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding-top: 40upx;
		
		.images-box{
			flex-wrap: wrap;
			.image-box{
				margin-top: 40upx;
				position: relative;
				border-radius: 8upx;
				margin-right: 40upx;
				.image-sz-160{
					border-radius: 8upx;
				}
				.icon-del{
					position: absolute;
					top: 0;
					right: 0;
				}
			}
		}
		.videos-box{
			width: 100%;
			flex-direction: column;
			.video-box{
				width: 100%;
				min-height: 300upx;
				position: relative;
				margin-bottom: 20upx;
				video{
					width: 100%;
					// height: 100%;
				}
				.icon-del{
					position: absolute;
					top: 0;
					right: 0;
					z-index: 666;
				}
			}
		}
		
		
		.publish-btn{
			width: 160upx;
			height: 64upx;
			align-items: center;
			justify-content: center;
			background:linear-gradient(313deg,rgba(244,55,55,1) 0%,rgba(250,42,145,1) 100%);
			border-radius:40upx;
		}
	}
</style>
