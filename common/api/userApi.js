const userApi = function(vm) {
	return {
		getUserInfo(data) {
			return vm.$u.get('URL',{data});
		},
		searchPwdIsDefault() {
			return vm.$u.get('/mobile/isDefaultPassword',{});
		},
	}
};
export default userApi;