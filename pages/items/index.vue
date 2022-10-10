<template>
	<view>
		<ybh-navbar title='基本使用' :isBack="false" rightText='换肤' @click='show = true'></ybh-navbar>
		<view class="menu_content padding-lr-md padding-tb-lg">
			<u-grid :col="2">
				<u-grid-item v-for="(item,index) in itemsList" @tap='toMenuPage(item)'>
					<text :class="[ 'ybh-icon', item.icon, 'font-lgcx', 'margin-bottom-md' ]" ></text>
					<text class="grid-text font-bold font-sx">{{item.label}}</text>
					<text class="grid-text font-xs text-center text-darkgrey margin-top-sm">{{item.desc}}</text>
				</u-grid-item>
			</u-grid>
			<view class="padding-tb-lgx padding-lr-md font-indent">
				<text>注：正式开发环境 需自行配置manifset文件，且原uni、uview语法皆可直接使用，无冲突。</text>
			</view>
		</view>
		<ybh-themeSys :visible.sync='show'></ybh-themeSys>
	</view>
</template>
<script>
	import devConfig from '@/common/devConfig.js';
	export default {
		data() {
			return {
				show: false,
				itemsList: devConfig.itemsList,
			}
		},
		methods: {
			toMenuPage(item) {
				this.$routes.to(item.path)
			},
		},
		// onLoad() {
		// 	console.log('onLoad');
		// },
		// onShow() {
		// 	console.log('onShow');
		// },
		// created() {
		// 	console.log('created');
		// },
		// onReady() {
		// 	console.log('onReady');
		// },
		// mounted() {
		// 	console.log('mounted');
		// },
	}
</script>
<style scoped lang="scss"></style>
