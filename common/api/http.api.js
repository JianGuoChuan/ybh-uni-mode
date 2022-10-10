import loginApi from '@/common/api/loginApi.js';
import userApi from '@/common/api/userApi.js';
const install = (Vue, vm) => {
    let api = {};
	api.loginApi = loginApi(vm);
	api.userApi = userApi(vm);
    Vue.prototype.$api = api;
}
export default {
    install
}