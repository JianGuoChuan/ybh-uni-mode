<template>
	<view>
		<ybh-navbar title='索引列表'></ybh-navbar>
		<ybh-indexList v-model="keyword" :list='list' @onSelect='onSelect' :lHeight='lHeight' :multiple='true' fileds='name'></ybh-indexList>
	</view>
</template>
<script>
	import devConfig from '@/common/devConfig.js';
	export default {
		data(){
			return {
				keyword : '',
				lHeight : 0,
				list: devConfig.contectList,
			}
		},
		methods: {
			onSelect(item, index, cindex) {
				console.log(item, index, cindex)
			}
		},
	}
</script>
<style></style>
