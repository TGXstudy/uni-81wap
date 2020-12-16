<template>
	<view class="icon-links">
		<view class="links-wrapper" v-for="(item,index) in linksList" :key="index">
			<view class="links-wrapper-item" @click="goLink(item,index)">
				<image class="links-wrapper-item-img" :src="item.thumb || item.image | compressImg(150)"></image>
				<!-- <image v-else class="links-wrapper-item-img" :src="item.defaultIcon"></image> -->
				<text class="links-wrapper-item-text two-line-txt">{{item.cate_name || item.title}}</text>
			</view>
			<button v-if="item.defaultName == '联系客服'" hover-class="none" class="links-wrapper-btn" open-type="contact"></button>
		</view>
	</view>
</template>

<script>
	export default{
		props:{
			linksList:{
				type:Array
			}
		},
		methods:{
			goLink(item,idx){
				if(idx < 4){
					this.goPage("cateGoods",{pCateId:item.cate_id,title:item.cate_name})
				}else if(item.id == 7){
						this.$mUtils.toast('该功能暂未开放');
						return;
				}else{
					/* id:6,	name:'军人专区'
						id:7,name:'平台直播'
						id:8,name:'每日签到'
						id:9,name:'会员活动'
						id:10,name:'积分抽奖' */
					let pageName='',queryObj={}
					switch(item.id){
						case 5:
							pageName="category";
							break;
						case 6:
							pageName="soldierZone"
						break;
						case 7:
							//TODO
						break;
						case 8:
							pageName="sign";
							break;
						break;
						case 9:
							pageName="recommend"
							queryObj={type:'activity',title:'会员活动'}
						break;
						case 10:
							pageName="lottery"
						break;
						case 11:
							pageName="category"
						break;
					}
					
					this.goPage(pageName,queryObj)
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon-links {
		flex-wrap: wrap;
	
		.links-wrapper {
			position: relative;
			
			width: 20%;
			justify-content: center;
			margin-top: 40upx;
	
			&-item {
				flex-direction: column;
				align-items: center;
				width: 100%;
				&-img {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					overflow: hidden;
				}
	
				&-text {
					width: 100upx;
					margin-top: 10upx;
					font-size: 24upx;
					color: #333;
					text-align: center;
				}
			}
	
			.links-wrapper-btn {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
			}
		}
	}
	
</style>
