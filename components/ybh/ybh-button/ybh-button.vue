<template>
	<view class="width-all">
		<button 
			:plain='plain' 
			:disabled='disabled' 
			:loading='loading' 
			:style="{ 'backgroundColor': plain ? '' : bgColor, 'color': disabled ? '#333' : textColor, 'opacity': disabled ? 0.7 : 1 }"
			:class="[ bgColor || plain ? '' : vuex_themeColor.colorCharacter, size, square ? 'square' : '', ]" 
			@click="click">
			<slot></slot>
		</button>
	</view>
</template>

<script>
	/*
	* ybh-button 按钮
	* height：按钮高度 默认40px
	* width：按钮宽度 默认100%
	* isLoad：是否开启点击后变成加载中
	* bgColor：按钮背景颜色
	* borderRadius：按钮圆角 默认30
	* borderColor：按钮边框颜色
	* disabled：是否禁用
	* isThrottle：是否开启节流 防止连续点击 默认0 单位ms
	*/
	export default {
		props:{
			size: {
				type: String,
				default: 'medium'
			},
			loading: {
				type: Boolean,
				default: false
			},
			disabled: {
				type: Boolean,
				default: false
			},
			plain: {
				type: Boolean,
				default: false
			},
			square: {
				type: Boolean,
				default: true
			},
			bgColor: {
				type: String,
				default: ''
			},
			textColor: {
				type: String,
				default: ''
			},
			throttle: {
				type: Boolean,
				default: true
			},
			throttleTime: {
				type: String || Number,
				default: '2000'
			}
		},
		data(){
			return{
				buttonText : '',
				throttleState : false, // 节流状态
			}
		},
		methods: {
			click() {
				if( this.isThrottleState ){return}
				if( this.throttle && Number(this.throttleTime)!= 0 ){
					this.isThrottleState = true;
					let timer = '';
					timer = setTimeout(()=>{
						this.isThrottleState = false;
						clearTimeout(timer);
					}, Number( this.throttleTime) )
				}
				this.$emit('click',{ buttonText : this.buttonText });
			}
		},
	}
</script>

<style scoped>
	.mini{
		font-size: 12px;
		padding: 0 10px;
		height: 30px;
		line-height: 28px;
	}
	.medium{
		font-size: 14px;
		padding: 0 10px;
		height: 35px;
		line-height: 33px;
	}
	.default{
		font-size: 14px;
		padding: 0 10px;
		height: 40px;
		line-height: 38px;
	}
	.square{
		border-radius: 30px;
	}
</style>