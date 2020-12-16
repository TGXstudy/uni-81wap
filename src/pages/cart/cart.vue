<template>
	<view class="container">
		<!-- <view class="cart-wrapper pd-lr-30 flex-column" v-for="(shop,i) in cartList" :key="i">
			<cart-item v-for="(item,idx) in shop.lists" :key='idx' :item="item" @doSelect="doSelect($event,idx)"></cart-item>
		</view> -->
		 <view class="cart-wrapper pd-lr-30 flex-column">
		<cart-item v-for="(item,idx) in cartList" :key='idx' :item="item" @doSelect="doSelect($event,idx)" @update="getCartList"></cart-item>
		</view>
		<view class="fixed-wrapper pd-lr-30 flex-between">
			<view class="align-items-center" @tap="selectAll">
				<image class="image-sz-32 " :src="isAll ? require('../../static/images/index/icon-circle-theme.png'):require('../../static/images/mine/icon-notcheck.png')"></image>
				<text class="fn-cl-333 fn-sz-28">全选</text>
			</view>
			<view class="align-items-center">
				<text class=" fn-sz-28 fn-cl-666">合计：</text>
				<text class=" fn-sz-28 fn-cl-theme margin-right-20">￥{{sumAmount}}</text>
				<solid-btn class="submit-btn " :txt="'结算'" @click="doTotal"></solid-btn>
			</view>

		</view>
		
		
	</view>
</template>

<script>
	import solidBtn from "@/components/common/SolidBtn.vue"
	import cartItem from "@/components/cart/CartItem.vue"
	export default {
		components: {
			solidBtn,cartItem
		},
		data(){
			return {
				cartList:[
					
				],
				isAll:false, //是否被全选
				sumAmount:0 , //总金额
			}
		},
		onShow() {
			this.sumAmount=0;
			this.isAll=false;
			this.cartList=[];
			//购物车列表
			this.getCartList();
		},
		//点击顶部导航菜单按钮
		onNavigationBarButtonTap(e) {
			let _this=this;
			console.log("点击顶部导航菜单按钮",e.text);
			if(e.index == 0){ //点击清空
				
				uni.showModal({
					title:"提示",
					content:"确认清空？",
					success(res) {
						if(res.confirm){
							_this.$api.clearCart().then(res=>{
								if(res.code == 200){
									_this.$mUtils.toast(res.msg,true).then(()=>{
										_this.getCartList()
									})
									
								}else{
									console.log("点击清空",res);
								}
							})
						}
					}
				})
				
				
				
			}
		},
		methods:{
			//购物车列表
			getCartList(){
				
				this.$api.getCartList().then(res=>{
					console.log("购物车列表",res);
					this.cartList=[];
					if(res.code == 200){
						res.data.forEach((shop)=>{
							// console.log("购物车列表",shop.lists);
							this.cartList = this.cartList.concat(shop.lists)
							//是否被全选
							this.isAllSelected();
							//计算总金额
							this.getSumAmount();
						})
						// this.cartList=res.data;
					}else{
						console.log("购物车列表",res);
					}
				})
			},
			//全选
			selectAll(){
				if(this.isAll){
					this.cartList=this.cartList.map((item)=>{
						return {
							...item,
							selected:false
						}
					})
				}else{
					this.cartList=this.cartList.map((item)=>{
						return {
							...item,
							selected:true
						}
					})
				}
				
				console.log(this.cartList);
				//是否被全选
				this.isAllSelected();
				//计算总金额
				this.getSumAmount();
			},
			
			doSelect(param,idx){
				console.log("选中 param",param,idx);
				this.cartList[idx].selected = param.selected;
				this.cartList[idx].num=param.num;
				console.log("被选中：",this.cartList);
				
				//是否被全选
				this.isAllSelected();
				//计算总金额
				this.getSumAmount();
			},
			//是否被全选
			isAllSelected(){
				console.log('是否被全选');
				this.isAll = this.cartList.length>0 && this.cartList.every(item=> item.selected);
			},
			//计算总金额
			getSumAmount(){
				let sum=0
				this.cartList.forEach(item=>{
					if(item.selected){
						sum+=item.price*item.num;
					}
				})
				this.sumAmount=sum.toFixed(2);
			},
			// 单击结算
			doTotal(){
				let params=[]
				this.cartList.forEach(item=>{
					if(item.selected){
						params.push({
							product_id:item.p_id,
							option_id:item.option_id,
							num:item.num
						})
					}
					
				})
				
				console.log(params);
				if(params.length <= 0){
					this.$mUtils.toast("请选择结算商品");
					return;
				}
				 this.goPage('submitOrder',{products:JSON.stringify(params)})
				
				// this.goPage('submitOrder')
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.container {
		background-color: #f9f9f9;
		min-height: 100vh;
		padding-top: 20upx;
		.clear-wrapper {
			width: 100%;
			height: 80upx;
			background-color: #FFF5F5;

		}

		.cart-wrapper {
			
		}

		.fixed-wrapper {
			box-shadow: 0px 0px 6px 0px rgba(238, 238, 238, 1);
			width: 100%;
			height: 100upx;
			align-items: center;
			bottom:  var(--window-bottom);
			.submit-btn {
				height: 80upx !important;
				width: 220upx;
			}
		}
	}
</style>
