<template>
	<view id="updataVersion">
		<u-modal 
			v-model="show" 
			:zoom="false" 
			:show-title='false' 
			:show-confirm-button='confirmBtn' 
			:show-cancel-button='cancelBtn' 
			confirm-text='立即更新'
			cancel-text='暂不更新'
			@cancel="cancel" 
			@confirm='confirm'>
			<view class="slot-content">
				<view class="padding-tb-md text-center font-com">
					<text>发现新版本 {{versionNumber}}</text>
				</view>
				<view class="padding-lr-lg padding-tb-lg text-center">
					<view class="padding-top-sm font-sm margin-right-md" v-for="(item,index) in updateContent" :key='index'>{{item}}</view>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	/*
	* ybh-updataVersion 版本更新
	*/
	export default {
		props:{
			visible : {
				type : Boolean,
				default: false
			},
			cancelBtn : {
				type : Boolean,
				default: true
			},
			confirmBtn : {
				type : Boolean,
				default: true
			},
			versionNumber : {
				type : String,
				default : '1.0.0'
			},
			updateContent : {
				type : Array,
				required : true
			}
		},
		data(){
			return {
				show : false,
			}
		},
		watch: {
		    visible() {
		        this.show = this.visible;
		    },
		},
		methods:{
			cancel(){
			    this.show = false;
			    this.$emit('update:visible',this.show);
			},
			confirm(){
				this.$iipKit.updateApp(this);
				this.show = false;
				this.$emit('update:visible',this.show);
			},
		},
	}
</script>

<style>
</style>
