<template>
	<view class="padding-md">
		<ybh-navbar title='模态框'></ybh-navbar>
		<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
			<text class="font-bold font-sx">组件描述：</text>
			<text class="font-bold">modal</text><text>模态框在原模态框的功能基础上，增加支持录入数据与扫码功能的强化版；</text>
		</view>
		<view>
			<view>
				<text class="font-bold font-sx">组件特点：</text>
			</view>
			<view class="padding-lr-md">
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 优雅的模态框样式 </view>
					<view> <text class="text-base-color font-italic" @tap='showModal'> 立即显示</text> </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 支持修改标题 </view>
					<view> <text class="text-base-color font-italic" @tap='changeModalTitle'> 立即显示</text> </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 支持添加输入框提示文字 </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 支持设置输入框文本类型 </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 支持修改标题尺寸/大小(单位px) </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 支持扫码按钮的显隐 </view>
					<view> <text class="text-base-color font-italic" @tap='showScan'> {{ scanShow ? '立即隐藏' : '立即显示' }}</text> </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 支持输入框自动聚焦 </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 支持取消按钮的显隐 </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 开启扫码后自动将扫码结果返回至输入框 </view>
				</view>
			</view>
		</view>
		<ybh-modal 
			:visible.sync="modalShow" 
			:scanMode="scanShow" 
			:title='title' 
			:aotoFocus='true'
			placeholder='请输入模态框内容' 
			titleSize='16px' 
			inputType="text"
			@confirm='confirm'
			@cancel='cancel'>
		</ybh-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '测试',
				modalShow: false,
				scanShow: true,
			}
		},
		methods: {
			showModal() {
				this.title = '标题';
				this.modalShow = true;
			},
			changeModalTitle(){
				this.title = '修改后的标题';
				this.modalShow = true;
			},
			showScan(){
				this.scanShow = !this.scanShow;
				this.modalShow = true;
			},
			confirm(value){
				console.log(value);
			},
			cancel(value){
				console.log(value);
			}
		},
	}
</script>

<style>
</style>
