<template>
	<view class="container pd-lr-30">
		<view class="flex-column">
			<view class="input-wrapper">
				<text class="fn-sz-28 fn-cl-333 margin-right-20">收货人</text>
				<input class="input-item" type="text" v-model.trim="addrInfo.fullname" placeholder="请输入收货人名称">
			</view>
			<view class="input-wrapper">
				<text class="fn-sz-28 fn-cl-333 margin-right-20">联系电话</text>
				<input class="input-item" type="number" v-model.trim="addrInfo.phone" maxlength="11" placeholder="请输入联系电话">
			</view>
			<view class="input-wrapper">
				<text class="fn-sz-28 fn-cl-333 margin-right-20">所在区域</text>
				<region-picker class="flex-1 region-picker" @getRegion="getRegion">
					<view class="input-item picker-txt" :class="[ regionTxt == '请选择' ? 'fn-cl-666' : '']">{{regionTxt}}</view>
				</region-picker>
			</view>
			 
			<view class="input-wrapper">
				<text class="fn-sz-28 fn-cl-333 margin-right-20">详细地址</text>
				<input class="input-item" type="text" v-model.trim="addrInfo.address" placeholder="请输入详细地址">
			</view>
			<view class="input-wrapper margin-bottom-70" @tap="setDefaultAddr">
				<image class="image-sz-32 margin-right-20" :src="addrInfo.status == 'yes'? require('../../../static/images/mine/icon-checked.png'):require('../../../static/images/mine/icon-notcheck.png')"></image>
				<text class=" fn-sz-28 fn-cl-333">设为默认地址</text>
			</view>
			<solid-btn class="width-100-percent" :txt="'保存'" @click="confirmSave"></solid-btn>
		</view>
		
	</view>
</template>

<script>
	import solidBtn from "@/components/common/SolidBtn.vue"
	import regionPicker from "@/components/common/regionPicker/RegionPicker.vue"
	export default{
		components:{
			solidBtn,regionPicker
		},
		data(){
			return {
				regionTxt:'请选择',
				addrInfo:{
					fullname:"",//收货人姓名
					phone:"",//联系电话
					province:"",//省份
					city:"",//市
					county:"",//区县
					address:"",//详细地址
					status:"no",//	是否默认，yes、是，no、否
				},
				addrId:0, //被编辑的地址id.
				type:'add', //地址操作类型
			}
		},
		onLoad(options){
			if(options.type == 'edit'){
				this.type=options.type || 'edit';
				this.addrId=options.id || 0;
				//收货地址信息 回填
				this.getAddressInfo();
			}
		},
		methods:{
			//收货地址信息
			getAddressInfo(){
				this.$api.getAddressInfo({
					address_id:this.addrId
				}).then(res=>{
					console.log("收货地址信息",res);
					if(res.code == 200){
						this.addrInfo=res.data;
						this.regionTxt=this.addrInfo.province+" "+this.addrInfo.city+" "+this.addrInfo.county;
					}else{
						
					}
				})
			},
			
			getRegion(e){
				// console.log("请选择所在区域",e);
				this.regionTxt=e.province.text+" "+e.city.text+" "+e.county.text;
				this.addrInfo.province=e.province.text;
				this.addrInfo.city=e.city.text;
				this.addrInfo.county=e.county.text;
				

			},
			//点击 设为默认地址
			setDefaultAddr(){
				this.addrInfo.status = this.addrInfo.status == 'yes' ? 'no':'yes';
			},
			//点击保存
			confirmSave(){
				console.log("点击保存",this.addrInfo);
				let info=this.addrInfo;
				//数据验证
				if(!info.fullname){
					this.$mUtils.toast("请输入收货人名称");
					return;
				}
				if (!info.phone) {
					this.$mUtils.toast("请输入手机号");
					return;
				} else if (!this.$regs.isPhone.test(info.phone)) {
					this.$mUtils.toast('请输入正确的手机号');
					return;
				}
				
				if( (!info.province) || (!info.city) || (!info.county ) ){
					this.$mUtils.toast("请选择所在区域");
					return;
				}
				
				if(!info.address){
					this.$mUtils.toast("请输入详细地址");
					return;
				}
				
				if(this.type == 'add'){
					//添加收货地址
					this.addAddress()
				}else{
					//编辑收货地址 
					this.editAddress()
				}
				
			},
			
			// 编辑收货地址
			 editAddress(){
				this.$api.editAddr({
					...this.addrInfo
				}).then(res=>{
					if(res.code == 200){
						this.$mUtils.toast("保存成功",true).then(()=>{
							this.$mRouter.back();
						})
					}else{
						console.log("编辑收货地址",res);
					}
				})
			 },
			//添加收货地址
			addAddress(){
				this.$api.addAddr({
					...this.addrInfo
				}).then(res =>{
					// console.log("添加收货地址",res);
					if(res.code == 200){
						this.$mUtils.toast("保存成功",true).then(()=>{
							this.$mRouter.back();
						})
					}else{
						console.log("添加收货地址",res);
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		.image-top{
			width: 100%;
			height: 300upx;
		}
		
		.region-picker{
			display: flex;
			height: 100%;
			width: 100% ;
			overflow: scroll;
			.picker-txt{
			
				width: 560upx;
				height: 100upx;
				line-height: 100upx;
				
			}
		}
		
	}
</style>

