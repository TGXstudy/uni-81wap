export default {
	/* 
	 * obj 转 路由地址带参数
	 * 例子：{a:1,b:2} => /pages/index/index?a=1&b=2
	 */
	objParseUrlAndParam(path, obj) {
		let url = path || "/";
		let paramsStr = "";
		if (obj instanceof Array) return url;
		if (!(obj instanceof Object)) return url;
		paramsStr = this.objParseParam(obj);
		paramsStr && (url += "?");
		url += paramsStr;
		return url;
	},
	/*
	 * params字符串参数 转  obj 
	 * 例子：a=1&b=2 => {a:1,b:2}
	 */
	paramParseObj(param) {
		let paramsArr = param.split("&");
		let obj = {}
		paramsArr.forEach(item => {
			obj[item.split('=')[0]] = item.split('=')[1]
		})
		return obj
	},
	/* 
	 * obj 转 params字符串参数  
	 * 例子：{a:1,b:2} => a=1&b=2
	 */
	objParseParam(obj) {
		let paramsStr = "";
		if (obj instanceof Array) return paramsStr;
		if (!(obj instanceof Object)) return paramsStr;
		for (let key in obj) {
			paramsStr += `${key}=${obj[key]}&`;
		}
		return paramsStr.substring(0, paramsStr.length - 1);
	},
	toast(msg = "", delay = false, icon = "none") {
		uni.showToast({
			title: msg,
			duration: 2000,
			icon
		})
		if (delay) {
			return new Promise(resolve => {
				var timer = setTimeout(function() {
					resolve();
					clearTimeout(timer)
				}, 1000)
			})
		}
	},

	getRandStr(n) {
		let str = ''
		for (let i = 0; i < n; i++) {
			str += Math.floor(Math.random() * 10).toString()
		}
		return str
	},
	// 获取当前时间
	getCurTime() {
		let date = new Date(),
			y = date.getFullYear().toString().substr(2),
			m = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1).toString(),
			d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate().toString(),
			h = date.getHours() % 12 < 10 ? '0' + date.getHours() % 12 : (date.getHours() % 12).toString(),
			i = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes().toString(),
			s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds().toString();
		return (y + m + d + h + i + s)
	},

	formatRichText(html) {
		let newContent = html.replace(/<img[^>]*>/gi, function(match, capture) {
			match = match.replace(/style="[^"]+"/gi, '').replace(/style='[^']+'/gi, '');
			match = match.replace(/width="[^"]+"/gi, '').replace(/width='[^']+'/gi, '');
			match = match.replace(/height="[^"]+"/gi, '').replace(/height='[^']+'/gi, '');
			return match;
		});
		newContent = newContent.replace(/style="[^"]+"/gi, function(match, capture) {
			match = match.replace(/width:[^;]+;/gi, 'width:100%;').replace(/width:[^;]+;/gi, 'width:100%;');
			return match;
		});
		newContent = newContent.replace(/<br[^>]*\/>/gi, '');
		newContent = newContent.replace(/\<img/gi, '<img style="width:100%;height:auto;display:block;margin:10px 0;"');
		return newContent;
	},
	
	checkIsWx() {
		var u = navigator.userAgent.toLowerCase()
		if (u.match(/MicroMessenger/i)) {
			return true
		}
		return false
	},

}
