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
		});
	},
	// 延迟跳转系列
	delayBack(delay = 1000, delta = 1, callback) {
	    setTimeout(() => {
	        uni.navigateBack({
				delta: delta
	        });
			callback();
	    }, delay);
	},
	delayToRouter(path, delay = 1000, data, callback){
		setTimeout(() => {
		    let toUrl = path + '?' + qs.stringify(data);
		    uni.navigateTo({
		    	url : toUrl
		    });
			callback();
		}, delay);
	},
	delayReLaunchRouter(path, delay = 1000, data, callback){
		setTimeout(() => {
		    let toUrl = path + '?' + qs.stringify(data);
		    uni.reLaunch({
		    	url : toUrl
		    });
			callback();
		}, delay);
	},
	delaySwitchTabRouter( path, delay = 1000, callback){
		setTimeout(() => {
		    uni.switchTab({
		    	url : path
		    });
			callback();
		}, delay);
	},
}
export default router;
