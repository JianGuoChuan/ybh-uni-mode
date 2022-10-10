<template>
	<view class="padding-md">
		<ybh-navbar title='加载中'></ybh-navbar>
		<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
			<text class="font-bold font-sx">组件描述：</text>
			<text class="font-bold">loading</text><text>加载中组件是一套用css3去模拟实现常用的数据加载时的动画效果试图辅助组件。</text>
		</view>
		<view>
			<view>
				<text class="font-bold font-sx">组件特点：</text>
			</view>
			<view class="padding-lr-md">
				<view class="padding-tb-md border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 接入了模板预设主题颜色 </view>
				</view>
				<view class="padding-tb-md border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 切换简捷，只需修改加载中类型即可切换 </view>
				</view>
				<view class="padding-tb-md border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 加载主题1/默认 演示 </view>
					<view class="flex flex-center"> 
						<ybh-loading></ybh-loading>
					</view>
				</view>
				<view class="padding-tb-md border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 加载主题2 演示</view>
					<view class="flex flex-center"> 
						<ybh-loading loadingType='type2'></ybh-loading>
					</view>
				</view>
				<view class="padding-tb-md border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 加载主题3 演示 </view>
					<view class="flex flex-center"> 
						<ybh-loading loadingType='type3'></ybh-loading>
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
				
			}
		},
		methods: {
			
		},
	}
</script>

<style>
	
</style>
