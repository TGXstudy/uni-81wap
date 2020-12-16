import http from "@/http/index.js"

const api={}
//个人中心 - 01、发送短信验证码 https://81.batmp.com/api/base/user/sendSms
api.sendSms=(params)=>http.post('/api/base/user/sendSms',params,false)

// 个人中心 - 01、图片上传接口  https://81.batmp.com/api/base/upload/base
api.uploadBase64=(params)=>http.post('/api/base/upload/base',params,false)
// 个人中心 - 02、用户注册 https://81.batmp.com/api/base/user/register
api.register=(params)=>http.post('/api/base/user/register',params,false)
// 个人中心 - 12、用户修改注册  https://81.batmp.com/api/base/user/set_reg_info
api.updateRegister=(params)=>http.post('/api/base/user/set_reg_info',params,false)
//个人中心 - 03、登录 https://81.batmp.com/api/base/user/login
api.login=(params)=>http.post('/api/base/user/login',params,false)
//个人中心 - 04、获取用户信息 https://81.batmp.com/api/base/user/getInfo
api.getUserInfo=(params)=>http.post('/api/base/user/getInfo',params,false)
//个人中心 - 05、设置支付密码  https://81.batmp.com/api/base/user/reset_pay_pwd
api.setPaypwd=(params)=>http.post('/api/base/user/reset_pay_pwd',params,false)
//个人中心 - 06、签到 https://81.batmp.com/api/base/user/sign
api.sign=(params)=>http.post('/api/base/user/sign',params,false)
//个人中心 - 07、本月签到列表 https://81.batmp.com/api/base/user/getSign
api.getSign=(params)=>http.post('/api/base/user/getSign',params,false)
//个人中心 - 09、判断余额是否充足&查询是否绑定手机号&是否设置支付密码 checkInfo pay_pwd https://81.batmp.com/api/base/user/check_info
api.checkInfo=(params)=>http.post('/api/base/user/check_info',params,false)
// 个人中心 - 10、修改个人信息 https://81.batmp.com/api/base/user/set_user_info
api.setUserInfo=(params)=>http.post('/api/base/user/set_user_info',params,false)
//个人中心 - 11、文件上传接口 https://81.batmp.com/api/base/file_upload/file
api.uploadFile=(filePath)=>http.upload('/api/base/file_upload/file', filePath,"", false)


//充值 - 1、wap支付充值 https://81.batmp.com/api/base/recharge/recharge_wap
api.recharge=(params)=>http.post('/api/base/recharge/recharge_wap',params,false);


//我的 - 01、我的积分，我的钱包 https://81.batmp.com/api/base/personal/my
api.getPointWallet=(params)=>http.post('/api/base/personal/my',params,false)
// 我的 - 02、我的优惠券 https://81.batmp.com/api/base/personal/my_coupon
api.getMyCoupon=(params)=>http.post('/api/base/personal/my_coupon',params,false)


//抽奖 - 01、获取抽奖的奖品 https://81.batmp.com/api/base/lottery/get_gift
api.getGift=(params)=>http.post('/api/base/lottery/get_gift',params,false)
//抽奖 - 02、抽奖 https://81.batmp.com/api/base/lottery/lottery
api.doLottery=(params)=>http.post('/api/base/lottery/lottery',params,false)
//抽奖 - 03、完善收货地址 https://81.batmp.com/api/base/lottery/update_address
api.setLotteryAddr=(params)=>http.post('/api/base/lottery/update_address',params,false)
//抽奖 - 04、中奖纪录 https://81.batmp.com/api/base/lottery/lottery_record
api.getLotteryRecd=(params)=>http.post('/api/base/lottery/lottery_record',params,false)

//提现 - 1、提现 https://81.batmp.com/api/base/deposit/deposit
api.deposit=(params)=>http.post('/api/base/deposit/deposit',params,false);
//提现 - 2、提现记录https://81.batmp.com/api/base/deposit/with_draw_list
api.depositList=(params)=>http.post('/api/base/deposit/with_draw_list',params,false)
//支付 - 01、获取可使用积分和可使用优惠券  https://81.batmp.com/api/base/pay/get_score_coupon
api.getScoreCoupon=(params)=>http.post('/api/base/pay/get_score_coupon',params,false)
//支付 - 02、余额支付 https://81.batmp.com/api/base/pay/pay_by_balance
api.payByBalance=(params)=>http.post('/api/base/pay/pay_by_balance',params,false)
//支付 - 03、微信支付宝支付   https://81.batmp.com/api/base/pay/pay
api.pay=(params)=>http.post('/api/base/pay/pay',params,false)



// 收货地址 - 01、收货地址列表 https://81.batmp.com/api/base/address/getList
api.getAddressList=(params)=>http.post('/api/base/address/getList',params,false)
//收货地址 - 02、添加收货地址 https://81.batmp.com/api/base/address/addAddr
api.addAddr=(params)=>http.post('/api/base/address/addAddr',params,false)
//收货地址 - 03、删除收货地址 https://81.batmp.com/api/base/address/delAddr
api.delAddr=(params)=>http.post('/api/base/address/delAddr',params,false)
// 收货地址 - 04、编辑收货地址  https://81.batmp.com/api/base/address/editAddr
api.editAddr=(params)=>http.post('/api/base/address/editAddr',params,false)
//收货地址 - 05、收货地址信息 https://81.batmp.com/api/base/address/addressInfo
api.getAddressInfo=(params)=>http.post('/api/base/address/addressInfo',params,false)

//消息 - 01、我的消息列表 https://81.batmp.com/api/base/system/getMsgLists
api.getMsgLists=(params)=>http.post('/api/base/system/getMsgLists',params,false)
//消息 - 02、未读消息数量  https://81.batmp.com/api/base/system/getUnReadMsg
api.getUnReadMsg=(params)=>http.post('/api/base/system/getUnReadMsg',params,false)
//消息 - 03、删除消息 https://81.batmp.com/api/base/system/delMsg
api.delMsg=(params)=>http.post('/api/base/system/delMsg',params,false)

//订单 - 01、根据商品id获取预下单信息 https://81.batmp.com/api/base/order/before_submit_order
api.beforeSubmit=(params)=>http.post('/api/base/order/before_submit_order',params,false)
//订单 - 02、创建订单 https://81.batmp.com/api/base/order/create_order
api.createOrder=(params)=>http.post('/api/base/order/create_order',params,false)
// 订单 - 03、订单列表 https://81.batmp.com/api/base/order/order_list
api.orderList=(params)=>http.post('/api/base/order/order_list',params,false)
//订单 - 04、订单详情 https://81.batmp.com/api/base/order/order_info
api.orderInfo=(params)=>http.post('/api/base/order/order_info',params,false)
//订单 - 05、取消订单 https://81.batmp.com/api/base/order/cancel_order
api.cancelOrder=(params)=>http.post('/api/base/order/cancel_order',params,false)
//订单 - 06、删除订单 https://81.batmp.com/api/base/order/delete_order
api.deleteOrder=(params)=>http.post('/api/base/order/delete_order',params,false)
//订单 - 08、订单确认收货 https://81.batmp.com/api/base/order/confirm_order
api.receiveOrder=(params)=>http.post('/api/base/order/confirm_order',params,false)
// 订单 - 09、评论订单 https://81.batmp.com/api/base/order/comment_order
api.evaluateOrder=(params)=>http.post('/api/base/order/comment_order',params,false)
//订单 - 10、申请退款  https://81.batmp.com/api/base/order/order_refund
api.refundOrder=(params)=>http.post('/api/base/order/order_refund',params,false)
//订单 - 11、取消申请退款 https://81.batmp.com/api/base/order/cancel_refund
api.cancelRefund=(params)=>http.post('/api/base/order/cancel_refund',params,false)

//论坛 - 01、发帖 https://81.batmp.com/api/base/forum/addOne
api.addPost=(params)=>http.post('/api/base/forum/addOne',params,false)
//论坛 - 02、帖子列表 https://81.batmp.com/api/base/forum/getList
api.getPostList=(params)=>http.post('/api/base/forum/getList',params,false)
//论坛 - 03、帖子详情 https://81.batmp.com/api/base/forum/detail
api.getPostDetail=(params)=>http.post('/api/base/forum/detail',params,false)
//论坛 - 04、投票 https://81.batmp.com/api/base/forum/vote
api.vote=(params)=>http.post('/api/base/forum/vote',params,false)
//论坛 - 05、评论 https://81.batmp.com/api/base/comment/addComment
api.addComment=(params)=>http.post('/api/base/comment/addComment',params,false)
//论坛 - 06、评论列表  https://81.batmp.com/api/base/comment/commentList
api.getPostComment=(params)=>http.post('/api/base/comment/commentList',params,false)
//论坛 - 07、论坛消息   https://81.batmp.com/api/base/comment/myComment
api.myComment=(params)=>http.post('/api/base/comment/myComment',params,false)


//购物车 - 01、添加购物车 https://81.batmp.com/api/base/cart/addCart
api.addCart=(params)=>http.post('/api/base/cart/addCart',params,false)
//购物车 - 02、购物车列表  https://81.batmp.com/api/base/cart/getCartList
api.getCartList=(params)=>http.post('/api/base/cart/getCartList',params,false)
//购物车 - 03、编辑、删除购物车  editCart  https://81.batmp.com/api/base/cart/editCart
api.editCart=(params)=>http.post('/api/base/cart/editCart',params,false)
//购物车 - 04、清空购物车 https://81.batmp.com/api/base/cart/clearCart
api.clearCart=(params)=>http.post('/api/base/cart/clearCart',params,false)

//通用 - 01、获取banner getBanner https://81.batmp.com/api/base/common/get_banner
api.getBanner=(params)=>http.post('/api/base/common/get_banner',params,false)
// 通用 - 02、获取文档 https://81.batmp.com/api/base/common/get_document
api.getDocument=(params)=>http.post('/api/base/common/get_document',params,false)
//通用 - 03、获取提现比例,小程序加盟我们顶部图片,微信微博二维码 https://81.batmp.com/api/base/common/getConfigInfo
api.getConfigInfo=(params)=>http.post('/api/base/common/getConfigInfo',params,false)
// 通用 - 04、获取地点 https://81.batmp.com/api/base/common/get_place
api.getPlace=(params)=>http.post('/api/base/common/get_place',params,false)
//通用 - 05、收藏、取消收藏 https://81.batmp.com/api/base/collect/collect
api.collect=(params)=>http.post('/api/base/collect/collect',params,false)
//通用 - 05、获取推荐块banner 1 2 3 https://81.batmp.com/api/base/common/get_tj_banner
api.getPicture=(params)=>http.post('/api/base/common/get_tj_banner',params,false)
//通用 - 06、意见反馈 https://81.batmp.com/api/base/common/submit_back
api.feedback=(params)=>http.post('/api/base/common/submit_back',params,false)
//通用 - 06、收藏的商品  https://81.batmp.com/api/base/collect/my_collect_product
api.myGoods=(params)=>http.post('/api/base/collect/my_collect_product',params,false)
//通用 - 07、收藏的店铺 https://81.batmp.com/api/base/collect/my_collect_shop
api.myShop=(params)=>http.post('/api/base/collect/my_collect_shop',params,false)
//通用 - 08、收藏的帖子 https://81.batmp.com/api/base/collect/my_collect_article
api.myPost=(params)=>http.post('/api/base/collect/my_collect_article',params,false)
// 首页 - 01、首页（获取推荐和分类）https://81.batmp.com/api/base/index/main
api.getIndex1=(params)=>http.post('/api/base/index/main',params,false)
//首页 - 06、获取分类 https://81.batmp.com/api/base/index/get_cates
api.getCates=(params)=>http.post('/api/base/index/get_cates',params,false)

// 商品 - 01、获取商品 https://81.batmp.com/api/base/product/get_product
api.getProduct=(params)=>http.post('/api/base/product/get_product',params,false)
//商品 - 02、获取商品详情  https://81.batmp.com/api/base/product/product_info
api.getProductInfo=(params)=>http.post('/api/base/product/product_info',params,false)
//商品 - 03、获取商品评论 https://81.batmp.com/api/base/product/get_order_comment
api.getProductComment=(params)=>http.post('/api/base/product/get_order_comment',params,false)

// 店铺 - 01、店铺列表（城市站） https://81.batmp.com/api/base/shop/shop_list
api.getShopList=(params)=>http.post('/api/base/shop/shop_list',params,false)
//店铺 - 02店铺详情  https://81.batmp.com/api/base/shop/shop_info
api.getShopInfo=(params)=>http.post('/api/base/shop/shop_info',params,false)

//军人咨询 - 01、提交文字咨询 https://81.batmp.com/api/base/txt_query/send_txt
api.sendQuery=(params)=>http.post('/api/base/txt_query/send_txt',params,false)
// 军人咨询 - 02、文字咨询记录 https://81.batmp.com/api/base/txt_query/txt_record
api.queryRecord=(params)=>http.post('/api/base/txt_query/txt_record',params,false)
//军人咨询 - 03、短视频列表 https://81.batmp.com/api/base/txt_query/get_short_video
api.getShortVideo=(params)=>http.post('/api/base/txt_query/get_short_video',params,false)
export default api;