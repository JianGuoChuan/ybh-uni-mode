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
	}
}
export default router;
