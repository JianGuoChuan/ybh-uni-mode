<template>
	<view class="padding-md">
		<ybh-navbar title='悬浮按钮组'></ybh-navbar>
		<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
			<text class="font-bold font-sx">组件描述：</text>
			<text class="font-bold">fab</text><text>悬浮按钮组脱离了文本流，在页面中也有着较高的出现率；</text>
		</view>
		<view>
			<view>
				<text class="font-bold font-sx">组件特点：</text>
			</view>
			<view class="padding-lr-md">
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 灵活的显隐方式 </view>
					<view> <text class="text-base-color font-italic" @tap='fabShow = !fabShow'> {{ !fabShow ? '立即显示' : '立即隐藏' }}</text> </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 配置化组件 </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 自定义入口位置 </view>
				</view>
			</view>
			<ybh-fab v-show='fabShow' :left="50" :right="0" :bottom="100" :btnList="fabList" @click='click'></ybh-fab>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fabShow: false,
				fabList: [
					{
						bgColor: "#16C2C2",
						//图标/图片地址
						imgUrl: "",
						//图片高度 rpx
						imgHeight: 64,
						//图片宽度 rpx
						imgWidth: 64,
						//名称
						text: "关于",
						//字体大小
						fontSize: 34,
						//字体颜色
						color: "#fff"
					}, {
						bgColor: "#64B532",
						imgUrl: "",
						imgHeight: 64,
						imgWidth: 64,
						text: "保存",
						fontSize: 34,
						color: "#fff"
					}, {
						bgColor: "#FFA000",
						imgUrl: "",
						imgHeight: 64,
						imgWidth: 64,
						text: "点赞",
						fontSize: 34,
						color: "#fff"
					}
				],
			}
		},
		methods: {
			click(data){
				console.log(data);
			}
		},
	}
</script>

<style>
	
</style>
