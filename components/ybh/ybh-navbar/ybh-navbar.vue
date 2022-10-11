<template>
	<view :class="shadowSwitch ? 'shadow-xs-bottom' : '' " style="position: relative;">
		<u-navbar 
			:title="title" 
			:background="vuex_themeColor.colorCode ? {background : vuex_themeColor.colorCode} : {background : 'linear-gradient(45deg, #0081ff, #1cbbb4)'}" 
			:title-color="titleColor" 
			:back-icon-color='backIconColor' 
			:title-bold='titlebold'
			:is-back="isBack"
			:custom-back='customBack'>
				<view v-if='leftArea'>
					<template>
						<slot name='leftArea'></slot>
					</template>
				</view>
				<!-- <view v-if="isHome" class="homeStyle"></view> -->
				<!-- <u-icon name='home' color="#fff" size="20px" class="padding-lr-md" style="border-left: 1px solid #fff;" @tap='toHome'/> -->
				<view class="flex flex-end flex-6 padding-right-md text-white" :style="'color:' + rightTextColor" v-if='!tempMode'>
					<text @tap='click'>{{rightText}}</text>
				</view>
				<view class="flex flex-end flex-6 padding-right-md" v-if='tempMode'>
					<template>
						<slot name='theCustom'></slot>
					</template>
				</view>
		</u-navbar>
	</view>
</template>

<script>
	/*
	* ybh-navbar
	* title : 导航栏标题
	* titlebold : 导航栏标题是否加粗
	* titleColor : 导航栏标题颜色
	* isBack : 是否显示左侧文字
	* rightText : 导航栏右侧文字
	* rightTextColor :导航栏右侧文字颜色
	* backIconColor :导航栏左侧返回图标颜色
	* tempMode : 导航栏右侧按钮自定义模式
	* shadowSwitch : 导航栏底部是否显示阴影
	* backgroundColor　: 导航栏背景颜色-单色模式（保留）
	* backgroundImage : 导航栏背景颜色-多色模式
	* customBack: 自定义返回方案
	* 
	* @click 右侧文字点击事件 需配合rightText使用
	*/
	export default {
		props:{
			title : {
				type: [String, Number],
				default: '标题'
			},
			titlebold : {
				type: Boolean,
				default: false
			},
			titleColor : {
				type: String,
				default: '#fff'
			},
			isBack : {
				type: Boolean,
				default: true
			},
			isHome : {
				type: Boolean,
				default: false
			},
			rightText : {
				type: String,
				default: ''
			},
			rightTextColor : {
				type: String,
				default: '#fff'
			},
			backIconColor : {
				type : String,
				default: '#fff'
			},
			tempMode: {
				type : Boolean,
				default: false
			},
			leftArea:{
				type : Boolean,
				default: false
			},
			shadowSwitch : {
				type : Boolean,
				default: false
			},
			customBack: {
				type : Function,
			}
		},
		data(){
			return {}
		},
		methods:{
			click(){
				this.$emit( 'click', this.title )
			}
		},
	}
</script>
<style scoped>
	.homeStyle{
		z-index: -1;
		border: 1px solid #fff;
		border-radius: 25px;
		width: 75px;
		height: 30px;
		text-align: right;
		line-height: 30px;
		position: absolute;
		left: 10px;
	}
</style>
