<template>
    <view class="top-banner">
        <swiper
			:class="['top-swiper', haveRadius?'have-radius':'']"
			circular=true
			:autoplay="autoplay"
			:duration="duration"
			:loop="loop"
			@change="change"
			indicator-active-color="#fff"
			indicator-color="rgba(255,255,255,0.3)"
		>
		<!-- mode="aspectFill" -->
            <swiper-item v-for="(item, index) in list" :key="index" class="top-swiper-item" @tap="goLink(item)">
                <image :src="item.image || item" :lazy-load="true"></image>
            </swiper-item>
        </swiper>
		<!-- 自定义指示点 -->
		<view class="banner-dots" v-if="showDots">
			<view v-for="(item, index) in list" :key="index" :class="['dot',current === index?'dot-active':'']"></view>
		</view>
    </view>
</template>

<script>
export default {
	name: "Carousel",
    props: {
    	list: {			//	轮播图数组
    		type: Array,
			default: ()=> {
				return []
			}
    	},
		showDots: {			// 是否展示指示点
			type: Boolean,
			default: true,
		},
		haveRadius: {		// 是否拥有radius
			type: Boolean,
			default: true
		},
		isPreview: {		// 图片无链接时生效，是否可以点击预览图片
			type: Boolean,
			default: false
		},
		autoplay: {		//	是否自动轮播
			type: Boolean,
			default: true
		},
		interval: {		//	自动切换时间间隔
			type: Number,
			default: 2000
		},
		duration: {		//	滑动动画时长
			type: Number,
			default: 300
		}
    },
    data(){
        return {
			loop:true,
            current: 0,
			imgUrls: [],		// 图片链接数组，用于预览图片
        }
    },
	// created(){
	// 	console.log(this.list,'创建轮播')
	// },
    methods:{
        change(e){
            this.current = e.detail.current
			// console.log(this.current);
        },
		goLink(item){
			if(item.description == 'product'){
				if(isNaN(item.url)){
					this.$mUtils.toast("无效链接");
					return ;
				}
				
				// 跳转店铺
				this.goPage('goodsDetail',{
					goodsId:item.url
				})
				
			}else if(item.description == 'store'){
				if(isNaN(item.url)){
					this.$mUtils.toast("无效链接");
					return ;
				}
				
				// 跳转商品详情
				this.goPage('shopDetail',{
					shopId:item.url
				}) 
			}else if(this.isPreview) {   // 图片无链接时生效，是否可以点击预览图片
				if(!this.imgUrls.length) {
					let arr = [];
					this.list.forEach(item=> {
						arr.push(item.image || item.banner_img);
					})
					this.imgUrls = arr;
				}
				uni.previewImage({
					current: item.image || item.banner_img,
					urls: this.imgUrls
				})
			}
		}
    }
}
</script>


<style lang="scss">
.top-banner {
    position: relative;
    width: 100%;
	height: 100%;
    background: #fff;
	.banner-dots {
		position: absolute;
		bottom: 20upx;
		z-index: 100;
		justify-content: center;
		left: 0;
		right: 0;
		margin: 0 auto;
		.dot {
			margin: 0 4upx;
			width: 8upx;
			height: 6upx;
			background: rgba(255,255,255,0.3);
		}
		.dot-active {
			width: 22upx;
			height: 6upx;
			background:rgba(255,255,255,1);
		}
	}
    .top-swiper{
        width: 100%;
        height: 100%;
		overflow: hidden;
		&.have-radius {
			border-radius: 12upx;
			transform: translateY(0);
		}
        .top-swiper-item{
            position: relative;
            width: 100%;
            height: 100%;
            background: #f5f5f5;
            display: flex;
            justify-content: center;
            align-items: center;
            .banner-desc{
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 30px;
                line-height: 30px;
                background: rgba(0,0,0,.5);
                font-size: 12px;
                color:#fff;
                padding: 0 10px;
            }
			.pic{
				width: 100%;
				height: 100%;
			}
            &:after{
                content: '';
                padding-top: 100%;
                display: block;
            }
            image{
                width: 100%;
                height: 100%;
            }
        }
    }
}
</style>

