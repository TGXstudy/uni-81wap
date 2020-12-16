<template>
	<view class="cart-item-box align-items-center" @tap="selectItem" @longpress="deleteItem">
		<image class="image-sz-32 margin-right-20 " :src=" selected ? require('../../static/images/index/icon-circle-theme.png') : require('../../static/images/index/icon-circle-gray.png')"></image>
		<view class="flex-1">
			<image class="image-sz-160"  :src="item.thumb"></image>
			<view class="flex-1 flex-column cart-goods">
				<text class=" two-line-txt fn-sz-24 fn-cl-333 ">
					{{item.product_name}}
				</text>
				<text class="fn-sz-24 fn-cl-666">{{item.option_name}}</text>
				<view class="flex-between align-items-center">
					<text class=" fn-sz-24 fn-cl-333 ">¥{{item.price}}</text>
					<numberbox :height="44" :width="50" :iconsize="20" :value="item.num" :min="0" :max="item.stock" @change="changeAmount"></numberbox>
				</view>
			</view>
		</view>
	</view>
	
	<!-- cart_id: 5
	create_time: "2020-06-28 10:04:11"
	mid: 9
	num: 2
	option_id: 2
	option_name: "红色M号规格"
	p_id: 1
	p_mid: 1
	price: "19.00"
	product_name: "华为磁铁耳机398元，618活动"
	stock: 200
	thumb: "https://81.batmp.com/upload/default/20200615/847a8c004c0b4274450159585d6a3a99.png" -->
</template>

<script>
	import numberbox from "@/components/cart/numberbox.vue"
	export default{
		components:{
			numberbox
		},
		props:{
			item:{
				type:Object
			}
		},
		data(){
			return {
				selected:false,
				num:this.item.num , //购买数量
			}
		},
		watch:{
			item(newVal){
				this.selected=newVal.selected;
			}
		},
		methods:{
			changeAmount(e){
				// console.log("修改数量",e);
				if(e.value <= 0){
					this.deleteItem();
				}else{
					this.num=e.value;
					this.editCart(this.num);
					
					// this.$emit("doSelect",{...this.item,selected:this.selected,num:this.num})
				}
				
				
			},
			deleteItem(){
				console.log("长按删除");
				let _this=this;
				uni.showModal({
					title:"提示",
					content:"确认删除?",
					success(res) {
						console.log(res);
						if(res.confirm){
							console.log("确认删除");
							_this.editCart(0);
							
						}
					}
				})
			
			},
			//编辑、删除购物车  
			editCart(num){
				this.$api.editCart({
					cart_id:this.item.cart_id,		//	购物车id 多个用英文逗号隔开，只传数量有改变的，否则会出错
					num
				}).then(res=>{
					console.log("编辑删除购物车",res);
					if(res.code == 200){
						this.$emit("update");
					}else{
						console.log("编辑删除购物车",res);
					}
				})
			},
			selectItem(){
				// console.log("选中");
				this.selected= !this.selected;
				this.$emit("doSelect",{...this.item,selected:this.selected,num:this.num})
				
			}
			
		}
	}
</script>

<style lang="scss" scoped>
	.cart-item-box{
		width: 100%;
		padding: 0 20upx;
		height: 250upx;
		box-sizing: border-box;
		background-color: #fff;
		margin-bottom: 20upx;
		.image-sz-160{
			border-radius: 8upx;
		}
		.cart-goods{
			margin-left: 20upx;
			height: 160upx;
			justify-content: space-between;
		}
	}
</style>
