<template>
	<view>
		<ybh-navbar 
			:title='title' 
			:isBack="isBack" 
			:rightText='rightText' 
			:titlebold='titleIsBold' 
			:shadowSwitch='isShowshadow'
			@click='submit'>
		</ybh-navbar>
		<view class="padding-md">
			<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
				<text class="font-bold font-sx">组件描述：</text>
				<text class="font-bold">navbar</text><text>自定义顶部导航栏组件,有较高的修改自由度，使用时请在页面配置时关闭默认的导航显示；</text>
			</view>
			<view>
				<view>
					<text class="font-bold font-sx">组件特点：</text>
				</view>
				<view class="padding-lr-md">
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 支持修改标题 </view>
						<view> <text class="text-base-color font-italic" @tap='changeTitle'> 立即修改</text> </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 左侧返回按钮显隐 </view>
						<view> <text class="text-base-color font-italic" @tap='hiddenBack'> 立即{{ isBack ? '隐藏' : '显示' }}</text> </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 右侧文本按钮显隐 </view>
						<view> <text class="text-base-color font-italic" @tap='hiddenOpreButton'> 立即{{ isShowRightText ? '隐藏' : '显示' }}</text> </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 支持修改右侧文本 </view>
						<view> <text class="text-base-color font-italic" @tap='changeOpreText'> 立即修改</text> </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 右侧文本支持使用@click直接绑定事件 </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 接入模板主题色 </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 标题文本支持加粗 </view>
						<view> <text class="text-base-color font-italic" @tap='titleBold'> {{ titleIsBold ? '立即还原' : '立即加粗' }} </text> </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 标题文本支持修改颜色 </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 右侧自定义文本支持修改颜色 </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 左侧返回按钮支持修改颜色 </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 支持底部显示阴影 </view>
						<view> <text class="text-base-color font-italic" @tap='showShadow'> {{ isShowshadow ? '移除阴影' : '添加阴影' }} </text> </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 支持修改背景颜色(单色模式/多色模式) </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 支持右侧操作按钮完全自定义(需开启插槽，请查阅组件说明) </view>
					</view>
					<view class="padding-tb-sm flex space-between border-bottom-f1">
						<view> <text class="margin-right-md">●</text> 支持返回按钮完全自定义(需开启插槽，请查阅组件说明) </view>
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
				title: '标题',
				rightText: '提交',
				isBack: true,
				isShowRightText: true,
				titleIsBold: false,
				isShowshadow: false,
			}
		},
		methods: {
			changeTitle() {
				this.title = '标题被修改了';
			},
			hiddenBack(){
				this.isBack = !this.isBack;
			},
			hiddenOpreButton(){
				this.isShowRightText = !this.isShowRightText
				this.rightText = this.isShowRightText ? '提交' : '' ;
			},
			changeOpreText(){
				if(!this.isShowRightText){
					uni.showToast({
						title: '请先显示右侧文本',
						duration: 2000,
						icon: 'none'
					})
					return
				}
				this.rightText = '右侧文字被修改了';
			},
			submit(){
				uni.showToast({
					title: '提交完成',
					duration: 2000
				})
			},
			titleBold(){
				this.titleIsBold = !this.titleIsBold;
			},
			showShadow(){
				this.isShowshadow = !this.isShowshadow;
			}
		},
	}
</script>

<style>
</style>
