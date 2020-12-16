<template>
	<view class="container flex-between">
		<scroll-view scroll-y="true" class="left-cate-box">
			<view class="left-cate-item" :class="curPIdx == idx ?'current-cate' : '' " v-for="(item,idx) in cateList"
			 :key="idx" @tap="getParentCate(idx)">
				<text class="left-cate-name one-line-txt ">{{item.cate_name}}</text>
			</view>

		</scroll-view>

		<view class="right-cate-box">
			<view v-if="!(cateList[curPIdx] && cateList[curPIdx].child) || cateList[curPIdx].child.length<=0" class=" width-100-percent fn-cl-999 fn-sz-28  justify-content-center ">
				暂无分类
			</view>
			<view v-else class="right-cate-item flex-column " v-for="(item,idx) in cateList[curPIdx].child" :key="idx" @tap="goPage('cateGoods',{cateId:item.cate_id,title:item.cate_name})">
				<image class="icon-cate" :src="item.thumb" mode=""></image>
				<text class="fn-sz-24 fn-cl-333 two-line-txt">{{item.cate_name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
			// 获取全部分类
			this.getCates();
		},
		data() {
			return {
				cateList:[], //分类列表
				curPIdx: 0, //被选中的父级分类idx
			}
		},
		
		methods: {
			// 获取全部分类
			getCates(){
				this.$api.getCates().then(res=>{
					if(res.code == 200){
						this.cateList=res.data;
					}else{
						console.log("获取全部分类",res);
					}
				})
			},
			// 获取分类列表 
			getCategory(grade) {
				this.parentCateId = grade == 'parent' ? 0 :this.parentCateId
			},
			//单击一级分类
			getParentCate(idx) {
				this.curPIdx=idx;
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		width: 100%;
		height: calc( 100vh - var(--window-top) );
		box-sizing: border-box;
		flex-direction: row;
		justify-content: flex-start;
		align-items: flex-start;

		.left-cate-box {
			width: 180upx;
			height: calc(100vh - var(--window-top));
			background-color: #F6F6F6;

			.current-cate {
				background-color: #fff;
			}

			.left-cate-item {
				font-size: 26upx;
				color: #333;
				height: 90upx;
				width: 100%;
				align-items: center;

			

				.left-cate-name {
					flex: 1;
					justify-content: center;
					padding: 0 10upx;
					box-sizing: border-box;
					align-items: center;
				}
			}

		}

		.right-cate-box {
			flex: 1;
			flex-wrap: wrap;
			flex-direction: row;

			padding: 24upx 30upx;
			box-sizing: border-box;

			.right-cate-item {
				width: 140upx;
				margin-right: 40upx;
				margin-bottom: 30upx;

				.icon-cate {
					width: 140upx;
					height: 140upx;
					border-radius: 8upx;
				}

				text {
					text-align: center;
				}
			}

			&>.right-cate-item:nth-child(3n) {
				margin-right: 0;
			}
		}
	}
</style>
