<template>
	<view class="order-item-box flex-column">
		<view class="flex-end status-txt align-items-center pd-lr-30">
			<text class="fn-sz-28 fn-cl-theme">{{item.status_cn}}</text>
		</view>
		<view class="width-100-percent flex-column">
			<view class="flex-column"  v-for="(goods,idx) in item.options" :key="idx" >
				<submit-item :item="goods" ></submit-item>
				<view class=" width-100-percent flex-end">
					<order-btn v-if="item.status == 3 && goods.is_comment == 'no'" :txt="'立即评价'" @click="showInput('evaluate',goods)"></order-btn>
				</view>
			</view>
		</view>
		
		<view class="flex-end pd-lr-30 ">
			<text class="fn-cl-333 fn-sz-24 line-height-80">共{{item.num}}件  订单合计：￥{{item.total_fee}}</text>
		</view>
		<view class="order-btns flex-end pd-lr-30">
			<order-btn :txt="'查看订单'" :isGray="true" @click="goPage('orderDetail',{orderId:item.order_id})"></order-btn>
			<order-btn v-if="item.status == 0" :txt="'取消订单'" :isGray="true" @click="handle('cancel',item.order_id)"></order-btn>
			<order-btn v-if="item.status == 0" :txt="'立即付款'" @click="payNow(item)"></order-btn>
			<!-- <order-btn v-if="item.status == 1" :txt="'申请退款'"  @click="handle('refund',item.order_id)"></order-btn> -->
			<order-btn v-if="item.status == 1" :txt="'申请退款'"  @click="showInput('refund',item.order_id)"></order-btn>
			<order-btn v-if="item.status == 2" :txt="'确认收货'" @click="handle('receive',item.order_id)"></order-btn>
			<order-btn v-if="item.status == 5 || item.status == 4" :txt="'删除订单'" :isGray="true" @click="handle('delete',item.order_id)"></order-btn>
			<order-btn v-if="item.status == 7" :txt="'取消退款'" :isGray="true" @click="handle('cancelRefund',item.order_id)"></order-btn>
		</view>
		
		<uni-popup ref="txtarea" class="popup">
			<view class="flex-column margin-top-40 margin-bottom-20">
				<view class="width-100-percent flex-end pd-lr-30 margin-bottom-20">
					<image class="icon-close image-sz-48" :src="require('../../static/images/index/icon-close.png')" @tap="closeInput"></image>
				</view>
				<view class="pd-lr-30 txtarea-box margin-bottom-70">
					<textarea class="fn-sz-28" v-model.trim="content"  :placeholder=" placeholder " />
				</view>
				<view class="popup-btns pd-lr-30 flex-end ">
					<solid-btn :txt="submitTxt" @click="doInput"></solid-btn>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import submitItem from "@/components/market/SubmitItem.vue"
	import orderBtn from "@/components/mine/OrderBtn.vue"
	import uniPopup from "@/components/common/uni-popup.vue"
	import solidBtn from "@/components/common/SolidBtn.vue"
	export default{
		components:{
			submitItem,orderBtn,uniPopup,solidBtn
		},
		props:{
			item:{
				type:Object
			}
		},
		data(){
			return {
				content:'', //评价内容,
				goods:{}, //被评价的商品
				orderId:0, //申请退款的订单id
				showInputType:'evaluate', 
				submitTxt:'提交评价',
				placeholder:'请输入评论内容'
			}
		},
		methods:{
			showInput(type,param){
				this.$refs.txtarea.open();
				if(type == 'evaluate'){
					this.goods=param;
					this.placeholder = "请输入评论内容"
					this.submitTxt="提交评价"
				}else if(type == 'refund'){
					this.orderId=param;
					this.placeholder = "请输入退款理由";
					this.submitTxt="提交申请"
				}
				this.showInputType=type;
				
			},
			closeInput(){
				this.content="";
				this.$refs.txtarea.close();
			},
			handle(type,orderId){
				let _this=this;
				let handler={
					cancel:{
						content:'确定取消？',
					},
					delete:{
						content:'确定删除？',
					},
					receive:{
						content:'确定收货？',
					},
					cancelRefund:{
						content:"确定取消退款？"
					},
					
					
				}
				
				uni.showModal({
					title:"提示",
					content:handler[type].content,
					success(res) {
						if(res.confirm){
							_this[type](orderId)
						}
					}
				})
			},
			//取消申请退款
			cancelRefund(orderId){
				this.$api.cancelRefund({
					order_id:orderId,
				}).then(res=>{
					console.log("取消申请退款",res);
					if(res.code == 200){
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.$emit("update")
						})
						
					}else{
						console.log("取消申请退款",res);
					}
				})
			},
			// 申请退款 
			refund(orderId){
				if(!this.content){
					this.$mUtils.toast("请输入退款理由");
					return;
				}
				
				this.$api.refundOrder({
					order_id:orderId,
					content:this.content
				}).then(res=>{
					// console.log("申请退款",res);
					if(res.code == 200){
						this.closeInput();
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.$emit("update")
						})
						
					}else{
						console.log("申请退款",res);
					}
				})
			},
			//取消订单
			cancel(orderId){
				this.$api.cancelOrder({
					order_id:orderId
				}).then(res=>{
					console.log("取消订单",res);
					if(res.code == 200){
						this.$mUtils.toast(res.msg)
						this.$emit("update")
					}else{
						console.log("取消订单",res);
					}
				})
			},
			//删除订单
			delete(orderId){
				this.$api.deleteOrder({
					order_id:orderId
				}).then(res=>{
					console.log("删除订单",res);
					if(res.code == 200){
						this.$mUtils.toast(res.msg)
						this.$emit("update")
					}else{
						console.log("删除订单",res);
					}
				})
			},
			//立即收货
			receive(orderId){
				// console.log("立即收货TODO");
				this.$api.receiveOrder({
					order_id:orderId
				}).then(res=>{
					// console.log("申请退款",res);
					if(res.code == 200){
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.$emit("update")
						})
						
					}else{
						console.log("立即收货",res);
					}
				})
				
			},
			
			payNow(item){
				let params={
					orderId: JSON.stringify([item.order_id]),
					totalFee:item.total_fee,
					orderType:1
				};
				console.log(item);
			
				this.goPage('payOrder',params)
				
			},
			
			doInput(){
				if(this.showInputType == 'evaluate'){
					this.doEval();
				}else if(this.showInputType == 'refund'){
					this.refund(this.orderId)
				}
				
			},
			//点击提交评论
			doEval(){
				if(!this.content){
					this.$mUtils.toast("请输入评价内容");
					return;
				}
				
				this.$api.evaluateOrder({
					order_id:this.item.order_id,
					product_id:this.goods.product_id,//商品id
					option_id:this.goods.option_id,//商品规格id
					comment_content: this.content//评论内容
				}).then(res=>{
					if(res.code == 200){
						this.closeInput();
						this.content="";
						this.$mUtils.toast(res.msg,true).then(()=>{
							this.$emit("update")
						})
						
					}else{
						this.$mUtils.toast(res.msg);
						console.log("点击提交评论",res);
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.order-item-box{
		background-color: #fff;
		border-radius: 12upx;
		margin-bottom: 20upx;
		.status-txt{
			width: 100%;
			height: 80upx;
		}
		
		.order-btns{
			height: 90upx;
			align-items: center;
		}
		
		.popup{
			/deep/.uni-popup__wrapper-box{
				max-width: 100% !important;
				width: 100% !important;
				border-radius: 0;
			}
			.txtarea-box{
				width: 100%;
				height: 240upx;
				textarea{
					width: 100%;
					height: 100%;
					padding: 20upx;
					background-color: #F8F8F8;
				}
			}
			
			.popup-btns{
				
				/deep/.solid-btn{
					width: 200upx;
					height: 80upx;
				}
			}
		}
		
		
	}
</style>
