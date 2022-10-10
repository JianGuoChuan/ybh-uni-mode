<script>
	export default {
		data(){
			return {
				
			}
		},
		async onLaunch() {
			// 设置预设主题
			if( !this.vuex_themeColor.colorCode ){
				this.$u.vuex('vuex_themeColor',{
					color: "#0081ff",
					colorCharacter: "bg-gradual-blue",
					colorCode: "linear-gradient(45deg, #0081ff, #1cbbb4)",
					colorTitle: "魔幻蓝"
				});
			}
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