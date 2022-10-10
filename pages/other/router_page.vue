<template>
	<view>
		<ybh-navbar title='路由辅助'></ybh-navbar>
		<view class="flex space-between padding-lgx">
			<text>传递的数据:</text>
			<text>{{key ? key : '无传递数据'}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				key : ''
			}
		},
		onLoad(data) {
			this.key = data.key
		}
	}
</script>

<style>
</style>
