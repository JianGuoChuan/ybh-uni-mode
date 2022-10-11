const otherApi = function(vm) {
	return {
		test() {
			return vm.$u.get('/test');
		},
		checkVersion() {
			return vm.$u.get('/checkVersion');
		},
	}
};
export default otherApi;