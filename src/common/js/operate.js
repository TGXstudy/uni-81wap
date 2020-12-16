import $api from "../../api/index.js";
import $mUtils from "./utils.js"
import config from "@/config/index.config.js"
function operate() {

}
operate.install = function(vue) {
	// console.log("全局混入mixin");
	vue.mixin({
		// onLoad() {
		// 	console.log("全局混入mixin onload -----");
		// 	if(!uni.getStorageInfoSync("hasLogin")){
		// 		vue.$mRouter.reLaunch({
		// 			route:vue.$mRoutesConfig.login
		// 		})
		// 	}
		// },
		
		methods: {
			imgPrefix(url){
				return config.imgUrl + url;
			},
			//拨打电话
			doCall(num){
				uni.makePhoneCall({
					phoneNumber:num
				})
			},
			goPage(pageName,queryObj={}){
				this.$mRouter.push({
					route:this.$mRoutesConfig[pageName],
					query:queryObj
				})
			},
			//角色值 转化
			roleToCode(str){
				//user => 2普通用户 soldier => 3军人 channeler => 4渠道商 supplier => 5供应商 
				let role=["0","1",'user','soldier','channeler','supplier'];
				return role.indexOf(str);
			},
			//角色值 转化
			roleToStr(code){
				//user => 2普通用户 soldier => 3军人 channeler => 4渠道商 supplier => 5供应商 
				let role=["0","1",'user','soldier','channeler','supplier'];
				return role[code];
			},
			//刷新成功 下拉loading隐藏
			stopPull(status){
				if(status == 'refresh'){
					// this.$mUtils.toast("刷新成功");
					uni.stopPullDownRefresh()
				}
			}
			
			
			
		}
	})
}
export default operate;
