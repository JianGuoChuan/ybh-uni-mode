<template>
	<view class="padding-md">
		<ybh-navbar title='列表菜单'></ybh-navbar>
		<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
			<text class="font-bold font-sx">组件描述：</text>
			<text class="font-bold">listItem</text><text>列表菜单组件根据数据驱动视图，实现快速搭建菜单列表</text>
		</view>
		<view>
			<view>
				<text class="font-bold font-sx">组件特点：</text>
			</view>
			<view class="padding-lr-md">
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 样式预览 </view>
					<view> 
						<ybh-listItem :list='itemList' @input='input' @click='click'></ybh-listItem>
					</view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 通过修改类型可以直接切换列表项的样式，目前支持四种类型，分别为<strong>text/number/image/input</strong>,默认text类型） </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持设置是否显示右箭头 </view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 支持修改uview的预设图标 </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				itemList : [
					{
						title : '操作入口',
						icon : 'heart',
						arrow : true,
						hover : true,
						path : '/pages/dev_word/routers'
					},
					{
						title : 'text文本类型',
						icon : 'thumb-up',
						type : 'text',
						value : '标题内容',
						arrow : false,
						hover : true
					},
					{
						title : 'Number类型支持气泡',
						icon : 'star',
						type : 'number',
						arrow : true,
						num : 10,
						path : '/pages/dev_word/routers'
					},
					{
						title : 'image图片模式',
						icon : 'photo',
						type : 'image',
						arrow : true,
						imageList : [require('@/static/img/long.png'),require('@/static/img/feng.png'),]
					},
					{
						title : 'input录入模式',
						icon : 'edit-pen',
						type : 'input',
						vModal : '',
						arrow : true,
						disabled : false,
						maxLength : 100,
					},
				],
			}
		},
		methods: {
			click(data){
				console.log(data);
			},
			input(data){
				console.log(data);
			}
		},
	}
</script>

<style>
	
</style>
