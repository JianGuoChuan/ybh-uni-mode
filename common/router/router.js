import qs from 'qs';
let router = {
	to(url,data){
		let toUrl = url + '?' + qs.stringify(data);
		uni.navigateTo({
			url : toUrl,
		})
	},
	redirect(url,data){
		let toUrl = url + '?' + qs.stringify(data);
		uni.redirectTo({
	　　　　url: toUrl
	　　});
	},
	reLaunch(url,data){
		let toUrl = url + '?' + qs.stringify(data);
		uni.reLaunch({
			url: toUrl
　　　	});
	},
	async switchTab(url){
		await uni.switchTab({
　　　　　　url: url
　　　　});
	},
	back(delta){
		uni.navigateBack({
			delta
		})
	},
	// 延迟跳转系列
	delayBack(delay = 1000, delta = 1) {
	    setTimeout(() => {
	        uni.navigateBack({
				delta: delta
	        });
	    }, delay);
	},
	delayToRouter(path, delay = 1000,data){
		setTimeout(() => {
		    let toUrl = path + '?' + qs.stringify(data);
		    uni.navigateTo({
		    	url : toUrl
		    })
		}, delay);
	},
	delayReLaunchRouter(path, delay = 1000,data){
		setTimeout(() => {
		    let toUrl = path + '?' + qs.stringify(data);
		    uni.reLaunch({
		    	url : toUrl
		    })
		}, delay);
	},
	delaySwitchTabRouter( path, delay = 1000){
		setTimeout(() => {
		    uni.switchTab({
		    	url : path
		    })
		}, delay);
	},
}
export default router;
