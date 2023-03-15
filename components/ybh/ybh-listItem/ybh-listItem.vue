<template>
	<view>
		<view class="shadow-md-bottom margin-tb-md overflow-hidden">
			<view v-for="(item,index) in list" :key='index'>
				<u-cell-item
					@tap='click(item)'
					v-if="item.type == 'text' || !item.type" 
					:icon="item.icon" 
					:title="item.title" 
					:value='item.value'
					:arrow="item.arrow">
				</u-cell-item>
				<u-cell-item
					@tap='click(item)'
					v-if="item.type == 'number'" 
					:icon="item.icon"
					:title="item.title"
					:arrow="item.arrow" 
					class='relative'>
					<u-badge type="error" :count="item.num" class="absolute" style="right: 35px;top: 17px;"></u-badge>
				</u-cell-item>
				<u-cell-item
					v-if="item.type == 'image'" 
					:icon="item.icon"
					:title="item.title"
					:arrow="false"
					 hover-class='false'>
					<view class='text-left flex flex-end'>
						<view v-for="(imageItem,imageIndex) in item.imageList" :key='imageIndex' 
							class="margin-right-xs border-radius-sm overflow-hidden"
							@tap='preview(item.imageList,imageIndex)'>
							<u-image :src='imageItem' width="50px" height="50px"/>
						</view>
					</view>
				</u-cell-item>
				<u-cell-item
					v-if="item.type == 'input'" :arrow="false" hover-class='false'>
					<view class="text-left">
						<view class="text-darkgrey">
							<u-icon :name='item.icon' size="35" class="margin-right-sm"/>
							<text class="font-sm">{{item.title}}</text>
						</view>
						<u-input 
							type='textarea' 
							border 
							v-model="item.vModal" 
							:placeholder="item.placeholder || '请输入内容'"
							:disabled="item.disabled" 
							class="margin-top-md"
							:maxlength="item.maxLength"
							 @input='input(item)'/>
					</view>
				</u-cell-item>
			</view>
		</view>
	</view>
</template>

<script>
	/*
	*	列表项
	* 	list ：列表数据
	* 	list : [
	*		｛
				title : '标题',
				icon : 'heart',
				type : 'text/number/image/input',
				value : '值',
				vModal : '',(类型为input输入时的双向绑定值)
				arrow : true,
				hover : true,
				path : '/pages/dev_word/routers'
	*		｝
	]
	*/
	export default {
		props:{
			list : {
				type : Array,
				required:true
			},
		},
		data(){
			return{
				
			}
		},
		methods:{
			// 照片预览
			preview(imageList,imageIndex){
				let previewArr = imageList;
				uni.previewImage({
					current:previewArr[imageIndex],
					urls: previewArr
				});
			},
			input(item){
				this.$emit('input',item.vModal);
			},
			click(item){
				this.$emit('click', item);
			}
		}
	}
</script>

<style>
</style>

