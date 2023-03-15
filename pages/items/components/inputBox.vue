<template>
	<view class="padding-md">
		<ybh-navbar title='步进器'></ybh-navbar>
		<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
			<text class="font-bold font-sx">组件描述：</text>
			<text class="font-bold">input-box</text><text>步进器主要解决在使用步进器增减时因为浮点类型数据加减特性导致小数位异常问题，并且接入模板主题预设颜色。</text>
		</view>
		<view>
			<view>
				<text class="font-bold font-sx">组件特点：</text>
			</view>
			<view class="padding-lr-md">
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持限制数据类型（浮点型/整型） </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持添加最大值/最小值 </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持修改步长 </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 开启插入模式：输入框激活时会自动覆盖原数据 </view>
					<view class="flex space-between"> 
						<ybh-input-box :insertMode='true' v-model="value2"></ybh-input-box>
					</view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 默认配置：允许整数小数、默认值0、最小值0、无最大值限制、步长1 </view>
					<view class="flex space-between"> 
						<ybh-input-box></ybh-input-box>
					</view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 自定义配置：仅允许整数、默认值5、最小值-10、最大值10.5、步长2 </view>
					<view class="flex space-between"> 
						<ybh-input-box :keepInt='true' max='10.5' min='-10' step='2' v-model="value1"
							@change='inputBoxChange' @blur='inputBoxChange' @minus='inputBoxChange' @plus='inputBoxChange'></ybh-input-box>
					</view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 在开启仅为整数设置最大值、最小值却为小数时，以保留整数为先，即最大值为10.5，但因为仅保留整数，最大值相当于为10 </view>
				</view>
				<view class="padding-tb-md"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value1: 1.5,
				value2: 924,
			}
		},
		methods: {
			inputBoxChange(value){
				console.log(value);
			},
		},
	}
</script>

<style>
	
</style>
