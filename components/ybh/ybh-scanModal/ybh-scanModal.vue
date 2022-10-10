<template>
	<view id="scanModal">
		<u-icon name='scan' @tap='scan'/>
		<u-modal 
			v-model="show" 
			:zoom="false" 
			:show-title='false' 
			:show-confirm-button='false' 
			:show-cancel-button='false' 
			@cancel="cancel" 
			@confirm='confirm'>
			<view class="slot-content overflow-hidden">
				<view :class="[vuex_themeColor.colorCharacter || 'bg-gradual-orange']">
					<view class="absolute" style="right: 12px;top: 12px;">
						<u-icon name='close-circle' size="40" color="#fff" class="font-bold" @tap='close'/>
					</view>
					<view class="padding-tb-md padding-lr-md font-com">
						扫描结果：
					</view>
				</view>
				<view class="padding-tb-md padding-lr-lgx font-sm">
					<view>类型：{{scanSort}}</view>
					<view>内容：{{scanResult}}</view>
				</view>
				<view class="padding-tb-md padding-lr-md flex space-around border-top font-sm">
					<view>
						<u-icon name='file-text' @tap='copy'/>复制
					</view>
					<view>
						<u-icon name='star' @tap='copy'/>保存
					</view>
					<view>
						<u-icon name='zhuanfa' @tap='copy'/>分享
					</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	/*
	* ybh-scanModal 扫码模态框（显示扫描内容）
	*/
	export default {
		props:{
		},
		data(){
			return {
				show : false,
				scanSort : '',
				scanResult : ''
			}
		},
		watch: {
		    
		},
		methods:{
			cancel(){
			    this.show = false;
				this.value = '';
			    this.$emit('update:visible',this.show);
			},
			confirm(){
				this.show = false;
				this.$emit('confirm',this.value);
				this.$emit('update:visible',this.show);
				this.value = '';
			},
			async scan(){
				let res = await this.$iipKit.scanCode();
				this.scanSort = '二维码';
				this.scanResult = res.result;
				this.show = true;
			},
			copy(){
				this.$iipKit.copyText(this.scanResult);
				this.$iipKit.toast('已复制到剪贴板')
			},
			close(){
				this.show = false;
			}
		}
	}
</script>

<style>
</style>
