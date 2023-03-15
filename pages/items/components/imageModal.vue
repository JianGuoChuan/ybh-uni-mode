<template>
	<view class="padding-md">
		<ybh-navbar title='图片查看'></ybh-navbar>
		<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
			<text class="font-bold font-sx">组件描述：</text>
			<text class="font-bold">imageModal</text><text>图片查看组件提供了大图预览功能，并且支持一键保存图片至本体设备</text>
		</view>
		<view>
			<view>
				<text class="font-bold font-sx">组件特点：</text>
			</view>
			<view class="padding-lr-md">
				<view class="padding-tb-sm">
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 调用方式简单、多样 </view>
						<view> <text class="text-base-color font-italic" @tap='imageShow = true'> 立即查看 </text> </view>
					</view>
				</view>
				<view class="padding-tb-sm">
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 缩略图点击预览 </view>
						<view> <image :src='imageUrl' style="width: 50px;height: 50px;" @tap='imageShow = true'/> </view>
					</view>
				</view>
				<view class="padding-tb-sm">
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 支持一键保存图片至本地 </view>
					</view>
				</view>
			</view>
			<ybh-imageModal :visible.sync='imageShow' :imageUrl='imageUrl'></ybh-imageModal>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imageShow: false,
				imageUrl : require('@/static/img/long.png'),
			}
		},
		methods: {
			openFile(){
				
			}
		},
	}
</script>

<style>
	
</style>
