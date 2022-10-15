<template>
	<view>
		<ybh-navbar title='地图'></ybh-navbar>
		<ybh-searchBar :filterMode='false' placeholder='请输入目的地' actionText='查 询' @confirm='search'></ybh-searchBar>
		<map id="map1" ref="map1" style="width: 100vw; height: 100vh;" 
			:scale='scale' :latitude="latitude" :longitude="longitude"
			:markers='markers' :polyline='polyline' @markertap='markertap' @tap='tapMap'></map>
		<!-- 地图的配置 设计的每个平台的兼容性问题，请以实际情况为准，此仅作示例 -->
		<!-- 注意配置文件中开启H5/APP/小程序的定位权限以及配置相关三方平台的应用key -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 28.228272, //纬度
				longitude: 112.938888,//经度
				scale: 16, //缩放级别 [3-20] 默认16
				minScale: 3, //最小缩放级别
				maxScale: 20, //最大缩放级别
				markers: [ // 标记点
					{
						id: '1',
						clusterId: 1,
						title: '市政府', // 标题
						latitude: 28.228272, //纬度
						longitude: 112.938888, //经度
						alpha: 1, // 透明度
						iconPath: '/static/img/map.png', // 图标路径
						width: 30, // 图标宽
						height: 30, // 图标高
						callout: { // marker 上的气泡 callout
							content: '长沙市市政府', // 会替换标题
							color: '#999',
							borderRadius: 5,
							borderWidth: 2,
							padding: 5,
							textAlign: 'center'
						},
					},{
						id: '2',
						clusterId: 2,
						title: '会议中心', // 标题
						latitude: 28.230300, //纬度
						longitude: 112.940850, //经度
						alpha: 1, // 透明度
						iconPath: '/static/img/map.png', // 图标路径
						width: 30, // 图标宽
						height: 30, // 图标高
					}
				],
				polyline: [
					{
						points: [ // 经纬度数组
							{latitude: 28.228972, longitude: 112.937588},
							{latitude: 28.227500, longitude: 112.937588},
							{latitude: 28.227500, longitude: 112.940210},
							{latitude: 28.228972, longitude: 112.940198},
							{latitude: 28.228972, longitude: 112.937588},
						],
						color: '#0000AA', // 线条颜色
						colorList: ['#F6C000','#E6C090','#F6C0F0'],
						width: 2, // 线条宽度
						dottedLine: true, // 是否虚线
						level: true // 压盖
					}
				],
			}
		},
		methods: {
			markertap(data){
				console.log(data);
			},
			search(data){
				// 模拟搜索地方
				this.$api.otherApi.searchPlace({ placeName: data.searchKey }).then(res => {
					let {data: mapData} = res.data;
					this.latitude = mapData.latitude;
					this.longitude = mapData.longitude;
					this.markers.push({
						id: new Date().getTime(),
						clusterId: new Date().getTime(),
						title: mapData.title,
						latitude: mapData.latitude,
						longitude: mapData.longitude,
						iconPath: '/static/img/map.png',
						width: 30,
						height: 30,
						callout: {
							content: mapData.title,
							color: '#999',
							borderRadius: 5,
							borderWidth: 2,
							padding: 5,
							textAlign: 'center'
						},
					});
				});
			},
			tapMap(data){
				console.log(data);
			}
		},
		onReady() {
			uni.createMapContext('map1', this)
		}
	}
	
	
</script>

<style>
</style>
