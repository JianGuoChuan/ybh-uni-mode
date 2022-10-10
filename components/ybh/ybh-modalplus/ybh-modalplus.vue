<template>
	<view class="ybh-modal__container" :class="[show ? 'ybh-modal-show' : '']" :style="{zIndex:zIndex}" @touchmove.stop.prevent>
		<view :style="{ width: width, padding: padding, borderRadius: radius, backgroundColor: backgroundColor,zIndex:zIndex+1 }"
			:class="[fadeIn || show ? 'ybh-modal-normal' : 'ybh-modal-scale', show ? 'ybh-modal-show' : '', 'ybh-modal-box']">
			<view v-if="!custom">
				<view class="ybh-modal-title" v-if="title">{{ title }}</view>
				<view class="ybh-modal-content" :class="[title ? '' : 'ybh-mtop']" :style="{ color: color, fontSize: size + 'rpx' }">
					{{ content }}
					<view v-if="scanInput" class="flex space-between">
						<u-input v-model="value" type="text" border="border" height="55" :focus='true' :placeholder="placeholder"/>
						<view class="text-left padding-top-sm padding-left-sm">
							<u-icon name='scan' size="35" @tap='scan'/>
						</view>
					</view>
				</view>
				<view class="ybh-modalBtn-box" :class="[button.length != 2 ? 'ybh-flex-column' : '']">
					<block v-for="(item, index) in button" :key="index">
						<button class="ybh-modal-btn"
							:class="[
								'ybh-' + (item.type || 'primary') + (item.plain ? '-outline' : ''),
								button.length != 2 ? 'ybh-btn-width' : '',
								button.length > 2 ? 'ybh-mbtm' : '',
								shape == 'circle' ? 'ybh-circle-btn' : '',
								vuex_themeColor.colorCharacter ? vuex_themeColor.colorCharacter : 'bg-gradual-blue'
							]"
							:hover-class="'ybh-' + (item.plain ? 'outline' : item.type || 'primary') + '-hover'"
							:data-index="index"
							@tap="handleClick">
							{{ item.text || '确定' }}
						</button>
					</block>
				</view>
			</view>
			<view v-else><slot></slot></view>
		</view>
		<view class="ybh-modal-mask" :class="[show ? 'ybh-mask-show' : '']" :style="{zIndex:maskZIndex}" @tap="handleClickCancel"></view>
	</view>
</template>

<script>
export default {
	name: 'ybhModal',
	emits: ['click','cancel'],
	props: {
		//是否显示
		show: {
			type: Boolean,
			default: false
		},
		width: {
			type: String,
			default: '84%'
		},
		backgroundColor: {
			type: String,
			default: '#fff'
		},
		padding: {
			type: String,
			default: '40rpx 64rpx'
		},
		radius: {
			type: String,
			default: '24rpx'
		},
		//标题
		title: {
			type: String,
			default: ''
		},
		//内容
		content: {
			type: String,
			default: ''
		},
		placeholder: {
			type: String,
			default: ' '
		},
		//内容字体颜色
		color: {
			type: String,
			default: '#999'
		},
		//内容字体大小 rpx
		size: {
			type: Number,
			default: 28
		},
		//形状 circle, square
		shape: {
			type: String,
			default: 'square'
		},
		button: {
			type: Array,
			default: function() {
				return [
					{
						text: '取消',
						type: 'red',
						plain: true //是否空心
					},
					{
						text: '确定',
						type: 'red',
						plain: false
					}
				];
			}
		},
		scanInput:{
			type:Boolean,
			default: false,
		},
		//点击遮罩 是否可关闭
		maskClosable: {
			type: Boolean,
			default: true
		},
		//淡入效果，自定义弹框插入input输入框时传true
		fadeIn: {
			type: Boolean,
			default: false
		},
		//自定义弹窗内容
		custom: {
			type: Boolean,
			default: false
		},
		//容器z-index
		zIndex:{
			type: Number,
			default: 9997
		},
		//mask z-index
		maskZIndex:{
			type: Number,
			default: 9990
		}
	},
	data() {
		return {
			value : ''
		};
	},
	methods: {
		handleClick(e) {
			if (!this.show) return;
			const dataset = e.currentTarget.dataset;
			this.$emit('update:show',false)
			this.$emit('click', {
				index: Number(dataset.index),
				value: this.value
			});
		},
		handleClickCancel() {
			if (!this.maskClosable) return;
			this.$emit('cancel');
		},
		async scan(){
			// #ifdef H5
			console.log('请在真实环境使用此功能');
			// #endif
			// #ifdef APP-PLUS
			let res = await this.$iipKit.scanCode();
			this.value = res.result;
			// #endif
		}
	}
};
</script>

<style lang="scss" scoped>
.ybh-modal__container {
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	visibility: hidden;
}
.ybh-modal-box {
	position: relative;
	opacity: 0;
	visibility: hidden;
	box-sizing: border-box;
	transition: all 0.3s ease-in-out;
}

.ybh-modal-scale {
	transform: scale(0);
}

.ybh-modal-normal {
	transform: scale(1);
}

.ybh-modal-show {
	opacity: 1;
	visibility: visible;
}

.ybh-modal-mask {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(0, 0, 0, 0.6);
	transition: all 0.3s ease-in-out;
	opacity: 0;
	visibility: hidden;
}

.ybh-mask-show {
	visibility: visible;
	opacity: 1;
}

.ybh-modal-title {
	text-align: center;
	font-size: 34rpx;
	color: #333;
	padding-top: 20rpx;
	font-weight: bold;
}

.ybh-modal-content {
	text-align: center;
	color: #999;
	font-size: 28rpx;
	padding-top: 20rpx;
	padding-bottom: 40rpx;
}

.ybh-mtop {
	margin-top: 30rpx;
}

.ybh-mbtm {
	margin-bottom: 30rpx;
}

.ybh-modalBtn-box {
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.ybh-flex-column {
	flex-direction: column;
}

.ybh-modal-btn {
	width: 46%;
	height: 68rpx;
	line-height: 68rpx;
	position: relative;
	border-radius: 10rpx;
	font-size: 26rpx;
	overflow: visible;
	margin-left: 0;
	margin-right: 0;
	box-sizing: border-box;
}

/* #ifndef MP-QQ */
.ybh-modal-btn::after {
	content: ' ';
	position: absolute;
	width: 200%;
	height: 200%;
	-webkit-transform-origin: 0 0;
	transform-origin: 0 0;
	transform: scale(0.5, 0.5) translateZ(0);
	left: 0;
	top: 0;
	border-radius: 20rpx;
	z-index: 2;
}
/* #endif */

.ybh-btn-width {
	width: 80% !important;
}

.ybh-primary {
	background: #5677fc;
	color: #fff;
}

.ybh-primary-hover {
	background: #4a67d6;
	color: #e5e5e5;
}

.ybh-primary-outline {
	color: #5677fc;
	background: transparent;
	/* #ifdef MP-QQ */
	border: 1rpx solid #5677fc;
	/* #endif */
}

/* #ifndef MP-QQ */
.ybh-primary-outline::after {
	border: 1px solid #5677fc;
}

/* #endif */
.ybh-danger {
	background: #ed3f14;
	color: #fff;
}

.ybh-danger-hover {
	background: #d53912;
	color: #e5e5e5;
}

.ybh-danger-outline {
	color: #ed3f14;
	background: transparent;
	/* #ifdef MP-QQ */
	border: 1rpx solid #ed3f14;
	/* #endif */
}

/* #ifndef MP-QQ */
.ybh-danger-outline::after {
	border: 1px solid #ed3f14;
}
/* #endif */

.ybh-red {
	background: #e41f19;
	color: #fff;
}

.ybh-red-hover {
	background: #c51a15;
	color: #e5e5e5;
}

.ybh-red-outline {
	color: #e41f19;
	background: transparent;
	/* #ifdef MP-QQ */
	border: 1rpx solid #e41f19;
	/* #endif */
}

/* #ifndef MP-QQ */
.ybh-red-outline::after {
	border: 1px solid #e41f19;
}
/* #endif */

.ybh-warning {
	background: #ff7900;
	color: #fff;
}

.ybh-warning-hover {
	background: #e56d00;
	color: #e5e5e5;
}

.ybh-warning-outline {
	color: #ff7900;
	background: transparent;
	/* #ifdef MP-QQ */
	border: 1rpx solid #ff7900;
	/* #endif */
}

/* #ifndef MP-QQ */
.ybh-warning-outline::after {
	border: 1px solid #ff7900;
}

/* #endif */
.ybh-green {
	background: #19be6b;
	color: #fff;
}

.ybh-green-hover {
	background: #16ab60;
	color: #e5e5e5;
}

.ybh-green-outline {
	color: #19be6b;
	background: transparent;
	/* #ifdef MP-QQ */
	border: 1rpx solid #19be6b;
	/* #endif */
}

/* #ifndef MP-QQ */
.ybh-green-outline::after {
	border: 1px solid #19be6b;
}
/* #endif */

.ybh-white {
	background: #fff;
	color: #333;
}

.ybh-white-hover {
	background: #f7f7f9;
	color: #666;
}

.ybh-white-outline {
	color: #333;
	background: transparent;
	/* #ifdef MP-QQ */
	border: 1rpx solid #333;
	/* #endif */
}

/* #ifndef MP-QQ */
.ybh-white-outline::after {
	border: 1px solid #333;
}
/* #endif */

.ybh-gray {
	background: #ededed;
	color: #999;
}

.ybh-gray-hover {
	background: #d5d5d5;
	color: #898989;
}

.ybh-gray-outline {
	color: #999;
	background: transparent;
	/* #ifdef MP-QQ */
	border: 1rpx solid #999;
	/* #endif */
}

/* #ifndef MP-QQ */
.ybh-gray-outline::after {
	border: 1px solid #999;
}
/* #endif */

.ybh-outline-hover {
	opacity: 0.6;
}

.ybh-circle-btn {
	border-radius: 40rpx !important;
}

.ybh-circle-btn::after {
	border-radius: 80rpx !important;
}
</style>
