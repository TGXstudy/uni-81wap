<template>
	<view class="container pd-lr-30 flex-column">
		<view class="width-100-percent">
			<text class="fn-cl-333 fn-sz-48 fn-bold">您要注册的角色是？</text>
		</view>
		<view class="roles-list">
			<view class="roles-item flex-column align-items-center" v-for="(item,idx) in roleList" :key="idx" @tap="selectRole(item.role)">
				<view class="image-sz-160 tag-relative">
					<image class="image-sz-160" :src="item.src | imgUrl" ></image>
					<image v-if="selectedRole == item.role" class="image-sz-48 tag-right-bot" src="../../static/images/register/tag-selected.png" ></image>
				</view>
				<text class="fn-cl-333 fn-sz-28 fn-bold line-height-80">{{item.text}}</text>
			</view>
		</view>

		<view class="width-100-percent justify-content-center">
			<image class="image-sz-140" :src="'/static/images/register/btn-next.png' | imgUrl" @tap="goPage('register',{role:selectedRole})" ></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectedRole:'user',
				roleList: [ //角色列表
					{
						role: 'user',
						text: '用户',
						src: '/static/images/register/role-user.png'
					},
					{
						role: 'soldier',
						text: '军人',
						src: '/static/images/register/role-soldier.png'
					},
					{
						role: 'channeler',
						text: '渠道商',
						src: '/static/images/register/role-channeler.png'
					},
					{
						role: 'supplier',
						text: '供应商',
						src: '/static/images/register/role-supplier.png'
					},

				]
			}
		},
		methods:{
			//选择角色
			selectRole(role){
				this.selectedRole=role;
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		height: 100vh;
		background-color: var(--theme-color-fff);
		justify-content: space-around;
		.roles-list{
			width: 100%;
			justify-content: space-between;
			flex-wrap: wrap;
			.roles-item{
				width: 50%;
				margin-bottom: 80upx;
			}
		}
		
	}
</style>
