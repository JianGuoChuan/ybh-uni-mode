<template>
	<view class="padding-md">
		<ybh-navbar title='换肤系统' rightText='换肤' @click='themeShow = true'></ybh-navbar>
		<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
			<text class="font-bold font-sx">组件描述：</text>
			<text class="font-bold">themeSys</text><text>换肤系统把主题颜色存储在本地，如需存储在服务器只需提取主题参数即可。模板内组件基本支持此换肤系统所有预设皮肤，暂不支持自定义皮肤。</text>
		</view>
		<view>
			<view>
				<text class="font-bold font-sx">组件特点：</text>
			</view>
			<view class="padding-lr-md">
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 全局注册组件，可随处调用换肤面板 </view>
					<view> <text class="text-base-color font-italic" @tap='themeShow = true'> 立即换肤</text> </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 皮肤参数单独存放在本地，避开数据移除时的误删除 </view>
				</view>
			</view>
		</view>
		<ybh-themeSys :visible.sync='themeShow'></ybh-themeSys>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				themeShow: false
			}
		},
	}
</script>

<style>
</style>
