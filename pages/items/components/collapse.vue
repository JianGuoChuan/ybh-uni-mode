<template>
	<view>
		<ybh-navbar title='折叠菜单'></ybh-navbar>
		<view class="padding-md">
			<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
				<text class="font-bold font-sx">组件描述：</text>
				<text class="font-bold">collapse</text><text>折叠菜单接入模板预设主题，较高自由度的折叠项配置；</text>
			</view>
			<view>
				<view>
					<text class="font-bold font-sx">组件特点：</text>
				</view>
				<view class="padding-lr-md">
					<view class="padding-tb-sm border-bottom-f1">
						<view class="margin-bottom-md"> <text class="margin-right-md">●</text> 功能预览 </view>
						<view> 
							<ybh-collapse :data='collapseDatas'></ybh-collapse>
						</view>
					</view>
					<view class="padding-tb-sm border-bottom-f1">
						<view class="margin-bottom-md"> <text class="margin-right-md">●</text> 支持自定义标题栏背景颜色 </view>
					</view>
					<view class="padding-tb-sm border-bottom-f1">
						<view class="margin-bottom-md"> <text class="margin-right-md">●</text> 配置化组件 </view>
					</view>
					<view class="padding-tb-sm border-bottom-f1">
						<view class="margin-bottom-md"> <text class="margin-right-md">●</text> 支持自定义图标与uview图标库混合使用 </view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				collapseDatas : [
					{
						id: 1,
						label: '标题一',
						icon: 'account',
						content: '我是内容',
						open: true,
					},
					{
						id: 2,
						label: '标题二',
						icon: 'ybh-icon-praise',
						content: '我是内容',
						userIcon: true,
						open: false,
						isSlot: true
					}
				],
			}
		},
		methods: {
			
		},
	}
</script>

<style>
</style>
