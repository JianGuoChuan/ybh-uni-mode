<template>
	<view class="padding-md">
		<ybh-navbar title='视觉组件'></ybh-navbar>
		<view class="margin-bottom-md border-bottom-f1 padding-bottom-sm">
			<text class="font-bold font-sx">组件描述：</text>
			<text>视觉组件库更多的是一些组件UI模板，逻辑层代码比较少</text>
		</view>
		<view>
			<view>
				<text class="font-bold font-sx">组件演示：</text>
			</view>
			<view class="padding-lr-md">
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 用户信息卡 </view>
					<view> 
						<ybh-userCard></ybh-userCard>
					</view>
				</view>
				<view class="padding-tb-sm border-bottom-f1">
					<view class="margin-bottom-sm"> <text class="margin-right-md">●</text> 评论栏 </view>
					<view> 
						<ybh-commentsBar v-model="contenKey" @confirm='confirm' @clear='clear' @checked='checked'></ybh-commentsBar>
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
				contenKey: '',
			}
		},
		methods: {
			confirm(data){
				console.log(data);
				this.contenKey = '';
			},
			clear(){
				console.log('评论输入框清空了');
			},
			checked(data){
				console.log(data);
			}
		},
	}
</script>

<style>
	
</style>
