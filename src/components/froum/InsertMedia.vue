<template>
	<view class="">
		
		<view v-if="isSlot" @tap="chooseImage">
			<slot></slot>
		</view>
		<view v-else>
			<image class="image-sz-48 margin-right-20" :src="require('../../static/images/froum/icon-image.png')" @tap="chooseImage"></image>
			<image class="image-sz-48 margin-left-20" :src="require('../../static/images/froum/icon-video.png')" @tap="chooseVideo"></image>
		</view>
		<compress-img ref="cpimg" @result="cpimgOk" @err="cpimgErr" :number="maxImgNum-imgNum" :fixOrientation="true" :size="1000" :maxWidth="1000"
		 :ql="0.9" :type="'base64'"></compress-img>
	</view>
</template>

<script>
	import compressImg from "@/components/common/compressImg.vue"
	export default {
		props:{
			maxImgNum:{
				type:Number,
				default:1
			},
			imgNum:{ //当前已上传图片张数
				type:Number,
				default:0,
			},
			isSlot:{ //插槽
				type:false
			}
		},
		components: {
			compressImg
		},
		methods: {
			chooseImage() {
				if(this.imgNum >= this.maxImgNum){
					this.$mUtils.toast("最多只能上传"+this.maxImgNum+"张图片");
					return;
				}
				this.$refs.cpimg._changImg()
			},
			cpimgOk(base64Arr) {
				
				Promise.all(
					this.uploadImg(base64Arr),
				).then((results) => {
					this.$emit('getImage',results)
				})

			},

			uploadImg(base64Arr) {
				let promiseArr = []
				for (let i = 0; i < base64Arr.length; i++) {
					let base64 = base64Arr[i]
					let promise = new Promise((resolve,reject)=>{
						//图片上传接口
						this.$api.uploadBase64({
							base64: [base64]
						}).then(res => {
							console.log("图片上传接口", res);
							if (res.code == 200) {
								resolve(res.data)
							} else {
								this.$mUtils.toast(res.msg);
								reject(res.msg);
							}
						})
					})
					console.log("2222");
					promiseArr.push(promise);
					
				}
				console.log("33333");
				return promiseArr;

			},


			cpimgErr(res) {
				console.log("-----------err", res);
			},
			chooseVideo() {
				var _this = this;
				uni.chooseVideo({
					success(result) {
						console.log("插入视频", result);
						
						_this.$api.uploadFile(result.tempFilePath).then(res=>{
							console.log("插入视频", );
							let result=JSON.parse(res.data)
							if(result.code == 200){
								_this.$emit("getVideo",result.data)
							}else{
								_this.$mUtils.toast(result.msg)
							}
						})
						
					}
				})
			}

		}
	}
</script>

<style lang="scss" scoped>

</style>
