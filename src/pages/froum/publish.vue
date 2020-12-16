<template>
	<!-- 发表帖子 -->
	<view class="container pd-lr-30">
		<view class="input-wrapper">
			<text class="fn-sz-28 fn-cl-333 margin-right-20">帖子标题</text>
			<input class="input-item" type="text" v-model.trim="postInfo.title" placeholder="输入帖子标题">
		</view>

		<view class="txtarea-wrapper flex-column">
			<text class="fn-sz-28 fn-cl-333 margin-bottom-20">帖子内容</text>
			<textarea class="txtarea-item" v-model.trim="postInfo.content" maxlength="-1" placeholder="输入帖子内容" />
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
		<!-- 插入视频 图片 -->
		<view class="input-wrapper margin-bottom-70">
			<!-- 插入视频 图片 -->
			<insert-media :maxImgNum="maxImgNum" :imgNum="previewImages.length" @getImage="getImages" @getVideo="getVideo"></insert-media>
			
		</view>
		<view class="width-100-percent flex-between align-items-center height-100">
			<text class="fn-sz-36 fn-cl-333 fn-bold" >发起投票</text>
			<text class="fn-sz-28 fn-cl-theme" @tap="addVote">添加投票</text>
		</view>
		<view class="flex-column">
			<view class="flex-column vote-item" v-for="(vote,idx) in voteList" :key="idx">
				<view class="width-100-percent flex-end line-height-80 align-items-center">
					<view class=" align-items-center"  @tap="delVote(idx)">
						<image class="image-sz-32 margin-right-20" :src="require('../../static/images/froum/icon-delvote.png')" mode=""></image>
						<text class="fn-sz-24 fn-cl-999">删除</text>
					</view>
					
				</view>
				
				<view  class="input-wrapper">
					<text class="fn-sz-28 fn-cl-333 margin-right-20">投票主题</text>
					<input class="input-item"  type="text" v-model.trim="vote.theme" placeholder="输入投票主题">
				</view>
				<view  class="input-wrapper" v-for="(item,idx) in vote.option" :key="idx">
					<text class="fn-sz-28 fn-cl-333 margin-right-20">选项{{idx+1}}</text>
					<input class="input-item" v-model.trim="vote.option[idx]" type="text" :placeholder="'输入投票选项'+(idx+1)">
				</view>
				<view  class="height-100 justify-content-center align-items-center">
					<view @tap="addOption(idx)" class="align-items-center">
						<image class="image-sz-32" :src="'froum/icon-add.png'|imgRel" mode=""></image>
						<text class="fn-sz-28 fn-cl-theme" >添加选项</text>
					</view>
					
				</view>
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
				voteList:[],
				postInfo:{
					title:'',
					images:[],
					video:[],
					content:"",
					vote:[
						
					],
				},
				maxImgNum:9,
				previewImages:[],
				previewVideo:[]
				
			}
		},
		watch:{
			voteList:{
				 immediate: true,
				        deep:true,
				        handler:function(val) {
							return val;
						}
			}
		},
		onNavigationBarButtonTap(e){
			if(e.index == 0){
				console.log("发表",this.postInfo,this.voteList);
				// 数据验证
				if(!this.postInfo.title){
					this.$mUtils.toast("请输入帖子标题")
					return;
				}
				if(!this.postInfo.content){
					this.$mUtils.toast("请输入帖子内容")
					return;
				}
				if(this.voteList.length>0){
					for(let i=0,len=this.voteList.length;i<len;i++){
						let vote=this.voteList[i];
						if(!vote.theme){
							this.$mUtils.toast("请输入投票主题")
							return ;
						}
						for(let j=0,length=vote.option.length;j<length;j++){
							let opt=vote.option[j];
							console.log('333');
							if(!opt || opt==''){
								this.$mUtils.toast("请输入选项")
								return;
							}
						}
					}
					
				}
				
				this.postInfo.vote=this.voteList;
				console.log("发表",this.postInfo);
				
				//发布
				this.addPost()
				
			}
		},
		methods:{
			//添加 投票
			addVote(){
				this.voteList.push({
					theme:"",
					option:['','']
				})
			},
			//删除投票
			delVote(idx){
				this.voteList.splice(idx,1);
			},
			addOption(idx){
				this.voteList[idx].option.push('')
			},
			// 发帖  addPost 
			addPost(){
				this.$api.addPost({
					...this.postInfo
				}).then(res=>{
					console.log("发帖",res);
					if(res.code == 200){
						this.$mUtils.toast(res.msg+",请等待平台审核！",true).then(res=>{
							this.$mRouter.back()
						})
					}else{
						this.$mUtils.toast(res.msg)
						console.log("发帖",res);
					}
				})
			},
			//上传图片
			getImages(imgs){
				
				imgs.forEach(item=>{
					this.postInfo.images.push(item.url)
					this.previewImages.push(item.preview_url)
				})
			},
			getVideo(video){
				this.postInfo.video.push(video.url);
				this.previewVideo.push(video.preview_url);
			},
			//删除图片
			delImg(idx){
				this.postInfo.images.splice(idx,1);
				this.previewImages.splice(idx,1);
			},
			//删除视频
			delVideo(idx){
				this.postInfo.video.splice(idx,1);
				this.previewVideo.splice(idx,1);
			},
		}
	}
</script>

<style lang="scss" scoped>
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
	
	.vote-item{
		background-color: #FBFBFB;
		margin-bottom: 20upx;
		border-radius: 8upx;
		padding: 0 20upx;
		
	}
	.height-100{
		height: 100upx;
	}
</style>
