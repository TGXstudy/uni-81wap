<template>
	<view class="addr-item-box flex-column">
		<view class="addr-info flex-column flex-1">
			<view class="flex-between margin-bottom-20">
				<view>
					<text class="fn-sz-28 fn-cl-333">{{item.fullname}}</text>
					<text class="fn-sz-28 fn-cl-333">{{item.phone}}</text>
				</view>
				<view v-if="item.status == 'yes' " class="default-txt">默认</view>
			</view>
			<view class="">
				<text class="fn-sz-28 fn-cl-333">{{item.province}}{{item.city}}{{item.county}}{{item.address}}</text>
			</view>
		</view>
		<view class="addr-btn flex-end align-items-center">
			<view class="margin-right-20" @tap.stop="goPage('updateAddr',{type:'edit',id:item.id})">
				<image class="image-sz-32 " :src="require('../../static/images/mine/icon-edit.png')"></image>
				<text class="fn-cl-999 fn-sz-24">编辑</text>
			</view>
			<view class="margin-left-20" @tap.stop="deleteItem(item.id)">
				<image class="image-sz-32 " :src="require('../../static/images/mine/icon-del.png')"></image>
				<text class="fn-cl-999 fn-sz-24">删除</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			
			item: {
				type: Object,
				default: function() {
					return [{
						"id": 5,
						"mid": 1,
						"fullname": "袁玉强",
						"province": "四川省",
						"city": "成都市",
						"county": "武侯区",
						"address": "环球中心",
						"phone": "18780182002",
						"status": "yes"

					}];
				}
			}
		},
		methods: {
			deleteItem(addrId) {
				let _this=this;
				uni.showModal({
					title: "提示",
					content: "确认删除?",
					success(res) {
						console.log(res);
						if (res.confirm) {
							console.log("确认删除");
							//删除收货地址
							_this.delAddress(addrId)
						}
					}
				})
			},
			// 删除收货地址
			delAddress(id){
				this.$api.delAddr({
					id
				}).then(res=>{
					if(res.code == 200){
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.$emit("update");
						})
						
					}else{
						this.$mUtils.toast(res.msg);
						console.log("删除收货地址",res);
					}
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.addr-item-box {
		background-color: #fff;
		margin-bottom: 20upx;
		padding: 0 20upx;
		box-sizing: border-box;
		border-radius: 12upx;
		min-height: 260upx;

		.addr-info {
			padding: 20upx 0;
		}

		.default-txt {
			font-size: 20upx;
			color: #fff;
			background-color: var(--theme-color);
			background-color: $theme-color;
			width: 60upx;
			height: 32upx;
			justify-content: center;
			align-items: center;
			border-radius: 4upx;
		}

		.addr-btn {
			width: 100%;
			height: 80upx;
		}
	}
</style>
