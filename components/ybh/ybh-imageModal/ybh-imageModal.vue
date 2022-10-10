<template>
	<view id="saveImg">
		<u-modal 
			v-model="show" 
			:zoom="false" 
			:show-title='false' 
			:show-confirm-button='false' 
			:show-cancel-button='false'
			:mask-close-able='true'>
			<view class="slot-content relative">
				<view :class="[ vuex_themeColor.colorCharacter || 'bg-gradual-orange' ]">
					<view class="absolute" style="right: 12px;top: 12px;">
						<u-icon name='close-circle' size="40" color="#fff" class="font-bold" @tap='close'/>
					</view>
					<view class="padding-tb-md font-com text-center">
						<text class="font-com">{{title}}</text>
					</view>
				</view>
				<view class=" padding-tb-md text-center">
					<view @tap='preview'>
						<u-image :src='imageUrl' width="250px" height="300px" class="margin-auto"/>
					</view>
				</view>
				<view class="padding-tb-md margin-auto border-radius-md" style="width: 100px;">
					<button 
						class="font-ms text-white"
						:class="vuex_themeColor.colorCharacter ? vuex_themeColor.colorCharacter : 'bg-gradual-blue'"
						@click="saveImg">保存图片</button>
				</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	/*
	* ybh-imageModal 图片模态框
	* visible : 开关
	* title : 模态框标题
	* imageUrl : 模态框图片地址
	* 
	* @preview ： 图片预览
	* @saveImg ：保存图片
	* @close ： 关闭模态框
	*/
	export default {
		props:{
			visible : {
				type : Boolean,
				default: false,
			},
			title : {
				type : String,
				default:'查看图片'
			},
			imageUrl : {
				type : String,
				default:''
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
			show(){
				this.$emit('update:visible', this.show);
			}
		},
		methods:{
			// 照片预览
			preview(imageUrl){
				let previewArr = [];
				previewArr[0] = this.imageUrl;
				uni.previewImage({
					current:previewArr[0],
					urls: previewArr
				});
			},
			saveImg(){
				// #ifdef H5
				console.log('请在真实环境使用此功能');
				// #endif
				// #ifdef APP-PLUS
				uni.downloadFile({
					url: this.imageUrl,//图片地址
					success: (res) =>{
						if (res.statusCode === 200){
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath,
								success: function() {
									uni.showToast({
										title: "保存成功",
										icon: "none"
									});
								},
								fail: function() {
									uni.showToast({
										title: "保存失败",
										icon: "none"
									});
								}
							});
						} 
					}
				})
				// #endif
			},
			close(){
				this.show = false;
			}
		},
	}
</script>
<style></style>