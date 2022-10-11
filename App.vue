<script>
	export default {
		data(){
			return {}
		},
		onLaunch() {
			// 设置预设主题
			if( !this.vuex_themeColor.colorCode ){
				this.$u.vuex('vuex_themeColor',{
					color: "#0081ff",
					colorCharacter: "bg-gradual-blue",
					colorCode: "linear-gradient(45deg, #0081ff, #1cbbb4)",
					colorTitle: "魔幻蓝"
				});
			}
			// 检测版本更新 简易模式
			// this.$iipKit.checkVersion(this);
			// 检测版本更新 强化进阶模式 【须在真机环境运行】
			// this.$iipKit.checkVersionPlus(this);
		},
	}
</script>

<style lang="scss">
	@import url("./static/font/ybh-font/iconfont.css");
	@import "uview-ui/index.scss";
	@import "./static/css/base.css";
</style>