<template>
	<view>
		<ybh-navbar title='柱状图'></ybh-navbar>
		<view class="canvasBox margin-top-lgx">
			<canvas canvas-id="myid" id="myid" class="charts" @tap="tap"/>
		</view>
	</view>
</template>
<script>
	import uCharts from '@/common/js/u-charts.min.js';
	var uChartsInstance = {};
	export default {
		data(){
			return {
				cWidth: 750,
				cHeight: 280
			}
		},
		methods: {
			getServerData() {
				//模拟从服务器获取数据时的延时
				setTimeout(() => {
					let res = {
						categories: ["2016","2017","2018","2019","2020","2021"],
						series: [
							{
								name: "目标值",
								data: [35,36,31,33,13,34]
							},{
								name: "完成量",
								data: [18,27,21,24,6,28]
							}
						]
					};
					this.drawCharts('myid', res);
				}, 500);
			},
			drawCharts(id,data){
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "column",
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					categories: data.categories,
					series: data.series,
					animation: true,
					xAxis: {
						disableGrid: true
					},
					yAxis: {
						data: [ { min: 0 } ]
					},
					extra: {
						column: {
							type: "group"
						}
					}
				});
			},
			tap(e){
				uChartsInstance[e.target.id].touchLegend(e);
				uChartsInstance[e.target.id].showToolTip(e);
			}
		},
		onReady() {
			//这里的 750 对应 css .charts 的 width
			this.cWidth = uni.upx2px(750);
			this.$nextTick(() => {
				let info = uni.createSelectorQuery().in(this).select('.canvasBox');
				info.boundingClientRect( (data)=> {
					this.cHeight = data.height;
					this.getServerData();
				}).exec();
			})
		},
	}
</script>
<style scoped>
	.canvasBox{
	    width: 100%;
		height: 280px;
	}
	.charts{
		width: 100%;
		height: 100%;
	}
</style>
