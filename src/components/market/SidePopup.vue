<template>
	<view>
		<view class="tui-side-popup" :class="[show?'tui-popup-show':'tui-popup-hide']" :style="{background:bgcolor,width:width?px(width):'auto'}">
			<slot></slot>
		</view>
		<view class="tui-popup-mask" :class="[show?'tui-popup-show':'tui-popup-hide']" @tap="close"></view>
	</view>
</template>

<script>
	export default {
		name: "Popup",
		props: {
			//控制显示
			show: {
				type: Boolean,
				default: false
			},
			//背景颜色
			bgcolor: {
				type: String,
				default: "#fff"
			},

			//高度 upx
			width: {
				type: Number,
				default: 0
			}
		},

		methods: {
			close() {
				if (!this.show) {
					return;
				}
				this.$emit('close');
			},
			px(num) {
				return uni.upx2px(num) + 'px'
			}
		}
	}
</script>

<style>
	/* .tui-popup-class{
		position: fixed;
		left: 0;
		right: 0;
		top:0;
		bottom: 0;
		display: flex;
		z-index: 99999;
		background: rgba(0, 0, 0, 0.6);
	} */


	.tui-side-popup {
		position: fixed;
		right: 0;
		top: 0;
		bottom: 0;
		z-index: 99999;
		transition:width 400ms;
		
		/* transition: all 0.2s ease-in-out; */
		/* transform: translate3d(0, 100%, 0);
		transform-origin: center;
		transition: all 0.3s ease-in-out; */
	}

	.tui-popup-show {
		/* transform: translate3d(0, 0, 0); */
		visibility: visible;
	}

	.tui-popup-hide {
		/* transform: translate3d(0, 0, 0); */
		visibility: hidden;
	}

	.tui-popup-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.6);
		z-index: 99996;
		/* transition: all 0.2s ease-in-out; */
		transition:width 400ms;
	}

	.tui-mask-show {
		opacity: 1;
		visibility: visible;
	}
</style>
