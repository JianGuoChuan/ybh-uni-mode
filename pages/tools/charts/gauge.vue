<template>
	<view>
		<ybh-navbar title='仪表盘'></ybh-navbar>
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
						categories: [{"value":0.2,"color":"#1890ff"},{"value":0.8,"color":"#2fc25b"},{"value":1,"color":"#f04864"}],
						series: [{name: "完成率",data: 0.66}]
					};
					this.drawCharts('myid', res);
				}, 500);
			},
			drawCharts(id,data){
				const ctx = uni.createCanvasContext(id, this);
				uChartsInstance[id] = new uCharts({
					type: "gauge",
					context: ctx,
					width: this.cWidth,
					height: this.cHeight,
					categories: data.categories,
					series: data.series,
					animation: true,
					background: "#FFFFFF",
					color: ["#1890FF","#91CB74","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
					padding: undefined,
					title: {
						name: "60Km/H",
						fontSize: 25,
						color: "#2fc25b",
						offsetY: 50
					},
					subtitle: {
						name: "实时速度",
						fontSize: 15,
						color: "#666666",
						offsetY: -50
					},
					extra: {
						gauge: {
							type: "default",
							width: 30,
							labelColor: "#666666",
							startAngle: 0.75,
							endAngle: 0.25,
							startNumber: 0,
							endNumber: 100,
							labelFormat: "",
							splitLine: {
								fixRadius: 0,
								splitNumber: 10,
								width: 30,
								color: "#FFFFFF",
								childNumber: 5,
								childWidth: 12
							},
							pointer: {
								width: 24,
								color: "auto"
							}
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
