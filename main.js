import Vue from 'vue';
import App from './App';
import vuexStore from './store/$u.mixin.js'
import store from '@/store';
import uView from 'uview-ui';
import qs from 'qs';
import routes from './common/router/router.js';
import iipKit from './common/js/kit/iipKit.js'
import legalCheck from './common/js/kit/legalCheck.js'

Vue.config.productionTip = false;
App.mpType = 'app';

Vue.prototype.$store = store;
Vue.prototype.$routes = routes;
Vue.prototype.$iipKit = iipKit;
Vue.prototype.$legalCheck = legalCheck;
Vue.prototype.$qs = qs;

Vue.use(uView);
Vue.mixin(vuexStore);

const app = new Vue({
	store,
	...App
});

// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/api/http.interceptor.js';
Vue.use(httpInterceptor, app);

// http接口API抽离，免于写url或者一些固定的参数
import httpApi from '@/common/api/http.api.js';
Vue.use(httpApi, app);
app.$mount();

//处理请求时的异常广播
let catchCount = {
    curr:0,
    last:0,
};
const toast = function(msg) {
    uni.showToast({
        icon: 'none',
        position: 'bottom',
        title: msg,
        duration: 2000
    })
}; 
// 消息监听
uni.$on('requestUnhandledRejection', function(event) {
    if (catchCount.last > 1) { return;}
	if( !event || event.errMsg && event.statusCode != 200){
		toast('请检查服务是否开启');
		return
	}
    let msg = event.msg || event.data.msg;
    if (msg) {
        toast(msg); 
    }
});