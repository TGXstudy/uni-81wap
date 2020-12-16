<template>
	<view class="tui-rate-class tui-rate-box" @touchmove="touchMove">
		<block v-for="(item,index) in quantity" :key="index">
			<view class="tui-icon" :class="['tui-icon-collection'+(hollow && current<=index?'':'-fill')]" :data-index="index"
			 @tap="handleTap" :style="{fontSize:size+'px',color:current>index?active:normal}"></view>
		</block>
	</view>
</template>

<script>
	export default {
		name: "tuiRate",
		props: {
			//数量
			quantity: {
				type: Number,
				default: 5
			},
			//当前选中
			current: {
				type: Number,
				default: 0
			},
			//禁用点击
			disabled: {
				type: Boolean,
				default: false
			},
			//大小
			size: {
				type: Number,
				default: 25
			},
			//未选中颜色
			normal: {
				type: String,
				default: "#AAAAAA"
			},
			//选中颜色
			active: {
				type: String,
				default: "#FA403B"
			},
			//未选中是否为空心
			hollow: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				pageX: 0
			};
		},
		methods: {
			handleTap(e) {
				if (this.disabled) {
					return;
				}
				const index = e.currentTarget.dataset.index;
				this.$emit('change', {
					index: Number(index) + 1
				})
			},
			touchMove(e) {
				if (this.disabled) {
					return;
				}
				if (!e.changedTouches[0]) {
					return;
				}
				const movePageX = e.changedTouches[0].pageX;
				const distance = movePageX - this.pageX;

				if (distance <= 0) {
					return;
				}
				let index = Math.ceil(distance / this.size);
				index = index > this.count ? this.count : index;
				this.$emit('change', {
					index: index
				})
			}
		},
		// #ifdef H5
		mounted() {
			const className = '.tui-rate-box';
			let query = uni.createSelectorQuery().in(this)
			query.select(className).boundingClientRect((res) => {
				this.pageX = res.left || 0
			}).exec()
		},

		// #endif
		onReady() {
			const className = '.tui-rate-box';
			let query = uni.createSelectorQuery().in(this)
			query.select(className).boundingClientRect((res) => {
				this.pageX = res.left || 0
			}).exec()
		}
	}
</script>

<style>
	@font-face {
		font-family: 'rateFont';
		src:url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAKkAAsAAAAABkwAAAJaAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcApUcAE2AiQDCAsGAAQgBYRtBzMbmQXIHpIkgToYFIIqCgEQIIJqv7eefRsCUKlIQA2oUEVFsUt9GziQLsYcl2d9+v+49tthmvFhdp4Qs3j2/9uJ74YlknioP+MpUWkQmhUws89zOb0JdCDX+EC57WljLZrUC6gXB1Kge2CbrIQybhi7wCWcJ1Br0BBua2FtD1XIrGmBuHJtE1XkArLM0tVCZc3aLD6qUJ2eUnwIvx//LEQFSUXBqtq9nM+jqZ/JzipK5ZITnxAkoM0VKDAPycRhbWJbsWBcsdpEiVFoX+XBz6Jy2XeIvVoF++us0nrQD2X3JHcVt5pOcFsDdUHGRz2A6Hq4+TT/9ln76dNe6fMMPL4M2s9f48uXwhu/3fH/j/fmNe7xjDvvbVwuDHR3qB1tvQ8NS72cXuFAU/hnRSkRCC76nkb1+qX/FXUZ/Hi6zoWWrJ+L6n1pY6T0n8h7tmVdadlTVuW13UnXuWpq1aIMe1p9jzV13EAmVOsY4aoykKJQbZzM7Dwq1FlEpWqrqDVncXOdNlSxyDWYdQ4Qmr0jafSGQrMPMrNfqNDpB5Waoxi1jqNtzzqT4VZtUjAZ5LF1it1cHBHHyaqi8h2wDwOTZpUhfwA0c8NY4sViehEioHMsyI5smTGCCY1DvAAugyCIcUJjD3KMdxhLRgSB1L2Jz8UhqrKJAiYG5GGWU5grJxYhfm+mqvT5HcB2KGCiLS01yQOAyrjDYxKe2INc1EW9Wu7lmswRm4xhCIygYiFsAYwCgUAMS+pHeUAOw3NGxBIjBLsT6avj1zeEX7cPalnmFPaSQs2V64NO3CBACA==') format('woff2');
		font-weight: normal;
		font-style: normal;
	}
		
	.tui-icon {
		font-family: "rateFont" !important;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		display: block;
	}

	.tui-icon-collection-fill:before {
		content: "\e602";
	}

	.tui-icon-collection:before {
		content: "\e602";
	}

	.tui-rate-box {
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
		margin: 0;
		padding: 0;
	}
</style>
