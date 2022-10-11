<template>
	<view>
		<ybh-navbar title='图表'></ybh-navbar>
		<view class="canvasBox margin-top-lgx">
			<u-cell-group>
				<u-cell-item icon="eye" title="柱状图" @tap='to(0)'></u-cell-item>
				<u-cell-item icon="eye" title="折线图" @tap='to(1)'></u-cell-item>
				<u-cell-item icon="eye" title="饼图" @tap='to(2)'></u-cell-item>
				<u-cell-item icon="eye" title="仪表盘" @tap='to(3)'></u-cell-item>
				<u-cell-item icon="eye" title="K线图" @tap='to(4)'></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>
<script>
	var uChartsInstance = {};
	export default {
		data(){
			return {
				
			}
		},
		methods: {
			to(key){
				console.log(key);
				switch(key){
					case 0 : this.$routes.to('/pages/tools/charts/column');break;
					case 1 : this.$routes.to('/pages/tools/charts/line');break;
					case 2 : this.$routes.to('/pages/tools/charts/pie');break;
					case 3 : this.$routes.to('/pages/tools/charts/gauge');break;
					case 4 : this.$routes.to('/pages/tools/charts/candle');break;
					default : break;
				}
			}
		},
		
	}
</script>
<style scoped>
	
</style>
