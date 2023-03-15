<template>
	<view class="padding-md">
		<ybh-navbar title='按钮'></ybh-navbar>
		<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
			<text class="font-bold font-sx">组件描述：</text>
			<text class="font-bold">button</text><text>按钮组件保留了uni按钮原有功能之外，接入了模板预设主题颜色与节流优化；</text>
		</view>
		<view>
			<view>
				<text class="font-bold font-sx">组件特点：</text>
			</view>
			<view class="padding-lr-md">
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 默认兼容主题预设 </view>
					<view class="flex space-between"> 
						<ybh-button @click='clickButton'>主题色</ybh-button> 
					</view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持开启加载状态 </view>
					<view class="flex space-between"> 
						<ybh-button :loading='true'>加载中</ybh-button>
					</view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持开启禁用 </view>
					<view class="flex space-between"> 
						<ybh-button :disabled='true' @click='clickButton'>开启禁用</ybh-button>
					</view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持开启镂空 </view>
					<view class="flex space-between"> 
						<ybh-button :plain='true'>开启镂空</ybh-button>
					</view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持设置尺寸大小 </view>
					<view class="flex space-between"> 
						<ybh-button size='mini'>mini</ybh-button>
						<ybh-button size='medium'>medium</ybh-button>
						<ybh-button size='default'>default</ybh-button>
					</view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持开启/关闭圆角 </view>
					<view class="flex space-between"> 
						<ybh-button>默认开启圆角</ybh-button>
						<ybh-button :square='false'>关闭圆角</ybh-button>
					</view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 自定义按钮文本/背景颜色 </view>
					<view class="flex space-between"> 
						<ybh-button bgColor="red" textColor='#FFF'>自定义背景</ybh-button>
						<ybh-button bgColor="blue" textColor='red'>自定义背景</ybh-button>
					</view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持开启节流模式 </view>
					<view class="flex space-between"> 
						<ybh-button throttle throttleTime='5000' @click='clickButton'>开启节流</ybh-button>
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
			clickButton(){
				console.log('按钮点击触发');
			}
		},
	}
</script>

<style>
	
</style>
