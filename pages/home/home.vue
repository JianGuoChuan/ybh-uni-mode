<template>
	<view class="text-center padding-lr-lgx padding-top-lgx">
		<view class="ppadding-top-lgx" style="height: 50px;"></view>
		<view class="padding-tb-lg">
			<text class="font-bold font-com">欢迎使用</text></br>
			<text class="font-bold font-com">ybh-uniUI-模板</text>
		</view>
		<view class="padding-tb-lgx padding-lr-lgx">
			<text>ybh-uniUI模版基于uniapp+uview1.0做整合定制升级的一款实现快速开始APP项目开发的模版项目</text>
		</view>
		<view class="padding-tb-lg padding-lr-lg text-left">
			<text>ybh-uniapp 整合内容包括：</text>
			<ul class='padding-left-lg margin-top-md'>
				<li>1）自定义通用样式表</li>
				<li>2）全面的路由、情景方法</li>
				<li>3）简便的api方法请求</li>
				<li>4）简单方便、可持久化vuex使用</li>
				<li>5）场景化的全局组件</li>
			</ul>
		</view>
		<view class="text-right padding-tb-lgx">
			<text>v {{version}}</text></br>
			<text>{{updataTime}}</text>
		</view>
	</view>
</template>
<script>
	import devConfig from '@/common/devConfig.js';
	export default {
		data(){
			return {
				version : devConfig.version,
				updataTime : devConfig.updataTime,
				updatahumen : devConfig.updatahumen
			}
		},
		methods:{
			startLearn(){ this.$routes.reLaunch('/pages/dev_word/directory'); }
		}
	}
</script>
<style scoped lang="scss">
	.start_btn{width: 120px;}
</style>