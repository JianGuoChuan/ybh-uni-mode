<template>
	<view class="padding-md">
		<ybh-navbar title='模态框强化版'></ybh-navbar>
		<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
			<text class="font-bold font-sx">组件描述：</text>
			<text class="font-bold">modalPlus</text><text>模态框强化版在原模态框的功能基础上，对外观样式、显隐动画做了深度强化，新增了按钮组多选模式；</text>
		</view>
		<view>
			<view>
				<text class="font-bold font-sx">组件特点：</text>
			</view>
			<view class="padding-lr-md">
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 比优雅更优雅的模态框样式 </view>
					<view> <text class="text-base-color font-italic" @tap='modalShow1 = true'> 立即显示</text> </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 多选模式 </view>
					<view> <text class="text-base-color font-italic" @tap='modalShow2 = true'> 立即显示</text> </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 录入/扫码模式 </view>
					<view> <text class="text-base-color font-italic" @tap='modalShow3 = true'> 立即显示</text> </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 保留原模态框基础设置 </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 支持标题自定义 </view>
				</view>
				<view class="padding-tb-sm flex space-between border-bottom-f1">
					<view> <text class="margin-right-md">●</text> 支持按钮自定义/样式自定义 </view>
				</view>
			</view>
		</view>
		<ybh-modalplus :show.sync="modalShow1" title="提示" content="确定删除此物品吗?" @click='modalClick' @cancel='modalClick'></ybh-modalplus>
		<ybh-modalplus :show.sync="modalShow2" content="请选择支付方式" 
			:button="[
				{ text: '微信', type: 'green', plain: true }, 
				{ text: '支付宝', plain: false }, 
				{ text: '银行卡', type: 'red', plain: true }
			]" 
			@click='modalClick'></ybh-modalplus>
		<ybh-modalplus :show.sync="modalShow3" title="请输入编号" :scanInput='true' placeholder='编号' @click='modalClick'></ybh-modalplus>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modalShow1: false,
				modalShow2: false,
				modalShow3: false,
			}
		},
		methods: {
			modalClick(data){
				console.log(data);
			}
		},
	}
</script>

<style>
</style>
