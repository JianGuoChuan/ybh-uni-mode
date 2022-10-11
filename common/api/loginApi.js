const loginApi = function(vm) {
	return {
		login(data) {
			return vm.$u.post( '/login',data);
		},
	}
};
export default loginApi;
