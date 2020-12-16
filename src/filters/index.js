import config from "@/config/index.config.js"


export const imgRel = (url) => {
	return '../../static/images/' + url;
}

export const imgUrl = (url) => {
	return config.imgUrl + url;
}

export const compressImg = (val,size=400)=> {
	return val.split("!")[0].split("?")[0] + `?imageView2/0/w/${size}/h/${size}`;
}

export const hideTel = (tel) => {
	if(tel){
		return tel.substring(0,3)+"****"+tel.substring(8);
	}
}
