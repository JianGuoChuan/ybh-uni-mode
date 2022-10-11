<template>
	<view class="">
		<ybh-userCard paddingTop='30' height='160' contentHeight='120' @set='show = true' @scan='scan' @notice='notice'>
			<template v-slot:userCardContent>
				<view class="flex">
					<view class="padding-top-lgx padding-right-lgx padding-left-md border-right-f1" style='height: 120px;'>
						<image :src="src" class="logoStyleHome"></image>
					</view>
					<view class="text-darkgreyplus padding-md padding-top-lgx border-box width-all text-center" style='height: 120px;'>
						<view class="padding-top-md">
							<text class="font-bold font-md">ybh-uniui-mode</text></br>
							<text>快速起步，问答无用</text>
						</view>
					</view>
				</view>
			</template>
		</ybh-userCard>
		<view class="padding-bottom-lgx padding-lr-lgx text-indent">
			<text>ybh-uniui-mode模版基于uniapp+uview1.0做整合升级的一款帮助实现快速开始APP/小程序项目的开发模版。</text>
		</view>
		<view class="padding-tb-lg padding-lr-lg text-left">
			<text>ybh-uniui-mode整合内容：</text>
			<ul class='padding-left-lg margin-top-md'>
				<li>1）自定义、多样化的通用样式表</li>
				<li>2）全面、情景化的路由方法</li>
				<li>3）简便的、完善的api请求方案</li>
				<li>4）易用、可持久化Vuex状态管理</li>
				<li>5）场景化的全局组件库</li>
				<li>6）常用、实用的工具、插件</li>
			</ul>
			<view class="padding-tb-lgx text-right">
				<text>v {{version}}</text></br>
				<text>{{updataTime}}</text>
			</view>
		</view>
		<ybh-themeSys :visible.sync='themeSysShow'></ybh-themeSys>
		<u-popup v-model="show" width="60%" border-radius='15' duration='200' z-index='10000'>
			<view class="padding-top-lgx margin-top-lgx">
				<view class="padding-bottom-lgx text-center">
					<view>
						<image :src="src" class="logoStylePop"></image>
					</view>
					<text class="font-bold font-com">{{vuex_userinfo.username || '' }}</text>
				</view>
				<view class="margin-top-lg text-left">
					<u-cell-group>
						<u-cell-item icon="integral" title="换肤" @tap='themeSysShow = true'></u-cell-item>
						<u-cell-item icon="integral" title="检测更新" @tap='checkUpdate'></u-cell-item>
						<u-cell-item icon="minus-circle" title="退出" @tap='loginOut'></u-cell-item>
					</u-cell-group>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	import devConfig from '@/common/devConfig.js';
	export default {
		data(){
			return {
				show: false,
				themeSysShow: false,
				src: require('@/static/img/logo.png'),
				version : devConfig.version,
				updataTime : devConfig.updataTime,
				updatahumen : devConfig.updatahumen
			}
		},
		methods:{
			loginOut(){
				this.$u.vuex( 'vuex_userinfo', {} );
				this.$u.vuex( 'vuex_token', '' );
				this.$routes.reLaunch('/pages/login/login')
			},
			checkUpdate(){
				this.show = false;
				// 检测版本更新 简易模式
				this.$iipKit.checkVersion(this);
				// 检测版本更新 强化进阶模式 【须在真机环境运行】
				// this.$iipKit.checkVersionPlus(this);
			},
			scan(){
				console.log('扫码触发');
			},
			notice(){
				console.log('消息触发');
			}
		}
	}
</script>
<style scoped lang="scss">
	.logoStyleHome{width: 80px;height: 80px;}
	.logoStylePop{width: 60px;height: 60px;}
</style>