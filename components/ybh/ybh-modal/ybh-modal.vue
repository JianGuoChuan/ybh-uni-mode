<template>
	<view id="modal">
		<u-modal 
			v-model="show" 
			:zoom="false" 
			:show-title='false' 
			:show-confirm-button='confirmBtn' 
			:show-cancel-button='cancelBtn' 
			@cancel="cancel" 
			@confirm='confirm'>
			<view class="slot-content">
				<view class="padding-tb-md text-center font-com">
					<text :style="{fontSize : titleSize}">{{title}}</text>
				</view>
				<view class="padding-lr-lg padding-tb-lg flex space-between">
					<u-input style='width: 100%' v-model="value" :type="inputType" border="border" height="55" :focus='aotoFocus' :placeholder="placeholder"/>
					<view class="text-left padding-top-sm padding-left-sm" v-if="scanMode">
						<u-icon name='scan' size="35" @tap='scan'/>
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	/*
	* ybh-modal
	* visible : 模态框开关
	* title : 标题
	* placeholder : 提示文字
	* inputType : 输入类型
	* titleSize : 标题字体尺寸
	* scanMode : 扫码开关
	* aotoFocus : 自动聚焦
	* cancelBtn : 是否显示取消按钮
	* 
	* @cancel 取消
	* @confirm 确认
	* @scan 扫码模式 扫描二维码之后扫码内容自动填充至输入框
	*/
	export default {
		props:{
			visible : {
				type : Boolean,
				default:false
			},
			defalutValue : {
				type : String,
				default:''
			},
			title : {
				type : String,
				default:'提示'
			},
			placeholder : {
				type : String,
				default:'请输入内容'
			},
			titleSize : {
				type : String,
				default: '16px'
			},
			inputType : {
				type : String,
				default:'text'
			},
			aotoFocus : {
				type : Boolean,
				default: true
			},
			cancelBtn : {
				type : Boolean,
				default: true
			},
			confirmBtn : {
				type : Boolean,
				default: true
			},
			scanMode : {
				type : Boolean,
				default: false
			}
		},
		data(){
			return {
				show : false,
				value : ''
			}
		},
		watch: {
		    visible() {
		        this.show = this.visible;
		    },
			defalutValue() {
			    this.value = this.defalutValue;
			},
		},
		methods:{
			cancel(){
			    this.show = false;
				this.$emit('cancel', this.value);
			    this.$emit('update:visible',this.show);
				this.value = '';
			},
			confirm(){
				this.show = false;
				this.$emit('confirm', this.value);
				this.$emit('update:visible',this.show);
				this.value = '';
			},
			async scan(){
				// #ifdef H5
				console.log('请在真机环境下扫码');
				// #endif
				// #ifdef APP-PLUS
				let res = await this.$iipKit.scanCode();
				this.value = res.result;
				// #endif
			}
		},
		created() {
			this.value = this.defalutValue || ''
		}
	}
</script>

<style>
</style>
