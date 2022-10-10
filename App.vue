<script>
	export default {
		data(){
			return {
				
			}
		},
		async onLaunch() {
 			// #ifdef APP-PLUS
			// 获取app版本信息 用于版本更新
			let res = await this.$iipKit.checkVersion(this);
			this.$u.vuex('vuex_versionCode',res)
			// #endif
			// 打开注释 模拟更新
			// this.$u.vuex('vuex_versionCode',101)
		},
	}
</script>

<style lang="scss">
	@import url("./static/font/ybh-font/iconfont.css");
	@import "uview-ui/index.scss";
	@import "./static/css/base.css";
</style>