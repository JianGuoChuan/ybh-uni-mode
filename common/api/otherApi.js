const otherApi = function(vm) {
	return {
		test() {
			return vm.$u.get('/test');
		},
		checkVersion() {
			return vm.$u.get('/checkVersion');
		},
		searchPlace(data) {
			return vm.$u.get('/search/place', data);
		},
	}
};
export default otherApi;